---
name: vpk-push
description: Create a new GitHub repository and push all local changes. This skill should be used when the user asks to "push to a new repo", "create a github repo", "publish to github", "push changes to new repo", or wants to commit and push everything to a fresh GitHub repository.
argument-hint: "repo-name [--public]"
---

# VPK Push

Create a new GitHub repository and push all local changes to it.

## Prerequisites

- GitHub CLI (`gh`) installed and authenticated
- Git initialized in the current directory

## Quick Start

```bash
bash scripts/push-to-new-repo.sh my-new-repo
```

This will:
1. Stage all unstaged changes
2. Commit with a default message (if there are changes)
3. Create a new private GitHub repo named `my-new-repo`
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

## Workflow

### 1) Check prerequisites

Verify `gh` CLI is installed and authenticated:

```bash
gh auth status
```

### 2) Run the script

```bash
bash scripts/push-to-new-repo.sh <repo-name> [options]
```

### 3) Verify

The script outputs the new repository URL. Visit it to confirm the push succeeded.

## Script Reference

| Option      | Description                              |
| ----------- | ---------------------------------------- |
| `--public`  | Create a public repository (default: private) |
| `--dry-run` | Preview actions without executing        |
| `--message` | Custom commit message                    |
| `-h, --help`| Show help                                |
