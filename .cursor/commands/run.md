# Run - Start Local Development

## Quick Start

```bash
# Automated startup (recommended)
./scripts/start-dev.sh --no-wait

# To stop
./scripts/stop-dev.sh
```

**About `--no-wait` flag:**
- Makes script return immediately (doesn't block)
- **Use with AI execution** (prevents hanging)
- For manual terminal use: omit flag to keep terminal attached
- Logs: `backend.log` and `frontend.log`

This starts both backend (port 8080) and frontend (port 3000).

## Alternative Start Methods

### Option 1: Two Terminals
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
```

### Option 2: Single Terminal
```bash
npm run dev:full
```

Press Ctrl+C to stop.

## Verify It Works

### 1. Backend Health Check
```bash
curl http://localhost:8080/api/health
```

**Expected:** All env vars show "SET" (not "MISSING")

### 2. Frontend
Open http://localhost:3000

### 3. Test AI Chat
1. Click "Ask Rovo"
2. Send a message
3. Get AI response!

## Architecture

```mermaid
graph LR
    A[Browser :3000] --> B[Next.js API Routes]
    B --> C[Express Backend :8080]
    C --> D[AI Gateway]
    
    style A fill:#2196F3
    style C fill:#4CAF50
    style D fill:#FF9800
```

**Key Points:**
- Frontend: http://localhost:3000 (Next.js dev server)
- Backend: http://localhost:8080 (Express server)
- API routes proxy: `/api/*` → backend
- Same ASAP auth works in dev and production

## Development Workflow

### Making Changes

**Frontend** (auto hot-reload):
- Edit `app/` files
- Browser refreshes automatically

**Backend** (manual restart):
- Edit `backend/server.js`
- Restart: `./scripts/stop-dev.sh && ./scripts/start-dev.sh`

**Environment variables**:
- Edit `.env.local`
- Restart both servers

## Running Checklist

- [ ] `/setup` completed
- [ ] `.env.local` exists
- [ ] Backend starts (port 8080)
- [ ] Frontend starts (port 3000)
- [ ] Health check passes
- [ ] Chat works

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "EADDRINUSE" | `./scripts/stop-dev.sh` then restart |
| "ASAP_PRIVATE_KEY: MISSING" | Check [.env.local format](../../SETUP_GUIDE.md#-important---private-key-format) |
| No AI response | Verify health check shows all "SET" |
| "Cannot find module" | Run `npm install` |
| Port in use | `lsof -i :8080` or `lsof -i :3000` to find process |

## Development URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8080
- **Health:** http://localhost:8080/api/health

## Need More Details?

- **📖 Full Setup Guide:** [SETUP_GUIDE.md](../../SETUP_GUIDE.md)
- **🧪 Testing Locally:** [SETUP_GUIDE.md - Test Locally](../../SETUP_GUIDE.md#test-locally)
- **🐛 Troubleshooting:** [SETUP_GUIDE.md - Troubleshooting](../../SETUP_GUIDE.md#troubleshooting-envlocal-issues)
- **🏗️ Architecture:** [DEPLOYMENT_GUIDE.md - Architecture](../../DEPLOYMENT_GUIDE.md#️-architecture--workflow-overview)

## Next Steps

- Make changes and test
- Use `/commit` to save changes
- Use `/deploy` or `/redeploy` for production updates
