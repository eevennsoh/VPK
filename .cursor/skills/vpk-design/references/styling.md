# Atlassian UI Styling Standard

> Guidelines for consistent styling practices using Atlassian Design System tokens and primitives.

---

## Core Principles

### Use Design Tokens

Always use design tokens from `@atlaskit/tokens` instead of hardcoded values to ensure consistency and theme support.

```tsx
import { token } from "@atlaskit/tokens";

// Use token() for all styling values
const style = {
	padding: token("space.200"),
	color: token("color.text"),
	backgroundColor: token("color.background.neutral"),
};
```

### Use Primitives for Layout

Use `@atlaskit/primitives` components (Box, Stack, Inline, Flex, Grid) which have built-in token support via props.

```tsx
import { Box, Stack, Inline } from "@atlaskit/primitives";

// Primitives accept token names directly as props
<Box backgroundColor="color.background.neutral" padding="space.200">
	<Stack space="space.100">
		<Inline space="space.050" alignBlock="center">
			Content here
		</Inline>
	</Stack>
</Box>;
```

### Styling Approaches (Priority Order)

1. **Primitive props** - Use built-in props like `backgroundColor`, `padding`, `space`
2. **Inline styles with tokens** - Use `style={{ padding: token("space.200") }}`
3. **Tailwind classes** - For utilities not covered by tokens
4. **Custom CSS** - As a last resort

---

## Using Primitives with Token Props

### Box

```tsx
import { Box } from "@atlaskit/primitives";

<Box
	backgroundColor="elevation.surface.raised"
	padding="space.200"
>
	Content
</Box>;
```

### Stack and Inline

```tsx
import { Stack, Inline } from "@atlaskit/primitives";

<Stack space="space.200">
	<Inline space="space.100" alignBlock="center">
		<Avatar />
		<Text>Name</Text>
	</Inline>
</Stack>;
```

### Flex and Grid

```tsx
import { Flex, Grid } from "@atlaskit/primitives";

<Flex gap="space.200" justifyContent="space-between">
	<div>Left</div>
	<div>Right</div>
</Flex>;
```

---

## Inline Styles with Tokens

When primitives don't provide the props you need, use inline styles with `token()`:

```tsx
import { token } from "@atlaskit/tokens";

<div
	style={{
		padding: token("space.200"),
		borderRadius: token("radius.small"),
		boxShadow: token("elevation.shadow.raised"),
	}}
>
	Content
</div>;
```

---

## Interactive States

For interactive elements, use ADS components that handle states automatically:

```tsx
import Button from "@atlaskit/button/new";
import { Pressable } from "@atlaskit/primitives";

// Button handles hover/active/focus states
<Button appearance="primary">Click me</Button>

// Pressable for custom interactive elements
<Pressable onClick={handleClick}>
	Custom interactive content
</Pressable>
```

---

## Common Token Patterns

### Spacing

```tsx
padding: token("space.100");     // 8px
padding: token("space.200");     // 16px
margin: token("space.050");      // 4px
gap: token("space.150");         // 12px
```

### Colors

```tsx
color: token("color.text");                    // Primary text
color: token("color.text.subtle");             // Secondary text
backgroundColor: token("color.background.neutral");
borderColor: token("color.border");
```

### Elevation

```tsx
boxShadow: token("elevation.shadow.raised");
boxShadow: token("elevation.shadow.overlay");
backgroundColor: token("elevation.surface.raised");
```

### Border Radius

Use semantic `radius.*` tokens (NOT deprecated `border.radius.*`):

```tsx
borderRadius: token("radius.xsmall");   // 2px - badges, checkboxes
borderRadius: token("radius.small");    // 4px - labels, lozenges
borderRadius: token("radius.medium");   // 6px - buttons, inputs
borderRadius: token("radius.large");    // 8px - cards, containers
borderRadius: token("radius.xlarge");   // 12px - modals, tables
borderRadius: token("radius.xxlarge");  // 16px - video players
borderRadius: token("radius.full");     // circular - avatars, pills
```

---

## Summary

1. **Use `@atlaskit/primitives`** for layout (Box, Stack, Inline, Flex, Grid)
2. **Use primitive props** when available (`backgroundColor`, `space`, `padding`)
3. **Use `token()` from `@atlaskit/tokens`** for inline styles
4. **Use ADS components** (Button, Pressable) for interactive states
5. **Never hardcode** colors, spacing, or typography values
