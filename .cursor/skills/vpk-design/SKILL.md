---
name: vpk-design
description: >-
  Atlassian Design System (ADS) patterns, components, and tokens. Use when implementing
  @atlaskit components, design tokens, primitives, or icons. Triggers: "use ADS",
  "add Atlassian component", "style with tokens", "ADS button/form/table", "add icon",
  "use primitives", "design system".
---

# Atlassian Design System Quick Reference

> Essential patterns for using ADS. For detailed references, see the `references/` directory.

## Core Principle: ADS First, Always

**Default Approach**: Always use Atlassian Design System (@atlaskit) components, tokens,
and icons FIRST before considering alternatives.

**Priority Order:**

1. Design tokens first → Tailwind classes for missing tokens → inline styles as last resort
2. ADS components first → shadcn for missing → custom components as a last resort
3. ADS icons first → lucide-react if not found in ADS

## References

For comprehensive documentation, see these reference files:

| File                              | Content                                                                 |
| --------------------------------- | ----------------------------------------------------------------------- |
| `references/tokens.md`            | Complete token tables (colors, spacing, typography, elevation, borders) |
| `references/components.md`        | All component APIs with props and examples                              |
| `references/primitives.md`        | Box, Stack, Inline, Grid, Text, Pressable, Anchor                       |
| `references/styling.md`           | Styling patterns with design tokens                                     |
| `references/content-standards.md` | Voice, tone, accessibility, inclusive language                          |
| `references/instructions.md`      | Component guidelines and decision trees                                 |
| `references/examples.md`          | Code examples for common patterns                                       |
| `references/search.md`            | How to find ADS components, icons, tokens                               |

---

## Quick Start

```tsx
import { token } from "@atlaskit/tokens";
import { Stack, Inline, Box, Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
```

---

## Typography Patterns

### Headings

**NEVER use** native HTML heading elements like `<h1>`, `<h2>`, etc.
**Always use** the ADS Heading component:

```tsx
import Heading from '@atlaskit/heading';

<Heading size="xxlarge">Page title</Heading>
<Heading size="large">Section title</Heading>
<Heading size="medium">Subsection</Heading>
```

### Text

**NEVER use** native HTML elements like `<p>`, `<span>`, `<div>` for text.
**Always use** the ADS Text primitive:

```tsx
import { Text } from '@atlaskit/primitives';

<Text>Regular text</Text>
<Text weight="bold">Bold text</Text>
<Text size="small" color="color.text.subtle">Secondary info</Text>
```

### Composite Font Tokens

Use composite tokens that set size, weight, line-height, and family in one declaration:

```tsx
<div style={{ font: token('font.body') }}>Default text (14px/400/20px)</div>
<div style={{ font: token('font.body.small') }}>Small text (12px/400/16px)</div>
<h2 style={{ font: token('font.heading.large') }}>Page title (24px/500/28px)</h2>
```

| Token                  | Size | Weight | Line Height |
| ---------------------- | ---- | ------ | ----------- |
| `font.heading.xxlarge` | 35px | 500    | 40px        |
| `font.heading.xlarge`  | 29px | 500    | 32px        |
| `font.heading.large`   | 24px | 500    | 28px        |
| `font.heading.medium`  | 20px | 500    | 24px        |
| `font.heading.small`   | 16px | 600    | 20px        |
| `font.body.large`      | 16px | 400    | 24px        |
| `font.body`            | 14px | 400    | 20px        |
| `font.body.small`      | 12px | 400    | 16px        |

---

## Icon Usage

Icons come from two packages: `@atlaskit/icon` and `@atlaskit/icon-lab`.

### Import Pattern

```tsx
// Pattern: import {PascalCase}Icon from '@atlaskit/{icon|icon-lab}/core/{kebab-case}'
import AddIcon from '@atlaskit/icon/core/add';
import EditIcon from '@atlaskit/icon/core/edit';
import SearchIcon from '@atlaskit/icon/core/search';

// Usage - label is REQUIRED
<AddIcon label="Add item" />
<AddIcon label="Add" size="small" />  // 16px
<AddIcon label="Add" size="medium" /> // 24px (default)
<AddIcon label="Add" size="large" />  // 32px
```

### Common Icon Mappings

| ❌ Wrong  | ✅ Correct                         |
| --------- | ---------------------------------- |
| `folder`  | `folder-closed` or `folder-open`   |
| `user`    | `person`                           |
| `play`    | `video-play`                       |
| `arrow`   | `arrow-right`, `arrow-left`, etc.  |
| `chevron` | `chevron-down`, `chevron-up`, etc. |

**NEVER:**

- Import from `@atlaskit/icon/glyph/` (deprecated)
- Invent or guess icon names
- Use icons not verified to exist

---

## Common Components

### Button

```tsx
import Button from '@atlaskit/button/new';
import { IconButton } from '@atlaskit/button/new';

<Button appearance="primary" iconBefore={AddIcon}>Create</Button>
<Button appearance="subtle">Cancel</Button>
<IconButton icon={EditIcon} label="Edit" appearance="subtle" />
```

**Appearances:** `'default' | 'primary' | 'subtle' | 'warning' | 'danger' | 'discovery'`

### Form Inputs

```tsx
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import Checkbox from '@atlaskit/checkbox';
import { Radio } from '@atlaskit/radio';
import Select from '@atlaskit/select';
import Toggle from '@atlaskit/toggle';

<TextField value={value} onChange={handleChange} />
<Checkbox label="Accept terms" isChecked={checked} onChange={handleCheck} />
<Select options={[{ label: 'Option 1', value: '1' }]} onChange={handleSelect} />
<Toggle isChecked={enabled} onChange={handleToggle} />
```

### Status Indicators

```tsx
import Lozenge from '@atlaskit/lozenge';
import Badge from '@atlaskit/badge';

<Lozenge appearance="success">Done</Lozenge>
<Lozenge appearance="inprogress">In progress</Lozenge>
<Badge appearance="primary">{count}</Badge>
```

---

## Layout Primitives

Use `@atlaskit/primitives` (not `@atlaskit/primitives/compiled`)

```tsx
import { Box, Stack, Inline, Flex, Grid } from '@atlaskit/primitives';

// Vertical stacking
<Stack space="space.200">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

// Horizontal layout
<Inline space="space.100" alignBlock="center">
  <Avatar />
  <Text>Name</Text>
</Inline>

// Flexible layout
<Flex gap="space.200" justifyContent="space-between">
  <div>Left</div>
  <div>Right</div>
</Flex>

// Box with background
<Box backgroundColor="elevation.surface.raised">
  Content
</Box>
```

---

## Token Patterns

### Spacing

**NEVER use** pixel or rem values for padding, margin, or gap.
**Always use** space tokens:

```tsx
padding: token("space.100"); // 8px
padding: token("space.200"); // 16px
padding: token("space.300"); // 24px
gap: token("space.150"); // 12px
margin: token("space.050"); // 4px
```

### Colors

```tsx
// Text colors
color: token("color.text"); // Primary text
color: token("color.text.subtle"); // Secondary text
color: token("color.text.subtlest"); // Tertiary text

// Background colors
backgroundColor: token("elevation.surface"); // Default surface
backgroundColor: token("color.background.neutral"); // Neutral
backgroundColor: token("color.background.brand.bold"); // Brand
backgroundColor: token("color.background.selected"); // Selected state

// Border colors
border: `${token("border.width")} solid ${token("color.border")}`;
```

### Interactive States

Use primitives with built-in token props, or inline styles with `token()`:

```tsx
// Using Box with backgroundColor prop (preferred)
<Box backgroundColor="color.background.neutral">Content</Box>

// For hover/active states, use Pressable or Button components
import { Pressable } from "@atlaskit/primitives";

<Pressable onClick={handleClick}>
  Interactive content
</Pressable>
```

---

## Content Writing Guidelines

### Capitalization

**ALWAYS use sentence case** for all UI text:

- ✅ "Project settings" NOT "Project Settings"
- ✅ "Email notifications" NOT "Email Notifications"

### Language

- Use contractions ("can't", "don't", "you'll")
- Use US English spelling ("color" not "colour")
- Use active voice
- Use "you" and "your"
- Use numerals for quantities ("3 projects" not "three projects")

### Buttons

Use sentence case with verb + noun pattern:

- ✅ "Save changes", "Delete project", "Send message"
- ❌ "Message", "Send"

---

## Best Practices Checklist

- [ ] Using design tokens (not hardcoded colors, spacing, or fonts)
- [ ] Using ADS components (Button, TextField, Lozenge, etc.)
- [ ] Using primitives for layout (Stack, Inline, Box, Flex)
- [ ] Using Heading and Text components (not raw HTML elements)
- [ ] Importing from `@atlaskit/primitives` paths
- [ ] Icons have required `label` prop
- [ ] Following sentence case for UI text

---

## Documentation Links

- [ADS Component Library](https://atlassian.design/components)
- [Icon Explorer](https://atlassian.design/components/icon/icon-explorer)
- [Design Tokens](https://atlassian.design/components/tokens)
- [Primitives](https://atlassian.design/components/primitives)
- [Content Standards](https://atlassian.design/foundations/content)
