# VPK Prototype

A Next.js prototype with Atlassian AI Gateway integration, deployable to Micros.

## Architecture

This project uses a dual-mode runtime:

**Local Development:**
```
Browser → Next.js (:3000) → API proxy routes → Express (:8080) → AI Gateway
```

**Production (Micros):**
```
Browser → Express (:8080) → serves static export + handles /api/* → AI Gateway
```

Both modes use the same `/api/*` relative paths - no code changes needed between environments.

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- ASAP credentials for AI Gateway (see [SETUP_GUIDE.md](./SETUP_GUIDE.md))

### Installation

```bash
# Install frontend dependencies
pnpm install

# Install backend dependencies
cd backend && npm install && cd ..

# Copy and configure environment
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### Development

**Option 1: Automated (recommended)**
```bash
./scripts/start-dev.sh
```

**Option 2: Manual**
```bash
# Terminal 1: Backend
pnpm run dev:backend

# Terminal 2: Frontend
pnpm run dev:frontend
```

**Option 3: Concurrent**
```bash
pnpm run dev:full
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verify Setup

```bash
curl http://localhost:8080/api/health
```

Should show `"authMethod": "ASAP"` and all env vars as `"SET"`.

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Next.js dev server only |
| `pnpm run dev:backend` | Express backend only |
| `pnpm run dev:frontend` | Next.js frontend only |
| `pnpm run dev:full` | Both frontend and backend |
| `pnpm run build:production` | Static export for deployment |
| `./scripts/start-dev.sh` | Start both services (recommended) |
| `./scripts/stop-dev.sh` | Stop dev services |
| `./scripts/deploy.sh` | Deploy to Micros |

## Deployment to Micros

For complete deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

**Quick deploy:**
```bash
./scripts/deploy.sh <service-name> <version>
# Example: ./scripts/deploy.sh my-prototype 1.0.1
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API proxy routes (dev only)
│   │   ├── rovo-chat/     # Chat endpoint proxy
│   │   ├── health/        # Health check proxy
│   │   └── suggested-questions/
│   └── lib/               # Frontend utilities
│       └── api-config.ts  # API endpoint configuration
├── backend/               # Express server
│   ├── server.js          # Main server with AI Gateway integration
│   ├── Dockerfile         # Multi-stage Docker build
│   └── package.json       # Backend dependencies
├── shared/                # Shared modules
│   └── rovo-config.js     # AI prompt configuration
├── scripts/               # Build and deploy scripts
├── service-descriptor.yml # Micros deployment config
└── .env.local.example     # Environment template
```

## Documentation

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Local development setup with ASAP auth
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Micros deployment guide
- [deployment-plan.md](./deployment-plan.md) - Deployment reference notes

## Environment Variables

Required in `.env.local`:

```
AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/openai/v1/chat/completions
AI_GATEWAY_USE_CASE_ID=your-use-case-id
AI_GATEWAY_CLOUD_ID=local-testing
AI_GATEWAY_USER_ID=your-email@atlassian.com
ASAP_KID=your-use-case-id/timestamp
ASAP_ISSUER=your-use-case-id
ASAP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
```

Optional: `DEBUG=true` for verbose logging.

## Troubleshooting

**Port already in use:**
```bash
./scripts/stop-dev.sh
# or manually:
pkill -f 'node backend/server.js'
pkill -f 'next dev'
```

**ASAP_PRIVATE_KEY missing:**
- Ensure `.env.local` exists
- Private key must be quoted and use `\n` for newlines

**AI Gateway 401 errors:**
- Verify ASAP credentials in health check
- Check principal is whitelisted for your use case

For more help, see the troubleshooting sections in [SETUP_GUIDE.md](./SETUP_GUIDE.md) or [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).
