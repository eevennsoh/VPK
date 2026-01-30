# Figma MCP Integration

These rules define how to translate Figma designs into code for this project.

## Required Workflow

1. **Get design context** — Run `get_design_context` for the exact node(s)
2. **Handle large responses** — If truncated, run `get_metadata` first, then re-fetch specific nodes
3. **Get visual reference** — Run `get_screenshot` for the node variant
4. **Download assets** — Only after getting context and screenshot
5. **Implement** — Translate output into VPK conventions (see rules below)
6. **Validate** — Compare final UI against Figma for 1:1 fidelity

## Translation Rules

The Figma MCP server outputs React + Tailwind. Translate to VPK conventions:

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

| Figma/Tailwind             | VPK Translation                                                   |
| -------------------------- | ----------------------------------------------------------------- |
| `bg-white`, `bg-gray-100`  | `token("elevation.surface")`, `token("elevation.surface.sunken")` |
| `text-gray-900`            | `token("color.text")`                                             |
| `text-gray-500`            | `token("color.text.subtle")`                                      |
| `text-blue-600`            | `token("color.text.brand")`, `token("color.link")`                |
| `border-gray-200`          | `token("color.border")`                                           |
| `shadow-sm`, `shadow-md`   | `token("elevation.shadow.raised")`                                |
| `shadow-lg`, `shadow-xl`   | `token("elevation.shadow.overlay")`                               |
| `rounded-sm/md/lg/xl/full` | `token("radius.small/medium/large/xlarge/full")`                  |
| `p-1`, `p-2`, `p-4`        | `token("space.050")`, `token("space.100")`, `token("space.200")`  |

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

| Figma Element   | VPK Component                                            |
| --------------- | -------------------------------------------------------- |
| Button          | `import Button from "@atlaskit/button/new"`              |
| Icon button     | `import { IconButton } from "@atlaskit/button/new"`      |
| Text input      | `import TextField from "@atlaskit/textfield"`            |
| Select/dropdown | `import Select from "@atlaskit/select"`                  |
| Checkbox        | `import { Checkbox } from "@atlaskit/checkbox"`          |
| Toggle          | `import Toggle from "@atlaskit/toggle"`                  |
| Avatar          | `import Avatar from "@atlaskit/avatar"`                  |
| Badge           | `import Badge from "@atlaskit/badge"`                    |
| Lozenge         | `import Lozenge from "@atlaskit/lozenge"`                |
| Modal           | `import Modal from "@atlaskit/modal-dialog"`             |
| Tabs            | `import Tabs from "@atlaskit/tabs"`                      |
| Tooltip         | `import Tooltip from "@atlaskit/tooltip"`                |
| Menu            | `import { ButtonItem, MenuGroup } from "@atlaskit/menu"` |
| Spinner         | `import Spinner from "@atlaskit/spinner"`                |

### Icons

- First check `@atlaskit/icon` and `@atlaskit/icon-lab`
- Fallback to lucide-react if not found
- Always provide meaningful `label` props
- Import pattern: `import IconName from "@atlaskit/icon/core/icon-name"`

## Asset Handling

- Use localhost sources from Figma MCP directly
- Do NOT import new icon packages — check ADS icons first
- Do NOT create placeholders if a localhost source is provided
- Store downloaded assets in `public/`
- Use `next/image` with explicit `width` and `height`

## Props and Types

```tsx
interface ComponentNameProps {
	title: string;
	variant?: "default" | "elevated";
	onAction?: () => void;
}

export default function ComponentName({ title, variant = "default", onAction }: Readonly<ComponentNameProps>) {
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

## Validation Checklist

- [ ] Used `@atlaskit/tokens` for all colors, spacing, shadows, radii
- [ ] Used ADS primitives (Stack, Inline, Box, Flex) for layout
- [ ] Used Heading/Text components instead of raw HTML elements
- [ ] Icons have meaningful `label` props
- [ ] Component is under 150 lines (split if needed)
- [ ] Props interface is defined with `Readonly<>`
- [ ] Visual output matches Figma screenshot 1:1
