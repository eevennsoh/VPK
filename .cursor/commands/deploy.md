# Deploy - Deploy to Micros

## Step 0: Auto-Detect Deployment Type (Fast!)

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

**This is instant - no API calls needed!**

## Step 1: Gather Required Information

### For Initial Deploy (Service Doesn't Exist)

**Required from user:**
1. **Service name** (≤26 chars, lowercase-with-hyphens)
   - Examples: `my-prototype`, `john-chat-demo`, `rovo-assistant`
   - Your URL will be: `https://<service-name>.us-west-2.platdev.atl-paas.net`

**Verify prerequisites:**
- [ ] `/setup` completed (`.asap-config` and `.env.local` exist)
- [ ] Local prototype tested and working
- [ ] Docker Desktop running (`docker ps` works)

### For Redeploy (Service Exists)

**Auto-detected information:**
1. **Service name** - Read from service-descriptor.yml
2. **Current version** - Query from Micros
3. **Next version** - Auto-increment patch version

**Verify prerequisites:**
- [ ] Local changes tested (`npm run dev`)
- [ ] Changes committed (optional but recommended)
- [ ] Docker Desktop running

**User interaction:** None! Everything is automatic.

## Quick Workflow

### Initial Deploy Path

1. **Get service name** (from user)
2. **⚠️ CRITICAL: Update service-descriptor.yml FIRST** → Replace `kg-prototyping` with service name (lines 11, 16-22)
3. **Create service** → `atlas micros service create --service=<name> --no-sd`
4. **⚠️ Set ALL 7 env vars BEFORE deploying** → Automated extraction from .env.local & .asap-config
5. **✅ Verify all 7 vars set** → Use `atlas micros stash list` (must show 7)
6. **Build & push** → Version 1.0.1 (first deploy)
7. **Deploy** → Takes 10-15 min first time (may timeout - normal!)
8. **⏱️ Wait for completion** → Monitor health endpoint until accessible
9. **✅ Verify** → All env vars "SET" in health check (no "MISSING")

### Redeploy Path (Fully Automatic!)

1. **Auto-detect service name** from service-descriptor.yml
2. **Auto-query current version** from Micros
3. **Auto-increment version** (e.g., 1.0.1 → 1.0.2)
4. **Build & push** → New version
5. **Deploy** → Takes ~30 seconds
6. **Verify** → Hard refresh browser to see changes

**User just types `/deploy` - everything else is automatic!**

## Decision Tree

```mermaid
graph TD
    A[/deploy] --> B[Read service-descriptor.yml]
    B --> C{Service name =<br/>'kg-prototyping'?}
    
    C -->|Yes - Default| D[Initial Deploy]
    C -->|No - Customized| E[Redeploy]
    
    D --> F[Ask user for service name]
    F --> G[Update service-descriptor.yml]
    G --> H[Create service]
    H --> I[⚠️ Set ALL env vars]
    I --> J[Build & Deploy v1.0.1]
    J --> K[Verify]
    
    E --> L[Use existing service name]
    L --> M[Query current version]
    M --> N[Increment version]
    N --> O[Build & Deploy new version]
    O --> K
    
    style I fill:#ff6b6b
    style K fill:#51cf66
    style C fill:#ffd43b
```

## Essential Commands

### Initial Deploy Commands

```bash
SERVICE_NAME="your-service-name"
ENV=pdev-west2
VERSION=1.0.1

# 1. Create service
atlas micros service create --service=$SERVICE_NAME --no-sd

# 2. Set ALL 7 environment variables (CRITICAL!)
# Read from existing files to ensure consistency
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

# 3. ✅ Verify all 7 variables are set (CRITICAL!)
echo "Verifying environment variables..."
atlas micros stash list -s $SERVICE_NAME -e $ENV
VAR_COUNT=$(atlas micros stash list -s $SERVICE_NAME -e $ENV | wc -l | tr -d ' ')
if [ "$VAR_COUNT" -ne 7 ]; then
    echo "❌ ERROR: Expected 7 variables, found $VAR_COUNT. Set missing variables!"
    exit 1
fi
echo "✅ All 7 environment variables verified"

# 4. Authenticate Docker (first time)
docker login docker.atl-paas.net
atlas packages permission grant

# 5. Build & push
docker buildx build --platform linux/amd64 --no-cache \
  -t docker.atl-paas.net/$SERVICE_NAME:app-${VERSION} \
  -f backend/Dockerfile . --load
docker push docker.atl-paas.net/$SERVICE_NAME:app-${VERSION}

# 6. Deploy (takes 10-15 min first time - command may timeout, this is NORMAL)
export VERSION=$VERSION
echo "Starting deployment... This will take 10-15 minutes for first-time deployment."
echo "Command may timeout after 10 minutes - deployment continues in background."
atlas micros service deploy --service=$SERVICE_NAME --env=pdev-west2 --file=service-descriptor.yml

# 7. Wait for deployment to complete
echo ""
echo "⏱️  Waiting for deployment to complete..."
echo "Testing health endpoint every 30 seconds..."
while ! curl -s -f https://$SERVICE_NAME.us-west-2.platdev.atl-paas.net/api/health > /dev/null 2>&1; do
    echo "  Still deploying... (retry in 30s)"
    sleep 30
done

# 8. Verify deployment
echo ""
echo "✅ Deployment complete! Verifying..."
HEALTH_RESPONSE=$(curl -s https://$SERVICE_NAME.us-west-2.platdev.atl-paas.net/api/health)
echo "$HEALTH_RESPONSE" | jq .

if echo "$HEALTH_RESPONSE" | grep -q "MISSING"; then
    echo ""
    echo "❌ ERROR: Some environment variables show as MISSING"
    echo "Set missing variables and redeploy with new version"
    exit 1
fi

echo ""
echo "==========================================="
echo "✅ Deployment Successful!"
echo "==========================================="
echo "Frontend:   https://$SERVICE_NAME.us-west-2.platdev.atl-paas.net"
echo "Health:     https://$SERVICE_NAME.us-west-2.platdev.atl-paas.net/api/health"
echo "Microscope: https://microscope.prod.atl-paas.net/services/$SERVICE_NAME"
```

### Redeploy Commands

```bash
SERVICE_NAME="your-existing-service"
VERSION=1.0.2  # Increment from previous

# 1. Verify Docker running
docker ps

# 2. Build new version
docker buildx build --platform linux/amd64 --no-cache \
  -t docker.atl-paas.net/$SERVICE_NAME:app-${VERSION} \
  -f backend/Dockerfile . --load

# 3. Push
docker push docker.atl-paas.net/$SERVICE_NAME:app-${VERSION}

# 4. Deploy (takes ~30 sec)
export VERSION=$VERSION
atlas micros service deploy --service=$SERVICE_NAME --env=pdev-west2 --file=service-descriptor.yml

# 5. Verify (hard refresh browser: Cmd+Shift+R)
curl https://$SERVICE_NAME.us-west-2.platdev.atl-paas.net/api/health
```

### Quick Script (Auto-detects Initial vs Redeploy)

```bash
./scripts/deploy.sh <service-name> <version>
# Example: ./scripts/deploy.sh my-prototype 1.0.2
```

## Deployment Checklist

### Initial Deploy
- [ ] Service name chosen (≤26 chars)
- [ ] `service-descriptor.yml` updated
- [ ] Micros service created
- [ ] **ALL 7 env vars set and verified** (AI_GATEWAY_URL, USE_CASE_ID, CLOUD_ID, USER_ID, ASAP_PRIVATE_KEY, ASAP_KID, ASAP_ISSUER)
- [ ] Docker authenticated
- [ ] Image built & pushed (v1.0.1)
- [ ] Deployed (10-15 min first time, may timeout)
- [ ] **Waited for deployment completion** (health endpoint accessible)
- [ ] Health check shows all "SET" (no "MISSING")
- [ ] Chat works in browser

### Redeploy
- [ ] Service name confirmed
- [ ] Version incremented
- [ ] Local changes tested
- [ ] Docker running
- [ ] Image built & pushed (new version)
- [ ] Deployed (~30 sec)
- [ ] Changes visible after hard refresh
- [ ] No new errors in logs

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| **Initial Deploy Issues** | |
| Health check shows "MISSING" | Set missing vars, redeploy with new version |
| Service name too long | Max 26 chars - choose shorter name |
| "Unknown service" when setting vars | Create service first (Step 3) |
| Docker unauthorized | `docker login docker.atl-paas.net` |
| **ASAP_PRIVATE_KEY won't set** | **Use JSON file approach with jq (see commands)** |
| **Only 5 vars instead of 7** | **Missing ASAP_KID & ASAP_ISSUER - add them!** |
| **Deployment timeout** | **Normal for first deploy! Wait & monitor health endpoint** |
| **Redeploy Issues** | |
| Build fails with TypeScript errors | Run `npm run build` locally first |
| Changes not showing | Hard refresh (Cmd+Shift+R) |
| "Exec format error" | Missing `--platform linux/amd64` |
| Deployment stuck | Wait 15-20 min or increment version |
| **Both** | |
| "Distribution exists" | Wait 15-20 min or use different version |

## Need More Details?

- **📖 Complete Deployment Guide:** [DEPLOYMENT_GUIDE.md](../../DEPLOYMENT_GUIDE.md)
- **🎯 Initial Deploy (Path A):** [First-time walkthrough](../../DEPLOYMENT_GUIDE.md#path-a-first-time-deployment-new-service)
- **🔄 Redeploy (Path B):** [Update existing service](../../DEPLOYMENT_GUIDE.md#path-b-update-existing-service)
- **⚙️ Environment Variables:** [Full setup](../../DEPLOYMENT_GUIDE.md#step-4-set-environment-variables)
- **🐛 Troubleshooting:** [Common issues](../../DEPLOYMENT_GUIDE.md#troubleshooting)
- **✅ Verification:** [Testing your deployment](../../DEPLOYMENT_GUIDE.md#verify-deployment)

## Success Criteria

### Initial Deploy
✅ Health check returns all 7 "SET" values (not "MISSING")
✅ Chat API streams responses  
✅ Browser shows images loading  
✅ AI responses appear in chat
✅ OpenAI model URL is being used  

### Redeploy
✅ New version shown in `atlas micros service show`
✅ Changes visible after hard refresh
✅ All functionality working
✅ No new errors in logs

## Next Steps

- **After initial deploy:** Use `/deploy` again for updates (auto-detects redeploy)
- **Making changes:** Use `/commit` to save changes, then `/deploy`
- **Monitor:** Check Splunk logs for any issues
