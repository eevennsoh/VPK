#!/bin/bash

echo "🛑 Stopping VPK Development Environment"

if [ -f .dev-pids ]; then
    PIDS=$(cat .dev-pids)
    for pid in $PIDS; do
        if kill -0 $pid 2>/dev/null; then
            echo "   Stopping PID: $pid"
            kill $pid
        fi
    done
    rm .dev-pids
    echo "✅ All services stopped"
else
    echo "⚠️  No PID file found. Manually kill processes if needed."
    echo ""
    echo "To manually stop services:"
    echo "  pkill -f 'node backend/server.js'"
    echo "  pkill -f 'next dev'"
fi
