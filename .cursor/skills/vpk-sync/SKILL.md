---
name: vpk-sync
description: Synchronize changes between your VPK prototype and the upstream VPK prototype kit. Use when the user asks to "sync with VPK", "pull updates", "push changes", "contribute back", "merge orphan branch", or wants to keep their prototype in sync with VPK.
argument-hint: "[--pull] [--push] [--merge] [--init] [--status]"
---

# VPK Sync

> Synchronize changes between your VPK prototype and the upstream VPK prototype kit.
> Works with or without creating a separate GitHub repo for your prototype.

---

## Quick Start

```bash
/vpk-sync              # Interactive mode - choose pull, push, merge, or configure
/vpk-sync --status     # Show sync status (commits ahead/behind)
/vpk-sync --pull       # Pull latest updates from upstream VPK
/vpk-sync --push       # Push local changes back to upstream via PR
/vpk-sync --merge      # Merge an orphan branch PR back to main
/vpk-sync --init       # Configure upstream repository connection
```

### Shorthand Aliases

| Alias | Equivalent | Description |
|-------|------------|-------------|
| `/vpk-sync` | Interactive | Choose action from menu |
| `/vpk-sync up` | `--push` | Push changes to upstream |
| `/vpk-sync down` | `--pull` | Pull updates from upstream |

---

## Prerequisites

- **Git** installed and configured
- **GitHub CLI** (`gh`) authenticated (`gh auth status`)
- **Upstream access** - read access for pull, write or fork for push

---

## Workflow Scenarios

### Scenario A: Cloned VPK, No Separate Repo

If you cloned VPK and are working directly in it (without `/vpk-repo --create`):

1. **Configure upstream** (one time): `/vpk-sync --init`
   - This renames `origin` → `upstream` and configures sync
2. **Pull updates**: `/vpk-sync --pull`
3. **Push improvements**: `/vpk-sync --push` (creates PR via fork)

### Scenario B: Created Separate Repo via `/vpk-repo`

If you used `/vpk-repo --create my-project`:

1. **Upstream already configured** (automatic)
   - `origin` = your new repo
   - `upstream` = VPK
2. **Pull updates**: `/vpk-sync --pull`
3. **Push improvements**: `/vpk-sync --push`

---

## Status Workflow (`--status`)

Shows current sync status with upstream.

### Agent Instructions for Status

1. **Check if upstream is configured**
   ```bash
   git remote get-url upstream 2>/dev/null
   ```
   If missing, suggest `/vpk-sync --init`

2. **Fetch and compare**
   ```bash
   git fetch upstream
   BEHIND=$(git rev-list --count HEAD..upstream/main 2>/dev/null || echo "0")
   AHEAD=$(git rev-list --count upstream/main..HEAD 2>/dev/null || echo "0")
   ```

3. **Report status**
   - `X commits behind` - can pull updates
   - `X commits ahead` - can push improvements
   - `Up to date` - fully synced

---

## Interactive Workflow

When invoked without flags, use AskUserQuestion to determine user intent:

```
Header: "Sync direction"
Question: "What would you like to do?"
Options:
  - "Check status" - See how many commits ahead/behind upstream
  - "Pull updates" - Get latest changes from upstream VPK
  - "Push changes" - Contribute improvements back to upstream
  - "Merge orphan PR" - Merge a branch with different commit history
  - "Configure" - Set up or change upstream connection
```

---

## Pull Workflow (`--pull`)

### What Gets Synced

All files from upstream **except**:
- Credentials: `.env*`, `.asap-config`, `*.pem`, `*.key`
- Deployment: `.deploy.local`, `service-descriptor.yml`
- Personal config: `*.local.md`, `*.local.json`, `.vpk-sync.json`
- Build artifacts: `node_modules/`, `.next/`, `out/`

### Strategy Options

| Strategy | When to Use | Command |
|----------|-------------|---------|
| **Merge** (default) | Safer, preserves history | `--pull` |
| **Rebase** | Cleaner history, more advanced | `--pull --rebase` |

### Conflict Handling

If conflicts occur:
1. Script identifies conflicting files
2. Provides resolution guidance
3. User resolves manually
4. User runs `git add <file>` then `git merge --continue` (or `git rebase --continue`)

### Agent Instructions for Pull

1. **Check for uncommitted changes**
   ```bash
   git status --porcelain
   ```
   If changes exist, ask user: stash, commit, or abort?

2. **Verify upstream remote exists**
   ```bash
   git remote get-url upstream 2>/dev/null
   ```
   If missing, run init workflow first.

3. **Fetch upstream**
   ```bash
   git fetch upstream
   ```

4. **Execute sync**
   ```bash
   ./.cursor/skills/vpk-sync/scripts/sync-pull.sh [--rebase] [--dry-run]
   ```

5. **Report results** - summarize what was updated or any conflicts

---

## Push Workflow (`--push`)

### What Gets Pushed

By default, all tracked changes. Use `--paths` to limit:
```bash
/vpk-sync --push --paths "components/blocks/new-feature/"
```

### Files Never Pushed

Same exclusions as pull (credentials, deployment config, personal settings).

### Agent Instructions for Push

1. **Check for changes to push**
   ```bash
   git status --porcelain
   git log upstream/main..HEAD --oneline 2>/dev/null
   ```

2. **Verify GitHub CLI is authenticated**
   ```bash
   gh auth status
   ```

3. **Gather PR details via AskUserQuestion**
   ```
   Header: "PR details"
   Questions:
     - "What does this change do?" (for title/description)
     - "Which files should be included?" (if selective sync needed)
   ```

4. **Execute push**
   ```bash
   ./.cursor/skills/vpk-sync/scripts/sync-push.sh --title "Title" [--paths "..."] [--dry-run]
   ```

5. **Report PR URL** - provide link for user to review

---

## Merge Workflow (`--merge`)

### When to Use

Use this when a branch has **no common commit history** with main. This happens when:
- A branch was created from a fresh VPK boilerplate export
- A branch was force-pushed with different base commits
- GitHub shows "entirely different commit histories" error

### How It Works

1. Identifies the orphan branch and its commits
2. Cherry-picks commits onto a new branch based on main
3. Creates a PR from the rebased branch
4. Optionally merges the PR

### Agent Instructions for Merge

1. **List open PRs or branches**
   ```bash
   gh pr list --state open --json number,title,headRefName,url
   git fetch origin
   git branch -r | grep -v main
   ```

2. **Ask user which branch to merge** (if multiple)
   ```
   Header: "Select branch"
   Question: "Which branch would you like to merge?"
   Options: [list of branches/PRs]
   ```

3. **Check if branch has common history with main**
   ```bash
   git merge-base --is-ancestor origin/main origin/<branch> 2>/dev/null
   # Exit code 0 = has common history (use normal merge)
   # Exit code 1 = no common history (needs cherry-pick)
   ```

4. **If no common history, cherry-pick approach:**
   ```bash
   # Get commits unique to the orphan branch
   git log origin/<branch> --oneline
   
   # Create new branch from main
   git checkout main
   git checkout -b <branch>-rebased
   
   # Cherry-pick each commit (skip the boilerplate base if any)
   git cherry-pick <commit-sha>
   
   # Resolve conflicts if any
   # For each conflict: review, resolve, git add, git cherry-pick --continue
   ```

5. **Push and create PR**
   ```bash
   git push -u origin <branch>-rebased
   gh pr create --base main --head <branch>-rebased --title "..." --body "..."
   ```

6. **Optionally merge the PR**
   ```bash
   gh pr merge <number> --merge
   ```

7. **Clean up** (optional)
   ```bash
   git checkout main
   git pull origin main
   git branch -d <branch>-rebased
   ```

### Conflict Resolution During Cherry-Pick

When conflicts occur:
1. Check which files conflict: `git diff --name-only --diff-filter=U`
2. Open and resolve conflicts manually
3. Stage resolved files: `git add <file>`
4. Continue: `git cherry-pick --continue`

If a commit is entirely superseded by main, skip it:
```bash
git cherry-pick --skip
```

---

## Init Workflow (`--init`)

### When to Use

- First time setting up sync (if not using `/vpk-repo --create`)
- Changing upstream repository
- Reconfiguring sync preferences

### Agent Instructions for Init

1. **Check current configuration**
   ```bash
   git remote get-url upstream 2>/dev/null
   git remote get-url origin 2>/dev/null
   cat .vpk-sync.json 2>/dev/null
   ```

2. **Determine scenario**
   - If `origin` points to VPK and no `upstream`: rename origin → upstream
   - If `origin` points to user's repo and no `upstream`: add upstream

3. **Ask for upstream URL** (if not already configured)
   Default: `https://github.com/eevennsoh/VPK`

4. **Execute init**
   ```bash
   ./.cursor/skills/vpk-sync/scripts/sync-init.sh <upstream-url> [--strategy merge|rebase]
   ```

5. **Verify connection**
   ```bash
   git fetch upstream --dry-run
   ```

---

## Configuration

### `.vpk-sync.json`

Created by init, stores sync preferences (gitignored):

```json
{
  "upstream": {
    "url": "https://github.com/eevennsoh/VPK",
    "defaultBranch": "main"
  },
  "sync": {
    "strategy": "merge",
    "excludePaths": []
  },
  "push": {
    "useFork": false,
    "forkRemote": "origin"
  }
}
```

### Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `upstream.url` | - | Upstream repository URL |
| `upstream.defaultBranch` | `main` | Branch to sync with |
| `sync.strategy` | `merge` | `merge` or `rebase` |
| `sync.excludePaths` | `[]` | Additional paths to exclude |
| `push.useFork` | `false` | Push via fork instead of direct |
| `push.forkRemote` | `origin` | Remote name for fork |

---

## Script Reference

### sync-init.sh

```bash
sync-init.sh [upstream-url] [options]
  --branch NAME    Default branch (default: main)
  --strategy STR   merge or rebase (default: merge)
  --dry-run        Preview only
```

### sync-pull.sh

```bash
sync-pull.sh [options]
  --rebase         Use rebase instead of merge
  --stash          Auto-stash uncommitted changes
  --paths "..."    Only sync specific paths (space-separated)
  --dry-run        Preview only
```

### sync-push.sh

```bash
sync-push.sh [options]
  --branch NAME    Branch name for PR
  --title "..."    PR title
  --body "..."     PR body/description
  --paths "..."    Only push specific paths (space-separated)
  --use-fork       Push via fork
  --dry-run        Preview only
```

### sync-merge.sh

```bash
sync-merge.sh [branch-name] [options]
  --dry-run        Preview only, don't make changes
  --auto-merge     Automatically merge the PR after creation
  --cleanup        Delete the rebased branch after merge
```

---

## Troubleshooting

### "No upstream remote configured"

Run init first:
```bash
/vpk-sync --init
```

### "Uncommitted changes detected"

Options:
1. Stash: `git stash` → sync → `git stash pop`
2. Commit: `git add . && git commit -m "WIP"`
3. Discard: `git checkout .` (loses changes)

### "Merge conflicts"

1. Open conflicting files (marked with `<<<<<<<`)
2. Resolve conflicts manually
3. Stage resolved files: `git add <file>`
4. Continue: `git merge --continue` or `git rebase --continue`

### "Permission denied on push"

Options:
1. Use fork: `/vpk-sync --push --use-fork`
2. Request write access to upstream
3. Create fork manually and update config

### "gh CLI not authenticated"

```bash
gh auth login
```

### "Entirely different commit histories"

This happens when a branch was created from a fresh boilerplate export:
```bash
# Use the merge workflow
/vpk-sync --merge <branch-name>

# Or manually:
git checkout main
git checkout -b <branch>-rebased
git cherry-pick <commit-sha>  # Skip the boilerplate commit
git push -u origin <branch>-rebased
gh pr create --base main --head <branch>-rebased
```

---

## Examples

### Initial Setup

```bash
# Configure upstream connection
/vpk-sync --init

# Or with specific URL
/vpk-sync --init https://github.com/your-org/vpk-fork
```

### Check Sync Status

```bash
# See how many commits ahead/behind
/vpk-sync --status

# Output example:
# Upstream: https://github.com/eevennsoh/VPK
# Status: 3 commits behind, 2 commits ahead
```

### Get Latest Updates

```bash
# Standard merge
/vpk-sync --pull

# Preview what would change
/vpk-sync --pull --dry-run

# Use rebase for cleaner history
/vpk-sync --pull --rebase
```

### Contribute Back

```bash
# Push all changes
/vpk-sync --push

# Push specific feature
/vpk-sync --push --paths "components/blocks/my-feature/"

# Preview PR
/vpk-sync --push --dry-run
```

### Merge Orphan Branch

```bash
# Merge a branch with no common history
/vpk-sync --merge

# Merge specific branch
/vpk-sync --merge fix-composer

# Useful when GitHub shows:
# "main and <branch> are entirely different commit histories"
```

---

## Integration with Other Skills

| Skill | Relationship |
|-------|--------------|
| `/vpk-setup` | Run first to configure credentials |
| `/vpk-repo --create` | Creates new repo with upstream auto-configured |
| `/vpk-deploy` | Deploy after pulling updates |

### Typical Workflow

```
1. Clone VPK
2. /vpk-setup (credentials)
3. /vpk-repo --create my-project (optional - creates separate repo)
4. Develop...
5. /vpk-sync --push (contribute back)
6. /vpk-sync --pull (get updates periodically)
```
