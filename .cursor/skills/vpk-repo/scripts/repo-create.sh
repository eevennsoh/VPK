#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# repo-create.sh
# Creates a fresh project copy and pushes it to a new GitHub repository
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

show_help() {
	cat <<'USAGE'
Usage: repo-create.sh <project-name> [options]

Create a fresh project copy in a sibling directory and push to a new GitHub repository.

Arguments:
	project-name    Name for the new project directory and GitHub repository

Options:
	--public        Create a public repository (default: private)
	--dry-run       Preview actions without executing
	-h, --help      Show this help

Workflow:
	1. Resets current project (removes .env, node_modules, .next, etc.)
	2. Creates sibling directory: ../<project-name>/
	3. Copies project files (excludes .git, node_modules, .next, .env*)
	4. Initializes git: git init && git add -A && git commit
	5. Creates GitHub repo: gh repo create <name> --source=. --push
	6. Reports the new GitHub URL

Prerequisites:
	- GitHub CLI (gh) installed and authenticated

Examples:
	repo-create.sh my-app              # Create private repo
	repo-create.sh my-app --public     # Create public repo
	repo-create.sh my-app --dry-run    # Preview what would happen
USAGE
}

project_name=""
visibility="private"
dry_run=false

while [[ $# -gt 0 ]]; do
	case "$1" in
		--public)
			visibility="public"
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
		-*)
			echo "Unknown option: $1" >&2
			show_help >&2
			exit 1
			;;
		*)
			if [[ -z "$project_name" ]]; then
				project_name="$1"
			else
				echo "Unexpected argument: $1" >&2
				show_help >&2
				exit 1
			fi
			shift
			;;
	esac
done

# Validate project name
if [[ -z "$project_name" ]]; then
	echo "Error: Project name is required" >&2
	show_help >&2
	exit 1
fi

# Validate project name format (lowercase, hyphens, no spaces)
if [[ ! "$project_name" =~ ^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$ ]]; then
	echo "Error: Project name must be lowercase with hyphens only (e.g., my-project)" >&2
	exit 1
fi

# Check prerequisites
if ! command -v gh >/dev/null 2>&1; then
	echo "Error: GitHub CLI (gh) is not installed" >&2
	echo "Install it from: https://cli.github.com/" >&2
	exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
	echo "Error: GitHub CLI is not authenticated" >&2
	echo "Run: gh auth login" >&2
	exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
	echo "Error: rsync is not installed" >&2
	exit 1
fi

# Get GitHub username for URL display
gh_user=$(gh api user --jq '.login' 2>/dev/null || echo "")

# Calculate paths
source_dir="$(pwd)"
parent_dir="$(dirname "$source_dir")"
target_dir="$parent_dir/$project_name"

echo "=== VPK Create ==="
echo ""
echo "Project name: $project_name"
echo "Visibility:   $visibility"
[[ -n "$gh_user" ]] && echo "Owner:        $gh_user"
echo ""
echo "Source:       $source_dir"
echo "Target:       $target_dir"
echo ""

# Check if target already exists
if [[ -d "$target_dir" ]]; then
	echo "Error: Target directory already exists: $target_dir" >&2
	exit 1
fi

# Step 1: Reset current project
echo "--- Step 1: Reset current project ---"
echo ""

if [[ "$dry_run" == true ]]; then
	echo "[dry-run] Would run: repo-reset.sh --dry-run"
	bash "$SCRIPT_DIR/repo-reset.sh" --dry-run
else
	bash "$SCRIPT_DIR/repo-reset.sh"
fi

echo ""

# Step 2: Create target directory
echo "--- Step 2: Create target directory ---"
echo ""

if [[ "$dry_run" == true ]]; then
	echo "[dry-run] Would create: $target_dir"
else
	mkdir -p "$target_dir"
	echo "✓ Created: $target_dir"
fi

echo ""

# Step 3: Copy project files
echo "--- Step 3: Copy project files ---"
echo ""

# Build exclude list
excludes=(
	".git"
	"node_modules"
	".next"
	".env"
	".env.local"
	".env.*.local"
	"*.local.md"
)

rsync_excludes=""
for exclude in "${excludes[@]}"; do
	rsync_excludes="$rsync_excludes --exclude=$exclude"
done

if [[ "$dry_run" == true ]]; then
	echo "[dry-run] Would copy files from $source_dir to $target_dir"
	echo "[dry-run] Excluding: ${excludes[*]}"
	# Show what would be copied
	eval "rsync -av --dry-run $rsync_excludes \"$source_dir/\" \"$target_dir/\"" | head -20
	echo "..."
else
	eval "rsync -av $rsync_excludes \"$source_dir/\" \"$target_dir/\""
	echo ""
	echo "✓ Files copied"
fi

echo ""

# Step 4: Initialize git in target
echo "--- Step 4: Initialize git ---"
echo ""

if [[ "$dry_run" == true ]]; then
	echo "[dry-run] Would run: git init"
	echo "[dry-run] Would run: git add -A"
	echo "[dry-run] Would run: git commit -m 'Initial commit'"
else
	cd "$target_dir"
	git init
	git add -A
	git commit -m "Initial commit"
	echo ""
	echo "✓ Git initialized and committed"
fi

echo ""

# Step 5: Create GitHub repo and push
echo "--- Step 5: Create GitHub repository ---"
echo ""

if [[ "$dry_run" == true ]]; then
	echo "[dry-run] Would run: gh repo create $project_name --$visibility --source=. --remote=origin --push"
else
	cd "$target_dir"
	gh repo create "$project_name" --"$visibility" --source=. --remote=origin --push
fi

echo ""

# Summary
echo "=== Success ==="
echo ""

if [[ "$dry_run" == true ]]; then
	echo "Dry run complete. No changes made."
	echo ""
	echo "Run without --dry-run to create the project."
else
	echo "✓ Project created and pushed!"
	echo ""
	[[ -n "$gh_user" ]] && echo "GitHub URL: https://github.com/$gh_user/$project_name"
	echo ""
	echo "Next steps:"
	echo "  cd $target_dir"
	echo "  pnpm install"
	echo ""
	echo "Or run /vpk-setup for full setup including environment configuration."
fi
