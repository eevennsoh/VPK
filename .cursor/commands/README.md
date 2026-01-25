# Codelassian Commands

This directory contains the **source of truth** for all custom commands.

These commands are symlinked to `.cursor/commands/` for Cursor compatibility.

## Available Commands

- **`/setup`** - Initial repository setup for local Mac development
- **`/voltsetup`** - Setup for Volt Studio (browser-based development)
- **`/run`** - Start local development servers
- **`/deploy`** - Deploy to Micros (auto-detects initial deploy vs redeploy)
- **`/commit`** - Git workflow for committing changes
- **`/design`** - Create design system compliant UI components (smart context detection)

## How Commands Work

Commands are markdown files that provide structured instructions. When you type `/commandname`, the content is inserted into the chat for the AI to follow.

**Example:**
```
User types: /setup
→ Content of setup.md is inserted
→ AI follows the instructions to set up the repository
```

## Command Design Principles

1. **Concise** - Keep commands short, link to detailed guides
2. **Actionable** - Clear steps, not just explanations
3. **Single source of truth** - These files are the source, guides provide depth
4. **Context-aware** - Commands adapt based on environment (local vs Volt Studio)

## File Structure

Each command file should have:
- **Step 0** - Gather information from user
- **Quick Workflow** - Overview of steps
- **Essential Commands** - Copy-pasteable commands
- **Checklist** - Verification steps
- **Quick Troubleshooting** - Common issues table
- **Need More Details?** - Links to comprehensive guides

## Adding New Commands

1. Create new `.md` file here
2. Create symlink in `.cursor/commands/`:
   ```bash
   cd .cursor/commands
   ln -s ../../.codelassian/commands/newcommand.md newcommand.md
   ```
3. Follow existing command structure
4. Link to relevant detailed guides (SETUP_GUIDE.md, DEPLOYMENT_GUIDE.md, etc.)

## Maintenance

**To edit commands:**
- ✅ Edit files here in `.codelassian/commands/`
- ❌ Don't edit symlinks in `.cursor/commands/`

**Single source of truth:**
- These files are the canonical source
- Symlinks ensure Cursor users get the same commands
- Detailed guides (*.md in root) provide comprehensive documentation

## Priority Order

When duplicate command names exist, this priority order applies:
1. Workspace `.codelassian/commands/` (here - highest priority)
2. Workspace `.cursor/commands/` (symlinks)
3. Global `~/.codelassian/commands/`
4. Global `~/.cursor/commands/` (lowest priority)
