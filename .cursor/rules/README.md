# Codelassian Rules

This directory contains the **source of truth** for custom rules.

These rules are symlinked to `.cursor/rules/` for Cursor compatibility.

## Available Rules

### Atlassian Design System Rules

- **`@ADSCore.md`** - Core ADS patterns and quick reference (279 lines) ⭐ Start here
  - Typography patterns with composite tokens
  - Icon import workflow (with ADS MCP integration)
  - Common components and tokens
  - Auto-loads for `.tsx`, `.ts`, `.jsx`, `.js` files
  - References AtlassianDesignSystem.md for detailed docs
  - Recommends ADS MCP for dynamic lookups

- **`@AtlassianDesignSystem.md`** - Complete ADS reference (3,898 lines)
  - Full token tables (colors, spacing, borders, etc.)
  - Comprehensive component documentation
  - Primitives reference
  - Agent can read this when ADSCore references it
  - Or manually attach with `@AtlassianDesignSystem` when needed

### The Hybrid Approach

**ADSCore.md provides:**
- ⚡ Fast, in-context patterns (loaded automatically)
- 📝 Import syntax and common usage
- 🎯 References to both ADS MCP and full docs

**ADS MCP provides:**
- 🔍 Dynamic icon/component/token searches
- 🆕 Always up-to-date with latest ADS
- 💾 Zero context cost

**AtlassianDesignSystem.md provides:**
- 📚 Comprehensive reference when needed
- 📊 Complete token tables
- 🔧 Detailed component APIs

**The agent will:**
1. Use ADSCore patterns for common tasks (fast)
2. Call ADS MCP for specific lookups (accurate)
3. Read AtlassianDesignSystem.md when it needs comprehensive docs (thorough)

## How Rules Work

Rules provide context and guidelines that the AI uses when writing code. They're automatically applied based on:
- File patterns (globs)
- Manual mention with `@RuleName`
- Always apply setting

## Maintenance

**To edit rules:**
- ✅ Edit files here in `.codelassian/rules/`
- ❌ Don't edit symlinks in `.cursor/rules/`

**To add new rules:**
1. Create `.md` file here
2. Create symlink: `cd .cursor/rules && ln -s ../../.codelassian/rules/newrule.md newrule.md`

## Single Source of Truth

- This directory is the canonical source
- Symlinks ensure Cursor users get the same rules
- Edit once, works everywhere
