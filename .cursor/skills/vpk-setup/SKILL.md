---
name: vpk-setup
description: Initial repository setup - install dependencies, generate ASAP credentials, configure environment, and start dev servers
disable-model-invocation: true
prerequisites: []
produces: [.env.local, .asap-config]
---

# VPK Setup - Initial Repository Setup

**Goal:** Get the prototype running locally with AI Gateway authentication working.

## Step 0: Gather User Information First

**Before starting setup, collect these from the user:**

**Atlassian email address**

- Try: `git config user.email`
- If not set or not @atlassian.com, ask user for it
- Needed for: `.env.local` (AI_GATEWAY_USER_ID)
- Used by `create-env-local.js` unless you pass an explicit email argument
- `.env.local` is gitignored, so the repo is never prefilled with any email

**AI Gateway use case ID** (REQUIRED - always ask user)

- User must provide their own use case ID
- Can request one from #help-ai-gateway channel if they don't have it
- Needed for: `.env.local` (AI_GATEWAY_USE_CASE_ID), ASAP key generation

## Quick Workflow

1. **Check prerequisites** → Node.js 18+, Atlas CLI, YubiKey enrolled
2. **Install dependencies** → `pnpm install`
3. **Generate ASAP credentials** → See commands below
4. **Create config files** → `.env.local` from `.asap-config`
5. **Start servers** → Run `pnpm run dev` (auto-finds available ports if defaults are busy)
6. **Verify** → http://localhost:3000 (or the port shown in terminal output)

## Essential Commands

```bash
# Install dependencies
pnpm install

# Generate ASAP credentials (CRITICAL: generate timestamp ONCE!)
# Replace YOUR-USE-CASE-ID with the user's provided use case ID
TIMESTAMP=$(date +%s)
echo "Using timestamp: $TIMESTAMP"
atlas asap key generate --key YOUR-USE-CASE-ID/$TIMESTAMP --file .asap-config
atlas asap key save --key YOUR-USE-CASE-ID/$TIMESTAMP --service YOUR-USE-CASE-ID --env staging --file .asap-config

# Note: You'll need to authenticate when prompted (browser will open)

# Create .env.local from .asap-config
# Script location: .cursor/skills/vpk-setup/scripts/create-env-local.js
# Replace YOUR-USE-CASE-ID with the user's provided use case ID
# AI_GATEWAY_USER_ID is required in .env.local, but the script can infer it
# from git config unless you pass it explicitly.
node ./.cursor/skills/vpk-setup/scripts/create-env-local.js YOUR-USE-CASE-ID
# Optional (explicit override of git config):
# node ./.cursor/skills/vpk-setup/scripts/create-env-local.js YOUR-USE-CASE-ID your-email@atlassian.com

# Start development servers
# Port auto-discovery: If 3000/8080 are busy, servers automatically use 3001+/8081+
# Try running this first. If it fails or blocks, ask user to run manually in their terminal
pnpm run dev

# Verify backend health (use the port shown in terminal output if not 8080)
curl http://localhost:8080/api/health
```

## Critical Files to Create

These files are gitignored and **must be created** (using info from Step 0):

1. **`.asap-config`** - Generate with `atlas asap key generate` (see above)
2. **`.env.local`** - Needs user's email; Default uses **Claude via Bedrock**: `https://ai-gateway.us-east-1.staging.atl-paas.net/v1/bedrock/model/anthropic.claude-3-5-haiku-20241022-v1:0/invoke-with-response-stream`
3. **`.vscode/mcp.json`** - Needs Figma token if user wants it; Copy from `.vscode/mcp.json.example`

**Note:** Deployment files (like `service-descriptor.yml`) are handled by `/vpk-deploy` skill.

## Model Switching

VPK supports both **Claude (Bedrock)** and **GPT** models. **Claude is the default.**

| Provider | Model | When to Use |
|----------|-------|-------------|
| **Claude (Default)** | `anthropic.claude-3-5-haiku-20241022-v1:0` | Fast, cost-effective, good for most use cases |
| **GPT** | `gpt-5.2-2025-12-11` | Alternative if user prefers GPT |

### Quick Switch

To switch to GPT, update `.env.local`:

```bash
AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/openai/v1/chat/completions
```

To switch back to Claude (default):

```bash
AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/bedrock/model/anthropic.claude-3-5-haiku-20241022-v1:0/invoke-with-response-stream
```

Then restart dev servers with `pnpm run dev`.

For detailed model switching instructions, see [references/guide-model-switch.md](references/guide-model-switch.md).

## Setup Checklist

- [ ] **User info collected** (email, use case ID, optional Figma token)
- [ ] Node.js 18+, Atlas CLI, YubiKey enrolled
- [ ] Dependencies installed
- [ ] **ASAP credentials generated (timestamp generated ONCE)**
- [ ] `.env.local` created with Claude/Bedrock URL and user's email
- [ ] Dev servers started (or user instructed to run `pnpm run dev` if auto-start failed)
- [ ] Health check shows all env vars "SET"
- [ ] Chat responds at http://localhost:3000 (or auto-assigned port)

**✅ Setup Complete!** Prototype is running locally with AI Gateway authentication.

## Quick Troubleshooting

| Issue                        | Quick Fix                                                           |
| ---------------------------- | ------------------------------------------------------------------- |
| Auth errors during ASAP save | `atlas upgrade`                                                     |
| "EADDRINUSE" error           | Servers auto-find available ports (3001+/8081+). If still failing, run with `--force-kill`: `./.cursor/skills/vpk-setup/scripts/start-dev.sh --force-kill` |
| Next.js lock error           | Remove stale lock: `rm -f .next/dev/lock` then restart              |
| Zombie processes blocking ports | Force kill: `lsof -ti:3000,8080 \| xargs kill -9` (requires full permissions) |
| Frontend 500 (providers)     | Ensure `components/providers.tsx` matches import casing           |
| "ASAP_PRIVATE_KEY: MISSING"  | Check .env.local format - private key must be quoted and escaped    |
| No AI response               | Verify health check passes                                          |
| **Mismatched ASAP KID**      | **You generated timestamp twice! Regenerate with single timestamp** |
| "Model Id [X] not found"     | Model not whitelisted. Run `atlas ml aigateway usecase view --id YOUR-USE-CASE-ID -e stg-west` to check available models |
| Want to switch models        | See [Model Switching Guide](references/guide-model-switch.md)     |

### Port Auto-Discovery

VPK dev servers automatically find available ports if defaults are in use:
- **Frontend**: Tries ports 3000-3019 (configurable via `PORT` env var)
- **Backend**: Tries ports 8080-8099 (configurable via `BACKEND_PORT` env var)

The actual ports are shown in terminal output when servers start. If a non-default port is used, you'll see a message like `"Port 3000 in use. Using 3001 instead."`

## Next Steps

- **Develop locally:** Run `pnpm run dev` in your terminal (Ctrl+C to stop)
- **Ready to deploy?** Use `/vpk-deploy` to create a permanent, shareable URL
- **Make changes:** Edit code, test locally, then commit and `/vpk-deploy` again

## References

- [Setup Guide](references/guide-setup.md) - Detailed setup documentation
- [Model Switching Guide](references/guide-model-switch.md) - Switch between Claude and OpenAI models
