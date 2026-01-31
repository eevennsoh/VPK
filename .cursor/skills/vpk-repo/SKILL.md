---
name: vpk-repo
description: Create and manage GitHub repositories from VPK projects. Use when the user asks to "create a new repo", "create a github repo", "publish to github", "push to new repo", "reset project", "clean project", or wants to spin off a fresh GitHub repository from the VPK template.
argument-hint: "[--create <name>] [--reset] [--public] [--no-upstream]"
---

# VPK Repo

Create and manage GitHub repositories from VPK projects. Automatically configures upstream sync with VPK.

## Quick Start

| Command | Action |
|---------|--------|
| `/vpk-repo` | Interactive mode — asks what you want to do |
| `/vpk-repo --create <name>` | Full workflow: reset + copy + create repo + push + configure upstream |
| `/vpk-repo --create <name> --no-upstream` | Create standalone repo without VPK sync |
| `/vpk-repo --reset` | Clean credentials and cache only |

## Prerequisites

- GitHub CLI (`gh`) installed and authenticated
- Git initialized in the current directory (for `--reset` only)

---

## Interactive Workflow (Default)

When invoked without flags, use `AskUserQuestion` to determine what the user wants:

```yaml
header: "Action"
question: "What would you like to do?"
options:
  - label: "Create new project (Recommended)"
    description: "Clean, copy to new directory, create GitHub repo, configure VPK sync"
  - label: "Reset only"
    description: "Clean credentials and cache (no repo creation)"
```

After the user selects an option, follow the corresponding workflow below.

---

## Create Workflow (--create)

Creates a fresh project copy in a sibling directory and pushes it to a new GitHub repository.
**Automatically configures upstream for syncing with VPK.**

### What It Does

1. **Captures VPK origin URL** (for upstream configuration)
2. **Resets current project** (runs reset logic internally)
3. **Creates sibling directory** — `../<project-name>/`
4. **Copies project files** — excludes `.git`, `node_modules`, `.next`, `.env*`
5. **Initializes git** — `git init && git add -A && git commit -m "Initial commit"`
6. **Creates GitHub repo** — `gh repo create <name> --"$visibility" --source=. --push`
7. **Configures upstream** — adds `upstream` remote + creates `.vpk-sync.json`
8. **Reports the new GitHub URL**

### Upstream Configuration

By default, the script:
- Captures the current `origin` URL (assumed to be VPK)
- Adds it as `upstream` remote in the new project
- Creates `.vpk-sync.json` for sync preferences
- Enables `/vpk-sync --pull` and `/vpk-sync --push` workflows

Use `--no-upstream` to skip this and create a standalone project.

### Agent Instructions

1. If `<name>` not provided in args, use `AskUserQuestion`:
   ```yaml
   header: "Project name"
   question: "What should the new project be named?"
   options:
     - label: "vpk-{timestamp}"
       description: "Default timestamped name (e.g., vpk-20260131-143052)"
     - label: "Current folder name"
       description: "Use the current directory name"
   ```

2. Ask for visibility:
   ```yaml
   header: "Visibility"
   question: "Should the repository be public or private?"
   options:
     - label: "Private (Recommended)"
       description: "Only you and collaborators can see it"
     - label: "Public"
       description: "Anyone on the internet can see it"
   ```

3. Run the create script:
   ```bash
   bash .cursor/skills/vpk-repo/scripts/repo-create.sh <project-name> [--public] [--no-upstream]
   ```

4. Report the resulting GitHub URL to the user.

5. Remind the user to:
   - `cd ../<project-name>` to enter the new project
   - Run `pnpm install` or `/vpk-setup` to set up the new project

6. If upstream was configured, mention:
   - `/vpk-sync --pull` to get VPK updates
   - `/vpk-sync --push` to contribute improvements back

---

## Reset Workflow (--reset)

Cleans the project by removing credentials, caches, and build artifacts.

### What Gets Cleaned

| Item | Description |
|------|-------------|
| `.env.local`, `.env` | Environment variables and secrets |
| `node_modules/` | Installed dependencies |
| `.next/` | Next.js build cache |
| ASAP credentials | Any ASAP tokens/keys if present in files |

### Agent Instructions

1. Run the reset script:
   ```bash
   bash .cursor/skills/vpk-repo/scripts/repo-reset.sh
   ```

2. Report what was cleaned to the user.

3. Remind the user to run `pnpm install` or `/vpk-setup` to restore the project.

---

## Script Reference

| Script | Purpose |
|--------|---------|
| `scripts/repo-create.sh <name> [options]` | Full create workflow with upstream config |
| `scripts/repo-reset.sh` | Clean project files |

### repo-create.sh

```bash
# Create private repo with upstream sync (default)
bash .cursor/skills/vpk-repo/scripts/repo-create.sh my-project

# Create public repo with upstream sync
bash .cursor/skills/vpk-repo/scripts/repo-create.sh my-project --public

# Create standalone repo (no VPK sync)
bash .cursor/skills/vpk-repo/scripts/repo-create.sh my-project --no-upstream

# Preview without executing
bash .cursor/skills/vpk-repo/scripts/repo-create.sh my-project --dry-run
```

### repo-reset.sh

```bash
# Clean the current project
bash .cursor/skills/vpk-repo/scripts/repo-reset.sh

# Preview without executing
bash .cursor/skills/vpk-repo/scripts/repo-reset.sh --dry-run
```

---

## Files Excluded from Copy

When using `--create`, these files and directories are excluded:

- `.git/` — Git history (fresh repo starts clean)
- `node_modules/` — Dependencies (reinstall in new project)
- `.next/` — Build cache
- `.env*` — Environment files and secrets
- `*.local.md` — Personal override files

---

## VPK Sync Integration

After creating a project with upstream configured, you can:

| Command | Action |
|---------|--------|
| `/vpk-sync --pull` | Pull latest updates from VPK |
| `/vpk-sync --push` | Push improvements back to VPK via PR |
| `/vpk-sync --init` | Reconfigure upstream if needed |

See `/vpk-sync` skill for full sync documentation.

---

## Examples

### Create a new project interactively

```
/vpk-repo
→ Select "Create new project"
→ Enter project name: "my-awesome-app"
→ Select "Private"
→ Creates ../my-awesome-app/ with fresh GitHub repo
→ Configures upstream for VPK sync
```

### Create with all options specified

```
/vpk-repo --create my-awesome-app --public
→ Captures VPK origin URL
→ Resets current project
→ Creates ../my-awesome-app/
→ Pushes to public GitHub repo
→ Configures upstream sync
```

### Create standalone project (no sync)

```
/vpk-repo --create my-standalone-app --no-upstream
→ Creates project without VPK upstream
→ No sync configuration (standalone)
```

### Just reset the current project

```
/vpk-repo --reset
→ Removes .env files, node_modules, .next
→ Project is clean but no new repo created
```
