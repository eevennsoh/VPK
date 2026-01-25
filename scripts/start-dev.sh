#!/bin/bash

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

# Kill any existing processes on ports 8080 and 3000
echo "🛑 Cleaning up existing processes..."
pkill -f "node backend/server.js" 2>/dev/null && echo "   ✅ Stopped backend process" || true
pkill -f "next dev" 2>/dev/null && echo "   ✅ Stopped frontend process" || true

# Alternative approach if pkill doesn't work - kill by port
if command -v lsof &> /dev/null; then
    if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
        kill -9 $(lsof -t -i:8080) 2>/dev/null || true
        echo "   ✅ Cleaned up port 8080"
    fi
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        kill -9 $(lsof -t -i:3000) 2>/dev/null || true
        echo "   ✅ Cleaned up port 3000"
    fi
fi

# Wait a moment for ports to be released
sleep 1

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
echo "   - Express Backend: http://localhost:8080"
echo "   - Frontend: http://localhost:3000"
echo ""
echo "💡 To stop all services: ./scripts/stop-dev.sh"

# Save PIDs for cleanup script
echo "$BACKEND_PID $FRONTEND_PID" > .dev-pids

if [ "$NO_WAIT" = true ]; then
    echo ""
    echo "✅ Servers started in background"
else
    # Keep script running to maintain processes (for manual/terminal use)
    wait
fi
