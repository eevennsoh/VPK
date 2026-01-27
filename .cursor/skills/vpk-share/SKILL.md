---
name: vpk-share
description: Create a sanitized boilerplate export of the VPK repo for reuse or sharing. Use when you need to strip credentials, local-only files, build artifacts, and caches before pushing a clean template back to the single source of truth repo (unless another destination is specified). Triggers include requests to “make a boilerplate,” “clean repo for sharing,” “remove secrets,” “prepare template,” or “export a clean copy.”
disable-model-invocation: true
---

# VPK Share

## Overview

Create a clean, shareable VPK boilerplate by removing credentials, local-only files, and build artifacts, then exporting a fresh copy ready to push back to the single source of truth repo.

## Quick start

1. Run the bundled script `scripts/build_vpk_boilerplate.sh` with `--src` pointing at the VPK repo and `--dest` for the export path.
2. Review the export with the checklist in `references/boilerplate-checklist.md`.
3. Push the export back to the single source of truth repo unless a different remote is explicitly requested.

## Workflow

### 1) Pre-flight checks

- Confirm `.env.local` and any credential files are not required for the boilerplate.
- Ensure `service-descriptor.yml` still uses placeholders (e.g., `YOUR-SERVICE-NAME`, `your-email@atlassian.com`).
- Verify `.env.local.example` is present and contains only placeholders.
- Scan for obvious secrets (private keys, tokens) before export.

### 2) Build the boilerplate export

Use the script bundled with this skill:

```bash
bash scripts/build_vpk_boilerplate.sh --src /path/to/VPK --dest /path/to/VPK-boilerplate
```

Notes:

- The script excludes build outputs, caches, node_modules, env files, and common credential patterns.
- `.env.local.example` is re-included if it exists in the source.
- If the destination exists, pass `--force` to replace it.

### 3) Review the export

- Run the checklist in `references/boilerplate-checklist.md`.
- Verify there are no secrets or credentials in the export.
- Confirm `pnpm install` and `pnpm run dev` work from the export.

### 4) Push to the single source of truth repo (default)

- Use the default remote unless the user specifies another destination.
- Default remote: `https://github.com/eevennsoh/VPK`
- Tag or release as a template if desired.

## Resources

- `scripts/build_vpk_boilerplate.sh` — create a sanitized export with sensible excludes and safety checks.
- `references/boilerplate-checklist.md` — review list for credentials, build artifacts, and placeholders.
