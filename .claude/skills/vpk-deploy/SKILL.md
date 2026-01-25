---
name: vpk-deploy
description: Deploy prototype to Atlassian Micros - auto-detects initial vs redeploy
disable-model-invocation: true
---

# VPK Deploy - Deploy to Micros

**Goal:** Deploy the prototype to Atlassian Micros infrastructure.

## Step 0: Auto-Detect Deployment Type

**Check service-descriptor.yml to determine if this is a first deployment or redeploy:**

```bash
# Read service name from service-descriptor.yml (line 11)
SERVICE_FROM_FILE=$(grep "image: docker.atl-paas.net/" service-descriptor.yml | awk -F'/' '{print $2}')

if [ "$SERVICE_FROM_FILE" = "kg-prototyping" ]; then
  # Still has default value → First deployment
  DEPLOYMENT_TYPE="initial"
  echo "📋 First deployment detected (service-descriptor.yml has default value)"
else
  # Customized value → Redeploy
  DEPLOYMENT_TYPE="redeploy"
  SERVICE_NAME="$SERVICE_FROM_FILE"
  echo "🔄 Redeploy detected for service: $SERVICE_NAME"
fi
```

**Rule:**
- If service-descriptor.yml says `kg-prototyping` → **Initial deploy** (ask for service name)
- If service-descriptor.yml says anything else → **Redeploy** (use that service name)

## Step 1: Gather Required Information

### For Initial Deploy (Service Doesn't Exist)

**Required from user:**
1. **Service name** (≤26 chars, lowercase-with-hyphens)
   - Examples: `my-prototype`, `john-chat-demo`, `rovo-assistant`
   - Your URL will be: `https://<service-name>.us-west-2.platdev.atl-paas.net`

**Verify prerequisites:**
- [ ] `/vpk-setup` completed (`.asap-config` and `.env.local` exist)
- [ ] Local prototype tested and working
- [ ] Docker Desktop running (`docker ps` works)

### For Redeploy (Service Exists)

**Auto-detected information:**
1. **Service name** - Read from service-descriptor.yml
2. **Current version** - Query from Micros
3. **Next version** - Auto-increment patch version

**User interaction:** None! Everything is automatic.

## Pre-Deployment Checks

Run the pre-deployment check script from this skill's scripts directory:

```bash
# Script location: .claude/skills/vpk-deploy/scripts/deploy-check.sh
./.claude/skills/vpk-deploy/scripts/deploy-check.sh
```

The script validates:

```bash
# Check required ASAP environment variables for production
if [ -z "$ASAP_PRIVATE_KEY" ] || [ -z "$ASAP_KID" ] || [ -z "$ASAP_ISSUER" ]; then
    echo "❌ Missing ASAP credentials for production deployment"
    echo "   Required: ASAP_PRIVATE_KEY, ASAP_KID, ASAP_ISSUER"
    exit 1
fi

# Check AI Gateway configuration
if [ -z "$AI_GATEWAY_URL" ]; then
    echo "❌ Missing AI_GATEWAY_URL"
    exit 1
fi

if [ -z "$AI_GATEWAY_USE_CASE_ID" ]; then
    echo "❌ Missing AI_GATEWAY_USE_CASE_ID"
    exit 1
fi
```

## Deploy Script

Use the deploy script from this skill's scripts directory:

```bash
# Script location: .claude/skills/vpk-deploy/scripts/deploy.sh
./.claude/skills/vpk-deploy/scripts/deploy.sh <service-name> <version> [env]

# Example
./.claude/skills/vpk-deploy/scripts/deploy.sh my-prototype 1.0.1

# Default environment: pdev-west2
```

The script will:
1. Validate service name length (≤26 chars)
2. Check if service-descriptor.yml has been updated from placeholder
3. Detect if service exists (update) or needs creation (new)
4. Verify all required environment variables are set
5. Build Docker image with `--platform linux/amd64`
6. Push to `docker.atl-paas.net`
7. Deploy using `atlas micros service deploy`

## Initial Deploy Commands (Manual)

```bash
SERVICE_NAME="your-service-name"
ENV=pdev-west2
VERSION=1.0.1

# 1. Create service
atlas micros service create --service=$SERVICE_NAME --no-sd

# 2. Set ALL 7 environment variables (CRITICAL!)
AI_GATEWAY_URL=$(grep "^AI_GATEWAY_URL=" .env.local | cut -d'=' -f2-)
AI_GATEWAY_USER_ID=$(git config user.email)
ASAP_KID=$(cat .asap-config | jq -r '.kid')
ASAP_ISSUER=$(cat .asap-config | jq -r '.issuer')

atlas micros stash set -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_URL -v "$AI_GATEWAY_URL"
atlas micros stash set -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_USE_CASE_ID -v "caid-proto"
atlas micros stash set -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_CLOUD_ID -v "local-testing"
atlas micros stash set -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_USER_ID -v "$AI_GATEWAY_USER_ID"

# ASAP_PRIVATE_KEY requires JSON file approach (handles multiline correctly)
cat .asap-config | jq '{ASAP_PRIVATE_KEY: .privateKey}' > /tmp/asap_stash.json
atlas micros stash set -s $SERVICE_NAME -e $ENV -f /tmp/asap_stash.json
rm /tmp/asap_stash.json

atlas micros stash set -s $SERVICE_NAME -e $ENV -k ASAP_KID -v "$ASAP_KID"
atlas micros stash set -s $SERVICE_NAME -e $ENV -k ASAP_ISSUER -v "$ASAP_ISSUER"

# 3. Verify all 7 variables are set
atlas micros stash list -s $SERVICE_NAME -e $ENV

# 4. Authenticate Docker (first time)
docker login docker.atl-paas.net
atlas packages permission grant

# 5. Build & push
docker buildx build --platform linux/amd64 --no-cache \
  -t docker.atl-paas.net/$SERVICE_NAME:app-${VERSION} \
  -f backend/Dockerfile . --load
docker push docker.atl-paas.net/$SERVICE_NAME:app-${VERSION}

# 6. Deploy (takes 10-15 min first time)
export VERSION=$VERSION
atlas micros service deploy --service=$SERVICE_NAME --env=pdev-west2 --file=service-descriptor.yml

# 7. Verify deployment
curl https://$SERVICE_NAME.us-west-2.platdev.atl-paas.net/api/health
```

## Redeploy Commands

```bash
SERVICE_NAME="your-existing-service"
VERSION=1.0.2  # Increment from previous

# 1. Build new version
docker buildx build --platform linux/amd64 --no-cache \
  -t docker.atl-paas.net/$SERVICE_NAME:app-${VERSION} \
  -f backend/Dockerfile . --load

# 2. Push
docker push docker.atl-paas.net/$SERVICE_NAME:app-${VERSION}

# 3. Deploy (takes ~30 sec)
export VERSION=$VERSION
atlas micros service deploy --service=$SERVICE_NAME --env=pdev-west2 --file=service-descriptor.yml

# 4. Verify (hard refresh browser: Cmd+Shift+R)
curl https://$SERVICE_NAME.us-west-2.platdev.atl-paas.net/api/health
```

## Deployment Checklist

### Initial Deploy
- [ ] Service name chosen (≤26 chars)
- [ ] `service-descriptor.yml` updated (replace `kg-prototyping`)
- [ ] Micros service created
- [ ] **ALL 7 env vars set and verified**
- [ ] Docker authenticated
- [ ] Image built & pushed (v1.0.1)
- [ ] Deployed (10-15 min first time)
- [ ] Health check shows all "SET" (no "MISSING")

### Redeploy
- [ ] Service name confirmed
- [ ] Version incremented
- [ ] Local changes tested
- [ ] Docker running
- [ ] Image built & pushed (new version)
- [ ] Deployed (~30 sec)
- [ ] Changes visible after hard refresh

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| **Initial Deploy Issues** | |
| Health check shows "MISSING" | Set missing vars, redeploy with new version |
| Service name too long | Max 26 chars - choose shorter name |
| "Unknown service" when setting vars | Create service first |
| Docker unauthorized | `docker login docker.atl-paas.net` |
| **ASAP_PRIVATE_KEY won't set** | **Use JSON file approach with jq** |
| **Only 5 vars instead of 7** | **Missing ASAP_KID & ASAP_ISSUER** |
| **Deployment timeout** | **Normal for first deploy! Wait & monitor** |
| **Redeploy Issues** | |
| Build fails with TypeScript errors | Run `pnpm run build` locally first |
| Changes not showing | Hard refresh (Cmd+Shift+R) |
| "Exec format error" | Missing `--platform linux/amd64` |
| "Distribution exists" | Wait 15-20 min or use different version |

## Success Criteria

### Initial Deploy
✅ Health check returns all 7 "SET" values (not "MISSING")
✅ Chat API streams responses
✅ AI responses appear in chat

### Redeploy
✅ New version shown in `atlas micros service show`
✅ Changes visible after hard refresh
✅ All functionality working

## URLs After Deployment

- **Frontend:** `https://<service-name>.us-west-2.platdev.atl-paas.net`
- **Health:** `https://<service-name>.us-west-2.platdev.atl-paas.net/api/health`
- **Microscope:** `https://microscope.prod.atl-paas.net/services/<service-name>`

## References

For detailed documentation, see [references/GUIDE_DEPLOYMENT.md](references/GUIDE_DEPLOYMENT.md) in this skill directory.
