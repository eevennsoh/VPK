---
description: VPK prototyping rules (ADS-first, motion policy, design agent)
alwaysApply: true
---

# VPK Prototyping Rules

## ADS-first UI system

Priority order:
1. VPK custom components (see `@/components/ui/*` wrappers)
2. Atlassian Design System (@atlaskit)
3. shadcn/ui
4. Custom components (last resort; document why)

## Styling

- Use design tokens via `token()` for spacing, colors, typography, borders, and shadows.
- Only use Tailwind classes when ADS tokens don't cover the need (prefer variables mapped in `app/tailwind-theme.css`).
- Avoid hardcoded colors/spacing unless absolutely necessary and documented.

## Typography & layout

- Never use raw HTML headings or text elements for UI (`<h1>`, `<p>`, `<span>`). Use ADS `Heading` and `Text`.
- Use ADS primitives (`Box`, `Stack`, `Inline`, `Flex`, `Grid`) for layout.

## Icons

- Use ADS icons from `@atlaskit/icon` or `@atlaskit/icon-lab`.
- Always provide a meaningful `label` for accessibility.

## Motion policy

- Always consult Motion MCP guidance before designing animations.
- Prefer CSS/WAAPI for simple transitions and `motion.dev` for complex interactions.
- Do not add `framer-motion` or other animation libraries.
- Honor `prefers-reduced-motion` (reduce or remove non-essential motion).

## Process

- For UI work, proactively use the `vpk-agent-design` subagent and wait for its output.
