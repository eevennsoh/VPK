#!/bin/bash

echo "🔍 Pre-deployment Checks"

# Check required ASAP environment variables for production
if [ -z "$ASAP_PRIVATE_KEY" ] || [ -z "$ASAP_KID" ] || [ -z "$ASAP_ISSUER" ]; then
    echo "❌ Missing ASAP credentials for production deployment"
    echo "   Required: ASAP_PRIVATE_KEY, ASAP_KID, ASAP_ISSUER"
    exit 1
fi

# Check AI Gateway configuration
if [ -z "$AI_GATEWAY_URL" ]; then
    echo "❌ Missing AI_GATEWAY_URL"
    exit 1
fi

if [ -z "$AI_GATEWAY_USE_CASE_ID" ]; then
    echo "❌ Missing AI_GATEWAY_USE_CASE_ID"
    exit 1
fi

echo "✅ Deployment checks passed"
echo "   Auth Method: ASAP"
echo "   AI Gateway: $AI_GATEWAY_USE_CASE_ID"
