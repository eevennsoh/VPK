# VPK

Next.js 16 + Express backend with AI Gateway integration.

## Commands

```bash
# Development
pnpm run dev                    # Start frontend (:3000) + backend (:8080) - run in your terminal
pnpm run dev:frontend           # Frontend only (Next.js with Turbopack)
pnpm run dev:backend            # Backend only (Express)

# Building
pnpm run build                  # Next.js build

# Deployment (via /vpk-deploy skill)
./.claude/skills/vpk-deploy/scripts/deploy.sh <service> <version> [env]
./.claude/skills/vpk-deploy/scripts/deploy-check.sh  # Pre-deploy validation

# Other
pnpm run lint                   # ESLint
curl http://localhost:8080/api/health  # Health check
lsof -ti:3000,8080 | xargs kill -9     # Kill lingering port processes
```

## Skills

This project includes Claude skills for common workflows:

- `/vpk-setup` - Initial repository setup (ASAP credentials, .env.local, start servers)
- `/vpk-deploy` - Deploy to Atlassian Micros (auto-detects initial vs redeploy)
- `/vpk-design` - Atlassian Design System (ADS) reference (tokens, components, primitives)
- `/vpk-share` - Share project or session context

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
├── api/                # Dev-only proxy routes (health, rovo-chat, suggested-questions)
├── contexts/           # React Context providers (chat, rovo-chat, sidebar, system-prompt)
├── [page routes]/      # chat/, confluence/, jira/, rovo/, search/, widgets/
├── lib/                # Frontend utilities (api-config.ts)
└── layout.tsx          # Root layout (server component)

backend/
└── server.js           # Express server (production runtime)

components/
├── blocks/             # Feature blocks: chat, confluence, icons, jira, layout, navigation, rovo, search, sidebar, work-items-widget
├── ui/                 # UI primitives
├── utils/              # Utility components (theme-wrapper.tsx)
└── providers.tsx       # Client-side provider composition

lib/                    # Shared utilities (platform-feature-flags.ts)
rovo/                   # AI config (config.js - prompt builder)
scripts/                # Dev scripts (dev-backend.js, dev-frontend.js)

.cursor/                # Source of truth for AI configs (agents, skills)
.claude/, .codelassian/, .codex/, .rovodev/  # Symlinks to .cursor/
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
- **UI**: Atlassian Design System (@atlaskit components) styled with @atlaskit/tokens
- **Icons**: @atlaskit/icon and @atlaskit/icon-lab
- **Images**: Use `next/image` with explicit `width` and `height` props (prevents layout shift)
- **Shadows**: Use `token("elevation.shadow.raised")` or `token("elevation.shadow.overlay")` not hardcoded rgba
- **Dates**: Use `Intl.DateTimeFormat(undefined, { dateStyle: 'medium' })` for locale-aware formatting

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

- Placeholder in `service-descriptor.yml`: `YOUR-SERVICE-NAME`
- Service name limit: ≤26 characters, lowercase-with-hyphens

## Testing

No test framework configured. This is a prototype kit.

## Theming

- `ThemeWrapper` (at `components/utils/theme-wrapper.tsx`) provides light/dark/system modes with localStorage persistence (`ui-theme` key)
- Uses `useSetColorMode()` from `@atlaskit/app-provider` for ADS token sync
- Exports: `useTheme()`, `ThemeToggle`, `ThemeSelector`
- Applies `light`/`dark` class to `<html>` for CSS variable switching

## Gotchas

- **ADS radius tokens**: Use semantic names like `token("radius.large")` NOT `token("border.radius.200")`. Available: `radius.xsmall` (2px), `radius.small` (4px), `radius.medium` (6px), `radius.large` (8px), `radius.xlarge` (12px), `radius.xxlarge` (16px)
- **Icon accessibility**: Always provide meaningful `label` props to icons (e.g., `<EditIcon label="Edit item" />`). Empty labels (`label=""`) reduce accessibility
- **Deploy via skill**: Use `/vpk-deploy` or `./.claude/skills/vpk-deploy/scripts/deploy.sh` directly (or `pnpm deploy:micros` for fast deploys)
- **Dual proxy setup**: In dev, API calls go through Next.js proxy → Express. Check both layers when debugging
- **Context providers**: Chat state in `app/contexts/context-chat.tsx`. Theme state in `components/utils/theme-wrapper.tsx`
- **Client providers in layout**: Keep layout.tsx as server component for metadata export. Use `components/providers.tsx` for client-side providers
- **setState in useEffect**: ESLint rule `react-hooks/set-state-in-effect` prohibits calling setState synchronously in useEffect. Use useState initializer functions for localStorage reads
- **ADS documentation**: Use `/vpk-design` skill for Atlassian Design System reference
