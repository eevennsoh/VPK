---
name: vpk-setup
description: Initial repository setup - install dependencies, generate ASAP credentials, configure environment, and start dev servers
disable-model-invocation: true
---

# VPK Setup - Initial Repository Setup

**Goal:** Get the prototype running locally with AI Gateway authentication working.

## Step 0: Gather User Information First

**Before starting setup, collect these from the user:**

1. **Atlassian email address**
   - Try: `git config user.email`
   - If not set or not @atlassian.com, ask user for it
   - Needed for: `.env.local` (AI_GATEWAY_USER_ID)

2. **Figma API token** (optional)
   - Only if they want Figma integration
   - Get from https://www.figma.com/developers/api
   - Needed for: `.vscode/mcp.json`

## Quick Workflow

1. **Check prerequisites** → Node.js 18+, Atlas CLI, YubiKey enrolled
2. **Install dependencies** → `pnpm install`
3. **Generate ASAP credentials** → See commands below
4. **Create config files** → `.env.local` from `.asap-config`
5. **Start servers** → Run `start-dev.sh` from this skill's scripts directory
6. **Verify** → http://localhost:3000

## Essential Commands

```bash
# Install dependencies
pnpm install

# Generate ASAP credentials (CRITICAL: generate timestamp ONCE!)
TIMESTAMP=$(date +%s)
echo "Using timestamp: $TIMESTAMP"
atlas asap key generate --key caid-proto/$TIMESTAMP --file .asap-config
atlas asap key save --key caid-proto/$TIMESTAMP --service caid-proto --env staging --file .asap-config

# Note: This requires YubiKey tap - user will get browser prompt

# Create .env.local from .asap-config (using OpenAI URL)
node -e "
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('.asap-config', 'utf8'));
const escaped = config.privateKey.replace(/\n/g, '\\\\n');
const email = '$(git config user.email)';
const envContent = \`# AI Gateway Configuration (caid-proto is pre-configured)
AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/openai/v1/chat/completions
AI_GATEWAY_USE_CASE_ID=caid-proto
AI_GATEWAY_CLOUD_ID=local-testing
AI_GATEWAY_USER_ID=\${email}

# ASAP Credentials (Required for browser VMs and production)
ASAP_PRIVATE_KEY=\"\${escaped}\"
ASAP_KID=\${config.kid}
ASAP_ISSUER=\${config.issuer}

# Frontend configuration (for production builds)
# NEXT_PUBLIC_API_URL=https://your-service-name.us-west-2.platdev.atl-paas.net
\`;
fs.writeFileSync('.env.local', envContent);
console.log('✓ Created .env.local with OpenAI URL');
"

# Start development servers (AI-friendly: won't block)
# Script location: .cursor/skills/vpk-setup/scripts/start-dev.sh
./.cursor/skills/vpk-setup/scripts/start-dev.sh --no-wait

# Verify backend health
curl http://localhost:8080/api/health
```

## Critical Files to Create

These files are gitignored and **must be created** (using info from Step 0):

1. **`.asap-config`** - Generate with `atlas asap key generate` (see above)
2. **`.env.local`** - Needs user's email; Uses **OpenAI URL**: `https://ai-gateway.us-east-1.staging.atl-paas.net/v1/openai/v1/chat/completions`
3. **`.vscode/mcp.json`** - Needs Figma token if user wants it; Copy from `.vscode/mcp.json.example`

**Note:** Deployment files (like `service-descriptor.yml`) are handled by `/vpk-deploy` skill.

## Setup Checklist

- [ ] **User info collected** (email, optional Figma token)
- [ ] Node.js 18+, Atlas CLI, YubiKey enrolled
- [ ] Dependencies installed
- [ ] **ASAP credentials generated (timestamp generated ONCE)**
- [ ] `.env.local` created with OpenAI URL and user's email
- [ ] `.vscode/mcp.json` created (Figma token added if provided)
- [ ] Servers running (ports 8080 & 3000)
- [ ] Health check shows all env vars "SET"
- [ ] Chat responds at http://localhost:3000

**✅ Setup Complete!** Prototype is running locally with AI Gateway authentication.

## Quick Troubleshooting

| Issue | Quick Fix |
|-------|-----------|
| Auth errors during ASAP save | `atlas upgrade` |
| "EADDRINUSE" error | `./.cursor/skills/vpk-setup/scripts/stop-dev.sh` |
| "ASAP_PRIVATE_KEY: MISSING" | Check .env.local format - private key must be quoted and escaped |
| No AI response | Verify health check passes |
| **Mismatched ASAP KID** | **You generated timestamp twice! Regenerate with single timestamp** |

## Next Steps

- **Develop locally:** Use `/run` to restart servers anytime
- **Ready to deploy?** Use `/vpk-deploy` to create a permanent, shareable URL
- **Make changes:** Edit code, test locally, then commit and `/vpk-deploy` again

## References

For detailed documentation, see [references/GUIDE_SETUP.md](references/GUIDE_SETUP.md) in this skill directory.
