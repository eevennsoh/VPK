# VPK Prototype

Next.js 16 + Express backend prototype with AI Gateway integration.

## Commands

```bash
# Development
./scripts/start-dev.sh          # Start frontend (:3000) + backend (:8080), cleans ports
./scripts/stop-dev.sh           # Stop dev processes
pnpm run dev:full               # Alternative: runs both via concurrently
pnpm run dev:frontend           # Frontend only (Next.js with Turbopack)
pnpm run dev:backend            # Backend only (Express)

# Building
pnpm run build                  # Next.js build
pnpm run build:production       # Static export for deployment

# Other
pnpm run lint                   # ESLint
pnpm run registry:build         # Build shadcn registry
curl http://localhost:8080/api/health  # Health check
```

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
└── *.tsx               # App components

shared/
└── rovo-config.js      # AI prompt builder, shared config

scripts/                # Dev and deployment scripts
lib/utils.ts            # Tailwind merge utility
```

### API Routes

Backend (Express at `backend/server.js`):
- `POST /api/rovo-chat` - AI chat streaming via AI Gateway
- `GET /api/health` - Health check

Dev proxy (Next.js forwards to backend):
- `app/api/rovo-chat/route.ts`
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

Uses Atlassian's micros infrastructure. Update `service-descriptor.yml` with your service name before deploying:
```bash
./scripts/deploy.sh <service> <version> [env]
```
