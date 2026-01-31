# VPK Sync

> Synchronize changes between your VPK prototype and the upstream VPK prototype kit.

---

## Quick Start

```bash
/vpk-sync              # Interactive mode - choose pull, push, or configure
/vpk-sync --pull       # Pull latest updates from upstream VPK
/vpk-sync --push       # Push local changes back to upstream via PR
/vpk-sync --init       # Configure upstream repository connection
```

---

## Prerequisites

- **Git** installed and configured
- **GitHub CLI** (`gh`) authenticated (`gh auth status`)
- **Upstream access** - read access for pull, write or fork for push

---

## Interactive Workflow

When invoked without flags, use AskUserQuestion to determine user intent:

```
Header: "Sync direction"
Question: "What would you like to do?"
Options:
  - "Pull updates" - Get latest changes from upstream VPK
  - "Push changes" - Contribute improvements back to upstream
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

## Init Workflow (`--init`)

### When to Use

- First time setting up sync
- Changing upstream repository
- Reconfiguring sync preferences

### Agent Instructions for Init

1. **Check current configuration**
   ```bash
   git remote get-url upstream 2>/dev/null
   cat .vpk-sync.json 2>/dev/null
   ```

2. **Ask for upstream URL** (if not already configured)
   Default: `https://github.com/eevennsoh/VPK`

3. **Execute init**
   ```bash
   ./.cursor/skills/vpk-sync/scripts/sync-init.sh <upstream-url> [--strategy merge|rebase]
   ```

4. **Verify connection**
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
3. Discard: `git checkout .` (⚠️ loses changes)

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

---

## Examples

### Initial Setup

```bash
# Configure upstream connection
/vpk-sync --init

# Or with specific URL
/vpk-sync --init https://github.com/your-org/vpk-fork
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
