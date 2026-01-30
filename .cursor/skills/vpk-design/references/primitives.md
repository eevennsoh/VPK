# Atlassian Design System (ADS) Primitives

## Overview

ADS Primitives are token-backed low-level building blocks for layouts and styling in the Atlassian
Design System. They provide a consistent way to compose layouts and apply design tokens.

These are available in two flavors:

1. `@atlaskit/primitives` – **PREFERRED** (simpler setup)
2. `@atlaskit/primitives/compiled` (built with Compiled) – requires complex Babel configuration

> **Note**: Use `@atlaskit/primitives` for simpler setup. The `/compiled` variant requires
> additional Babel configuration with `cssMap` for styling which adds complexity.

---

## Core Components

### Layout Primitives

- `Box`: Generic container that provides managed access to design tokens
- `Inline`: Horizontal layout component based on flexbox
- `Stack`: Vertical layout component based on flexbox
- `Flex`: CSS Flexbox API implementation
- `Grid`: CSS Grid API implementation
- `Bleed`: Controls negative whitespace

### Interactive Primitives

- `Pressable`: For building custom buttons
- `Anchor`: For building custom links

### Typography Primitives

- `Text`: For building text elements

### Styling

- `@atlaskit/tokens` package: Provides the `token()` function for accessing design tokens
- `xcss` prop: Primitives accept an `xcss` prop for bounded style overrides using token values

---

## Primitive Components Reference

### Box

A fundamental layout primitive that provides a base for building other components.

```tsx
import { Box } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";

<Box backgroundColor="color.background.accent.blue.subtlest">Content</Box>;

// A section with custom styling
<Box
	as="section"
	style={{
		padding: token("space.200"),
		border: `${token("border.width")} solid ${token("color.border")}`,
	}}
>
	Styled content
</Box>;
```

| Prop              | Type                                                 | Description                                                                       |
| ----------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| `as`              | DOM elements such as `'div'\|'h1'\|'span'\|…`        | The DOM element to render. Defaults to 'div'. SVG, 'button', 'a' are excluded.    |
| `children`        | `ReactNode`                                          | Elements to be rendered inside the Box                                            |
| `backgroundColor` | `elevation.surface*` and `color.background.*` tokens | Token representing background color with a built-in fallback value.               |
| `style`           | `CSSProperties`                                      | Inline styles (only use as last resort)                                           |
| `xcss`            | `StrictXCSSProp`                                     | Apply bounded styles powered by design tokens                                     |
| `ref`             | Ref                                                  | Forwarded ref                                                                     |
| `testId`          | string                                               | Test ID for automated testing                                                     |
| `role`            | string                                               | ARIA role attribute                                                               |

Note: Please use other more semantic primitives first if you can, eg. use `<Anchor>` for links,
`<Pressable>` for pressable items, or layout primitives such as `<Stack>` before creating a
`<Box xcss>`.

### Text

A primitive for rendering text with consistent typography styles.

```tsx
import { Text } from '@atlaskit/primitives';

<Text>Regular text</Text>
<Text weight="bold">Heading text</Text>
<Text color="color.text.accent.blue">
  Accent text
</Text>
```

| Prop       | Type                                              | Description                                                                                             |
| ---------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `as`       | 'span'\|'p'\|'strong'\|'em'                       | HTML tag to be rendered. Defaults to 'span'                                                             |
| `children` | `ReactNode`                                       | Elements rendered within the Text element                                                               |
| `color`    | `inherit`, `color.text*`, or `color.link*` tokens | Token representing text color. Applies inverse automatically in bold backgrounds.                       |
| `id`       | string                                            | The HTML id attribute                                                                                   |
| `maxLines` | number                                            | Number of lines to limit text to. Text truncated with ellipsis.                                         |
| `align`    | 'center'\|'end'\|'start'                          | Text alignment                                                                                          |
| `size`     | 'medium'\|'UNSAFE_small'\|'large'\|'small'        | Text size                                                                                               |
| `weight`   | 'bold'\|'medium'\|'regular'\|'semibold'           | The HTML font-weight attribute                                                                          |
| `xcss`     | `StrictXCSSProp`                                  | Apply bounded styles powered by design tokens                                                           |
| `ref`      | Ref                                               | Forwarded ref                                                                                           |
| `testId`   | string                                            | Test ID for automated testing                                                                           |

### Pressable

A primitive for creating interactive elements with consistent press states.

```tsx
import { Pressable } from '@atlaskit/primitives';

<Pressable onClick={() => console.log('Pressed!')}>
  Click me
</Pressable>
```

| Prop               | Type                                                      | Description                                    |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------- |
| `children`         | `ReactNode`                                               | Elements to be rendered inside the Pressable   |
| `onClick`          | (e: MouseEvent, analyticsEvent: UIAnalyticsEvent) => void | Handler called on click with analytics event   |
| `isDisabled`       | boolean                                                   | Whether the button is disabled                 |
| `interactionName`  | string                                                    | Optional name for React UFO press interactions |
| `componentName`    | string                                                    | Optional component name for analytics events   |
| `analyticsContext` | Record<string, any>                                       | Additional information for analytics events    |
| `ref`              | Ref                                                       | Forwarded ref                                  |
| `testId`           | string                                                    | Test ID for automated testing                  |

### Anchor

A primitive for creating accessible links.

```tsx
import { Anchor } from "@atlaskit/primitives";

<Anchor href="https://example.com">Visit example.com</Anchor>;
```

| Prop               | Type                                                      | Description                                    |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------- |
| `children`         | `ReactNode`                                               | Elements to be rendered inside the Anchor      |
| `onClick`          | (e: MouseEvent, analyticsEvent: UIAnalyticsEvent) => void | Handler called on click with analytics event   |
| `interactionName`  | string                                                    | Optional name for React UFO press interactions |
| `componentName`    | string                                                    | Optional component name for analytics events   |
| `analyticsContext` | Record<string, any>                                       | Additional information for analytics events    |
| `newWindowLabel`   | string                                                    | Override text for new window links             |
| `ref`              | Ref                                                       | Forwarded ref                                  |
| `testId`           | string                                                    | Test ID for automated testing                  |

---

## Layout Components

### Flex

A component for creating flexible layouts using CSS Flexbox.

```tsx
import { Flex } from "@atlaskit/primitives";

<Flex as="ul" wrap="wrap" gap="space.200" justifyContent="space-between" alignItems="center">
	<div>Left</div>
	<div>Right</div>
</Flex>;
```

| Prop             | Type                                                                                 | Description                                              |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| `as`             | 'div'\|'span'\|'ul'\|'ol'\|'li'\|'dl'                                                | The DOM element to render. Defaults to 'div'             |
| `justifyContent` | 'center'\|'end'\|'space-around'\|'space-between'\|'space-evenly'\|'start'\|'stretch' | Align children along the main axis                       |
| `alignItems`     | 'baseline'\|'center'\|'end'\|'start'\|'stretch'                                      | Align children along the cross axis                      |
| `columnGap`      | `space.*` tokens                                                                     | Space between columns                                    |
| `gap`            | `space.*` tokens                                                                     | Space between each child                                 |
| `rowGap`         | `space.*` tokens                                                                     | Space between rows                                       |
| `direction`      | 'column'\|'row'                                                                      | Flex direction property                                  |
| `wrap`           | 'nowrap'\|'wrap'                                                                     | Flex wrap property                                       |
| `children`       | `ReactNode`                                                                          | Elements to be rendered inside the Flex                  |
| `testId`         | string                                                                               | Test ID for automated testing                            |

### Stack

A component for creating basic vertical layouts with consistent spacing.

```tsx
import { Stack } from '@atlaskit/primitives';

// Vertical stack with consistent spacing
<Stack space="space.200">
  <div>First item</div>
  <div>Second item</div>
</Stack>

// Stack with alignment
<Stack
  space="space.200"
  alignBlock="center"
  alignInline="start"
>
  <div>Centered content</div>
  <div>More content</div>
</Stack>

// Stack with grow behavior
<Stack grow="fill" space="space.200">
  <div>First item</div>
  <div>Second item (fills remaining space)</div>
</Stack>
```

| Prop          | Type                                | Description                                               |
| ------------- | ----------------------------------- | --------------------------------------------------------- |
| `as`          | 'div'\|'span'\|'ul'\|'ol'\|'dl'     | The DOM element to render. Defaults to 'div'              |
| `alignBlock`  | 'center'\|'end'\|'start'\|'stretch' | Align children along the block axis (typically vertical)  |
| `alignInline` | 'center'\|'end'\|'start'\|'stretch' | Align children along the inline axis (typically horizontal)|
| `spread`      | 'space-between'                     | Distribute children along the main axis                   |
| `grow`        | 'hug'\|'fill'                       | Whether container grows to fill available space           |
| `space`       | `space.*` tokens                    | Space between each child                                  |
| `children`    | `ReactNode`                         | Elements to be rendered inside the Stack                  |
| `testId`      | string                              | Test ID for automated testing                             |

### Inline

A component for creating horizontal layouts with consistent spacing.

```tsx
import { Inline } from '@atlaskit/primitives';

// Basic inline layout with a separator
<Inline space="space.200" separator="•">
  <div>First item</div>
  <div>Second item</div>
</Inline>

// With alignment and wrapping
<Inline
  space="space.200"
  alignInline="center"
  shouldWrap={true}
  rowSpace="space.100"
>
  <div>First item</div>
  <div>Second item</div>
</Inline>
```

| Prop          | Type                                  | Description                                               |
| ------------- | ------------------------------------- | --------------------------------------------------------- |
| `as`          | 'div'\|'span'\|'ul'\|'ol'\|'li'\|'dl' | The DOM element to render. Defaults to 'div'              |
| `alignBlock`  | 'center'\|'end'\|'start'\|'stretch'   | Align children along the block axis                       |
| `alignInline` | 'center'\|'end'\|'start'\|'stretch'   | Align children along the inline axis                      |
| `shouldWrap`  | boolean                               | Whether children wrap or stay on one line                 |
| `spread`      | 'space-between'                       | Distribute children along the main axis                   |
| `grow`        | 'hug'\|'fill'                         | Whether container grows to fill available space           |
| `space`       | `space.*` tokens                      | Space between each child                                  |
| `rowSpace`    | `space.*` tokens                      | Space between rows when content wraps                     |
| `separator`   | string                                | Renders a separator string between each child             |
| `children`    | `ReactNode`                           | Elements to be rendered inside the Inline                 |
| `testId`      | string                                | Test ID for automated testing                             |

### Bleed

A utility for creating negative margin effects.

```tsx
import { Bleed } from "@atlaskit/primitives";

<Bleed inline="space.200" block="space.100">
	Content that bleeds on all sides
</Bleed>;
```

| Prop       | Type             | Description                              |
| ---------- | ---------------- | ---------------------------------------- |
| `children` | `ReactNode`      | Elements to be rendered inside the Bleed |
| `all`      | `space.*` tokens | Bleed along both axes                    |
| `inline`   | `space.*` tokens | Bleed along the inline axis              |
| `block`    | `space.*` tokens | Bleed along the block axis               |
| `testId`   | string           | Test ID for automated testing            |

### Grid

A component for creating grid-based layouts.

```tsx
import { Grid } from "@atlaskit/primitives";

// Basic grid
<Grid gap="space.200">
	<div>Grid item 1</div>
	<div>Grid item 2</div>
</Grid>;

// With template columns via style prop
<Grid
	gap="space.200"
	style={{
		gridTemplateColumns: "repeat(2, 1fr)",
	}}
>
	<div>Item 1</div>
	<div>Item 2</div>
</Grid>;
```

| Prop             | Type                                                                                 | Description                                              |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| `as`             | 'div'\|'span'\|'ul'\|'ol'                                                            | The DOM element to render. Defaults to 'div'             |
| `justifyContent` | 'center'\|'end'\|'space-around'\|'space-between'\|'space-evenly'\|'start'\|'stretch' | Align children along the inline axis                     |
| `justifyItems`   | 'center'\|'end'\|'start'\|'stretch'                                                  | Align the grid along the inline axis (deprecated)        |
| `alignItems`     | 'baseline'\|'center'\|'end'\|'start'\|'stretch'                                      | Align children along the block axis                      |
| `alignContent`   | 'center'\|'end'\|'space-around'\|'space-between'\|'space-evenly'\|'start'\|'stretch' | Align the grid along the block axis                      |
| `columnGap`      | `space.*` tokens                                                                     | Space between each column                                |
| `gap`            | `space.*` tokens                                                                     | Space between each child across both axes                |
| `rowGap`         | `space.*` tokens                                                                     | Space between each row                                   |
| `autoFlow`       | 'column dense'\|'column'\|'dense'\|'row dense'\|'row'                                | How auto-placed items get flowed into the grid           |
| `children`       | `ReactNode`                                                                          | Elements to be rendered inside the grid                  |
| `testId`         | string                                                                               | Test ID for automated testing                            |

### Show

A primitive for conditionally showing content at specific breakpoints.

```tsx
import { Show } from '@atlaskit/primitives';

// Show content above medium breakpoint
<Show above="md">
  <div>This content shows on medium screens and up</div>
</Show>

// Show content below medium breakpoint
<Show below="md">
  <div>This content shows on small screens and down</div>
</Show>
```

| Prop       | Type                           | Description                                       |
| ---------- | ------------------------------ | ------------------------------------------------- |
| `above`    | `'xs'\|'sm'\|'md'\|'lg'\|'xl'` | Shows content above the specified breakpoint      |
| `below`    | `'xs'\|'sm'\|'md'\|'lg'\|'xl'` | Shows content below the specified breakpoint      |
| `as`       | DOM elements                   | The DOM element to render. Defaults to 'div'      |
| `children` | `ReactNode`                    | Content to be conditionally shown                 |
| `xcss`     | `StrictXCSSProp`               | Apply bounded styles powered by design tokens     |
| `testId`   | string                         | Test ID for automated testing                     |

**Important**: Only one of `above` or `below` can be used at a time.

### Hide

A primitive for conditionally hiding content at specific breakpoints.

```tsx
import { Hide } from '@atlaskit/primitives';

<Hide above="md">
  <div>This content hides on medium screens and up</div>
</Hide>

<Hide below="md">
  <div>This content hides on small screens and down</div>
</Hide>
```

| Prop       | Type                           | Description                                       |
| ---------- | ------------------------------ | ------------------------------------------------- |
| `above`    | `'xs'\|'sm'\|'md'\|'lg'\|'xl'` | Hides content above the specified breakpoint      |
| `below`    | `'xs'\|'sm'\|'md'\|'lg'\|'xl'` | Hides content below the specified breakpoint      |
| `as`       | DOM elements                   | The DOM element to render. Defaults to 'div'      |
| `children` | `ReactNode`                    | Content to be conditionally hidden                |
| `xcss`     | `StrictXCSSProp`               | Apply bounded styles powered by design tokens     |
| `testId`   | string                         | Test ID for automated testing                     |

**Important**: Only one of `above` or `below` can be used at a time.

---

## Utilities

### StrictXCSSProp Type

A type utility that enforces strict typing for `xcss` styling props, ensuring only valid token values are used.

#### General CSS Properties

| CSS Property         | Example values                                                                     |
| -------------------- | ---------------------------------------------------------------------------------- |
| `backgroundColor`    | `'transparent'\|'var(--ds-background-neutral)'\|'var(--ds-background-brand-bold)'` |
| `border`             | `'none'\|'var(--ds-border-width) solid var(--ds-border)'`                          |
| `borderWidth`        | `'0'\|'var(--ds-border-width)'`                                                    |
| `borderColor`        | `'var(--ds-border)'\|'var(--ds-border-focused)'`                                   |
| `borderRadius`       | `'var(--ds-border-radius)'\|'var(--ds-border-radius-circle)'\|'inherit'`           |
| `boxShadow`          | `'var(--ds-shadow-raised)'\|'var(--ds-shadow-overlay)'\|'initial'`                 |
| `color`              | `'transparent'\|'var(--ds-text)'\|'var(--ds-text-brand)'`                          |
| `font`               | `'var(--ds-font-heading-large)'\|'var(--ds-font-body)'`                            |
| `fontFamily`         | `'var(--ds-font-family-heading)'\|'var(--ds-font-family-body)'`                    |
| `fontWeight`         | `'var(--ds-font-weight-regular)'\|'var(--ds-font-weight-bold)'`                    |
| `gap`                | `'var(--ds-space-100)'\|'var(--ds-space-200)' \| 0`                                |
| `height`             | `'auto'\|'min-content'\|'100px'\|'2rem'\|'50%'`                                    |
| `margin`             | `'var(--ds-space-100)'\|'auto'\|'0 auto' \| 0`                                     |
| `opacity`            | `'var(--ds-opacity-disabled)' \| 0 \| 1`                                           |
| `padding`            | `'var(--ds-space-100)'\|'var(--ds-space-200)' \| 0`                                |
| `width`              | `'auto'\|'min-content'\|'100px'\|'2rem'\|'50%'`                                    |
| `zIndex`             | `-1 \| 0 \| 100 \| 200 \| 300 \| 400 \| 500 \| 510 \| 600 \| 700 \| 800`           |

#### Pseudo-class Properties

When used in `&:hover { … }`:
| CSS Property | Example values |
|--------------|----------------|
| `backgroundColor` | `'var(--ds-background-neutral-hovered)'\|'var(--ds-background-brand-bold-hovered)'` |

When used in `&:active { … }`:
| CSS Property | Example values |
|--------------|----------------|
| `backgroundColor` | `'var(--ds-background-neutral-pressed)'\|'var(--ds-background-brand-bold-pressed)'` |
| `color` | `'var(--ds-link-pressed)'\|'var(--ds-link-visited-pressed)'` |

---

## Breakpoints and Media Queries

The Atlassian Design System provides predefined breakpoints for responsive design.

| Breakpoint        | Media Query                                            |
| ----------------- | ------------------------------------------------------ |
| `media.above.xxs` | `@media all`                                           |
| `media.above.xs`  | `@media (min-width: 30rem)`                            |
| `media.above.sm`  | `@media (min-width: 48rem)`                            |
| `media.above.md`  | `@media (min-width: 64rem)`                            |
| `media.above.lg`  | `@media (min-width: 90rem)`                            |
| `media.above.xl`  | `@media (min-width: 110.5rem)`                         |
| `media.only.xxs`  | `@media (min-width: 0rem) and (max-width: 29.99rem)`   |
| `media.only.xs`   | `@media (min-width: 30rem) and (max-width: 47.99rem)`  |
| `media.only.sm`   | `@media (min-width: 48rem) and (max-width: 63.99rem)`  |
| `media.only.md`   | `@media (min-width: 64rem) and (max-width: 89.99rem)`  |
| `media.only.lg`   | `@media (min-width: 90rem) and (max-width: 110.49rem)` |
| `media.only.xl`   | `@media (min-width: 110.5rem)`                         |
| `media.below.xs`  | `@media not all and (min-width: 30rem)`                |
| `media.below.sm`  | `@media not all and (min-width: 48rem)`                |
| `media.below.md`  | `@media not all and (min-width: 64rem)`                |
| `media.below.lg`  | `@media not all and (min-width: 90rem)`                |
| `media.below.xl`  | `@media not all and (min-width: 110.5rem)`             |

---

## Usage Examples

### Avatar Positioned Next to a Label

```tsx
import { Stack, Inline, Text } from "@atlaskit/primitives";

<Stack space="space.200">
	<Inline alignBlock="center" space="space.100">
		<Avatar />
		<Text>Label</Text>
	</Inline>
</Stack>;
```

### A Grid of Icons

```tsx
import { Box, Grid, Inline, Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";

export default (props: { icons: { icon: React.ReactNode; label: string }[] }) => (
	<Box
		style={{
			maxWidth: "1040px",
			margin: "0 auto",
			padding: token("space.600"),
		}}
	>
		<Grid
			gap="space.200"
			style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
		>
			{props.icons.map((icon) => (
				<Inline alignBlock="center" space="space.100">
					<icon.icon />
					<Text>{icon.label}</Text>
				</Inline>
			))}
		</Grid>
	</Box>
);
```

### Card Layout

```tsx
import Avatar from '@atlaskit/avatar';
import Heading from '@atlaskit/heading';
import { Box, Stack, Inline, Text } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';

<Box
  backgroundColor="elevation.surface.raised"
  style={{
    padding: token('space.200'),
    borderRadius: token('radius.small'),
  }}
>
  <Stack space="space.300">
    <Inline alignBlock="start" space="space.100">
      <Avatar />
      <Heading size="medium">Title</Heading>
    </Inline>
    <Text>Description</Text>
  </Stack>
</Box>
```

---

## Best Practices

1. Use `@atlaskit/primitives` for layout components
2. Use `token()` from `@atlaskit/tokens` for all style values
3. Leverage primitive props when available (`backgroundColor`, `space`, `gap`)
4. Use inline styles with `token()` when primitive props don't cover your needs
5. Replace direct CSS variable usage such as `var(--ds-text)` with their associated token call such
   as `token('color.text')`
6. Compose primitives and components together to create complex interfaces
7. Use the appropriate primitive for the layout pattern (`Stack` for vertical, `Inline` for
   horizontal)
8. Use direct token strings in Primitive props (e.g., `space="space.200"`), but use `token()`
   in style objects
9. Follow accessible and responsive design patterns
