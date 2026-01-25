---
description: Core Atlassian Design System patterns and quick reference
globs:
  - "app/**/*.{tsx,jsx}"
alwaysApply: false
---

# Atlassian Design System - Core Patterns

> Essential patterns for using ADS. For detailed references, see additional rules files below.

## 📚 Additional ADS Reference

When you need detailed information beyond this core reference:

- **Complete ADS Documentation**: `/Users/kgrennan/kg-prototyping/.codelassian/rules/AtlassianDesignSystem.md`
  - Full token tables (colors, spacing, borders, elevation, etc.)
  - Detailed component APIs and examples
  - Primitives reference with all props
  - Use `read_files` to load when you need comprehensive documentation

- **ADS MCP (Preferred for lookups)**: Use `mcp_ads_ads_plan` tool
  - Real-time component/icon/token search
  - Always up-to-date with latest ADS
  - Faster than reading large documentation files
  - Use for: finding icons, searching components, looking up specific tokens

## Quick Start

**Always import tokens and use the ADS MCP:**

```tsx
import { token } from '@atlaskit/tokens';
import { css } from '@atlaskit/css';

// Use the ADS MCP to search for icons, components, and tokens
mcp_ads_ads_plan({
  icons: ['icon-name'],
  tokens: ['token-name'],
  components: ['component-name']
});
```

## Typography Patterns

### Use Composite Font Tokens

Composite tokens set size, weight, line-height, and family in one declaration:

```tsx
// Base text
<div style={{ font: token('font.body') }}>Default text (14px/400/20px)</div>
<div style={{ font: token('font.body.small') }}>Small text (12px/400/16px)</div>

// Headings
<h2 style={{ font: token('font.heading.large') }}>Page title (24px/500/28px)</h2>

// Override weight for emphasis
<div style={{
  font: token('font.body'),
  fontWeight: token('font.weight.semibold')
}}>
  Emphasized text (14px/600/20px)
</div>
```

**Available composite tokens:**

| Token                  | Size | Weight | Line Height |
| ---------------------- | ---- | ------ | ----------- |
| `font.heading.xxlarge` | 35px | 500    | 40px        |
| `font.heading.xlarge`  | 29px | 500    | 32px        |
| `font.heading.large`   | 24px | 500    | 28px        |
| `font.heading.medium`  | 20px | 500    | 24px        |
| `font.heading.small`   | 16px | 600    | 20px        |
| `font.heading.xsmall`  | 14px | 600    | 16px        |
| `font.heading.xxsmall` | 12px | 600    | 16px        |
| `font.body.large`      | 16px | 400    | 24px        |
| `font.body`            | 14px | 400    | 20px        |
| `font.body.small`      | 12px | 400    | 16px        |

**Weight override tokens:**

| Token                  | Value |
| ---------------------- | ----- |
| `font.weight.regular`  | 400   |
| `font.weight.medium`   | 500   |
| `font.weight.semibold` | 600   |
| `font.weight.bold`     | 700   |

### Prefer Text and Heading Components

```tsx
import { Text } from '@atlaskit/primitives/compiled';
import Heading from '@atlaskit/heading';

<Text size="medium" weight="regular">Body text</Text>
<Text size="small" weight="medium" color="color.text.subtle">Secondary info</Text>
<Heading size="large">Page title</Heading>
```

## Icon Imports

**CRITICAL: Always use the ADS MCP to find the correct icon package.**

Icons come from two packages:
- `@atlaskit/icon` - Stable icons
- `@atlaskit/icon-lab` - Experimental icons

### Find Icons First

```tsx
// Step 1: Use ADS MCP to find the icon
mcp_ads_ads_plan({
  icons: ['backlog', 'randomize', 'add'],
  tokens: [],
  components: []
});

// Step 2: Use the exact import path returned
import BacklogIcon from '@atlaskit/icon/core/backlog';
import RandomizeIcon from '@atlaskit/icon-lab/core/randomize';
import AddIcon from '@atlaskit/icon/core/add';

// Step 3: Use with required label
<AddIcon label="Add item" />
<BacklogIcon label="View backlog" size="small" />
```

**Import pattern:**
```
import {PascalCase}Icon from '@atlaskit/{icon|icon-lab}/core/{kebab-case}'
```

## Common Components

### Button

```tsx
import Button from '@atlaskit/button/new';
import { IconButton } from '@atlaskit/button/new';

<Button appearance="primary" iconBefore={AddIcon}>Create</Button>
<IconButton icon={EditIcon} label="Edit" appearance="subtle" />
```

**Key props:** `appearance`, `iconBefore`, `iconAfter`, `isLoading`, `isDisabled`, `onClick`

### Form Inputs

```tsx
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import Checkbox from '@atlaskit/checkbox';
import { Radio } from '@atlaskit/radio';
import Select from '@atlaskit/select';

<TextField value={value} onChange={handleChange} />
<Checkbox label="Accept terms" isChecked={checked} onChange={handleCheck} />
<Select options={[...]} onChange={handleSelect} />
```

## Common Token Patterns

### Colors

```tsx
// Text colors
color: token('color.text')              // Primary text
color: token('color.text.subtle')       // Secondary text
color: token('color.text.subtlest')     // Tertiary text

// Background colors
backgroundColor: token('elevation.surface')                    // Default surface
backgroundColor: token('color.background.neutral')             // Neutral background
backgroundColor: token('color.background.brand.bold')          // Brand background
backgroundColor: token('color.background.selected')            // Selected state

// Border colors
border: `${token('border.width')} solid ${token('color.border')}`
```

### Spacing

```tsx
// Common spacing values
padding: token('space.100')   // 8px - Compact UI
padding: token('space.200')   // 16px - Less dense UI
padding: token('space.300')   // 24px - Less dense UI
gap: token('space.150')       // 12px - Between items
```

### Interactive States

```tsx
const styles = css({
  backgroundColor: token('color.background.neutral'),
  '&:hover': {
    backgroundColor: token('color.background.neutral.hovered'),
  },
  '&:active': {
    backgroundColor: token('color.background.neutral.pressed'),
  },
});
```

## Layout Primitives

```tsx
import { Box, Stack, Inline, Flex } from '@atlaskit/primitives/compiled';

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
```

## Styling with @atlaskit/css

**Use `@atlaskit/css` for styling (not xcss from primitives):**

```tsx
import { css, cssMap } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

// Single style
const styles = css({
  padding: token('space.200'),
  backgroundColor: token('elevation.surface'),
  borderRadius: token('border.radius'),
});

// Multiple styles
const styleMap = cssMap({
  container: {
    display: 'flex',
    gap: token('space.100'),
  },
  item: {
    padding: token('space.100'),
    color: token('color.text'),
  },
});

<div className={styles}>Content</div>
<div className={styleMap.container}>
  <div className={styleMap.item}>Item</div>
</div>
```

## Best Practices

1. **Always use design tokens** - Never hardcode colors, spacing, or font sizes
2. **Use ADS MCP** - Search for icons, components, and tokens before implementing
3. **Prefer components and primitives** - Use `<Text>`, `<Heading>`, `<Button>`, etc.
4. **Use composite font tokens** - `font: token('font.body')` instead of individual properties
5. **Import from `/compiled`** - Use `@atlaskit/primitives/compiled` not `@atlaskit/primitives`
6. **Verify icon packages** - Use ADS MCP to ensure correct `@atlaskit/icon` vs `@atlaskit/icon-lab`

## Documentation Links

- [ADS Component Library](https://atlassian.design/components)
- [Icon Explorer](https://atlassian.design/components/icon/icon-explorer)
- [Design Tokens](https://atlassian.design/components/tokens)
- [Primitives](https://atlassian.design/components/primitives)
