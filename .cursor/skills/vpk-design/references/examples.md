<!-- AUTO-GENERATED FILE, DO NOT EDIT -->
## @atlaskit/avatar Package
### Avatar component
A component for displaying user avatars with support for images, initials, and status indicators. An avatar is a visual representation of a user or entity. It can display user images, initials, presence indicators, and status indicators. Avatars help users quickly identify people and entities in your application. They provide visual context and make interfaces more personal and engaging.
- **Keywords:** avatar, user, profile, image, presence, status, representation
- **Categories:** images, data-display
- **Status:** general-availability
#### Example
```tsx
import Avatar from '@atlaskit/avatar';
export default [
	<Avatar src="https://example.com/avatar.jpg" name="John Doe" />,
	<Avatar name="Jane Smith" size="large" status="locked" />,
	<Avatar name="Bob Wilson" size="small" presence="online" status="approved" />,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `appearance` | `"circle" \| "square"` | Indicates the shape of the avatar |
| `as` | `keyof global.JSX.IntrinsicElements \| ComponentType<AllHTMLAttributes<HTMLElement>>` | Replace the wrapping element |
| `borderColor` | `string` | Used to override the default border color around the avatar body |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | Supply a custom avatar component instead of the default |
| `href` | `string` | Provides a url for avatars being used as a link |
| `imgLoading` | `"lazy" \| "eager"` | Defines the loading behaviour of the avatar image |
| `isDecorative` | `boolean` | whether disable aria-labelledby for avatar img |
| `isDisabled` | `boolean` | Change the style to indicate the avatar is disabled |
| `label` | `string` | Used to provide custom content to screen readers |
| `name` | `string` | Provides alt text for the avatar image |
| `onClick` | `(event: MouseEvent<Element, globalThis.MouseEvent>, analyticsEvent?: UIAnalyticsEvent) => void` | Handler to be called on click |
| `presence` | `Presence \| Omit<ReactNode, string> \| (string & {})` | Indicates a user's online status by showing a small icon on the avatar |
| `size` | `"small" \| "xsmall" \| "medium" \| "large" \| "xlarge" \| "xxlarge"` | Defines the size of the avatar |
| `src` | `string` | A url to load an image from (this can also be a base64 encoded image) |
| `stackIndex` | `number` | The index of where this avatar is in the group `stack` |
| `status` | `Omit<ReactNode, string> \| (string & {}) \| Status` | Indicates contextual information by showing a small icon on the avatar |
| `tabIndex` | `number` | Assign specific tabIndex order to the underlying node |
| `target` | `"_blank" \| "_self" \| "_top" \| "_parent"` | Pass target down to the anchor, if href is provided |

## @atlaskit/badge Package
### Badge component
A badge is a visual indicator for numeric values such as tallies and scores, providing quick visual feedback.
- **Keywords:** badge, indicator, numeric, tally, score, count, status
- **Categories:** status-indicators
- **Status:** general-availability
#### Example
```tsx
import Badge from '@atlaskit/badge';
export default [
	<Badge appearance="primary">5</Badge>,
	<Badge appearance="important" max={99}>
		150
	</Badge>,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `appearance` | `"added" \| "default" \| "important" \| "primary" \| "primaryInverted" \| "removed"` | Affects the visual style of the badge |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | The value displayed within the badge |
| `max` | `number \| false` | The maximum value to display |

## @atlaskit/banner Package
### Banner component
A banner displays a prominent message at the top of the screen to communicate important information to users.
- **Keywords:** banner, message, notification, alert, prominent, top, screen
- **Categories:** messaging
- **Status:** general-availability
#### Example
```tsx
import Banner from '@atlaskit/banner';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import Box from '@atlaskit/primitives/box';
export default () => (
	<Box>
		<Banner
			icon={<WarningIcon label="Warning" secondaryColor="inherit" size="medium" />}
			testId="basicTestId"
		>
			Your license is about to expire. Please renew your license within the next week.
		</Banner>
	</Box>
);
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `appearance` | `"warning" \| "error" \| "announcement"` | Visual style to be used for the banner |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | Content to be shown next to the icon |
| `icon` | `ReactElement<any, string \| JSXElementConstructor<any>>` | Icon to be shown left of the main content |

## @atlaskit/button Package
### Button component
A versatile button component with multiple appearances and states for triggering actions. A button triggers an event or action. They let users know what will happen next. Note the root entrypoint of `@atlaskit/button` is deprecated and being replaced with `@atlaskit/button/new`.
- **Keywords:** button, action, click, submit, form, interactive, cta
- **Categories:** form, interaction
- **Status:** general-availability
#### Examples
```tsx
import Button from '@atlaskit/button/new';
export default function ButtonDisabledExample() {
	return (
		<Button appearance="primary" isDisabled>
			Disabled button
		</Button>
	);
}
```
```tsx
import Button from '@atlaskit/button/new';
export default function ButtonDangerExample() {
	return <Button appearance="danger">Danger button</Button>;
}
```
```tsx
import Button from '@atlaskit/button/new';
import StarIcon from '@atlaskit/icon/core/star-starred';
export default function ButtonIconAfterExample() {
	return (
		<Button iconAfter={StarIcon} appearance="primary">
			Icon after
		</Button>
	);
}
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `appearance` | `"default" \| "danger" \| "primary" \| "subtle" \| "warning" \| "discovery"` | The button style variation |
| `autoFocus` | `boolean` | Set the button to autofocus on mount |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | Text content to be rendered in the button (required) |
| `iconAfter` | `ComponentClass<Omit<IconProps, "size"> \| Omit<NewIconProps, "size" \| "spacing">, any> \| FunctionComponent<Omit<IconProps, "size"> \| Omit<...>>` | Places an icon within the button, after the button's text |
| `iconBefore` | `ComponentClass<Omit<IconProps, "size"> \| Omit<NewIconProps, "size" \| "spacing">, any> \| FunctionComponent<Omit<IconProps, "size"> \| Omit<...>>` | Places an icon within the button, before the button's text |
| `isDisabled` | `boolean` | Disable the button to prevent user interaction |
| `isLoading` | `boolean` | Conditionally show a spinner over the top of a button |
| `isSelected` | `boolean` | Indicates that the button is selected |
| `onBlur` | `(event: FocusEvent<HTMLButtonElement, Element>) => void` | Handler called on blur |
| `onClick` | `(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, analyticsEvent: UIAnalyticsEvent) => void` | Handler called on click |
| `onFocus` | `(event: FocusEvent<HTMLButtonElement, Element>) => void` | Handler called on focus |
| `shouldFitContainer` | `boolean` | Option to fit button width to its parent width |
| `spacing` | `"default" \| "compact"` | Controls the amount of padding in the button |

### IconButton component
A button that displays only an icon with an optional tooltip. Perfect for toolbar actions, compact interfaces, and when space is limited.
- **Keywords:** button, icon, action, click, interactive, toolbar
- **Categories:** form, interaction
- **Status:** general-availability
#### Example
```tsx
import { IconButton } from '@atlaskit/button/new';
import AddIcon from '@atlaskit/icon/core/add';
import DeleteIcon from '@atlaskit/icon/core/delete';
import InfoIcon from '@atlaskit/icon/core/status-information';
export default [
	<IconButton icon={AddIcon} label="Add new item" appearance="primary" />,
	<IconButton icon={InfoIcon} label="Show information" appearance="subtle" spacing="compact" />,
	<IconButton icon={DeleteIcon} label="Delete permanently" appearance="discovery" shape="circle" />,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `appearance` | `"default" \| "primary" \| "subtle" \| "discovery"` | The button style variation |
| `autoFocus` | `boolean` | Set the button to autofocus on mount |
| `icon` | `ComponentClass<Omit<IconProps, "size"> \| Omit<NewIconProps, "size" \| "spacing">, any> \| FunctionComponent<Omit<IconProps, "size"> \| Omit<...>>` | Places an icon within the button (required) |
| `isDisabled` | `boolean` | Disable the button to prevent user interaction |
| `isLoading` | `boolean` | Conditionally show a spinner over the top of a button |
| `isSelected` | `boolean` | Indicates that the button is selected |
| `isTooltipDisabled` | `boolean` | Prevents a tooltip with the label text from showing |
| `label` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | Provide an accessible label, often used by screen readers (required) |
| `onBlur` | `(event: FocusEvent<HTMLButtonElement, Element>) => void` | Handler called on blur |
| `onClick` | `(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, analyticsEvent: UIAnalyticsEvent) => void` | Handler called on click |
| `onFocus` | `(event: FocusEvent<HTMLButtonElement, Element>) => void` | Handler called on focus |
| `shape` | `"default" \| "circle"` | Set the shape of the icon, defaults to square with rounded corners |
| `spacing` | `"default" \| "compact"` | Controls the amount of padding in the button |
| `tooltip` | `{ testId?: string; analyticsContext?: Record<string, any>; content?: ReactNode \| (({ update }: { update?: () => void; }) => ReactNode); component?: ComponentType<TooltipPrimitiveProps> \| ForwardRefExoticComponent<...>; ... 12 more ...; strategy?: "fixed" \| "absolute"; }` | Props passed down to the Tooltip component |

### ButtonGroup component
A component for grouping related buttons together with consistent spacing and alignment.
- **Keywords:** button, group, container, layout, spacing
- **Categories:** form, layout, interaction
- **Status:** general-availability
#### Example
```tsx
import { ButtonGroup } from '@atlaskit/button';
import Button from '@atlaskit/button/new';
export default [
	<ButtonGroup titleId="heading-options">
		<Button appearance="primary">Save</Button>
		<Button appearance="danger">Delete</Button>
		<Button appearance="subtle">Cancel</Button>
	</ButtonGroup>,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | The buttons to render inside the button group |
| `label` | `string` | Refers to an `aria-label` attribute |
| `titleId` | `string` | ID referenced by the button group wrapper's `aria-labelledby` attribute |

## @atlaskit/checkbox Package
### Checkbox component
A checkbox is an input control that allows a user to select one or more options from a number of choices.
- **Keywords:** checkbox, input, form, selection, choice, option, multiple
- **Categories:** forms-and-input
- **Status:** general-availability
#### Example
```tsx
import Checkbox from '@atlaskit/checkbox';
export default [
	<Checkbox label="Basic checkbox" />,
	<Checkbox label="Checked checkbox" isChecked />,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `defaultChecked` | `boolean` | Sets whether the checkbox begins as checked or unchecked |
| `id` | `string` | The ID assigned to the input |
| `isChecked` | `boolean` | Sets whether the checkbox is checked or unchecked |
| `isDisabled` | `boolean` | Sets whether the checkbox is disabled |
| `isIndeterminate` | `boolean` | Sets whether the checkbox is indeterminate |
| `isInvalid` | `boolean` | Marks the field as invalid |
| `isRequired` | `boolean` | Marks the field as required & changes the label style |
| `label` | `string \| number \| ReactElement<any, string \| JSXElementConstructor<any>>` | The label to be displayed to the right of the checkbox |
| `name` | `string` | The name of the submitted field in a checkbox |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>, analyticsEvent: UIAnalyticsEvent) => void` | Function that is called whenever the state of the checkbox changes |
| `value` | `string \| number` | The value to be used in the checkbox input |
| `xcss` | `false \| (XCSSValue<"alignItems", DesignTokenStyles, ""> & {} & XCSSPseudo<"alignItems", never, never, DesignTokenStyles> & XCSSMediaQuery<...> & { ...; } & { ...; })` | Bounded style API |

## @atlaskit/drawer Package

## @atlaskit/heading Package
### Heading component
A component for creating accessible, consistently styled headings with proper hierarchy. Headings are sized to contrast with content, increase visual hierarchy, and help readers easily understand the structure of content.
- **Keywords:** heading, title, header, typography, text, h1, h2, h3, h4, h5, h6
- **Categories:** primitive, data-display
- **Status:** general-availability
#### Example
```tsx
import Heading from '@atlaskit/heading';
export default [
	<Heading size="xxlarge">Page Title</Heading>,
	<Heading size="large" color="color.text.inverse">
		Inverted section title
	</Heading>,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "div" \| "span"` | Allows the component to be rendered as the specified DOM element, overriding a default element set by `level` prop |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | The text of the heading (required) |
| `color` | `"color.text" \| "color.text.inverse" \| "color.text.warning.inverse"` | Token representing text color with a built-in fallback value |
| `id` | `string` | Unique identifier for the heading DOM element |
| `size` | `"xsmall" \| "medium" \| "large" \| "small" \| "xxlarge" \| "xlarge" \| "xxsmall"` | Heading size (required) |

### HeadingContextProvider component
A context provider that allows you to configure the default HTML heading level for all headings within its subtree. Useful for maintaining proper heading hierarchy in complex layouts.
- **Keywords:** heading, context, provider, hierarchy, accessibility
- **Categories:** primitive, data-display
- **Status:** general-availability
#### Example
```tsx
import Heading, { HeadingContextProvider } from '@atlaskit/heading';
export default [
	<HeadingContextProvider>
		<Heading size="xxlarge">h1</Heading>
		<Heading size="medium">h2</Heading>
		<Heading size="large">h3</Heading>
	</HeadingContextProvider>,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | Semantic hierarchy of content below the heading context (required) |
| `value` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9` | Optional - only apply this value if the intent is to reset the heading context outside the normal content flow, for example inside a `section` |

## @atlaskit/icon Package
### Icon component
An icon is a symbol representing a command, device, directory, or common action.
- **Keywords:** icon, symbol, command, device, directory, action, visual
- **Categories:** images-and-icons
- **Status:** general-availability
#### Example
```tsx
import AddIcon from '@atlaskit/icon/core/add';
import DeleteIcon from '@atlaskit/icon/core/delete';
import StarIcon from '@atlaskit/icon/core/star-starred';
import { token } from '@atlaskit/tokens';
export default [
	<AddIcon label="Add" />,
	<StarIcon label="Star" color="currentColor" />,
	<DeleteIcon label="Delete" color={token('color.icon.danger')} />,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | The content to be rendered inside the glyph component |
| `glyph` | `ComponentClass<CustomGlyphProps, any> \| FunctionComponent<CustomGlyphProps>` | Custom icon component that returns an SVG element with set `viewBox`,
`width`, and `height` props |
| `isFacadeDisabled` | `boolean` | Used to opt out of the icon facade |
| `label` | `string` | Text used to describe what the icon is in context (required) |
| `primaryColor` | `string` | Primary color for the icon |
| `secondaryColor` | `string` | Secondary color for the icon |
| `size` | `"large" \| "medium" \| "small" \| "xlarge"` | There are three icon sizes – small (16px), medium (24px), and large (32px) |

### IconTile component
A tile component that displays an icon with customizable background, shape, and appearance.
- **Keywords:** icon, tile, container, background, shape, appearance
- **Categories:** images-and-icons
- **Status:** release-candidate
#### Example
```tsx
import { IconTile } from '@atlaskit/icon';
import AddIcon from '@atlaskit/icon/core/add';
export default [
	<IconTile icon={AddIcon} label="Add" appearance="redBold" />,
	<IconTile icon={AddIcon} label="Add" shape="circle" appearance="blue" />,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `appearance` | `"gray" \| "blue" \| "teal" \| "green" \| "lime" \| "yellow" \| "orange" \| "red" \| "magenta" \| "purple" \| "grayBold" \| "blueBold" \| "tealBold" \| "greenBold" \| "limeBold" \| "yellowBold" \| "orangeBold" \| "redBold" \| "magentaBold" \| "purpleBold"` | The appearance of the tile (required) |
| `icon` | `ComponentType<NewUtilityIconProps> \| ComponentType<NewCoreIconProps>` | The icon to display (required) |
| `label` | `string` | The label for the icon (required) |
| `LEGACY_fallbackComponent` | `React.ReactElement<any, string \| React.JSXElementConstructor<any>>` | Legacy component to render when the icon refresh feature flag is turned off |
| `shape` | `"square" \| "circle"` | Shape of the tile background |
| `size` | `"16" \| "24" \| "32" \| "40" \| "48"` | Size of the tile, in pixels |

## @atlaskit/lozenge Package
### Lozenge component
A lozenge is a small visual indicator used to show status, category, or other short text labels.
- **Keywords:** lozenge, badge, label, status, indicator, pill
- **Categories:** status-indicators
- **Status:** general-availability
#### Example
```tsx
import Lozenge from '@atlaskit/lozenge';
export default [
	<Lozenge appearance="success">Done</Lozenge>,
	<Lozenge appearance="inprogress" isBold>
		In Progress
	</Lozenge>,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `appearance` | `"default" \| "inprogress" \| "moved" \| "new" \| "removed" \| "success"` | The appearance type |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | Elements to be rendered inside the lozenge |
| `isBold` | `boolean` | Determines whether to apply the bold style or not |
| `maxWidth` | `string \| number` | max-width of lozenge container |

## @atlaskit/navigation-system Package
### Root component
The root container component for the navigation system that provides the overall layout structure and context.
- **Keywords:** navigation, layout, root, container, app, shell
- **Categories:** navigation, layout
- **Status:** beta
#### Examples
```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { useMemo, useReducer } from 'react';
import { cssMap, jsx } from '@compiled/react';
import AKBanner from '@atlaskit/banner';
import { IconButton } from '@atlaskit/button/new';
import AddIcon from '@atlaskit/icon/core/add';
import HomeIcon from '@atlaskit/icon/core/home';
import MoreIcon from '@atlaskit/icon/core/show-more-horizontal';
import StatusWarningIcon from '@atlaskit/icon/core/status-warning';
import BoardIcon from '@atlaskit/icon/glyph/board';
import { MenuList } from '@atlaskit/navigation-system';
import { Aside } from '@atlaskit/navigation-system/layout/aside';
import { Banner } from '@atlaskit/navigation-system/layout/banner';
import {
	Main,
	MainStickyHeader,
	UNSAFE_MAIN_BLOCK_START_FOR_LEGACY_PAGES_ONLY,
	UNSAFE_MAIN_INLINE_END_FOR_LEGACY_PAGES_ONLY,
	UNSAFE_MAIN_INLINE_START_FOR_LEGACY_PAGES_ONLY,
} from '@atlaskit/navigation-system/layout/main';
import { Panel } from '@atlaskit/navigation-system/layout/panel';
import { PanelSplitter } from '@atlaskit/navigation-system/layout/panel-splitter';
import { Root } from '@atlaskit/navigation-system/layout/root';
import {
	SideNav,
	SideNavContent,
	SideNavToggleButton,
} from '@atlaskit/navigation-system/layout/side-nav';
import { TopNav, TopNavEnd, TopNavStart } from '@atlaskit/navigation-system/layout/top-nav';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import {
	FlyoutMenuItem,
	FlyoutMenuItemContent,
	FlyoutMenuItemTrigger,
} from '@atlaskit/navigation-system/side-nav-items/flyout-menu-item';
import { LinkMenuItem } from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
import { MenuListItem } from '@atlaskit/navigation-system/side-nav-items/menu-list-item';
import { Help } from '@atlaskit/navigation-system/top-nav-items';
import {
	BANNER_HEIGHT,
	LEFT_PANEL_WIDTH,
	LEFT_SIDEBAR_WIDTH,
	RIGHT_PANEL_WIDTH,
	RIGHT_SIDEBAR_WIDTH,
	TOP_NAVIGATION_HEIGHT,
} from '@atlaskit/page-layout';
import { Box, Inline } from '@atlaskit/primitives';
import { Hide } from '@atlaskit/primitives/responsive';
import { token, useThemeObserver } from '@atlaskit/tokens';
const styles = cssMap({
	debugSlots: {
		// We use these styling standard unsafe styles to debug the page layout slots and ensure
		// none of them are overlapping each other, as well as they take up the expected space.
		'> * > *': {
			opacity: 0.7,
		},
	},
	root: {
		height: '100rem',
	},
	sticky: {
		position: 'sticky',
		insetBlockStart: token('space.150', '12px'),
	},
	legacyPositionedSibling: {
		position: 'absolute',
		insetBlockStart: `calc(${BANNER_HEIGHT} + ${TOP_NAVIGATION_HEIGHT})`,
		insetBlockEnd: 0,
		insetInlineStart: `calc(${LEFT_PANEL_WIDTH} + ${LEFT_SIDEBAR_WIDTH})`,
		insetInlineEnd: `calc(${RIGHT_PANEL_WIDTH} + ${RIGHT_SIDEBAR_WIDTH})`,
		backgroundColor: token('color.background.neutral', ''),
		overflow: 'auto',
	},
	dangerouslyPositionedSibling: {
		position: 'absolute',
		insetBlockStart: UNSAFE_MAIN_BLOCK_START_FOR_LEGACY_PAGES_ONLY,
		insetBlockEnd: 0,
		insetInlineStart: UNSAFE_MAIN_INLINE_START_FOR_LEGACY_PAGES_ONLY,
		insetInlineEnd: UNSAFE_MAIN_INLINE_END_FOR_LEGACY_PAGES_ONLY,
		backgroundColor: token('color.background.neutral', ''),
		overflow: 'auto',
	},
	main: {
		backgroundColor: token('color.background.accent.blue.subtle', ''),
	},
	aside: {
		backgroundColor: token('color.background.accent.orange.subtle', ''),
	},
	banner: {
		backgroundColor: token('color.background.accent.lime.subtle', ''),
	},
	panel: {
		backgroundColor: token('elevation.surface'),
	},
	topBar: {
		backgroundColor: token('color.background.accent.purple.subtle', ''),
	},
	wide: {
		width: '1000px',
	},
	noShrink: {
		whiteSpace: 'nowrap',
	},
});
function ScrollableContent({ children }: { children: React.ReactNode }) {
	return (
		<Box
			xcss={styles.root}
			/**
			 * Resolves a11y scanner warnings about scrollable region not being focusable.
			 * Realistic usage would have real focusable content, such as in the composition examples.
			 * Taking a shortcut here because these examples are for VRs and not meant to be realistic content.
			 */
			tabIndex={0}
		>
			{children}
		</Box>
	);
}
function BoardMenuItem() {
	return (
		<Inline space="space.050" alignBlock="center">
			<BoardIcon label="" />
			<span>Boards</span>
		</Inline>
	);
}
function BannerToggleAction({
	isSelected,
	onClick,
	label,
}: {
	isSelected?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	label?: string;
}) {
	return (
		<Hide below="sm">
			<MenuListItem>
				<IconButton
					icon={StatusWarningIcon}
					label={label}
					onClick={onClick}
					isSelected={isSelected}
				/>
			</MenuListItem>
		</Hide>
	);
}
export const AllSlots = () => {
	const [bannerShown, toggleBanner] = useReducer((state) => !state, true);
	const [panelShown, togglePanel] = useReducer((state) => !state, true);
	return (
		<div css={styles.debugSlots}>
			<Root>
				{bannerShown && (
					<Banner xcss={styles.banner}>
						<AKBanner appearance="announcement">Great news! A new layout system.</AKBanner>
					</Banner>
				)}
				<TopNav xcss={styles.topBar}>
					<TopNavStart>
						<SideNavToggleButton
							defaultCollapsed
							collapseLabel="Collapse sidebar"
							expandLabel="Expand sidebar"
						/>
						<span css={styles.noShrink}>top nav</span>
					</TopNavStart>
					<TopNavEnd>
						<Help isSelected={panelShown} onClick={togglePanel} label="Help" />
						<BannerToggleAction
							onClick={toggleBanner}
							isSelected={bannerShown}
							label="Toggle banner"
						/>
					</TopNavEnd>
				</TopNav>
				<SideNav defaultCollapsed>
					<SideNavContent>
						<BoardMenuItem />
					</SideNavContent>
					<PanelSplitter label="Resize side nav" />
				</SideNav>
				<Main xcss={styles.main}>main content</Main>
				<Aside xcss={styles.aside}>
					aside
					<PanelSplitter label="Resize aside" />
				</Aside>
				{panelShown && (
					<Panel xcss={styles.panel}>
						panel
						<PanelSplitter label="Resize panel" />
					</Panel>
				)}
			</Root>
		</div>
	);
};
export const AllSlotsScrollable = () => {
	const [bannerShown, toggleBanner] = useReducer((state) => !state, true);
	const [panelShown, togglePanel] = useReducer((state) => !state, false);
	return (
		<Root>
			{bannerShown && (
				<Banner xcss={styles.banner}>
					<AKBanner appearance="announcement">Great news! A new layout system.</AKBanner>
				</Banner>
			)}
			<TopNav xcss={styles.topBar}>
				<TopNavStart>
					<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
					<span css={styles.noShrink}>top nav</span>
				</TopNavStart>
				<TopNavEnd>
					<Help isSelected={panelShown} onClick={togglePanel} label="Help" />
					<BannerToggleAction
						onClick={toggleBanner}
						isSelected={bannerShown}
						label="Toggle banner"
					/>
				</TopNavEnd>
			</TopNav>
			<SideNav>
				<SideNavContent>
					<ScrollableContent>
						<div css={styles.sticky}>sticky in sticky</div>
						<BoardMenuItem />
						<BoardMenuItem />
						<BoardMenuItem />
						<BoardMenuItem />
					</ScrollableContent>
				</SideNavContent>
				<PanelSplitter label="Resize side nav" />
			</SideNav>
			<Main xcss={styles.main} testId="main">
				<MainStickyHeader>sticky header</MainStickyHeader>
				<ScrollableContent>main content</ScrollableContent>
			</Main>
			<Aside xcss={styles.aside} testId="aside">
				<ScrollableContent>
					aside
					<div css={styles.sticky}>sticky in sticky</div>
				</ScrollableContent>
				<PanelSplitter label="Resize aside" />
			</Aside>
			{panelShown && (
				<Panel xcss={styles.panel}>
					<ScrollableContent>panel</ScrollableContent>
					<PanelSplitter label="Resize panel" />
				</Panel>
			)}
		</Root>
	);
};
export const AllSlotsRTL = () => {
	const [panelShown, togglePanel] = useReducer((state) => !state, false);
	return (
		<div dir="rtl">
			<Root>
				<Banner xcss={styles.banner}>
					<AKBanner appearance="error">An error occurred</AKBanner>
				</Banner>
				<TopNav xcss={styles.topBar}>
					<TopNavStart>
						<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
						<span css={styles.noShrink}>top nav</span>
					</TopNavStart>
					<TopNavEnd>
						<Help isSelected={panelShown} onClick={togglePanel} label="Help" />
					</TopNavEnd>
				</TopNav>
				<SideNav>
					<SideNavContent>side nav</SideNavContent>
				</SideNav>
				<Main xcss={styles.main}>main content</Main>
				<Aside xcss={styles.aside}>aside</Aside>
				{panelShown && <Panel xcss={styles.panel}>panel</Panel>}
			</Root>
		</div>
	);
};
export const TopBarSideNavMainAside = () => (
	<Root>
		<TopNav xcss={styles.topBar}>
			<TopNavStart>
				<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
				<span css={styles.noShrink}>top nav</span>
			</TopNavStart>
		</TopNav>
		<SideNav>
			<SideNavContent>side nav</SideNavContent>
		</SideNav>
		<Main xcss={styles.main}>main content</Main>
		<Aside xcss={styles.aside}>aside</Aside>
	</Root>
);
export const TopBarSideNavMainAsideScrollable = () => (
	<Root>
		<TopNav xcss={styles.topBar}>
			<TopNavStart>
				<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
				<span css={styles.noShrink}>top nav</span>
			</TopNavStart>
		</TopNav>
		<SideNav>
			<SideNavContent>
				<ScrollableContent>side nav</ScrollableContent>
			</SideNavContent>
		</SideNav>
		<Main xcss={styles.main}>
			<ScrollableContent>main content</ScrollableContent>
		</Main>
		<Aside xcss={styles.aside}>
			<ScrollableContent>aside</ScrollableContent>
		</Aside>
	</Root>
);
export const TopBarSideNavMain = () => (
	<Root>
		<TopNav xcss={styles.topBar}>
			<TopNavStart>
				<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
				<span css={styles.noShrink}>top nav</span>
			</TopNavStart>
		</TopNav>
		<SideNav>
			<SideNavContent>side nav</SideNavContent>
		</SideNav>
		<Main xcss={styles.main}>main content</Main>
	</Root>
);
export const TopBarSideNavMainScrollable = () => (
	<Root>
		<TopNav xcss={styles.topBar}>
			<TopNavStart>
				<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
				<span css={styles.noShrink}>top nav</span>
			</TopNavStart>
		</TopNav>
		<SideNav>
			<SideNavContent>
				<ScrollableContent>side nav</ScrollableContent>
			</SideNavContent>
		</SideNav>
		<Main xcss={styles.main}>
			<ScrollableContent>main content</ScrollableContent>
		</Main>
	</Root>
);
export const SideNavMainAside = () => (
	<Root>
		<SideNav>
			<SideNavContent>side nav</SideNavContent>
		</SideNav>
		<Main xcss={styles.main}>main content</Main>
		<Aside xcss={styles.aside}>aside</Aside>
	</Root>
);
export const SideNavMainAsideScrollable = () => (
	<Root>
		<SideNav>
			<SideNavContent>
				<ScrollableContent>side nav</ScrollableContent>
			</SideNavContent>
		</SideNav>
		<Main xcss={styles.main}>
			<ScrollableContent>main content</ScrollableContent>
		</Main>
		<Aside xcss={styles.aside}>
			<ScrollableContent>aside</ScrollableContent>
		</Aside>
	</Root>
);
export const MainAside = () => (
	<Root>
		<Main xcss={styles.main}>main content</Main>
		<Aside xcss={styles.aside}>aside</Aside>
	</Root>
);
export const MainAsideScrollable = () => (
	<Root>
		<Main xcss={styles.main}>
			<ScrollableContent>main content</ScrollableContent>
		</Main>
		<Aside xcss={styles.aside}>
			<ScrollableContent>aside</ScrollableContent>
		</Aside>
	</Root>
);
export const Resizable = () => (
	<Root>
		<TopNav xcss={styles.topBar}>
			<TopNavStart>
				<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
				<span css={styles.noShrink}>top nav</span>
			</TopNavStart>
		</TopNav>
		<SideNav>
			<SideNavContent>
				side nav
				<PanelSplitter label="Resize side nav" />
			</SideNavContent>
		</SideNav>
		<Main xcss={styles.main}>main content</Main>
	</Root>
);
export const ResizableRTL = () => (
	<div dir="rtl">
		<Root>
			<TopNav xcss={styles.topBar}>
				<TopNavStart>
					<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
					<span css={styles.noShrink}>top nav</span>
				</TopNavStart>
			</TopNav>
			<SideNav>
				<SideNavContent>
					side nav
					<PanelSplitter label="Resize side nav" />
				</SideNavContent>
			</SideNav>
			<Main xcss={styles.main}>main content</Main>
			<Aside xcss={styles.aside}>
				aside
				<PanelSplitter label="Resize aside" />
			</Aside>
		</Root>
	</div>
);
export const SideNavCustomWidthGreaterThanMaxWidth = () => (
	<Root>
		<TopNav xcss={styles.topBar}>
			<TopNavStart>
				<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
				<span css={styles.noShrink}>top nav</span>
			</TopNavStart>
		</TopNav>
		<SideNav defaultWidth={1800}>
			side nav
			<PanelSplitter label="Resize side nav" />
		</SideNav>
		<Main xcss={styles.main}>main content</Main>
	</Root>
);
export const SideNavCustomWidthSmallerThanMinWidth = () => (
	<Root>
		<TopNav xcss={styles.topBar}>
			<TopNavStart>
				<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
				<span css={styles.noShrink}>top nav</span>
			</TopNavStart>
		</TopNav>
		<SideNav defaultWidth={2}>
			side nav
			<PanelSplitter label="Resize side nav" />
		</SideNav>
		<Main xcss={styles.main}>main content</Main>
	</Root>
);
export const SideNavOverflowingChildren = () => (
	<Root>
		<TopNav xcss={styles.topBar}>
			<TopNavStart>
				<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
				<span css={styles.noShrink}>top nav</span>
			</TopNavStart>
		</TopNav>
		<SideNav>
			<SideNavContent>
				<div
					css={styles.wide}
					/**
					 * Resolves a11y scanner warnings about scrollable region not being focusable.
					 * Realistic usage would have real focusable content, such as in the composition examples.
					 * Taking a shortcut here because these examples are for VRs and not meant to be realistic content.
					 */
					tabIndex={0}
				>
					side nav
				</div>
				<PanelSplitter label="Resize side nav" />
			</SideNavContent>
		</SideNav>
		<Main xcss={styles.main}>main content</Main>
	</Root>
);
export const EdgeCaseSiblingAbsolutePositioned = () => {
	const [panelShown, togglePanel] = useReducer((state) => !state, false);
	return (
		<div css={styles.debugSlots}>
			<Root UNSAFE_dangerouslyHoistSlotSizes>
				<TopNav xcss={styles.topBar}>
					<TopNavStart>
						<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
						<span css={styles.noShrink}>top nav</span>
					</TopNavStart>
					<TopNavEnd>
						<Help isSelected={panelShown} onClick={togglePanel} label="Help" />
					</TopNavEnd>
				</TopNav>
				<SideNav>
					<SideNavContent>side nav</SideNavContent>
				</SideNav>
				<Aside xcss={styles.aside}>aside</Aside>
				{panelShown && <Panel xcss={styles.panel}>panel</Panel>}
			</Root>
			<div css={[styles.dangerouslyPositionedSibling, styles.main]}>
				<MainStickyHeader>sticky content</MainStickyHeader>
				<ScrollableContent>Sibling element for the Confluence monolith use case</ScrollableContent>
			</div>
		</div>
	);
};
export const EdgeCaseSiblingAbsolutePositionedCollapsed = () => (
	<div css={styles.debugSlots}>
		<Root UNSAFE_dangerouslyHoistSlotSizes>
			<Banner xcss={styles.banner}>banner</Banner>
			<TopNav xcss={styles.topBar}>
				<TopNavStart>
					<SideNavToggleButton
						collapseLabel="Collapse sidebar"
						expandLabel="Expand sidebar"
						defaultCollapsed
					/>
					<span css={styles.noShrink}>top nav</span>
				</TopNavStart>
			</TopNav>
			<SideNav defaultCollapsed>
				<SideNavContent>side nav</SideNavContent>
			</SideNav>
			<Aside xcss={styles.aside}>aside</Aside>
		</Root>
		<div css={[styles.dangerouslyPositionedSibling, styles.main]}>
			<ScrollableContent>Sibling element for the Confluence monolith use case</ScrollableContent>
		</div>
	</div>
);
export const EdgeCaseSiblingAbsolutePositionedPanelVisible = () => {
	const [panelShown, togglePanel] = useReducer((state) => !state, true);
	return (
		<div css={styles.debugSlots}>
			<Root UNSAFE_dangerouslyHoistSlotSizes>
				<TopNav xcss={styles.topBar}>
					<TopNavStart>
						<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
						<span css={styles.noShrink}>top nav</span>
					</TopNavStart>
					<TopNavEnd>
						<Help isSelected={panelShown} onClick={togglePanel} label="Help" />
					</TopNavEnd>
				</TopNav>
				<SideNav>
					<SideNavContent>side nav</SideNavContent>
				</SideNav>
				<Aside xcss={styles.aside}>aside</Aside>
				{panelShown && <Panel xcss={styles.panel}>panel</Panel>}
			</Root>
			<div css={[styles.dangerouslyPositionedSibling, styles.main]}>
				<ScrollableContent>Sibling element for the Confluence monolith use case</ScrollableContent>
			</div>
		</div>
	);
};
export const EdgeCaseUsingLegacyVars = () => {
	const [panelShown, togglePanel] = useReducer((state) => !state, false);
	return (
		<div css={styles.debugSlots}>
			<Root UNSAFE_dangerouslyHoistSlotSizes>
				<Banner xcss={styles.banner}>banner</Banner>
				<TopNav xcss={styles.topBar}>
					<TopNavStart>
						<SideNavToggleButton
							collapseLabel="Collapse sidebar"
							expandLabel="Expand sidebar"
							defaultCollapsed
						/>
						<span css={styles.noShrink}>top nav</span>
					</TopNavStart>
					<TopNavEnd>
						<Help isSelected={panelShown} onClick={togglePanel} label="Help" />
					</TopNavEnd>
				</TopNav>
				<SideNav defaultCollapsed>
					<SideNavContent>side nav</SideNavContent>
				</SideNav>
				<Aside xcss={styles.aside}>aside</Aside>
				{panelShown && <Panel xcss={styles.panel}>panel</Panel>}
			</Root>
			<div css={[styles.legacyPositionedSibling, styles.main]}>
				<ScrollableContent>Sibling element for the Confluence monolith use case</ScrollableContent>
			</div>
		</div>
	);
};
export const EdgeCaseSiblingAbsolutePositionedResizable = () => {
	const [panelShown, togglePanel] = useReducer((state) => !state, false);
	return (
		<div css={styles.debugSlots}>
			<Root UNSAFE_dangerouslyHoistSlotSizes>
				<TopNav xcss={styles.topBar}>
					<TopNavStart>
						<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
						<span css={styles.noShrink}>top nav</span>
					</TopNavStart>
					<TopNavEnd>
						<Help isSelected={panelShown} onClick={togglePanel} label="Help" />
					</TopNavEnd>
				</TopNav>
				<SideNav>
					<SideNavContent>
						side nav
						<PanelSplitter label="Resize side nav" />
					</SideNavContent>
				</SideNav>
				<Aside xcss={styles.aside}>
					aside
					<PanelSplitter label="Resize aside" />
				</Aside>
				{panelShown && (
					<Panel>
						panel
						<PanelSplitter label="Resize panel" />
					</Panel>
				)}
			</Root>
			<div css={[styles.dangerouslyPositionedSibling, styles.main]}>
				<ScrollableContent>Sibling element for the Confluence monolith use case</ScrollableContent>
			</div>
		</div>
	);
};
const iframeStyles = cssMap({
	root: {
		height: '100%',
		width: '100%',
	},
});
export const ResizableWithIframeContent = () => {
	const [panelShown, togglePanel] = useReducer((state) => !state, false);
	const theme = useThemeObserver();
	const iframeSrc: string = useMemo(() => {
		if (typeof window === 'undefined') {
			return '';
		}
		const url = new URL('/examples.html', window.location.origin);
		url.searchParams.set('groupId', 'design-system');
		url.searchParams.set('packageId', 'navigation-system');
		url.searchParams.set('exampleId', 'stand-alone-iframe');
		if (theme.colorMode) {
			url.searchParams.set('mode', theme.colorMode);
		}
		return url.href;
	}, [theme.colorMode]);
	return (
		<div css={styles.debugSlots}>
			<Root UNSAFE_dangerouslyHoistSlotSizes>
				<TopNav xcss={styles.topBar}>
					<TopNavStart>
						<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
						<span css={styles.noShrink}>top nav</span>
					</TopNavStart>
					<TopNavEnd>
						<Help isSelected={panelShown} onClick={togglePanel} label="Help" />
					</TopNavEnd>
				</TopNav>
				<SideNav>
					{/* Not using <SideNavContent> so the iframe can take up the full size */}
					<Box xcss={iframeStyles.root} as="iframe" title="iframe" src={iframeSrc} />
					<PanelSplitter label="Resize side nav" />
				</SideNav>
				<Main xcss={styles.main}>
					<Box xcss={iframeStyles.root} as="iframe" title="iframe" src={iframeSrc} />
				</Main>
				<Aside xcss={styles.aside}>
					<Box xcss={iframeStyles.root} as="iframe" title="iframe" src={iframeSrc} />
					<PanelSplitter label="Resize aside" />
				</Aside>
				{panelShown && (
					<Panel>
						panel
						<PanelSplitter label="Resize panel" />
					</Panel>
				)}
			</Root>
		</div>
	);
};
export const AllSlotsBannerHeightZero = () => {
	const [bannerShown, toggleBanner] = useReducer((state) => !state, true);
	const [panelShown, togglePanel] = useReducer((state) => !state, true);
	return (
		<Root>
			{bannerShown && (
				<Banner xcss={styles.banner} height={0}>
					<AKBanner appearance="announcement">Great news! A new layout system.</AKBanner>
				</Banner>
			)}
			<TopNav xcss={styles.topBar}>
				<TopNavStart>
					<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
					<span css={styles.noShrink}>top nav</span>
				</TopNavStart>
				<TopNavEnd>
					<Help isSelected={panelShown} onClick={togglePanel} label="Help" />
					<BannerToggleAction
						onClick={toggleBanner}
						isSelected={bannerShown}
						label="Toggle banner"
					/>
				</TopNavEnd>
			</TopNav>
			<SideNav>
				<SideNavContent>
					<ScrollableContent>
						<div css={styles.sticky}>sticky in sticky</div>
						<BoardMenuItem />
						<BoardMenuItem />
						<BoardMenuItem />
						<BoardMenuItem />
					</ScrollableContent>
				</SideNavContent>
			</SideNav>
			<Main xcss={styles.main}>
				<ScrollableContent>main content</ScrollableContent>
			</Main>
			<Aside xcss={styles.aside}>
				<ScrollableContent>
					aside
					<div css={styles.sticky}>sticky in sticky</div>
				</ScrollableContent>
			</Aside>
			{panelShown && (
				<Panel xcss={styles.panel}>
					<ScrollableContent>panel</ScrollableContent>
				</Panel>
			)}
		</Root>
	);
};
export const AllSlotsCustomSizes = () => {
	const [bannerShown, toggleBanner] = useReducer((state) => !state, true);
	const [panelShown, togglePanel] = useReducer((state) => !state, true);
	return (
		<Root>
			{bannerShown && (
				<Banner xcss={styles.banner} height={90}>
					<AKBanner appearance="announcement">Great news! A new layout system.</AKBanner>
				</Banner>
			)}
			<TopNav xcss={styles.topBar} height={40}>
				<TopNavStart>
					<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
					<span css={styles.noShrink}>top nav</span>
				</TopNavStart>
				<TopNavEnd>
					<Help isSelected={panelShown} onClick={togglePanel} label="Help" />
					<BannerToggleAction
						onClick={toggleBanner}
						isSelected={bannerShown}
						label="Toggle banner"
					/>
				</TopNavEnd>
			</TopNav>
			<SideNav defaultWidth={250}>
				<SideNavContent>
					<ScrollableContent>
						<div css={styles.sticky}>sticky in sticky</div>
						<BoardMenuItem />
						<BoardMenuItem />
						<BoardMenuItem />
						<BoardMenuItem />
					</ScrollableContent>
				</SideNavContent>
			</SideNav>
			<Main xcss={styles.main}>
				<ScrollableContent>main content</ScrollableContent>
			</Main>
			<Aside xcss={styles.aside} defaultWidth={195}>
				<ScrollableContent>
					aside
					<div css={styles.sticky}>sticky in sticky</div>
				</ScrollableContent>
			</Aside>
			{panelShown && (
				<Panel xcss={styles.panel} defaultWidth={140}>
					<ScrollableContent>panel</ScrollableContent>
				</Panel>
			)}
		</Root>
	);
};
export const EdgeCaseSiblingAbsolutePositionedCustomSizes = () => {
	const [bannerShown, toggleBanner] = useReducer((state) => !state, true);
	const [panelShown, togglePanel] = useReducer((state) => !state, true);
	return (
		<div css={styles.debugSlots}>
			<Root UNSAFE_dangerouslyHoistSlotSizes>
				{bannerShown && (
					<Banner xcss={styles.banner} height={90}>
						<AKBanner appearance="announcement">Great news! A new layout system.</AKBanner>
					</Banner>
				)}
				<TopNav xcss={styles.topBar} height={40}>
					<TopNavStart>
						<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
						<span css={styles.noShrink}>top nav</span>
					</TopNavStart>
					<TopNavEnd>
						<Help isSelected={panelShown} onClick={togglePanel} label="Help" />
						<BannerToggleAction
							onClick={toggleBanner}
							isSelected={bannerShown}
							label="Toggle banner"
						/>
					</TopNavEnd>
				</TopNav>
				<SideNav defaultWidth={250}>
					<SideNavContent>side nav</SideNavContent>
				</SideNav>
				<Aside xcss={styles.aside} defaultWidth={195}>
					aside
				</Aside>
				{panelShown && (
					<Panel xcss={styles.panel} defaultWidth={140}>
						panel
					</Panel>
				)}
			</Root>
			<div css={[styles.dangerouslyPositionedSibling, styles.main]}>
				<ScrollableContent>Sibling element for the Confluence monolith use case</ScrollableContent>
			</div>
		</div>
	);
};
const actions = [
	<IconButton
		key="add"
		label="Add"
		icon={(iconProps) => <AddIcon {...iconProps} size="small" />}
		appearance="subtle"
		spacing="compact"
	/>,
	<IconButton
		key="more"
		label="More"
		icon={(iconProps) => <MoreIcon {...iconProps} size="small" />}
		appearance="subtle"
		spacing="compact"
	/>,
];
const homeIcon = <HomeIcon label="" color="currentColor" spacing="spacious" />;
export const SideNavWithMenuItems = () => (
	<Root>
		<TopNav xcss={styles.topBar}>
			<TopNavStart>
				<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
				<span css={styles.noShrink}>top nav</span>
			</TopNavStart>
		</TopNav>
		<SideNav>
			<SideNavContent>
				<MenuList>
					<ButtonMenuItem elemBefore={homeIcon} actions={actions}>
						Button menu item
					</ButtonMenuItem>
					<LinkMenuItem href="#" elemBefore={homeIcon} actionsOnHover={actions}>
						Link menu item
					</LinkMenuItem>
					<FlyoutMenuItem>
						<FlyoutMenuItemTrigger>Flyout Menu Item</FlyoutMenuItemTrigger>
						<FlyoutMenuItemContent>
							<ButtonMenuItem>Menu Button 1</ButtonMenuItem>
							<ButtonMenuItem>Menu Button 2</ButtonMenuItem>
						</FlyoutMenuItemContent>
					</FlyoutMenuItem>
				</MenuList>
			</SideNavContent>
		</SideNav>
		<Main xcss={styles.main}>main content</Main>
	</Root>
);
```
```tsx
import { CustomerServiceManagementIcon, JiraIcon } from '@atlaskit/logo';
import { Main } from '@atlaskit/navigation-system/layout/main';
import { Root } from '@atlaskit/navigation-system/layout/root';
import { SideNav, SideNavToggleButton } from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import {
	AppLogo,
	AppSwitcher,
	CreateButton,
	Help,
	Profile,
	Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { Spotlight, SpotlightManager, SpotlightTarget } from '@atlaskit/onboarding';
import { token } from '@atlaskit/tokens';
import { WithResponsiveViewport } from './utils/example-utils';
import { MockSearch } from './utils/mock-search';
const defaultSideNavToggleButton = (
	<SideNavToggleButton
		testId="side-nav-toggle-button"
		collapseLabel="Collapse sidebar"
		expandLabel="Expand sidebar"
	/>
);
const defaultAppLogo = (
	<AppLogo
		href=""
		icon={CustomerServiceManagementIcon}
		name="Customer Service Management"
		label="Home page"
	/>
);
export default function NavigationShellExample({
	sideNavToggleButton = defaultSideNavToggleButton,
	appLogo = defaultAppLogo,
}: {
	sideNavToggleButton?: React.ReactNode;
	appLogo?: React.ReactNode;
}) {
	return (
		<WithResponsiveViewport>
			<Root>
				<TopNav>
					<TopNavStart sideNavToggleButton={sideNavToggleButton}>
						<AppSwitcher label="Switch apps" />
						{appLogo}
					</TopNavStart>
					<TopNavMiddle>
						<MockSearch />
						<CreateButton>Create</CreateButton>
					</TopNavMiddle>
					<TopNavEnd>
						<Help label="Help" />
						<Settings label="Settings" />
						<Profile label="Profile" />
					</TopNavEnd>
				</TopNav>
				<SideNav>{null}</SideNav>
				<Main>{null}</Main>
			</Root>
		</WithResponsiveViewport>
	);
}
export function NavigationShellWithToggleButtonSpotlight() {
	return (
		<SpotlightManager>
			<NavigationShellExample
				sideNavToggleButton={
					<SpotlightTarget name="side-nav-toggle-button">
						{defaultSideNavToggleButton}
					</SpotlightTarget>
				}
				appLogo={<AppLogo href="" icon={JiraIcon} name="Jira" label="Home page" />}
			/>
			<Spotlight
				target="side-nav-toggle-button"
				heading="Collapse the side nav"
				targetBgColor={token('elevation.surface')}
				targetRadius={3}
				actions={[{ text: 'Close' }]}
			/>
		</SpotlightManager>
	);
}
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | For rendering the layout areas, e (required) |
| `defaultSideNavCollapsed` | `boolean` | Whether the side nav should be collapsed by default __on desktop screens__ |
| `skipLinksLabel` | `string` | The header text for the skip links container element |
| `UNSAFE_dangerouslyHoistSlotSizes` | `boolean` | **Note: This prop is only supported for legacy purposes in Jira and Confluence,
and is subject to be removed without notice in the future |
| `xcss` | `false \| (XCSSValue<"backgroundColor", DesignTokenStyles, ""> & {} & XCSSPseudo<"backgroundColor", never, never, DesignTokenStyles> & XCSSMediaQuery<...> & { ...; } & { ...; })` | Bounded style overrides |

### SideNav component
The main sidebar navigation component that can be collapsed and expanded, containing navigation items and sections.
- **Keywords:** navigation, sidebar, menu, side, nav, collapsible
- **Categories:** navigation, layout
- **Status:** beta
#### Examples
```tsx
import { SideNavWithMenuItems } from './page-layout';
export default SideNavWithMenuItems;
```
```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { jsx } from '@compiled/react';
import Button, { IconButton } from '@atlaskit/button/new';
import { cssMap } from '@atlaskit/css';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import noop from '@atlaskit/ds-lib/noop';
import Heading from '@atlaskit/heading';
import AlignTextLeftIcon from '@atlaskit/icon/core/align-text-left';
import AppsIcon from '@atlaskit/icon/core/apps';
import BoardIcon from '@atlaskit/icon/core/board';
import ClockIcon from '@atlaskit/icon/core/clock';
import FilterIcon from '@atlaskit/icon/core/filter';
import InboxIcon from '@atlaskit/icon/core/inbox';
import ProjectIcon from '@atlaskit/icon/core/project';
import SettingsIcon from '@atlaskit/icon/core/settings';
import ShowMoreHorizontal from '@atlaskit/icon/core/show-more-horizontal';
import StarUnstarredIcon from '@atlaskit/icon/core/star-unstarred';
import { useNotifyOpenLayerObserver } from '@atlaskit/layering/experimental/open-layer-observer';
import { ConfluenceIcon } from '@atlaskit/logo';
import { Main } from '@atlaskit/navigation-system/layout/main';
import { PanelSplitter } from '@atlaskit/navigation-system/layout/panel-splitter';
import { Root } from '@atlaskit/navigation-system/layout/root';
import {
	SideNav,
	SideNavContent,
	SideNavToggleButton,
} from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import {
	FlyoutMenuItem,
	FlyoutMenuItemContent,
	FlyoutMenuItemTrigger,
} from '@atlaskit/navigation-system/side-nav-items/flyout-menu-item';
import { LinkMenuItem } from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
import { MenuList } from '@atlaskit/navigation-system/side-nav-items/menu-list';
import { Divider } from '@atlaskit/navigation-system/side-nav-items/menu-section';
import {
	AppLogo,
	AppSwitcher,
	CreateButton,
	Help,
	Search,
	Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { Inline, Stack } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';
import { WithResponsiveViewport } from './utils/example-utils';
const contentStyles = cssMap({
	root: {
		backgroundColor: token('color.background.brand.subtlest'),
		paddingInline: token('space.300'),
		paddingBlock: token('space.100'),
	},
});
const headingStyles = cssMap({
	root: {
		paddingInline: token('space.300'),
		paddingBlockStart: token('space.300'),
	},
});
// Using a basic element for VR tests to simulate a layered component that adds a flyout lock.
// There are React 18 issues with using popups or dropdown menus in VR tests.
// See: https://atlassian.slack.com/archives/C07G96YU6NQ/p1725320894009059
const MockLayeredComponent = () => {
	useNotifyOpenLayerObserver({
		isOpen: true,
		onClose: noop,
	});
	return <div>Mock layered component</div>;
};
export default function SideNavFlyout({
	isChildLayerOpen = false,
	defaultSideNavCollapsed = false,
}: {
	/**
	 * Whether there is a layered component open within the side nav, which will lock the flyout.
	 */
	isChildLayerOpen?: boolean;
	defaultSideNavCollapsed?: boolean;
}) {
	return (
		<WithResponsiveViewport>
			<Root>
				<TopNav>
					<TopNavStart>
						<SideNavToggleButton
							testId="side-nav-toggle-button"
							collapseLabel="Collapse sidebar"
							expandLabel="Expand sidebar"
						/>
						<AppSwitcher label="Switch apps" />
						<AppLogo href="" icon={ConfluenceIcon} name="Confluence" label="Home page" />
					</TopNavStart>
					<TopNavMiddle>
						<Search label="Search" />
						<CreateButton>Create</CreateButton>
					</TopNavMiddle>
					<TopNavEnd>
						<Help label="Help" />
						<Settings label="Settings" />
					</TopNavEnd>
				</TopNav>
				<SideNav defaultCollapsed={defaultSideNavCollapsed}>
					<SideNavContent>
						<MenuList>
							<LinkMenuItem href="#" elemBefore={<InboxIcon label="" color="currentColor" />}>
								Your work
							</LinkMenuItem>
							<LinkMenuItem href="#" elemBefore={<AppsIcon label="" color="currentColor" />}>
								Apps
							</LinkMenuItem>
							<LinkMenuItem href="#" elemBefore={<ProjectIcon label="" color="currentColor" />}>
								Projects
							</LinkMenuItem>
							<FlyoutMenuItem>
								<FlyoutMenuItemTrigger elemBefore={<ClockIcon label="" color="currentColor" />}>
									Recent
								</FlyoutMenuItemTrigger>
								<FlyoutMenuItemContent>
									<ButtonMenuItem elemBefore={<BoardIcon label="" color="currentColor" />}>
										YNG board
									</ButtonMenuItem>
									<Divider />
									<ButtonMenuItem elemBefore={<AlignTextLeftIcon label="" color="currentColor" />}>
										View all starred items
									</ButtonMenuItem>
								</FlyoutMenuItemContent>
							</FlyoutMenuItem>
							<ButtonMenuItem
								elemAfter={
									<DropdownMenu
										shouldRenderToParent
										trigger={({ triggerRef: ref, ...props }) => (
											<IconButton
												ref={ref}
												{...props}
												spacing="compact"
												appearance="subtle"
												label="Starred more menu"
												icon={(iconProps) => <ShowMoreHorizontal {...iconProps} size="small" />}
											/>
										)}
									>
										<DropdownItemGroup>
											<DropdownItem>Manage starred</DropdownItem>
										</DropdownItemGroup>
									</DropdownMenu>
								}
								elemBefore={<StarUnstarredIcon color="currentColor" label="" />}
							>
								Starred
							</ButtonMenuItem>
							<ButtonMenuItem
								elemAfter={
									<DropdownMenu
										shouldRenderToParent
										trigger={({ triggerRef: ref, ...props }) => (
											<IconButton
												ref={ref}
												{...props}
												spacing="compact"
												appearance="subtle"
												label="Open"
												icon={(iconProps) => <ShowMoreHorizontal {...iconProps} size="small" />}
											/>
										)}
									>
										<DropdownItemGroup>
											<DropdownItem>Manage filters</DropdownItem>
										</DropdownItemGroup>
									</DropdownMenu>
								}
								elemBefore={<FilterIcon color="currentColor" label="" />}
							>
								Filters
							</ButtonMenuItem>
						</MenuList>
						{isChildLayerOpen && <MockLayeredComponent />}
					</SideNavContent>
					<PanelSplitter label="Resize side nav" />
				</SideNav>
				<Main id="main-container">
					<Stack space="space.100" xcss={headingStyles.root}>
						<Heading size="small">Settings</Heading>
					</Stack>
					<Inline space="space.100" xcss={contentStyles.root}>
						<DropdownMenu
							shouldRenderToParent
							placement="bottom-end"
							trigger={({ triggerRef: ref, ...props }) => (
								<IconButton ref={ref} {...props} label="Settings" icon={SettingsIcon} />
							)}
						>
							<DropdownItemGroup>
								<DropdownItem>Automatic</DropdownItem>
							</DropdownItemGroup>
						</DropdownMenu>
						<Button>Filters</Button>
						<Button>Projects</Button>
						<Inline alignInline="end" grow="fill">
							<DropdownMenu
								shouldRenderToParent
								placement="top-start"
								trigger={({ triggerRef: ref, ...props }) => (
									<IconButton
										ref={ref}
										{...props}
										label="More settings"
										icon={(iconProps) => <ShowMoreHorizontal {...iconProps} size="small" />}
									/>
								)}
							>
								<DropdownItemGroup>
									<DropdownItem>Automatic</DropdownItem>
								</DropdownItemGroup>
							</DropdownMenu>
						</Inline>
					</Inline>
				</Main>
			</Root>
		</WithResponsiveViewport>
	);
}
export function ExpandedVR() {
	return <SideNavFlyout defaultSideNavCollapsed={false} isChildLayerOpen={false} />;
}
export function ExpandedWithOpenLayerVR() {
	return <SideNavFlyout defaultSideNavCollapsed={false} isChildLayerOpen />;
}
export function CollapsedVR() {
	return <SideNavFlyout defaultSideNavCollapsed isChildLayerOpen={false} />;
}
export function CollapsedWithOpenLayerVR() {
	return <SideNavFlyout defaultSideNavCollapsed isChildLayerOpen />;
}
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | The content of the layout area (required) |
| `defaultWidth` | `number` | The default width of the side nav layout area |
| `id` | `string` | The `id` attribute of the slot |
| `label` | `string` | The accessible name of the slot, announced by screen readers |
| `onCollapse` | `(args: { screen: "mobile" \| "desktop"; trigger?: SideNavTrigger; }) => void` | Called when the side nav is collapsed |
| `onExpand` | `(args: { screen: "mobile" \| "desktop"; trigger?: SideNavTrigger; }) => void` | Called when the side nav is expanded |
| `skipLinkLabel` | `string` | The label for this slot's skip link |

### TopNav component
The top navigation bar component that typically contains global actions, user profile, and app branding.
- **Keywords:** navigation, top, header, bar, nav, global
- **Categories:** navigation, layout
- **Status:** beta
#### Examples
```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { jsx } from '@compiled/react';
import AKBadge from '@atlaskit/badge';
import AtlassianIntelligenceIcon from '@atlaskit/icon/core/atlassian-intelligence';
import SearchIcon from '@atlaskit/icon/core/search';
import { ConfluenceIcon } from '@atlaskit/logo';
import { Root } from '@atlaskit/navigation-system/layout/root';
import { SideNavToggleButton } from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import {
	AppLogo,
	AppSwitcher,
	ChatButton,
	CreateButton,
	EndItem,
	Help,
	Profile,
	Search,
	Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { Notifications } from '@atlaskit/navigation-system/top-nav-items/notifications';
import { token } from '@atlaskit/tokens';
import { WithResponsiveViewport } from './utils/example-utils';
import { MockSearch } from './utils/mock-search';
const Badge = () => <AKBadge appearance="important">{5}</AKBadge>;
export const TopNavigationExample = () => (
	<WithResponsiveViewport>
		{/**
		 * Wrapping in `Root to ensure the TopNav height is set correctly, as it would in a proper composed usage.
		 * Root sets the top bar height CSS variable that TopNav uses to set its height
		 */}
		<Root>
			<TopNav>
				<TopNavStart>
					<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
					<AppSwitcher label="App switcher" onClick={() => alert('app switcher')} />
					<AppLogo
						href="http://www.atlassian.design"
						icon={ConfluenceIcon}
						name="Confluence"
						label="Home page"
					/>
				</TopNavStart>
				<TopNavMiddle>
					<Search onClick={() => alert('mobile search')} label="Search" />
					<CreateButton onClick={() => alert('create')}>Create</CreateButton>
				</TopNavMiddle>
				<TopNavEnd>
					<ChatButton onClick={() => alert('chat')}>Chat</ChatButton>
					<EndItem
						icon={AtlassianIntelligenceIcon}
						onClick={() => alert('inshelligence')}
						label="Atlassian Intelligence"
					/>
					<Help onClick={() => alert('help')} label="Help" />
					<Notifications
						badge={Badge}
						onClick={() => alert('notifications')}
						label="Notifications"
					/>
					<Settings onClick={() => alert('settings')} label="Settings" />
					<Profile onClick={() => alert('User settings')} label="Your profile" />
				</TopNavEnd>
			</TopNav>
		</Root>
	</WithResponsiveViewport>
);
export const SearchRightElem = () => (
	<WithResponsiveViewport>
		<Root>
			<TopNav>
				<TopNavStart>
					<AppSwitcher label="App switcher" onClick={() => alert('app switcher')} />
				</TopNavStart>
				<TopNavMiddle>
					<Search
						iconBefore={AtlassianIntelligenceIcon}
						elemAfter={<SearchIcon spacing="spacious" color={token('color.icon')} label="" />}
						onClick={() => alert('mobile search')}
						label="Search"
					/>
					<CreateButton onClick={() => alert('create')}>Create</CreateButton>
				</TopNavMiddle>
				<TopNavEnd>
					<Settings onClick={() => alert('settings')} label="Settings" />
				</TopNavEnd>
			</TopNav>
		</Root>
	</WithResponsiveViewport>
);
export const TopNavigationEnlargedSearchInput = () => (
	<WithResponsiveViewport>
		<Root>
			<TopNav>
				<TopNavStart>
					<AppSwitcher label="App switcher" onClick={() => alert('app switcher')} />
				</TopNavStart>
				<div>
					<TopNavMiddle>
						<MockSearch isEnlarged />
						<CreateButton onClick={() => alert('create')}>Create</CreateButton>
					</TopNavMiddle>
				</div>
				<TopNavEnd>
					<Settings onClick={() => alert('settings')} label="Settings" />
				</TopNavEnd>
			</TopNav>
		</Root>
	</WithResponsiveViewport>
);
export default TopNavigationExample;
```
```tsx
import AKBadge from '@atlaskit/badge';
import { Root } from '@atlaskit/navigation-system/layout/root';
import { SideNavToggleButton } from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import {
	AppLogo,
	AppSwitcher,
	ChatButton,
	CreateButton,
	Help,
	Notifications,
	Profile,
	Search,
	Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { FocusIcon } from '@atlaskit/temp-nav-app-icons/focus';
import { WithResponsiveViewport } from './utils/example-utils';
const Badge = () => <AKBadge appearance="important">{5}</AKBadge>;
export default function TopNavWithLongProductName() {
	return (
		<WithResponsiveViewport>
			{/**
			 * Wrapping in `Root to ensure the TopNav height is set correctly, as it would in a proper composed usage.
			 * Root sets the top bar height CSS variable that TopNav uses to set its height
			 */}
			<Root>
				<TopNav>
					<TopNavStart>
						<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
						<AppSwitcher label="App switcher" />
						<AppLogo
							href="http://www.atlassian.design"
							icon={() => <FocusIcon size="24" />}
							name="Long text to stretch out text label to the maximum width"
							label="Home page"
						/>
					</TopNavStart>
					<TopNavMiddle>
						<Search label="Search" />
						<CreateButton>Create</CreateButton>
					</TopNavMiddle>
					<TopNavEnd>
						<ChatButton>Chat</ChatButton>
						<Notifications label="Notifications" badge={Badge} />
						<Help label="Help" />
						<Settings label="Settings" />
						<Profile label="Your profile" />
					</TopNavEnd>
				</TopNav>
			</Root>
		</WithResponsiveViewport>
	);
}
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | The content of the layout area (required) |
| `height` | `number` | Not intended for long term use |
| `id` | `string` | The `id` attribute of the slot |
| `skipLinkLabel` | `string` | The label for this slot's skip link |
| `UNSAFE_theme` | `{ backgroundColor: string \| RGB; highlightColor: string \| RGB; }` | EXPERIMENTAL - DO NOT USE

Feature is incomplete and API is subject to change at any time |
| `xcss` | `false \| (XCSSValue<"backgroundColor", DesignTokenStyles, ""> & {} & XCSSPseudo<"backgroundColor", never, never, DesignTokenStyles> & XCSSMediaQuery<...> & { ...; } & { ...; })` | Bounded style overrides |

### Main component
The main content area component that contains the primary application content.
- **Keywords:** layout, main, content, area, body
- **Categories:** navigation, layout
- **Status:** beta
#### Examples
```tsx
import { MainAside } from './page-layout';
export default MainAside;
```
```tsx
import { MainAsideScrollable } from './page-layout';
export default MainAsideScrollable;
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | The content of the layout area (required) |
| `id` | `string` | The `id` attribute of the slot |
| `skipLinkLabel` | `string` | The label for this slot's skip link |
| `xcss` | `false \| (XCSSValue<"backgroundColor", DesignTokenStyles, ""> & {} & XCSSPseudo<"backgroundColor", never, never, DesignTokenStyles> & XCSSMediaQuery<...> & { ...; } & { ...; })` | Bounded style overrides |

### Aside component
A secondary content area component that can be used for supplementary information or actions.
- **Keywords:** layout, aside, sidebar, secondary, content
- **Categories:** navigation, layout
- **Status:** beta
#### Examples
```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import Badge from '@atlaskit/badge';
import Button from '@atlaskit/button/new';
import { cssMap, jsx } from '@atlaskit/css';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Heading from '@atlaskit/heading';
import AppsIcon from '@atlaskit/icon/core/apps';
import InboxIcon from '@atlaskit/icon/core/inbox';
import ProjectIcon from '@atlaskit/icon/core/project';
import { ConfluenceIcon } from '@atlaskit/logo';
import { Aside } from '@atlaskit/navigation-system/layout/aside';
import { Main } from '@atlaskit/navigation-system/layout/main';
import { PanelSplitter } from '@atlaskit/navigation-system/layout/panel-splitter';
import { Root } from '@atlaskit/navigation-system/layout/root';
import {
	SideNav,
	SideNavContent,
	SideNavToggleButton,
} from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import { LinkMenuItem } from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
import { MenuList } from '@atlaskit/navigation-system/side-nav-items/menu-list';
import {
	AppLogo,
	AppSwitcher,
	CreateButton,
	Help,
	Notifications,
	Profile,
	Search,
	Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { Inline, Stack, Text } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';
import { WithResponsiveViewport } from './utils/example-utils';
const asideStyles = cssMap({
	root: { backgroundColor: token('elevation.surface.sunken') },
	content: {
		paddingTop: token('space.300'),
		paddingRight: token('space.300'),
		paddingBottom: token('space.300'),
		paddingLeft: token('space.300'),
		borderInlineStart: `${token('border.width')} solid ${token('color.border')}`,
		height: '100%',
	},
});
const headingStyles = cssMap({
	root: {
		paddingInline: token('space.300'),
		paddingBlockStart: token('space.300'),
	},
});
export default function AsideBorderExample() {
	return (
		<WithResponsiveViewport>
			<Root>
				<TopNav>
					<TopNavStart>
						<SideNavToggleButton
							testId="side-nav-toggle-button"
							collapseLabel="Collapse sidebar"
							expandLabel="Expand sidebar"
						/>
						<AppSwitcher label="Switch apps" />
						<AppLogo href="" icon={ConfluenceIcon} name="Confluence" label="Home page" />
					</TopNavStart>
					<TopNavMiddle>
						<Search label="Search" />
						<CreateButton>Create</CreateButton>
					</TopNavMiddle>
					<TopNavEnd>
						<Help label="Help" />
						<Notifications
							label="Notifications"
							badge={() => (
								<Badge max={9} appearance="important">
									{99999}
								</Badge>
							)}
						/>
						<Settings label="Settings" />
						<DropdownMenu
							shouldRenderToParent
							trigger={({ triggerRef: ref, ...props }) => (
								<Profile ref={ref} label="Profile" {...props} />
							)}
						>
							<DropdownItemGroup>
								<DropdownItem>Account</DropdownItem>
							</DropdownItemGroup>
						</DropdownMenu>
					</TopNavEnd>
				</TopNav>
				<SideNav>
					<SideNavContent>
						<MenuList>
							<LinkMenuItem href="#" elemBefore={<InboxIcon label="" color="currentColor" />}>
								Your work
							</LinkMenuItem>
							<LinkMenuItem href="#" elemBefore={<AppsIcon label="" color="currentColor" />}>
								Apps
							</LinkMenuItem>
							<LinkMenuItem href="#" elemBefore={<ProjectIcon label="" color="currentColor" />}>
								Projects
							</LinkMenuItem>
						</MenuList>
					</SideNavContent>
					<PanelSplitter label="Resize side nav" />
				</SideNav>
				<Main id="main-container">
					<Stack xcss={headingStyles.root}>
						<Heading size="small">Project Blueshift</Heading>
					</Stack>
				</Main>
				<Aside xcss={asideStyles.root}>
					<Stack space="space.400" xcss={asideStyles.content}>
						<Heading size="small">Aside</Heading>
						<Inline space="space.100">
							<Button>Following</Button>
							<Button>Share</Button>
						</Inline>
						<Stack space="space.050">
							<Heading size="small">Owner</Heading>
							<Text weight="medium">Michael Dougall</Text>
						</Stack>
					</Stack>
					<PanelSplitter label="Resize aside" />
				</Aside>
			</Root>
		</WithResponsiveViewport>
	);
}
```
```tsx
import { MainAside } from './page-layout';
export default MainAside;
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | The content of the layout area (required) |
| `defaultWidth` | `number` | The default width of the layout area |
| `id` | `string` | The `id` attribute of the slot |
| `label` | `string` | The accessible name of the slot, announced by screen readers |
| `skipLinkLabel` | `string` | The label for this slot's skip link |
| `xcss` | `false \| (XCSSValue<"backgroundColor", DesignTokenStyles, ""> & {} & XCSSPseudo<"backgroundColor", never, never, DesignTokenStyles> & XCSSMediaQuery<...> & { ...; } & { ...; })` | Bounded style overrides |

### ExpandableMenuItem component
A navigation menu item that can expand and collapse to show/hide sub-items.
- **Keywords:** navigation, menu, item, expandable, collapsible, sidebar
- **Categories:** navigation, interaction
- **Status:** beta
#### Examples
```tsx
/**
 * @jsxfrag
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { useState } from 'react';
import Button, { IconButton } from '@atlaskit/button/new';
import { cssMap, jsx } from '@atlaskit/css';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import AddIcon from '@atlaskit/icon/core/add';
import ClockIcon from '@atlaskit/icon/core/clock';
import HomeIcon from '@atlaskit/icon/core/home';
import MoreIcon from '@atlaskit/icon/core/show-more-horizontal';
import Lozenge from '@atlaskit/lozenge';
import { MenuList } from '@atlaskit/navigation-system';
import { SideNavContent } from '@atlaskit/navigation-system/layout/side-nav';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import {
	ExpandableMenuItem,
	ExpandableMenuItemContent,
	ExpandableMenuItemTrigger,
} from '@atlaskit/navigation-system/side-nav-items/expandable-menu-item';
import { LinkMenuItem } from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
import { token } from '@atlaskit/tokens';
const styles = cssMap({
	root: {
		width: '300px',
	},
	wrapper: {
		paddingBlockEnd: token('space.150'),
	},
});
const AddAction = ({ shouldRenderToParent }: { shouldRenderToParent: boolean }) => (
	<DropdownMenu
		shouldRenderToParent={shouldRenderToParent}
		trigger={({ triggerRef, ...props }) => (
			<IconButton
				ref={triggerRef}
				{...props}
				spacing="compact"
				appearance="subtle"
				label="Add"
				icon={(iconProps) => <AddIcon {...iconProps} size="small" />}
			/>
		)}
	>
		<DropdownItemGroup>
			<DropdownItem>Create</DropdownItem>
			<DropdownItem>Import</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
);
const MoreAction = ({ shouldRenderToParent }: { shouldRenderToParent: boolean }) => (
	<DropdownMenu
		shouldRenderToParent={shouldRenderToParent}
		trigger={({ triggerRef, ...props }) => (
			<IconButton
				ref={triggerRef}
				{...props}
				spacing="compact"
				appearance="subtle"
				label="More"
				icon={(iconProps) => <MoreIcon {...iconProps} size="small" />}
			/>
		)}
	>
		<DropdownItemGroup>
			<DropdownItem>Manage starred</DropdownItem>
			<DropdownItem>Export</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
);
const MockActions = ({ shouldRenderToParent }: { shouldRenderToParent: boolean }) => (
	<>
		<AddAction shouldRenderToParent={shouldRenderToParent} />
		<MoreAction shouldRenderToParent={shouldRenderToParent} />
	</>
);
export const ExpandableMenuItemUnselectable = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger>Parent menu item</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
const ExpandableMenuItemControlled = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<div css={styles.root}>
			<SideNavContent>
				<MenuList>
					<ExpandableMenuItem
						isExpanded={isExpanded}
						onExpansionToggle={() => setIsExpanded((value) => !value)}
					>
						<ExpandableMenuItemTrigger href="#">Parent menu item</ExpandableMenuItemTrigger>
						<ExpandableMenuItemContent>
							<ButtonMenuItem>Item 1</ButtonMenuItem>
							<ButtonMenuItem>Item 2</ButtonMenuItem>
						</ExpandableMenuItemContent>
					</ExpandableMenuItem>
				</MenuList>
			</SideNavContent>
		</div>
	);
};
export const ExpandableMenuItemSelectable = () => {
	const [selectedMenuItemId, setSelectedMenuItemId] = useState<string | null>(null);
	return (
		<div css={styles.root}>
			<SideNavContent>
				<MenuList>
					<ExpandableMenuItem>
						<ExpandableMenuItemTrigger
							href="#test"
							isSelected={selectedMenuItemId === 'trigger'}
							onClick={() => setSelectedMenuItemId('trigger')}
						>
							Parent menu item
						</ExpandableMenuItemTrigger>
						<ExpandableMenuItemContent>
							<LinkMenuItem
								href="#test"
								isSelected={selectedMenuItemId === 'item-1'}
								onClick={() => setSelectedMenuItemId('item-1')}
							>
								Item 1
							</LinkMenuItem>
							<LinkMenuItem
								href="#test"
								isSelected={selectedMenuItemId === 'item-2'}
								onClick={() => setSelectedMenuItemId('item-2')}
							>
								Item 2
							</LinkMenuItem>
						</ExpandableMenuItemContent>
					</ExpandableMenuItem>
				</MenuList>
			</SideNavContent>
		</div>
	);
};
export const ExpandableMenuItemSelected = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger href="#test" isSelected>
						Parent menu item
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ExpandableMenuItemWithIcon = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger elemBefore={<HomeIcon label="" color={token('color.icon')} />}>
						Parent menu item
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ExpandableMenuItemSelectedWithIcon = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger
						href="#test"
						isSelected
						elemBefore={<HomeIcon label="" color={token('color.icon.selected')} />}
					>
						Parent menu item
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger
						href="#test"
						isSelected
						elemBefore={<HomeIcon label="" color="currentColor" />}
					>
						Parent menu item (with currentColor)
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ExpandableMenuItemWithElemAfter = ({ isExpanded }: { isExpanded?: boolean }) => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem isDefaultExpanded={isExpanded}>
					<ExpandableMenuItemTrigger
						elemBefore={<HomeIcon label="" color={token('color.icon')} />}
						elemAfter={<Lozenge>Elem after</Lozenge>}
					>
						Parent menu item
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ExpandableMenuItemExpandedWithElemAfter = () => (
	<ExpandableMenuItemWithElemAfter isExpanded />
);
export const ExpandableMenuItemWithActions = ({ isSelected }: { isSelected?: boolean }) => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger
						href="#test"
						actions={<MockActions shouldRenderToParent />}
						testId="menu-item-trigger"
						isSelected={isSelected}
					>
						Parent menu item
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
const ExpandableMenuItemSelectedWithActions = () => <ExpandableMenuItemWithActions isSelected />;
export const ExpandableMenuItemWithActionsOnHover = ({
	isSelected,
	isExpanded,
}: {
	isExpanded?: boolean;
	isSelected?: boolean;
}) => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem isExpanded={isExpanded}>
					<ExpandableMenuItemTrigger
						href="#test"
						actionsOnHover={<MockActions shouldRenderToParent />}
						testId="menu-item-trigger"
						isSelected={isSelected}
					>
						Parent menu item
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ExpandableMenuItemExpandedWithActionsOnHover = () => (
	<ExpandableMenuItemWithActionsOnHover isExpanded />
);
export const ExpandableMenuItemSelectedWithActionsOnHover = () => (
	<ExpandableMenuItemWithActionsOnHover isSelected />
);
export const ExpandableMenuItemWithActionsOnHoverAndElemAfter = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger
						actionsOnHover={<MockActions shouldRenderToParent />}
						testId="menu-item-trigger"
						elemAfter={<Lozenge>Elem after</Lozenge>}
					>
						Parent menu item
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ExpandableMenuItemWithActionsAndElemAfter = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger
						actions={<MockActions shouldRenderToParent />}
						testId="menu-item-trigger"
						elemAfter={<Lozenge>Elem after</Lozenge>}
					>
						Parent menu item
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ExpandableMenuItemExpandedWithActionsOnHoverAndElemAfter = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem isExpanded>
					<ExpandableMenuItemTrigger
						actionsOnHover={<MockActions shouldRenderToParent />}
						testId="menu-item-trigger"
						elemAfter={<span>elemAfter</span>}
					>
						Parent menu item
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ExpandableMenuItemNested = ({
	hasItemInitiallySelected = true,
}: {
	hasItemInitiallySelected?: boolean;
}) => {
	const [selectedMenuItemId, setSelectedMenuItemId] = useState<string | null>(
		hasItemInitiallySelected ? 'item-4' : null,
	);
	return (
		<div css={styles.root}>
			<SideNavContent>
				<MenuList>
					<ExpandableMenuItem isDefaultExpanded>
						<ExpandableMenuItemTrigger>Expandable trigger level 1</ExpandableMenuItemTrigger>
						<ExpandableMenuItemContent>
							<LinkMenuItem
								href="#test"
								isSelected={selectedMenuItemId === 'item-1'}
								onClick={() => {
									setSelectedMenuItemId('item-1');
								}}
								elemBefore={<HomeIcon label="" color="currentColor" spacing="spacious" />}
							>
								Item 1
							</LinkMenuItem>
							<LinkMenuItem
								href="#test"
								isSelected={selectedMenuItemId === 'item-2'}
								onClick={() => {
									setSelectedMenuItemId('item-2');
								}}
								elemBefore={<ClockIcon label="" color="currentColor" spacing="spacious" />}
							>
								Item 2
							</LinkMenuItem>
							<ExpandableMenuItem isDefaultExpanded>
								<ExpandableMenuItemTrigger
									isSelected={selectedMenuItemId === 'trigger-level-2'}
									onClick={() => {
										setSelectedMenuItemId('trigger-level-2');
									}}
									href="#test"
								>
									Expandable trigger level 2 (selectable)
								</ExpandableMenuItemTrigger>
								<ExpandableMenuItemContent>
									<LinkMenuItem
										href="#test"
										isSelected={selectedMenuItemId === 'item-3'}
										onClick={() => {
											setSelectedMenuItemId('item-3');
										}}
										actionsOnHover={<MockActions shouldRenderToParent />}
									>
										Item 3
									</LinkMenuItem>
									<ExpandableMenuItem isDefaultExpanded>
										<ExpandableMenuItemTrigger
											isSelected={selectedMenuItemId === 'trigger-level-3'}
											onClick={() => {
												setSelectedMenuItemId('trigger-level-3');
											}}
											href="#test"
										>
											Expandable trigger level 3 (selectable)
										</ExpandableMenuItemTrigger>
										<ExpandableMenuItemContent>
											<LinkMenuItem
												href="#test"
												isSelected={selectedMenuItemId === 'item-4'}
												elemBefore={<HomeIcon label="" color="currentColor" spacing="spacious" />}
												onClick={() => {
													setSelectedMenuItemId('item-4');
												}}
											>
												Item 4
											</LinkMenuItem>
											<LinkMenuItem
												href="#test"
												isSelected={selectedMenuItemId === 'item-5'}
												onClick={() => {
													setSelectedMenuItemId('item-5');
												}}
												actions={<MockActions shouldRenderToParent />}
											>
												Item 5
											</LinkMenuItem>
											<ExpandableMenuItem>
												<ExpandableMenuItemTrigger>
													Expandable trigger level 4
												</ExpandableMenuItemTrigger>
												<ExpandableMenuItemContent>
													<LinkMenuItem
														href="#test"
														isSelected={selectedMenuItemId === 'item-6'}
														onClick={() => {
															setSelectedMenuItemId('item-6');
														}}
													>
														Item 6
													</LinkMenuItem>
													<LinkMenuItem
														href="#test"
														isSelected={selectedMenuItemId === 'item-7'}
														onClick={() => {
															setSelectedMenuItemId('item-7');
														}}
													>
														Item 7
													</LinkMenuItem>
												</ExpandableMenuItemContent>
											</ExpandableMenuItem>
										</ExpandableMenuItemContent>
									</ExpandableMenuItem>
									<LinkMenuItem
										href="#test"
										isSelected={selectedMenuItemId === 'item-8'}
										onClick={() => {
											setSelectedMenuItemId('item-8');
										}}
									>
										Item 8
									</LinkMenuItem>
								</ExpandableMenuItemContent>
							</ExpandableMenuItem>
						</ExpandableMenuItemContent>
					</ExpandableMenuItem>
				</MenuList>
			</SideNavContent>
			<Button
				onClick={() => {
					setSelectedMenuItemId(null);
				}}
			>
				Clear selection
			</Button>
		</div>
	);
};
export const ExpandableMenuItemNestedNoSelection = () => (
	<ExpandableMenuItemNested hasItemInitiallySelected={false} />
);
export const ExpandableMenuItemNestedRTL = () => (
	<div dir="rtl">
		<ExpandableMenuItemNested />
	</div>
);
export const ExpandableMenuItemCollapsedWithSelectedChild = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger>Parent menu item</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<LinkMenuItem href="#test" isSelected>
							Selected item
						</LinkMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger elemBefore={<HomeIcon label="" color={token('color.icon')} />}>
						Parent menu item with elemBefore
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<LinkMenuItem href="#test" isSelected>
							Selected item
						</LinkMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ExpandableMenuItemLink = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger href="#">Parent menu item</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ExpandableMenuItemWithAllOptions = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger
						elemBefore={<HomeIcon label="" color={token('color.icon')} />}
						actions={<AddAction shouldRenderToParent />}
						actionsOnHover={<MoreAction shouldRenderToParent />}
						elemAfter={<Lozenge>Elem after</Lozenge>}
						href="#"
						testId="parent-menu-item"
					>
						Parent menu item
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
const ExpandableMenuItemWithAllOptionsPortalledPopups = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger
						elemBefore={<HomeIcon label="" color={token('color.icon')} />}
						actions={<AddAction shouldRenderToParent={false} />}
						actionsOnHover={<MoreAction shouldRenderToParent={false} />}
						elemAfter={<Lozenge>Elem after</Lozenge>}
						href="#"
					>
						Parent menu item
					</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem>Item 1</ButtonMenuItem>
						<ButtonMenuItem>Item 2</ButtonMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ExpandableMenuItemWithDropdownActionOpen = ({
	isSelected,
}: {
	isSelected?: boolean;
}) => (
	<div css={styles.root}>
		<MenuList>
			<ExpandableMenuItem>
				<ExpandableMenuItemTrigger
					href="#test"
					isSelected={isSelected}
					elemBefore={<HomeIcon label="" color={token('color.icon')} />}
					actions={
						<DropdownMenu
							defaultOpen
							shouldRenderToParent
							trigger={({ triggerRef, ...props }) => (
								<IconButton
									ref={triggerRef}
									{...props}
									spacing="compact"
									appearance="subtle"
									label="More"
									icon={(iconProps) => <MoreIcon {...iconProps} size="small" />}
								/>
							)}
						>
							<DropdownItemGroup>
								<DropdownItem>Manage starred</DropdownItem>
								<DropdownItem>Export</DropdownItem>
							</DropdownItemGroup>
						</DropdownMenu>
					}
				>
					Parent menu item
				</ExpandableMenuItemTrigger>
				<ExpandableMenuItemContent>
					<ButtonMenuItem>Item 1</ButtonMenuItem>
					<ButtonMenuItem>Item 2</ButtonMenuItem>
				</ExpandableMenuItemContent>
			</ExpandableMenuItem>
		</MenuList>
	</div>
);
export const ExpandableMenuItemSelectedWithDropdownActionOpen = () => (
	<ExpandableMenuItemWithDropdownActionOpen isSelected />
);
const ExampleWrapper = ({ children }: { children: React.ReactNode }) => (
	<div css={styles.wrapper}>{children}</div>
);
// Combining into one example for atlaskit site
const Example = () => (
	<div>
		<ExampleWrapper>
			Unselectable
			<ExpandableMenuItemUnselectable />
		</ExampleWrapper>
		<ExampleWrapper>
			Selectable
			<ExpandableMenuItemSelectable />
		</ExampleWrapper>
		<ExampleWrapper>
			Selected
			<ExpandableMenuItemSelected />
		</ExampleWrapper>
		<ExampleWrapper>
			With icon (elemBefore)
			<ExpandableMenuItemWithIcon />
		</ExampleWrapper>
		<ExampleWrapper>
			Selected with icon (elemBefore)
			<ExpandableMenuItemSelectedWithIcon />
		</ExampleWrapper>
		<ExampleWrapper>
			With element after (elemAfter)
			<ExpandableMenuItemWithElemAfter />
		</ExampleWrapper>
		<ExampleWrapper>
			With actions
			<ExpandableMenuItemWithActions />
		</ExampleWrapper>
		<ExampleWrapper>
			Selected with actions
			<ExpandableMenuItemSelectedWithActions />
		</ExampleWrapper>
		<ExampleWrapper>
			With actions on hover
			<ExpandableMenuItemWithActionsOnHover />
		</ExampleWrapper>
		<ExampleWrapper>
			Selected with actions on hover
			<ExpandableMenuItemSelectedWithActionsOnHover />
		</ExampleWrapper>
		<ExampleWrapper>
			Expanded with actions on hover
			<ExpandableMenuItemExpandedWithActionsOnHover />
		</ExampleWrapper>
		<ExampleWrapper>
			With actions on hover and element after
			<ExpandableMenuItemWithActionsOnHoverAndElemAfter />
		</ExampleWrapper>
		<ExampleWrapper>
			Expanded with actions on hover and element after
			<ExpandableMenuItemExpandedWithActionsOnHoverAndElemAfter />
		</ExampleWrapper>
		<ExampleWrapper>
			With actions and element after
			<ExpandableMenuItemWithActionsAndElemAfter />
		</ExampleWrapper>
		<ExampleWrapper>
			Nested
			<ExpandableMenuItemNested />
		</ExampleWrapper>
		<ExampleWrapper>
			<div dir="rtl">Nested RTL</div>
			<ExpandableMenuItemNestedRTL />
		</ExampleWrapper>
		<ExampleWrapper>
			Collapsed with selected child
			<ExpandableMenuItemCollapsedWithSelectedChild />
		</ExampleWrapper>
		<ExampleWrapper>
			Expandable link
			<ExpandableMenuItemLink />
		</ExampleWrapper>
		<ExampleWrapper>
			Expandable with all options
			<ExpandableMenuItemWithAllOptions />
		</ExampleWrapper>
		<ExampleWrapper>
			Expandable with all options (portalled popups)
			<ExpandableMenuItemWithAllOptionsPortalledPopups />
		</ExampleWrapper>
		<ExampleWrapper>
			Controlled
			<ExpandableMenuItemControlled />
		</ExampleWrapper>
	</div>
);
export default Example;
```
```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { jsx } from '@compiled/react';
import { IconButton } from '@atlaskit/button/new';
import { cssMap } from '@atlaskit/css';
import Heading from '@atlaskit/heading';
import AddIcon from '@atlaskit/icon/core/add';
import AlignTextLeftIcon from '@atlaskit/icon/core/align-text-left';
import BoardIcon from '@atlaskit/icon/core/board';
import ClockIcon from '@atlaskit/icon/core/clock';
import InboxIcon from '@atlaskit/icon/core/inbox';
import MegaphoneIcon from '@atlaskit/icon/core/megaphone';
import ProjectIcon from '@atlaskit/icon/core/project';
import MoreIcon from '@atlaskit/icon/core/show-more-horizontal';
import Lozenge from '@atlaskit/lozenge';
import { Main } from '@atlaskit/navigation-system/layout/main';
import { PanelSplitter } from '@atlaskit/navigation-system/layout/panel-splitter';
import { Root } from '@atlaskit/navigation-system/layout/root';
import {
	SideNav,
	SideNavContent,
	SideNavFooter,
	SideNavHeader,
	SideNavToggleButton,
} from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import {
	ExpandableMenuItem,
	ExpandableMenuItemContent,
	ExpandableMenuItemTrigger,
} from '@atlaskit/navigation-system/side-nav-items/expandable-menu-item';
import {
	FlyoutMenuItem,
	FlyoutMenuItemContent,
	FlyoutMenuItemTrigger,
} from '@atlaskit/navigation-system/side-nav-items/flyout-menu-item';
import { LinkMenuItem } from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
import { Divider } from '@atlaskit/navigation-system/side-nav-items/menu-section';
import { CreateButton, Settings } from '@atlaskit/navigation-system/top-nav-items';
import { token } from '@atlaskit/tokens';
import { WithResponsiveViewport } from './utils/example-utils';
const headingStyles = cssMap({
	root: {
		paddingInline: token('space.300'),
		paddingBlockStart: token('space.300'),
	},
});
function NestedExpandable({ children, label }: { children?: React.ReactNode; label: string }) {
	return (
		<ExpandableMenuItem isDefaultExpanded>
			<ExpandableMenuItemTrigger
				elemBefore={<ProjectIcon label="" color="currentColor" />}
				elemAfter={<Lozenge>elem after</Lozenge>}
				actions={
					<IconButton
						key="add"
						label="Add"
						icon={(iconProps) => <AddIcon {...iconProps} size="small" />}
						appearance="subtle"
						spacing="compact"
					/>
				}
				actionsOnHover={
					<IconButton
						key="more"
						label="More"
						icon={(iconProps) => <MoreIcon {...iconProps} size="small" />}
						appearance="subtle"
						spacing="compact"
					/>
				}
			>
				{label}
			</ExpandableMenuItemTrigger>
			<ExpandableMenuItemContent>{children}</ExpandableMenuItemContent>
		</ExpandableMenuItem>
	);
}
export function MenuItemsDeeplyNestedVR() {
	return <MenuItemsDeeplyNestedExample isDeepNestedItemSelected={false} />;
}
export function MenuItemsDeeplyNestedSelectedVR() {
	return <MenuItemsDeeplyNestedExample isDeepNestedItemSelected />;
}
function MenuItemsDeeplyNestedExample({
	isDeepNestedItemSelected = false,
}: {
	isDeepNestedItemSelected?: boolean;
}) {
	return (
		<WithResponsiveViewport>
			<Root>
				<TopNav>
					<TopNavStart>
						<SideNavToggleButton
							testId="side-nav-toggle-button"
							collapseLabel="Collapse sidebar"
							expandLabel="Expand sidebar"
						/>
					</TopNavStart>
					<TopNavMiddle>
						<CreateButton>Create</CreateButton>
					</TopNavMiddle>
					<TopNavEnd>
						<Settings label="Settings" />
					</TopNavEnd>
				</TopNav>
				<SideNav defaultWidth={240}>
					<SideNavHeader>
						<Heading size="xsmall">Settings</Heading>
					</SideNavHeader>
					<SideNavContent testId="side-nav-content">
						<LinkMenuItem href="#" elemBefore={<InboxIcon label="" color="currentColor" />}>
							Your work
						</LinkMenuItem>
						<FlyoutMenuItem>
							<FlyoutMenuItemTrigger elemBefore={<ClockIcon label="" color="currentColor" />}>
								Recent
							</FlyoutMenuItemTrigger>
							<FlyoutMenuItemContent>
								<LinkMenuItem href="#" elemBefore={<BoardIcon label="" color="currentColor" />}>
									YNG board
								</LinkMenuItem>
								<Divider />
								<LinkMenuItem
									href="#"
									elemBefore={<AlignTextLeftIcon label="" color="currentColor" />}
								>
									View all starred items
								</LinkMenuItem>
							</FlyoutMenuItemContent>
						</FlyoutMenuItem>
						<NestedExpandable label="Project 1">
							<NestedExpandable label="Project 2">
								<NestedExpandable label="Project 3">
									<NestedExpandable label="Project 4">
										<NestedExpandable label="Project 5">
											<NestedExpandable label="Project 6">
												<NestedExpandable label="Project 7">
													<NestedExpandable label="Project 8">
														<NestedExpandable label="Project 9">
															<NestedExpandable label="Project 10">
																<NestedExpandable label="Project 11">
																	<NestedExpandable label="Project 12">
																		<NestedExpandable label="Project 13">
																			<LinkMenuItem
																				href="#"
																				elemBefore={<BoardIcon label="" color="currentColor" />}
																				elemAfter={<Lozenge>elem after</Lozenge>}
																				actions={
																					<IconButton
																						key="add"
																						label="Add"
																						icon={(iconProps) => (
																							<AddIcon {...iconProps} size="small" />
																						)}
																						appearance="subtle"
																						spacing="compact"
																					/>
																				}
																				actionsOnHover={
																					<IconButton
																						key="more"
																						label="More"
																						icon={(iconProps) => (
																							<MoreIcon {...iconProps} size="small" />
																						)}
																						appearance="subtle"
																						spacing="compact"
																					/>
																				}
																			>
																				Nested link menu item
																			</LinkMenuItem>
																			<NestedExpandable label="Project 14">
																				<NestedExpandable label="Project 15">
																					<NestedExpandable label="Project 16">
																						<NestedExpandable label="Project 17">
																							<NestedExpandable label="Project 18">
																								<NestedExpandable label="Project 19">
																									<NestedExpandable label="Project 20">
																										<LinkMenuItem
																											isSelected={isDeepNestedItemSelected}
																											href="#"
																											elemBefore={
																												<BoardIcon label="" color="currentColor" />
																											}
																											elemAfter={<Lozenge>elem after</Lozenge>}
																											actions={
																												<IconButton
																													key="add"
																													label="Add"
																													icon={(iconProps) => (
																														<AddIcon {...iconProps} size="small" />
																													)}
																													appearance="subtle"
																													spacing="compact"
																												/>
																											}
																											actionsOnHover={
																												<IconButton
																													key="more"
																													label="More"
																													icon={(iconProps) => (
																														<MoreIcon {...iconProps} size="small" />
																													)}
																													appearance="subtle"
																													spacing="compact"
																												/>
																											}
																										>
																											Nested link menu item
																										</LinkMenuItem>
																										<ButtonMenuItem
																											elemBefore={
																												<BoardIcon label="" color="currentColor" />
																											}
																											elemAfter={<Lozenge>elem after</Lozenge>}
																											actions={
																												<IconButton
																													key="add"
																													label="Add"
																													icon={(iconProps) => (
																														<AddIcon {...iconProps} size="small" />
																													)}
																													appearance="subtle"
																													spacing="compact"
																												/>
																											}
																											actionsOnHover={
																												<IconButton
																													key="more"
																													label="More"
																													icon={(iconProps) => (
																														<MoreIcon {...iconProps} size="small" />
																													)}
																													appearance="subtle"
																													spacing="compact"
																												/>
																											}
																										>
																											Nested button menu item
																										</ButtonMenuItem>
																										<FlyoutMenuItem>
																											<FlyoutMenuItemTrigger
																												elemBefore={
																													<ClockIcon
																														label=""
																														color="currentColor"
																													/>
																												}
																											>
																												Nested flyout menu item
																											</FlyoutMenuItemTrigger>
																											<FlyoutMenuItemContent>
																												<LinkMenuItem
																													href="#"
																													elemBefore={
																														<BoardIcon
																															label=""
																															color="currentColor"
																														/>
																													}
																												>
																													Flyout content
																												</LinkMenuItem>
																											</FlyoutMenuItemContent>
																										</FlyoutMenuItem>
																									</NestedExpandable>
																								</NestedExpandable>
																							</NestedExpandable>
																						</NestedExpandable>
																					</NestedExpandable>
																				</NestedExpandable>
																			</NestedExpandable>
																		</NestedExpandable>
																	</NestedExpandable>
																</NestedExpandable>
															</NestedExpandable>
														</NestedExpandable>
													</NestedExpandable>
												</NestedExpandable>
											</NestedExpandable>
										</NestedExpandable>
									</NestedExpandable>
								</NestedExpandable>
							</NestedExpandable>
						</NestedExpandable>
					</SideNavContent>
					<SideNavFooter>
						<LinkMenuItem href="#" elemBefore={<MegaphoneIcon label="" color="currentColor" />}>
							Give feedback on the new navigation
						</LinkMenuItem>
					</SideNavFooter>
					<PanelSplitter label="Resize side nav" />
				</SideNav>
				<Main id="main-container">
					<div css={headingStyles.root}>
						<Heading size="small">Board settings</Heading>
					</div>
				</Main>
			</Root>
		</WithResponsiveViewport>
	);
}
export default MenuItemsDeeplyNestedExample;
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | Should contain `ExpandableMenuItemTrigger` and `ExpandableMenuItemContent` (required) |
| `dropIndicator` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | A slot to render a drop indicator on an entire menu item (trigger + content) |
| `isDefaultExpanded` | `boolean` | The default expanded state of the menu item |
| `isExpanded` | `boolean` | The controlled expanded state of the menu item |
| `onExpansionToggle` | `(isExpanded: boolean) => void` | Called when the user has interacted with the menu item to expand or collapse it |

### FlyoutMenuItem component
A navigation menu item that shows additional content in a flyout panel when activated.
- **Keywords:** navigation, menu, item, flyout, popup, dropdown
- **Categories:** navigation, interaction
- **Status:** beta
#### Examples
```tsx
/**
 * @jsxFrag
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { useState } from 'react';
import { cssMap, jsx } from '@compiled/react';
import { IconButton } from '@atlaskit/button/new';
import AddIcon from '@atlaskit/icon/core/add';
import ClockIcon from '@atlaskit/icon/core/clock';
import { ButtonItem } from '@atlaskit/menu';
import { COLLAPSE_ELEM_BEFORE, MenuList } from '@atlaskit/navigation-system';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import {
	FlyoutMenuItem,
	FlyoutMenuItemContent,
	FlyoutMenuItemTrigger,
} from '@atlaskit/navigation-system/side-nav-items/flyout-menu-item';
import Popup from '@atlaskit/popup';
import { Stack } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';
const wrapperStyles = cssMap({
	root: {
		width: '300px',
	},
});
const ExampleWrapper = ({ children }: { children: React.ReactNode }) => (
	<div css={wrapperStyles.root}>
		<MenuList>{children}</MenuList>
	</div>
);
const FlyoutMenuItemControlled = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<ExampleWrapper>
			<FlyoutMenuItem isOpen={isOpen}>
				<FlyoutMenuItemTrigger onClick={() => setIsOpen(!isOpen)}>
					Flyout Menu Item (controlled)
				</FlyoutMenuItemTrigger>
				<FlyoutMenuItemContent onClose={() => setIsOpen(false)}>
					<MenuList>
						<ButtonMenuItem>Menu Button 1</ButtonMenuItem>
						<ButtonMenuItem>Menu Button 2</ButtonMenuItem>
					</MenuList>
				</FlyoutMenuItemContent>
			</FlyoutMenuItem>
		</ExampleWrapper>
	);
};
export const FlyoutMenuItemExample = () => (
	<ExampleWrapper>
		<FlyoutMenuItem>
			<FlyoutMenuItemTrigger>Flyout Menu Item</FlyoutMenuItemTrigger>
			<FlyoutMenuItemContent>
				<MenuList>
					<ButtonMenuItem>Menu Button 1</ButtonMenuItem>
					<ButtonMenuItem>Menu Button 2</ButtonMenuItem>
				</MenuList>
			</FlyoutMenuItemContent>
		</FlyoutMenuItem>
		<FlyoutMenuItem>
			<FlyoutMenuItemTrigger
				elemBefore={<ClockIcon label="" spacing="spacious" color={token('color.icon')} />}
			>
				Flyout Menu Item with icon and long text
			</FlyoutMenuItemTrigger>
			<FlyoutMenuItemContent>
				<MenuList>
					<ButtonMenuItem>Button Menu Item 1</ButtonMenuItem>
					<ButtonMenuItem>Button Menu Item 2</ButtonMenuItem>
				</MenuList>
			</FlyoutMenuItemContent>
		</FlyoutMenuItem>
		<FlyoutMenuItem>
			<FlyoutMenuItemTrigger elemBefore="🙂">Flyout with emoji</FlyoutMenuItemTrigger>
			<FlyoutMenuItemContent>
				<MenuList>
					<ButtonMenuItem>Button Menu Item 1</ButtonMenuItem>
					<ButtonMenuItem>Button Menu Item 2</ButtonMenuItem>
				</MenuList>
			</FlyoutMenuItemContent>
		</FlyoutMenuItem>
		<FlyoutMenuItem>
			<FlyoutMenuItemTrigger isSelected>Flyout Menu Item - selected</FlyoutMenuItemTrigger>
			<FlyoutMenuItemContent>
				<MenuList>
					<ButtonMenuItem>Menu Button 1</ButtonMenuItem>
					<ButtonMenuItem>Menu Button 2</ButtonMenuItem>
				</MenuList>
			</FlyoutMenuItemContent>
		</FlyoutMenuItem>
		<FlyoutMenuItem>
			<FlyoutMenuItemTrigger elemBefore={COLLAPSE_ELEM_BEFORE}>
				Flyout with collapsed elemBefore
			</FlyoutMenuItemTrigger>
			<FlyoutMenuItemContent>
				<MenuList>
					<ButtonMenuItem>Menu Button 1</ButtonMenuItem>
					<ButtonMenuItem>Menu Button 2</ButtonMenuItem>
				</MenuList>
			</FlyoutMenuItemContent>
		</FlyoutMenuItem>
	</ExampleWrapper>
);
export const FlyoutMenuItemDefaultOpenExample = ({ isSelected }: { isSelected?: boolean }) => (
	<ExampleWrapper>
		<FlyoutMenuItem isDefaultOpen>
			<FlyoutMenuItemTrigger
				elemBefore={<ClockIcon label="" spacing="spacious" color={token('color.icon')} />}
				isSelected={isSelected}
			>
				Flyout Menu Item
			</FlyoutMenuItemTrigger>
			<FlyoutMenuItemContent>
				<MenuList>
					<ButtonMenuItem>Button Menu Item 1</ButtonMenuItem>
					<ButtonMenuItem
						actions={
							<IconButton
								key="add"
								label="Add"
								icon={(iconProps) => <AddIcon {...iconProps} size="small" />}
								appearance="subtle"
								spacing="compact"
							/>
						}
					>
						Button Menu Item 2
					</ButtonMenuItem>
				</MenuList>
			</FlyoutMenuItemContent>
		</FlyoutMenuItem>
	</ExampleWrapper>
);
export const FlyoutMenuItemDefaultOpenSelectedVR = () => (
	<FlyoutMenuItemDefaultOpenExample isSelected />
);
export const FlyoutMenuItemWithNestedPopupExample = ({
	isDefaultOpen = false,
}: {
	isDefaultOpen?: boolean;
}) => {
	const [isNestedPopupOpen, setIsNestedPopupOpen] = useState(isDefaultOpen);
	return (
		<ExampleWrapper>
			<FlyoutMenuItem
				onOpenChange={(open) => {
					if (!open) {
						setIsNestedPopupOpen(false);
					}
				}}
				isDefaultOpen={isDefaultOpen}
			>
				<FlyoutMenuItemTrigger>Flyout with nested popup</FlyoutMenuItemTrigger>
				<FlyoutMenuItemContent>
					<MenuList>
						<ButtonMenuItem
							actions={
								<Popup
									shouldRenderToParent
									isOpen={isNestedPopupOpen}
									onClose={() => setIsNestedPopupOpen(false)}
									placement="right-start"
									content={() => (
										<div>
											<ButtonItem>Menu button 1</ButtonItem>
											<ButtonItem>Menu button 2</ButtonItem>
											<ButtonItem>Menu button 3</ButtonItem>
										</div>
									)}
									trigger={(triggerProps) => (
										<IconButton
											{...triggerProps}
											icon={(iconProps) => <AddIcon {...iconProps} size="small" />}
											label="Add"
											appearance="subtle"
											spacing="compact"
											onClick={() => setIsNestedPopupOpen(!isNestedPopupOpen)}
											isSelected={isNestedPopupOpen}
										/>
									)}
								/>
							}
						>
							With a popup
						</ButtonMenuItem>
						<ButtonMenuItem>Menu Item 2</ButtonMenuItem>
					</MenuList>
				</FlyoutMenuItemContent>
			</FlyoutMenuItem>
		</ExampleWrapper>
	);
};
export const FlyoutMenuItemWithNestedPopupDefaultOpenExample = () => (
	<FlyoutMenuItemWithNestedPopupExample isDefaultOpen />
);
export const FlyoutMenuItemRTL = () => (
	<div dir="rtl">
		<FlyoutMenuItemExample />
	</div>
);
export const FlyoutMenuItemDefaultOpenRTL = () => (
	<div dir="rtl">
		<FlyoutMenuItemDefaultOpenExample />
	</div>
);
export const FlyoutMenuItemTriggerBasic = () => (
	<ExampleWrapper>
		<FlyoutMenuItem>
			<FlyoutMenuItemTrigger>Flyout menu item</FlyoutMenuItemTrigger>
		</FlyoutMenuItem>
	</ExampleWrapper>
);
export const FlyoutMenuItemTriggerSelected = () => (
	<ExampleWrapper>
		<FlyoutMenuItem>
			<FlyoutMenuItemTrigger isSelected>Flyout menu item</FlyoutMenuItemTrigger>
		</FlyoutMenuItem>
	</ExampleWrapper>
);
// Combining into one example for atlaskit site
const Example = () => (
	<Stack space="space.200">
		<div>
			Default
			<FlyoutMenuItemExample />
		</div>
		<div>
			Default open
			<FlyoutMenuItemDefaultOpenExample />
		</div>
		<div>
			With nested popup
			<FlyoutMenuItemWithNestedPopupExample />
		</div>
		<div>
			<div dir="rtl">RTL</div>
			<FlyoutMenuItemRTL />
		</div>
		<FlyoutMenuItemControlled />
	</Stack>
);
export default Example;
```
```tsx
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { bind } from 'bind-event-listener';
import AlignTextLeftIcon from '@atlaskit/icon/core/align-text-left';
import BoardIcon from '@atlaskit/icon/core/board';
import ClockIcon from '@atlaskit/icon/core/clock';
import ShowMoreHorizontalIcon from '@atlaskit/icon/core/show-more-horizontal';
import StarUnstarredIcon from '@atlaskit/icon/core/star-unstarred';
import { Root } from '@atlaskit/navigation-system/layout/root';
import { SideNav, SideNavContent } from '@atlaskit/navigation-system/layout/side-nav';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import {
	FlyoutMenuItem,
	FlyoutMenuItemContent,
	FlyoutMenuItemTrigger,
} from '@atlaskit/navigation-system/side-nav-items/flyout-menu-item';
import { Divider } from '@atlaskit/navigation-system/side-nav-items/menu-section';
import { WithResponsiveViewport } from './utils/example-utils';
/**
 * Listener callbacks supplied by consumers when registering. They will be called by the manager to
 * open or close the consumer when appropriate.
 */
type Listeners = {
	onOpen: () => void;
	onClose: () => void;
};
/**
 * Returned by the manager when a consumer registers.
 */
type Registration = {
	/**
	 * Should be called by the consumer when it needs to open.
	 */
	open: () => void;
	/**
	 * Should be called by the consumer when unmounting to remove the registration.
	 */
	cleanup: () => void;
};
type Manager = {
	register: (listeners: Listeners) => Registration;
};
const ManagerContext = createContext<Manager>({
	register: () => ({
		open: () => {},
		cleanup: () => {},
	}),
});
function getManager(): Manager {
	const ledger = new Map<Registration, Listeners>();
	function register(listeners: Listeners): Registration {
		const registration: Registration = {
			open() {
				Array.from(ledger).forEach(([item, callbacks]) => {
					if (item === registration) {
						callbacks.onOpen();
						return;
					}
					callbacks.onClose();
				});
			},
			cleanup() {
				ledger.delete(registration);
			},
		};
		ledger.set(registration, listeners);
		return registration;
	}
	return { register };
}
function FlyoutWithShortcut({
	label,
	shortcutKey,
	elemBefore,
	children,
}: {
	label: string;
	shortcutKey: string;
	elemBefore: React.ReactNode;
	children: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const manager = useContext(ManagerContext);
	useEffect(
		function mount() {
			const registration = manager.register({
				onOpen: () => setIsOpen(true),
				onClose: () => setIsOpen(false),
			});
			const cleanupEvents = bind(window, {
				type: 'keydown',
				listener: (event: KeyboardEvent) => {
					if (event.key === shortcutKey) {
						registration.open();
					}
				},
			});
			return function unmount() {
				registration.cleanup();
				cleanupEvents();
			};
		},
		[manager, shortcutKey],
	);
	const closeFlyout = useCallback(() => setIsOpen(false), []);
	const toggleFlyout = useCallback(() => setIsOpen((prev) => !prev), []);
	return (
		<FlyoutMenuItem isOpen={isOpen} onOpenChange={setIsOpen}>
			<FlyoutMenuItemTrigger elemBefore={elemBefore} onClick={toggleFlyout}>
				{label}
			</FlyoutMenuItemTrigger>
			<FlyoutMenuItemContent onClose={closeFlyout}>{children}</FlyoutMenuItemContent>
		</FlyoutMenuItem>
	);
}
export default function MultipleFlyoutMenuExample() {
	const [manager] = useState(() => getManager());
	return (
		<WithResponsiveViewport>
			<Root>
				<SideNav>
					<SideNavContent>
						<ManagerContext.Provider value={manager}>
							<FlyoutWithShortcut
								label="Recent"
								shortcutKey="r"
								elemBefore={<ClockIcon label="" color="currentColor" />}
							>
								<ButtonMenuItem elemBefore={<BoardIcon label="" color="currentColor" />}>
									ABC board
								</ButtonMenuItem>
								<Divider />
								<ButtonMenuItem elemBefore={<AlignTextLeftIcon label="" color="currentColor" />}>
									View all recent items
								</ButtonMenuItem>
							</FlyoutWithShortcut>
							<FlyoutWithShortcut
								label="Starred"
								shortcutKey="s"
								elemBefore={<StarUnstarredIcon label="" color="currentColor" />}
							>
								<ButtonMenuItem elemBefore={<BoardIcon label="" color="currentColor" />}>
									YNG board
								</ButtonMenuItem>
								<Divider />
								<ButtonMenuItem elemBefore={<AlignTextLeftIcon label="" color="currentColor" />}>
									View all starred items
								</ButtonMenuItem>
							</FlyoutWithShortcut>
						</ManagerContext.Provider>
						<ButtonMenuItem elemBefore={<ShowMoreHorizontalIcon label="" color="currentColor" />}>
							More
						</ButtonMenuItem>
					</SideNavContent>
				</SideNav>
			</Root>
		</WithResponsiveViewport>
	);
}
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | Should contain `FlyoutMenuItemTrigger` and `FlyoutMenuItemContent` (required) |
| `id` | `string` | ID that is assigned to the popup container element and used to associate the trigger with the content |
| `isDefaultOpen` | `boolean` | Whether the flyout menu is open by default |
| `isOpen` | `boolean` | Allows to control the open state of the flyout externally |
| `onOpenChange` | `(isOpen: boolean) => void` | Callback that is called when the flyout menu is opened or closed |

### ButtonMenuItem component
A navigation menu item that behaves like a button, triggering actions rather than navigation.
- **Keywords:** navigation, menu, item, button, action, click
- **Categories:** navigation, interaction
- **Status:** beta
#### Examples
```tsx
/**
 * @jsxfrag
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { useState } from 'react';
import Avatar from '@atlaskit/avatar';
import { IconButton } from '@atlaskit/button/new';
import { cssMap, jsx } from '@atlaskit/css';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import AddIcon from '@atlaskit/icon/core/add';
import HomeIcon from '@atlaskit/icon/core/home';
import MoreIcon from '@atlaskit/icon/core/show-more-horizontal';
import Lozenge from '@atlaskit/lozenge';
import { ButtonItem } from '@atlaskit/menu';
import { MenuList } from '@atlaskit/navigation-system';
import { SideNavContent } from '@atlaskit/navigation-system/layout/side-nav';
import {
	ButtonMenuItem,
	COLLAPSE_ELEM_BEFORE,
} from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import Popup from '@atlaskit/popup';
import { Stack } from '@atlaskit/primitives';
const styles = cssMap({
	root: {
		width: '300px',
	},
});
const AddAction = ({ shouldRenderToParent }: { shouldRenderToParent?: boolean }) => (
	<DropdownMenu
		shouldRenderToParent={shouldRenderToParent}
		trigger={({ triggerRef, ...props }) => (
			<IconButton
				ref={triggerRef}
				{...props}
				spacing="compact"
				appearance="subtle"
				label="Add"
				icon={(iconProps) => <AddIcon {...iconProps} size="small" />}
			/>
		)}
	>
		<DropdownItemGroup>
			<DropdownItem>Create</DropdownItem>
			<DropdownItem>Import</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
);
const MoreAction = ({ shouldRenderToParent }: { shouldRenderToParent?: boolean }) => (
	<DropdownMenu
		shouldRenderToParent={shouldRenderToParent}
		trigger={({ triggerRef, ...props }) => (
			<IconButton
				ref={triggerRef}
				{...props}
				spacing="compact"
				appearance="subtle"
				label="More"
				icon={(iconProps) => <MoreIcon {...iconProps} size="small" />}
			/>
		)}
	>
		<DropdownItemGroup>
			<DropdownItem>Manage starred</DropdownItem>
			<DropdownItem>Export</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
);
const MockActions = ({ shouldRenderToParent }: { shouldRenderToParent: boolean }) => (
	<>
		<AddAction shouldRenderToParent={shouldRenderToParent} />
		<MoreAction shouldRenderToParent={shouldRenderToParent} />
	</>
);
const homeIcon = <HomeIcon label="" color="currentColor" spacing="spacious" />;
const elemAfter = <Lozenge>elem after</Lozenge>;
export const ButtonMenuItemExample = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<ButtonMenuItem>Text only</ButtonMenuItem>
				<ButtonMenuItem elemBefore={COLLAPSE_ELEM_BEFORE}>
					Text only (collapse elemBefore)
				</ButtonMenuItem>
				<ButtonMenuItem elemBefore={homeIcon}>With elemBefore</ButtonMenuItem>
				<ButtonMenuItem elemBefore={homeIcon}>
					With elemBefore and long overflowing text
				</ButtonMenuItem>
				<ButtonMenuItem elemBefore="🙂">Emoji as elemBefore</ButtonMenuItem>
				<ButtonMenuItem
					elemBefore={homeIcon}
					description="This is an example of a long description"
				>
					With description
				</ButtonMenuItem>
				<ButtonMenuItem
					elemBefore={
						<IconButton icon={HomeIcon} label="IconButton" appearance="subtle" spacing="compact" />
					}
				>
					With icon button as elemBefore
				</ButtonMenuItem>
				<ButtonMenuItem elemBefore={<Avatar />}>With avatar</ButtonMenuItem>
				<ButtonMenuItem elemBefore={homeIcon} actions={<MockActions shouldRenderToParent />}>
					With actions
				</ButtonMenuItem>
				<ButtonMenuItem
					elemBefore={homeIcon}
					actions={<MockActions shouldRenderToParent={false} />}
				>
					With actions (portalled popup)
				</ButtonMenuItem>
				<ButtonMenuItem elemBefore={homeIcon} actionsOnHover={<MockActions shouldRenderToParent />}>
					With hover actions
				</ButtonMenuItem>
				<ButtonMenuItem
					elemBefore={homeIcon}
					actionsOnHover={<MockActions shouldRenderToParent={false} />}
				>
					With hover actions (portalled popup)
				</ButtonMenuItem>
				<ButtonMenuItem elemBefore={homeIcon} actionsOnHover={<MockActions shouldRenderToParent />}>
					With hover actions and elemBefore and long text
				</ButtonMenuItem>
				<ButtonMenuItem elemBefore={homeIcon} elemAfter={elemAfter}>
					With elemAfter
				</ButtonMenuItem>
				<ButtonMenuItem
					elemBefore={homeIcon}
					elemAfter={elemAfter}
					actions={<MockActions shouldRenderToParent />}
				>
					With elemAfter and actions
				</ButtonMenuItem>
				<ButtonMenuItem
					elemBefore={homeIcon}
					elemAfter={elemAfter}
					actions={<MockActions shouldRenderToParent={false} />}
				>
					With elemAfter and actions (portalled popup)
				</ButtonMenuItem>
				<ButtonMenuItem
					elemBefore={homeIcon}
					actions={<AddAction shouldRenderToParent />}
					actionsOnHover={<MoreAction shouldRenderToParent />}
				>
					With actions and hover actions
				</ButtonMenuItem>
				<ButtonMenuItem
					elemBefore={homeIcon}
					actions={<AddAction shouldRenderToParent={false} />}
					actionsOnHover={<MoreAction shouldRenderToParent={false} />}
				>
					With actions and hover actions (portalled popup)
				</ButtonMenuItem>
				<ButtonMenuItem
					elemBefore={homeIcon}
					elemAfter={elemAfter}
					actionsOnHover={<MoreAction shouldRenderToParent />}
				>
					With elemAfter and hover actions
				</ButtonMenuItem>
				<ButtonMenuItem
					elemBefore={homeIcon}
					elemAfter={elemAfter}
					actionsOnHover={<MoreAction shouldRenderToParent={false} />}
				>
					With elemAfter and hover actions (portalled popup)
				</ButtonMenuItem>
				<ButtonMenuItem
					description="A long description that should be truncated"
					elemBefore={homeIcon}
					actions={<AddAction shouldRenderToParent />}
					elemAfter={elemAfter}
					actionsOnHover={<MoreAction shouldRenderToParent />}
				>
					With all options and long text
				</ButtonMenuItem>
				<ButtonMenuItem
					description="A long description that should be truncated"
					elemBefore={homeIcon}
					actions={<AddAction shouldRenderToParent={false} />}
					elemAfter={elemAfter}
					actionsOnHover={<MoreAction shouldRenderToParent={false} />}
				>
					With all options and long text (portalled popup)
				</ButtonMenuItem>
				<ButtonMenuItem elemBefore={homeIcon} isDisabled>
					Disabled
				</ButtonMenuItem>
				<ButtonMenuItem elemBefore={homeIcon} isDisabled description="with description">
					Disabled
				</ButtonMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const ButtonMenuItemRTLExample = () => (
	<div dir="rtl">
		<ButtonMenuItemExample />
	</div>
);
export const ButtonMenuItemWithPopup = () => {
	const [isNestedPopupOpen, setIsNestedPopupOpen] = useState(false);
	const [isNestedPopup2Open, setIsNestedPopup2Open] = useState(true);
	return (
		<div css={styles.root}>
			<SideNavContent>
				<MenuList>
					<ButtonMenuItem
						elemBefore={homeIcon}
						actions={
							<Popup
								shouldRenderToParent
								isOpen={isNestedPopupOpen}
								onClose={() => setIsNestedPopupOpen(false)}
								placement="bottom-start"
								content={() => (
									<div>
										<ButtonItem>Menu item 1</ButtonItem>
										<ButtonItem>Menu item 2</ButtonItem>
									</div>
								)}
								trigger={(triggerProps) => (
									<IconButton
										{...triggerProps}
										icon={(iconProps) => <AddIcon {...iconProps} size="small" />}
										label="Add"
										appearance="subtle"
										spacing="compact"
										onClick={() => setIsNestedPopupOpen(!isNestedPopupOpen)}
										isSelected={isNestedPopupOpen}
									/>
								)}
							/>
						}
					>
						With popup rendered in portal
					</ButtonMenuItem>
					<ButtonMenuItem
						elemBefore={homeIcon}
						actions={
							<Popup
								shouldRenderToParent
								isOpen={isNestedPopup2Open}
								onClose={() => setIsNestedPopup2Open(false)}
								placement="bottom-start"
								content={() => (
									<div>
										<ButtonItem>Menu item 1</ButtonItem>
										<ButtonItem>Menu item 2</ButtonItem>
									</div>
								)}
								trigger={(triggerProps) => (
									<IconButton
										{...triggerProps}
										icon={(iconProps) => <AddIcon {...iconProps} size="small" />}
										label="Add"
										appearance="subtle"
										spacing="compact"
										onClick={() => setIsNestedPopup2Open(!isNestedPopup2Open)}
										isSelected={isNestedPopup2Open}
									/>
								)}
							/>
						}
					>
						With popup rendered to parent
					</ButtonMenuItem>
					<ButtonMenuItem
						elemBefore={homeIcon}
						elemAfter={elemAfter}
						actions={<AddAction shouldRenderToParent />}
					>
						With elemAfter and action
					</ButtonMenuItem>
				</MenuList>
			</SideNavContent>
		</div>
	);
};
export const ButtonMenuItemWithElemAfter = () => (
	<div css={styles.root}>
		<MenuList>
			<ButtonMenuItem elemBefore={homeIcon} elemAfter={elemAfter}>
				With elemAfter
			</ButtonMenuItem>
		</MenuList>
	</div>
);
export const ButtonMenuItemWithElemAfterAndActionsOnHover = () => (
	<div css={styles.root}>
		<MenuList>
			<ButtonMenuItem
				elemBefore={homeIcon}
				elemAfter={elemAfter}
				actionsOnHover={<MockActions shouldRenderToParent />}
			>
				With elemAfter and actionsOnHover
			</ButtonMenuItem>
		</MenuList>
	</div>
);
const ExportAction = ({
	shouldRenderToParent,
	defaultOpen,
}: {
	shouldRenderToParent?: boolean;
	defaultOpen?: boolean;
}) => (
	<DropdownMenu
		defaultOpen={defaultOpen}
		shouldRenderToParent={shouldRenderToParent}
		trigger={({ triggerRef, ...props }) => (
			<IconButton
				ref={triggerRef}
				{...props}
				spacing="compact"
				appearance="subtle"
				label="More"
				icon={(iconProps) => <MoreIcon {...iconProps} size="small" />}
			/>
		)}
	>
		<DropdownItemGroup>
			<DropdownItem>Export</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
);
export const ButtonMenuItemWithDropdownActionOpen = () => (
	<div css={styles.root}>
		<MenuList>
			<Stack space="space.800">
				<ButtonMenuItem actions={<ExportAction shouldRenderToParent defaultOpen />}>
					Dropdown open (actions)
				</ButtonMenuItem>
				<ButtonMenuItem actions={<ExportAction shouldRenderToParent={false} defaultOpen />}>
					Portalled dropdown open (actions)
				</ButtonMenuItem>
				<ButtonMenuItem actionsOnHover={<ExportAction shouldRenderToParent defaultOpen />}>
					Dropdown open (actionsOnHover)
				</ButtonMenuItem>
				<ButtonMenuItem actionsOnHover={<ExportAction shouldRenderToParent={false} defaultOpen />}>
					Portalled dropdown open (actionsOnHover)
				</ButtonMenuItem>
				<ButtonMenuItem
					elemAfter={<Lozenge>elem after</Lozenge>}
					actionsOnHover={<ExportAction shouldRenderToParent defaultOpen />}
				>
					elemAfter and dropdown open (actionsOnHover)
				</ButtonMenuItem>
				<ButtonMenuItem
					elemAfter={<Lozenge>elem after</Lozenge>}
					actionsOnHover={<ExportAction shouldRenderToParent={false} defaultOpen />}
				>
					elemAfter and portalled dropdown open (actionsOnHover)
				</ButtonMenuItem>
			</Stack>
		</MenuList>
	</div>
);
export const ButtonMenuItemDisabled = () => (
	<div css={styles.root}>
		<MenuList>
			<ButtonMenuItem elemBefore={homeIcon} isDisabled>
				Disabled
			</ButtonMenuItem>
		</MenuList>
	</div>
);
export const ButtonMenuItemDisabledWithActions = () => (
	<div css={styles.root}>
		<MenuList>
			<ButtonMenuItem
				elemBefore={homeIcon}
				isDisabled
				actions={<AddAction />}
				actionsOnHover={<MoreAction />}
			>
				Disabled with actions
			</ButtonMenuItem>
		</MenuList>
	</div>
);
export const ButtonMenuItemBasic = () => (
	<div css={styles.root}>
		<MenuList>
			<ButtonMenuItem elemBefore={homeIcon}>Basic button menu item</ButtonMenuItem>
		</MenuList>
	</div>
);
// Combining into one example for atlaskit site
const Example = () => (
	<div>
		<ButtonMenuItemExample />
		<div>With popup</div>
		<ButtonMenuItemWithPopup />
		<div dir="rtl">RTL</div>
		<ButtonMenuItemRTLExample />
	</div>
);
export default Example;
```
```tsx
/**
 * @jsxfrag
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useState } from 'react';
import { IconButton } from '@atlaskit/button/new';
import { cssMap, jsx } from '@atlaskit/css';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import AddIcon from '@atlaskit/icon/core/add';
import HomeIcon from '@atlaskit/icon/core/home';
import MoreIcon from '@atlaskit/icon/core/show-more-horizontal';
import Lozenge from '@atlaskit/lozenge';
import { ButtonItem } from '@atlaskit/menu';
import { MenuList } from '@atlaskit/navigation-system';
import { SideNavContent } from '@atlaskit/navigation-system/layout/side-nav';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import { Popup } from '@atlaskit/popup';
const styles = cssMap({
	root: {
		width: '300px',
	},
});
const AddAction = ({ shouldRenderToParent }: { shouldRenderToParent?: boolean }) => (
	<DropdownMenu
		shouldRenderToParent={shouldRenderToParent}
		trigger={({ triggerRef, ...props }) => (
			<IconButton
				ref={triggerRef}
				{...props}
				spacing="compact"
				appearance="subtle"
				label="Add"
				icon={(iconProps) => <AddIcon {...iconProps} size="small" />}
			/>
		)}
	>
		<DropdownItemGroup>
			<DropdownItem>Create</DropdownItem>
			<DropdownItem>Import</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
);
const MoreAction = ({
	shouldRenderToParent,
	triggerTestId,
}: {
	shouldRenderToParent?: boolean;
	triggerTestId?: string;
}) => (
	<DropdownMenu
		shouldRenderToParent={shouldRenderToParent}
		trigger={({ triggerRef, ...props }) => (
			<IconButton
				ref={triggerRef}
				{...props}
				spacing="compact"
				appearance="subtle"
				label="More"
				icon={(iconProps) => <MoreIcon {...iconProps} size="small" />}
				testId={triggerTestId}
			/>
		)}
	>
		<DropdownItemGroup>
			<DropdownItem>Manage starred</DropdownItem>
			<DropdownItem>Export</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
);
const homeIcon = <HomeIcon label="" color="currentColor" spacing="spacious" />;
const elemAfter = <Lozenge>elem after</Lozenge>;
function ButtonMenuItemWithPopup({
	shouldRenderToParent,
	testId,
}: {
	shouldRenderToParent: boolean;
	testId?: string;
}) {
	const [isNestedPopupOpen, setIsNestedPopupOpen] = useState(false);
	return (
		<ButtonMenuItem
			testId={testId}
			elemBefore={homeIcon}
			actionsOnHover={
				<Popup
					shouldRenderToParent={shouldRenderToParent}
					isOpen={isNestedPopupOpen}
					onClose={() => setIsNestedPopupOpen(false)}
					placement="bottom-start"
					content={({ setInitialFocusRef }) => (
						<div>
							<ButtonItem ref={setInitialFocusRef}>Menu item 1</ButtonItem>
							<ButtonItem>Menu item 2</ButtonItem>
						</div>
					)}
					trigger={(triggerProps) => (
						<IconButton
							{...triggerProps}
							icon={(iconProps) => <AddIcon {...iconProps} size="small" />}
							label="Add"
							appearance="subtle"
							spacing="compact"
							onClick={() => setIsNestedPopupOpen(!isNestedPopupOpen)}
							isSelected={isNestedPopupOpen}
							testId={testId ? `${testId}--add-action` : undefined}
						/>
					)}
				/>
			}
		>
			With popup {!shouldRenderToParent && '(portalled popup)'}
		</ButtonMenuItem>
	);
}
function ButtonMenuItemExample() {
	return (
		<div css={styles.root}>
			<SideNavContent>
				<MenuList>
					<ButtonMenuItem
						elemBefore={homeIcon}
						actionsOnHover={
							<MoreAction
								shouldRenderToParent
								triggerTestId="button-menu-item-with-hover-actions--more-action"
							/>
						}
						testId="button-menu-item-with-hover-actions"
					>
						With hover actions
					</ButtonMenuItem>
					<ButtonMenuItem
						elemBefore={homeIcon}
						actionsOnHover={<MoreAction shouldRenderToParent={false} />}
						testId="button-menu-item-with-hover-actions-portalled-popup"
					>
						With hover actions (portalled popup)
					</ButtonMenuItem>
					<ButtonMenuItem
						elemBefore={homeIcon}
						actions={<AddAction shouldRenderToParent />}
						actionsOnHover={<MoreAction shouldRenderToParent />}
					>
						With actions and hover actions
					</ButtonMenuItem>
					<ButtonMenuItem
						elemBefore={homeIcon}
						actions={<AddAction shouldRenderToParent={false} />}
						actionsOnHover={<MoreAction shouldRenderToParent={false} />}
					>
						With actions and hover actions (portalled popup)
					</ButtonMenuItem>
					<ButtonMenuItem
						description="A long description that should be truncated"
						elemBefore={homeIcon}
						actions={<AddAction shouldRenderToParent />}
						elemAfter={elemAfter}
						actionsOnHover={<MoreAction shouldRenderToParent />}
					>
						With all options and long text
					</ButtonMenuItem>
					<ButtonMenuItem
						description="A long description that should be truncated"
						elemBefore={homeIcon}
						actions={<AddAction shouldRenderToParent={false} />}
						elemAfter={elemAfter}
						actionsOnHover={<MoreAction shouldRenderToParent={false} />}
					>
						With all options and long text (portalled popup)
					</ButtonMenuItem>
					<ButtonMenuItemWithPopup
						shouldRenderToParent={true}
						testId="button-menu-item-with-popup"
					/>
					<ButtonMenuItemWithPopup
						shouldRenderToParent={false}
						testId="button-menu-item-with-popup-portalled-popup"
					/>
				</MenuList>
			</SideNavContent>
		</div>
	);
}
export default ButtonMenuItemExample;
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `actions` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | `ReactNode` to be placed visually after the `children` |
| `actionsOnHover` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | `ReactNode` to be placed visually after the `children` and will
only be displayed on hover or focus |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | The main textual content and label of the menu item (required) |
| `description` | `string` | Additional textual content for the menu item |
| `dropIndicator` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | A slot to render drop indicators for drag and drop operations on the menu item |
| `elemAfter` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | `ReactNode` to be placed visually after the `children` |
| `elemBefore` | `ReactNode \| typeof COLLAPSE_ELEM_BEFORE` | `ReactNode` to be placed visually before the `children` |
| `hasDragIndicator` | `boolean` | Whether this menu item can be dragged |
| `isContentTooltipDisabled` | `boolean` | Disable tooltip for menu item content |
| `isDisabled` | `boolean` | We are not using a discriminated union to enforce that the `actions` and `actionsOnHover`
props are not used when `isDisabled` is true due to ergonomic type issues with `boolean`
types (as oppposed to literal `true` or `false` types), e |
| `isDragging` | `boolean` | Whether the element is being dragged |
| `listItemRef` | `((instance: HTMLDivElement) => void) \| RefObject<HTMLDivElement>` | Exposes the `<div role="listitem">` element that wraps the entire item |
| `onClick` | `(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, analyticsEvent: UIAnalyticsEvent) => void` | Called when the user has clicked on the trigger content |
| `visualContentRef` | `((instance: HTMLDivElement) => void) \| RefObject<HTMLDivElement>` | Exposes the visually complete menu item, including:

- the main interactive element (exposed through `ref`)
- any `elemBefore`, `elemAfter`, `actions`, or `actionsOnHover`

This specifically excludes the wrapping list item,
which is also exposed through either:
- the `listItemRef` prop for LinkMenuItem and ButtonMenuItem
- the `ref` prop for FlyoutMenuItem and ExpandableMenuItem |

### LinkMenuItem component
A navigation menu item that behaves like a link, navigating to different pages or sections.
- **Keywords:** navigation, menu, item, link, href, anchor
- **Categories:** navigation, interaction
- **Status:** beta
#### Examples
```tsx
/**
 * @jsxfrag
 * @jsxRuntime classic
 * @jsx jsx
 */
import Avatar from '@atlaskit/avatar';
import { IconButton } from '@atlaskit/button/new';
import { cssMap, jsx } from '@atlaskit/css';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import AddIcon from '@atlaskit/icon/core/add';
import HomeIcon from '@atlaskit/icon/core/home';
import MoreIcon from '@atlaskit/icon/core/show-more-horizontal';
import Lozenge from '@atlaskit/lozenge';
import { MenuList } from '@atlaskit/navigation-system';
import { SideNavContent } from '@atlaskit/navigation-system/layout/side-nav';
import {
	COLLAPSE_ELEM_BEFORE,
	LinkMenuItem,
} from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
import { Stack } from '@atlaskit/primitives';
const styles = cssMap({
	root: {
		width: '300px',
	},
});
const AddAction = ({ shouldRenderToParent }: { shouldRenderToParent: boolean }) => (
	<DropdownMenu
		shouldRenderToParent={shouldRenderToParent}
		trigger={({ triggerRef, ...props }) => (
			<IconButton
				ref={triggerRef}
				{...props}
				spacing="compact"
				appearance="subtle"
				label="Add"
				icon={(iconProps) => <AddIcon {...iconProps} size="small" />}
			/>
		)}
	>
		<DropdownItemGroup>
			<DropdownItem>Create</DropdownItem>
			<DropdownItem>Import</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
);
const MoreAction = ({ shouldRenderToParent }: { shouldRenderToParent: boolean }) => (
	<DropdownMenu
		shouldRenderToParent={shouldRenderToParent}
		trigger={({ triggerRef, ...props }) => (
			<IconButton
				ref={triggerRef}
				{...props}
				spacing="compact"
				appearance="subtle"
				label="More"
				icon={(iconProps) => <MoreIcon {...iconProps} size="small" />}
			/>
		)}
	>
		<DropdownItemGroup>
			<DropdownItem>Manage starred</DropdownItem>
			<DropdownItem>Export</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
);
const MockActions = ({ shouldRenderToParent }: { shouldRenderToParent: boolean }) => (
	<>
		<AddAction shouldRenderToParent={shouldRenderToParent} />
		<MoreAction shouldRenderToParent={shouldRenderToParent} />
	</>
);
const homeIcon = <HomeIcon label="" color="currentColor" spacing="spacious" />;
const homeIconButton = (
	<IconButton icon={HomeIcon} label="IconButton" appearance="subtle" spacing="compact" />
);
const elemAfter = <Lozenge>elem after</Lozenge>;
export const LinkMenuItemExample = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<LinkMenuItem href="#">Text only</LinkMenuItem>
				<LinkMenuItem href="#" elemBefore={COLLAPSE_ELEM_BEFORE}>
					Text only (collapse elemBefore)
				</LinkMenuItem>
				<LinkMenuItem href="#" elemBefore={homeIcon}>
					With elemBefore
				</LinkMenuItem>
				<LinkMenuItem href="#" elemBefore={homeIcon}>
					With elemBefore and long overflowing text
				</LinkMenuItem>
				<LinkMenuItem href="#" elemBefore="🙂">
					Emoji as elemBefore
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					description="This is an example of a long description"
				>
					With description
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					description="This is an example of a long description"
					isSelected
				>
					Description and selected
				</LinkMenuItem>
				<LinkMenuItem href="#" elemBefore={homeIconButton}>
					With icon button as elemBefore
				</LinkMenuItem>
				<LinkMenuItem href="#" elemBefore={homeIcon} isSelected>
					Selected
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					isSelected
					actions={<MockActions shouldRenderToParent />}
				>
					Selected with actions
				</LinkMenuItem>
				<LinkMenuItem href="#" elemBefore={<Avatar />}>
					With avatar
				</LinkMenuItem>
				<LinkMenuItem href="#" elemBefore={homeIcon} actions={<MockActions shouldRenderToParent />}>
					With actions
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					actions={<MockActions shouldRenderToParent={false} />}
				>
					With actions (portalled popup)
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					actionsOnHover={<MockActions shouldRenderToParent />}
				>
					With hover actions
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					actionsOnHover={<MockActions shouldRenderToParent={false} />}
				>
					With hover actions (portalled popup)
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					actionsOnHover={<MockActions shouldRenderToParent />}
				>
					With hover actions and elemBefore and long text
				</LinkMenuItem>
				<LinkMenuItem href="#" elemBefore={homeIcon} elemAfter={elemAfter}>
					With elemAfter
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					elemAfter={elemAfter}
					actions={<MockActions shouldRenderToParent />}
				>
					With elemAfter and actions
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					elemAfter={elemAfter}
					actions={<MockActions shouldRenderToParent />}
				>
					With elemAfter and actions (portalled popup)
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					actions={<AddAction shouldRenderToParent />}
					actionsOnHover={<MoreAction shouldRenderToParent />}
				>
					With actions and hoverActions
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					actions={<AddAction shouldRenderToParent={false} />}
					actionsOnHover={<MoreAction shouldRenderToParent={false} />}
				>
					With actions and hoverActions (portalled popup)
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					elemAfter={elemAfter}
					actionsOnHover={<MoreAction shouldRenderToParent />}
				>
					With elemAfter and hoverActions
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemBefore={homeIcon}
					elemAfter={elemAfter}
					actionsOnHover={<MoreAction shouldRenderToParent={false} />}
				>
					With elemAfter and hoverActions (portalled popup)
				</LinkMenuItem>
				<LinkMenuItem
					description="A long description that should be truncated"
					href="#"
					elemBefore={homeIconButton}
					actions={<AddAction shouldRenderToParent />}
					elemAfter={elemAfter}
					actionsOnHover={<MoreAction shouldRenderToParent />}
				>
					With all options and long text
				</LinkMenuItem>
				<LinkMenuItem
					description="A long description that should be truncated"
					href="#"
					elemBefore={homeIconButton}
					actions={<AddAction shouldRenderToParent={false} />}
					elemAfter={elemAfter}
					actionsOnHover={<MoreAction shouldRenderToParent={false} />}
				>
					With all options and long text (portalled popup)
				</LinkMenuItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export const LinkMenuItemRTLExample = () => (
	<div dir="rtl">
		<LinkMenuItemExample />
	</div>
);
export const LinkMenuItemWithElemAfter = () => (
	<div css={styles.root}>
		<MenuList>
			<LinkMenuItem href="#" elemBefore={homeIcon} elemAfter={elemAfter}>
				With elemAfter
			</LinkMenuItem>
		</MenuList>
	</div>
);
export const LinkMenuItemWithElemAfterAndActionsOnHover = () => (
	<div css={styles.root}>
		<MenuList>
			<LinkMenuItem
				href="#"
				elemBefore={homeIcon}
				elemAfter={elemAfter}
				actionsOnHover={<MockActions shouldRenderToParent />}
			>
				With elemAfter and actionsOnHover
			</LinkMenuItem>
		</MenuList>
	</div>
);
export const LinkMenuItemBasic = () => (
	<div css={styles.root}>
		<MenuList>
			<LinkMenuItem href="#" elemBefore={homeIcon}>
				Basic link menu item
			</LinkMenuItem>
		</MenuList>
	</div>
);
export const LinkMenuItemSelected = () => (
	<div css={styles.root}>
		<MenuList>
			<LinkMenuItem href="#" isSelected elemBefore={homeIcon}>
				Selected link menu item
			</LinkMenuItem>
		</MenuList>
	</div>
);
const ExportAction = ({
	shouldRenderToParent,
	defaultOpen,
}: {
	shouldRenderToParent?: boolean;
	defaultOpen?: boolean;
}) => (
	<DropdownMenu
		defaultOpen={defaultOpen}
		shouldRenderToParent={shouldRenderToParent}
		trigger={({ triggerRef, ...props }) => (
			<IconButton
				ref={triggerRef}
				{...props}
				spacing="compact"
				appearance="subtle"
				label="More"
				icon={(iconProps) => <MoreIcon {...iconProps} size="small" />}
			/>
		)}
	>
		<DropdownItemGroup>
			<DropdownItem>Export</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
);
export const LinkMenuItemWithDropdownActionOpen = ({ isSelected }: { isSelected?: boolean }) => (
	<div css={styles.root}>
		<MenuList>
			<Stack space="space.800">
				<LinkMenuItem href="#" actions={<ExportAction shouldRenderToParent defaultOpen />}>
					Dropdown open (actions)
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					isSelected
					actions={<ExportAction shouldRenderToParent defaultOpen />}
				>
					Selected with dropdown open (actions)
				</LinkMenuItem>
				<LinkMenuItem href="#" actions={<ExportAction shouldRenderToParent={false} defaultOpen />}>
					Portalled dropdown open (actions)
				</LinkMenuItem>
				<LinkMenuItem href="#" actionsOnHover={<ExportAction shouldRenderToParent defaultOpen />}>
					Dropdown open (actionsOnHover)
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					actionsOnHover={<ExportAction shouldRenderToParent={false} defaultOpen />}
				>
					Portalled dropdown open (actionsOnHover)
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemAfter={<Lozenge>elem after</Lozenge>}
					actionsOnHover={<ExportAction shouldRenderToParent defaultOpen />}
				>
					elemAfter and dropdown open (actionsOnHover)
				</LinkMenuItem>
				<LinkMenuItem
					href="#"
					elemAfter={<Lozenge>elem after</Lozenge>}
					actionsOnHover={<ExportAction shouldRenderToParent={false} defaultOpen />}
				>
					elemAfter and portalled dropdown open (actionsOnHover)
				</LinkMenuItem>
			</Stack>
		</MenuList>
	</div>
);
// Combining into one example for atlaskit site
const Example = () => (
	<div>
		<LinkMenuItemExample />
		<div dir="rtl">RTL</div>
		<LinkMenuItemRTLExample />
	</div>
);
export default Example;
```
```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { jsx } from '@compiled/react';
import { IconButton } from '@atlaskit/button/new';
import { cssMap } from '@atlaskit/css';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Heading from '@atlaskit/heading';
import AlignTextLeftIcon from '@atlaskit/icon/core/align-text-left';
import AppsIcon from '@atlaskit/icon/core/apps';
import BoardIcon from '@atlaskit/icon/core/board';
import BoardsIcon from '@atlaskit/icon/core/boards';
import ClockIcon from '@atlaskit/icon/core/clock';
import FilterIcon from '@atlaskit/icon/core/filter';
import InboxIcon from '@atlaskit/icon/core/inbox';
import MagicWandIcon from '@atlaskit/icon/core/magic-wand';
import ProjectIcon from '@atlaskit/icon/core/project';
import ScalesIcon from '@atlaskit/icon/core/scales';
import ShowMoreHorizontal from '@atlaskit/icon/core/show-more-horizontal';
import StarUnstarredIcon from '@atlaskit/icon/core/star-unstarred';
import { ConfluenceIcon } from '@atlaskit/logo';
import { Main } from '@atlaskit/navigation-system/layout/main';
import { PanelSplitter } from '@atlaskit/navigation-system/layout/panel-splitter';
import { Root } from '@atlaskit/navigation-system/layout/root';
import {
	SideNav,
	SideNavContent,
	SideNavToggleButton,
} from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import {
	ExpandableMenuItem,
	ExpandableMenuItemContent,
	ExpandableMenuItemTrigger,
} from '@atlaskit/navigation-system/side-nav-items/expandable-menu-item';
import {
	FlyoutMenuItem,
	FlyoutMenuItemContent,
	FlyoutMenuItemTrigger,
} from '@atlaskit/navigation-system/side-nav-items/flyout-menu-item';
import { LinkMenuItem } from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
import { MenuList } from '@atlaskit/navigation-system/side-nav-items/menu-list';
import { Divider } from '@atlaskit/navigation-system/side-nav-items/menu-section';
import {
	AppLogo,
	AppSwitcher,
	CreateButton,
	Help,
	Search,
	Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { Stack } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';
const headingStyles = cssMap({
	root: {
		paddingInline: token('space.300'),
		paddingBlockStart: token('space.300'),
	},
});
export default function MenuItemIntegrationExample() {
	return (
		<Root>
			<TopNav>
				<TopNavStart>
					<SideNavToggleButton
						testId="side-nav-toggle-button"
						collapseLabel="Collapse sidebar"
						expandLabel="Expand sidebar"
					/>
					<AppSwitcher label="Switch apps" />
					<AppLogo href="" icon={ConfluenceIcon} name="Confluence" label="Home page" />
				</TopNavStart>
				<TopNavMiddle>
					<Search label="Search" />
					<CreateButton>Create</CreateButton>
				</TopNavMiddle>
				<TopNavEnd>
					<Help label="Help" />
					<Settings label="Settings" />
				</TopNavEnd>
			</TopNav>
			<SideNav label="Side navigation">
				<SideNavContent>
					<MenuList>
						<LinkMenuItem href="#" elemBefore={<InboxIcon label="" color="currentColor" />}>
							Your work
						</LinkMenuItem>
						<LinkMenuItem href="#" elemBefore={<AppsIcon label="" color="currentColor" />}>
							Apps
						</LinkMenuItem>
						<ExpandableMenuItem>
							<ExpandableMenuItemTrigger elemBefore={<ProjectIcon label="" color="currentColor" />}>
								Projects
							</ExpandableMenuItemTrigger>
							<ExpandableMenuItemContent>
								<ButtonMenuItem elemBefore={<ScalesIcon label="" color="currentColor" />}>
									Blueshift
								</ButtonMenuItem>
								<ExpandableMenuItem>
									<ExpandableMenuItemTrigger
										elemBefore={<MagicWandIcon label="" color="currentColor" />}
									>
										DST - Claret
									</ExpandableMenuItemTrigger>
									<ExpandableMenuItemContent>
										<ButtonMenuItem elemBefore={<BoardIcon label="" color="currentColor" />}>
											Navigation
										</ButtonMenuItem>
										<ButtonMenuItem elemBefore={<BoardsIcon label="" color="currentColor" />}>
											View all boards
										</ButtonMenuItem>
									</ExpandableMenuItemContent>
								</ExpandableMenuItem>
							</ExpandableMenuItemContent>
						</ExpandableMenuItem>
						<FlyoutMenuItem>
							<FlyoutMenuItemTrigger elemBefore={<ClockIcon label="" color="currentColor" />}>
								Recent
							</FlyoutMenuItemTrigger>
							<FlyoutMenuItemContent>
								<MenuList>
									<ButtonMenuItem elemBefore={<BoardIcon label="" color="currentColor" />}>
										YNG board
									</ButtonMenuItem>
									<Divider />
									<ButtonMenuItem elemBefore={<AlignTextLeftIcon label="" color="currentColor" />}>
										View all recent items
									</ButtonMenuItem>
								</MenuList>
							</FlyoutMenuItemContent>
						</FlyoutMenuItem>
						<ButtonMenuItem
							elemAfter={
								<DropdownMenu
									shouldRenderToParent
									trigger={({ triggerRef: ref, ...props }) => (
										<IconButton
											ref={ref}
											{...props}
											spacing="compact"
											appearance="subtle"
											label="Starred more options"
											icon={(iconProps) => <ShowMoreHorizontal {...iconProps} size="small" />}
										/>
									)}
								>
									<DropdownItemGroup>
										<DropdownItem>Manage starred</DropdownItem>
									</DropdownItemGroup>
								</DropdownMenu>
							}
							elemBefore={<StarUnstarredIcon color="currentColor" label="" />}
						>
							Starred
						</ButtonMenuItem>
						<ButtonMenuItem
							elemAfter={
								<DropdownMenu
									shouldRenderToParent
									trigger={({ triggerRef: ref, ...props }) => (
										<IconButton
											ref={ref}
											{...props}
											spacing="compact"
											appearance="subtle"
											label="Filters more options"
											icon={(iconProps) => <ShowMoreHorizontal {...iconProps} size="small" />}
										/>
									)}
								>
									<DropdownItemGroup>
										<DropdownItem>Manage filters</DropdownItem>
									</DropdownItemGroup>
								</DropdownMenu>
							}
							elemBefore={<FilterIcon color="currentColor" label="" />}
						>
							Filters
						</ButtonMenuItem>
					</MenuList>
				</SideNavContent>
				<PanelSplitter label="Resize sidebar" />
			</SideNav>
			<Main id="main-container">
				<Stack space="space.100" xcss={headingStyles.root}>
					<Heading size="small">Settings</Heading>
				</Stack>
			</Main>
		</Root>
	);
}
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `actions` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | `ReactNode` to be placed visually after the `children` |
| `actionsOnHover` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | `ReactNode` to be placed visually after the `children` and will
only be displayed on hover or focus |
| `children` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | The main textual content and label of the menu item (required) |
| `description` | `string` | Additional textual content for the menu item |
| `dropIndicator` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | A slot to render drop indicators for drag and drop operations on the menu item |
| `elemAfter` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | `ReactNode` to be placed visually after the `children` |
| `elemBefore` | `React.ReactNode \| typeof COLLAPSE_ELEM_BEFORE` | `ReactNode` to be placed visually before the `children` |
| `hasDragIndicator` | `boolean` | Whether this menu item can be dragged |
| `href` | `string \| RouterLinkConfig` | Standard links can be provided as a string, which should be mapped to the
underlying router link component (required) |
| `isContentTooltipDisabled` | `boolean` | Disable tooltip for menu item content |
| `isDragging` | `boolean` | Whether the element is being dragged |
| `isSelected` | `boolean` | Whether the menu item is selected |
| `listItemRef` | `((instance: HTMLDivElement) => void) \| React.RefObject<HTMLDivElement>` | Exposes the `<div role="listitem">` element that wraps the entire item |
| `onClick` | `(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, analyticsEvent: UIAnalyticsEvent) => void` | Called when the user has clicked on the trigger content |
| `target` | `string` | The native `target` attribute for the anchor element |
| `visualContentRef` | `((instance: HTMLDivElement) => void) \| React.RefObject<HTMLDivElement>` | Exposes the visually complete menu item, including:

- the main interactive element (exposed through `ref`)
- any `elemBefore`, `elemAfter`, `actions`, or `actionsOnHover`

This specifically excludes the wrapping list item,
which is also exposed through either:
- the `listItemRef` prop for LinkMenuItem and ButtonMenuItem
- the `ref` prop for FlyoutMenuItem and ExpandableMenuItem |

### MenuSection component
A container component for grouping related navigation items with optional headings and dividers.
- **Keywords:** navigation, menu, section, group, heading, divider
- **Categories:** navigation, layout
- **Status:** beta
#### Examples
```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { cssMap, jsx } from '@compiled/react';
import HomeIcon from '@atlaskit/icon/core/home';
import { SideNavContent } from '@atlaskit/navigation-system/layout/side-nav';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import { MenuList } from '@atlaskit/navigation-system/side-nav-items/menu-list';
import { MenuListItem } from '@atlaskit/navigation-system/side-nav-items/menu-list-item';
import {
	Divider,
	MenuSection,
	MenuSectionHeading,
} from '@atlaskit/navigation-system/side-nav-items/menu-section';
import { token } from '@atlaskit/tokens';
const homeIcon = <HomeIcon label="" color="currentColor" spacing="spacious" />;
const styles = cssMap({
	root: {
		width: '300px',
	},
	blackBorder: {
		borderWidth: token('border.width'),
		borderStyle: 'solid',
		borderColor: 'black',
		borderRadius: token('radius.small', '3px'),
	},
});
export const DividerExample = () => (
	<div css={[styles.root, styles.blackBorder]}>
		<h2>Divider</h2>
		<Divider />
		<h3>lorem ipsum</h3>
	</div>
);
export const MenuSectionExample = () => (
	<div css={styles.root}>
		<SideNavContent>
			<MenuList>
				<MenuListItem>
					<MenuSection>
						<MenuSectionHeading>Starred</MenuSectionHeading>
						<MenuList>
							<ButtonMenuItem elemBefore={homeIcon}>Menu Item</ButtonMenuItem>
							<ButtonMenuItem elemBefore={homeIcon}>Menu Item 2</ButtonMenuItem>
						</MenuList>
						<Divider />
					</MenuSection>
				</MenuListItem>
				<MenuListItem>
					<MenuSection>
						<MenuSectionHeading>Recent</MenuSectionHeading>
						<MenuList>
							<ButtonMenuItem>Menu Item</ButtonMenuItem>
							<ButtonMenuItem>Menu Item 2</ButtonMenuItem>
						</MenuList>
						<Divider />
					</MenuSection>
				</MenuListItem>
				<MenuListItem>
					<MenuSection>
						<MenuList>
							<ButtonMenuItem elemBefore={homeIcon}>Menu Item</ButtonMenuItem>
							<ButtonMenuItem elemBefore={homeIcon}>Menu Item 2</ButtonMenuItem>
						</MenuList>
					</MenuSection>
				</MenuListItem>
			</MenuList>
		</SideNavContent>
	</div>
);
export default MenuSectionExample;
```
```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { cssMap, jsx } from '@compiled/react';
import Avatar from '@atlaskit/avatar';
import { SideNavContent } from '@atlaskit/navigation-system/layout/side-nav';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import {
	ExpandableMenuItem,
	ExpandableMenuItemContent,
	ExpandableMenuItemTrigger,
} from '@atlaskit/navigation-system/side-nav-items/expandable-menu-item';
import { LinkMenuItem } from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
import { token } from '@atlaskit/tokens';
const styles = cssMap({
	root: {
		width: '300px',
		borderColor: token('color.border.accent.gray'),
		borderWidth: token('border.width'),
		borderStyle: 'solid',
	},
});
export function MenuListExample() {
	return (
		// Disabling this rule as this is a storybook, and the code is designed to swallow anchor-clicks
		// to avoid leaving storybook.
		<nav css={styles.root} onClick={(evt) => evt.preventDefault()}>
			<SideNavContent>
				<ButtonMenuItem>Text only</ButtonMenuItem>
				<ButtonMenuItem elemBefore={<Avatar />}>With avatar</ButtonMenuItem>
				<ButtonMenuItem description="A long description that should be truncated">
					With all options and long text
				</ButtonMenuItem>
				<LinkMenuItem href="#">Link Text only</LinkMenuItem>
				<LinkMenuItem href="#" elemBefore={<Avatar />}>
					Link With avatar
				</LinkMenuItem>
				<LinkMenuItem href="#" description="A long description that should be truncated">
					Link With all options and long text
				</LinkMenuItem>
				<ExpandableMenuItem>
					<ExpandableMenuItemTrigger>Parent menu item</ExpandableMenuItemTrigger>
					<ExpandableMenuItemContent>
						<ButtonMenuItem description="A long description that should be truncated">
							With all options and long text
						</ButtonMenuItem>
						<LinkMenuItem href="#" elemBefore={<Avatar />}>
							Link With avatar
						</LinkMenuItem>
					</ExpandableMenuItemContent>
				</ExpandableMenuItem>
			</SideNavContent>
		</nav>
	);
}
export default MenuListExample;
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal` | The contents of the menu section |
| `isMenuListItem` | `boolean` | Wraps the `MenuSection` in a `MenuListItem` so that it can validly be the child of a `MenuList`

In the future this will become the default behavior, and the prop will be removed |

### CreateButton component
A specialized button component for the top navigation that triggers creation actions.
- **Keywords:** navigation, top, button, create, add, new, action
- **Categories:** navigation, interaction
- **Status:** beta
#### Examples
```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { jsx } from '@compiled/react';
import AKBadge from '@atlaskit/badge';
import AtlassianIntelligenceIcon from '@atlaskit/icon/core/atlassian-intelligence';
import SearchIcon from '@atlaskit/icon/core/search';
import { ConfluenceIcon } from '@atlaskit/logo';
import { Root } from '@atlaskit/navigation-system/layout/root';
import { SideNavToggleButton } from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import {
	AppLogo,
	AppSwitcher,
	ChatButton,
	CreateButton,
	EndItem,
	Help,
	Profile,
	Search,
	Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { Notifications } from '@atlaskit/navigation-system/top-nav-items/notifications';
import { token } from '@atlaskit/tokens';
import { WithResponsiveViewport } from './utils/example-utils';
import { MockSearch } from './utils/mock-search';
const Badge = () => <AKBadge appearance="important">{5}</AKBadge>;
export const TopNavigationExample = () => (
	<WithResponsiveViewport>
		{/**
		 * Wrapping in `Root to ensure the TopNav height is set correctly, as it would in a proper composed usage.
		 * Root sets the top bar height CSS variable that TopNav uses to set its height
		 */}
		<Root>
			<TopNav>
				<TopNavStart>
					<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
					<AppSwitcher label="App switcher" onClick={() => alert('app switcher')} />
					<AppLogo
						href="http://www.atlassian.design"
						icon={ConfluenceIcon}
						name="Confluence"
						label="Home page"
					/>
				</TopNavStart>
				<TopNavMiddle>
					<Search onClick={() => alert('mobile search')} label="Search" />
					<CreateButton onClick={() => alert('create')}>Create</CreateButton>
				</TopNavMiddle>
				<TopNavEnd>
					<ChatButton onClick={() => alert('chat')}>Chat</ChatButton>
					<EndItem
						icon={AtlassianIntelligenceIcon}
						onClick={() => alert('inshelligence')}
						label="Atlassian Intelligence"
					/>
					<Help onClick={() => alert('help')} label="Help" />
					<Notifications
						badge={Badge}
						onClick={() => alert('notifications')}
						label="Notifications"
					/>
					<Settings onClick={() => alert('settings')} label="Settings" />
					<Profile onClick={() => alert('User settings')} label="Your profile" />
				</TopNavEnd>
			</TopNav>
		</Root>
	</WithResponsiveViewport>
);
export const SearchRightElem = () => (
	<WithResponsiveViewport>
		<Root>
			<TopNav>
				<TopNavStart>
					<AppSwitcher label="App switcher" onClick={() => alert('app switcher')} />
				</TopNavStart>
				<TopNavMiddle>
					<Search
						iconBefore={AtlassianIntelligenceIcon}
						elemAfter={<SearchIcon spacing="spacious" color={token('color.icon')} label="" />}
						onClick={() => alert('mobile search')}
						label="Search"
					/>
					<CreateButton onClick={() => alert('create')}>Create</CreateButton>
				</TopNavMiddle>
				<TopNavEnd>
					<Settings onClick={() => alert('settings')} label="Settings" />
				</TopNavEnd>
			</TopNav>
		</Root>
	</WithResponsiveViewport>
);
export const TopNavigationEnlargedSearchInput = () => (
	<WithResponsiveViewport>
		<Root>
			<TopNav>
				<TopNavStart>
					<AppSwitcher label="App switcher" onClick={() => alert('app switcher')} />
				</TopNavStart>
				<div>
					<TopNavMiddle>
						<MockSearch isEnlarged />
						<CreateButton onClick={() => alert('create')}>Create</CreateButton>
					</TopNavMiddle>
				</div>
				<TopNavEnd>
					<Settings onClick={() => alert('settings')} label="Settings" />
				</TopNavEnd>
			</TopNav>
		</Root>
	</WithResponsiveViewport>
);
export default TopNavigationExample;
```
```tsx
import PremiumIcon from '@atlaskit/icon/core/premium';
import StarUnstarredIcon from '@atlaskit/icon/core/star-unstarred';
import { ConfluenceIcon } from '@atlaskit/logo';
import { MenuListItem } from '@atlaskit/navigation-system';
import {
	TopNavButton,
	TopNavLinkButton,
} from '@atlaskit/navigation-system/experimental/top-nav-button';
import { SideNavToggleButton } from '@atlaskit/navigation-system/layout/side-nav';
import { TopNav, TopNavEnd, TopNavStart } from '@atlaskit/navigation-system/layout/top-nav';
import { AppLogo, AppSwitcher } from '@atlaskit/navigation-system/top-nav-items';
import { MockRoot } from './utils/mock-root';
export default function TopNavigationThemedButtonsExample() {
	return (
		/**
		 * Wrapping in `Root to ensure the TopNav height is set correctly, as it would in a proper composed usage.
		 * Root sets the top bar height CSS variable that TopNav uses to set its height
		 */
		<MockRoot>
			<TopNav
				UNSAFE_theme={{
					backgroundColor: { r: 50, g: 100, b: 200 },
					highlightColor: { r: 50, g: 50, b: 50 },
				}}
			>
				{/**
				 * These styles are representative of what products have in their global stylesheets.
				 */}
				{
				<style>{`
					a, a:hover, a:focus, a:active {
						color: red;
						text-decoration: underline;
					}
				`}</style>
				<TopNavStart>
					<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
					<AppSwitcher label="App switcher" />
					<AppLogo
						href="http://www.atlassian.design"
						icon={ConfluenceIcon}
						name="Confluence"
						label="Home page"
					/>
				</TopNavStart>
				<TopNavEnd>
					<MenuListItem>
						<TopNavButton iconBefore={StarUnstarredIcon}>Button</TopNavButton>
					</MenuListItem>
					<MenuListItem>
						<TopNavLinkButton href="https://atlassian.design" iconBefore={PremiumIcon}>
							LinkButton
						</TopNavLinkButton>
					</MenuListItem>
				</TopNavEnd>
			</TopNav>
		</MockRoot>
	);
}
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | The content of the button (required) |
| `onClick` | `(e: MouseEvent<HTMLElement, globalThis.MouseEvent>, analyticsEvent: UIAnalyticsEvent) => void` | Handler called on click |

### Profile component
A user profile component for the top navigation that displays user information and account actions.
- **Keywords:** navigation, top, profile, user, avatar, account
- **Categories:** navigation, interaction
- **Status:** beta
#### Examples
```tsx
import AKBadge from '@atlaskit/badge';
import AtlassianIntelligenceIcon from '@atlaskit/icon/core/atlassian-intelligence';
import { ConfluenceIcon } from '@atlaskit/logo';
import { Root } from '@atlaskit/navigation-system/layout/root';
import { SideNavToggleButton } from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import {
	AppLogo,
	AppSwitcher,
	ChatButton,
	CreateButton,
	EndItem,
	Help,
	Profile,
	Search,
	Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { Notifications } from '@atlaskit/navigation-system/top-nav-items/notifications';
import KoalaImage from './images/koala.png';
import { WithResponsiveViewport } from './utils/example-utils';
const Badge = () => <AKBadge appearance="important">{5}</AKBadge>;
export const TopNavCustomProfileImage = () => (
	<WithResponsiveViewport>
		<Root>
			<TopNav>
				<TopNavStart>
					<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
					<AppSwitcher label="App switcher" onClick={() => alert('app switcher')} />
					<AppLogo
						href="http://www.atlassian.design"
						icon={ConfluenceIcon}
						name="Confluence"
						label="Home page"
					/>
				</TopNavStart>
				<TopNavMiddle>
					<Search onClick={() => alert('mobile search')} label="Search" />
					<CreateButton onClick={() => alert('create')}>Create</CreateButton>
				</TopNavMiddle>
				<TopNavEnd>
					<ChatButton onClick={() => alert('chat')}>Chat</ChatButton>
					<EndItem
						icon={AtlassianIntelligenceIcon}
						onClick={() => alert('inshelligence')}
						label="Atlassian Intelligence"
					/>
					<Help onClick={() => alert('help')} label="Help" />
					<Notifications
						badge={Badge}
						onClick={() => alert('notifications')}
						label="Notifications"
					/>
					<Settings label="Settings" />
					<Profile src={KoalaImage} onClick={() => alert('User settings')} label="Your profile" />
				</TopNavEnd>
			</TopNav>
		</Root>
	</WithResponsiveViewport>
);
export default TopNavCustomProfileImage;
```
```tsx
import React, { useReducer } from 'react';
import AKBadge from '@atlaskit/badge';
import { AtlassianIcon, AtlassianLogo, JiraIcon } from '@atlaskit/logo';
import { parseHex } from '@atlaskit/navigation-system/experimental/color-utils/parse-hex';
import { parseHsl } from '@atlaskit/navigation-system/experimental/color-utils/parse-hsl';
import { parseRgb } from '@atlaskit/navigation-system/experimental/color-utils/parse-rgb';
import { SideNavToggleButton } from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import {
	AppLogo,
	AppSwitcher,
	ChatButton,
	CreateButton,
	CustomLogo,
	CustomTitle,
	Help,
	Profile,
	Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { Notifications } from '@atlaskit/navigation-system/top-nav-items/notifications';
import { Stack } from '@atlaskit/primitives';
// TODO: consider exposing this type properly, but it isn't needed for normal usage
import { type CustomTheme } from '../src/ui/top-nav-items/themed/get-custom-theme-styles';
import { WithResponsiveViewport } from './utils/example-utils';
import { MockRoot } from './utils/mock-root';
import { MockSearch } from './utils/mock-search';
const Badge = () => <AKBadge appearance="important">{5}</AKBadge>;
const TopNavigationThemingInstance = ({
	customTheme,
	useCustomLogo,
}: {
	customTheme?: CustomTheme;
	useCustomLogo?: boolean;
}) => {
	const [isAppSwitcherSelected, toggleIsAppSwitcherSelected] = useReducer(
		(isSelected) => !isSelected,
		false,
	);
	const [isChatSelected, toggleIsChatSelected] = useReducer((isSelected) => !isSelected, false);
	const [isNotificationsSelected, toggleIsNotificationsSelected] = useReducer(
		(isSelected) => !isSelected,
		false,
	);
	const [isHelpSelected, toggleIsHelpSelected] = useReducer((isSelected) => !isSelected, false);
	const [isSettingsSelected, toggleIsSettingsSelected] = useReducer(
		(isSelected) => !isSelected,
		true,
	);
	const [isProfileSelected, toggleIsProfileSelected] = useReducer(
		(isSelected) => !isSelected,
		false,
	);
	return (
		/**
		 * Wrapping in `Root to ensure the TopNav height is set correctly, as it would in a proper composed usage.
		 * Root sets the top bar height CSS variable that TopNav uses to set its height
		 */
		<MockRoot>
			<TopNav UNSAFE_theme={customTheme}>
				<TopNavStart>
					<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
					<AppSwitcher
						label="App switcher"
						onClick={toggleIsAppSwitcherSelected}
						isSelected={isAppSwitcherSelected}
					/>
					{useCustomLogo ? (
						<CustomLogo
							href="http://www.atlassian.design"
							icon={AtlassianIcon}
							logo={AtlassianLogo}
							label="Home page"
						/>
					) : (
						<AppLogo
							href="http://www.atlassian.design"
							icon={JiraIcon}
							name="Jira"
							label="Home page"
						/>
					)}
					<CustomTitle>Optional custom title</CustomTitle>
				</TopNavStart>
				<TopNavMiddle>
					<MockSearch />
					<CreateButton>Create</CreateButton>
				</TopNavMiddle>
				<TopNavEnd>
					<ChatButton onClick={toggleIsChatSelected} isSelected={isChatSelected}>
						Chat
					</ChatButton>
					<Notifications
						badge={Badge}
						isSelected={isNotificationsSelected}
						onClick={toggleIsNotificationsSelected}
						label="Notifications"
					/>
					<Help label="Help" onClick={toggleIsHelpSelected} isSelected={isHelpSelected} />
					<Settings
						isSelected={isSettingsSelected}
						onClick={toggleIsSettingsSelected}
						label="Settings"
					/>
					<Profile
						isSelected={isProfileSelected}
						onClick={toggleIsProfileSelected}
						label="Your profile"
					/>
				</TopNavEnd>
			</TopNav>
		</MockRoot>
	);
};
export const TopNavigationThemingExample = () => (
	<WithResponsiveViewport>
		<Stack space="space.200">
			<TopNavigationThemingInstance
				customTheme={{ backgroundColor: parseHex('#FFF'), highlightColor: parseHex('#d8388a') }}
			/>
			<TopNavigationThemingInstance
				// Hex notation is still supported for backwards compatibility
				// Keeping at least some VR coverage for it
				customTheme={{ backgroundColor: '#e8cbd2', highlightColor: '#333' }}
			/>
			<TopNavigationThemingInstance
				customTheme={{ backgroundColor: parseHex('#ef816b'), highlightColor: parseHex('#FDEE80') }}
			/>
			<TopNavigationThemingInstance
				customTheme={{ backgroundColor: parseHex('#997A82'), highlightColor: parseHex('#333') }}
			/>
			<TopNavigationThemingInstance
				customTheme={{ backgroundColor: parseHex('#5B5FAE'), highlightColor: parseHex('#6FF2B4') }}
			/>
			<TopNavigationThemingInstance
				customTheme={{ backgroundColor: parseHex('#000448'), highlightColor: parseHex('#6FF2B4') }}
			/>
			<TopNavigationThemingInstance
				customTheme={{ backgroundColor: parseHex('#272727'), highlightColor: parseHex('#E94E34') }}
			/>
		</Stack>
	</WithResponsiveViewport>
);
export const TopNavigationThemingSingleExample = () => (
	<WithResponsiveViewport>
		<TopNavigationThemingInstance
			customTheme={{ backgroundColor: parseHex('#000448'), highlightColor: parseHex('#6FF2B4') }}
		/>
	</WithResponsiveViewport>
);
export const TopNavigationThemingSingleExampleCustomLogo = () => (
	<WithResponsiveViewport>
		<TopNavigationThemingInstance
			customTheme={{ backgroundColor: parseHex('#000448'), highlightColor: parseHex('#6FF2B4') }}
			useCustomLogo
		/>
	</WithResponsiveViewport>
);
export const TopNavigationThemingRGBExample = () => (
	<WithResponsiveViewport>
		<TopNavigationThemingInstance
			customTheme={{
				backgroundColor: parseRgb('rgb(200, 100, 0)'),
				highlightColor: parseRgb('rgb(0, 33, 66)'),
			}}
		/>
	</WithResponsiveViewport>
);
export const TopNavigationThemingHSLExample = () => (
	<WithResponsiveViewport>
		<TopNavigationThemingInstance
			customTheme={{
				backgroundColor: parseHsl('hsl(90deg, 75%, 25%)'),
				highlightColor: parseHsl('hsl(270deg, 66%, 33%)'),
			}}
		/>
	</WithResponsiveViewport>
);
export default TopNavigationThemingExample;
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `aria-controls` | `string` | Identifies the popup element that the trigger controls |
| `aria-expanded` | `boolean` | Announces to assistive technology whether the popup is currently open or closed |
| `aria-haspopup` | `boolean \| "dialog"` | Informs assistive technology that this element triggers a popup |
| `isListItem` | `boolean` | Can be used to disable the default `listitem` role |
| `isSelected` | `boolean` | Indicates that the button is selected |
| `label` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | Provide an accessible label, often used by screen readers (required) |
| `onClick` | `(e: MouseEvent<HTMLElement, globalThis.MouseEvent>, analyticsEvent: UIAnalyticsEvent) => void` | Handler called on click |
| `onMouseEnter` | `(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void` | Called when the mouse enters the element container |
| `src` | `string` | The URL of the image to display in the avatar |

### Notifications component
A notifications component for the top navigation that displays alerts and notification counts.
- **Keywords:** navigation, top, notifications, alerts, bell, badge
- **Categories:** navigation, interaction
- **Status:** beta
#### Examples
```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { jsx } from '@compiled/react';
import AKBadge from '@atlaskit/badge';
import AtlassianIntelligenceIcon from '@atlaskit/icon/core/atlassian-intelligence';
import SearchIcon from '@atlaskit/icon/core/search';
import { ConfluenceIcon } from '@atlaskit/logo';
import { Root } from '@atlaskit/navigation-system/layout/root';
import { SideNavToggleButton } from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import {
	AppLogo,
	AppSwitcher,
	ChatButton,
	CreateButton,
	EndItem,
	Help,
	Profile,
	Search,
	Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { Notifications } from '@atlaskit/navigation-system/top-nav-items/notifications';
import { token } from '@atlaskit/tokens';
import { WithResponsiveViewport } from './utils/example-utils';
import { MockSearch } from './utils/mock-search';
const Badge = () => <AKBadge appearance="important">{5}</AKBadge>;
export const TopNavigationExample = () => (
	<WithResponsiveViewport>
		{/**
		 * Wrapping in `Root to ensure the TopNav height is set correctly, as it would in a proper composed usage.
		 * Root sets the top bar height CSS variable that TopNav uses to set its height
		 */}
		<Root>
			<TopNav>
				<TopNavStart>
					<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
					<AppSwitcher label="App switcher" onClick={() => alert('app switcher')} />
					<AppLogo
						href="http://www.atlassian.design"
						icon={ConfluenceIcon}
						name="Confluence"
						label="Home page"
					/>
				</TopNavStart>
				<TopNavMiddle>
					<Search onClick={() => alert('mobile search')} label="Search" />
					<CreateButton onClick={() => alert('create')}>Create</CreateButton>
				</TopNavMiddle>
				<TopNavEnd>
					<ChatButton onClick={() => alert('chat')}>Chat</ChatButton>
					<EndItem
						icon={AtlassianIntelligenceIcon}
						onClick={() => alert('inshelligence')}
						label="Atlassian Intelligence"
					/>
					<Help onClick={() => alert('help')} label="Help" />
					<Notifications
						badge={Badge}
						onClick={() => alert('notifications')}
						label="Notifications"
					/>
					<Settings onClick={() => alert('settings')} label="Settings" />
					<Profile onClick={() => alert('User settings')} label="Your profile" />
				</TopNavEnd>
			</TopNav>
		</Root>
	</WithResponsiveViewport>
);
export const SearchRightElem = () => (
	<WithResponsiveViewport>
		<Root>
			<TopNav>
				<TopNavStart>
					<AppSwitcher label="App switcher" onClick={() => alert('app switcher')} />
				</TopNavStart>
				<TopNavMiddle>
					<Search
						iconBefore={AtlassianIntelligenceIcon}
						elemAfter={<SearchIcon spacing="spacious" color={token('color.icon')} label="" />}
						onClick={() => alert('mobile search')}
						label="Search"
					/>
					<CreateButton onClick={() => alert('create')}>Create</CreateButton>
				</TopNavMiddle>
				<TopNavEnd>
					<Settings onClick={() => alert('settings')} label="Settings" />
				</TopNavEnd>
			</TopNav>
		</Root>
	</WithResponsiveViewport>
);
export const TopNavigationEnlargedSearchInput = () => (
	<WithResponsiveViewport>
		<Root>
			<TopNav>
				<TopNavStart>
					<AppSwitcher label="App switcher" onClick={() => alert('app switcher')} />
				</TopNavStart>
				<div>
					<TopNavMiddle>
						<MockSearch isEnlarged />
						<CreateButton onClick={() => alert('create')}>Create</CreateButton>
					</TopNavMiddle>
				</div>
				<TopNavEnd>
					<Settings onClick={() => alert('settings')} label="Settings" />
				</TopNavEnd>
			</TopNav>
		</Root>
	</WithResponsiveViewport>
);
export default TopNavigationExample;
```
```tsx
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { Fragment, type ReactNode } from 'react';
import { jsx } from '@compiled/react';
import Badge from '@atlaskit/badge';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Heading from '@atlaskit/heading';
import AiChatIcon from '@atlaskit/icon/core/ai-chat';
import PremiumIcon from '@atlaskit/icon/core/premium';
import { TopNavButton } from '@atlaskit/navigation-system/experimental/top-nav-button';
import { SideNavToggleButton } from '@atlaskit/navigation-system/layout/side-nav';
import {
	TopNav,
	TopNavEnd,
	TopNavMiddle,
	TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import { MenuListItem } from '@atlaskit/navigation-system/side-nav-items/menu-list-item';
import {
	AppLogo,
	AppSwitcher,
	CreateButton,
	CustomLogo,
	CustomTitle,
	Help,
	Notifications,
	Profile,
	Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { Stack } from '@atlaskit/primitives';
import { ConfluenceIcon } from '@atlaskit/temp-nav-app-icons/confluence';
import { EditionAwarenessButton } from '@atlassian/growth-pattern-library-edition-awareness-button';
import placeholder200x20 from './images/200x20.png';
import { WithResponsiveViewport } from './utils/example-utils';
import { MockRoot } from './utils/mock-root';
import { MockSearch } from './utils/mock-search';
const connieCustomLogo = (
	<AppLogo href="" icon={ConfluenceIcon} name="Confluence" label="Home page" />
);
// Stress test nav responsive behaviour with a wide logo
const wideCustomLogo = (
	<CustomLogo
		href=""
		icon={() => <img alt="" src={placeholder200x20} />}
		logo={() => <img alt="" src={placeholder200x20} />}
		label="Home page"
	/>
);
const defaultTopNavEnd = (
	<Fragment>
		<MenuListItem>
			<TopNavButton iconBefore={AiChatIcon}>Chat</TopNavButton>
		</MenuListItem>
		<Help label="Help" />
		<Notifications
			badge={() => (
				<Badge max={9} appearance="important">
					{99999}
				</Badge>
			)}
			label="Notifications"
		/>
		<Settings label="Settings" />
		<DropdownMenu
			shouldRenderToParent
			trigger={({ triggerRef: ref, ...props }) => <Profile ref={ref} label="Profile" {...props} />}
		>
			<DropdownItemGroup>
				<DropdownItem>Account</DropdownItem>
			</DropdownItemGroup>
		</DropdownMenu>
	</Fragment>
);
const upgradeButton = (
	<MenuListItem>
		<EditionAwarenessButton status="default" icon="missing-payment-details">
			Add payment details
		</EditionAwarenessButton>
	</MenuListItem>
);
const extendedTopNavEnd = (
	<Fragment>
		{upgradeButton}
		{defaultTopNavEnd}
	</Fragment>
);
const defaultTopNavMiddle = (
	<Fragment>
		<MockSearch />
		<CreateButton>Create</CreateButton>
	</Fragment>
);
function TopNavigationInstance({
	CustomLogo,
	topNavEnd = defaultTopNavEnd,
	topNavMiddle = defaultTopNavMiddle,
}: {
	CustomLogo: ReactNode;
	topNavEnd?: ReactNode;
	topNavMiddle?: ReactNode;
}) {
	return (
		<MockRoot>
			<TopNav>
				<TopNavStart>
					<SideNavToggleButton
						testId="side-nav-toggle-button"
						collapseLabel="Collapse sidebar"
						expandLabel="Expand sidebar"
					/>
					<AppSwitcher label="Switch apps" />
					{CustomLogo}
					<CustomTitle>Custom app title</CustomTitle>
				</TopNavStart>
				<TopNavMiddle>{topNavMiddle}</TopNavMiddle>
				<TopNavEnd>{topNavEnd}</TopNavEnd>
			</TopNav>
		</MockRoot>
	);
}
export default function TopNavigationStressExample() {
	return (
		<WithResponsiveViewport>
			<Stack space="space.400">
				<Stack space="space.100">
					<Heading as="h2" size="small">
						Wide left column
					</Heading>
					<TopNavigationInstance CustomLogo={wideCustomLogo} />
				</Stack>
				<Stack space="space.100">
					<Heading as="h2" size="small">
						Wide right column
					</Heading>
					<TopNavigationInstance CustomLogo={connieCustomLogo} topNavEnd={extendedTopNavEnd} />
				</Stack>
				<Stack space="space.100">
					<Heading as="h2" size="small">
						Small left and right column
					</Heading>
					<TopNavigationInstance CustomLogo={connieCustomLogo} />
				</Stack>
				<Stack space="space.100">
					<Heading as="h2" size="small">
						Wide left and right column
					</Heading>
					<TopNavigationInstance CustomLogo={wideCustomLogo} topNavEnd={extendedTopNavEnd} />
				</Stack>
				<Stack space="space.100">
					<Heading as="h2" size="small">
						No create button
					</Heading>
					<TopNavigationInstance
						CustomLogo={wideCustomLogo}
						topNavEnd={extendedTopNavEnd}
						topNavMiddle={<MockSearch />}
					/>
				</Stack>
				<Stack space="space.100">
					<Heading as="h2" size="small">
						No common actions
					</Heading>
					<TopNavigationInstance
						CustomLogo={wideCustomLogo}
						topNavEnd={extendedTopNavEnd}
						topNavMiddle={null}
					/>
				</Stack>
				<Stack space="space.100">
					<Heading as="h2" size="small">
						Extra common actions
					</Heading>
					<TopNavigationInstance
						CustomLogo={wideCustomLogo}
						topNavEnd={extendedTopNavEnd}
						topNavMiddle={
							<Fragment>
								{defaultTopNavMiddle}
								<TopNavButton iconBefore={PremiumIcon}>Artisanal addition</TopNavButton>
							</Fragment>
						}
					/>
				</Stack>
				<Stack space="space.100">
					{/**
					 * A super wide right column like this is not 'supported',
					 * but we want to make sure the extreme edge case breaks down in a reasonable way.
					 */}
					<Heading as="h2" size="small">
						Super wide right column
					</Heading>
					<TopNavigationInstance
						CustomLogo={connieCustomLogo}
						topNavEnd={
							<Fragment>
								{upgradeButton}
								{upgradeButton}
								{extendedTopNavEnd}
							</Fragment>
						}
					/>
				</Stack>
				<Stack space="space.100">
					<Heading as="h2" size="small">
						Trial upgrade button
					</Heading>
					<TopNavigationInstance
						CustomLogo={connieCustomLogo}
						topNavEnd={
							<Fragment>
								<EditionAwarenessButton status="default" icon="upgrade" upgradeIconType="gem">
									Standard trial
								</EditionAwarenessButton>
								{defaultTopNavEnd}
							</Fragment>
						}
					/>
				</Stack>
			</Stack>
		</WithResponsiveViewport>
	);
}
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `aria-controls` | `string` | Identifies the popup element that the trigger controls |
| `aria-expanded` | `boolean` | Announces to assistive technology whether the popup is currently open or closed |
| `aria-haspopup` | `boolean \| "dialog"` | Informs assistive technology that this element triggers a popup |
| `badge` | `ComponentClass<{}, any> \| FunctionComponent<{}>` | The component to render as the badge (required) |
| `isListItem` | `boolean` | Can be used to disable the default `listitem` role |
| `isSelected` | `boolean` | Indicates that the button is selected |
| `label` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | Provide an accessible label, often used by screen readers (required) |
| `onClick` | `(e: MouseEvent<HTMLElement, globalThis.MouseEvent>, analyticsEvent: UIAnalyticsEvent) => void` | Handler called on click |
| `onMouseEnter` | `(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void` | Called when the mouse enters the element container |

## @atlaskit/progress-bar Package
### ProgressBar component
A progress bar communicates the status of a system process, showing completion percentage or indeterminate progress.
- **Keywords:** progress, bar, loading, status, completion, indeterminate
- **Categories:** loading
- **Status:** general-availability
#### Example
```tsx
import ProgressBar from '@atlaskit/progress-bar';
export default [<ProgressBar value={0.5} />, <ProgressBar value={0.8} appearance="success" />];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `appearance` | `"default" \| "success" \| "inverse"` | The visual style of the progress bar |
| `ariaLabel` | `string` | This is the descriptive label that's associated with the progress bar |
| `isIndeterminate` | `boolean` | Shows the progress bar in an indeterminate state when `true` |
| `value` | `number` | Sets the value of the progress bar, between `0` and `1` inclusive |

### SuccessProgressBar component
A progress bar variant that indicates successful completion of a process.
- **Keywords:** progress, bar, success, complete, finished
- **Categories:** loading
- **Status:** general-availability
#### Example
```tsx
import { SuccessProgressBar } from '@atlaskit/progress-bar';
export default [<SuccessProgressBar value={1.0} />, <SuccessProgressBar value={0.9} />];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `ariaLabel` | `string` | This is the descriptive label that's associated with the progress bar |
| `isIndeterminate` | `boolean` | Shows the progress bar in an indeterminate state when `true` |
| `value` | `number` | Sets the value of the progress bar, between `0` and `1` inclusive |

### TransparentProgressBar component
A progress bar variant with transparent background for overlay contexts.
- **Keywords:** progress, bar, transparent, overlay, subtle
- **Categories:** loading
- **Status:** general-availability
#### Example
```tsx
import { TransparentProgressBar } from '@atlaskit/progress-bar';
export default [<TransparentProgressBar value={0.6} />, <TransparentProgressBar value={0.3} />];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `ariaLabel` | `string` | This is the descriptive label that's associated with the progress bar |
| `isIndeterminate` | `boolean` | Shows the progress bar in an indeterminate state when `true` |
| `value` | `number` | Sets the value of the progress bar, between `0` and `1` inclusive |

## @atlaskit/radio Package
### Radio component
A radio button component for single selection from a set of mutually exclusive choices. Use for custom radio button presentations like options in tables or when you need fine control over individual radio buttons.
- **Keywords:** radio, button, input, form, selection, choice, option
- **Categories:** form, interaction
- **Status:** general-availability
#### Example
```tsx
import { Radio } from '@atlaskit/radio';
export default () => (
	<Radio value="option1" label="Option 1" name="choices" onChange={() => console.log('Changed!')} />
);
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `ariaLabel` | `string` | The `aria-label` attribute associated with the radio element |
| `isChecked` | `boolean` | Set the field as checked |
| `isDisabled` | `boolean` | Makes a `Radio` field unselectable when true |
| `isInvalid` | `boolean` | Marks this as an invalid field |
| `isRequired` | `boolean` | Marks this as a required field |
| `label` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | The label value for the input rendered to the DOM |
| `labelId` | `string` | This sets the `aria-labelledby` attribute |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>, analyticsEvent: UIAnalyticsEvent) => void` | `onChange` event handler, passed into the props of each `Radio` Component instantiated within `RadioGroup` |
| `value` | `string` | Field value |

### RadioGroup component
A radio group component that presents a list of options where only one choice can be selected. Use for most radio button scenarios where you want a simple list of mutually exclusive options.
- **Keywords:** radio, group, form, selection, choice, options, list
- **Categories:** form, interaction
- **Status:** general-availability
#### Example
```tsx
import { RadioGroup } from '@atlaskit/radio';
// Radio group with options
const options = [
	{ name: 'color', value: 'red', label: 'Red' },
	{ name: 'color', value: 'blue', label: 'Blue' },
];
export default () => {
	const [value, setValue] = React.useState('red');
	return (
		<RadioGroup options={options} value={value} onChange={(e) => setValue(e.currentTarget.value)} />
	);
};
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `defaultValue` | `string` | Sets the initial selected value on the `RadioGroup` |
| `id` | `string` |  |
| `isDisabled` | `boolean` | Sets the disabled state of all `Radio` elements in the group |
| `isInvalid` | `boolean` | Sets the invalid state of all `Radio` elements in the group |
| `isRequired` | `boolean` | Sets the required state of all `Radio` elements in the group |
| `labelId` | `string` | This sets the `aria-labelledby` attribute |
| `name` | `string` | Sets the `name` prop on each of the `Radio` elements in the group |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>, analyticsEvent: UIAnalyticsEvent) => void` | Function that gets after each change event |
| `onInvalid` | `(event: React.SyntheticEvent<any, Event>) => void` | Function that gets fired after each invalid event |
| `options` | `OptionPropType[]` | An array of objects, each object is mapped onto a `Radio` element within the group (required) |
| `value` | `string` | Once set, controls the selected value on the `RadioGroup` |

## @atlaskit/skeleton Package
### Skeleton component
A skeleton acts as a placeholder for content, usually while the content loads.
- **Keywords:** skeleton, placeholder, loading, content, shimmer, animation
- **Categories:** loading
- **Status:** early-access
#### Example
```tsx
import Skeleton from '@atlaskit/skeleton';
export default [<Skeleton width="200px" height="100px" isShimmering />];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `borderRadius` | `string \| number` | Controls the border radius, or rounding of the skeleton's corners |
| `color` | `string` | Overrides the default color of skeleton, and overrides the default shimmering start color if ShimmeringEndColor also provided |
| `groupName` | `string` | Applied as a data-attribute |
| `height` | `string \| number` |  (required) |
| `isShimmering` | `boolean` | Enables the shimmering animation |
| `ShimmeringEndColor` | `string` | Overrides the default shimmering ending color of skeleton |
| `width` | `string \| number` |  (required) |

## @atlaskit/tabs Package
### Tabs component
Tabs are used to organize content by grouping similar information on the same page.
- **Keywords:** tabs, navigation, content, organization, grouping
- **Categories:** navigation
- **Status:** general-availability
#### Example
```tsx
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
export default [
	<Tabs id="tabs">
		<TabList>
			<Tab>Tab 1</Tab>
			<Tab>Tab 2</Tab>
		</TabList>
		<TabPanel>Content for Tab 1</TabPanel>
		<TabPanel>Content for Tab 2</TabPanel>
	</Tabs>,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `children` | `string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<ReactNode> \| React.ReactPortal` | The children of Tabs (required) |
| `defaultSelected` | `number` | The index of the tab that will be selected by default when the component mounts |
| `id` | `string` | A unique ID that will be used to generate IDs for tabs and tab panels (required) |
| `onChange` | `(index: number, analyticsEvent: UIAnalyticsEvent) => void` | A callback function which will be fired when a changed |
| `selected` | `number` | The selected tab's index |
| `shouldUnmountTabPanelOnChange` | `boolean` | Tabs by default leaves `TabPanel`'s mounted on the page after they have been selected |

## @atlaskit/tag Package
### Tag component
A tag is a compact element used to categorize, label, or organize content.
- **Keywords:** tag, label, category, filter, chip, badge
- **Categories:** data-display
- **Status:** general-availability
#### Example
```tsx
import Tag from '@atlaskit/tag';
export default [
	<Tag text="Basic tag" />,
	<Tag text="Bug" color="red" />,
	<Tag text="Removable tag" removeButtonLabel="Remove" />,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `appearance` | `"default" \| "rounded"` | Set whether tags are rounded |
| `color` | `"standard" \| "green" \| "lime" \| "blue" \| "red" \| "purple" \| "magenta" \| "grey" \| "teal" \| "orange" \| "yellow" \| "limeLight" \| "orangeLight" \| "magentaLight" \| "greenLight" \| "blueLight" \| ... 4 more ... \| "yellowLight"` | The color theme to apply |
| `elemBefore` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal` | The component to be rendered before the tag |
| `href` | `string` | URI or path |
| `isRemovable` | `boolean` | Flag to indicate if a tag is removable |
| `linkComponent` | `ComponentClass<any, any> \| FunctionComponent<any>` |  |
| `onAfterRemoveAction` | `(text: string) => void` | Handler to be called after tag is removed |
| `onBeforeRemoveAction` | `() => boolean` | Handler to be called before the tag is removed |
| `removeButtonLabel` | `string` | Text rendered as the aria-label for remove button |
| `text` | `string` | Text to be displayed in the tag (required) |

## @atlaskit/textarea Package
### Textarea component
A textarea is a multiline text input control for longer text content.
- **Keywords:** textarea, input, form, text, multiline, input, field
- **Categories:** forms-and-input
- **Status:** general-availability
#### Example
```tsx
import Textarea from '@atlaskit/textarea';
export default [
	<Textarea placeholder="Enter your text..." />,
	<Textarea placeholder="Required field" isRequired resize="auto" name="comments" />,
];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `appearance` | `"standard" \| "subtle" \| "none"` | Controls the appearance of the field |
| `defaultValue` | `string` | The default value of the text area |
| `isCompact` | `boolean` | Sets whether the field should expand to fill available horizontal space |
| `isDisabled` | `boolean` | Sets the field as uneditable, with a changed hover state, and prevents it from showing in the focus order |
| `isInvalid` | `boolean` | Sets styling to indicate that the input is invalid |
| `isMonospaced` | `boolean` | Sets the content text value to monospace |
| `isReadOnly` | `boolean` | If true, prevents the value of the input from being edited |
| `isRequired` | `boolean` | Sets whether the field is required for form that the field is part of |
| `maxHeight` | `string` | The maximum height of the text area |
| `minimumRows` | `number` | The minimum number of rows of text to display |
| `name` | `string` | Name of the input form control |
| `onBlur` | `(event: FocusEvent<HTMLTextAreaElement, Element>) => void` | Handler to be called when the input is blurred |
| `onChange` | `(event: ChangeEvent<HTMLTextAreaElement>) => void` | Handler to be called when the input changes |
| `onFocus` | `(event: FocusEvent<HTMLTextAreaElement, Element>) => void` | Handler to be called when the input is focused |
| `placeholder` | `string` | The placeholder text within the text area |
| `resize` | `"none" \| "auto" \| "vertical" \| "horizontal" \| "smart"` | Enables resizing of the text area |
| `spellCheck` | `boolean` | Enables native spell check on the `textarea` element |
| `theme` | `any` | The theme function `TextArea` consumes to derive theming constants for use in styling its components |
| `value` | `string` | The value of the text area |

## @atlaskit/toggle Package
### Toggle component
A toggle is used to view or switch between enabled or disabled states.
- **Keywords:** toggle, switch, on-off, enabled, disabled, state
- **Categories:** forms-and-input
- **Status:** general-availability
#### Example
```tsx
import Toggle from '@atlaskit/toggle';
export default [<Toggle label="Basic toggle" />, <Toggle label="Checked toggle" isChecked />];
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `defaultChecked` | `boolean` | Sets whether the toggle is initially checked or not |
| `descriptionId` | `string` | Use this when you need to provide an extended description about how the toggle works using aria-describedby |
| `id` | `string` | Use a pairing label with your toggle using `id` and `htmlFor` props to set the relationship |
| `isChecked` | `boolean` | If defined, it takes precedence over defaultChecked, and the toggle acts
as a controlled component |
| `isDisabled` | `boolean` | Sets if the toggle is disabled or not |
| `isLoading` | `boolean` | If defined, it displays a spinner within the toggle |
| `label` | `string` | Text value which will be associated with toggle input using aria-labelledby attribute |
| `name` | `string` | Descriptive name for the value property, to be submitted in a form |
| `onBlur` | `(event: FocusEvent<HTMLInputElement, Element>, analyticsEvent: UIAnalyticsEvent) => void` | Handler to be called when toggle is unfocused |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>, analyticsEvent: UIAnalyticsEvent) => void` | Handler to be called when native 'change' event happens internally |
| `onFocus` | `(event: FocusEvent<HTMLInputElement, Element>, analyticsEvent: UIAnalyticsEvent) => void` | Handler to be called when toggle is focused |
| `size` | `"regular" \| "large"` | Toggle size |
| `value` | `string` | Value to be submitted in a form |

## @atlaskit/tokens Package
### token function
Design tokens provide consistent, semantic values for colors, spacing, typography, and other design properties across the Atlassian Design System. Use tokens instead of hardcoded values to ensure consistency and proper theming.
- **Keywords:** token, design, system, color, spacing, typography, radius, theme, css, style, variable
- **Categories:** tokens
- **Status:** general-availability
#### Example
```tsx
import { token } from '@atlaskit/tokens';
export default () => (
	<div
		style={{
			backgroundColor: token('elevation.surface'),
			border: `${token('border.width')} solid ${token('color.border.brand')}`,
			color: token('color.text'),
			font: token('font.body'),
			padding: token('space.100'),
			margin: token('space.050'),
		}}
	/>
);
```

## @atlaskit/tooltip Package
### Tooltip component
A tooltip is a floating, non-actionable label used to explain a user interface element or feature.
- **Keywords:** tooltip, hint, help, floating, label, explanation
- **Categories:** overlays-and-layering
- **Status:** general-availability
#### Example
```tsx
import Button from '@atlaskit/button/new';
import Tooltip from '@atlaskit/tooltip';
export default function DefaultTooltipExample() {
	return (
		<Tooltip content="This is a tooltip" testId="default-tooltip">
			{(tooltipProps) => <Button {...tooltipProps}>Hover over me</Button>}
		</Tooltip>
	);
}
```
#### Props
| Prop | Type | Description |
|-|-|-|
| `canAppear` | `() => boolean` | Whether or not the tooltip can be displayed |
| `children` | `React.ReactNode \| ((props: TriggerProps) => React.ReactNode)` | Elements to be wrapped by the tooltip (required) |
| `component` | `React.ComponentType<TooltipPrimitiveProps> \| React.ForwardRefExoticComponent<Omit<TooltipPrimitiveProps, "ref"> & React.RefAttributes<HTMLElement>>` | Extend `TooltipPrimitive` to create your own tooltip and pass it as component |
| `content` | `React.ReactNode \| (({ update }: { update?: () => void; }) => React.ReactNode)` | The content of the tooltip (required) |
| `delay` | `number` | Time in milliseconds to wait before showing and hiding the tooltip |
| `hideTooltipOnClick` | `boolean` | Hide the tooltip when the click event is triggered |
| `hideTooltipOnMouseDown` | `boolean` | Hide the tooltip when the mousedown event is triggered |
| `ignoreTooltipPointerEvents` | `boolean` | Adds `pointer-events: none` to the tooltip itself |
| `isScreenReaderAnnouncementDisabled` | `boolean` | By default tooltip content will be duplicated into a hidden element so
it can be read out by a screen reader |
| `mousePosition` | `AutoPlacement \| BasePlacement \| VariationPlacement` | Where the tooltip should appear relative to the mouse pointer |
| `onHide` | `(analyticsEvent: UIAnalyticsEvent) => void` | Function to be called when the tooltip will be hidden |
| `onShow` | `(analyticsEvent: UIAnalyticsEvent) => void` | Function to be called when the tooltip will be shown |
| `position` | `Placement \| "mouse"` | Where the tooltip should appear relative to its target |
| `strategy` | `"fixed" \| "absolute"` | Use this to define the strategy of popper |
| `tag` | `keyof JSX.IntrinsicElements \| React.ComponentType<React.AllHTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement>; }> \| React.ForwardRefExoticComponent<...>` | Replace the wrapping element |
