#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# repo-reset.sh
# Cleans project by removing credentials, caches, and build artifacts
# =============================================================================

show_help() {
	cat <<'USAGE'
Usage: repo-reset.sh [options]

Clean the current VPK project by removing credentials, caches, and build artifacts.

Options:
	--dry-run     Preview what would be removed without deleting
	-h, --help    Show this help

What gets removed:
	- .env.local, .env           Environment variables and secrets
	- node_modules/              Installed dependencies
	- .next/                     Next.js build cache
	- *.local.md                 Personal override files

Examples:
	repo-reset.sh              # Clean the project
	repo-reset.sh --dry-run    # Preview what would be removed
USAGE
}

dry_run=false

while [[ $# -gt 0 ]]; do
	case "$1" in
		--dry-run)
			dry_run=true
			shift
			;;
		-h|--help)
			show_help
			exit 0
			;;
		-*)
			echo "Unknown option: $1" >&2
			show_help >&2
			exit 1
			;;
		*)
			echo "Unexpected argument: $1" >&2
			show_help >&2
			exit 1
			;;
	esac
done

echo "=== VPK Reset ==="
echo ""

# Track what we find and remove
removed_count=0
removed_items=()

# Function to remove item (file or directory)
remove_item() {
	local item="$1"
	local description="$2"

	if [[ -e "$item" ]]; then
		if [[ "$dry_run" == true ]]; then
			echo "[dry-run] Would remove: $item ($description)"
		else
			if [[ -d "$item" ]]; then
				rm -rf "$item"
			else
				rm -f "$item"
			fi
			echo "✓ Removed: $item ($description)"
		fi
		removed_items+=("$item")
		removed_count=$((removed_count + 1))
	fi
}

# Remove environment files
remove_item ".env.local" "environment secrets"
remove_item ".env" "environment variables"

# Remove node_modules
remove_item "node_modules" "installed dependencies"

# Remove Next.js build cache
remove_item ".next" "Next.js build cache"

# Remove personal override files (*.local.md)
while IFS= read -r -d '' file; do
	remove_item "$file" "personal override"
done < <(find . -maxdepth 3 -name "*.local.md" -type f -print0 2>/dev/null || true)

# Summary
echo ""
echo "=== Summary ==="
echo ""

if [[ "$removed_count" -eq 0 ]]; then
	echo "Nothing to clean — project is already clean."
else
	if [[ "$dry_run" == true ]]; then
		echo "Would remove $removed_count item(s)."
		echo ""
		echo "Run without --dry-run to actually remove these items."
	else
		echo "Cleaned $removed_count item(s)."
		echo ""
		echo "To restore the project, run:"
		echo "  pnpm install"
		echo ""
		echo "Or use /vpk-setup for full setup including environment configuration."
	fi
fi
