---
name: vpk-push
description: Create a new GitHub repository and push all local changes. This skill should be used when the user asks to "push to a new repo", "create a github repo", "publish to github", "push changes to new repo", or wants to commit and push everything to a fresh GitHub repository.
argument-hint: "[repo-name] [--public]"
---

# VPK Push

Create a new GitHub repository and push all local changes to it.

## Prerequisites

- GitHub CLI (`gh`) installed and authenticated
- Git initialized in the current directory

## Workflow

When invoked, this skill will:

1. **Ask for the repository name** using AskUserQuestion with options:
   - User can provide a custom name
   - Default: `vpk-{timestamp}` (e.g., `vpk-20260131-143052`)

2. **Ask for visibility** (if not specified via `--public` argument):
   - Private (default)
   - Public

3. **Run the push script** with the provided options

## Quick Start

```bash
# Interactive - will prompt for repo name
bash scripts/push-to-new-repo.sh

# With repo name
bash scripts/push-to-new-repo.sh my-new-repo
```

This will:
1. Stage all unstaged changes
2. Commit with a default message (if there are changes)
3. Create a new private GitHub repo
4. Push all commits to the new repo

## Options

```bash
# Create a public repo
bash scripts/push-to-new-repo.sh my-new-repo --public

# Preview what would happen (no changes made)
bash scripts/push-to-new-repo.sh my-new-repo --dry-run

# Custom commit message
bash scripts/push-to-new-repo.sh my-new-repo --message "Initial commit"
```

## Agent Instructions

When this skill is invoked:

1. Use `AskUserQuestion` to ask for the preferred GitHub repo name:
   - Header: "Repo name"
   - Question: "What would you like to name the GitHub repository?"
   - Options:
     - Label: `vpk-{timestamp}` (generate current timestamp), Description: "Default timestamped name"
     - Label: "Current folder name", Description: "Use the current directory name"
   - User can also provide a custom name via "Other"

2. After getting the repo name, run:
   ```bash
   bash .cursor/skills/vpk-push/scripts/push-to-new-repo.sh <repo-name> [--public]
   ```

3. Report the resulting GitHub URL to the user.

## Script Reference

| Option      | Description                              |
| ----------- | ---------------------------------------- |
| `--public`  | Create a public repository (default: private) |
| `--dry-run` | Preview actions without executing        |
| `--message` | Custom commit message                    |
| `-h, --help`| Show help                                |
