#!/usr/bin/env bash
set -euo pipefail

show_help() {
	cat <<'USAGE'
Usage: build_vpk_boilerplate.sh [--src PATH] [--dest PATH] [--force] [--dry-run]

Options:
	--src PATH    Source VPK repo path (default: current directory)
	--dest PATH   Destination export path (default: <src>-boilerplate in parent dir)
	--force       Remove destination if it already exists
	--dry-run     Print actions without copying files
	-h, --help    Show this help
USAGE
}

src="$(pwd)"
dest=""
force=false
dry_run=false

while [[ $# -gt 0 ]]; do
	case "$1" in
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

if ! command -v rsync >/dev/null 2>&1; then
	echo "rsync is required but not found on PATH." >&2
	exit 1
fi

src="$(cd "$src" && pwd)"
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

find "$dest" -maxdepth 2 -name ".env*" ! -name ".env.local.example" -exec rm -f {} +

sensitive_matches="$(find "$dest" -maxdepth 4 \( -name ".env*" ! -name ".env.local.example" -o -name ".asap-config" -o -name "*.pem" -o -name "*.key" -o -name "*.p12" -o -name "*.pfx" -o -name "*.jks" \))"
if [[ -n "$sensitive_matches" ]]; then
	echo "Sensitive files still present in export:" >&2
	echo "$sensitive_matches" >&2
	exit 2
fi

echo "Boilerplate export created at: $dest"
