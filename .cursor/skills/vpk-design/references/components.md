# Atlassian Design System Components

> A comprehensive collection of React components that follow Atlassian's design system principles.
> These components are built on top of design tokens and primitives to ensure consistent,
> accessible, and responsive user interfaces across Atlassian products.

## Forms and Input

### Button

**Import from `@atlaskit/button/new`** (the root entrypoint is deprecated).

```tsx
import Button from '@atlaskit/button/new';
import { IconButton } from '@atlaskit/button/new';

<Button appearance="primary" iconBefore={AddIcon}>Create</Button>
<IconButton icon={EditIcon} label="Edit" appearance="subtle" />
```

**Key props:**

| Prop                 | Type                                                                       | Description                 |
| -------------------- | -------------------------------------------------------------------------- | --------------------------- |
| `appearance`         | 'default' \| 'danger' \| 'primary' \| 'subtle' \| 'warning' \| 'discovery' | Visual style                |
| `iconBefore`         | IconProp                                                                   | Icon before text            |
| `iconAfter`          | IconProp                                                                   | Icon after text             |
| `isLoading`          | boolean                                                                    | Loading state               |
| `isDisabled`         | boolean                                                                    | Disabled state              |
| `shouldFitContainer` | boolean                                                                    | Fit width to parent         |
| `onClick`            | (e: MouseEvent, analyticsEvent: UIAnalyticsEvent) => void                  | Click handler               |
| `href`               | string                                                                     | URL for link button         |
| `testId`             | string                                                                     | Test ID for automated tests |

[Documentation](https://atlassian.design/components/button)

**Related:** `IconButton`, `LinkButton`, `SplitButton`, `ButtonGroup` also available from
`@atlaskit/button/new`

### Checkbox

A checkbox input component with label support.

```tsx
import Checkbox from "@atlaskit/checkbox";

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
| `xcss`             | StrictXCSSProp                                             | Allows bounded style overrides allowing changes to the `alignItems` style |

[Documentation](https://atlassian.design/components/checkbox)

### Radio

A radio input component that allows users to select one option from a list.

```tsx
import { Radio } from "@atlaskit/radio";

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
| `testId`           | string                                                                       | Test ID for automated tests  |
| `analyticsContext` | Record<string, any>                                                          | Analytics context            |

[Documentation](https://atlassian.design/components/radio)

### Select

A dropdown select component with search and multi-select support.

```tsx
import Select from "@atlaskit/select";

<Select
	options={[
		{ label: "Option 1", value: "1" },
		{ label: "Option 2", value: "2" },
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
| `formatOptionLabel` | (data: Option, formatOptionLabelMeta: FormatOptionLabelMeta) => ReactNode | Custom option label renderer |
| `noOptionsMessage`  | (obj: { inputValue: string }) => ReactNode                                | Custom no options message    |
| `testId`            | string                                                                    | Test ID for automated tests  |

[Documentation](https://atlassian.design/components/select)

### Calendar (Beta)

A calendar component for date selection and display.

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

| Prop                        | Type                                                           | Description                                                                                               |
| --------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `selected`                  | string[]                                                       | Currently selected date(s). Can be a single Date object or an array of date strings in YYYY-MM-DD format |
| `onChange`                  | (date: string[]) => void                                       | Handler for date selection changes                                                                        |
| `disabled`                  | string[]                                                       | Array of disabled dates (YYYY-MM-DD)                                                                      |
| `minDate`                   | string                                                         | Minimum selectable date (YYYY-MM-DD)                                                                      |
| `maxDate`                   | string                                                         | Maximum selectable date (YYYY-MM-DD)                                                                      |
| `day`                       | number                                                         | Currently focused day (0 for no focus)                                                                    |
| `defaultDay`                | number                                                         | Default focused day                                                                                       |
| `defaultMonth`              | number                                                         | Default month (1-12)                                                                                      |
| `defaultYear`               | number                                                         | Default year                                                                                              |
| `defaultSelected`           | string[]                                                       | Default selected dates (YYYY-MM-DD)                                                                       |
| `defaultPreviouslySelected` | string[]                                                       | Default previously selected dates                                                                         |
| `disabledDateFilter`        | (date: string) => boolean                                      | Function to filter disabled dates                                                                         |
| `weekStartDay`              | 0-6                                                            | First day of week (0=Sunday)                                                                              |
| `locale`                    | string                                                         | Locale for date formatting                                                                                |
| `testId`                    | string                                                         | Test ID for automated tests                                                                               |

[Documentation](https://atlassian.design/components/calendar)

### Comment

A component for displaying and managing comments.

```tsx
import { Comment } from "@atlaskit/comment";

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

### Date Time Picker

A component for selecting both date and time.

```tsx
import { DateTimePicker } from "@atlaskit/datetime-picker";

<DateTimePicker value={new Date()} onChange={(date) => console.log(date)} />;
```

| Prop         | Type                 | Description            |
| ------------ | -------------------- | ---------------------- |
| `value`      | Date                 | Selected date and time |
| `onChange`   | (date: Date) => void | Change handler         |
| `isDisabled` | boolean              | Disabled state         |
| `timeFormat` | '12' \| '24'         | Time format            |

[Documentation](https://atlassian.design/components/date-time-picker)

### Focus Ring

A utility component for managing focus styles.

```tsx
import FocusRing from "@atlaskit/focus-ring";

<FocusRing>
	<button>Focusable element</button>
</FocusRing>;
```

| Prop      | Type                  | Description      |
| --------- | --------------------- | ---------------- |
| `isInset` | boolean               | Inset focus ring |
| `focus`   | 'mouse' \| 'keyboard' | Focus style type |

[Documentation](https://atlassian.design/components/focus-ring)

### Form

```tsx
import Form, { Field } from "@atlaskit/form";

<Form onSubmit={(data) => console.log(data)}>
	{({ formProps }) => (
		<form {...formProps}>
			<Field name="email" />
		</form>
	)}
</Form>;
```

[Documentation](https://atlassian.design/components/form)

### Range

A slider component for selecting a range of values.

```tsx
import Range from "@atlaskit/range";

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

### Text Area

A multi-line text input component.

```tsx
import TextArea from "@atlaskit/textarea";

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

### Text Field

A single-line text input component.

```tsx
import TextField from "@atlaskit/textfield";

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

### Toggle

A switch component for boolean values.

```tsx
import Toggle from "@atlaskit/toggle";

<Toggle isChecked={true} onChange={(e) => console.log(e.target.checked)} />;
```

| Prop         | Type                     | Description    |
| ------------ | ------------------------ | -------------- |
| `isChecked`  | boolean                  | Toggle state   |
| `onChange`   | (e: ChangeEvent) => void | Change handler |
| `isDisabled` | boolean                  | Disabled state |
| `size`       | 'regular' \| 'large'     | Toggle size    |

[Documentation](https://atlassian.design/components/toggle)

---

## Images and Icons

### Avatar

A component for displaying user avatars with support for images, initials, and status indicators.

```tsx
import Avatar from "@atlaskit/avatar";

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
| `onClick`          | (event: MouseEvent, analyticsEvent?: UIAnalyticsEvent) => void      | Click handler                 |
| `testId`           | string                                                              | Test ID for automated tests   |

[Documentation](https://atlassian.design/components/avatar)

### Avatar Group

A component for displaying multiple avatars in a group with overlap and overflow handling.

```tsx
import AvatarGroup from "@atlaskit/avatar-group";

<AvatarGroup
	avatars={[
		{ src: "avatar1.jpg", name: "User 1" },
		{ src: "avatar2.jpg", name: "User 2" },
		{ src: "avatar3.jpg", name: "User 3" },
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

### Icon (Beta)

Icons are available from two packages: `@atlaskit/icon` and `@atlaskit/icon-lab`. Both use the same
import pattern: `{package}/core/{icon-name}`.

#### Finding and Importing Icons

```tsx
// Icons from @atlaskit/icon
import AddIcon from "@atlaskit/icon/core/add";
import BacklogIcon from "@atlaskit/icon/core/backlog";
import EditIcon from "@atlaskit/icon/core/edit";
import SearchIcon from "@atlaskit/icon/core/search";

// Icons from @atlaskit/icon-lab
import RandomizeIcon from "@atlaskit/icon-lab/core/randomize";
import TelescopeIcon from "@atlaskit/icon-lab/core/telescope";
```

#### Import Pattern

Both packages follow the same structure:

- **Package**: Either `@atlaskit/icon` or `@atlaskit/icon-lab`
- **Path**: Always `/core/`
- **Icon name**: kebab-case (e.g., `arrow-down-left`, `backlog`)
- **Component name**: PascalCase + `Icon` suffix (e.g., `BacklogIcon`, `ArrowCurvedDownLeftIcon`)

```tsx
// Pattern: import {PascalCase}Icon from '@atlaskit/{icon|icon-lab}/core/{kebab-case}'
import BacklogIcon from "@atlaskit/icon/core/backlog";
import ArrowCurvedDownLeftIcon from "@atlaskit/icon-lab/core/arrow-curved-down-left";
```

#### Usage Examples

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

#### Icon Props

| Prop     | Type                           | Description                         |
| -------- | ------------------------------ | ----------------------------------- |
| `label`  | string                         | **Required** - Accessible icon text |
| `size`   | 'small' \| 'medium' \| 'large' | Icon size (default: 'medium')       |
| `color`  | string                         | Color token or 'currentColor'       |
| `testId` | string                         | Test ID for automated tests         |

[Documentation](https://atlassian.design/components/icon/examples)

### Image (Beta)

A component for displaying images with theme support.

```tsx
import Image from "@atlaskit/image";

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

---

## Layout and Structure

### Page Header

A component for page headers.

```tsx
import PageHeader from "@atlaskit/page-header";

<PageHeader breadcrumbs={<Breadcrumbs />} actions={<Actions />} bottomBar={<BottomBar />} testId="page-header-test">
	Page Title
</PageHeader>;
```

| Prop        | Type      | Description                    |
| ----------- | --------- | ------------------------------ |
| breadcrumbs | ReactNode | Breadcrumb navigation          |
| actions     | ReactNode | Actions to display in header   |
| bottomBar   | ReactNode | Content in the bottom bar      |
| children    | ReactNode | The title of the page          |
| testId      | string    | Test ID for automated tests    |

[Documentation](https://atlassian.design/components/page-header)

---

## Loading

### Progress Bar

A component for displaying progress.

```tsx
import ProgressBar from "@atlaskit/progress-bar";

<ProgressBar value={0.5} isIndeterminate={false} appearance="default" ariaLabel="Loading progress" />;
```

| Prop            | Type                                | Description                            |
| --------------- | ----------------------------------- | -------------------------------------- |
| value           | number                              | Value between 0 and 1 inclusive        |
| isIndeterminate | boolean                             | Shows indeterminate state when true    |
| appearance      | 'default' \| 'success' \| 'inverse' | Visual style of the progress bar       |
| ariaLabel       | string                              | Accessibility label                    |
| testId          | string                              | Test ID for automated tests            |

### Spinner

A loading spinner component.

```tsx
import Spinner from "@atlaskit/spinner";

<Spinner size="large" />;
```

| Prop         | Type                           | Description                     |
| ------------ | ------------------------------ | ------------------------------- |
| `size`       | 'small' \| 'medium' \| 'large' | Size of the spinner             |
| `appearance` | 'inherit' \| 'invert'          | Visual style of the spinner     |
| `delay`      | number                         | Delay in ms before showing      |

[Documentation](https://atlassian.design/components/spinner)

### Skeleton

A loading placeholder component.

```tsx
import Skeleton from "@atlaskit/skeleton";

<Skeleton height="20px" width="200px" />;
```

| Prop           | Type             | Description                          |
| -------------- | ---------------- | ------------------------------------ |
| `height`       | string \| number | Height of the skeleton               |
| `width`        | string \| number | Width of the skeleton                |
| `isShimmering` | boolean          | Enables the shimmer animation effect |

[Documentation](https://atlassian.design/components/skeleton)

---

## Messaging

### Banner

A component for displaying important messages or announcements.

```tsx
import Banner from "@atlaskit/banner";

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

### Flag

A component for displaying brief messages.

```tsx
import Flag, { FlagGroup } from "@atlaskit/flag";

<FlagGroup>
	<Flag
		id="flag-1"
		icon={<Icon label="Info" />}
		title="Flag Title"
		description="Flag description"
		actions={[{ content: "Action", onClick: () => {} }]}
		appearance="normal"
	/>
</FlagGroup>;
```

#### Content Guidelines

- Use for confirmations and alerts needing minimal interaction
- Display event-driven messages
- Be clear about what went wrong for errors
- Provide specific steps to resolve issues

| Prop              | Type                                            | Description                         |
| ----------------- | ----------------------------------------------- | ----------------------------------- |
| id                | number \| string                                | Unique identifier                   |
| icon              | ReactNode                                       | Icon from `@atlaskit/icon`          |
| title             | ReactNode                                       | Bold text at top                    |
| description       | ReactNode                                       | Secondary content below title       |
| actions           | Array<{ content, onClick?, href?, testId? }>    | Clickable actions at bottom         |
| appearance        | 'error' \| 'info' \| 'normal' \| 'success' \| 'warning' | Visual style                 |
| onDismissed       | (id, analyticsEvent) => void                    | Dismiss handler                     |
| testId            | string                                          | Test ID for automated tests         |

### Inline Message

A component for displaying inline messages.

```tsx
import InlineMessage from "@atlaskit/inline-message";

<InlineMessage title="Inline Message Title" secondaryText="Secondary text" appearance="info">
	<p>Content that appears in the dialog when opened</p>
</InlineMessage>;
```

| Prop          | Type                                                         | Description             |
| ------------- | ------------------------------------------------------------ | ----------------------- |
| title         | ReactNode                                                    | Bold text displayed first |
| secondaryText | ReactNode                                                    | Text displayed second   |
| appearance    | 'connectivity' \| 'confirmation' \| 'info' \| 'warning' \| 'error' | Icon style        |
| placement     | 'bottom-start' \| 'top-start' \| etc.                        | Inline dialog placement |
| children      | ReactNode                                                    | Dialog content          |

### Modal Dialog

A modal dialog component for important content.

#### Content Guidelines

- Present short-term tasks
- Use clear, descriptive titles
- Keep content focused on a single task
- Include clear action buttons
- Use sentence case for all text

```tsx
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalTransition } from "@atlaskit/modal-dialog";
import Button from "@atlaskit/button/new";

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
```

| Prop                        | Type                                               | Description                      |
| --------------------------- | -------------------------------------------------- | -------------------------------- |
| `autoFocus`                 | boolean \| RefObject<HTMLElement>                  | Focus control                    |
| `children`                  | ReactNode                                          | Modal contents                   |
| `height`                    | number \| string                                   | Modal height                     |
| `width`                     | 'small' \| 'medium' \| 'large' \| 'x-large' \| number | Modal width                   |
| `onClose`                   | (event, analyticsEvent) => void                    | Close handler                    |
| `shouldCloseOnOverlayClick` | boolean                                            | Close on blanket click           |
| `shouldCloseOnEscapePress`  | boolean                                            | Close on escape                  |
| `label`                     | string                                             | Accessibility label              |
| `testId`                    | string                                             | Test ID for automated tests      |

[Documentation](https://atlassian.design/components/modal-dialog)

### Section Message

A component for section-level messages.

```tsx
import SectionMessage from "@atlaskit/section-message";

<SectionMessage appearance="information" title="Section Message Title">
	<p>Section message content</p>
	<SectionMessage.Actions>
		<SectionMessage.Action href="#">Action</SectionMessage.Action>
	</SectionMessage.Actions>
</SectionMessage>;
```

| Prop       | Type                                                              | Description        |
| ---------- | ----------------------------------------------------------------- | ------------------ |
| appearance | 'information' \| 'warning' \| 'error' \| 'success' \| 'discovery' | Visual style       |
| children   | ReactNode                                                         | Main content       |
| title      | string                                                            | Heading text       |
| actions    | ReactElement \| ReactElement[]                                    | User actions       |
| icon       | React.ElementType                                                 | Custom icon        |
| testId     | string                                                            | Test ID            |

---

## Navigation

### Breadcrumbs

A navigation component showing the current page hierarchy.

```tsx
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";

<Breadcrumbs>
	<BreadcrumbsItem href="/">Home</BreadcrumbsItem>
	<BreadcrumbsItem href="/products">Products</BreadcrumbsItem>
	<BreadcrumbsItem>Current Page</BreadcrumbsItem>
</Breadcrumbs>;
```

| Prop        | Type      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| `children`  | ReactNode | Breadcrumb items                                  |
| `maxItems`  | number    | Maximum number of items before truncating         |
| `separator` | ReactNode | Custom separator between items                    |

[Documentation](https://atlassian.design/components/breadcrumbs)

### Link

A component for navigation links.

```tsx
import Link from "@atlaskit/link";

<Link href="/path">Link text</Link>;
```

| Prop         | Type      | Description      |
| ------------ | --------- | ---------------- |
| `href`       | string    | Link destination |
| `children`   | ReactNode | Link content     |
| `isDisabled` | boolean   | Disabled state   |

[Documentation](https://atlassian.design/components/link)

### Menu

A component for displaying menus.

```tsx
import { MenuGroup, Section, ButtonItem, LinkItem } from "@atlaskit/menu";

<MenuGroup spacing="cozy">
	<Section title="Section Title">
		<ButtonItem>Button Item</ButtonItem>
		<LinkItem href="/path">Link Item</LinkItem>
	</Section>
</MenuGroup>;
```

| Prop        | Type                | Description              |
| ----------- | ------------------- | ------------------------ |
| `children`  | ReactNode           | Section components       |
| `isLoading` | boolean             | Loading state            |
| `spacing`   | 'compact' \| 'cozy' | Content density          |
| `minWidth`  | number \| string    | Minimum width            |
| `maxWidth`  | number \| string    | Maximum width            |
| `maxHeight` | number \| string    | Maximum height           |

[Documentation](https://atlassian.design/components/menu)

### Pagination

A component for pagination controls.

```tsx
import Pagination from "@atlaskit/pagination";

<Pagination
	pages={[1, 2, 3, 4, 5]}
	defaultSelectedIndex={0}
	label="pagination"
	max={7}
	onChange={(event, page) => console.log(page)}
/>;
```

| Prop                   | Type                                                    | Description                        |
| ---------------------- | ------------------------------------------------------- | ---------------------------------- |
| `pages`                | T[]                                                     | Array of pages to display          |
| `defaultSelectedIndex` | number                                                  | Default selected page index        |
| `selectedIndex`        | number                                                  | Controlled selected index          |
| `label`                | string                                                  | Aria-label for nav wrapper         |
| `max`                  | number                                                  | Maximum pages displayed (default 7)|
| `onChange`             | (event, page, analyticsEvent?) => void                  | Page change handler                |
| `isDisabled`           | boolean                                                 | Disabled state                     |

[Documentation](https://atlassian.design/components/pagination)

### Tabs

A component for tabbed navigation.

```tsx
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";

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

---

## Overlays and Layering

### Blanket

A component for overlays.

```tsx
import Blanket from "@atlaskit/blanket";

<Blanket isTinted />;
```

| Prop               | Type       | Description    |
| ------------------ | ---------- | -------------- |
| `isTinted`         | boolean    | Tinted overlay |
| `onBlanketClicked` | () => void | Click handler  |

[Documentation](https://atlassian.design/components/blanket)

### Drawer

A sliding panel component.

```tsx
import Drawer from "@atlaskit/drawer";

<Drawer isOpen={true} onClose={() => {}} width="wide">
	Drawer content
</Drawer>;
```

| Prop       | Type                           | Description        |
| ---------- | ------------------------------ | ------------------ |
| `isOpen`   | boolean                        | Visibility control |
| `width`    | 'narrow' \| 'medium' \| 'wide' | Drawer width       |
| `onClose`  | () => void                     | Close handler      |
| `children` | ReactNode                      | Drawer content     |

[Documentation](https://atlassian.design/components/drawer)

### Popup

A component for displaying popup content.

```tsx
import Popup from "@atlaskit/popup";

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

### Tooltip

A component for displaying tooltips.

```tsx
import Tooltip from "@atlaskit/tooltip";

<Tooltip content="Tooltip content">
	<button>Hover me</button>
</Tooltip>;
```

#### Content Guidelines

- Keep it brief (ideally 1-3 words, max 8 words)
- Use sentence case
- No punctuation at the end
- Never include links or interactive elements

| Prop       | Type      | Description      |
| ---------- | --------- | ---------------- |
| `content`  | ReactNode | Tooltip content  |
| `children` | ReactNode | Trigger element  |
| `position` | string    | Tooltip position |

[Documentation](https://atlassian.design/components/tooltip)

---

## Status Indicators

### Badge

A component for displaying status indicators or counts.

```tsx
import Badge from '@atlaskit/badge';

<Badge appearance="added">New</Badge>
<Badge max={99} value={100}>100</Badge>
```

| Prop         | Type                                                          | Description                      |
| ------------ | ------------------------------------------------------------- | -------------------------------- |
| `appearance` | 'added' \| 'default' \| 'important' \| 'primary' \| 'removed' | Visual style                     |
| `value`      | number                                                        | Number to display                |
| `max`        | number                                                        | Maximum value before showing '+' |
| `children`   | ReactNode                                                     | Custom content                   |

[Documentation](https://atlassian.design/components/badge)

### Empty State

A component for empty states.

```tsx
import EmptyState from "@atlaskit/empty-state";

<EmptyState header="No items" description="Add items to get started" />;
```

#### Content Guidelines

- Explain why the state is empty
- Provide clear next steps
- Keep tone helpful and encouraging

| Prop          | Type   | Description        |
| ------------- | ------ | ------------------ |
| `header`      | string | Header text        |
| `description` | string | Description text   |
| `imageUrl`    | string | Optional image URL |

[Documentation](https://atlassian.design/components/empty-state)

### Lozenge

A component for status indicators.

```tsx
import Lozenge from "@atlaskit/lozenge";

<Lozenge appearance="success">Success</Lozenge>;
```

| Prop         | Type                                   | Description     |
| ------------ | -------------------------------------- | --------------- |
| `appearance` | 'success' \| 'removed' \| 'inprogress' | Visual style    |
| `children`   | ReactNode                              | Lozenge content |
| `isBold`     | boolean                                | Bold style      |

[Documentation](https://atlassian.design/components/lozenge)

### Progress Indicator

A component for showing progress through steps.

```tsx
import { ProgressIndicator } from "@atlaskit/progress-indicator";

<ProgressIndicator selectedIndex={1} values={["Step 1", "Step 2", "Step 3"]} />;
```

| Prop            | Type                    | Description            |
| --------------- | ----------------------- | ---------------------- |
| `selectedIndex` | number                  | Current step           |
| `values`        | string[]                | Step labels            |
| `onSelect`      | (index: number) => void | Step selection handler |

[Documentation](https://atlassian.design/components/progress-indicator)

### Progress Tracker

A component for tracking progress through a journey.

```tsx
import { ProgressTracker } from "@atlaskit/progress-tracker";

<ProgressTracker
	items={[
		{ id: "1", label: "Step 1", percentageComplete: 100 },
		{ id: "2", label: "Step 2", percentageComplete: 50 },
	]}
/>;
```

| Prop      | Type                                                           | Description     |
| --------- | -------------------------------------------------------------- | --------------- |
| `items`   | Array<{id: string, label: string, percentageComplete: number}> | Progress items  |
| `current` | string                                                         | Current item ID |

[Documentation](https://atlassian.design/components/progress-tracker)

### Tag

A component for displaying tags.

```tsx
import Tag from "@atlaskit/tag";

<Tag text="Tag" />;
```

| Prop         | Type                   | Description  |
| ------------ | ---------------------- | ------------ |
| `text`       | string                 | Tag text     |
| `appearance` | 'default' \| 'rounded' | Visual style |
| `color`      | string                 | Tag color    |

[Documentation](https://atlassian.design/components/tag)

### Tag Group

A component for managing multiple tags.

```tsx
import TagGroup from "@atlaskit/tag-group";

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

---

## Text and Data Display

### Code

A component for displaying code snippets.

```jsx
<Code>const greeting = 'Hello, world!';</Code>
```

| Prop                          | Type      | Description                          |
| ----------------------------- | --------- | ------------------------------------ |
| children                      | ReactNode | Inline code content                  |
| testId                        | string    | Test ID for automated tests          |
| codeBidiWarnings              | boolean   | Enable bidi warnings (default: true) |
| codeBidiWarningTooltipEnabled | boolean   | Enable warning tooltip               |

[Documentation](https://atlassian.design/components/code)

### Dynamic Table

A component for displaying dynamic data tables.

```tsx
import DynamicTable from "@atlaskit/dynamic-table";

<DynamicTable
	head={{
		cells: [{ content: "Header 1", isSortable: true }, { content: "Header 2" }],
	}}
	rows={[
		{
			cells: [
				{ content: "Cell 1", key: "cell1" },
				{ content: "Cell 2", key: "cell2" },
			],
		},
	]}
	rowsPerPage={10}
	isLoading={false}
/>;
```

| Prop                  | Type                                                    | Description                    |
| --------------------- | ------------------------------------------------------- | ------------------------------ |
| `caption`             | ReactNode                                               | Table caption                  |
| `head`                | { cells: Array<{ content, isSortable?, width? }> }      | Header configuration           |
| `rows`                | Array<{ cells: Array<{ content, key }> }>               | Data rows                      |
| `emptyView`           | ReactElement                                            | Content when no data           |
| `isLoading`           | boolean                                                 | Loading state                  |
| `rowsPerPage`         | number                                                  | Rows per page                  |
| `onSetPage`           | (page, analyticsEvent?) => void                         | Page change handler            |
| `onSort`              | (sortKey, sortOrder, analyticsEvent?) => void           | Sort handler                   |
| `isRankable`          | boolean                                                 | Enable drag and drop           |
| `testId`              | string                                                  | Test ID for automated tests    |
| `label`               | string                                                  | Accessibility label            |

[Documentation](https://atlassian.design/components/dynamic-table)

### Heading (Beta)

A typography component for text headings.

```jsx
import Heading from "@atlaskit/heading";

<Heading size="xxlarge">Page title</Heading>;
```

| Prop     | Type                                                             | Description                   |
| -------- | ---------------------------------------------------------------- | ----------------------------- |
| size     | 'xxlarge' \| 'xlarge' \| 'large' \| 'medium' \| 'small' \| 'xsmall' \| 'xxsmall' | Heading size |
| as       | 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'div' \| 'span'  | DOM element override          |
| color    | 'color.text' \| 'color.text.inverse' \| 'color.text.warning.inverse' | Text color token         |
| children | ReactNode                                                        | Heading text                  |
| testId   | string                                                           | Test ID for automated tests   |

[Documentation](https://atlassian.design/components/heading)

### Inline Edit

A component for inline editing.

```tsx
import InlineEdit from "@atlaskit/inline-edit";

<InlineEdit
	defaultValue="Editable text"
	onConfirm={(value) => console.log(value)}
	readView={() => <div>Read view</div>}
	editView={(fieldProps) => <input {...fieldProps} />}
/>;
```

| Prop                        | Type                                          | Description                |
| --------------------------- | --------------------------------------------- | -------------------------- |
| `defaultValue`              | any                                           | Initial value              |
| `editView`                  | (fieldProps, ref) => ReactNode                | Edit mode component        |
| `readView`                  | () => ReactNode                               | Read mode component        |
| `onConfirm`                 | (value, analyticsEvent) => void               | Save handler               |
| `onEdit`                    | () => void                                    | Edit start handler         |
| `isEditing`                 | boolean                                       | Controlled editing state   |
| `hideActionButtons`         | boolean                                       | Hide confirm/cancel        |
| `keepEditViewOpenOnBlur`    | boolean                                       | Stay in edit on blur       |
| `isRequired`                | boolean                                       | Require non-empty value    |
| `validate`                  | (value, formState, fieldState) => string \| void | Validation function     |
| `testId`                    | string                                        | Test ID for automated tests|

[Documentation](https://atlassian.design/components/inline-edit)

### Table Tree

A component for displaying hierarchical data.

```tsx
import TableTree from "@atlaskit/table-tree";

<TableTree
	headers={["Column 1", "Column 2"]}
	columns={[Cell, Cell]}
	items={[{ content: "Row 1", children: [{ content: "Child 1" }] }]}
	label="Table description"
/>;
```

| Prop                 | Type           | Description                       |
| -------------------- | -------------- | --------------------------------- |
| `columns`            | ElementType[]  | Cell components per column        |
| `columnWidths`       | ColumnWidth[]  | Column widths                     |
| `headers`            | string[]       | Header text                       |
| `items`              | Array          | Hierarchical data                 |
| `shouldExpandOnClick`| boolean        | Expand on row click               |
| `label`              | string         | Aria-label for table              |

[Documentation](https://atlassian.design/components/table-tree)

### Visually Hidden

A utility component for accessibility.

```tsx
import VisuallyHidden from "@atlaskit/visually-hidden";

<VisuallyHidden>
	<span>Hidden content for screen readers</span>
</VisuallyHidden>;
```

| Prop       | Type      | Description                                  |
| ---------- | --------- | -------------------------------------------- |
| `children` | ReactNode | Hidden content                               |
| `role`     | string    | ARIA role attribute                          |
| `id`       | string    | ID for aria-describedby                      |
| `testId`   | string    | Test ID for automated tests                  |

[Documentation](https://atlassian.design/components/visually-hidden)

---

## Navigation System (Early Access)

A modern navigation system for Atlassian products.

```tsx
import { Root } from "@atlaskit/navigation-system/layout/root";
import { Main } from "@atlaskit/navigation-system/layout/main";
import { TopNav, TopNavStart, TopNavMiddle, TopNavEnd } from "@atlaskit/navigation-system/layout/top-nav";
import { SideNav, SideNavContent, SideNavFooter, SideNavToggleButton } from "@atlaskit/navigation-system/layout/side-nav";
import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";
import { MenuList } from "@atlaskit/navigation-system/side-nav-items/menu-list";

<Root>
	<TopNav>
		<TopNavStart>
			<SideNavToggleButton collapseLabel="Collapse sidebar" expandLabel="Expand sidebar" />
		</TopNavStart>
		<TopNavMiddle>{/* Search bar, create button */}</TopNavMiddle>
		<TopNavEnd>{/* Help, Account */}</TopNavEnd>
	</TopNav>

	<SideNav>
		<SideNavContent>
			<MenuList>
				<LinkMenuItem href="#" elemBefore={<Icon />}>Menu Item</LinkMenuItem>
			</MenuList>
		</SideNavContent>
		<SideNavFooter>{/* Footer items */}</SideNavFooter>
	</SideNav>

	<Main id="main-container" isFixed>
		{/* Your content */}
	</Main>
</Root>
```

**Key Features:**
- Flexible layout structure with resizable panels
- Support for fullscreen mode
- Collapsible side navigation
- Banner support
- Accessibility built-in

[Documentation](https://atlassian.design/components/navigation-system)

---

## Component Status

### Deprecated Components

The following components are deprecated and should not be used in new code:

- `@atlaskit/grid` - Use `Grid` from `@atlaskit/primitives` instead

### Components with Caution

The following components are being phased out:

- `@atlaskit/page-layout` - Use `@atlaskit/navigation-system` instead
- `@atlaskit/atlassian-navigation` - Use `@atlaskit/navigation-system` instead
- `@atlaskit/side-navigation` - Use `@atlaskit/navigation-system` instead
- `@atlaskit/inline-dialog` - Use `Popup` from `@atlaskit/popup` instead
