# VPK (Venn Prototype Kit)

> This file provides project context for AI assistants. Symlinked as `CLAUDE.md` and `.agent.md`.
> Skills are defined in `.cursor/skills/`. Agents are defined in `.cursor/agents/`.

Next.js 16 + Express backend with AI Gateway integration.

## Additional Instructions

- Component architecture patterns @.cursor/skills/vpk-tidy/SKILL.md
- ADS design system and Figma integration @.cursor/skills/vpk-design/SKILL.md

---

## Commands

### Development

```bash
pnpm install              # Install dependencies (first time)
pnpm run dev              # Start frontend (:3000) + backend (:8080)
pnpm run dev:frontend     # Frontend only (Next.js with Turbopack)
pnpm run dev:backend      # Backend only (Express)
```

### Building

```bash
pnpm run build            # Next.js build
```

### Deployment

```bash
/vpk-deploy                                              # Via skill (recommended)
./.claude/skills/vpk-deploy/scripts/deploy.sh <service> <version> [env]
./.claude/skills/vpk-deploy/scripts/deploy-check.sh     # Pre-deploy validation
pnpm run deploy:micros                                   # Fast redeploy shortcut
```

### Other

```bash
pnpm run lint                          # ESLint
curl http://localhost:8080/api/health  # Health check
lsof -ti:3000,8080 | xargs kill -9     # Kill lingering port processes
```

---

## Skills and Agents

### Available Skills

| Skill  | Command       | Type      | Purpose                                                       |
| ------ | ------------- | --------- | ------------------------------------------------------------- |
| Setup  | `/vpk-setup`  | Workflow  | Initial setup: ASAP credentials, .env.local, dev servers      |
| Deploy | `/vpk-deploy` | Workflow  | Deploy to Atlassian Micros (auto-detects initial vs redeploy) |
| Design | `/vpk-design` | Reference | ADS tokens, components, primitives, icons                     |
| Tidy   | `/vpk-tidy`   | Utility   | Refactor React components for reusability and modularity      |
| Share  | `/vpk-share`  | Utility   | Export sanitized boilerplate for sharing                      |
| Repo   | `/vpk-repo`   | Utility   | Create new GitHub repository and push all changes             |
| Sync   | `/vpk-sync`   | Utility   | Sync changes with upstream VPK (pull updates, push via PR)    |

### Skill Types

- **Workflow** — Multi-step procedures requiring user interaction
- **Reference** — Documentation lookup (no side effects)
- **Utility** — Single-purpose tools

### Available Agents

- **vpk-agent-design** — ADS UI specialist (invoked proactively for UI work)
- **vpk-agent-tidy** — React component refactoring specialist (invoked proactively when tidying up components)

---

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
app/                           # Next.js App Router
├── api/                       # Dev-only proxy routes
├── contexts/                  # React Context providers
│   ├── context-chat.tsx
│   ├── context-rovo-chat.tsx
│   ├── context-sidebar.tsx
│   ├── context-system-prompt.tsx
│   └── context-work-item-modal.tsx
├── hooks/                     # Custom React hooks
│   └── use-streaming-chat.ts
├── providers.tsx              # Client-side provider composition
├── [page routes]/             # confluence/, jira/, rovo/, search/, widgets/
└── layout.tsx                 # Root layout (server component)

backend/
└── server.js                  # Express server (production runtime)

components/
├── blocks/                    # Feature blocks (modular page.tsx + components/)
│   ├── chat/
│   ├── confluence/
│   ├── jira/
│   ├── layout/
│   ├── navigation/
│   ├── rovo/
│   ├── search/
│   ├── sidebar/
│   └── widget/
├── ui/                        # Shared UI primitives
└── utils/                     # Utility components

lib/                           # Shared utilities
rovo/                          # AI config (prompt builder)
scripts/                       # Dev scripts

.cursor/                       # Source of truth for AI configs
.claude/, .codelassian/, .codex/  # Contain agents/ + symlink to .cursor/skills
```

### Block Structure Pattern

Each feature block follows a consistent modular structure:

```
components/blocks/[feature]/
├── page.tsx           # Main container (client component)
├── components/        # Feature-specific sub-components
├── hooks/             # Feature-specific hooks (optional)
├── data/              # Static data files (optional)
└── lib/               # Types and utilities (optional)
```

**Key principles:**

- `page.tsx` is the public API — the component you import
- Sub-components are implementation details in `components/`
- All blocks use `"use client"` directive
- Blocks access shared state via contexts (`useSidebar()`, `useRovoChat()`, etc.)

### Provider Composition

Providers are nested in `app/providers.tsx` (order matters for dependencies):

```
AppProvider (ADS foundation)
└── ThemeWrapper (light/dark/system)
    └── SidebarProvider (navigation state)
        └── RovoChatProvider (AI chat state)
            └── SystemPromptProvider (custom prompts)
```

### API Routes

**Backend (Express at `backend/server.js`):**

- `POST /api/rovo-chat` — AI chat streaming via AI Gateway
- `POST /api/suggested-questions` — Question suggestions
- `GET /api/health` — Health check

**Dev proxy (Next.js forwards to backend):**

- `app/api/rovo-chat/route.ts`
- `app/api/suggested-questions/route.ts`
- `app/api/health/route.ts`

---

## Code Style

- **Package manager** — pnpm
- **Indentation** — Tabs
- **Imports** — Use `@/` path alias
- **UI** — Atlassian Design System (@atlaskit) styled with @atlaskit/tokens
- **Icons** — @atlaskit/icon and @atlaskit/icon-lab
- **Images** — Use `next/image` with explicit `width` and `height` props
- **Shadows** — Use `token("elevation.shadow.raised")` or `token("elevation.shadow.overlay")`
- **Dates** — Use `Intl.DateTimeFormat(undefined, { dateStyle: 'medium' })`

---

## Component Architecture

Mandatory patterns for all React components. Full details: @.cursor/skills/vpk-tidy/SKILL.md

**Quick rules:** Components <150 lines, logic in hooks, static data in `data/` files, `Readonly<Props>` interfaces.

---

## Frontend/UI Design

> **Use `/vpk-design` skill for comprehensive Atlassian Design System reference.**

### Core Principle: ADS First, Always

Always use Atlassian Design System (@atlaskit) components, tokens, and icons FIRST:

1. **Components** — ADS components → shadcn for missing → custom as last resort
2. **Styling** — Design tokens → Tailwind classes → inline styles as last resort
3. **Icons** — ADS icons (@atlaskit/icon, @atlaskit/icon-lab) → lucide-react if not found

### Quick Checklist

- [ ] Using `@atlaskit/primitives` for layout (Box, Stack, Inline, Flex, Grid)
- [ ] Using Heading and Text components (not raw `<h1>`, `<p>`, `<span>`)
- [ ] Using design tokens via `token()` for spacing/colors
- [ ] Icons have meaningful `label` props for accessibility
- [ ] Following sentence case for all UI text

### Key Imports

```tsx
import { token } from "@atlaskit/tokens";
import { Stack, Inline, Box, Flex, Text } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import Button from "@atlaskit/button/new";
```

> See `.cursor/skills/vpk-design/` for complete reference documentation.

---

## Environment Variables

### Required (in `.env.local`)

```
AI_GATEWAY_URL
AI_GATEWAY_USE_CASE_ID
AI_GATEWAY_CLOUD_ID
AI_GATEWAY_USER_ID
ASAP_PRIVATE_KEY
ASAP_KID
ASAP_ISSUER
```

### Optional

- `DEBUG=true`
- `PORT=8080`
- `BACKEND_URL=http://localhost:8080`

---

## Deployment

Uses Atlassian's micros infrastructure.

### Deploy Commands

```bash
# Via skill (recommended)
/vpk-deploy

# Or directly
./.claude/skills/vpk-deploy/scripts/deploy.sh <service> <version> [env]
```

### Before First Deployment

1. Update `service-descriptor.yml` with your service name
2. Replace placeholder: `YOUR-SERVICE-NAME`
3. Service name limit: ≤26 characters, lowercase-with-hyphens

---

## Testing

No test framework configured. This is a prototype kit.

---

## Theming

- **ThemeWrapper** (`components/utils/theme-wrapper.tsx`) provides light/dark/system modes
- Uses `useSetColorMode()` from `@atlaskit/app-provider` for ADS token sync
- Persists to localStorage with key `ui-theme`
- Applies `light`/`dark` class to `<html>` for CSS variable switching

**Exports:**

- `useTheme()`
- `ThemeToggle`
- `ThemeSelector`

---

## Gotchas

### ADS Radius Tokens

Use semantic names like `token("radius.large")` NOT `token("border.radius.200")`.

**Available tokens:**

- `radius.xsmall` (2px)
- `radius.small` (4px)
- `radius.medium` (6px)
- `radius.large` (8px)
- `radius.xlarge` (12px)
- `radius.xxlarge` (16px)
- `radius.full` (circular)
- `radius.tile` (25% for tiles)

### Icon Accessibility

Always provide meaningful `label` props to icons.

```tsx
// Good
<EditIcon label="Edit item" />

// Bad - reduces accessibility
<EditIcon label="" />
```

### Dual Proxy Setup

In dev, API calls go through Next.js proxy → Express. Check both layers when debugging.

### Context Providers

- Chat state: `app/contexts/context-chat.tsx`
- Theme state: `components/utils/theme-wrapper.tsx`

### Client Providers in Layout

Keep `layout.tsx` as server component for metadata export. Use `components/providers.tsx` for client-side providers.

### setState in useEffect

ESLint rule `react-hooks/set-state-in-effect` prohibits calling setState synchronously in useEffect. Use useState initializer functions for localStorage reads.

### Model Switching

VPK supports Claude (default) and GPT. Use `/vpk-setup` skill to switch models by updating `AI_GATEWAY_URL` in `.env.local`.

---

## Customization

Create `.local.md` files alongside skills/agents for personal overrides (gitignored):

```
.cursor/skills/vpk-deploy/SKILL.local.md    # Your deploy preferences
.cursor/agents/vpk-agent-design.local.md    # Your design preferences
```

These are merged with base definitions automatically.

---

## Figma MCP Integration

Figma-to-code workflow and translation rules: @.cursor/skills/vpk-design/references/figma-mcp.md
