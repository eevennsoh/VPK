# Volt Studio Setup - Run Prototype in Browser

## Overview

Set up the AI prototype in **Volt Studio** (browser-based development environment) with a shareable URL that works for any Atlassian employee.

**Key Difference from `/setup`:** ASAP credentials are generated on your **local Mac**, then used in Volt Studio.

**Goal:** Get prototype running in Volt Studio with a shareable URL (requires Atlassian SSO).

## Step 0: Gather User Information First

**Before starting, collect these from the user:**

1. **Atlassian email address**
   - Try: `git config user.email` in Volt Studio
   - If not set or not @atlassian.com, ask user for it

2. **Figma API token** (optional)
   - Only if they want Figma integration
   - Get from https://www.figma.com/developers/api

## Step 1: Guide User to Generate ASAP Credentials Locally

**⚠️ CRITICAL:** ASAP credentials MUST be generated on user's **local Mac Terminal** (not in Volt Studio), because it requires YubiKey authentication.

**AI ACTION:** Provide these instructions to the user and wait for them to paste back the `.asap-config` JSON:

### On Your Local Mac Terminal

**If you haven't used Atlas CLI before, you'll need to install it first:**

```bash
# Check if you have Atlas CLI installed
atlas --version

# If the command above fails, install Atlas CLI:
/bin/bash -c "$(curl -fsSL https://statlas.prod.atl-paas.net/atlas-cli/install.sh)"

# Close and reopen Terminal after installation completes

# Install required plugins
atlas plugin install -n asap
atlas plugin install -n ml

# Verify installation worked
atlas --version
```

**Generate ASAP Credentials:**

**⚠️ AI AGENT:** Generate a unique timestamp ONCE (e.g., `Date.now()` or similar) and use it in BOTH commands below. Provide the user with ready-to-run commands with the timestamp already filled in.

**Step 1: Generate key pair**
```bash
atlas asap key generate --key caid-proto/[TIMESTAMP] --file .asap-config
```
Expected: `Wrote key to config file .asap-config`

**Step 2: Register with keyserver** (requires YubiKey tap)
```bash
atlas asap key save --key caid-proto/[TIMESTAMP] --service caid-proto --env staging --file .asap-config
```

**Authentication Flow:**
- Browser opens with Okta
- Click "Next"
- **Tap your YubiKey** when prompted
- Expected: `Saved asap key successfully`

**If auth fails:** Try `atlas upgrade` first

**Step 3: Copy credentials to clipboard**
```bash
cat .asap-config | pbcopy
```

**Step 4: Paste the `.asap-config` contents back here in Volt Studio**

**⚠️ AI:** Wait for user to paste the JSON, then proceed to Step 2 below.

**Step 5: Clean up (optional)**
```bash
rm .asap-config
```

## Step 2: Create Config Files in Volt Studio

Once user provides their `.asap-config` JSON:

1. **Parse the JSON** to extract:
   - `kid` → Use for `ASAP_KID`
   - `issuer` → Use for `ASAP_ISSUER`
   - `privateKey` → Escape newlines for `ASAP_PRIVATE_KEY`

2. **Create `.asap-config`** file with user's JSON

3. **Create `.env.local`** using template:

```
AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/bedrock/model/anthropic.claude-haiku-4-5-20251001-v1:0/invoke
AI_GATEWAY_USE_CASE_ID=caid-proto
AI_GATEWAY_CLOUD_ID=local-testing
AI_GATEWAY_USER_ID=<USER_EMAIL>
ASAP_KID=<EXTRACTED_FROM_JSON>
ASAP_ISSUER=<EXTRACTED_FROM_JSON>
ASAP_PRIVATE_KEY="<ESCAPED_PRIVATE_KEY>"
```

**CRITICAL:** Escape newlines in private key:
```javascript
const escapedKey = asapConfig.privateKey.replace(/\n/g, '\\n');
```

4. **Create `.vscode/mcp.json`** from example:
```bash
cp .vscode/mcp.json.example .vscode/mcp.json
```
Add Figma token if user provided one.

## Step 3: Install Dependencies & Start Servers

```bash
# Install dependencies (if not already done)
npm install

# Start servers (won't block in Volt Studio)
./scripts/start-dev.sh --no-wait
```

## Step 4: Get Shareable URL

**Extract from environment:**
```bash
env | grep DEVSPHERE_PROXY_HOST_PUBLIC
```

**Build the URL:**
```
https://3000-<workspace-details>.devsphere.tools.atlassian.com
```

**Provide to user:** This is their shareable URL (requires Atlassian SSO).

## Step 5: Verify Everything Works

```bash
# Wait for servers to start
sleep 5

# Check backend health
curl http://localhost:8080/api/health
```

Expected: All env vars show "SET"

**Tell user:**
1. Open the shareable URL
2. Click "Ask Rovo"
3. Send a message
4. Get AI response!

## Volt Studio Setup Checklist

- [ ] **User info collected** (email, optional Figma token)
- [ ] **Atlas CLI installed on local Mac** (`atlas --version` works)
- [ ] **ASAP plugins installed** (`asap` and `ml`)
- [ ] **ASAP credentials generated on local Mac**
- [ ] User pasted `.asap-config` JSON to Volt Studio
- [ ] `.env.local` created with escaped private key
- [ ] `.vscode/mcp.json` created
- [ ] Dependencies installed (`npm install`)
- [ ] Servers started with `--no-wait` flag
- [ ] Shareable URL extracted from environment
- [ ] Health check passes (all "SET")
- [ ] Shareable URL accessible with Atlassian SSO
- [ ] Chat responds to messages

## Important Volt Studio Limitations

**❌ Cannot Deploy from Volt Studio**
- Micros deployment requires interactive authentication
- Use your local Mac terminal if you need to deploy
- See [DEPLOYMENT_GUIDE.md](../../DEPLOYMENT_GUIDE.md)

**✅ What Works:**
- Full local development
- Shareable URL with Atlassian SSO
- Real AI responses
- Hot reload for code changes

**⏰ Temporary URL:**
- URL stops working when DevBox shuts down (3 hours of inactivity)
- Restart DevBox at go/dev to reactivate

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "ASAP_PRIVATE_KEY: MISSING" | Check [.env.local format](../../VOLT_STUDIO_SETUP.md#how-to-create-envlocal-from-asap-config-for-ai-agents) |
| Auth fails during ASAP save | Run `atlas upgrade` on local Mac |
| Shareable URL not working | Check DevBox is running at go/dev |
| Port not forwarded | Check PORTS panel shows 3000 & 8080 |
| No AI response | Verify health check passes |

## Need More Details?

- **📖 Full Volt Studio Guide:** [VOLT_STUDIO_SETUP.md](../../VOLT_STUDIO_SETUP.md)
- **🔐 ASAP Generation Details:** [Volt Studio ASAP section](../../VOLT_STUDIO_SETUP.md#prerequisites)
- **🐛 Troubleshooting:** [Volt Studio troubleshooting](../../VOLT_STUDIO_SETUP.md#troubleshooting)
- **🌐 Understanding URLs:** [Shareable URL details](../../VOLT_STUDIO_SETUP.md#understanding-your-shareable-url)

## Key Differences from Local Setup

| Aspect | `/setup` (Local) | `/voltsetup` (Volt Studio) |
|--------|------------------|----------------------------|
| **ASAP Generation** | In terminal | On local Mac, paste to Volt |
| **Deployment** | Can deploy to Micros | Cannot deploy (use local Mac) |
| **URL** | localhost:3000 | Shareable devsphere URL |
| **Persistence** | Always available | While DevBox running |
| **Authentication** | Personal YubiKey | Atlassian SSO for viewers |

## Next Steps

- **Test the prototype:** Open shareable URL and verify chat works
- **Share with team:** Send URL to colleagues (requires Atlassian SSO)
- **Make changes:** Edit code, auto hot-reload in browser
- **Need permanent URL?** Use local Mac terminal + [DEPLOYMENT_GUIDE.md](../../DEPLOYMENT_GUIDE.md)
