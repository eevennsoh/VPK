# Atlassian UI Styling Standard

> A comprehensive set of ESLint rules and principles that enforce consistent styling practices
> across Atlassian's frontend codebases. These standards ensure maintainable, performant, and
> accessible UI code by promoting the use of design tokens, proper CSS-in-JS patterns, and modern
> styling approaches.

---

## Core Principles

### Good CSS-in-JS

Use `@atlaskit/css` for styling components, avoiding other CSS-in-JS libraries by default, but
falling back to `@compiled/react` when necessary.

`@atlaskit/css` is a typescript variant of `@compiled/react` that only allows specific values for
certain CSS properties, doesn't allow nested selectors, only allows specific media queries, etc., to
match the Atlassian Design System.

Always prefer `cssMap()` or `css()` calls over `styled.div` or `styled(Component)` APIs for
maintainability and performance overhead.

```tsx
/** @jsx jsx */
import { css, cssMap, jsx } from "@atlaskit/css";
import { token } from "@atlaskit/tokens";

const styles = css({
	padding: token("space.200"),
});

const appearanceStyles = cssMap({
	primary: { backgroundColor: token("color.background.brand") },
	bold: { backgroundColor: token("color.background.brand.bold") },
	danger: { backgroundColor: token("color.background.danger") },
});

type Appearance = "primary" | "bold" | "danger";
const Component = ({ appearance = "primary" }: { appearance: Appearance }) => (
	<div css={[styles, appearanceStyles[appearance]]} />
);
```

### Which Styling Props to Use

There are four main props that are relevant:

1. **`props.className`** – This is how styles are sent to the DOM, but this prop should almost never be
   used directly. If the component allows `props.className`, it allows `props.css`.
2. **`props.css`** — This is the prop that Compiled uses to inject styles. Under the hood, Compiled maps
   to `props.className`.
3. **`props.xcss`** — This is the prop that reusable components use to allow bounded style overrides,
   letting consumers tweak things like color or margin to predefined values. This prop can have
   other names, but must always end in `xcss`.
4. **`props.style`** – This is how styles are sent to the DOM. This prop should be used sparingly, only
   when working with purely dynamic values only known at runtime.

**Key rule:**
- With native components, only `props.css` should be used; `<div xcss={…}>` is never valid
- With custom or reusable components, typically `props.xcss` should be used, eg. `<Box xcss={…}>` or `<CustomTable xcss={…} headXcss={…}>`

### Design Token Usage

Always use design tokens instead of hardcoded values to ensure consistency and theme support.

```tsx
/** @jsx jsx */
import { cssMap, jsx } from '@atlaskit/css';
import { Box } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';

const styles = cssMap({
  root: {
    padding: token('space.200'),
    color: token('color.text.inverse')
  },
});

<Box xcss={styles.root} backgroundColor="color.background.brand">
```

### Component Styling

For components, if `props.xcss` is available, use that prop. For native elements, use `<div css>`
instead.

```tsx
const styles = cssMap({
  root: { padding: token('space.100') },
});

<Component xcss={styles.root} />
<div css={styles.root} />
```

---

## Key Rules

### No Styled Components

Do not use `styled-components` or `@emotion/*`, only use `@atlaskit/css` (preferred) or
`@compiled/react` for styling components.

### No Dynamic Styles

Prevents the use of dynamic styles in CSS-in-JS calls to ensure static analysis.

```tsx
/** @jsx jsx */
import { cssMap, jsx } from "@atlaskit/css";
import { token } from "@atlaskit/tokens";
import { fg } from "@atlaskit/platform-feature-flags";

const styles = cssMap({
	root: { backgroundColor: token("color.background.neutral") },
	active: { backgroundColor: token("color.background.brand.bold") },
	fgPlatformCompactComponent: { padding: token("space.050") },
});

const GoodExample = (props) => (
	<div css={[
		styles.root,
		props.isActive && styles.active,
		fg("platform-compact-component") && styles.fgPlatformCompactComponent
	]} />
);
```

### No Global Styles

Prevents global styles through CSS-in-JS or CSS module imports.

### No Nested Selectors

No usage of nested selectors within CSS styling, eg. `& > div` or `& span`

---

## When to Use `@atlaskit/css` vs. `@compiled/react`

Prefer `@atlaskit/css` at all times. This is a typescript bounded variant of `@compiled/react`,
though be aware if you need `keyframes`, it's only available in `@compiled/react` for now.

| Scenario | Solution |
|----------|----------|
| With Primitives such as `<Box xcss>` and `<Pressable xcss>` | Use `cssMap()` from `@atlaskit/css` |
| Primitives are too limiting | Use native `<div css>` with `@atlaskit/css`'s `css()` and `cssMap()` |
| Mix styles from both packages | `<div css={[atlaskitCssStyles, compiledStyles]}>` works |
| Both Primitives and `@atlaskit/css` are too limiting | Use `<div css>` with `@compiled/react` |

---

## Common Issues

### JSX Pragma

You require a JSX Pragma in scope. Using the classic runtime:

```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 * @jsxFrag jsx
 */
import { css, jsx } from "@atlaskit/css"; // or `@compiled/react`
```

### TypeScript Errors with `@atlaskit/css`

When working with `@atlaskit/css`, you will encounter TypeScript errors. **Do not ever `@ts-ignore` or `@ts-expect-error` these.**

Typical issues:

- If a CSS value is failing, that value is not allowed; you typically require a token value
- The prop interface for many elements is very strict
- If a nested selector is failing, it is not allowed

### TypeScript Errors with `props.style` and CSS Variables

When working with the style prop and CSS variables, you need to assert `React.CSSProperties`:

```tsx
<div style={{ "--local-width": props.width } as React.CSSProperties} />
```

---

## Summary

1. **Use `@atlaskit/css`** for all styling (preferred over `@compiled/react`)
2. **Always use design tokens** - never hardcode colors, spacing, or typography values
3. **Use `cssMap()` or `css()`** - avoid `styled.div` patterns
4. **Use `xcss` prop for components** - use `css` prop for native elements
5. **No dynamic styles** - use conditional class composition instead
6. **No nested selectors** - keep styles flat
7. **No global styles** - keep all styles scoped to components
