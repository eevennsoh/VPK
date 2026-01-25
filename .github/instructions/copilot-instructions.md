# Copilot Coding Agent Onboarding Guide for `eevennsoh/vpk-1`

## Overview

**Repository Purpose:**  
`vpk-1` is a Next.js (16) prototype application with an Express.js backend designed for AI Gateway integration, specifically targeted for deployability on Atlassian's Micros infrastructure. It features dual-mode runtime for both local development and production deployment, utilizing the latest frontend technologies and DevOps scripting.

**Type:**  
Full-stack JavaScript/TypeScript monorepo with tightly coupled front- and back-end integration for AI-powered conversational and prompt services.

**Languages & Technologies:**

- **JavaScript** (80%)
- **TypeScript** (12.5%)
- **Shell** (6.7%)
- **Frontend:** Next.js 16, React 19, shadcn/ui, Tailwind CSS v4, Lucide Icons, ESLint, PostCSS
- **Backend:** Express.js, Node.js 18+, CORS, dotenv, jsonwebtoken
- **Package Management:** Uses `pnpm` and workspaces (do not use npm/yarn)
- **Deployment:** Custom shell scripts + Micros via Atlassian
- **CI/Linting/Formatting:** ESLint, shadcn, Tailwind CSS

**Repository Size & Layout:**  
Medium-sized, mono-repo, structure documented below for ease of navigation.

---

## Build, Test, and Validation Instructions

### **Bootstrap/Install**

- **Always** install dependencies with pnpm:
  - Run:
    ```
    pnpm install
    cd backend && npm install && cd ..
    ```
- **Environment Setup:**
  - Copy and fill `.env.local` from `.env.local.example`.  
    All credential variables are required (see below).

### **Environment**

- **Node.js:** 18+ **required**
- **.env.local** needed at root with AI Gateway and ASAP config.
- **ASAP keys/private key** must use `\\n` for newlines (no multiline unescaped).
- Enable `DEBUG=true` for verbose logs if troubleshooting is needed.

### **Development (Local)**

- **Recommended:**

  ```
  ./scripts/start-dev.sh
  ```

  (Starts both Express backend on :8080 and Next.js frontend on :3000, cleans old processes.)

- **Alternatives:**

  ```
  pnpm run dev:backend          # Only Express backend (:8080)
  pnpm run dev:frontend         # Only Next.js frontend (:3000, Turbopack)
  pnpm run dev:full             # Both; runs concurrently (pnpm dev:backend & dev:frontend)
  ```

- **Health Check:**
  ```
  curl http://localhost:8080/api/health
  ```
  Should show `"authMethod": "ASAP"` and `"SET"` for all env vars.

### **Build**

- **For Next.js development build:**
  ```
  pnpm run build
  ```
- **Production static build (for Micros):**
  ```
  pnpm run build:production         # (runs ./scripts/build-export.sh, outputs to 'out')
  ```

### **Test**

- No unit/integration tests present by default.  
  For runtime validation, rely on endpoint health (`/api/health`) and functional UI/UX checks.

### **Linting**

- Run ESLint:
  ```
  pnpm run lint
  ```
  (uses ESLint Next.js/TypeScript configuration – see `eslint.config.mjs`.)

### **Deployment**

- **For full deployment to Micros:**

  ```
  ./scripts/deploy.sh <service-name> <version>
  ```

  Update `service-descriptor.yml` with your service name before first deploy.

- **Pre-deployment validation:**
  ```
  ./scripts/deploy-check.sh
  ```
  (Checks environment and build before allowing deployment.)

### **Ports**

- **Frontend:** :3000 (Next.js), **Backend:** :8080 (Express)
- If you encounter "Port already in use" errors:
  ```
  ./scripts/stop-dev.sh
  pkill -f 'node backend/server.js'
  pkill -f 'next dev'
  ```

---

## Project Layout

**Key directories & files:**

```
.
├── app/         # Next.js App Router & API proxies (ui, health, suggestions, etc.)
├── backend/     # Express server (server.js, Dockerfile, own package.json)
├── components/  # UI (shadcn), component examples
├── rovo/        # AI prompt config
├── scripts/     # Shell scripts for build, start, stop, deploy...
├── public/      # Static assets (includes registry.json)
├── guides/      # Extended documentation
├── .claude/     # Claude skills: setup, deploy, scripting (symlinked to .cursor for Cursor editor)
├── .env.local.example  # Template for required env
├── .github/     # Place for workflows (if present)
├── eslint.config.mjs, postcss.config.mjs, next.config.ts, tsconfig.json  # Configuration roots
└── service-descriptor.yml  # Micros deployment
```

**Notable scripts (in `/scripts/`):**

- `start-dev.sh`/`stop-dev.sh`: Start/stop all dev services together, clean up ports
- `deploy.sh`: Deploy to Micros
- `build-export.sh`: Static build for prod deployment

**pnpm workspace:**  
`pnpm-workspace.yaml` ensures `.` (root) and all critical dirs are included.

**Configs**:

- TypeScript: `tsconfig.json` in root – strict, no emit, modern module res.
- ESLint: `eslint.config.mjs` (Next.js, ignores .next, out, build, etc.)
- PostCSS & Tailwind: `postcss.config.mjs`, `components.json`
- Next.js: `next.config.ts` – dual-mode (dynamic vs static export via BUILD_MODE env)

**Environment Variables** (must be in `.env.local`):

- `AI_GATEWAY_URL`, `AI_GATEWAY_USE_CASE_ID`, `AI_GATEWAY_CLOUD_ID`, `AI_GATEWAY_USER_ID`, `ASAP_KID`, `ASAP_ISSUER`, `ASAP_PRIVATE_KEY`
- Optional: `DEBUG`, `PORT`, `BACKEND_URL`
- _TL;DR_: The application will not bootstrap or pass health without valid ASAP/AI Gateway credentials.

**Entrypoints (local):**

- Next.js: `pnpm run dev` (or variants)
- Express: `pnpm run dev:backend` or via `/backend/server.js`

**Entrypoints (prod):**

- Start via Express after static build. See workflows/scripts.

---

## CI, Workflows, and Validation

- **CI / GitHub Workflows Location:**  
  Any `.github/workflows/*.yml` files (not fetched here) should be checked for tests, linting, or deployment gates.
  - **Linting**: Always run `pnpm run lint` before check-in.
  - **Health**: Always verify `/api/health` endpoint passes before PR merge/deployment.

- **Manual validation:**
  - Confirm UI loads on `localhost:3000` after start.
  - Run `curl` on `/api/health` before/after changes.
  - If deploying, make sure service name in `service-descriptor.yml` is up-to-date.

- **Known Issues:**
  - Wrong Node version, missing `.env.local`, or missing `ASAP_PRIVATE_KEY` causes failed starts or health checks.
  - Unclean ports: Use `stop-dev.sh` to remedy (“Port in use” errors common if interrupted).

---

## How to Use These Instructions

**For the Copilot agent:**

- Trust the build, validation, and workflow steps above.
- If you need to make a code, config, or build step change, **prefer** the detailed commands and scripts herein over ad-hoc search or heuristic exploration.
- Only run additional codebase searches if you have strong evidence that the above instructions are outdated, incomplete, or producing errors.
- If any command here does _not_ work, record the error and update these instructions as well.

---

## Root Files (Directory Listing)

- .asap-config.example
- .gitignore
- AGENTS.md, CLAUDE.md, README.md
- components.json, registry.json
- eslint.config.mjs, next.config.ts, package.json, postcss.config.mjs, pnpm-lock.yaml, pnpm-workspace.yaml, service-descriptor.yml, tsconfig.json
- app/, backend/, components/, guides/, public/, registry/, rovo/, scripts/

**For details about AI prompt configuration, UI patterns, and deployment troubleshooting, see guides in `/guides/`, `.claude/skills/`, and referenced Markdown files in the repo root.**
