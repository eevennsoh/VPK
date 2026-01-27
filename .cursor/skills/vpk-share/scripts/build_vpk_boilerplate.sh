#!/usr/bin/env bash
set -euo pipefail

show_help() {
	cat <<'USAGE'
Usage: build_vpk_boilerplate.sh [--src PATH] [--dest PATH] [--force] [--dry-run]
       build_vpk_boilerplate.sh --reset [PATH]

Modes:
	(default)     Export a sanitized boilerplate from src to dest
	--reset       Reset a repo to clean boilerplate state (removes credentials, local files)

Options:
	--src PATH    Source VPK repo path (default: current directory)
	--dest PATH   Destination export path (default: <src>-boilerplate in parent dir)
	--force       Remove destination if it already exists
	--dry-run     Print actions without copying/deleting files
	-h, --help    Show this help

Reset mode removes:
	- .deploy.local (deployment credentials)
	- .env.local (environment variables)
	- .asap-config (ASAP credentials)
	- .dev-pids, .dev-backend-port (dev server state)
	- *.local.md, *.local.json (local config files)
USAGE
}

src="$(pwd)"
dest=""
force=false
dry_run=false
reset_mode=false

while [[ $# -gt 0 ]]; do
	case "$1" in
		--reset)
			reset_mode=true
			shift
			# Optional path argument after --reset
			if [[ $# -gt 0 && ! "$1" =~ ^-- ]]; then
				src="$2"
				shift
			fi
			;;
		--src)
			src="$2"
			shift 2
			;;
		--dest)
			dest="$2"
			shift 2
			;;
		--force)
			force=true
			shift
			;;
		--dry-run)
			dry_run=true
			shift
			;;
		-h|--help)
			show_help
			exit 0
			;;
		*)
			echo "Unknown argument: $1" >&2
			show_help >&2
			exit 1
			;;
	esac
done

src="$(cd "$src" && pwd)"

# Files to remove in reset mode or from destination after export
local_files=(
	".deploy.local"
	".env.local"
	".env"
	".asap-config"
	".dev-pids"
	".dev-backend-port"
	".api-routes-backup"
)

# Reset mode: clean up local files in-place
if [[ "$reset_mode" == true ]]; then
	echo "Resetting repo to clean boilerplate state: $src"
	
	removed_count=0
	for file in "${local_files[@]}"; do
		if [[ -e "$src/$file" ]]; then
			if [[ "$dry_run" == true ]]; then
				echo "[dry-run] Would remove: $src/$file"
			else
				rm -f "$src/$file"
				echo "Removed: $file"
			fi
			((removed_count++)) || true
		fi
	done
	
	# Remove *.local.md and *.local.json files
	while IFS= read -r -d '' file; do
		if [[ "$dry_run" == true ]]; then
			echo "[dry-run] Would remove: $file"
		else
			rm -f "$file"
			echo "Removed: ${file#$src/}"
		fi
		((removed_count++)) || true
	done < <(find "$src" -maxdepth 3 \( -name "*.local.md" -o -name "*.local.json" \) -print0 2>/dev/null)
	
	if [[ $removed_count -eq 0 ]]; then
		echo "No local files found to remove. Repo is already clean."
	else
		echo ""
		echo "Reset complete. Removed $removed_count file(s)."
	fi
	
	# Verify service-descriptor.yml has placeholders
	if [[ -f "$src/service-descriptor.yml" ]]; then
		if grep -q "YOUR-SERVICE-NAME" "$src/service-descriptor.yml"; then
			echo "✓ service-descriptor.yml uses placeholders"
		else
			echo "⚠ WARNING: service-descriptor.yml may contain a real service name"
			echo "  Consider resetting it to use 'YOUR-SERVICE-NAME' placeholder"
		fi
	fi
	
	exit 0
fi

# Export mode requires rsync
if ! command -v rsync >/dev/null 2>&1; then
	echo "rsync is required but not found on PATH." >&2
	exit 1
fi
if [[ -z "$dest" ]]; then
	src_name="$(basename "$src")"
	dest="$(dirname "$src")/${src_name}-boilerplate"
fi

dest="$(mkdir -p "$dest" && cd "$dest" && pwd)"
if [[ -e "$dest" && -n "$(ls -A "$dest")" ]]; then
	if [[ "$force" == true ]]; then
		rm -rf "$dest"
		mkdir -p "$dest"
	else
		echo "Destination exists and is not empty: $dest" >&2
		echo "Re-run with --force to replace it." >&2
		exit 1
	fi
fi

excludes=(
	".git/"
	"node_modules/"
	"backend/node_modules/"
	".next/"
	"out/"
	"build/"
	"coverage/"
	".pnpm-store/"
	".pnp"
	".pnp.*"
	".yarn/"
	".vercel/"
	".turbo/"
	".cache/"
	"dist/"
	"tmp/"
	".tmp/"
	".DS_Store"
	"*.log"
	"npm-debug.log*"
	"yarn-debug.log*"
	".pnpm-debug.log*"
	".env*"
	".asap-config"
	"*.pem"
	"*.key"
	"*.p12"
	"*.pfx"
	"*.jks"
	"*.tsbuildinfo"
	"next-env.d.ts"
	".dev-pids"
	".dev-backend-port"
	".api-routes-backup"
	".idea/"
	".vscode/"
	"*.local.md"
	"*.local.json"
)

rsync_cmd=(rsync -a --delete)
for ex in "${excludes[@]}"; do
	rsync_cmd+=(--exclude "$ex")
done
if [[ "$dry_run" == true ]]; then
	rsync_cmd+=(--dry-run -v)
fi
rsync_cmd+=("$src/" "$dest/")

"${rsync_cmd[@]}"

if [[ -f "$src/.env.local.example" ]]; then
	cp -f "$src/.env.local.example" "$dest/.env.local.example"
fi

# Remove any local/credential files that may have been copied
for file in "${local_files[@]}"; do
	if [[ -e "$dest/$file" ]]; then
		rm -f "$dest/$file"
		echo "Cleaned: $file"
	fi
done

# Remove *.local.md and *.local.json from destination
find "$dest" -maxdepth 3 \( -name "*.local.md" -o -name "*.local.json" \) -exec rm -f {} +

find "$dest" -maxdepth 2 -name ".env*" ! -name ".env.local.example" -exec rm -f {} +

sensitive_matches="$(find "$dest" -maxdepth 4 \( -name ".env*" ! -name ".env.local.example" -o -name ".asap-config" -o -name "*.pem" -o -name "*.key" -o -name "*.p12" -o -name "*.pfx" -o -name "*.jks" \))"
if [[ -n "$sensitive_matches" ]]; then
	echo "Sensitive files still present in export:" >&2
	echo "$sensitive_matches" >&2
	exit 2
fi

echo "Boilerplate export created at: $dest"
