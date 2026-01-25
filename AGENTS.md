# VPK Prototype

Next.js 16 + Express backend prototype with AI Gateway integration.

## Commands

```bash
# Development
./.claude/skills/vpk-setup/scripts/start-dev.sh    # Start frontend (:3000) + backend (:8080), cleans ports
./.claude/skills/vpk-setup/scripts/stop-dev.sh     # Stop dev processes
pnpm run dev:full               # Alternative: runs both via concurrently
pnpm run dev:frontend           # Frontend only (Next.js with Turbopack)
pnpm run dev:backend            # Backend only (Express)

# Building
pnpm run build                  # Next.js build
pnpm run build:production       # Static export for deployment

# Deployment (via /vpk-deploy skill)
./.claude/skills/vpk-deploy/scripts/deploy.sh <service> <version> [env]
./.claude/skills/vpk-deploy/scripts/deploy-check.sh  # Pre-deploy validation

# Other
pnpm run lint                   # ESLint
pnpm run registry:build         # Build shadcn registry
curl http://localhost:8080/api/health  # Health check
```

## Skills

This project includes Claude skills for common workflows:

- `/vpk-setup` - Initial repository setup (ASAP credentials, .env.local, start servers)
- `/vpk-deploy` - Deploy to Atlassian Micros (auto-detects initial vs redeploy)

## Architecture

### Dual-Mode Runtime

**Local development (two processes):**
```
Browser → Next.js (:3000) → app/api/* proxy → Express (:8080) → AI Gateway
```

**Production (single process):**
```
Browser → Express (:8080) → serves static export + handles /api/* → AI Gateway
```

### Directory Structure

```
app/                    # Next.js App Router
├── api/                # Dev-only proxy routes to backend
│   ├── rovo-chat/      # Chat streaming proxy
│   ├── health/         # Health check proxy
│   └── suggested-questions/
├── lib/                # Frontend utilities (api-config.ts)
├── layout.tsx          # Root layout
└── page.tsx            # Home page

backend/
└── server.js           # Express server (production runtime)

components/
├── ui/                 # shadcn components (button, card, input, etc.)
├── component-example.tsx
└── example.tsx

rovo/
└── config.js           # AI prompt builder, shared config

.claude/
└── skills/             # Claude Code skills
    ├── vpk-setup/      # /vpk-setup skill
    │   ├── SKILL.md
    │   ├── scripts/
    │   │   ├── start-dev.sh
    │   │   └── stop-dev.sh
    │   └── references/
    │       └── GUIDE_SETUP.md
    └── vpk-deploy/     # /vpk-deploy skill
        ├── SKILL.md
        ├── scripts/
        │   ├── deploy.sh
        │   └── deploy-check.sh
        └── references/
            └── GUIDE_DEPLOYMENT.md

scripts/                # Build scripts only
└── build-export.sh

guides/                 # General guides (not skill-specific)
├── GUIDE_MODEL_SWITCHING.md
└── GUIDE_PLAYWRIGHT_MCP_SETUP.md

lib/utils.ts            # Tailwind merge utility
```

### API Routes

Backend (Express at `backend/server.js`):
- `POST /api/rovo-chat` - AI chat streaming via AI Gateway
- `POST /api/suggested-questions` - Question suggestions
- `GET /api/health` - Health check

Dev proxy (Next.js forwards to backend):
- `app/api/rovo-chat/route.ts`
- `app/api/suggested-questions/route.ts`
- `app/api/health/route.ts`

## Code Style

- **Package manager**: pnpm
- **Indentation**: Tabs
- **Imports**: Use `@/` path alias
- **UI**: shadcn/ui (radix-vega style) with Tailwind CSS v4
- **Icons**: lucide-react

## Environment Variables

Required in `.env.local`:
```
AI_GATEWAY_URL
AI_GATEWAY_USE_CASE_ID
AI_GATEWAY_CLOUD_ID
AI_GATEWAY_USER_ID
ASAP_PRIVATE_KEY
ASAP_KID
ASAP_ISSUER
```

Optional: `DEBUG=true`, `PORT=8080`, `BACKEND_URL=http://localhost:8080`

## Deployment

Uses Atlassian's micros infrastructure. Use the `/vpk-deploy` skill or run the deploy script directly:

```bash
# Via skill (recommended)
/vpk-deploy

# Or directly
./.claude/skills/vpk-deploy/scripts/deploy.sh <service> <version> [env]
```

Update `service-descriptor.yml` with your service name before first deployment.
