# Implement Figma Design

Structured workflow for translating Figma designs into production-ready VPK code with 1:1 visual fidelity.

## Prerequisites

- Figma MCP server must be connected (`figma` or `figma-desktop`)
- User provides a Figma URL or selects a node in Figma desktop app
- URL format: `https://figma.com/design/:fileKey/:fileName?node-id=1-2`

## Required Workflow

**Follow these steps in order. Do not skip steps.**

### Step 1: Get Node ID

#### Option A: Parse from Figma URL

Extract the file key and node ID from the URL:

- **File key:** segment after `/design/`
- **Node ID:** value of `node-id` query parameter

**Example:**

- URL: `https://figma.com/design/kL9xQn2VwM8pYrTb4ZcHjF/DesignSystem?node-id=42-15`
- File key: `kL9xQn2VwM8pYrTb4ZcHjF`
- Node ID: `42-15`

#### Option B: Use Current Selection (figma-desktop MCP only)

When using `figma-desktop` MCP without a URL, tools automatically use the currently selected node from the open Figma file.

**Note:** `fileKey` is not needed for `figma-desktop` — the server uses the currently open file.

### Step 2: Fetch Design Context

```
get_design_context(fileKey=":fileKey", nodeId="1-2")
```

Returns layout properties, typography, colors, component structure, and spacing.

**If the response is truncated:**

1. Run `get_metadata(fileKey=":fileKey", nodeId="1-2")` to get the node map
2. Identify specific child nodes from metadata
3. Fetch each with `get_design_context(fileKey=":fileKey", nodeId=":childNodeId")`

### Step 3: Capture Visual Reference

```
get_screenshot(fileKey=":fileKey", nodeId="1-2")
```

This screenshot is the source of truth for validation. Keep it accessible throughout implementation.

### Step 4: Download Required Assets

Download images, icons, and SVGs returned by the Figma MCP server.

**Asset rules:**

- Use `localhost` sources from Figma MCP directly
- Do NOT import new icon packages — check ADS icons first
- Do NOT create placeholders if a localhost source is provided
- Store downloaded assets in `public/`
- Use `next/image` with explicit `width` and `height`

### Step 5: Translate to VPK Conventions

The Figma MCP server outputs React + Tailwind. Translate to VPK conventions using the rules below.

### Step 6: Validate Against Figma

Compare final UI against the Figma screenshot for 1:1 fidelity.

---

## Translation Rules

### Component Organization

| Figma Output               | VPK Translation                                          |
| -------------------------- | -------------------------------------------------------- |
| New feature component      | `components/blocks/[feature]/page.tsx` + `components/`   |
| Reusable UI primitive      | `components/ui/[component].tsx`                          |
| Feature-specific component | `components/blocks/[feature]/components/[component].tsx` |

**Rules:**

- All components use `"use client"` directive
- Keep components under 150 lines — split as needed
- Export main component as default from `page.tsx`

### Styling: ADS Tokens

| Figma/Tailwind               | VPK Translation                                                       |
| ---------------------------- | --------------------------------------------------------------------- |
| `bg-white`, `bg-gray-100`    | `token("elevation.surface")`, `token("elevation.surface.sunken")`     |
| `text-gray-900`              | `token("color.text")`                                                 |
| `text-gray-500`              | `token("color.text.subtle")`                                          |
| `text-blue-600`              | `token("color.text.brand")`, `token("color.link")`                    |
| `border-gray-200`            | `token("color.border")`                                               |
| `shadow-sm`, `shadow-md`     | `token("elevation.shadow.raised")`                                    |
| `shadow-lg`, `shadow-xl`     | `token("elevation.shadow.overlay")`                                   |
| `rounded-sm/md/lg/xl/full`   | `token("radius.small/medium/large/xlarge/full")`                      |
| `p-1`, `p-2`, `p-4`          | `token("space.050")`, `token("space.100")`, `token("space.200")`      |

**Spacing tokens:**

- `space.0` = 0px, `space.025` = 2px, `space.050` = 4px, `space.075` = 6px
- `space.100` = 8px, `space.150` = 12px, `space.200` = 16px, `space.250` = 20px
- `space.300` = 24px, `space.400` = 32px, `space.500` = 40px, `space.600` = 48px

### Layout: ADS Primitives

| Figma/Tailwind                          | VPK Translation                                  |
| --------------------------------------- | ------------------------------------------------ |
| `<div className="flex flex-col gap-4">` | `<Stack space="space.200">`                      |
| `<div className="flex flex-row gap-2">` | `<Inline space="space.100" alignBlock="center">` |
| Complex flex layouts                    | `<Flex>` with gap, alignItems, justifyContent    |
| `<div className="grid grid-cols-3">`    | `<Grid templateColumns="1fr 1fr 1fr">`           |
| Generic container                       | `<Box>` with xcss or style props                 |

### Typography

| Figma/Tailwind       | VPK Translation                     |
| -------------------- | ----------------------------------- |
| `<h1>`, `<h2>`, etc. | `<Heading size="xlarge/large/...">` |
| `<p>`, `<span>`      | `<Text>`                            |
| `text-sm`            | `<Text size="small">`               |
| `font-semibold/bold` | `<Text weight="semibold/bold">`     |

### Components: ADS First

| Figma Element   | VPK Component                                       |
| --------------- | --------------------------------------------------- |
| Button          | `import Button from "@atlaskit/button/new"`         |
| Icon button     | `import { IconButton } from "@atlaskit/button/new"` |
| Text input      | `import TextField from "@atlaskit/textfield"`       |
| Select/dropdown | `import Select from "@atlaskit/select"`             |
| Checkbox        | `import { Checkbox } from "@atlaskit/checkbox"`     |
| Toggle          | `import Toggle from "@atlaskit/toggle"`             |
| Avatar          | `import Avatar from "@atlaskit/avatar"`             |
| Badge           | `import Badge from "@atlaskit/badge"`               |
| Lozenge         | `import Lozenge from "@atlaskit/lozenge"`           |
| Modal           | `import Modal from "@atlaskit/modal-dialog"`        |
| Tabs            | `import Tabs from "@atlaskit/tabs"`                 |
| Tooltip         | `import Tooltip from "@atlaskit/tooltip"`           |
| Menu            | `import { ButtonItem, MenuGroup } from "@atlaskit/menu"` |
| Spinner         | `import Spinner from "@atlaskit/spinner"`           |

### Icons

- First check `@atlaskit/icon` and `@atlaskit/icon-lab`
- Fallback to lucide-react if not found
- Always provide meaningful `label` props
- Import pattern: `import IconName from "@atlaskit/icon/core/icon-name"`

---

## Props and Types

```tsx
interface ComponentNameProps {
  title: string;
  variant?: 'default' | 'elevated';
  onAction?: () => void;
}

export default function ComponentName({ 
  title, 
  variant = 'default',
  onAction 
}: Readonly<ComponentNameProps>) {
  // ...
}
```

## State and Context

**Use existing contexts:**

- `useSidebar()` from `@/app/contexts/context-sidebar`
- `useRovoChat()` from `@/app/contexts/context-rovo-chat`
- `useTheme()` from `@/components/utils/theme-wrapper`

**For new state:**

- Shared state → create context in `app/contexts/context-[name].tsx`
- Feature-specific → use local useState or hooks in `components/blocks/[feature]/hooks/`

## Dark Mode

- All `token()` values automatically adapt to dark mode
- Theme is managed by `ThemeWrapper`
- No manual dark mode handling needed

---

## Examples

### Example 1: Implementing a Button Component

User says: "Implement this Figma button: https://figma.com/design/kL9xQn2VwM8pYrTb4ZcHjF/DesignSystem?node-id=42-15"

**Actions:**

1. Parse URL: fileKey=`kL9xQn2VwM8pYrTb4ZcHjF`, nodeId=`42-15`
2. Run `get_design_context(fileKey="kL9xQn2VwM8pYrTb4ZcHjF", nodeId="42-15")`
3. Run `get_screenshot(fileKey="kL9xQn2VwM8pYrTb4ZcHjF", nodeId="42-15")`
4. Download any button icons from assets endpoint
5. Check if project has existing button component
6. If yes, extend with new variant; if no, create using VPK conventions
7. Map Figma colors to ADS tokens
8. Validate against screenshot

### Example 2: Building a Dashboard Layout

User says: "Build this dashboard: https://figma.com/design/pR8mNv5KqXzGwY2JtCfL4D/Dashboard?node-id=10-5"

**Actions:**

1. Parse URL: fileKey=`pR8mNv5KqXzGwY2JtCfL4D`, nodeId=`10-5`
2. Run `get_metadata` to understand page structure
3. Identify main sections (header, sidebar, content, cards) and their node IDs
4. Run `get_design_context` for each major section
5. Run `get_screenshot` for the full page
6. Download all assets
7. Build layout using ADS primitives (Stack, Inline, Box, Flex)
8. Implement sections using existing ADS components
9. Validate responsive behavior

---

## Common Issues and Solutions

### Figma output is truncated

**Cause:** Design is too complex for a single response.
**Solution:** Use `get_metadata` first, then fetch specific nodes individually.

### Design doesn't match after implementation

**Cause:** Visual discrepancies with original design.
**Solution:** Compare side-by-side with screenshot. Check spacing, colors, typography in design context data.

### Assets not loading

**Cause:** Figma MCP assets endpoint not accessible or URLs modified.
**Solution:** Use localhost URLs from Figma MCP directly without modification.

### Design token values differ from Figma

**Cause:** Project tokens have different values than Figma specs.
**Solution:** Prefer ADS tokens for consistency, adjust spacing/sizing minimally to match visuals.

---

## Validation Checklist

- [ ] Used `@atlaskit/tokens` for all colors, spacing, shadows, radii
- [ ] Used ADS primitives (Stack, Inline, Box, Flex) for layout
- [ ] Used Heading/Text components instead of raw HTML elements
- [ ] Icons have meaningful `label` props
- [ ] Component is under 150 lines (split if needed)
- [ ] Props interface is defined with `Readonly<>`
- [ ] Visual output matches Figma screenshot 1:1

## Additional Resources

- [Figma MCP Server Documentation](https://developers.figma.com/docs/figma-mcp-server/)
- [Figma MCP Server Tools and Prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
- [Figma Variables and Design Tokens](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
