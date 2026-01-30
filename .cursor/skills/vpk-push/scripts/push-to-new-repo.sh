#!/usr/bin/env bash
set -euo pipefail

show_help() {
	cat <<'USAGE'
Usage: push-to-new-repo.sh <repo-name> [options]

Create a new GitHub repository and push all local changes to it.

Arguments:
	repo-name     Name for the new GitHub repository

Options:
	--public      Create a public repository (default: private)
	--dry-run     Preview actions without executing
	--message MSG Custom commit message (default: "Initial commit")
	-h, --help    Show this help

Prerequisites:
	- GitHub CLI (gh) installed and authenticated
	- Git initialized in current directory

Examples:
	push-to-new-repo.sh my-app
	push-to-new-repo.sh my-app --public
	push-to-new-repo.sh my-app --message "First commit"
USAGE
}

repo_name=""
visibility="private"
dry_run=false
commit_message="Initial commit"

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
		--message)
			commit_message="$2"
			shift 2
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
			if [[ -z "$repo_name" ]]; then
				repo_name="$1"
			else
				echo "Unexpected argument: $1" >&2
				show_help >&2
				exit 1
			fi
			shift
			;;
	esac
done

if [[ -z "$repo_name" ]]; then
	echo "Error: Repository name is required" >&2
	echo "" >&2
	show_help >&2
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

if ! git rev-parse --git-dir >/dev/null 2>&1; then
	echo "Error: Not a git repository" >&2
	echo "Run: git init" >&2
	exit 1
fi

# Get GitHub username for URL display
gh_user=$(gh api user --jq '.login' 2>/dev/null || echo "")

echo "=== VPK Push ==="
echo ""
echo "Repository: $repo_name"
echo "Visibility: $visibility"
[[ -n "$gh_user" ]] && echo "Owner: $gh_user"
echo ""

# Check for unstaged changes
unstaged_count=$(git status --porcelain | wc -l | tr -d ' ')

if [[ "$unstaged_count" -gt 0 ]]; then
	echo "Found $unstaged_count file(s) with changes"

	if [[ "$dry_run" == true ]]; then
		echo "[dry-run] Would stage all changes"
		echo "[dry-run] Would commit with message: $commit_message"
	else
		echo "Staging all changes..."
		git add -A

		echo "Committing..."
		git commit -m "$commit_message"
	fi
else
	echo "No unstaged changes found"
fi

# Check if there are any commits
commit_count=$(git rev-list --count HEAD 2>/dev/null || echo "0")

if [[ "$commit_count" -eq 0 ]]; then
	echo "Error: No commits to push" >&2
	echo "Create at least one commit first" >&2
	exit 1
fi

echo ""
echo "Total commits to push: $commit_count"

# Create GitHub repo
if [[ "$dry_run" == true ]]; then
	echo ""
	echo "[dry-run] Would create $visibility GitHub repo: $repo_name"
	echo "[dry-run] Would add remote origin"
	echo "[dry-run] Would push to origin"
	echo ""
	echo "Dry run complete. No changes made."
else
	echo ""
	echo "Creating GitHub repository..."

	gh repo create "$repo_name" --"$visibility" --source=. --remote=origin --push

	echo ""
	echo "=== Success ==="
	echo ""
	echo "Repository created and pushed!"
	[[ -n "$gh_user" ]] && echo "URL: https://github.com/$gh_user/$repo_name"
fi
