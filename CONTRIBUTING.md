# Contributing to VPK

Thanks for your interest in contributing to VPK!

## Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd vpk
   ```

2. Install dependencies (frontend + backend via pnpm workspaces):
   ```bash
   pnpm install
   ```

3. Configure environment:
   ```bash
   cp .env.local.example .env.local
   ```

4. Set up ASAP credentials - see [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions

5. Start development servers:
   ```bash
   ./.claude/skills/vpk-setup/scripts/start-dev.sh
   ```

6. Verify setup:
   ```bash
   curl http://localhost:8080/api/health
   ```

## Code Style

- **Indentation:** Tabs (not spaces)
- **Package manager:** pnpm
- **Imports:** Use `@/` path alias for absolute imports
- **UI Components:** Atlassian Design System (@atlaskit)
- **Icons:** `@atlaskit/icon` and `@atlaskit/icon-lab`
- **Tokens:** Use `token()` from `@atlaskit/tokens` for colors, spacing, shadows

## Pull Requests

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Ensure linting passes:
   ```bash
   pnpm run lint
   ```

4. Test locally with both frontend and backend running

5. Submit a pull request with a clear description of your changes

## Project Structure

See [README.md](./README.md#project-structure) for an overview of the codebase.

## Need Help?

- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for environment setup issues
- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment questions
