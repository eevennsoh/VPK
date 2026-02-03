# VPK Custom Components

This reference documents VPK's custom UI component wrappers. **Always check this list before importing Atlaskit components directly.**

## Overview

VPK provides custom wrappers for certain Atlaskit components to:

1. **Apply project-specific defaults** - Common props are pre-configured
2. **Simplify usage** - Fewer props to remember and type
3. **Centralize updates** - Changes to behavior happen in one place

## Component Registry

| Component | Wraps | Location | Purpose |
|-----------|-------|----------|---------|
| `CustomTooltip` | `@atlaskit/tooltip` | `components/ui/custom-tooltip.tsx` | Tooltips with VPK defaults |
| `FooterDisclaimer` | — | `components/ui/footer-disclaimer.tsx` | AI disclaimer footer |
| `LivePageIcon` | — | `components/ui/icon-livepage.tsx` | Custom LivePage icon |

---

## CustomTooltip

Wrapper around `@atlaskit/tooltip` with VPK-specific defaults.

### When to Use

**Do NOT import `@atlaskit/tooltip` directly.** Always use `CustomTooltip` instead.

### Import

```tsx
import CustomTooltip from "@/components/ui/custom-tooltip";
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | — | Tooltip content (required) |
| `children` | `ReactNode` | — | Trigger element (required) |
| `position` | `"top" \| "bottom" \| "left" \| "right" \| "mouse"` | `"top"` | Tooltip placement |
| `hideTooltipOnMouseDown` | `boolean` | `true` | Hide tooltip when clicking trigger |
| `hideTooltipOnClick` | `boolean` | — | Hide tooltip when clicking anywhere |
| `delay` | `number` | — | Delay before showing (ms) |
| `testId` | `string` | — | Test ID for the tooltip |

### VPK Defaults

- **`position="top"`** — Most common placement for buttons and icon buttons
- **`hideTooltipOnMouseDown={true}`** — Cleaner UX for interactive elements; tooltip disappears when clicking

### Usage

```tsx
import CustomTooltip from "@/components/ui/custom-tooltip";
import { IconButton } from "@atlaskit/button/new";
import EditIcon from "@atlaskit/icon/core/edit";

// Basic usage - defaults applied automatically
<CustomTooltip content="Edit item">
  <IconButton icon={EditIcon} label="Edit" appearance="subtle" />
</CustomTooltip>

// With keyboard shortcut hint
<CustomTooltip content="Enter plan mode ⇧Tab">
  <IconButton icon={ClipboardIcon} label="Enter plan mode" appearance="subtle" />
</CustomTooltip>

// Override position
<CustomTooltip content="More options" position="bottom">
  <IconButton icon={MoreIcon} label="More" appearance="subtle" />
</CustomTooltip>
```

### Why Not Import Atlaskit Directly?

The raw `@atlaskit/tooltip` requires setting `hideTooltipOnMouseDown` manually for interactive elements. Without it, the tooltip lingers awkwardly after clicking buttons. By using `CustomTooltip`, this UX improvement is automatic.

---

## FooterDisclaimer

Standard AI disclaimer footer used across VPK.

### Import

```tsx
import FooterDisclaimer from "@/components/ui/footer-disclaimer";
```

### Usage

```tsx
<FooterDisclaimer />
```

### Output

Renders a centered footer with information icon and text: "Uses AI. Verify results."

---

## LivePageIcon

Custom icon for LivePage feature (not available in Atlaskit icon set).

### Import

```tsx
import LivePageIcon from "@/components/ui/icon-livepage";
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `26` | Icon size in pixels |
| `color` | `string` | `token("color.icon")` | Icon fill color |

### Usage

```tsx
<LivePageIcon />
<LivePageIcon size={20} />
<LivePageIcon color={token("color.icon.brand")} />
```

---

## Adding New Custom Components

When creating a new VPK wrapper:

1. **Add the component** to `components/ui/`
2. **Update this document** with the component entry
3. **Update SKILL.md** and agent files to reference the new component

### Criteria for Wrapping

Create a wrapper when:

- An Atlaskit component needs VPK-specific defaults
- Multiple usages would benefit from shared configuration
- The raw component has a common "gotcha" that the wrapper prevents

Do NOT wrap when:

- The Atlaskit component is used with default behavior
- Each usage genuinely needs different configuration
- The component is only used in one place
