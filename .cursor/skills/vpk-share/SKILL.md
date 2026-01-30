---
name: vpk-share
description: Create a sanitized boilerplate export of the VPK repo for reuse or sharing. Use when you need to strip credentials, local-only files, build artifacts, and caches before creating a clean template. Triggers include requests to "make a boilerplate," "clean repo for sharing," "remove secrets," "prepare template," or "export a clean copy."
argument-hint: "reset (clean in-place) | export (copy to dest)"
disable-model-invocation: true
---

# VPK Share

## Overview

Create a clean, shareable VPK boilerplate by removing credentials, local-only files, and build artifacts, then exporting a fresh copy with no git remote origin (prevents accidental pushes back to the original repo).

## Quick start

**Option A: Reset the current repo to clean state**

```bash
bash scripts/build_vpk_boilerplate.sh --reset
```

This removes credentials, local files, and build artifacts (including `node_modules`) in-place.

**Option B: Export a sanitized copy**

1. Run the bundled script `scripts/build_vpk_boilerplate.sh` with `--src` pointing at the VPK repo and `--dest` for the export path.
2. Review the export with the checklist in `references/boilerplate-checklist.md`.
3. Push the export back to the single source of truth repo unless a different remote is explicitly requested.

## Workflow

### 1) Reset mode (clean up in-place)

Use `--reset` to remove all local/credential files from the current repo:

```bash
bash scripts/build_vpk_boilerplate.sh --reset
```

Files removed:
- `.deploy.local` (deployment credentials)
- `.env.local` (environment variables)
- `.asap-config` (ASAP credentials)
- `.dev-pids`, `.dev-backend-port` (dev server state)
- `*.local.md`, `*.local.json` (local config files)

Directories removed:
- `node_modules/`, `backend/node_modules/` (dependencies)
- `.next/`, `out/`, `build/` (build outputs)
- `.turbo/`, `.cache/`, `.vercel/` (caches)
- `coverage/` (test coverage)

Use `--dry-run` to preview what would be removed:

```bash
bash scripts/build_vpk_boilerplate.sh --reset --dry-run
```

### 2) Pre-flight checks (for export mode)

- Confirm `.env.local` and any credential files are not required for the boilerplate.
- Ensure `service-descriptor.yml` still uses placeholders (e.g., `YOUR-SERVICE-NAME`, `your-email@atlassian.com`).
- Verify `.env.local.example` is present and contains only placeholders.
- Scan for obvious secrets (private keys, tokens) before export.

### 3) Build the boilerplate export

Use the script bundled with this skill:

```bash
bash scripts/build_vpk_boilerplate.sh --src /path/to/VPK --dest /path/to/VPK-boilerplate
```

Notes:

- The script excludes build outputs, caches, node_modules, env files, and common credential patterns.
- `.env.local.example` is re-included if it exists in the source.
- If the destination exists, pass `--force` to replace it.
- Local files (`.deploy.local`, etc.) are automatically cleaned from the destination.

### 4) Review the export

- Run the checklist in `references/boilerplate-checklist.md`.
- Verify there are no secrets or credentials in the export.
- Confirm `pnpm install` and `pnpm run dev` work from the export.

### 5) Set up your new remote

The exported boilerplate has a fresh git repo with no remote origin. Add your own:

```bash
cd /path/to/VPK-boilerplate
git remote add origin <your-new-repo-url>
git push -u origin main
```

This prevents accidental pushes back to the original prototype kit repo.

## Resources

- `scripts/build_vpk_boilerplate.sh` — create a sanitized export with sensible excludes and safety checks.
- `references/boilerplate-checklist.md` — review list for credentials, build artifacts, and placeholders.
