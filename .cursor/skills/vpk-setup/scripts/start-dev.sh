#!/bin/bash
set -e

# Parse command line arguments
NO_WAIT=false
for arg in "$@"; do
    case $arg in
        --no-wait)
            NO_WAIT=true
            shift
            ;;
    esac
done

echo "🚀 Starting VPK Development Environment"
echo "======================================"

# Stop only services started by this script
echo "🛑 Cleaning up existing processes..."
if [ -f .dev-pids ]; then
    ./.cursor/skills/vpk-setup/scripts/stop-dev.sh
else
    echo "   ℹ️  No PID file found; leaving existing services running."
fi

# Wait a moment for ports to be released
sleep 1

# Handle stale Next.js dev lock (prevents multiple instances)
if [ -f .next/dev/lock ]; then
    if lsof -n -P -iTCP:3000-3019 -sTCP:LISTEN >/dev/null 2>&1; then
        echo "⚠️  Next.js dev lock detected and a dev server is already running."
        echo "   Stop it before restarting:"
        echo "   ./.cursor/skills/vpk-setup/scripts/stop-dev.sh"
        exit 1
    fi
    echo "   ℹ️  Removing stale Next.js dev lock"
    rm -f .next/dev/lock
fi

echo "✅ Environment ready"

# Start Express backend
echo "🖥️  Starting Express backend..."
if [ "$NO_WAIT" = true ]; then
    # For AI/automated execution - use nohup to detach
    nohup pnpm run dev:backend > /dev/null 2>&1 &
else
    pnpm run dev:backend &
fi
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"

# Wait for backend to start
sleep 3

# Read backend port if available
BACKEND_PORT=8080
if [ -f .dev-backend-port ]; then
    BACKEND_PORT=$(cat .dev-backend-port | tr -d '[:space:]')
fi

# Start frontend
echo "🎨 Starting Next.js frontend..."
if [ "$NO_WAIT" = true ]; then
    # For AI/automated execution - use nohup to detach
    nohup pnpm run dev:frontend > /dev/null 2>&1 &
else
    pnpm run dev:frontend &
fi
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"

echo ""
echo "🎉 All services started!"
echo "   - Express Backend: http://localhost:${BACKEND_PORT}"
echo "   - Frontend: http://localhost:3000 (or next available port)"
echo ""
echo "💡 To stop all services: ./.cursor/skills/vpk-setup/scripts/stop-dev.sh"

# Save PIDs for cleanup script
echo "$BACKEND_PID $FRONTEND_PID" > .dev-pids

if [ "$NO_WAIT" = true ]; then
    echo ""
    echo "✅ Servers started in background"
else
    # Keep script running to maintain processes (for manual/terminal use)
    wait
fi
