#!/usr/bin/env bash
set -euo pipefail

if ! command -v pnpm >/dev/null 2>&1; then
	echo "pnpm not found; install it first." >&2
	exit 1
fi

pnpm install
