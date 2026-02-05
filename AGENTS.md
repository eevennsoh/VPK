# VPK (Venn Prototype Kit)

> This file provides project context for AI assistants.
> Skills are defined in `.cursor/skills/`. Agents are defined in `.cursor/agents/`.

Next.js 16 + Express backend with AI Gateway integration.

## Additional Instructions

- Component architecture patterns @.cursor/skills/vpk-tidy/SKILL.md
- ADS design system and Figma integration @.cursor/skills/vpk-design/SKILL.md

## Rules

- Cursor rules live in `.cursor/rules` (`.mdc` format).
- Claude rules should live in `.claude/rules` (`.md` format).
- Codex rules should live in `.codex/rules` (`.rules` Starlark format).
- Always-on Cursor rules: `.cursor/rules/vpk-prototyping.mdc`, `.cursor/rules/motion-react.mdc`, `.cursor/rules/motion-base-ui.mdc`.

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
pnpm run start            # Start production server (after build)
```

### Deployment

```bash
/vpk-deploy                                              # Via skill (recommended)
./.cursor/skills/vpk-deploy/scripts/deploy.sh <service> <version> [env]
./.cursor/skills/vpk-deploy/scripts/deploy-check.sh     # Pre-deploy validation
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
| Share  | `/vpk-share`  | Utility   | Create GitHub repos with VPK sync, export boilerplate, reset  |
| Sync   | `/vpk-sync`   | Utility   | Sync changes with upstream VPK (pull updates, push via PR)    |

### Skill Types

- **Workflow** — Multi-step procedures requiring user interaction
- **Reference** — Documentation lookup (no side effects)
- **Utility** — Single-purpose tools

### Available Agents

- **vpk-agent-design** — ADS UI specialist (invoked proactively for UI work)
- **vpk-agent-tidy** — React component refactoring specialist (invoked proactively when tidying up components)

### Subagent Usage

**Always wait** for all subagents to complete before yielding control back to the user.

**Spawn subagents when:**

- **Parallelizable work** — Independent tasks that can run simultaneously (e.g., `pnpm install` + lint check, `npm test` + typecheck, multiple file searches)
- **Long-running operations** — Tasks that block but don't require immediate results (e.g., builds, deployments, comprehensive code audits)
- **Isolation for risky changes** — Exploratory or potentially destructive operations that benefit from sandboxed execution

**Don't spawn subagents for:**

- Single, quick operations (reading one file, simple edits)
- Tasks with tight dependencies where parallelization isn't possible
- Trivial lookups that complete faster inline

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
│   ├── chat-composer/         # Rovo chat input with plan mode toggle
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

.cursor/                       # Source of truth for AI configs (skills + agents)
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

### Route Mapping

| Route | Block Location | Description |
|-------|----------------|-------------|
| `/` | `app/page.tsx` | Home/landing |
| `/chat` | `components/blocks/chat/` | Chat interface |
| `/confluence` | `components/blocks/confluence/` | Document editing |
| `/jira` | `components/blocks/jira/` | Kanban board |
| `/rovo` | `components/blocks/rovo/` | Full AI chat |
| `/search` | `components/blocks/search/` | Search results |
| `/widgets` | `components/blocks/widget/` | Embeddable widgets |

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

### Context Providers (State/Actions/Meta Pattern)

Contexts follow the State/Actions/Meta pattern for clean separation:

```tsx
interface FooState { /* read-only values */ }
interface FooActions { /* state mutations */ }
interface FooMeta { /* external dependencies */ }
```

- Reference implementation: `app/contexts/context-work-item-modal.tsx`
- Contexts go in `app/contexts/context-[name].tsx`
- Export convenience hooks: `useFooState()`, `useFooActions()`, `useFooMeta()`

### Compound Components

Use namespace pattern for related compound components:

```tsx
// components/blocks/[feature]/components/[name]/index.tsx
export const Composer = {
  Container: ComposerContainer,
  Textarea: ComposerTextarea,
  Actions: ComposerActions,
} as const;

// Usage
<Composer.Container>
  <Composer.Textarea />
  <Composer.Actions />
</Composer.Container>
```

- Each sub-component reads from context (no prop drilling)
- Keep each sub-component under 100 lines

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

No automated test framework configured. This is a prototype kit.

### Visual Testing

Use the `/agent-browser` skill for visual validation:

1. Start dev server: `pnpm run dev`
2. Invoke `/agent-browser` and describe what to test in natural language
3. Capture screenshots in light/dark mode and compare against Figma designs

Example:
```
/agent-browser
"Take screenshots of http://localhost:3000/jira in both light and dark mode"
```

See `.cursor/skills/vpk-design/references/visual-testing.md` for detailed workflow.

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

### Worktree Port Management

Each git worktree gets **deterministic port ranges** to prevent conflicts:

| Worktree | Frontend Base | Backend Base |
|----------|---------------|--------------|
| main | 3000 | 8080 |
| Other worktrees | 3000 + offset | 8080 + offset |

The offset is calculated from the worktree name hash (0-98, even numbers). If the base port is busy, it auto-increments by 1.

**Check port assignments:**
```bash
pnpm ports  # Shows all worktree port assignments
```

**Port files (written at runtime):**
- `.dev-frontend-port` — Active frontend port
- `.dev-backend-port` — Active backend port

**Playwright/agent-browser integration:** A PreToolUse hook automatically provides port context before browser tools run.

### Dual Proxy Setup

In dev, API calls go through Next.js proxy → Express. Check both layers when debugging.

### Context Providers

| Context | File | Purpose |
|---------|------|---------|
| Chat panel | `app/contexts/context-chat.tsx` | Generic chat panel state (component-level) |
| Rovo chat | `app/contexts/context-rovo-chat.tsx` | AI chat with streaming/widgets |
| Sidebar | `app/contexts/context-sidebar.tsx` | Sidebar visibility and route |
| System prompt | `app/contexts/context-system-prompt.tsx` | Custom AI prompts |
| Work item modal | `app/contexts/context-work-item-modal.tsx` | Work item detail modal (State/Actions/Meta pattern) |
| Theme | `components/utils/theme-wrapper.tsx` | Light/dark/system mode |

**Active in provider tree:** AppProvider → ThemeWrapper → SidebarProvider → RovoChatProvider → SystemPromptProvider

### Client Providers in Layout

Keep `layout.tsx` as server component for metadata export. Use `components/providers.tsx` for client-side providers.

### setState in useEffect

ESLint rule `react-hooks/set-state-in-effect` prohibits calling setState synchronously in useEffect. Use useState initializer functions for localStorage reads.

### Model Switching

VPK supports Claude (default) and GPT. Use `/vpk-setup` skill to switch models by updating `AI_GATEWAY_URL` in `.env.local`.

### ADS Dropdown Positioning

Use `shouldRenderToParent` with CSS override on `[data-ds--level="1"]` for parent-relative dropdown menus.
See `.cursor/skills/vpk-design/references/dropdown-positioning.md` for pattern.

---

## Claude Behavioral Rules

These rules prevent common friction patterns identified from usage analysis.

### Verify File Location Before UI Edits

When implementing UI changes, always verify the exact file/component location before editing. Use Grep to search for distinctive text or class names from the UI rather than assuming based on file names.

**Do this:**
```
1. Grep for distinctive UI text (button labels, placeholder text, class names)
2. Confirm the correct file with user if ambiguous
3. Then make the edit
```

### macOS Shell Compatibility

This is a macOS environment. Use BSD-compatible commands:

- Use `sed -i ''` (not `sed -i`) for in-place edits
- Or use `perl -i -pe` for portable in-place substitution
- When writing shell scripts, prefer portable approaches

### Front-load Figma Design Specs

When implementing Figma designs, ask for or verify these values BEFORE implementing:

- Exact shadow token (e.g., `elevation.shadow.raised` vs `elevation.shadow.overlay`)
- Spacing values in px (padding, margin, gap)
- Width constraints
- Border radius token (e.g., `radius.large` not `border.radius.200`)

Use the project's design token system from `@atlaskit/tokens`.

### Prefer Simple Solutions

Try the simplest approach first:

- Prompt-type hooks before custom bash scripts
- Direct solutions before abstractions
- Built-in features before custom implementations

Avoid over-engineering when a straightforward solution exists.

---

## Autonomous Workflows

These workflows enable Claude to work more independently, reducing back-and-forth corrections.

### Autonomous Validation Loops

When implementing features, validate before presenting to user:

1. **Implement** the feature or fix
2. **Validate** by running available checks:
   - `pnpm run lint` for ESLint errors
   - `pnpm tsc --noEmit` for TypeScript errors
   - Visual check via `/agent-browser` for UI changes
3. **Fix** any errors found
4. **Repeat** until all validations pass
5. **Present** only the final working implementation

For UI implementations specifically:
- Verify design tokens exist in the project's token system
- Check that imports reference correct file paths
- Confirm component placement follows block structure pattern

### Parallel Agent Exploration

When exploring the codebase for feature implementation, spawn parallel agents to:

1. **Find existing patterns** — Search for similar implementations
2. **Catalog relevant tokens/components** — Check design system usage
3. **Review documentation standards** — Ensure consistency

Synthesize findings into a comprehensive plan before writing code.

**Example spawn pattern:**
```
Spawn 3 parallel Task agents:
- Agent 1: Find all existing [feature type] implementations
- Agent 2: Catalog design tokens used for [UI element]
- Agent 3: Check component structure in similar blocks
```

### Self-Correcting PR Workflow

Before creating a PR, run this validation sequence:

1. **Lint check**: `pnpm run lint` — fix any errors
2. **Type check**: `pnpm tsc --noEmit` — fix any type errors
3. **Token verification**: Grep design-tokens usage matches project conventions
4. **Import verification**: Confirm all imports resolve correctly
5. **Create PR** only after all validations pass

Include validation results in PR description:
```markdown
## Validation
- [x] ESLint: passed
- [x] TypeScript: passed
- [x] Design tokens: verified
- [x] Imports: resolved
```

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
