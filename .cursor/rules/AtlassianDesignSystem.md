---
description: Rules for using the Atlassian Design System
globs:
alwaysApply: false
----
# Atlassian Design System

> A comprehensive design system that provides a unified set of components, tokens, primitives, and
> tools for building consistent, accessible, and responsive user interfaces across Atlassian
> products.

## Atlassian Design System Tokens

Design tokens are the single source of truth to name and store design decisions, including colors,
typography, spacing, and other design primitives. Tokens come from the `@atlaskit/tokens` package,
typically meaning the `token()` function call. See: https://atlassian.design/components/tokens

**You must ONLY use tokens listed in this document, do not make up values.**

Example:

```tsx
import { css } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

const styles = css({
	backgroundColor: token('elevation.surface'),
	color: token('color.text'),
});
```

### Tokens list

Please note all values below are examples and may not match the current theme applied to your user.

#### Colors

##### Background Colors

Background colors define the base layer of components and surfaces:

| Token                                       | Light Value | Dark Value | Usage                                 |
| ------------------------------------------- | ----------- | ---------- | ------------------------------------- |
| `color.background.brand.bold`               | #0C66E4     | #1D7AFC    | Brand elements with emphasis          |
| `color.background.brand.bold.hovered`       | #0055CC     | #388BFF    | Hover state of brand.bold             |
| `color.background.brand.bold.pressed`       | #09326C     | #1D7AFC    | Pressed state of brand.bold           |
| `color.background.brand.boldest`            | #0C66E4     | #1D7AFC    | Brand elements that need to stand out |
| `color.background.brand.boldest.hovered`    | #0055CC     | #388BFF    | Hover state of brand.boldest          |
| `color.background.brand.boldest.pressed`    | #09326C     | #1D7AFC    | Pressed state of brand.boldest        |
| `color.background.brand.subtlest`           | #E9F2FF     | #0C66E4    | Brand elements with less emphasis     |
| `color.background.brand.subtlest.hovered`   | #CCE0FF     | #1D7AFC    | Hover state of brand.subtlest         |
| `color.background.brand.subtlest.pressed`   | #85B8FF     | #1D7AFC    | Pressed state of brand.subtlest       |
| `color.background.danger`                   | #FFEDEB     | #4F1C16    | Critical information backgrounds      |
| `color.background.danger.hovered`           | #FFD5D2     | #5D1F1A    | Hover state of danger                 |
| `color.background.danger.pressed`           | #FFC2BE     | #6D231B    | Pressed state of danger               |
| `color.background.danger.bold`              | #CA3521     | #FF9C8F    | Vibrant danger backgrounds            |
| `color.background.danger.bold.hovered`      | #AE2A19     | #FFB3A8    | Hover state of danger.bold            |
| `color.background.danger.bold.pressed`      | #601E16     | #FF9C8F    | Pressed state of danger.bold          |
| `color.background.discovery`                | #F3F0FF     | #2B2451    | Change/new feature backgrounds        |
| `color.background.discovery.hovered`        | #DFD8FD     | #352C63    | Hover state of discovery              |
| `color.background.discovery.pressed`        | #C0B6F2     | #3D3274    | Pressed state of discovery            |
| `color.background.discovery.bold`           | #5E4DB2     | #B8ACF6    | Vibrant discovery backgrounds         |
| `color.background.discovery.bold.hovered`   | #4C3B9C     | #C7BFFF    | Hover state of discovery.bold         |
| `color.background.discovery.bold.pressed`   | #352C63     | #B8ACF6    | Pressed state of discovery.bold       |
| `color.background.information`              | #E9F2FF     | #1C2B41    | Information/in-progress backgrounds   |
| `color.background.information.hovered`      | #CCE0FF     | #22324B    | Hover state of information            |
| `color.background.information.pressed`      | #85B8FF     | #2B3E5C    | Pressed state of information          |
| `color.background.information.bold`         | #0C66E4     | #85B8FF    | Vibrant information backgrounds       |
| `color.background.information.bold.hovered` | #0055CC     | #99C7FF    | Hover state of information.bold       |
| `color.background.information.bold.pressed` | #09326C     | #85B8FF    | Pressed state of information.bold     |
| `color.background.input`                    | #FFFFFF     | #1D2125    | Form element backgrounds              |
| `color.background.input.hovered`            | #F7F8F9     | #2C3338    | Hover state of input                  |
| `color.background.input.pressed`            | #F7F8F9     | #2C3338    | Pressed state of input                |
| `color.background.neutral`                  | #F7F8F9     | #2C3338    | Default neutral backgrounds           |
| `color.background.neutral.hovered`          | #F1F2F4     | #38414A    | Hover state of neutral                |
| `color.background.neutral.pressed`          | #F1F2F4     | #38414A    | Pressed state of neutral              |
| `color.background.neutral.subtle`           | #FFFFFF     | #1D2125    | Subtle neutral backgrounds            |
| `color.background.neutral.subtle.hovered`   | #F7F8F9     | #2C3338    | Hover state of neutral.subtle         |
| `color.background.neutral.subtle.pressed`   | #F7F8F9     | #2C3338    | Pressed state of neutral.subtle       |
| `color.background.neutral.bold`             | #091E420F   | #A1BDD914  | Vibrant neutral backgrounds           |
| `color.background.neutral.bold.hovered`     | #091E4224   | #A1BDD924  | Hover state of neutral.bold           |
| `color.background.neutral.bold.pressed`     | #091E4236   | #A1BDD936  | Pressed state of neutral.bold         |
| `color.background.selected`                 | #E9F2FF     | #092957    | Selected element backgrounds          |
| `color.background.selected.hovered`         | #CCE0FF     | #0C3B85    | Hover state of selected               |
| `color.background.selected.pressed`         | #85B8FF     | #0C3B85    | Pressed state of selected             |
| `color.background.selected.bold`            | #0C66E4     | #388BFF    | Vibrant selected backgrounds          |
| `color.background.selected.bold.hovered`    | #0055CC     | #579DFF    | Hover state of selected.bold          |
| `color.background.selected.bold.pressed`    | #09326C     | #388BFF    | Pressed state of selected.bold        |
| `color.background.success`                  | #DFFCF0     | #164B35    | Success message backgrounds           |
| `color.background.success.hovered`          | #BAF3DB     | #1C5339    | Hover state of success                |
| `color.background.success.pressed`          | #7EE2B8     | #216E4E    | Pressed state of success              |
| `color.background.success.bold`             | #1F845A     | #4BCE97    | Vibrant success backgrounds           |
| `color.background.success.bold.hovered`     | #216E4E     | #6BE6B8    | Hover state of success.bold           |
| `color.background.success.bold.pressed`     | #164B35     | #4BCE97    | Pressed state of success.bold         |
| `color.background.warning`                  | #FFF7D6     | #533F04    | Warning message backgrounds           |
| `color.background.warning.hovered`          | #F8E6A0     | #624F0A    | Hover state of warning                |
| `color.background.warning.pressed`          | #F5CD47     | #7F5F01    | Pressed state of warning              |
| `color.background.warning.bold`             | #B38600     | #E2B203    | Vibrant warning backgrounds           |
| `color.background.warning.bold.hovered`     | #946F00     | #F5CD47    | Hover state of warning.bold           |
| `color.background.warning.bold.pressed`     | #533F04     | #E2B203    | Pressed state of warning.bold         |

##### Text Colors

Text colors ensure readability and hierarchy in content:

| Token                        | Light Value | Dark Value | Usage                            |
| ---------------------------- | ----------- | ---------- | -------------------------------- |
| `color.text`                 | #172B4D     | #C7D1DB    | Primary text                     |
| `color.text.subtle`          | #44546F     | #9FADBC    | Secondary text                   |
| `color.text.subtlest`        | #626F86     | #738496    | Tertiary text                    |
| `color.text.disabled`        | #091E424F   | #7384964F  | Disabled text                    |
| `color.text.inverse`         | #FFFFFF     | #1D2125    | Text on bold backgrounds         |
| `color.text.selected`        | #0C66E4     | #85B8FF    | Selected text                    |
| `color.text.brand`           | #0C66E4     | #85B8FF    | Brand text                       |
| `color.text.danger`          | #CA3521     | #FF9C8F    | Critical text                    |
| `color.text.warning`         | #B38600     | #E2B203    | Warning text                     |
| `color.text.warning.inverse` | #172B4D     | #C7D1DB    | Warning text on bold backgrounds |
| `color.text.success`         | #1F845A     | #4BCE97    | Success text                     |
| `color.text.discovery`       | #5E4DB2     | #B8ACF6    | Discovery text                   |
| `color.text.information`     | #0C66E4     | #85B8FF    | Information text                 |

##### Icon Colors

Icon colors maintain visual consistency with text colors:

| Token                        | Light Value | Dark Value | Usage                             |
| ---------------------------- | ----------- | ---------- | --------------------------------- |
| `color.icon`                 | #44546F     | #9FADBC    | Default icons                     |
| `color.icon.subtle`          | #626F86     | #738496    | Subtle icons                      |
| `color.icon.subtlest`        | #626F86     | #738496    | Most subtle icons                 |
| `color.icon.inverse`         | #FFFFFF     | #1D2125    | Icons on bold backgrounds         |
| `color.icon.disabled`        | #091E424F   | #7384964F  | Disabled icons                    |
| `color.icon.selected`        | #0C66E4     | #85B8FF    | Selected icons                    |
| `color.icon.brand`           | #0C66E4     | #85B8FF    | Brand icons                       |
| `color.icon.danger`          | #CA3521     | #FF9C8F    | Critical icons                    |
| `color.icon.warning`         | #B38600     | #E2B203    | Warning icons                     |
| `color.icon.warning.inverse` | #172B4D     | #C7D1DB    | Warning icons on bold backgrounds |
| `color.icon.success`         | #1F845A     | #4BCE97    | Success icons                     |
| `color.icon.discovery`       | #5E4DB2     | #B8ACF6    | Discovery icons                   |
| `color.icon.information`     | #0C66E4     | #85B8FF    | Information icons                 |

##### Border Colors

Border colors define component boundaries and states:

| Token                      | Light Value | Dark Value | Usage                       |
| -------------------------- | ----------- | ---------- | --------------------------- |
| `color.border`             | #091E4224   | #A1BDD914  | Default borders             |
| `color.border.bold`        | #091E4240   | #A1BDD940  | Bold borders                |
| `color.border.brand`       | #0C66E4     | #85B8FF    | Brand borders               |
| `color.border.danger`      | #CA3521     | #FF9C8F    | Critical borders            |
| `color.border.disabled`    | #091E420F   | #A1BDD908  | Disabled borders            |
| `color.border.discovery`   | #5E4DB2     | #B8ACF6    | Discovery borders           |
| `color.border.focused`     | #0C66E4     | #85B8FF    | Focused borders             |
| `color.border.information` | #0C66E4     | #85B8FF    | Information borders         |
| `color.border.input`       | #091E4224   | #A1BDD914  | Input borders               |
| `color.border.inverse`     | #FFFFFF     | #1D2125    | Borders on bold backgrounds |
| `color.border.selected`    | #0C66E4     | #85B8FF    | Selected borders            |
| `color.border.success`     | #1F845A     | #4BCE97    | Success borders             |
| `color.border.warning`     | #B38600     | #E2B203    | Warning borders             |

#### Typography

**Prefer using `<Text>` primitive or `<Heading>` component for semantic typography.**

##### Composite Font Tokens

Composite font tokens set size, weight, line-height, and family in one declaration. Use with the
`font` CSS property:

```tsx
// Base patterns
<div style={{ font: token('font.body') }}>Default text</div>
<div style={{ font: token('font.body.small') }}>Small text</div>
<h2 style={{ font: token('font.heading.large') }}>Heading</h2>

// Override weight for emphasis
<div style={{
	font: token('font.body'),
	fontWeight: token('font.weight.semibold')
}}>
	Emphasized text
</div>
```

**Available tokens:**

| Token                  | Size | Weight | Line Height | Usage                   |
| ---------------------- | ---- | ------ | ----------- | ----------------------- |
| `font.heading.xxlarge` | 35px | 500    | 40px        | Brand promotions        |
| `font.heading.xlarge`  | 29px | 500    | 32px        | Brand promotions        |
| `font.heading.large`   | 24px | 500    | 28px        | Page titles             |
| `font.heading.medium`  | 20px | 500    | 24px        | Component headers       |
| `font.heading.small`   | 16px | 600    | 20px        | Small component headers |
| `font.heading.xsmall`  | 14px | 600    | 16px        | Small component headers |
| `font.heading.xxsmall` | 12px | 600    | 16px        | Fine print headers      |
| `font.body.large`      | 16px | 400    | 24px        | Long-form text          |
| `font.body`            | 14px | 400    | 20px        | Default text            |
| `font.body.small`      | 12px | 400    | 16px        | Secondary content       |
| `font.code`            | 14px | 400    | 20px        | Code representation     |

##### Font Weight Tokens

Override composite token weights for emphasis:

| Token                  | Value | Usage           |
| ---------------------- | ----- | --------------- |
| `font.weight.regular`  | 400   | Default text    |
| `font.weight.medium`   | 500   | Text with icons |
| `font.weight.semibold` | 600   | Emphasized text |
| `font.weight.bold`     | 700   | Strong emphasis |

##### Font Family Tokens

| Token                       | Usage           |
| --------------------------- | --------------- |
| `font.family.body`          | UI body text    |
| `font.family.heading`       | UI headings     |
| `font.family.code`          | Code text       |
| `font.family.brand.body`    | Brand body text |
| `font.family.brand.heading` | Brand headings  |

#### Spacing

Spacing tokens maintain consistent spacing. Base is `space.100`

| Token        | Value (px) | Value (rem) | Usage         |
| ------------ | ---------- | ----------- | ------------- |
| `space.0`    | 0px        | 0rem        | Reset spacing |
| `space.025`  | 2px        | 0.125rem    | Compact UI    |
| `space.050`  | 4px        | 0.25rem     | Compact UI    |
| `space.075`  | 6px        | 0.375rem    | Compact UI    |
| `space.100`  | 8px        | 0.5rem      | Compact UI    |
| `space.150`  | 12px       | 0.75rem     | Less dense UI |
| `space.200`  | 16px       | 1rem        | Less dense UI |
| `space.250`  | 20px       | 1.25rem     | Less dense UI |
| `space.300`  | 24px       | 1.5rem      | Less dense UI |
| `space.400`  | 32px       | 2rem        | Large UI      |
| `space.500`  | 40px       | 2.5rem      | Large UI      |
| `space.600`  | 48px       | 3rem        | Large UI      |
| `space.800`  | 64px       | 4rem        | Largest UI    |
| `space.1000` | 80px       | 5rem        | Largest UI    |

##### Negative Spacing

Negative spacing tokens negate parent whitespace:

| Token                | Value (px) | Value (rem) | Usage           |
| -------------------- | ---------- | ----------- | --------------- |
| `space.negative.025` | -2px       | -0.125rem   | Small overlap   |
| `space.negative.050` | -4px       | -0.25rem    | Small overlap   |
| `space.negative.075` | -6px       | -0.375rem   | Small overlap   |
| `space.negative.100` | -8px       | -0.5rem     | Small overlap   |
| `space.negative.150` | -12px      | -0.75rem    | Large overlap   |
| `space.negative.200` | -16px      | -1rem       | Large overlap   |
| `space.negative.250` | -20px      | -1.25rem    | Large overlap   |
| `space.negative.300` | -24px      | -1.5rem     | Large overlap   |
| `space.negative.400` | -32px      | -2rem       | Largest overlap |

#### Border Radius

Border radius tokens define corner curvature using T-shirt sizing.

| Token           | Value (px) | Value (rem) | Usage                |
| --------------- | ---------- | ----------- | -------------------- |
| `radius.xsmall` | 2px        | 0.125rem    | Selection indicators |
| `radius.small`  | 4px        | 0.25rem     | Buttons/inputs       |
| `radius.medium` | 6px        | 0.375rem    | Small cards          |
| `radius.large`  | 8px        | 0.5rem      | Cards/containers     |
| `radius.xlarge` | 12px       | 0.75rem     | Modals               |
| `radius.xxlarge`| 16px       | 1rem        | Video players        |
| `radius.full`   | 624.9375rem| 624.9375rem | Circular elements (perfect circles) |
| `radius.tile`   | 25%        | 25%         | Tile corners         |

**Note:** The old `border.radius.*` tokens are deprecated. Use the new `radius.*` tokens instead.

#### Border Width

Border width tokens define border thickness, often used with `color.border` tokens. Base is
`border.width`

```tsx
const styles = css({
	border: `${token('border.width')} solid ${token('color.border')}`,
});
```

| Token                    | Value (px) | Value (rem) | Usage                |
| ------------------------ | ---------- | ----------- | -------------------- |
| `border.width`           | 1px        | 0.0625rem   | Default width        |
| `border.width.0`         | 0px        | 0rem        | No border            |
| `border.width.indicator` | 3px        | 0.1875rem   | Selection indicators |
| `border.width.outline`   | 2px        | 0.125rem    | Focus/active states  |

#### Elevation

##### Surface Elevation

Surface elevation tokens define background layers:

| Token                               | Light Value | Dark Value | Usage                 |
| ----------------------------------- | ----------- | ---------- | --------------------- |
| `elevation.surface`                 | #FFFFFF     | #1D2125    | Primary background    |
| `elevation.surface.hovered`         | #F7F8F9     | #2C3338    | Hover state           |
| `elevation.surface.pressed`         | #F7F8F9     | #2C3338    | Pressed state         |
| `elevation.surface.overlay`         | #FFFFFF     | #1D2125    | Overlay elements      |
| `elevation.surface.overlay.hovered` | #F7F8F9     | #2C3338    | Overlay hover state   |
| `elevation.surface.overlay.pressed` | #F7F8F9     | #2C3338    | Overlay pressed state |
| `elevation.surface.raised`          | #FFFFFF     | #1D2125    | Movable elements      |
| `elevation.surface.raised.hovered`  | #F7F8F9     | #2C3338    | Raised hover state    |
| `elevation.surface.raised.pressed`  | #F7F8F9     | #2C3338    | Raised pressed state  |
| `elevation.surface.sunken`          | #F7F8F9     | #2C3338    | Grouped elements      |

##### Shadow Elevation

Shadow elevation tokens define shadow styles:

| Token                                 | Usage             |
| ------------------------------------- | ----------------- |
| `elevation.shadow.overflow`           | Scrolling content |
| `elevation.shadow.overflow.perimeter` | Overflow fallback |
| `elevation.shadow.overflow.spread`    | Overflow fallback |
| `elevation.shadow.overlay`            | Overlay elements  |
| `elevation.shadow.raised`             | Raised elements   |

#### Interaction States

Interaction states define element responses:

| Token                               | Light Value | Dark Value | Usage                   |
| ----------------------------------- | ----------- | ---------- | ----------------------- |
| `color.interaction.hovered`         | #091E4208   | #A1BDD908  | Hover overlay           |
| `color.interaction.pressed`         | #091E4214   | #A1BDD914  | Pressed overlay         |
| `color.interaction.inverse.hovered` | #FFFFFF14   | #FFFFFF14  | Inverse hover overlay   |
| `color.interaction.inverse.pressed` | #FFFFFF29   | #FFFFFF29  | Inverse pressed overlay |

#### Skeleton States

Skeleton states are for loading:

| Token                   | Light Value | Dark Value | Usage          |
| ----------------------- | ----------- | ---------- | -------------- |
| `color.skeleton`        | #091E4208   | #A1BDD908  | Loading state  |
| `color.skeleton.subtle` | #091E4204   | #A1BDD904  | Loading effect |

#### Opacity

Opacity tokens control transparency:

| Token              | Light Value | Dark Value | Usage          |
| ------------------ | ----------- | ---------- | -------------- |
| `opacity.disabled` | 0.4         | 0.4        | Disabled state |
| `opacity.loading`  | 0.4         | 0.4        | Loading state  |

### More Guidance

#### Token Pairing

You should match foreground and background color, eg. for dark background colors, we have a
`token)'color.text.inverse')` to better achieve contrast ratios.

```tsx
import { css } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

const styles = css({
	backgroundColor: token('color.background.brand.bold'),
	color: token('color.text.inverse'),
});
```

#### Semantic Tokens

Always prefer the semantically correct token name, even if the color doesn't match exactly.

#### Dark Mode Support

Never use hardcoded color values as they will break dark mode support.

#### Interactive States

Always provide clear visual feedback for interactive elements:

```tsx
import { cssMap } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

const styles = cssMap({
	button: {
		backgroundColor: token('color.background.brand.bold'),
		color: token('color.text.inverse'),
		'&:hover': {
			backgroundColor: token('color.background.brand.bold.hovered'),
		},
		'&:focus': {
			outline: `2px solid ${token('color.border.focused')}`,
			outlineOffset: '2px',
		},
		'&:active': {
			backgroundColor: token('color.background.brand.bold.pressed'),
		},
		'&:disabled': {
			backgroundColor: token('color.background.disabled'),
			color: token('color.text.disabled'),
		},
	},
});
```

#### Focus Management

Ensure proper focus indicators for keyboard navigation:

```tsx
import { cssMap } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

const styles = cssMap({
	focusable: {
		'&:focus-visible': {
			outline: `2px solid ${token('color.border.focused')}`,
			outlineOffset: '2px',
		},
		'&:focus:not(:focus-visible)': {
			outline: 'none',
		},
	},
});
```

## Atlassian Design System Components

> A comprehensive collection of React components that follow Atlassian's design system principles.
> These components are built on top of design tokens and primitives to ensure consistent,
> accessible, and responsive user interfaces across Atlassian products.

### Forms and Input

#### Button

**Import from `@atlaskit/button/new`** (the root entrypoint is deprecated).

```tsx
import Button from '@atlaskit/button/new';
import { IconButton } from '@atlaskit/button/new';

<Button appearance="primary" iconBefore={AddIcon}>Create</Button>
<IconButton icon={EditIcon} label="Edit" appearance="subtle" />
```

**Key props:**

| Prop                 | Type                                                                       | Description                   |
| -------------------- | -------------------------------------------------------------------------- | ----------------------------- |
| `appearance`         | 'default' \| 'danger' \| 'primary' \| 'subtle' \| 'warning' \| 'discovery' | Visual style                  |
| `iconBefore`         | IconProp                                                                   | Icon before text              |
| `iconAfter`          | IconProp                                                                   | Icon after text               |
| `isLoading`          | boolean                                                                    | Loading state                 |
| `isDisabled`         | boolean                                                                    | Disabled state                |
| `shouldFitContainer` | boolean                                                                    | Fit width to parent           |
| `onClick`            | (e: MouseEvent, analyticsEvent: UIAnalyticsEvent) => void                  | Click handler                 |
| `href`               | string                                                                     | URL for link button           |
| `testId`             | string                                                                     | Test ID for automated tests   |

[Documentation](https://atlassian.design/components/button)

**Related:** `IconButton`, `LinkButton`, `SplitButton`, `ButtonGroup` also available from
`@atlaskit/button/new`

#### Checkbox

A checkbox input component with label support.

```tsx
import Checkbox from '@atlaskit/checkbox';

<Checkbox label="Accept terms" value="accept" onChange={(e) => console.log(e.target.checked)} />;
```

| Prop               | Type                                                       | Description                                                               |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| `label`            | ReactNode                                                  | Checkbox label                                                            |
| `value`            | string \| number                                           | Input value                                                               |
| `isChecked`        | boolean                                                    | Controlled checked state                                                  |
| `isDisabled`       | boolean                                                    | Disabled state                                                            |
| `isIndeterminate`  | boolean                                                    | Indeterminate state                                                       |
| `isInvalid`        | boolean                                                    | Invalid state                                                             |
| `isRequired`       | boolean                                                    | Required state                                                            |
| `defaultChecked`   | boolean                                                    | Initial checked state                                                     |
| `name`             | string                                                     | Input name                                                                |
| `id`               | string                                                     | Input ID                                                                  |
| `onChange`         | (e: ChangeEvent, analyticsEvent: UIAnalyticsEvent) => void | Change handler                                                            |
| `testId`           | string                                                     | Test ID for automated tests                                               |
| `analyticsContext` | Record<string, any>                                        | Analytics context                                                         |
| `xcss`             | StrictXCSSProp                                             | AllowsBounded style overrides allowing changes to the `alignItems` style. |

[Documentation](https://atlassian.design/components/checkbox)

#### Radio

A radio input component that allows users to select one option from a list.

```tsx
import { Radio } from '@atlaskit/radio';

<Radio label="Option 1" value="1" isChecked={true} onChange={(e) => console.log(e.target.value)} />;
```

| Prop               | Type                                                                         | Description                  |
| ------------------ | ---------------------------------------------------------------------------- | ---------------------------- |
| `label`            | ReactNode                                                                    | Radio label                  |
| `value`            | string                                                                       | Input value                  |
| `isChecked`        | boolean                                                                      | Controlled checked state     |
| `isDisabled`       | boolean                                                                      | Disabled state               |
| `isRequired`       | boolean                                                                      | Required state               |
| `isInvalid`        | boolean                                                                      | Invalid state                |
| `name`             | string                                                                       | Input name                   |
| `ariaLabel`        | string                                                                       | Aria label for accessibility |
| `onChange`         | (e: ChangeEvent<HTMLInputElement>, analyticsEvent: UIAnalyticsEvent) => void | Change handler               |
| `onBlur`           | FocusEventHandler<HTMLInputElement>                                          | Blur handler                 |
| `onFocus`          | FocusEventHandler<HTMLInputElement>                                          | Focus handler                |
| `onMouseDown`      | MouseEventHandler                                                            | Mouse down handler           |
| `onMouseUp`        | MouseEventHandler                                                            | Mouse up handler             |
| `onMouseEnter`     | MouseEventHandler                                                            | Mouse enter handler          |
| `onMouseLeave`     | MouseEventHandler                                                            | Mouse leave handler          |
| `onInvalid`        | (e: SyntheticEvent<any>) => void                                             | Invalid handler              |
| `testId`           | string                                                                       | Test ID for automated tests  |
| `analyticsContext` | Record<string, any>                                                          | Analytics context            |

[Documentation](https://atlassian.design/components/radio)

#### Select

A dropdown select component with search and multi-select support.

```tsx
import Select from '@atlaskit/select';

<Select
	options={[
		{ label: 'Option 1', value: '1' },
		{ label: 'Option 2', value: '2' },
	]}
	onChange={(option) => console.log(option)}
/>;
```

| Prop                | Type                                                                      | Description                  |
| ------------------- | ------------------------------------------------------------------------- | ---------------------------- |
| `options`           | Array<{ label: string, value: string \| number }>                         | Array of options             |
| `value`             | { label: string, value: string \| number }                                | Selected value               |
| `defaultValue`      | { label: string, value: string \| number }                                | Initial selected value       |
| `isMulti`           | boolean                                                                   | Enable multi-select          |
| `isSearchable`      | boolean                                                                   | Enable search                |
| `isDisabled`        | boolean                                                                   | Disabled state               |
| `isInvalid`         | boolean                                                                   | Invalid state                |
| `isRequired`        | boolean                                                                   | Required state               |
| `placeholder`       | string                                                                    | Placeholder text             |
| `appearance`        | 'default' \| 'subtle' \| 'none'                                           | Visual style                 |
| `spacing`           | 'compact' \| 'default'                                                    | Spacing around the select    |
| `onChange`          | (option: { label: string, value: string \| number }) => void              | Change handler               |
| `onInputChange`     | (inputValue: string, actionMeta: { action: string }) => void              | Input change handler         |
| `onMenuOpen`        | () => void                                                                | Menu open handler            |
| `onMenuClose`       | () => void                                                                | Menu close handler           |
| `onFocus`           | (event: FocusEvent) => void                                               | Focus handler                |
| `onBlur`            | (event: FocusEvent) => void                                               | Blur handler                 |
| `formatOptionLabel` | (data: Option, formatOptionLabelMeta: FormatOptionLabelMeta) => ReactNode | Custom option label renderer |
| `noOptionsMessage`  | (obj: { inputValue: string }) => ReactNode                                | Custom no options message    |
| `testId`            | string                                                                    | Test ID for automated tests  |
| `analyticsContext`  | Record<string, any>                                                       | Analytics context            |

[Documentation](https://atlassian.design/components/select)

#### Calendar (Beta)

A calendar component for date selection and display. This component is in Beta phase, meaning it's
stable at version 1.0+ but may receive improvements based on customer feedback. Breaking changes
will only be made in major releases.

```tsx
import Calendar from '@atlaskit/calendar';

// Single date selection
<Calendar
  selected={[new Date()]}
  onChange={(date) => console.log(date)}
/>

// Multiple date selection
<Calendar
  selected={['2024-03-20', '2024-03-21']}
  onChange={(dates) => console.log(dates)}
/>
```

| Prop                        | Type                                                           | Description                                                                                              |
| --------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `selected`                  | string[]                                                       | Currently selected date(s). Can be a single Date object or an array of date strings in YYYY-MM-DD format |
| `onChange`                  | (date: string[]) => void                                       | Handler for date selection changes                                                                       |
| `disabled`                  | string[]                                                       | Array of disabled dates (YYYY-MM-DD)                                                                     |
| `minDate`                   | string                                                         | Minimum selectable date (YYYY-MM-DD)                                                                     |
| `maxDate`                   | string                                                         | Maximum selectable date (YYYY-MM-DD)                                                                     |
| `day`                       | number                                                         | Currently focused day (0 for no focus)                                                                   |
| `defaultDay`                | number                                                         | Default focused day                                                                                      |
| `defaultMonth`              | number                                                         | Default month (1-12)                                                                                     |
| `defaultYear`               | number                                                         | Default year                                                                                             |
| `defaultSelected`           | string[]                                                       | Default selected dates (YYYY-MM-DD)                                                                      |
| `defaultPreviouslySelected` | string[]                                                       | Default previously selected dates                                                                        |
| `disabledDateFilter`        | (date: string) => boolean                                      | Function to filter disabled dates                                                                        |
| `month`                     | number                                                         | Current month (1-12)                                                                                     |
| `nextMonthLabel`            | string                                                         | Aria label for next month button                                                                         |
| `onBlur`                    | FocusEventHandler                                              | Blur handler                                                                                             |
| `onFocus`                   | FocusEventHandler                                              | Focus handler                                                                                            |
| `onSelect`                  | (event: SelectEvent, analyticsEvent: UIAnalyticsEvent) => void | Selection handler                                                                                        |
| `previouslySelected`        | string[]                                                       | Previously selected dates                                                                                |
| `previousMonthLabel`        | string                                                         | Aria label for previous month button                                                                     |
| `style`                     | CSSProperties                                                  | Custom styles                                                                                            |
| `tabIndex`                  | -1 \| 0                                                        | Tab index                                                                                                |
| `testId`                    | string                                                         | Test ID for automated tests                                                                              |
| `today`                     | string                                                         | Today's date (YYYY-MM-DD)                                                                                |
| `weekStartDay`              | 0-6                                                            | First day of week (0=Sunday)                                                                             |
| `year`                      | number                                                         | Current year                                                                                             |
| `locale`                    | string                                                         | Locale for date formatting                                                                               |

[Documentation](https://atlassian.design/components/calendar)

#### Comment

A component for displaying and managing comments.

```tsx
import { Comment } from '@atlaskit/comment';

<Comment author="John Doe" avatar={<Avatar />} content="Comment content" time="2 hours ago" />;
```

| Prop      | Type        | Description     |
| --------- | ----------- | --------------- |
| `author`  | string      | Author name     |
| `avatar`  | ReactNode   | Author avatar   |
| `content` | ReactNode   | Comment content |
| `time`    | string      | Time of comment |
| `actions` | ReactNode[] | Action buttons  |

[Documentation](https://atlassian.design/components/comment)

#### Date Time Picker

A component for selecting both date and time.

```tsx
import { DateTimePicker } from '@atlaskit/datetime-picker';

<DateTimePicker value={new Date()} onChange={(date) => console.log(date)} />;
```

| Prop         | Type                 | Description            |
| ------------ | -------------------- | ---------------------- |
| `value`      | Date                 | Selected date and time |
| `onChange`   | (date: Date) => void | Change handler         |
| `isDisabled` | boolean              | Disabled state         |
| `timeFormat` | '12' \| '24'         | Time format            |

[Documentation](https://atlassian.design/components/date-time-picker)

#### Focus Ring

A utility component for managing focus styles.

```tsx
import FocusRing from '@atlaskit/focus-ring';

<FocusRing>
	<button>Focusable element</button>
</FocusRing>;
```

| Prop      | Type                  | Description      |
| --------- | --------------------- | ---------------- |
| `isInset` | boolean               | Inset focus ring |
| `focus`   | 'mouse' \| 'keyboard' | Focus style type |

[Documentation](https://atlassian.design/components/focus-ring)

#### Form

```tsx
import Form, { Field } from '@atlaskit/form';

<Form onSubmit={(data) => console.log(data)}>
	{({ formProps }) => <form {...formProps}><Field name="email" /></form>}
</Form>;
```

[Documentation](https://atlassian.design/components/form)

#### Range

A slider component for selecting a range of values.

```tsx
import Range from '@atlaskit/range';

<Range min={0} max={100} value={50} onChange={(value) => console.log(value)} />;
```

| Prop       | Type                    | Description    |
| ---------- | ----------------------- | -------------- |
| `min`      | number                  | Minimum value  |
| `max`      | number                  | Maximum value  |
| `value`    | number                  | Current value  |
| `onChange` | (value: number) => void | Change handler |
| `step`     | number                  | Step increment |

[Documentation](https://atlassian.design/components/range)

#### Text Area

A multi-line text input component.

```tsx
import TextArea from '@atlaskit/textarea';

<TextArea value="Text content" onChange={(e) => console.log(e.target.value)} />;
```

| Prop         | Type                     | Description    |
| ------------ | ------------------------ | -------------- |
| `value`      | string                   | Text content   |
| `onChange`   | (e: ChangeEvent) => void | Change handler |
| `isDisabled` | boolean                  | Disabled state |
| `isRequired` | boolean                  | Required field |
| `maxLength`  | number                   | Maximum length |

[Documentation](https://atlassian.design/components/text-area)

#### Text Field

A single-line text input component.

```tsx
import TextField from '@atlaskit/textfield';

<TextField value="Text content" onChange={(e) => console.log(e.target.value)} />;
```

| Prop         | Type                     | Description    |
| ------------ | ------------------------ | -------------- |
| `value`      | string                   | Text content   |
| `onChange`   | (e: ChangeEvent) => void | Change handler |
| `isDisabled` | boolean                  | Disabled state |
| `isRequired` | boolean                  | Required field |
| `type`       | string                   | Input type     |

[Documentation](https://atlassian.design/components/text-field)

#### Toggle

A switch component for boolean values.

```tsx
import Toggle from '@atlaskit/toggle';

<Toggle isChecked={true} onChange={(e) => console.log(e.target.checked)} />;
```

| Prop         | Type                     | Description    |
| ------------ | ------------------------ | -------------- |
| `isChecked`  | boolean                  | Toggle state   |
| `onChange`   | (e: ChangeEvent) => void | Change handler |
| `isDisabled` | boolean                  | Disabled state |
| `size`       | 'regular' \| 'large'     | Toggle size    |

[Documentation](https://atlassian.design/components/toggle)

### Images and Icons

#### Avatar

A component for displaying user avatars with support for images, initials, and status indicators.

```tsx
import Avatar from '@atlaskit/avatar';

<Avatar src="https://example.com/avatar.jpg" status="online" size="large" />;
```

| Prop               | Type                                                                | Description                   |
| ------------------ | ------------------------------------------------------------------- | ----------------------------- |
| `appearance`       | 'circle' \| 'square'                                                | Shape of the avatar           |
| `size`             | 'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge' \| 'xxlarge' | Size of the avatar            |
| `src`              | string                                                              | Image URL for the avatar      |
| `name`             | string                                                              | Alt text for the avatar image |
| `label`            | string                                                              | Accessibility label           |
| `borderColor`      | string                                                              | Custom border color           |
| `presence`         | 'online' \| 'busy' \| 'focus' \| 'offline' \| ReactNode             | Presence indicator            |
| `status`           | 'approved' \| 'declined' \| 'locked' \| ReactNode                   | Status indicator              |
| `isDisabled`       | boolean                                                             | Disabled state                |
| `href`             | string                                                              | URL for avatar as link        |
| `target`           | '\_blank' \| '\_self' \| '\_top' \| '\_parent'                      | Link target                   |
| `onClick`          | (event: MouseEvent, analyticsEvent?: UIAnalyticsEvent) => void      | Click handler                 |
| `stackIndex`       | number                                                              | Position in avatar stack      |
| `tabIndex`         | number                                                              | Tab index                     |
| `testId`           | string                                                              | Test ID for automated tests   |
| `analyticsContext` | Record<string, any>                                                 | Analytics context             |
| `as`               | keyof JSX.IntrinsicElements \| React.ComponentType                  | Custom wrapper element        |
| `children`         | ReactNode                                                           | Custom content                |

[Documentation](https://atlassian.design/components/avatar)

#### Avatar Group

A component for displaying multiple avatars in a group with overlap and overflow handling.

```tsx
import AvatarGroup from '@atlaskit/avatar-group';

<AvatarGroup
	avatars={[
		{ src: 'avatar1.jpg', name: 'User 1' },
		{ src: 'avatar2.jpg', name: 'User 2' },
		{ src: 'avatar3.jpg', name: 'User 3' },
	]}
	maxCount={3}
/>;
```

| Prop                  | Type                                       | Description                       |
| --------------------- | ------------------------------------------ | --------------------------------- |
| `avatars`             | Array<{ src: string, name: string }>       | Array of avatar objects           |
| `maxCount`            | number                                     | Maximum number of avatars to show |
| `size`                | 'small' \| 'medium' \| 'large' \| 'xlarge' | Size of avatars                   |
| `showMoreButtonProps` | object                                     | Props for overflow button         |

[Documentation](https://atlassian.design/components/avatar-group)

#### Icon (Beta)

Icons are available from two packages: `@atlaskit/icon` and `@atlaskit/icon-lab`. Both use the same
import pattern: `{package}/core/{icon-name}`.

**CRITICAL: Always use the ADS MCP to find the correct icon package before importing.**

##### Finding and Importing Icons

**Step 1: Search for the icon using the ADS MCP**

```typescript
mcp_ads_ads_plan({
	icons: ['icon-name-here', 'another-icon'],
	tokens: [],
	components: [],
});
```

**Step 2: Use the exact package path returned**

The MCP will return the full import path. Use it exactly as provided:

```tsx
// Icons from @atlaskit/icon
import AddIcon from '@atlaskit/icon/core/add';
import BacklogIcon from '@atlaskit/icon/core/backlog';
import EditIcon from '@atlaskit/icon/core/edit';
import SearchIcon from '@atlaskit/icon/core/search';

// Icons from @atlaskit/icon-lab
import RandomizeIcon from '@atlaskit/icon-lab/core/randomize';
import TelescopeIcon from '@atlaskit/icon-lab/core/telescope';
import ArrowCurvedDownLeftIcon from '@atlaskit/icon-lab/core/arrow-curved-down-left';
```

##### Import Pattern

Both packages follow the same structure:

- **Package**: Either `@atlaskit/icon` or `@atlaskit/icon-lab`
- **Path**: Always `/core/`
- **Icon name**: kebab-case (e.g., `arrow-down-left`, `backlog`)
- **Component name**: PascalCase + `Icon` suffix (e.g., `BacklogIcon`, `ArrowCurvedDownLeftIcon`)

```tsx
// Pattern: import {PascalCase}Icon from '@atlaskit/{icon|icon-lab}/core/{kebab-case}'
import BacklogIcon from '@atlaskit/icon/core/backlog';
import ArrowCurvedDownLeftIcon from '@atlaskit/icon-lab/core/arrow-curved-down-left';
```

##### Usage Examples

```tsx
import AddIcon from '@atlaskit/icon/core/add';
import Button from '@atlaskit/button/new';

// Basic usage - label is required
<AddIcon label="Add item" />

// With different sizes
<AddIcon label="Add" size="small" />  // 16px
<AddIcon label="Add" size="medium" /> // 24px (default)
<AddIcon label="Add" size="large" />  // 32px

// In a button
<Button iconBefore={AddIcon}>Create</Button>
<Button iconAfter={AddIcon}>Add item</Button>
```

##### Icon Props

| Prop      | Type                            | Description                         |
| --------- | ------------------------------- | ----------------------------------- |
| `label`   | string                          | **Required** - Accessible icon text |
| `size`    | 'small' \| 'medium' \| 'large'  | Icon size (default: 'medium')       |
| `color`   | string                          | Color token or 'currentColor'       |
| `testId`  | string                          | Test ID for automated tests         |
| `UNSAFE_` | Various UNSAFE props available  | See documentation                   |

##### Common Mistakes

❌ **Wrong package:**

```tsx
import BacklogIcon from '@atlaskit/icon-lab/core/backlog'; // Wrong!
```

✅ **Correct - always verify with ADS MCP first:**

```tsx
import BacklogIcon from '@atlaskit/icon/core/backlog';
```

[Documentation](https://atlassian.design/components/icon/examples)

#### Image (Beta)

A component for displaying images with theme support. This component is in Beta phase, meaning it's
stable at version 1.0+ but may receive improvements based on customer feedback. Breaking changes
will only be made in major releases.

```tsx
import Image from '@atlaskit/image';

<Image src="image-url" alt="Image description" width={200} height={200} testId="image-test" />;
```

| Prop     | Type   | Description                    |
| -------- | ------ | ------------------------------ |
| `src`    | string | URL of the image               |
| `alt`    | string | Alternative text for the image |
| `width`  | number | Width of the image in pixels   |
| `height` | number | Height of the image in pixels  |
| `testId` | string | Test ID for automated testing  |

[Documentation](https://atlassian.design/components/image)

### Layout and Structure

#### Page Header

A component for page headers.

```tsx
import PageHeader from '@atlaskit/page-header';

<PageHeader
	breadcrumbs={<Breadcrumbs />}
	actions={<Actions />}
	bottomBar={<BottomBar />}
	testId="page-header-test"
>
	Page Title
</PageHeader>;
```

| Prop        | Type      | Description                                                                       |
| ----------- | --------- | --------------------------------------------------------------------------------- |
| breadcrumbs | ReactNode | Breadcrumb navigation                                                             |
| actions     | ReactNode | Actions to display in the header                                                  |
| bottomBar   | ReactNode | Content to display in the bottom bar                                              |
| children    | ReactNode | The title of the page                                                             |
| testId      | string    | A unique string that appears as a data attribute data-testid in the rendered code |

[Documentation](https://atlassian.design/components/page-header)

### Loading

#### Progress Bar

A component for displaying progress.

```tsx
import ProgressBar from '@atlaskit/progress-bar';

<ProgressBar
	value={0.5}
	isIndeterminate={false}
	appearance="default"
	ariaLabel="Loading progress"
	testId="progress-bar-test"
/>;
```

| Prop            | Type                                | Description                                                                       |
| --------------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| value           | number                              | Sets the value of the progress bar, between 0 and 1 inclusive                     |
| isIndeterminate | boolean                             | Shows the progress bar in an indeterminate state when true                        |
| appearance      | 'default' \| 'success' \| 'inverse' | The visual style of the progress bar                                              |
| ariaLabel       | string                              | Descriptive label associated with the progress bar for accessibility              |
| testId          | string                              | A unique string that appears as a data attribute data-testid in the rendered code |

#### Spinner

A loading spinner component.

```tsx
import Spinner from '@atlaskit/spinner';

<Spinner size="large" />;
```

| Prop         | Type                           | Description                                      |
| ------------ | ------------------------------ | ------------------------------------------------ |
| `size`       | 'small' \| 'medium' \| 'large' | Size of the spinner                              |
| `appearance` | 'inherit' \| 'invert'          | Visual style of the spinner                      |
| `delay`      | number                         | Delay in milliseconds before showing the spinner |

[Documentation](https://atlassian.design/components/spinner)

#### Skeleton

A loading placeholder component.

```tsx
import Skeleton from '@atlaskit/skeleton';

<Skeleton height="20px" width="200px" />;
```

| Prop           | Type             | Description                          |
| -------------- | ---------------- | ------------------------------------ |
| `height`       | string \| number | Height of the skeleton               |
| `width`        | string \| number | Width of the skeleton                |
| `isShimmering` | boolean          | Enables the shimmer animation effect |

[Documentation](https://atlassian.design/components/skeleton)

### Messaging

#### Banner

A component for displaying important messages or announcements.

```tsx
import Banner from '@atlaskit/banner';

<Banner appearance="announcement" isOpen={true} icon={<Icon />}>
	Important announcement
</Banner>;
```

| Prop         | Type                                   | Description                |
| ------------ | -------------------------------------- | -------------------------- |
| `appearance` | 'announcement' \| 'error' \| 'warning' | Visual style of the banner |
| `isOpen`     | boolean                                | Control visibility         |
| `icon`       | ReactNode                              | Optional icon              |
| `children`   | ReactNode                              | Banner content             |

[Documentation](https://atlassian.design/components/banner)

#### Flag

A component for displaying brief messages.

```tsx
import Flag, { FlagGroup } from '@atlaskit/flag';

<FlagGroup>
	<Flag
		id="flag-1"
		icon={<Icon label="Info" />}
		title="Flag Title"
		description="Flag description"
		actions={[
			{
				content: 'Action',
				onClick: () => {},
				testId: 'action-test',
			},
		]}
		appearance="normal"
		testId="flag-test"
	/>
</FlagGroup>;
```

##### Content Guidelines

- Use for confirmations and alerts needing minimal interaction
- Display event-driven messages
- Be clear about what went wrong for errors
- Provide specific steps to resolve issues
- Use a helpful, non-threatening tone
- Clearly state potential consequences for warnings
- Confirm outcome then get out of the way for success messages

**Message Types:**

- **Error**: Example: "This email address is already in use. Try signing in or use a different
  email."
- **Warning**: Clearly state potential consequences before actions
- **Success**: Confirm outcome concisely
- **Information**: Alert users about helpful additional information

| Prop              | Type                                                                                                                                                                   | Description                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| id                | number \| string                                                                                                                                                       | A unique identifier used for rendering and onDismissed callbacks                                      |
| icon              | ReactNode                                                                                                                                                              | The icon displayed in the top-left of the flag. Should be an instance of `@atlaskit/icon`             |
| title             | ReactNode                                                                                                                                                              | The bold text shown at the top of the flag                                                            |
| description       | ReactNode                                                                                                                                                              | The secondary content shown below the flag title                                                      |
| actions           | Array<{ content: ReactNode, onClick?: (e: React.MouseEvent<HTMLElement>, analyticsEvent: UIAnalyticsEvent) => void, href?: string, target?: string, testId?: string }> | Array of clickable actions to be shown at the bottom of the flag                                      |
| appearance        | 'error' \| 'info' \| 'normal' \| 'success' \| 'warning'                                                                                                                | Makes the flag appearance bold. Setting this to anything other than 'normal' hides the dismiss button |
| linkComponent     | ComponentType<CustomThemeButtonProps>                                                                                                                                  | A link component that is passed down to the `@atlaskit/button` used by actions                        |
| onDismissed       | (id: number \| string, analyticsEvent: UIAnalyticsEvent) => void                                                                                                       | Handler which will be called when a Flag's dismiss button is clicked                                  |
| testId            | string                                                                                                                                                                 | A unique string that appears as a data attribute data-testid in the rendered code                     |
| analyticsContext  | Record<string, any>                                                                                                                                                    | Additional information to be included in the context of analytics events                              |
| headingLevel      | 1 \| 2 \| 3 \| 4 \| 5 \| 6                                                                                                                                             | Specifies the heading level in the document structure                                                 |
| delayAnnouncement | number                                                                                                                                                                 | Milliseconds to delay the screen reader announcement due to announcement conflict                     |

#### Inline Message

A component for displaying inline messages.

```tsx
import InlineMessage from '@atlaskit/inline-message';

<InlineMessage
	title="Inline Message Title"
	secondaryText="Secondary text"
	appearance="info"
	testId="inline-message-test"
>
	<p>Content that appears in the dialog when opened</p>
</InlineMessage>;
```

| Prop          | Type                                                                                                                                                                                           | Description                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| title         | ReactNode                                                                                                                                                                                      | Text to display first, bolded for emphasis                                        |
| secondaryText | ReactNode                                                                                                                                                                                      | Text to display second                                                            |
| appearance    | 'connectivity' \| 'confirmation' \| 'info' \| 'warning' \| 'error'                                                                                                                             | Set the icon to be used before the title                                          |
| placement     | 'bottom-start' \| 'bottom-center' \| 'bottom-end' \| 'top-start' \| 'top-center' \| 'top-end' \| 'right-start' \| 'right-center' \| 'right-end' \| 'left-start' \| 'left-center' \| 'left-end' | The placement to be passed to the inline dialog                                   |
| children      | ReactNode                                                                                                                                                                                      | The elements to be displayed by the inline dialog                                 |
| testId        | string                                                                                                                                                                                         | A unique string that appears as a data attribute data-testid in the rendered code |

#### Modal Dialog

A modal dialog component for important content.

##### Content Guidelines

- Present short-term tasks
- Displays content above page layer
- Used for focused interactions
- Use clear, descriptive titles
- Keep content focused on a single task or message
- Include clear action buttons
- Use sentence case for all text

**Examples:**

- Title: "Delete this issue"
- Content: "This will permanently remove the issue and all its comments."
- Buttons: "Delete issue", "Cancel"

```tsx
import React, { Fragment, useCallback, useState } from 'react';

import Button from '@atlaskit/button/new';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from '@atlaskit/modal-dialog';

export default function Example() {
	const [isOpen, setIsOpen] = useState(false);
	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

	return (
		<Fragment>
			<Button aria-haspopup="dialog" appearance="primary" onClick={openModal}>
				Open modal
			</Button>

			<ModalTransition>
				{isOpen && (
					<Modal onClose={closeModal}>
						<ModalHeader hasCloseButton>
							<ModalTitle>Default modal header</ModalTitle>
						</ModalHeader>
						<ModalBody>Your modal content.</ModalBody>
						<ModalFooter>
							<Button appearance="subtle">About modals</Button>
							<Button appearance="primary" onClick={closeModal}>
								Close
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</Fragment>
	);
}
```

##### Props:

- `autoFocus`: (boolean | RefObject<HTMLElement>) Focus is moved to the first interactive element or
  specified element. Default: true
- `children`: (ReactNode) Contents of the modal dialog
- `focusLockAllowlist`: (function) Callback to allowlist nodes for interaction outside focus lock
- `height`: (number | string) Height of the modal dialog
- `width`: ('small' | 'medium' | 'large' | 'x-large' | number | string) Width of the modal dialog
- `onClose`: (KeyboardOrMouseEvent, UIAnalyticsEvent) => void) Callback when modal requests to close
- `onCloseComplete`: ((element: HTMLElement) => void) Callback when modal finishes closing
- `onOpenComplete`: ((node: HTMLElement, isAppearing: boolean) => void) Callback when modal finishes
  opening
- `onStackChange`: ((stackIndex: number) => void) Callback when modal changes stack position
- `shouldScrollInViewport`: (boolean) Set scroll boundary to viewport instead of modal body
- `shouldCloseOnOverlayClick`: (boolean) Close modal when clicking the blanket
- `shouldCloseOnEscapePress`: (boolean) Close modal when pressing escape
- `shouldReturnFocus`: (boolean | RefObject<HTMLElement>) Controls focus behavior on modal exit
- `isBlanketHidden`: (boolean) Remove blanket tinted background
- `stackIndex`: (number) Position in modal stack (0 is highest)
- `label`: (string) Accessibility label when no modal title is present
- `testId`: (string) Test ID for automated testing

[Documentation](https://atlassian.design/components/modal-dialog)

#### Onboarding (Spotlight)

```tsx
import { Spotlight } from '@atlaskit/onboarding';

<Spotlight target="target-element" content="Feature description" actions={[...]} />;
```

[Documentation](https://atlassian.design/components/onboarding)

#### Section Message

A component for section-level messages.

```tsx
import SectionMessage from '@atlaskit/section-message';

<SectionMessage
	appearance="information"
	title="Section Message Title"
	testId="section-message-test"
>
	<p>Section message content</p>
	<SectionMessage.Actions>
		<SectionMessage.Action href="#">Action</SectionMessage.Action>
	</SectionMessage.Actions>
</SectionMessage>;
```

| Prop       | Type                                                              | Description                                                                       |
| ---------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| appearance | 'information' \| 'warning' \| 'error' \| 'success' \| 'discovery' | The appearance styling to use for the section message                             |
| children   | ReactNode                                                         | The main content of the section message                                           |
| title      | string                                                            | The heading of the section message                                                |
| actions    | ReactElement \| ReactElement<SectionMessageActionProps>[]         | Actions for the user to take after reading the section message                    |
| icon       | React.ElementType                                                 | An Icon component to be rendered instead of the default icon                      |
| testId     | string                                                            | A unique string that appears as a data attribute data-testid in the rendered code |

### Navigation

#### Breadcrumbs

A navigation component showing the current page hierarchy.

```tsx
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';

<Breadcrumbs>
	<BreadcrumbsItem href="/">Home</BreadcrumbsItem>
	<BreadcrumbsItem href="/products">Products</BreadcrumbsItem>
	<BreadcrumbsItem>Current Page</BreadcrumbsItem>
</Breadcrumbs>;
```

| Prop        | Type      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| `children`  | ReactNode | Breadcrumb items                                  |
| `maxItems`  | number    | Maximum number of items to show before truncating |
| `separator` | ReactNode | Custom separator between breadcrumb items         |

[Documentation](https://atlassian.design/components/breadcrumbs)

#### Link

A component for navigation links.

```tsx
import Link from '@atlaskit/link';

<Link href="/path">Link text</Link>;
```

| Prop         | Type      | Description      |
| ------------ | --------- | ---------------- |
| `href`       | string    | Link destination |
| `children`   | ReactNode | Link content     |
| `isDisabled` | boolean   | Disabled state   |

[Documentation](https://atlassian.design/components/link)

#### Menu

A component for displaying menus.

```tsx
import { MenuGroup, Section, ButtonItem, LinkItem, CustomItem } from '@atlaskit/menu';

<MenuGroup spacing="cozy" testId="menu-test">
	<Section title="Section Title">
		<ButtonItem>Button Item</ButtonItem>
		<LinkItem href="/path">Link Item</LinkItem>
		<CustomItem component={CustomComponent}>Custom Item</CustomItem>
	</Section>
</MenuGroup>;
```

| Prop        | Type                                         | Description                                                                       |
| ----------- | -------------------------------------------- | --------------------------------------------------------------------------------- |
| `children`  | ReactNode                                    | Children of the menu group, generally `Section` components                        |
| `isLoading` | boolean                                      | Used to tell assistive technologies that the menu group is loading                |
| `spacing`   | 'compact' \| 'cozy'                          | Configure the density of the menu group content                                   |
| `role`      | string                                       | Override the accessibility role for the element                                   |
| `testId`    | string                                       | A unique string that appears as a data attribute data-testid in the rendered code |
| `onClick`   | (event: MouseEvent \| KeyboardEvent) => void | Handler called when clicking on this element or any children elements             |
| `minWidth`  | number \| string                             | Constrain the menu group's minimum width                                          |
| `maxWidth`  | number \| string                             | Constrain the menu group's maximum width                                          |
| `minHeight` | number \| string                             | Constrain the menu group's minimum height                                         |
| `maxHeight` | number \| string                             | Constrain the menu group's height (required for scrollable sections)              |

[Documentation](https://atlassian.design/components/menu)

#### Pagination

A component for pagination controls.

```tsx
import Pagination from '@atlaskit/pagination';

<Pagination
	pages={[1, 2, 3, 4, 5]}
	defaultSelectedIndex={0}
	label="pagination"
	pageLabel="page"
	previousLabel="previous"
	nextLabel="next"
	max={7}
	onChange={(event, page) => console.log(page)}
	testId="pagination-test"
/>;
```

| Prop                   | Type                                                                                  | Description                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `pages`                | T[]                                                                                   | Array of the pages to display                                                              |
| `defaultSelectedIndex` | number                                                                                | Index of the page to be selected by default                                                |
| `selectedIndex`        | number                                                                                | Index of the selected page. This will make this pagination controlled                      |
| `label`                | string                                                                                | The aria-label for the pagination nav wrapper. Default: "pagination"                       |
| `pageLabel`            | string                                                                                | The aria-label for the individual page numbers. Default: "page"                            |
| `previousLabel`        | string                                                                                | The aria-label for the previous button. Default: "previous"                                |
| `nextLabel`            | string                                                                                | The aria-label for the next button. Default: "next"                                        |
| `style`                | CSSProperties                                                                         | Style to spread on the container element                                                   |
| `max`                  | number                                                                                | Maximum number of pages to be displayed in the pagination. Default: 7                      |
| `onChange`             | (event: SyntheticEvent, page: T, analyticsEvent?: UIAnalyticsEvent) => void           | The onChange handler which is called when the page is changed                              |
| `getPageLabel`         | (page: T, pageIndex: number) => number \| string                                      | Helper function to get text displayed on the page button                                   |
| `renderEllipsis`       | (arg: { key: string; from: number; to: number }) => ReactElement                      | The react Node returned from the function is rendered instead of the default ellipsis node |
| `components`           | { Page?: React.ElementType; Previous?: React.ElementType; Next?: React.ElementType; } | Replace the built-in page, previous, next and/ or ellipsis component                       |
| `analyticsContext`     | Record<string, any>                                                                   | Additional information to be included in the `context` of analytics events                 |
| `testId`               | string                                                                                | A unique string that appears as a data attribute data-testid in the rendered code          |
| `isDisabled`           | boolean                                                                               | Sets whether the Paginator is disabled                                                     |

[Documentation](https://atlassian.design/components/pagination)

#### Tabs

A component for tabbed navigation.

```tsx
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';

<Tabs>
	<TabList>
		<Tab>Tab 1</Tab>
		<Tab>Tab 2</Tab>
	</TabList>
	<TabPanel>Content 1</TabPanel>
	<TabPanel>Content 2</TabPanel>
</Tabs>;
```

| Prop       | Type                    | Description        |
| ---------- | ----------------------- | ------------------ |
| `children` | ReactNode               | Tab content        |
| `selected` | number                  | Selected tab index |
| `onChange` | (index: number) => void | Tab change handler |

[Documentation](https://atlassian.design/components/tabs)

### Overlays and Layering

#### Blanket

A component for overlays.

```tsx
import Blanket from '@atlaskit/blanket';

<Blanket isTinted />;
```

| Prop               | Type       | Description    |
| ------------------ | ---------- | -------------- |
| `isTinted`         | boolean    | Tinted overlay |
| `onBlanketClicked` | () => void | Click handler  |

[Documentation](https://atlassian.design/components/blanket)

#### Drawer

A sliding panel component.

```tsx
import Drawer from '@atlaskit/drawer';

<Drawer isOpen={true} onClose={() => {}} width="wide">
	Drawer content
</Drawer>;
```

| Prop       | Type                           | Description                           |
| ---------- | ------------------------------ | ------------------------------------- |
| `isOpen`   | boolean                        | Controls the visibility of the drawer |
| `width`    | 'narrow' \| 'medium' \| 'wide' | Width of the drawer                   |
| `onClose`  | () => void                     | Handler called when drawer is closed  |
| `children` | ReactNode                      | Content to display in the drawer      |

[Documentation](https://atlassian.design/components/drawer)

#### Popup

A component for displaying popup content.

```tsx
import Popup from '@atlaskit/popup';

<Popup content="Popup content" isOpen={true}>
	<button>Trigger</button>
</Popup>;
```

| Prop        | Type       | Description     |
| ----------- | ---------- | --------------- |
| `content`   | ReactNode  | Popup content   |
| `isOpen`    | boolean    | Open state      |
| `onClose`   | () => void | Close handler   |
| `placement` | string     | Popup placement |

[Documentation](https://atlassian.design/components/popup)

#### Tooltip

A component for displaying tooltips.

```tsx
import Tooltip from '@atlaskit/tooltip';

<Tooltip content="Tooltip content">
	<button>Hover me</button>
</Tooltip>;
```

##### Content Guidelines

- Keep it brief (ideally 1-3 words, max 8 words)
- Use sentence case
- No punctuation at the end
- Use clear, direct language
- Avoid technical jargon
- Never include links or interactive elements
- Don't truncate tooltip text

**When to Use:**

- To clarify icon meanings
- To provide non-essential supporting information
- To explain truncated content

**When Not to Use:**

- For essential information needed to complete a task
- On disabled buttons or elements
- For obvious or redundant information

| Prop       | Type      | Description      |
| ---------- | --------- | ---------------- |
| `content`  | ReactNode | Tooltip content  |
| `children` | ReactNode | Trigger element  |
| `position` | string    | Tooltip position |

[Documentation](https://atlassian.design/components/tooltip)

### Status Indicators

#### Badge

A component for displaying status indicators or counts.

```tsx
import Badge from '@atlaskit/badge';

// Status badge
<Badge appearance="added">New</Badge>

// Count badge
<Badge max={99} value={100}>100</Badge>
```

| Prop         | Type                                                          | Description                      |
| ------------ | ------------------------------------------------------------- | -------------------------------- |
| `appearance` | 'added' \| 'default' \| 'important' \| 'primary' \| 'removed' | Visual style of the badge        |
| `value`      | number                                                        | Number to display                |
| `max`        | number                                                        | Maximum value before showing '+' |
| `children`   | ReactNode                                                     | Custom content                   |

[Documentation](https://atlassian.design/components/badge)

#### Empty State

A component for empty states.

```tsx
import EmptyState from '@atlaskit/empty-state';

<EmptyState header="No items" description="Add items to get started" />;
```

##### Content Guidelines

- Use when nothing to display in a view
- Appropriate for: no tasks, cleared inbox, no search results
- Explain why the state is empty
- Provide clear next steps
- Keep tone helpful and encouraging
- Consider all scenarios causing the empty state
- Use inspirational, motivating tone for first-time view

**Examples:**

- Good: "No projects yet. Create your first project to get started."
- Avoid: "Nothing here", "No data found"

| Prop          | Type   | Description             |
| ------------- | ------ | ----------------------- |
| `header`      | string | Empty state header      |
| `description` | string | Empty state description |
| `imageUrl`    | string | Optional image URL      |

[Documentation](https://atlassian.design/components/empty-state)

#### Lozenge

A component for status indicators.

```tsx
import Lozenge from '@atlaskit/lozenge';

<Lozenge appearance="success">Success</Lozenge>;
```

| Prop         | Type                                   | Description     |
| ------------ | -------------------------------------- | --------------- |
| `appearance` | 'success' \| 'removed' \| 'inprogress' | Visual style    |
| `children`   | ReactNode                              | Lozenge content |
| `isBold`     | boolean                                | Bold style      |

[Documentation](https://atlassian.design/components/lozenge)

#### Progress Indicator

A component for showing progress through steps.

```tsx
import { ProgressIndicator } from '@atlaskit/progress-indicator';

<ProgressIndicator selectedIndex={1} values={['Step 1', 'Step 2', 'Step 3']} />;
```

| Prop            | Type                    | Description            |
| --------------- | ----------------------- | ---------------------- |
| `selectedIndex` | number                  | Current step           |
| `values`        | string[]                | Step labels            |
| `onSelect`      | (index: number) => void | Step selection handler |

[Documentation](https://atlassian.design/components/progress-indicator)

#### Progress Tracker

A component for tracking progress through a journey.

```tsx
import { ProgressTracker } from '@atlaskit/progress-tracker';

<ProgressTracker
	items={[
		{ id: '1', label: 'Step 1', percentageComplete: 100 },
		{ id: '2', label: 'Step 2', percentageComplete: 50 },
	]}
/>;
```

| Prop      | Type                                                           | Description     |
| --------- | -------------------------------------------------------------- | --------------- |
| `items`   | Array<{id: string, label: string, percentageComplete: number}> | Progress items  |
| `current` | string                                                         | Current item ID |

[Documentation](https://atlassian.design/components/progress-tracker)

#### Tag

A component for displaying tags.

```tsx
import Tag from '@atlaskit/tag';

<Tag text="Tag" />;
```

| Prop         | Type                   | Description  |
| ------------ | ---------------------- | ------------ |
| `text`       | string                 | Tag text     |
| `appearance` | 'default' \| 'rounded' | Visual style |
| `color`      | string                 | Tag color    |

[Documentation](https://atlassian.design/components/tag)

#### Tag Group

A component for managing multiple tags.

```tsx
import TagGroup from '@atlaskit/tag-group';

<TagGroup>
	<Tag text="Tag 1" />
	<Tag text="Tag 2" />
</TagGroup>;
```

| Prop        | Type             | Description    |
| ----------- | ---------------- | -------------- |
| `children`  | ReactNode        | Tag components |
| `alignment` | 'start' \| 'end' | Tag alignment  |

[Documentation](https://atlassian.design/components/tag-group)

### Text and Data Display

#### Code

A component for displaying code snippets.

```jsx
<Code>const greeting = 'Hello, world!';</Code>
```

| Prop                          | Type      | Description                                                                                                                                                      |
| ----------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children                      | ReactNode | Content to be rendered in the inline code block                                                                                                                  |
| testId                        | string    | A unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests                                       |
| codeBidiWarnings              | boolean   | When set to `false`, disables code decorating with bidi warnings. Defaults to `true`                                                                             |
| codeBidiWarningLabel          | string    | Label for the bidi warning tooltip. Defaults to "Bidirectional characters change the order that text is rendered. This could be used to obscure malicious code." |
| codeBidiWarningTooltipEnabled | boolean   | Sets whether to render tooltip with the warning or not. Intended to be disabled when used in a mobile view. Defaults to `true`                                   |

[Documentation](https://atlassian.design/components/code)

#### Dynamic Table

A component for displaying dynamic data tables.

```tsx
import DynamicTable from '@atlaskit/dynamic-table';

<DynamicTable
	head={{
		cells: [{ content: 'Header 1', isSortable: true }, { content: 'Header 2' }],
	}}
	rows={[
		{
			cells: [
				{ content: 'Cell 1', key: 'cell1' },
				{ content: 'Cell 2', key: 'cell2' },
			],
		},
	]}
	rowsPerPage={10}
	defaultPage={1}
	loadingSpinnerSize="large"
	isLoading={false}
	testId="dynamic-table-test"
/>;
```

| Prop                  | Type                                                                                     | Description                               |
| --------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------- |
| `caption`             | ReactNode                                                                                | Caption for the table styled as a heading |
| `head`                | { cells: Array<{ content: ReactNode, isSortable?: boolean, width?: number }> }           | Configuration for table headers           |
| `rows`                | Array<{ cells: Array<{ content: ReactNode, key: string }> }>                             | Data rows for the table                   |
| `emptyView`           | ReactElement                                                                             | Content shown when the table has no data  |
| `loadingSpinnerSize`  | 'large' \| 'small'                                                                       | Size of the loading spinner               |
| `isLoading`           | boolean                                                                                  | Whether the table is in a loading state   |
| `loadingLabel`        | string                                                                                   | Accessible name for loading state         |
| `isFixedSize`         | boolean                                                                                  | Force columns to use initial width        |
| `rowsPerPage`         | number                                                                                   | Number of rows per page                   |
| `totalRows`           | number                                                                                   | Total number of rows for pagination       |
| `onSetPage`           | (page: number, analyticsEvent?: UIAnalyticsEvent) => void                                | Handler for page changes                  |
| `onSort`              | (sortKey: string, sortOrder: 'ASC' \| 'DESC', analyticsEvent?: UIAnalyticsEvent) => void | Handler for column sorting                |
| `onPageRowsUpdate`    | (pageRows: Array<{ cells: Array<{ content: ReactNode, key: string }> }>) => void         | Handler for page row updates              |
| `page`                | number                                                                                   | Current page number                       |
| `defaultPage`         | number                                                                                   | Initial page number                       |
| `sortKey`             | string                                                                                   | Column key for sorting                    |
| `defaultSortKey`      | string                                                                                   | Initial sort column                       |
| `sortOrder`           | 'ASC' \| 'DESC'                                                                          | Sort direction                            |
| `defaultSortOrder`    | 'ASC' \| 'DESC'                                                                          | Initial sort direction                    |
| `isRankable`          | boolean                                                                                  | Enable drag and drop sorting              |
| `isRankingDisabled`   | boolean                                                                                  | Disable row dropping                      |
| `onRankStart`         | (rankStart: { index: number }) => void                                                   | Handler for drag start                    |
| `onRankEnd`           | (rankEnd: { index: number, newIndex: number }) => void                                   | Handler for drop complete                 |
| `paginationi18n`      | { label: string, next: string, pageLabel?: string, prev: string }                        | Pagination labels                         |
| `highlightedRowIndex` | number \| number[]                                                                       | Index(es) of highlighted rows             |
| `testId`              | string                                                                                   | Test ID for automated testing             |
| `label`               | string                                                                                   | Accessible label for the table            |

[Documentation](https://atlassian.design/components/dynamic-table)

#### Heading (Beta)

A typography component used to display text in defined sizes and styles.

```jsx
import Heading from '@atlaskit/heading';

<Heading size="xxlarge">Page title</Heading>;
```

| Prop                                                 | Type                                                                             | Description                                                                                                                                                                           |
| ---------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| size                                                 | 'xxlarge' \| 'xlarge' \| 'large' \| 'medium' \| 'small' \| 'xsmall' \| 'xxsmall' | Heading size. This value is detached from the specific heading level applied to allow for more flexibility                                                                            |
| as                                                   | 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'div' \| 'span'                  | Allows the component to be rendered as the specified DOM element, overriding a default element set by `level` prop                                                                    |
| color                                                | 'color.text' \| 'color.text.inverse' \| 'color.text.warning.inverse'             | Token representing text color with a built-in fallback value. Will apply inverse text color automatically if placed within a Box with bold background color. Defaults to `color.text` |
| children                                             | ReactNode                                                                        | The text of the heading                                                                                                                                                               |
| id                                                   | string                                                                           | Unique identifier for the heading DOM element                                                                                                                                         |
| testId                                               | string                                                                           | A unique string that appears as a data attribute `data-testid` in the                                                                                                                 |
| rendered code, serving as a hook for automated tests |

[Documentation](https://atlassian.design/components/heading)

#### Inline Edit

A component for inline editing.

```tsx
import InlineEdit from '@atlaskit/inline-edit';

<InlineEdit
	defaultValue="Editable text"
	onConfirm={(value) => console.log(value)}
	readView={() => <div>Read view</div>}
	editView={(fieldProps) => <input {...fieldProps} />}
	testId="inline-edit-test"
/>;
```

| Prop                        | Type                                                                                                    | Description                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `analyticsContext`          | Record<string, any>                                                                                     | Additional information to be included in the `context` of analytics events |
| `cancelButtonLabel`         | string                                                                                                  | Accessibility label for the cancel action button                           |
| `confirmButtonLabel`        | string                                                                                                  | Accessibility label for the confirm action button                          |
| `defaultValue`              | any                                                                                                     | The user input entered into the field during `editView`                    |
| `editButtonLabel`           | string                                                                                                  | Accessibility label for button to enter `editView`                         |
| `editLabel`                 | string                                                                                                  | Append 'edit' to the end of the button label                               |
| `hideActionButtons`         | boolean                                                                                                 | Whether to display confirm and cancel action buttons                       |
| `isRequired`                | boolean                                                                                                 | Whether the input value can be confirmed as empty                          |
| `keepEditViewOpenOnBlur`    | boolean                                                                                                 | Whether to stay in `editView` when blurred                                 |
| `label`                     | ReactNode                                                                                               | Label above the input field                                                |
| `readViewFitContainerWidth` | boolean                                                                                                 | Whether readView has 100% width or fits content                            |
| `startWithEditViewOpen`     | boolean                                                                                                 | Whether to start in edit view                                              |
| `validate`                  | (value: any, formState: FormState, fieldState: FieldState) => string \| void \| Promise<string \| void> | Function to validate field input with form and field state                 |
| `editView`                  | (fieldProps: ExtendedFieldProps<FieldValue>, ref: React.RefObject<any>) => ReactNode                    | Component shown when editing                                               |
| `isEditing`                 | boolean                                                                                                 | Whether component shows `readView` or `editView`                           |
| `onConfirm`                 | (value: any, analyticsEvent: UIAnalyticsEvent) => void                                                  | Handler to save and confirm value                                          |
| `onEdit`                    | () => void                                                                                              | Handler called when readView is clicked                                    |
| `readView`                  | () => ReactNode                                                                                         | Component shown when not editing                                           |
| `testId`                    | string                                                                                                  | Test ID for automated testing                                              |

[Documentation](https://atlassian.design/components/inline-edit)

#### Table Tree

A component for displaying hierarchical data.

```tsx
import TableTree from '@atlaskit/table-tree';

<TableTree
	headers={['Column 1', 'Column 2']}
	columns={[Cell, Cell]}
	items={[{ content: 'Row 1', children: [{ content: 'Child 1' }] }]}
	label="Table description"
/>;
```

| Prop                               | Type                                                                    | Description                                            |
| ---------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------ |
| `children`                         | ReactNode                                                               | Table contents when composing with internal components |
| `columns`                          | ElementType[]                                                           | Components to render cells in each column              |
| `columnWidths`                     | ColumnWidth[]                                                           | Widths of table columns                                |
| `headers`                          | string[]                                                                | Header text for table columns                          |
| `shouldExpandOnClick`              | boolean                                                                 | Whether row expands when clicked anywhere              |
| `items`                            | Array<{ content: ReactNode, children?: Array<{ content: ReactNode }> }> | Data to render the table                               |
| `mainColumnForExpandCollapseLabel` | string \| number                                                        | Value to extend expand/collapse button label           |
| `label`                            | string                                                                  | Aria-label for the table                               |
| `referencedLabel`                  | string                                                                  | Aria-labelledby attribute for the table                |

[Documentation](https://atlassian.design/components/table-tree)

#### Visually Hidden

A utility component for accessibility.

```tsx
import VisuallyHidden from '@atlaskit/visually-hidden';

<VisuallyHidden>
	<span>Hidden content</span>
</VisuallyHidden>;
```

| Prop       | Type      | Description                                                                                                                |
| ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| `children` | ReactNode | The element or elements that should be hidden                                                                              |
| `role`     | string    | An ARIA role attribute to aid screen readers                                                                               |
| `id`       | string    | An id may be appropriate for this component if used in conjunction with `aria-describedby` on a paired element             |
| `testId`   | string    | A unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests |

[Documentation](https://atlassian.design/components/visually-hidden)

#### Navigation System (Early Access)

A modern navigation system for Atlassian products that provides a flexible and accessible layout
structure.

```tsx
import React, { useState } from 'react';
import AKBanner from '@atlaskit/banner';
import { Banner } from '@atlaskit/navigation-system/layout/banner';
import { Main } from '@atlaskit/navigation-system/layout/main';
import { PanelSplitter } from '@atlaskit/navigation-system/layout/panel-splitter';
import { Root } from '@atlaskit/navigation-system/layout/root';
import {
	SideNav,
	SideNavContent,
	SideNavFooter,
	SideNavToggleButton,
} from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavStart,
	TopNavMiddle,
	TopNavEnd,
} from '@atlaskit/navigation-system/layout/top-nav';
import { Help, CustomLogo } from '@atlaskit/navigation-system/top-nav-items';
import { Divider } from '@atlaskit/navigation-system/side-nav-items/menu-section';
import { LinkMenuItem } from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import { TopLevelSpacer } from '@atlaskit/navigation-system/side-nav-items/top-level-spacer';
import { MenuList } from '@atlaskit/navigation-system/side-nav-items/menu-list';
import {
	FlyoutMenuItem,
	FlyoutMenuItemContent,
	FlyoutMenuItemTrigger,
} from '@atlaskit/navigation-system/side-nav-items/flyout-menu-item';
import { AtlassianIcon, AtlassianLogo } from '@atlaskit/logo';
import AlignTextLeftIcon from '@atlaskit/icon/core/align-text-left';
import AppsIcon from '@atlaskit/icon/core/apps';
import BoardIcon from '@atlaskit/icon/core/board';
import GoalIcon from '@atlaskit/icon/core/goal';
import MegaphoneIcon from '@atlaskit/icon/core/megaphone';
import PersonAvatarIcon from '@atlaskit/icon/core/person-avatar';
import StarUnstarredIcon from '@atlaskit/icon/core/star-unstarred';
import LinkExternalIcon from '@atlaskit/icon/utility/link-external';

export function LayoutRoot() {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isBannerVisible, setIsBannerVisible] = useState(false);
	const [isPanelVisible, setIsPanelVisible] = useState(false);
	const [isAsideVisible, setIsAsideVisible] = useState(false);
	const [isSideNavDefaultCollapsed, setIsSideNavDefaultCollapsed] = useState(false);
	const [persistedSideNavWidth, setPersistedSideNavWidth] = useState(350);

	return (
		<Root>
			{!isFullscreen && (
				<>
					{isBannerVisible && (
						<Banner
							xcss={/* custom banner styles */}
							// Setting slot height to match the height of the Atlaskit Banner component.
							height={48}
						>
							<AKBanner appearance="announcement">Announcement goes here!</AKBanner>
						</Banner>
					)}
					<TopNav>
						<TopNavStart>
							<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
							<CustomLogo href="#" logo={AtlassianLogo} icon={AtlassianIcon} label="Home page" />
						</TopNavStart>

						<TopNavMiddle>
							{/* Products typically have a search bar and create button here */}
						</TopNavMiddle>

						<TopNavEnd>
							<ConversationAssistantButtonNav4
								isActive={false}
								onClick={() => {}}
								siteId="mock-site-id"
								productKey="mock-product-key"
							/>
							<Help
								label="Help"
								isSelected={isPanelVisible}
								onClick={() => setIsPanelVisible((prev) => !prev)}
							/>
							<Account
								name="John Doe"
								picture="https://example.com/avatar.jpg"
								email="john@example.com"
								identityEnvironment="prod"
								application="my-application"
								continueUrl="https://my-application.com"
							/>
						</TopNavEnd>
					</TopNav>

					<SideNav
						onExpand={() => setIsSideNavDefaultCollapsed(false)}
						onCollapse={() => setIsSideNavDefaultCollapsed(true)}
						defaultCollapsed={isSideNavDefaultCollapsed}
						defaultWidth={persistedSideNavWidth}
					>
						<SideNavContent>
							<MenuList>
								<LinkMenuItem href="#" elemBefore={<PersonAvatarIcon label="" />}>
									For you
								</LinkMenuItem>

								<LinkMenuItem href="#" elemBefore={<AppsIcon label="" />}>
									Apps
								</LinkMenuItem>

								<TopLevelSpacer />

								<LinkMenuItem
									href="#"
									elemBefore={<GoalIcon label="" />}
									elemAfter={<LinkExternalIcon label="" />}
								>
									Goals
								</LinkMenuItem>
							</MenuList>
						</SideNavContent>

						<SideNavFooter>
							<MenuButtonItem
								elemBefore={<MegaphoneIcon label="" color="currentColor" />}
								onClick={() => {}}
							>
								Give feedback
							</MenuButtonItem>
						</SideNavFooter>

						<PanelSplitter
							label="Resize side nav"
							onResizeStart={() => {}}
							onResizeEnd={({ finalWidth }) => setPersistedSideNavWidth(finalWidth)}
						/>
					</SideNav>
				</>
			)}

			<Main id="main-container" isFixed>
				{/* Your content goes here! */}
			</Main>

			{/**
			 * Also supported, but not typically used:
			 * - `Aside` from `@atlaskit/navigation-system/layout/aside`
			 * - `Panel` from `@atlaskit/navigation-system/layout/panel`
			 */}
		</Root>
	);
}
```

Key Features:

- Flexible layout structure with resizable panels
- Support for fullscreen mode
- Collapsible side navigation
- Banner support
- Right panel and aside support
- Responsive design
- Accessibility built-in
- Keyboard shortcuts support
- Analytics integration
- Customizable menu items
- Support for icons and avatars

[Documentation](https://atlassian.design/components/navigation-system)

### Component Status

#### Deprecated Components

The following components are deprecated and should not be used in new code:

- `@atlaskit/grid` - Use `Grid` from `@atlaskit/primitives/compiled` instead

#### Components with Caution

The following components are being phased out and should be avoided in new code:

- `@atlaskit/page-layout` - Use `@atlaskit/navigation-system` instead (for Atlassian employees only
  at this stage)
- `@atlaskit/atlassian-navigation` - Use `@atlaskit/navigation-system` instead (for Atlassian
  employees only at this stage)
- `@atlaskit/side-navigation` - Use `@atlaskit/navigation-system` instead (for Atlassian employees
  only at this stage)
- `@atlaskit/inline-dialog` - Use `Popup` from `@atlaskit/popup` instead

## Atlassian Design System (ADS) Primitives

### Overview

ADS Primitives are token-backed low-level building blocks for layouts and styling in the Atlassian
Design System. They provide a consistent way to compose layouts and apply design tokens.

These are available in two flavors:

1. `@atlaskit/primitives/compiled` (built with Compiled) – PREFERRED
2. `@atlaskit/primitives` (built with Emotion) – DEPRECATED

> **Note**: The original `@atlaskit/primitives` package is deprecated. Use
> `@atlaskit/primitives/compiled` and `@atlaskit/css` instead, which is part of the migration from
> Emotion to Compiled CSS-in-JS for better performance and modern React features. Refer to
> https://atlassian.design/components/css/migration for early information on this migration.

### Core Components

#### Layout Primitives

- `Box`: Generic container that provides managed access to design tokens
- `Inline`: Horizontal layout component based on flexbox
- `Stack`: Vertical layout component based on flexbox
- `Flex`: CSS Flexbox API implementation
- `Grid`: CSS Grid API implementation
- `Bleed`: Controls negative whitespace

#### Interactive Primitives

- `Pressable`: For building custom buttons
- `Anchor`: For building custom links

#### Typography Primitives

- `Text`: For building text elements

#### Styling

- `@atlaskit/css` package: A bounded variant of Compiled CSS-in-JS replacing `xcss` from
  `@atlaskit/primitives`
- `xcss` function: The original bounded API built with Emotion, being replaced by the
  `@atlaskit/css` package

### Primitive Components Reference

#### Box

A fundamental layout primitive that provides a base for building other components.

```tsx
import { cssMap } from '@atlaskit/css';
import { Box } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

<Box backgroundColor="color.background.accent.blue.subtlest">Content</Box>;

// A section with custom styling
const styles = cssMap({
	root: {
		padding: token('space.200'),
		border: `${token('border.width')} solid ${token('color.border')}`,
	},
});

<Box xcss={styles.root} as="section">
	Styled content
</Box>;
```

| Prop              | Type                                                 | Description                                                                                                                |
| ----------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `as`              | DOM elements such as `'div'\|'h1'\|'span'\|…`        | The DOM element to render as the Box. Defaults to 'div'. Note: SVG elements, 'button', and 'a' are excluded.               |
| `children`        | `ReactNode`                                          | Elements to be rendered inside the Box                                                                                     |
| `backgroundColor` | `elevation.surface*` and `color.background.*` tokens | Token representing background color with a built-in fallback value.                                                        |
| `style`           | `CSSProperties`                                      | Inline styles to be applied to the Box (only use as last resort)                                                           |
| `xcss`            | `StrictXCSSProp`                                     | Apply a subset of permitted styles powered by Atlassian Design System design tokens. See the StrictXCSSProp section below. |
| `ref`             | Ref                                                  | Forwarded ref                                                                                                              |
| `testId`          | string                                               | Test ID for automated testing                                                                                              |
| `role`            | string                                               | ARIA role attribute                                                                                                        |

Note: Please use other more semantic primitives first if you can, eg. use `<Anchor>` for links,
`<Pressable>` for pressable items, or layout primitives such as `<Stack>` before creating a
`<Box xcss>`.

#### Text

A primitive for rendering text with consistent typography styles.

```tsx
import { Text } from '@atlaskit/primitives/compiled';

<Text>Regular text</Text>
<Text weight="bold">Heading text</Text>
<Text color="color.text.accent.blue">
  Accent text
</Text>
```

| Prop       | Type                                              | Description                                                                                                                                                                                                                   |
| ---------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`       | 'span'\|'p'\|'strong'\|'em'                       | HTML tag to be rendered. Defaults to 'span'                                                                                                                                                                                   |
| `children` | `ReactNode`                                       | Elements rendered within the Text element                                                                                                                                                                                     |
| `color`    | `inherit`, `color.text*`, or `color.link*` tokens | Token representing text color with a built-in fallback value. Will apply inverse text color automatically if placed within a Box with bold background color. Defaults to 'color.text' if not nested in other Text components. |
| `id`       | string                                            | The HTML id attribute                                                                                                                                                                                                         |
| `maxLines` | number                                            | The number of lines to limit the provided text to. Text will be truncated with an ellipsis. When maxLines=1, wordBreak defaults to break-all to match the behaviour of text-overflow: ellipsis.                               |
| `align`    | 'center'\|'end'\|'start'                          | Text alignment                                                                                                                                                                                                                |
| `size`     | 'medium'\|'UNSAFE_small'\|'large'\|'small'        | Text size                                                                                                                                                                                                                     |
| `weight`   | 'bold'\|'medium'\|'regular'\|'semibold'           | The HTML font-weight attribute                                                                                                                                                                                                |
| `xcss`     | `StrictXCSSProp`                                  | Apply a subset of permitted styles powered by Atlassian Design System design tokens. See the StrictXCSSProp section below.                                                                                                    |
| `ref`      | Ref                                               | Forwarded ref                                                                                                                                                                                                                 |
| `testId`   | string                                            | Test ID for automated testing                                                                                                                                                                                                 |
| `role`     | string                                            | ARIA role attribute                                                                                                                                                                                                           |

#### Pressable

A primitive for creating interactive elements with consistent press states.

```tsx
import { Pressable } from '@atlaskit/primitives/compiled';
import { cssMap } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

const styles = cssMap({
  pressable: {
		backgroundColor: token('color.background.brand.subtlest')
    '&:hover': {
      backgroundColor: token('color.background.brand.subtlest.hovered')
    }
  }
});

<Pressable xcss={styles.pressable} onClick=(() => console.log('Pressed!'))>
  Hover me
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
| `role`             | string                                                    | ARIA role attribute                            |

#### Anchor

A primitive for creating accessible links.

```tsx
import { Anchor } from '@atlaskit/primitives/compiled';

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
| `role`             | string                                                    | ARIA role attribute                            |

### Layout Components

#### Flex

A component for creating flexible layouts using CSS Flexbox.

```tsx
import { Flex } from '@atlaskit/primitives/compiled';

<Flex as="ul" wrap="wrap" gap="space.200" justifyContent="space-between" alignItems="center">
	<div>Left</div>
	<div>Right</div>
</Flex>;
```

| Prop             | Type                                                                                 | Description                                              |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| `as`             | 'div'\|'span'\|'ul'\|'ol'\|'li'\|'dl'                                                | The DOM element to render as the Flex. Defaults to 'div' |
| `justifyContent` | 'center'\|'end'\|'space-around'\|'space-between'\|'space-evenly'\|'start'\|'stretch' | Used to align children along the main axis               |
| `alignItems`     | 'baseline'\|'center'\|'end'\|'start'\|'stretch'                                      | Used to align children along the cross axis              |
| `columnGap`      | `space.*` tokens                                                                     | Represents the space between each child                  |
| `gap`            | `space.*` tokens                                                                     | Represents the space between each child                  |
| `rowGap`         | `space.*` tokens                                                                     | Represents the space between each child                  |
| `direction`      | 'column'\|'row'                                                                      | Represents the flex direction property of CSS flexbox    |
| `wrap`           | 'nowrap'\|'wrap'                                                                     | Represents the flex wrap property of CSS flexbox         |
| `children`       | `ReactNode`                                                                          | Elements to be rendered inside the Flex                  |
| `ref`            | Ref                                                                                  | Forwarded ref element                                    |
| `testId`         | string                                                                               | Test ID for automated testing                            |
| `role`           | string                                                                               | ARIA role attribute                                      |

#### Stack

A component for creating basic vertical layouts with consistent spacing.

```tsx
import { Stack } from '@atlaskit/primitives/compiled';

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

| Prop          | Type                                | Description                                                                                                                                     |
| ------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`          | 'div'\|'span'\|'ul'\|'ol'\|'dl'     | The DOM element to render as the Stack. Defaults to 'div'                                                                                       |
| `alignBlock`  | 'center'\|'end'\|'start'\|'stretch' | Used to align children along the block axis (typically vertical)                                                                                |
| `alignInline` | 'center'\|'end'\|'start'\|'stretch' | Used to align children along the inline axis (typically horizontal)                                                                             |
| `spread`      | 'space-between'                     | Used to distribute the children along the main axis                                                                                             |
| `grow`        | 'hug'\|'fill'                       | Used to set whether the container should grow to fill the available space                                                                       |
| `space`       | `space.*` tokens                    | Represents the space between each child. These tokens are part of the Atlassian Design System and provide consistent spacing across components. |
| `children`    | `ReactNode`                         | Elements to be rendered inside the Stack                                                                                                        |
| `ref`         | Ref                                 | Forwarded ref element                                                                                                                           |
| `testId`      | string                              | Test ID for automated testing                                                                                                                   |
| `role`        | string                              | ARIA role attribute                                                                                                                             |

#### Inline

A component for creating horizontal layouts with consistent spacing.

```tsx
import { Inline } from '@atlaskit/primitives/compiled';

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

| Prop          | Type                                  | Description                                                               |
| ------------- | ------------------------------------- | ------------------------------------------------------------------------- |
| `as`          | 'div'\|'span'\|'ul'\|'ol'\|'li'\|'dl' | The DOM element to render as the Inline. Defaults to 'div'                |
| `alignBlock`  | 'center'\|'end'\|'start'\|'stretch'   | Used to align children along the block axis                               |
| `alignInline` | 'center'\|'end'\|'start'\|'stretch'   | Used to align children along the inline axis                              |
| `shouldWrap`  | boolean                               | Used to set whether children are forced onto one line or will wrap        |
| `spread`      | 'space-between'                       | Used to distribute the children along the main axis                       |
| `grow`        | 'hug'\|'fill'                         | Used to set whether the container should grow to fill the available space |
| `space`       | `space.*` tokens                      | Represents the space between each child                                   |
| `rowSpace`    | `space.*` tokens                      | Represents the space between rows when content wraps                      |
| `separator`   | string                                | Renders a separator string between each child                             |
| `children`    | `ReactNode`                           | Elements to be rendered inside the Inline                                 |
| `ref`         | Ref                                   | Forwarded ref element                                                     |
| `testId`      | string                                | Test ID for automated testing                                             |
| `role`        | string                                | ARIA role attribute                                                       |

#### Bleed

A utility for creating negative margin effects.

```tsx
import { Bleed } from '@atlaskit/primitives/compiled';

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
| `role`     | string           | ARIA role attribute                      |

#### Grid

A component for creating grid-based layouts.

```tsx
/** @jsx jsx */
import { cssMap, jsx } from '@atlaskit/css';
import { Grid } from '@atlaskit/primitives/compiled';

// Basic grid
<Grid gap="space.200">
	<div>Grid item 1</div>
	<div>Grid item 2</div>
</Grid>;

// With template areas
const styles = cssMap({
	grid: {
		gridTemplateAreas: `
			'header header'
			'sidebar content'
			'footer footer'
		`,
	},
});
<Grid xcss={styles.grid} gap="space.200">
	{/* Using `props.style` as an example, not good code: */}
	<div style={{ gridArea: 'header' }}>Header</div>
	<div style={{ gridArea: 'sidebar' }}>Sidebar</div>
	<div style={{ gridArea: 'content' }}>Content</div>
	<div style={{ gridArea: 'footer' }}>Footer</div>
</Grid>;
```

| Prop             | Type                                                                                 | Description                                               |
| ---------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `as`             | 'div'\|'span'\|'ul'\|'ol'                                                            | The DOM element to render as the Grid. Defaults to 'div'  |
| `justifyContent` | 'center'\|'end'\|'space-around'\|'space-between'\|'space-evenly'\|'start'\|'stretch' | Used to align children along the inline axis              |
| `justifyItems`   | 'center'\|'end'\|'start'\|'stretch'                                                  | Used to align the grid along the inline axis (deprecated) |
| `alignItems`     | 'baseline'\|'center'\|'end'\|'start'\|'stretch'                                      | Used to align children along the block axis               |
| `alignContent`   | 'center'\|'end'\|'space-around'\|'space-between'\|'space-evenly'\|'start'\|'stretch' | Used to align the grid along the block axis               |
| `columnGap`      | `space.*` tokens                                                                     | Represents the space between each column                  |
| `gap`            | `space.*` tokens                                                                     | Represents the space between each child across both axes  |
| `rowGap`         | `space.*` tokens                                                                     | Represents the space between each row                     |
| `autoFlow`       | 'column dense'\|'column'\|'dense'\|'row dense'\|'row'                                | Specifies how auto-placed items get flowed into the grid  |
| `children`       | `ReactNode`                                                                          | Elements to be rendered inside the grid                   |
| `id`             | string                                                                               | HTML id attribute                                         |
| `ref`            | Ref                                                                                  | Forwarded ref element                                     |
| `testId`         | string                                                                               | Test ID for automated testing                             |
| `role`           | string                                                                               | ARIA role attribute                                       |

#### Show

A primitive for conditionally showing content at specific breakpoints. By default, content is hidden
and will be shown at the specified breakpoint.

```tsx
/** @jsx jsx */
import { cssMap, jsx } from '@atlaskit/css';
import { Show } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

// Show content above medium breakpoint
<Show above="md">
  <div>This content shows on medium screens and up</div>
</Show>

// Show content below medium breakpoint
<Show below="md">
  <div>This content shows on small screens and down</div>
</Show>

// With custom element and styling
const styles = cssMap({
	show: {
    padding: token('space.200'),
    backgroundColor: token('elevation.surface'),
  }
})
<Show above="md" as="nav" xcss={styles.show}>
  <div>Navigation menu</div>
</Show>
```

| Prop       | Type                                          | Description                                                                                                                |
| ---------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `above`    | `'xs'\|'sm'\|'md'\|'lg'\|'xl'`                | Shows content above the specified breakpoint                                                                               |
| `below`    | `'xs'\|'sm'\|'md'\|'lg'\|'xl'`                | Shows content below the specified breakpoint                                                                               |
| `as`       | DOM elements such as `'div'\|'h1'\|'span'\|…` | The DOM element to render as. Defaults to 'div'                                                                            |
| `children` | `ReactNode`                                   | Content to be conditionally shown                                                                                          |
| `xcss`     | `StrictXCSSProp`                              | Apply a subset of permitted styles powered by Atlassian Design System design tokens. See the StrictXCSSProp section below. |
| `testId`   | string                                        | Test ID for automated testing                                                                                              |
| `role`     | string                                        | ARIA role attribute                                                                                                        |

Important notes:

- Only one of `above` or `below` can be used at a time
- Best used in combination with `<Hide>` for responsive content switching

#### Hide

A primitive for conditionally hiding content at specific breakpoints. By default, content is shown
and will be hidden at the specified breakpoint.

```tsx
import { cssMap, jsx } from '@atlaskit/css';
import { Hide } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

<Hide above="md">
  <div>This content hides on medium screens and up</div>
</Hide>

<Hide below="md">
  <div>This content hides on small screens and down</div>
</Hide>
```

| Prop       | Type                                          | Description                                                                                                                |
| ---------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `above`    | `'xs'\|'sm'\|'md'\|'lg'\|'xl'`                | Hides content above the specified breakpoint                                                                               |
| `below`    | `'xs'\|'sm'\|'md'\|'lg'\|'xl'`                | Hides content below the specified breakpoint                                                                               |
| `as`       | DOM elements such as `'div'\|'h1'\|'span'\|…` | The DOM element to render as. Defaults to 'div'                                                                            |
| `children` | `ReactNode`                                   | Content to be conditionally hidden                                                                                         |
| `xcss`     | `StrictXCSSProp`                              | Apply a subset of permitted styles powered by Atlassian Design System design tokens. See the StrictXCSSProp section below. |
| `testId`   | string                                        | Test ID for automated testing                                                                                              |
| `role`     | string                                        | ARIA role attribute                                                                                                        |

Important notes:

- Only one of `above` or `below` can be used at a time
- Best used in combination with `<Show>` for responsive content switching

### Utilities

#### StrictXCSSProp type

This is a type utility imported from `@atlaskit/css` that enforces the strict typing for `xcss`
styling props. It ensures that only valid CSS properties and design tokens can be used and has a
relatively strict type interface.

The underlying CSS Property type interface comes from
`import { type DesignTokenStyles } from '@atlaskit/tokens/css-type-schema';` and is merged with
`csstype` through `@compiled/react`'s `createStrictAPI` function.

##### General CSS properties

| CSS Property         | Example values                                                                     |
| -------------------- | ---------------------------------------------------------------------------------- |
| `appearance`         | `'none'\|'auto'`                                                                   |
| `backgroundColor`    | `'transparent'\|'var(--ds-background-neutral)'\|'var(--ds-background-brand-bold)'` |
| `blockSize`          | `'auto'\|'min-content'\|'100px'\|'2rem'\|'50%'`                                    |
| `border`             | `'none'\|'var(--ds-border-width) solid var(--ds-border)'`                          |
| `borderWidth`        | `'0'\|'var(--ds-border-width)'`                                                    |
| `borderColor`        | `'var(--ds-border)'\|'var(--ds-border-focused)'`                                   |
| `borderRadius`       | `'var(--ds-border-radius)'\|'var(--ds-border-radius-circle)'\|'inherit'`           |
| `boxShadow`          | `'var(--ds-shadow-raised)'\|'var(--ds-shadow-overlay)'\|'initial'`                 |
| `color`              | `'transparent'\|'var(--ds-text)'\|'var(--ds-text-brand)'`                          |
| `font`               | `'var(--ds-font-heading-large)'\|'var(--ds-font-body)'`                            |
| `fontFamily`         | `'var(--ds-font-family-heading)'\|'var(--ds-font-family-body)'`                    |
| `fontStyle`          | `'normal'\|'italic'`                                                               |
| `fontWeight`         | `'var(--ds-font-weight-regular)'\|'var(--ds-font-weight-bold)'`                    |
| `gap`                | `'var(--ds-space-100)'\|'var(--ds-space-200)' \| 0`                                |
| `height`             | `'auto'\|'min-content'\|'100px'\|'2rem'\|'50%'`                                    |
| `margin`             | `'var(--ds-space-100)'\|'auto'\|'0 auto' \| 0`                                     |
| `opacity`            | `'var(--ds-opacity-disabled)' \| 0 \| 1`                                           |
| `padding`            | `'var(--ds-space-100)'\|'var(--ds-space-200)' \| 0`                                |
| `textDecorationLine` | `'line-through'\|'underline'`                                                      |
| `width`              | `'auto'\|'min-content'\|'100px'\|'2rem'\|'50%'`                                    |
| `zIndex`             | `-1 \| 0 \| 100 \| 200 \| 300 \| 400 \| 500 \| 510 \| 600 \| 700 \| 800`           |

Most of these values are consistent across all longhand or related properties, eg. `padding`,
`paddingTop`, `paddingBlock`, etc. all share similar type interfaces.

##### Pseudo-class Properties

When used in a nested `&:hover { … }` pseudo style: | CSS Property | Example values | |-|-| |
`backgroundColor` |
`'var(--ds-background-neutral-hovered)'\|'var(--ds-background-brand-bold-hovered)'` |

When used in a nested `&:active { … }` pseudo style: | CSS Property | Example values | |-|-| |
`backgroundColor` |
`'var(--ds-background-neutral-pressed)'\|'var(--ds-background-brand-bold-pressed)'` | | `color` |
`'var(--ds-link-pressed)'\|'var(--ds-link-visited-pressed)'` |

##### Media Queries

Only specific Atlassian Design System media queries (defined below) are allowed, additionally we
allow `'@media (prefers-reduced-motion: reduce)'` and
`'@media screen and (forced-colors: active), screen and (-ms-high-contrast: active)'`.

#### Breakpoints and Media Queries

The Atlassian Design System provides a set of predefined breakpoints and media query helpers for
responsive design.

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

### Usage Examples

#### An Avatar positioned next to a label

```tsx
import { Stack, Inline, Text } from '@atlaskit/primitives/compiled';

<Stack space="space.200">
	<Inline alignBlock="center" space="space.100">
		<Avatar />
		<Text>Label</Text>
	</Inline>
</Stack>;
```

#### A Grid of icons

```tsx
import { cssMap } from '@atlaskit/css';
import { Box, Grid, Inline, Text } from '@atlaskit/primitives/compiled';

const styles = cssMap({
	container: {
		maxWidth: '1040px',
		margin: '0 auto',
		padding: token('space.600'),
	},
	grid: {
		gridTemplateColumns: 'repeat(2, 1fr)',
		gap: token('space.200'),
	},
});

export default (props: { icons: { icon: React.ReactNode; label: string }[] }) => (
	<Box xcss={styles.container}>
		<Grid xcss={styles.grid}>
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

#### Card Layout

```tsx
import Avatar from '@atlaskit/avatar';
import { cssMap } from '@atlaskit/css';
import Heading from '@atlaskit/heading';
import { Box, Stack, Inline Text } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

const styles = cssMap({
  card: {
    padding: token('space.200'),
    borderRadius: token('radius.small'),
  }
});

<Box backgroundColor="elevation.surface.raised" xcss={styles.card}>
  <Stack space="space.300">
    <Inline alignBlock="start" space="space.100">
      <Avatar />
      <Heading>Title</Heading>
    </Inline>
    <Text>Description</Text>
  </Stack>
</Box>
```

### Best Practices

1. Use `@atlaskit/primitives/compiled` instead of `@atlaskit/primitives`
2. Use `@atlaskit/css` for styling instead of `xcss()`
3. Leverage design tokens for consistent styling
4. Replace direct CSS variable usage such as `var(--ds-text)` with their associated token call such
   as `token('color.text')`
5. Compose primitives and components together to create complex interfaces
6. Use the appropriate primitive for the layout pattern (`Stack` for vertical, `Inline` for
   horizontal)
7. Use direct token strings in Primitive props (e.g., `space="space.200"`), but use `token()`
   elsewhere
8. Follow accessible and responsive design patterns

## Atlassian UI Styling Standard

> A comprehensive set of ESLint rules and principles that enforce consistent styling practices
> across Atlassian's frontend codebases. These standards ensure maintainable, performant, and
> accessible UI code by promoting the use of design tokens, proper CSS-in-JS patterns, and modern
> styling approaches.

### Core Principles

#### Good CSS-in-JS

Use `@atlaskit/css` for styling components, avoiding other CSS-in-JS libraries by default, but
falling back to `@compiled/react` when necessary.

`@atlaskit/css` is a typescript variant of `@compiled/react` that only allows specific values for
certain CSS properties, doesn't allow nested selectors, only allows specific media queries, etc., to
match the Atlassian Design System.

Always prefer `cssMap()` or `css()` calls over `styled.div` or `styled(Component)` APIs for
maintainability and performance overhead.

```tsx
/** @jsx jsx */
import { css, cssMap, jsx } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

const styles = css({
	padding: token('space.200'),
});

const appearanceStyles = cssMap({
	primary: { backgroundColor: token('color.background.brand') },
	bold: { backgroundColor: token('color.background.brand.bold') },
	danger: { backgroundColor: token('color.background.danger') },
});

type Appearance = 'primary' | 'bold' | 'danger';
const Component = ({ appearance = 'primary' }: { appearance: Appearance }) => (
	<div css={[styles, appearanceStyles[appearance]]} />
);
```

#### Which styling props to use

There are four main props that are relevant:

1. `props.className` – This is how styles are sent to the DOM, but this prop should almost never be
   used directly. If the component allows `props.className`, it allows `props.css`.
2. `props.css` — This is the prop that Compiled uses to inject styles. Under the hood, Compiled maps
   to `props.className`.
3. `props.xcss` — This is the prop that reusable components use to allow bounded style overrides,
   letting consumers tweak things like color or margin to predefined values. This prop can have
   other names, but must always end in `xcss`.
4. `props.style` – This is how styles are sent to the DOM. This prop should be used sparingly, only
   when working with purely dynamic values only known at runtime.

With native components, only `props.css` should be used; `<div xcss={…}>` is never valid. With
custom or reusable components, typically `props.xcss` should be used, eg. `<Box xcss={…}>` or
`<CustomTable xcss={…} headXcss={…}>`.

#### Design Token Usage

Always use design tokens instead of hardcoded values to ensure consistency and theme support.

```tsx
/** @jsx jsx */
import { cssMap, jsx } from '@atlaskit/css';
import { Box } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

const styles = cssMap({
  root: {
    padding: token('space.200'),
    color: token('color.text.inverse')
  },
});

<Box xcss={styles.root} backgroundColor="color.background.brand">
```

#### Component Styling

For components, if `props.xcss` is available, use that prop. For native elements, use `<div css>`
instead.

```tsx
const styles = cssMap({
  root: { padding: token('space.100') },
});

<Component xcss={styles.root} />
<div css={styles.root} />
```

### Key Rules

#### No Styled Components

Do not use `styled-components` or `@emotion/*`, only use `@atlaskit/css` (preferred) or
`@compiled/react` for styling components.

#### No Dynamic Styles

Prevents the use of dynamic styles in CSS-in-JS calls to ensure static analysis.

```tsx
/** @jsx jsx */
import { cssMap, jsx } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';
import { fg } from '@atlaskit/platform-feature-flags';

const styles = cssMap({
	root: { backgroundColor: token('color.background.neutral') },
	active: { backgroundColor: token('color.background.brand.bold') },
	fgPlatformCompactComponent: { padding: token('space.050') },
});

const GoodExample = (props) => (
	<div
		css={[
			styles.root,
			props.isActive && styles.active,
			fg('platform-compact-component') && styles.fgPlatformCompactComponent,
		]}
	/>
);
```

#### No Global Styles

Prevents global styles through CSS-in-JS or CSS module imports.

#### No Nested Selectors

No usage of nested selectors within CSS styling, eg. `& > div` or `& span`

### When to use `@atlaskit/css` vs. `@compiled/react`

Prefer `@atlaskit/css` at all times, this is a typescript bounded variant of `@compiled/react`,
though be aware if you need `keyframes`, it's only available in `@compiled/react` for now.

- With Primitives such as `<Box xcss>` and `<Pressable xcss>` from `@atlaskit/primitives/compiled`,
  you must use `cssMap()` from `@atlaskit/css`.
- If our Primitives are too limiting, you can use native `<div css>` with `@atlaskit/css`'s `css()`
  and `cssMap()`
- You can mix `<div css={[atlaskitCssStyles, compiledStyles]}>` from `@atlaskit/css` and
  `@compiled/react`
- If both Primitives and `@atlaskit/css` are too limiting, you can use `<div css>` with
  `@compiled/react`

### Common issues

#### JSX Pragma

You require a JSX Pragma in scope. Using the classic runtime:

```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 * @jsxFrag jsx
 */
import { css, jsx } from '@atlaskit/css'; // or `@compiled/react`
```

#### Typescript errors with `@atlaskit/css`

When working with `@atlaskit/css`, you will encounter typescript errors. Do not ever `@ts-ignore` or
`@ts-expect-error` these.

Typical issues:

- If a CSS value is failing, that value is not allowed, you typically require a token value
- The prop interface for many elements is very strict
- If a nested selector is failing, it is not allowed

#### Typescript errors with `props.style` and CSS variables

When working with the style prop and css variables, you need to assert `React.CSSProperties`:

```tsx
<div css={{ '--local-width': props.width } as React.CSSProperties} />
```

## Atlassian Design System - Content Standards

### Table of Contents

- [Accessibility Guidelines](#1-accessibility-guidelines)
  - Text and Labels
  - Navigation and Interaction
  - Component-Specific Requirements
  - Design Considerations
- [Inclusive Language Standard](#2-inclusive-language-standard)
  - Use Words That Reflect Our Diverse World
  - Make Content Easy to Understand
  - Describing People
- [Language and Grammar](#3-language-and-grammar)
  - Link Text Punctuation
  - Abbreviations
  - Contractions and Apostrophes
  - Lists and Formatting
  - Colons and Punctuation
  - Pronouns and Voice
  - Documentation and Headers
  - Style Principles
  - Numbers and Numerals
  - Ellipsis (...)
  - Active Voice
  - Text Formatting
  - Capitalization and Case
- [Date and Time](#4-date-and-time)
  - Date Formatting
  - Time Formatting
- [Voice and Tone Standard](#5-voice-and-tone-standard)
  - Brand Personality
  - Tone Adaptation by Context and User State
- [Message Design](#6-message-design)
  - Message Types
  - Message Length Guidelines
  - Visual Guidelines

For component-specific guidelines, refer to our
[Atlassian Design System Components LLMs file](https://atlassian.design/llms-components.txt) or
child pages of [Atlassian Design System Components](https://atlassian.design/components)

### Scope

These Atlassian Design System (ADS) content standards are specifically designed for Atlassian's app
(product) UI copy.

They help:

- Guide the creation of quality interfaces and applications
- Provide consistent standards across all Atlassian products
- Ensure accessibility and inclusivity in all content

There are other content standards that may apply to the content that Atlassian users are working on.
If they can't find what they need here, you can direct them to
[Content Design Standards](https://go.atlassian.com/cd-standards) (you will not have access to this
page, only an Atlassian employee can access it).

### Core Content Standards

Primary source: [ADS Content Foundation](https://atlassian.design/foundations/content) and its child
pages. Additional content guidance can be found in component usage documentation under
[Components](https://atlassian.design/components).

#### 1. Accessibility Guidelines

Source: [Accessibility Foundation](https://atlassian.design/foundations/accessibility)

Core Principles:

- Write content that is accessible to all users
- Design for people, not just compliance
- Consider accessibility from the start of design

Guidelines:

##### 1. Text and Labels

- Ensure all interactive elements have visible, accessible labels
- Never rely on placeholder text for critical information
- Provide clear error messages and feedback
- Use sufficient color contrast for all text
- Keep messages concise and scannable

##### 2. Navigation and Interaction

- Support keyboard navigation
- Ensure screen reader compatibility
- Provide multiple ways to dismiss or close elements
- Match mobile keyboard to input type
- Use standard HTML elements and attributes where possible

##### 3. Component-Specific Requirements

- Forms: Include legends for required fields
- Tooltips: Make available to screen readers
- Buttons: Never rely on color alone for state
- Messages: Include icon labels for visual indicators
- Modals: Ensure proper focus management

##### 4. Design Considerations

- Visual disabilities: Provide good alternative text and semantic HTML
- Hearing disabilities: Provide non-auditory formats
- Limited mobility: Support keyboard navigation and large targets
- Cognitive disabilities: Use clear, easy-to-navigate design
- Multiple/compound disabilities: Consider intersectional needs
- Inclusive language: Support localization and cultural inclusivity

#### 2. Inclusive Language Standard

Source: [Inclusive Language Standard](https://atlassian.design/content/inclusive-writing)

- Create content that is inclusive and accessible
- Carefully consider word choice and terminology
- Avoid potentially exclusionary language
- Focus on respectful, welcoming communication

Key Principles:

##### 1. Use Words That Reflect Our Diverse World

- Avoid assumptions and stereotypes
- Write for all kinds of people
- Consider how language helps or harms
- Focus on respectful communication

##### 2. Make Content Easy to Understand

- Use plain language
- Remove jargon, metaphors, and idioms
- Use simple wording for faster task completion
- Avoid context-specific terminology

##### 3. Describing People

- Use person-first language
- Use specific terms for racial and ethnic groups
- Don't modify terms artificially

**Examples:**

**Good:**

- "Alternative text helps people who use assistive technology"
- "Learn more about accessibility features"

**Avoid:**

- "Alternative text helps people with visual disabilities"
- "Click here to learn about accessibility"

#### 3. Language and Grammar

Source: [Language and Grammar Guideline](https://atlassian.design/content/language-and-grammar)

- Follow consistent writing conventions
- Ensure content is clear and unambiguous
- Write with localization in mind
- Maintain consistent style across products

Style Guidelines:

##### 1. Link Text Punctuation

Source:
[Language and Grammar - Link Text Punctuation](https://atlassian.design/content/language-and-grammar#link-text-punctuation)

- Standalone links:
  - Do not include periods at the end
  - Example: "Learn more" or "View all projects"
- Links in sentences:
  - Include punctuation if part of sentence structure
  - Place punctuation outside the link text
  - Example: "Check out our [getting started guide]."

##### 2. Abbreviations

Source:
[Language and Grammar - Abbreviations](https://atlassian.design/content/language-and-grammar#abbreviations)

- Don't use internal abbreviations in customer-facing copy
- Don't use apostrophes for plural abbreviations
- Don't use i.e. or e.g. (not localization friendly)
- Yes: Jira Service Desk, jira.atlassian.com
- No: JSD, JAC, DAC, CD's, 1980's

**Examples:**

**Good:**

- Jira Service Desk, jira.atlassian.com, developer.atlassian.com

**Avoid:**

- JSD, JAC, DAC, CD's, 1980's, i.e., e.g.

##### 3. Contractions and Apostrophes

Source:
[Language and Grammar - Contractions and Apostrophes](https://atlassian.design/content/language-and-grammar#contractions)

- Use contractions for a conversational, friendly voice
- Use curly apostrophes in UI copy (press option+[ and option+shift+[ on Mac or Alt+0145, Alt+0146,
  Alt+0147, Alt+0148 on Windows)

**Examples:**

**Good:**

- Can't, don't, it's

**Avoid:**

- Cannot, can not, it is, it's (not curly)

**Possessives:**

- Use 's to show possession, even if word ends in s
- Always use curly apostrophes

##### 4. Lists and Formatting

Source:
[Language and Grammar - Lists and Formatting](https://atlassian.design/content/language-and-grammar#lists)

**Lists and Formatting:**

- Use lists to draw the reader's eye and make items easier to scan and follow
- Keep lists concise and focused on key points
- Maintain consistent formatting within each list
- Use parallel structure for list items
- Break up long paragraphs with lists when appropriate

**Bulleted Lists:**

- Use for options or when order doesn't matter
- Phrase items in parallel way
- Start with lowercase if completing intro sentence
- Skip periods for fragments
- Limit to six items or fewer

**Numbered Lists:**

- Use for tasks or when order matters
- Capitalize first word in each item
- End items with periods
- Don't create lists for two or fewer steps

##### 5. Colons and Punctuation

Source:
[Language and Grammar - Colons and Punctuation](https://atlassian.design/content/language-and-grammar#colons)

- Use colons to introduce lists or steps
- Don't use colons at end of headings
- Put punctuation inside quotation marks
- Use curly quotes in UI copy (option+[ and option+shift+[ on Mac or Alt+0147 and Alt+0148 on
  Windows)

##### 6. Pronouns and Voice

Source:
[Language and Grammar - Pronouns and Voice](https://atlassian.design/content/language-and-grammar#pronouns)

- Default to second person (you)
- For UI elements:
  - Use "your" when system presents information
  - Use "my/mine" when user performs action
  - When possible, avoid both

**Examples:**

**Good:**

- "Bitbucket will change your life"
- "Your team will love using pull requests"

**Avoid:**

- "Teams love using pull requests"

##### 7. Documentation and Headers

Source:
[Language and Grammar - Titles and Headings](https://atlassian.design/content/language-and-grammar#titles-and-headings)

- Use action verbs in H1s
- Avoid gerunds
- Articles usage:
  - Skip in buttons and labels
  - Use in conversational sections
  - Use in complex concept explanations

**Examples:**

**Good:**

- "Create a page"

**Avoid:**

- "Creating a page"

##### 8. Style Principles

Source:
[Language and Grammar - Style Principles](https://atlassian.design/content/language-and-grammar#style-principles)

1. Avoid common metaphors and figures of speech
2. Use shorter words when possible
3. Omit unnecessary words
4. Use active voice
5. Choose everyday words over jargon

##### 9. Numbers and Numerals

Source:
[Language and Grammar - Numbers](https://atlassian.design/content/language-and-grammar#numbers)

Use digits rather than words in most cases

**Exceptions:**

- If a number starts a sentence, write it out
- In common expressions, write out the number (e.g., "one thing after another")
- For long-form or formal content, write out numbers one to nine
- Write out 'zero' and 'one' if they could be confused with letters L, I, or O

**Number Ranges:**

- Use 'to' instead of hyphens (except if space is limited)
- Example: "View rows 1 to 4" (not "1-4")

**Numbers 'out of':**

- Use 'of' rather than forward slash (/)
- Example: "6 of 10 users" (not "6/10 users")
- Exception: Use slash if space is limited

**Numbers from 1,000:**

- Use comma to show thousands
- Examples: 4,500; 10,000; 1,250,000

##### 10. Ellipsis (...)

Source:
[Language and Grammar - Ellipsis](https://atlassian.design/content/language-and-grammar#ellipses---)

- Use in UI elements to indicate:
  - An action will need additional input or configuration
  - A dialog or new window will open
  - More content is available but truncated

**Button Examples:**

**Good:**

- "Export as...", "Share with...", "Configure..."

**Avoid:**

- "Save...", "Delete...", "Cancel..."

**Text Truncation:**

- Use for truncated text that has a way to view the full content
- Ensure the full text is available via tooltip or expansion
- Don't use for decorative purposes
- Don't use in error messages or system notifications

**More Actions (meatballs):**

- The three dot icon is called "More actions"
- For terminology and naming conventions, refer to [go/vocab](https://go.atlassian.com/vocab)
  (available only to Atlassian employees)

**Loading States:**

- Don't use ellipsis for loading states
- Use proper loading indicators instead

**Formatting:**

- Use three dots (...) without spaces
- No space between last word and ellipsis
- For buttons, only use when additional input is required

**When Not to Use:**

- Simple actions that execute immediately
- Confirmations that use a modal dialog
- Navigation links
- Menu items that expand/collapse
- Loading indicators or progress states

##### 11. Active Voice

Source:
[Language and Grammar - Active Voice](https://atlassian.design/content/language-and-grammar#active-voice)

**Use active voice primarily**

**Examples:**

**Good:**

- "Administrators control user access"

**Avoid:**

- "User access is controlled by administrators"

##### 12. Text Formatting

Sources:

- [Language and Grammar - Bold](https://atlassian.design/content/language-and-grammar#bold)
- [Language and Grammar - Italics](https://atlassian.design/content/language-and-grammar#italics)
- [Language and Grammar - Monospaced Text](https://atlassian.design/content/language-and-grammar#monospaced-text)
- [Language and Grammar - UI Elements](https://atlassian.design/content/language-and-grammar#ui-elements)

**Bold:**

- Use for key phrases and UI elements

**Examples:**

**Good:**

- Go to **General Configuration** > **User Macros**

**Avoid:**

- Go to **the settings page and select Configuration**

**Italics:**

**Use italics for:**

- Emphasis
- Citations
- Defining a term
- UI elements that might change, like a field name or user input
- Places where you would normally use bold but the UI doesn't support it

**Don't use italics if the item is also a hyperlink.**

**Examples:**

**Good:**

- A JIRA workflow is the set of _statuses_ and _transitions_ that a work item goes through during
  its lifecycle.
- According to the 2008 _IT Unplugged_ report, IT is really unplugged!
- For example, if you create a metric called _Time to resolution_, other projects can create metrics
  with that name.

**Avoid:**

- To learn more, see the _2008 IT Unplugged report_ (Don't use italics for hyperlinks)
- In your project, select _Settings_>_Request types_ (Use bold for static UI elements)

**Monospaced Text:**

**Use monospaced font for names of a file or directory.** It is mostly used in administrator and
developer docs.

**Example:** The location of the Home directory is stored in a configuration file called
`confluence-init.properties` which is located in the `confluence/WEB-INF/classes directory` in your
Confluence Installation directory.

##### 13. Capitalization and Case

Sources:

- [Language and Grammar - Capitalization](https://atlassian.design/content/language-and-grammar#capitalization)
- [Language and Grammar - Titles and Headings](https://atlassian.design/content/language-and-grammar#titles-and-headings)

- Use sentence case as the default for all UI text:
  - Titles and headings
  - Buttons and labels
  - Menu items
  - Messages and notifications
  - Form fields and placeholders
  - Tooltips
  - Navigation items

**Sentence Case Rules:**

- Capitalize the first word
- Capitalize proper nouns and product names
- Keep everything else lowercase
- Don't use periods at the end (unless in a complete sentence)

**Examples:**

**Good:**

- "Create a new project"
- "Export to PDF"
- "Connect to Jira"
- "Your recent items"

**Avoid:**

- "Create A New Project"
- "EXPORT TO PDF"
- "Connect To Jira"
- "Your Recent Items"

**Exceptions:**

- Registered trademarks (follow their official capitalization)
- Acronyms (keep all caps)
- Code references (maintain exact case)
- User-generated content (preserve original case)

##### 14. Quotation Marks

Sources:

- [Language and Grammar - Quotation Marks](https://atlassian.design/content/language-and-grammar#quotation-marks)
- [Language and Grammar - Direct Quotes](https://atlassian.design/content/language-and-grammar#direct-quotes)

**Use double quotes ("") for direct quotes.** For UI elements, page titles, and other objects, use
bold or italicized text as appropriate.

**Use curly quotes in any UI or body copy,** unless you're writing in code or there is a semantic
reason to use straight quotes.

**Punctuation goes inside the quotation marks.**

**Creating Curly Quotation Marks:**

- Mac: Use `option+[` for opening and `option+shift+[` for closing quotation marks
- Windows: Use `Alt+0147` for opening and `Alt+0148` for closing quotation marks

**Examples:**

**Good:**

- "We have big things planned for the coming year," said Mike and Scott.
- He called quokkas "the cutest animal ever."

**Avoid:**

- Add a comment to the "Team processes" page. (Use bold instead: Add a comment to the **Team
  processes** page)
- The shark said "Surfers are delicious". (Punctuation should go inside: "Surfers are delicious.")

**When NOT to Use Quotation Marks:**

- For UI elements → Use **bold** or _italics_ instead
- For page titles → Use **bold** or _italics_ instead
- For other objects → Use **bold** or _italics_ instead

**Related Guidelines:**

- See also: Direct quotes section
- See also: Contractions and apostrophes (for curly apostrophe creation)

##### 15. Dashes

Source:
[Language and Grammar - Dashes](https://atlassian.design/content/language-and-grammar#dashes)

**Use spaced em dashes sparingly** to indicate an abrupt or dramatic change in a sentence — like
this. If the break happens in the middle of a sentence — like this — use em dashes on either side of
the phrase.

**Em dashes can help avoid confusion** when the phrase being set apart contains several commas, such
as a mid-sentence list. In general, though, try to keep sentences as short and simple as possible to
avoid excessively complex punctuation.

**Use spaces on either side of an em dash.** Use `option-shift-hyphen` to make an em dash on a Mac.

**Don't use a dash or hyphen for ranges of numbers,** unless space is limited. Use 'to' instead.

**Examples:**

**Good:**

- The newly released Jira 6 — our best Jira yet — will be available next week.
- He said his friends — Mike, Charlie, and Scott — would be arriving late. They should arrive
  anywhere from 2 to 4 pm.

**Avoid:**

- The newly released Jira 6—our best Jira yet—will be available next week. (No spaces)
- He said his friends - Mike, Charlie, and Scott - would be arriving late. They should arrive
  anywhere from 2–4 pm. (Wrong dash type, hyphen for range)

##### 16. Exclamation Marks

Source:
[Language and Grammar - Exclamation Marks](https://atlassian.design/content/language-and-grammar#exclamation-marks)

**Avoid exclamation marks!** They should only be used for exciting or new things! **At most, there
should only be one exclamation mark per page!**

**Use sparingly and only for:**

- Genuinely exciting announcements
- New feature introductions
- Celebratory moments

**Avoid for:**

- Regular instructions or information
- Error messages or warnings
- Routine confirmations

##### 17. Gender-Inclusive Language

Source:
[Language and Grammar - Gender](https://atlassian.design/content/language-and-grammar#gender)

**When possible, avoid gendered pronouns.** If you can't, then _they_ or _their_ is preferable to
_his or her_ or _he or she_.

**Examples:**

**Good:**

- Ask your admin to add you.
- Ask your admin if they can add you.

**Avoid:**

- Ask your admin if he or she can add you.

##### 18. Hyphens

Source:
[Language and Grammar - Hyphens](https://atlassian.design/content/language-and-grammar#hyphens)

**Use hyphens to form a single idea from multiple words.** In general, only use hyphens when they
help to avoid confusion or ambiguity.

**Compound Modifiers:** When two or more words function together as a descriptor or adjective
(compound modifier), typically hyphenate those words if they precede the noun they describe, but
don't hyphenate if they come after the noun. There are exceptions with the word "very" or any
adverbs ending in -ly.

**Prefixes:** Most prefixes don't require hyphens to be understood. Only use a hyphen if not doing
so causes confusion or ambiguity.

**Examples:**

**Good:**

- Fast-moving trucks, ice-cold drinks, dog-friendly hotels. The hotel is dog friendly.
- Autocorrect, coworker, and preexisting are all fine without a hyphen.
- Recreating in a park vs. re-creating a page. I could resign from my job one day, then re-sign my
  contract the next.

**Avoid:**

- Very-interesting topics, poorly-worded sentences. (Don't hyphenate with "very" or "-ly" adverbs)
- Nonlife-threatening (creates nonsense word "nonlife")

##### 19. Oxford Comma

Source:
[Language and Grammar - Oxford Comma](https://atlassian.design/content/language-and-grammar#oxford-comma)

**Use the Oxford or serial comma** to offset the final item in a list.

**Examples:**

**Good:**

- We use sentence case in all titles, headings, menu items, and buttons.

**Avoid:**

- We use sentence case in all titles, headings, menu items and buttons.

##### 20. Periods (Full Stops)

Source:
[Language and Grammar - Periods](https://atlassian.design/content/language-and-grammar#periods-full-stops)

**Use a period at the end of complete sentences,** including in the description text of products,
messages, and notifications. Add only one space after a period.

**This includes sentences where the link is part of the sentence.** Don't hyperlink the period.

**Don't use periods in:**

- Headers, titles
- Tooltips
- Field descriptions
- Menu names
- Even if they are full sentences

**Bulleted Lists:** Only use periods in a bulleted list if the list item is a complete sentence.
Don't add a period at the end of a list of fragments.

**Examples:**

**Good:**

- Atlassian's work is guided by five core values.

**Avoid:**

- Atlassian's work is guided by five core values (Missing period)

##### 21. Possessives

Source:
[Language and Grammar - Possessives](https://atlassian.design/content/language-and-grammar#possessives)

**Use 's to show possession, even if the word ends in s.** Use curly apostrophes by typing
`option+shift+]` on Mac or `Alt+0146` on Windows.

**Examples:**

**Good:**

- James's book
- a week's time

**Avoid:**

- James' book

##### 22. UI Elements

Source: [Language and Grammar - UI Elements](https://atlassian.design/content/language-and-grammar)

**Guidelines for referencing UI elements in text:**

- Use sentence case, even if the UI element does not
- Use bold to call out the UI element in a step. Don't bold the >
- If the UI element has an icon, use both the name and the icon

**Example:** Go to **More •••** > **Link work**.

##### 23. US English

Source:
[Language and Grammar - US English](https://atlassian.design/content/language-and-grammar#us-english)

**We write with US English spelling and punctuation,** but our Australian roots are still part of
our personality. Communications from Australians can use Australian English such as _colour_,
_optimise, theatre_.

**Examples:**

- Aussie PMs writing JAC comments to customers can use Australian English
- Developers should code in US English

**Good:**

- What kind of cookie would you like with your coffee, friend?

**Avoid:**

- Which biscuit do ya want with your cuppa, mate?

#### 4. Date and Time

Source: [Date and Time Guideline](https://atlassian.design/content/date-time)

- Use consistent date and time formats
- Consider international audiences
- Be clear and unambiguous
- Follow localization best practices

##### Date Formatting:

**1. Abbreviations**

**Days:**

- Mon, Tue, Wed, Thu, Fri, Sat, Sun
- Don't use single letters (M, T, W)

**Months:**

- Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
- Keep "May" as is
- Don't use single letters

**2. American English Format**

Long Date:

- Monday, January 8, 2020
- Use numerals for day
- Spell out month and day
- Use four-digit year
- Don't use ordinals (1st, 2nd, 3rd)

Medium Date:

- January 8, 2020
- Spell out month
- Use numerals for day and year

Short Date:

- Jan 8, 2020
- Use month abbreviation
- Use numerals for day and year

**3. Numerical Dates**

- Avoid if possible due to regional differences
- If necessary, use ISO 8601: YYYY-MM-DD
- Example: 2021-05-23
- Use hyphens to separate elements

##### Time Formatting:

**1. Standard Time**

- Use numbers for clarity
- Format: 3:30 p.m. (space before a.m./p.m.)
- Omit :00 for exact hours (8 a.m., not 8:00 a.m.)
- Use periods in a.m. and p.m.
- For ranges in same period: 6:30-10 p.m.
- For ranges crossing periods: 10 a.m.-2 p.m.

**2. Special Times**

- Use 'noon', 'midday', or 'midnight' instead of 12 a.m./p.m.
- 24-hour format: 00:00 to 23:59
- Use colons to separate hours:minutes:seconds
- Example: 13:45:30

**3. Relative Time**

**Past:**

- Just now (few seconds)
- X minutes ago (within 59 minutes)
- X hours ago
- Yesterday
- X days ago (2-7 days)
- Date stamp (>7 days)

**Future:**

- Shortly (few seconds)
- In X minutes
- In X hours
- Tomorrow
- In X days
- Date stamp (>7 days)

#### 5. Voice and Tone Standard

Source: [Voice and Tone Standard](https://atlassian.design/content/voice-tone)

Core Voice Characteristics:

- Clear and direct
- Professional yet approachable
- Helpful and empowering
- Consistent across communications
- Localization-friendly

##### Brand Personality:

**1. Bold**

- Motivate teams to do their best work
- Offer best practices and direction
- Give accurate information for educated decisions
- Understand user struggles and desired outcomes

**2. Optimistic**

- Focus on key points that help users now
- Build confidence in products
- Create seamless experiences
- Keep teams informed of opportunities

**3. Practical, with a Wink**

- Be direct and concise
- Offer help at the right moment
- Write clear, accurate text
- Make content universally understandable
- Add appropriate moments of delight

##### Tone Adaptation by Context and User State:

**1. New Users and Learning**

- When: New users, evaluators, introducing concepts
- User State: Apprehensive, confused, learning
- Approach:
  - Be more prescriptive and clear
  - Focus on building trust
  - Explain benefits thoroughly
  - Use supportive, encouraging language
- Examples:
  - "Welcome! Let's set up your workspace together."
  - "Here's what you need to know about projects."

**2. Power Users and Productivity**

- When: Power users, admins, everyday tasks
- User State: Confident, interested, focused
- Approach:
  - Be direct and efficient
  - Focus on advanced capabilities
  - Highlight shortcuts and optimizations
  - Use technical language appropriately
- Examples:
  - "Configure advanced permissions in bulk."
  - "Keyboard shortcut: ⌘ + K to search."

**3. Problem Resolution**

- When: Errors, warnings, troubleshooting
- User State: Frustrated, stressed, blocked
- Approach:
  - Be clear and calm
  - Focus on solutions
  - Show empathy without being overly apologetic
  - Maintain professionalism
- Examples:
  - "Your changes couldn't be saved. Try these steps to resolve it."
  - "Warning: This action will permanently delete the item."

**4. Success and Achievement**

- When: Task completion, milestones, new features
- User State: Successful, joyful, proud
- Approach:
  - Be celebratory but not overwhelming
  - Acknowledge user accomplishment
  - Keep focus on next steps
  - Match celebration to achievement level
- Examples:
  - "Great work! Your project is ready to share."
  - "You've completed all onboarding tasks."

**5. Educational Content**

- When: Documentation, help articles, tutorials
- User State: Learning, exploring, problem-solving
- Approach:
  - Be thorough but scannable
  - Focus on task completion
  - Use step-by-step guidance
  - Include examples where helpful
- Examples:
  - "Follow these steps to customize your dashboard."
  - "Learn how to set up your first project."

#### 6. Message Design

Source: [Message Design Guideline](https://atlassian.design/content/designing-messages)

##### 1. Information Messages

Source:
[Writing Info Messages](https://atlassian.design/content/designing-messages/writing-an-info-message)

- Provides additional information to motivate people
- Components: Empty state, Banner, Flag, Section message, Inline message, Modal dialog, Benefits
  modal, Onboarding spotlight
- Use blue circle icon with 'i' inside
- Appropriate for providing context and guidance

##### 2. Success Messages

Source:
[Writing Success Messages](https://atlassian.design/content/designing-messages/writing-a-success-message)

- Celebrates user accomplishments
- Components: Empty state, Banner, Flag, Section message, Inline message, Modal dialog
- Use green check icon
- Confirm completion of tasks or actions

##### 3. Warning Messages

Source:
[Writing Warning Messages](https://atlassian.design/content/designing-messages/writing-a-warning-message)

- Alerts about potential data loss or errors
- Components: Empty state, Banner, Flag, Section message, Inline message
- Use yellow triangle icon with exclamation mark
- Give advance notice of important changes

##### 4. Error Messages

Source:
[Writing Error Messages](https://atlassian.design/content/designing-messages/writing-error-messages)

- Alerts users of problems and provides next steps
- Components: Flag, Inline message
- Use red diamond icon with exclamation mark
- Must include clear resolution steps

##### 5. Empty State Messages

Source: [Empty State Messages](https://atlassian.design/content/designing-messages/empty-state)

- Explains why content is not present
- Provides clear next steps or actions
- Keep tone helpful and encouraging
- Match tone to context:
  - First-time view: Inspirational, motivating
  - Task completion: Celebratory
  - No results: Neutral with clear next steps

**Examples:**

- Good: "No projects yet. Create your first project to get started."
- Avoid: "Nothing here", "No data found"

##### 6. Feature Discovery

Source:
[Feature Discovery Messages](https://atlassian.design/content/designing-messages/feature-discovery)

- Introduces new features or experience changes
- Components: Onboarding spotlight, Spotlight card
- Use purple circle icon with question mark
- Focus on value and benefits

##### Message Length Guidelines:

- General messages: Maximum 5 lines
- Onboarding spotlights: Maximum 2 lines
- Error messages: Keep concise, focus on solution
- Success messages: Brief confirmation
- Warning messages: Clear but thorough explanation
- Information messages: Concise, scannable content
- Empty states: Clear explanation with next steps

##### Visual Guidelines:

- Use consistent color roles for message types
- Include appropriate icons to indicate content and urgency
- Maintain consistent visual hierarchy
- Ensure adequate contrast for accessibility
- Follow component-specific layout guidelines