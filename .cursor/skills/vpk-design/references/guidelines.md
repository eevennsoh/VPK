<!-- AUTO-GENERATED FILE, DO NOT EDIT -->
## @atlaskit/avatar Package
### Avatar component
A component for displaying user avatars with support for images, initials, and status indicators. An avatar is a visual representation of a user or entity. It can display user images, initials, presence indicators, and status indicators. Avatars help users quickly identify people and entities in your application. They provide visual context and make interfaces more personal and engaging.
- **Keywords:** avatar, user, profile, image, presence, status, representation
- **Categories:** images, data-display
- **Status:** general-availability
#### Usage Guidelines
 - Use consistent sizing within the same context
 - Place avatars in logical groupings (e.g., team members)
 - Use presence indicators sparingly for real-time status only
 - Use status indicators for approval/permission states
 - Provide fallback initials when images fail to load
 - Use avatars to represent users, teams, projects, or any other entity that needs visual identification
 - Always provide meaningful names for accessibility
#### Content Guidelines
 - Use full names when possible for better recognition
 - For companies/projects, use descriptive names
 - Avoid generic terms like 'User' or 'Admin'
 - Use consistent naming conventions across your app
 - Keep names concise but meaningful
#### Prop guidance

- **name** - Always provide for accessibility (use full names when possible)
- **size** - xsmall (inline), small (compact), medium (standard), large (prominent), xlarge (hero),
  xxlarge (marketing)
- **presence** - Use sparingly for real-time status (online, busy, focus, offline)
- **status** - For approval states (approved, declined, locked)
- **appearance** - Use "square" for non-circular avatars

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import Avatar from '@atlaskit/avatar';
-<img
-  src="/avatar.jpg"
-  alt="User"
-  className="w-10 h-10 rounded-full"
-/>
+<Avatar src="/avatar.jpg" name="John Doe" />

-<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
-  JD
-</div>
+<Avatar name="John Doe" />

-<div className="relative">
-  <img src="/avatar.jpg" alt="User" className="w-10 h-10 rounded-full" />
-  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
-</div>
+<Avatar
+  src="/avatar.jpg"
+  name="John Doe"
+  presence="online"
+/>
```


## @atlaskit/badge Package
### Badge component
A badge is a visual indicator for numeric values such as tallies and scores, providing quick visual feedback.
- **Keywords:** badge, indicator, numeric, tally, score, count, status
- **Categories:** status-indicators
- **Status:** general-availability
#### Usage Guidelines
 - Use for displaying counts, scores, or status indicators
 - Keep badge content concise and meaningful
 - Use appropriate appearance variants for different contexts
 - Position badges near relevant content
 - Consider maximum value display limits
#### Accessibility Guidelines
 - Ensure badge content is announced by screen readers
 - Use appropriate color contrast for text readability
 - Provide meaningful context for numeric values
 - Consider alternative text for non-numeric badges
#### Content Guidelines
 - Use clear, concise numeric or text values
 - Ensure values are meaningful to users
 - Consider localization for number formatting
 - Use consistent formatting across similar badges
#### Prop guidance

- **appearance** - added (positive), removed (negative), important (warning), primary (neutral),
  default (standard)
- **value** - For numeric badges (use max prop for overflow handling)
- **max** - Maximum value before showing overflow (e.g., "99+")

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import Badge from '@atlaskit/badge';

-<span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
-  New
-</span>
+<Badge appearance="added">New</Badge>

-<span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
-  {count > 99 ? '99+' : count}
-</span>
+<Badge appearance="removed" value={count} max={99} />

-<span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
-  Warning
-</span>
+<Badge appearance="important">Warning</Badge>
```


## @atlaskit/banner Package
### Banner component
A banner displays a prominent message at the top of the screen to communicate important information to users.
- **Keywords:** banner, message, notification, alert, prominent, top, screen
- **Categories:** messaging
- **Status:** general-availability
#### Usage Guidelines
 - Use for important messages that need immediate attention
 - Place at the top of the screen for maximum visibility
 - Keep messaging concise and actionable
 - Use appropriate appearance variants for different message types
 - Consider dismissibility for non-critical messages
#### Accessibility Guidelines
 - Ensure banner content is announced by screen readers
 - Use appropriate color contrast for text readability
 - Provide clear, actionable messaging
 - Consider keyboard navigation for interactive banners
#### Content Guidelines
 - Write clear, concise messages
 - Use action-oriented language when appropriate
 - Ensure messages are relevant to the current context
 - Provide clear next steps when needed
#### Prop guidance

- **appearance** - Visual style: announcement, error, warning
- **isOpen** - Control visibility of the banner
- **icon** - Optional icon to accompany the message
- **children** - Banner content (text or JSX)

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import Banner from '@atlaskit/banner';

-<div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
-  <div className="flex">
-    <div className="ml-3">
-      <p className="text-sm text-blue-700">
-        Important system announcement
-      </p>
-    </div>
-  </div>
-</div>
+<Banner appearance="announcement" isOpen>
+  Important system announcement
+</Banner>

-<div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
-  <div className="flex">
-    <div className="ml-3">
-      <p className="text-sm text-red-700">
-        Critical error occurred
-      </p>
-    </div>
-  </div>
-</div>
+<Banner appearance="error" isOpen>
+  Critical error occurred
+</Banner>
```


## @atlaskit/button Package
### Button component
A versatile button component with multiple appearances and states for triggering actions. A button triggers an event or action. They let users know what will happen next. Note the root entrypoint of `@atlaskit/button` is deprecated and being replaced with `@atlaskit/button/new`.
- **Keywords:** button, action, click, submit, form, interactive, cta
- **Categories:** form, interaction
- **Status:** general-availability
#### Usage Guidelines
 - Use primary buttons for the main action on a page
 - Limit to one primary button per section
 - Use subtle buttons for secondary actions
 - Use danger buttons sparingly for destructive actions
 - Group related buttons together with ButtonGroup
#### Accessibility Guidelines
 - Always provide meaningful labels for screen readers
 - Provide loading state announcements for async actions
#### Content Guidelines
 - Use action verbs that describe the interaction
 - Keep text concise (1-3 words ideal)
 - Avoid generic terms like "Submit" or "Click here"
 - Use sentence case
 - Use buttons for actions, links for navigation
 - Only include one primary call to action (CTA) per area
 - Start with the verb and specify what's being acted on
 - Don't use punctuation in button labels
#### Prop guidance

- **appearance** - primary (main), default (secondary), subtle (tertiary), danger (destructive),
  warning (caution), discovery (new features)
- **spacing** - compact (tight spaces), default (standard), comfortable (generous)
- **isDisabled** - Use instead of removing the button
- **isLoading** - Show loading state during async operations

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import Button from '@atlaskit/button/new';
-<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
-  Create
-</button>
+<Button appearance="primary">Create</Button>

-<button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded">
-  Cancel
-</button>
+<Button appearance="default">Cancel</Button>

-<button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded">
-  Delete
-</button>
+<Button appearance="danger">Delete</Button>
```


### IconButton component
A button that displays only an icon with an optional tooltip. Perfect for toolbar actions, compact interfaces, and when space is limited.
- **Keywords:** button, icon, action, click, interactive, toolbar
- **Categories:** form, interaction
- **Status:** general-availability
#### Usage Guidelines
 - Use for toolbar actions and compact interfaces
 - Choose icons that clearly represent their function
 - Group related icon buttons together
 - Use sparingly to avoid visual clutter
 - Consider using tooltips for additional context
 - Always provide a meaningful label for accessibility
 - The icon should clearly represent the action it performs
#### Content Guidelines
 - Use clear, concise, descriptive labels
 - Use action verbs (e.g., "Edit item", "Delete comment")
 - Choose icons that are universally understood
 - Avoid using icons without labels in critical actions
#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import { IconButton } from '@atlaskit/button/new';
+import EditIcon from '@atlaskit/icon/core/edit';
+import AddIcon from '@atlaskit/icon/core/add';
// Icon button
-<button className="p-2 rounded hover:bg-gray-100" title="Edit">
-  <EditIcon className="w-5 h-5" />
-</button>
+<IconButton icon={EditIcon} label="Edit item" />

// Primary icon button
-<button className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white" title="Add">
-  <PlusIcon className="w-5 h-5" />
-</button>
+<IconButton appearance="primary" icon={AddIcon} label="Add new item" />
```


### ButtonGroup component
A component for grouping related buttons together with consistent spacing and alignment.
- **Keywords:** button, group, container, layout, spacing
- **Categories:** form, layout, interaction
- **Status:** general-availability
#### Usage Guidelines
 - Use for related actions that belong together
 - Group buttons that perform similar or complementary actions
 - Maintain consistent spacing and alignment
 - Consider the visual hierarchy within the group
 - Don't group unrelated actions together
 - Use when you have multiple related actions that should be visually grouped
 - Provides consistent spacing and alignment between buttons
#### Content Guidelines
 - Ensure button labels are consistent in tone and style
 - Use parallel structure for related actions
 - Keep labels concise but descriptive
 - Consider the order of actions within the group

## @atlaskit/checkbox Package
### Checkbox component
A checkbox is an input control that allows a user to select one or more options from a number of choices.
- **Keywords:** checkbox, input, form, selection, choice, option, multiple
- **Categories:** forms-and-input
- **Status:** general-availability
#### Usage Guidelines
 - Use for multiple choice selections
 - Group related checkboxes logically
 - Provide clear labels for each option
 - Use indeterminate state for partial selections
 - Consider default states carefully
#### Accessibility Guidelines
 - Ensure proper labeling for all checkboxes
 - Use clear, descriptive labels that explain the choice
 - Provide keyboard navigation support
 - Indicate required fields clearly
 - Use appropriate error states and messaging
#### Content Guidelines
 - Write clear, descriptive labels
 - Use consistent language across related options
 - Avoid negative phrasing when possible
 - Group related options together
#### Prop guidance

- **label** - Text label for the checkbox
- **value** - Value when checked
- **name** - Name attribute for form submission
- **isChecked** - Controlled checked state
- **defaultChecked** - Initial checked state (uncontrolled)
- **isDisabled** - Disable the checkbox
- **isInvalid** - Show error state
- **isIndeterminate** - Show indeterminate state
- **onChange** - Change handler function

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import { Checkbox } from '@atlaskit/checkbox';

-<label className="flex items-center">
-  <input
-    type="checkbox"
-    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
-  />
-  <span className="ml-2 text-sm text-gray-700">Accept terms</span>
-</label>
+<Checkbox label="Accept terms" />

-<label className="flex items-center">
-  <input
-    type="checkbox"
-    checked
-    disabled
-    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
-  />
-  <span className="ml-2 text-sm text-gray-400">Disabled option</span>
-</label>
+<Checkbox label="Disabled option" isChecked isDisabled />
```


## @atlaskit/drawer Package

## @atlaskit/heading Package
### Heading component
A component for creating accessible, consistently styled headings with proper hierarchy. Headings are sized to contrast with content, increase visual hierarchy, and help readers easily understand the structure of content.
- **Keywords:** heading, title, header, typography, text, h1, h2, h3, h4, h5, h6
- **Categories:** primitive, data-display
- **Status:** general-availability
#### Usage Guidelines
 - Use the `HeadingContextProvider` offering to maintain heading levels in complex layouts
 - Maintain proper heading hierarchy
 - Keep headings concise and meaningful
 - Use sentence case for most headings
 - Use the `color` prop for inverse text on dark backgrounds
 - Do NOT use any inline styles, you must use the `size` (required) and `color` (optional) props available
#### Accessibility Guidelines
 - Maintain proper heading hierarchy (h1 to h6)
 - Use only one h1 per page for main page titles
 - Ensure minimum 4.5:1 color contrast for text readability
 - Use clear, descriptive heading text that describes the content below
#### Content Guidelines
 - Use clear, descriptive heading text
 - Maintain proper heading hierarchy
 - Keep headings concise and meaningful
 - Use sentence case for most headings
 - Make headings descriptive of the content that follows
#### Translating from Tailwind

Use the table to migrate common tailwind classes

| Tailwind Classes        | React Example              | Usage Notes                                    |
| ----------------------- | -------------------------- | ---------------------------------------------- |
| `text-4xl font-medium`  | `<Heading size="xxlarge">` | Largest heading, clearly bold/medium weight    |
| `text-3xl font-medium`  | `<Heading size="xlarge">`  | Second largest, consistent heading weight      |
| `text-2xl font-medium`  | `<Heading size="large">`   | Clear heading hierarchy maintained             |
| `text-xl font-medium`   | `<Heading size="medium">`  | Standard heading size, medium weight           |
| `text-lg font-medium`   | `<Heading size="small">`   | Smaller but still maintains heading weight     |
| `text-base font-medium` | `<Heading size="xsmall">`  | Very small heading, weight appears consistent  |
| `text-sm font-medium`   | `<Heading size="xxsmall">` | Smallest heading size, maintains medium weight |

An example diff of a migration from Tailwind generated code to ADS generated code

```diff
+import Heading from '@atlaskit/heading';

-<h1 className="text-4xl font-medium">Title</h1>
+<Heading size="xxlarge">Title</Heading>

-<h2 className="text-2xl font-medium">Subtitle</h2>
+<Heading size="large" as="h2">Subtitle</Heading>
```



### HeadingContextProvider component
A context provider that allows you to configure the default HTML heading level for all headings within its subtree. Useful for maintaining proper heading hierarchy in complex layouts.
- **Keywords:** heading, context, provider, hierarchy, accessibility
- **Categories:** primitive, data-display
- **Status:** general-availability
#### Usage Guidelines
 - Wrap sections that need different heading hierarchy
 - Use for complex layouts where heading levels need adjustment
#### Content Guidelines
 - Ensure proper heading hierarchy is maintained
 - Use clear, descriptive heading text
 - Keep headings concise and meaningful

## @atlaskit/icon Package
### Icon component
An icon is a symbol representing a command, device, directory, or common action.
- **Keywords:** icon, symbol, command, device, directory, action, visual
- **Categories:** images-and-icons
- **Status:** general-availability
#### Usage Guidelines
 - Use icons to enhance visual communication
 - Choose icons that clearly represent their function
 - Maintain consistent icon style and size
 - Use appropriate icon sizes for different contexts
 - Consider cultural and contextual icon meanings
#### Accessibility Guidelines
 - Provide appropriate alt text or labels for icons
 - Use meaningful icon choices that convey clear meaning
 - Ensure sufficient color contrast for icon visibility
 - Consider icon size for touch targets
 - Use consistent iconography across the interface
#### Content Guidelines
 - Use clear, recognizable icon symbols
 - Ensure icons are culturally appropriate
 - Maintain visual consistency across icon sets
 - Use appropriate icon labels and descriptions
#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import AddIcon from '@atlaskit/icon/core/add';
-<div className="w-4 h-4 text-blue-600">
-  <svg>...</svg>
-</div>
+<AddIcon label="Add item" />

-<span className="inline-flex items-center">
-  <svg className="w-4 h-4 mr-2">...</svg>
-  Text
-</span>
+<AddIcon label="Add item" />
+Text
```
##### Common Icon mapping mistakes
❌ `folder` → ✅ `folder-closed` or `folder-open`
❌ `user` → ✅ `person`
❌ `play` → ✅ `video-play`
❌ `arrow` → ✅ `arrow-right`, `arrow-left`, etc.
❌ `chevron` → ✅ `chevron-down`, `chevron-up`, etc.

##### 🚨 Important, **YOU MUST** check the orientiation of the dots in the icon
If the icon has three dots: 
- three vertical dots: `<ShowMoreVerticalIcon />`
- three horizontal dots: `<ShowMoreHorizontalIcon />`

##### Icon table

| Component Name | Package | Keywords |
|---|---|---|
| AccessibilityIcon | accessibility | accessibility, icon, core, a11y, accessibility, WCAG |
| AddIcon | add | add, plus, create, new, icon, core, create, plus, jira status |
| AiAgentIcon | ai-agent | ai-agent, aiagent, icon, core, Rovo, AI, chat agent, ai |
| AiChatIcon | ai-chat | ai-chat, aichat, icon, core, Rovo, AI, chat agent, ai |
| AiGenerativeTextSummaryIcon | ai-generative-text-summary | ai-generative-text-summary, aigenerativetextsummary, icon, core, summarize, summarise, summary, automation, AI |
| AlertIcon | alert | alert, icon, core, alert, event, operations |
| AlignImageCenterIcon | align-image-center | align-image-center, alignimagecenter, icon, core, content, media, image, alignment, centre |
| AlignImageLeftIcon | align-image-left | align-image-left, alignimageleft, icon, core, content, media, image, alignment, left |
| AlignImageRightIcon | align-image-right | align-image-right, alignimageright, icon, core, content, media, image, alignment, right |
| AlignTextCenterIcon | align-text-center | align-text-center, aligntextcenter, icon, core, alignment, text, content |
| AlignTextLeftIcon | align-text-left | align-text-left, aligntextleft, icon, core, alignment, text, content, summary |
| AlignTextRightIcon | align-text-right | align-text-right, aligntextright, icon, core, alignment, text, content |
| AngleBracketsIcon | angle-brackets | angle-brackets, anglebrackets, icon, core, code, <>, </>, syntax, jira status |
| ApiIcon | api | api, icon, core, application programming interface, api, operations |
| AppIcon | app | app, icon, core, add-on, add on, plugin, external app, third-party app |
| AppSwitcherIcon | app-switcher | app-switcher, appswitcher, icon, core, application switcher, change product, switch product, product switcher |
| AppSwitcherLegacyIcon | app-switcher-legacy | app-switcher-legacy, appswitcherlegacy, icon, core, application switcher, change product, switch product, product switcher |
| AppsIcon | apps | apps, icon, core, third-party, applications |
| ArchiveBoxIcon | archive-box | archive-box, archivebox, icon, core, file box |
| ArrowDownIcon | arrow-down | arrow-down, arrowdown, icon, core, down, bottom, sorting |
| ArrowDownLeftIcon | arrow-down-left | arrow-down-left, arrowdownleft, icon, core, diagonal arrow, down, left, south west |
| ArrowDownRightIcon | arrow-down-right | arrow-down-right, arrowdownright, icon, core, diagonal arrow, down, right, south east |
| ArrowLeftIcon | arrow-left | arrow-left, arrowleft, back, previous, icon, core, back, previous |
| ArrowRightIcon | arrow-right | arrow-right, arrowright, forward, next, icon, core, forward, next, link |
| ArrowUpIcon | arrow-up | arrow-up, arrowup, icon, core, improvement, jira status |
| ArrowUpLeftIcon | arrow-up-left | arrow-up-left, arrowupleft, icon, core, diagonal arrow, up, right, north east |
| ArrowUpRightIcon | arrow-up-right | arrow-up-right, arrowupright, icon, core, open, diagonal arrow |
| AssetsIcon | assets | assets, icon, core, assets, CMDB, configuration management database |
| AtlassianIntelligenceIcon | atlassian-intelligence | atlassian-intelligence, atlassianintelligence, icon, core, AI |
| AttachmentIcon | attachment | attachment, paperclip, icon, core, paperclip, attach, attachment |
| AudioIcon | audio | audio, music, note, sound, icon, core, music, musical note |
| AutomationIcon | automation | automation, icon, core, lightningbolt, automation rule |
| BacklogIcon | backlog | backlog, icon, core, rows |
| BasketballIcon | basketball | basketball, icon, core, ball, sports, basketball |
| BoardIcon | board | board, icon, core, columns, active sprint |
| BoardsIcon | boards | boards, icon, core |
| BookWithBookmarkIcon | book-with-bookmark | book-with-bookmark, bookwithbookmark, icon, core, knowledge base, article |
| BorderIcon | border | border, icon, core, border, image border, content border, editor, confluence |
| BranchIcon | branch | branch, icon, core, git branch, bitbucket branch, branches, jira status |
| BriefcaseIcon | briefcase | briefcase, icon, core, suitcase, toolbox, operations, business |
| BugIcon | bug | bug, icon, core, bug report, test |
| CalendarIcon | calendar | calendar, date, icon, core, date, month, day, year, jira status |
| CalendarPlusIcon | calendar-plus | calendar-plus, calendarplus, icon, core, calendar, add, plus, schedule |
| CameraIcon | camera | camera, photo, icon, core |
| CaptureIcon | capture | capture, icon, core, focus, focus area, capture |
| CardIcon | card | card, icon, core, card |
| CashIcon | cash | cash, icon, core, currency, money, cash, dollar, bill, work type |
| ChangesIcon | changes | changes, icon, core, jira status, horizontal arrows |
| ChartBarIcon | chart-bar | chart-bar, chartbar, icon, core, graph, bar, analytics, report |
| ChartMatrixIcon | chart-matrix | chart-matrix, chartmatrix, icon, core, dot chart, graph, matrix,  |
| ChartPieIcon | chart-pie | chart-pie, chartpie, icon, core, segment, chart, graph, pie |
| ChartTrendIcon | chart-trend | chart-trend, charttrend, icon, core, reports, graph, impact effort,  |
| ChatWidgetIcon | chat-widget | chat-widget, chatwidget, icon, core, chat, widget, virtual service agent, vsa |
| CheckCircleIcon | check-circle | check-circle, checkcircle, tick, icon, core, tick, yes, completed, filled |
| CheckMarkIcon | check-mark | check-mark, checkmark, icon, core, tick |
| CheckboxCheckedIcon | checkbox-checked | checkbox-checked, checkboxchecked, icon, core, filled, checked, select all |
| CheckboxIndeterminateIcon | checkbox-indeterminate | checkbox-indeterminate, checkboxindeterminate, icon, core, filled, mixed |
| CheckboxUncheckedIcon | checkbox-unchecked | checkbox-unchecked, checkboxunchecked, icon, core, unchecked |
| ChevronDoubleLeftIcon | chevron-double-left | chevron-double-left, chevrondoubleleft, icon, core, double chevron, previous year, left |
| ChevronDoubleRightIcon | chevron-double-right | chevron-double-right, chevrondoubleright, icon, core, double chevron, right, next year |
| ChevronDownIcon | chevron-down | chevron-down, chevrondown, expand, collapse, icon, core, chevron down, expand, open |
| ChevronLeftIcon | chevron-left | chevron-left, chevronleft, back, previous, icon, core, chevron left, back, previous |
| ChevronRightIcon | chevron-right | chevron-right, chevronright, forward, next, icon, core, chevron right, next, collapsed, expand, show children |
| ChevronUpIcon | chevron-up | chevron-up, chevronup, expand, collapse, icon, core, chevron up, close dropdown menu, collapse |
| ChildWorkItemsIcon | child-work-items | child-work-items, childworkitems, icon, core, children, child, related, work items |
| ClipboardIcon | clipboard | clipboard, icon, core, clipboard, paste |
| ClockIcon | clock | clock, icon, core, time, recent, history |
| CloseIcon | close | close, icon, core, cross, x, close, remove |
| CloudArrowUpIcon | cloud-arrow-up | cloud-arrow-up, cloudarrowup, icon, core, deployments, up arrow |
| CollapseHorizontalIcon | collapse-horizontal | collapse-horizontal, collapsehorizontal, icon, core, collapse, width, horizontal arrows |
| CollapseVerticalIcon | collapse-vertical | collapse-vertical, collapsevertical, icon, core, collapse, height, vertical arrows |
| CommentIcon | comment | comment, chat, speech, icon, core, speech bubble |
| CommentAddIcon | comment-add | comment-add, commentadd, icon, core, speech bubble, plus |
| CommitIcon | commit | commit, icon, core, git commit, bitbucket commit |
| CompassIcon | compass | compass, icon, core, template |
| ComponentIcon | component | component, block, lego, icon, core, lego, brick, block |
| ContentWidthNarrowIcon | content-width-narrow | content-width-narrow, contentwidthnarrow, icon, core, content, media, image, width, fixed, narrow |
| ContentWidthWideIcon | content-width-wide | content-width-wide, contentwidthwide, icon, core, content, media, image, width, fixed, wide |
| ContentWrapLeftIcon | content-wrap-left | content-wrap-left, contentwrapleft, icon, core, content, media, image, alignment, left, inline, wrap |
| ContentWrapRightIcon | content-wrap-right | content-wrap-right, contentwrapright, icon, core, content, media, image, alignment, right, inline, wrap |
| CopyIcon | copy | copy, duplicate, icon, core, copy, object |
| CreditCardIcon | credit-card | credit-card, creditcard, icon, core, payment, invoice |
| CrossIcon | cross | cross, close, x, cancel, icon, core, cross, x, close, remove |
| CrossCircleIcon | cross-circle | cross-circle, crosscircle, close, x, cancel, icon, core, x, exit, clear, no, filled |
| CurlyBracketsIcon | curly-brackets | curly-brackets, curlybrackets, icon, core, curly brackets, braces, smart value |
| CustomizeIcon | customize | customize, icon, core, customise, configure, modify, preferences, settings, sliders |
| DashboardIcon | dashboard | dashboard, window, grid, icon, core, activity, view |
| DataFlowIcon | data-flow | data-flow, dataflow, icon, core, relationship, data, flow chart |
| DataNumberIcon | data-number | data-number, datanumber, icon, core, numbers, 123, proforma, datatype |
| DataStringIcon | data-string | data-string, datastring, icon, core, string, letters, abc, proforma, datatype |
| DatabaseIcon | database | database, icon, core, spreadsheet, table, data, cells |
| DecisionIcon | decision | decision, icon, core, fork, diagonal arrow |
| DefectIcon | defect | defect, icon, core, defect, fragile, cracked, work type |
| DeleteIcon | delete | delete, icon, core, trash, bin, remove |
| DepartmentIcon | department | department, icon, core, organization, organisation, org chart, hierarchy |
| DeviceMobileIcon | device-mobile | device-mobile, devicemobile, icon, core, iphone, mobile phone, cell phone |
| DevicesIcon | devices | devices, icon, core, devices, assets, laptop, phone, hardware, work type |
| DiscoveryIcon | discovery | discovery, icon, core, discovery, note, filled, onboarding, status |
| DownloadIcon | download | download, cloud, icon, core, down arrow, file download |
| DragHandleHorizontalIcon | drag-handle-horizontal | drag-handle-horizontal, draghandlehorizontal, icon, core, drag handler, reorder, move, reorder horizontal |
| DragHandleVerticalIcon | drag-handle-vertical | drag-handle-vertical, draghandlevertical, icon, core, drag handler, reorder, move, reorder vertical |
| EditIcon | edit | edit, pencil, write, icon, core, pencil, pencil on page |
| EditBulkIcon | edit-bulk | edit-bulk, editbulk, icon, core, edit, pencil, multiple, bulk, change |
| EmailIcon | email | email, icon, core, envelope, message |
| EmojiIcon | emoji | emoji, emoticon, smiley, icon, core, smiley face, emoticon |
| EmojiAddIcon | emoji-add | emoji-add, emojiadd, icon, core, smiley face, emoticon, plus |
| EmojiCasualIcon | emoji-casual | emoji-casual, emojicasual, icon, core, emoij, casual, sunglasses, chill, relaxed |
| EmojiNeutralIcon | emoji-neutral | emoji-neutral, emojineutral, icon, core, emoji, neutral, ambivalent |
| EmojiRemoveIcon | emoji-remove | emoji-remove, emojiremove, icon, core, emoji, remove, strikethrough |
| EpicIcon | epic | epic, icon, core, lightning bolt, jira status, filled |
| ErrorIcon | error | error, warning, alert, icon, core, filled, status, danger, exclamation, !, error |
| ExclamationSquareIcon | exclamation-square | exclamation-square, exclamationsquare, icon, core, !, exclaim, square, work type |
| ExpandHorizontalIcon | expand-horizontal | expand-horizontal, expandhorizontal, icon, core, expand, width, horizontal arrows, maximum width, stretch, fit |
| ExpandVerticalIcon | expand-vertical | expand-vertical, expandvertical, icon, core, expand, height, vertical arrows, maximum height, stretch, fit |
| EyeOpenIcon | eye-open | eye-open, eyeopen, icon, core, watch, visible, visbility, permissions |
| EyeOpenFilledIcon | eye-open-filled | eye-open-filled, eyeopenfilled, icon, core, watching, visible, visbility, permissions, filled |
| EyeOpenStrikethroughIcon | eye-open-strikethrough | eye-open-strikethrough, eyeopenstrikethrough, icon, core, unwatch, invisible, visibility, permissions |
| FeedIcon | feed | feed, icon, core, feed, updates, release notes, what's new |
| FeedbackIcon | feedback | feedback, announce, speaker, megaphone, icon, core, diagonal arrow, chat bubble, survey, critique |
| FieldIcon | field | field, icon, core, field, form, input, label |
| FieldAlertIcon | field-alert | field-alert, fieldalert, icon, core, field, alert, warning, change |
| FieldCheckboxGroupIcon | field-checkbox-group | field-checkbox-group, fieldcheckboxgroup, icon, core, form, field, input type, checkbox, multi-select, options |
| FieldDropdownIcon | field-dropdown | field-dropdown, fielddropdown, icon, core, form, field, select, dropdown |
| FieldRadioGroupIcon | field-radio-group | field-radio-group, fieldradiogroup, icon, core, form, field, input type, radio, single-select, options |
| FileIcon | file | file, document, paper, page, sheet, icon, core, document, file, paper |
| FilesIcon | files | files, icon, core, documents, files, papers |
| FilterIcon | filter | filter, icon, core, funnel, refine |
| FlagIcon | flag | flag, icon, core, important, emoji category |
| FlagFilledIcon | flag-filled | flag-filled, flagfilled, icon, core, flag, important, filled |
| FlaskIcon | flask | flask, icon, core, labs, test, erlenmeyer flask, beaker |
| FocusAreaIcon | focus-area | focus-area, focusarea, icon, core, focus, focus area, capture |
| FolderClosedIcon | folder-closed | folder-closed, folderclosed, icon, core, directory |
| FolderOpenIcon | folder-open | folder-open, folderopen, icon, core, directory |
| FormIcon | form | form, icon, core, form, fields |
| FullscreenEnterIcon | fullscreen-enter | fullscreen-enter, fullscreenenter, icon, core, full screen |
| FullscreenExitIcon | fullscreen-exit | fullscreen-exit, fullscreenexit, icon, core, un-full screen, un-fullscreen |
| GlassesIcon | glasses | glasses, icon, core, glasses, knowledge, learning, spectacles, education |
| GlobeIcon | globe | globe, icon, core, world |
| GoalIcon | goal | goal, icon, core, target |
| GridIcon | grid | grid, icon, core, view all content, tile view, layout, grid, tiles |
| GrowDiagonalIcon | grow-diagonal | grow-diagonal, growdiagonal, icon, core, grow, width and height, diagonal arrows |
| GrowHorizontalIcon | grow-horizontal | grow-horizontal, growhorizontal, icon, core, grow, width, horizontal arrows |
| GrowVerticalIcon | grow-vertical | grow-vertical, growvertical, icon, core, grow, height, vertical arrows |
| HashtagIcon | hashtag | hashtag, icon, core, tag, topic, pound |
| HeadphonesIcon | headphones | headphones, icon, core, audio, music, headphones |
| HeartIcon | heart | heart, icon, core, like, love, emoji category |
| HighlightIcon | highlight | highlight, icon, core, highlight, highlighter, stabilo, pen |
| HomeIcon | home | home, icon, core, house, building |
| ImageIcon | image | image, picture, photo, icon, core, picture, asset |
| ImageFullscreenIcon | image-fullscreen | image-fullscreen, imagefullscreen, icon, core, image, fullscreen, enlarge |
| ImageInlineIcon | image-inline | image-inline, imageinline, icon, core, image, layout, inline |
| ImageScaledIcon | image-scaled | image-scaled, imagescaled, icon, core, image, layout, scaled |
| InboxIcon | inbox | inbox, icon, core, document tray, work, letter, post |
| IncidentIcon | incident | incident, icon, core, witches hat, traffic cone, jira status |
| InformationIcon | information | information, icon, core, info, filled, status, information |
| InformationCircleIcon | information-circle | information-circle, informationcircle, icon, core, information, circle, info |
| KeyResultIcon | key-result | key-result, keyresult, icon, core, target, bullseye, key result, arrow, bow, archery, OKR |
| LayoutOneColumnIcon | layout-one-column | layout-one-column, layoutonecolumn, icon, core, layout, column, 1 col |
| LayoutThreeColumnsIcon | layout-three-columns | layout-three-columns, layoutthreecolumns, icon, core, layout, columns, 3 col, 3 cols |
| LayoutThreeColumnsSidebarsIcon | layout-three-columns-sidebars | layout-three-columns-sidebars, layoutthreecolumnssidebars, icon, core, layout, columns, 3 col, 3 cols, sidebars, asides |
| LayoutTwoColumnsIcon | layout-two-columns | layout-two-columns, layouttwocolumns, icon, core, layout, columns, 2 col, 2 cols |
| LayoutTwoColumnsSidebarLeftIcon | layout-two-columns-sidebar-left | layout-two-columns-sidebar-left, layouttwocolumnssidebarleft, icon, core, layout, columns, 2 col, 2 cols, sidebar, aside |
| LayoutTwoColumnsSidebarRightIcon | layout-two-columns-sidebar-right | layout-two-columns-sidebar-right, layouttwocolumnssidebarright, icon, core, layout, columns, 2 col, 2 cols, sidebar, aside |
| LibraryIcon | library | library, icon, core, library, drawer, drawers, filing cabinet |
| LightbulbIcon | lightbulb | lightbulb, idea, hint, icon, core, idea, initiative, tip, learnings |
| LinkIcon | link | link, icon, core, url, hyperlink, website, www, http,  |
| LinkBrokenIcon | link-broken | link-broken, linkbroken, icon, core, unlink, remove link, break link, url, hyperlink, website, www, https |
| LinkExternalIcon | link-external | link-external, linkexternal, icon, core, new tab, new window, open in, url, hyperlink, www, http, https, website, external, shortcut, diagonal arrow, offsite |
| ListBulletedIcon | list-bulleted | list-bulleted, listbulleted, icon, core, bullets, unordered list |
| ListChecklistIcon | list-checklist | list-checklist, listchecklist, icon, core, list, check mark, to-do, requirements, checklist, work type |
| ListNumberedIcon | list-numbered | list-numbered, listnumbered, icon, core, list, numbers |
| LobbyBellIcon | lobby-bell | lobby-bell, lobbybell, icon, core, ding, risks |
| LocationIcon | location | location, pin, gps, map, icon, core, map, pin, address |
| LockLockedIcon | lock-locked | lock-locked, locklocked, icon, core, permissions, no access, restricted, security, secure, forbidden, authentication |
| LockUnlockedIcon | lock-unlocked | lock-unlocked, lockunlocked, icon, core, open permissions, unrestricted access, security, insecure, authentication |
| LogInIcon | log-in | log-in, login, icon, core, sign in, enter, account |
| LogOutIcon | log-out | log-out, logout, icon, core, sign out, exit, account |
| MagicWandIcon | magic-wand | magic-wand, magicwand, icon, core, magic, wand, suggestion |
| MarkdownIcon | markdown | markdown, icon, core, markdown, md, markup |
| MarketplaceIcon | marketplace | marketplace, store, shop, icon, core, app store, storefront, stand, third-party developer |
| MaximizeIcon | maximize | maximize, icon, core, diagonal, resize, enlarge |
| MegaphoneIcon | megaphone | megaphone, icon, core, announcement, bullhorn, feedback, news |
| MentionIcon | mention | mention, user, person, @, icon, core, at symbol, @, tag, username |
| MenuIcon | menu | menu, hamburger, navigation, switcher, app switcher, icon, core, menu, top navigation, 3 lines, hamburger |
| MergeFailureIcon | merge-failure | merge-failure, mergefailure, icon, core, git merge, bitbucket merge, merge fail, cross, x |
| MergeSuccessIcon | merge-success | merge-success, mergesuccess, icon, core, git merge, bitbucket merge, merge success, check mark |
| MicrophoneIcon | microphone | microphone, icon, core, mic, mic on, voice, speak |
| MinimizeIcon | minimize | minimize, icon, core, minimize, dock |
| MinusIcon | minus | minus, icon, core, rule, horizontal line, divider, minus, subtract |
| MinusSquareIcon | minus-square | minus-square, minussquare, icon, core, square, minus, subtract, work type |
| NodeIcon | node | node, icon, core, page, dot, page tree, navigation |
| NoteIcon | note | note, icon, core, note, post-it, sticky |
| NotificationIcon | notification | notification, bell, alarm, icon, core, bell, alert |
| NotificationMutedIcon | notification-muted | notification-muted, notificationmuted, icon, core, bell, alert, notification, mute |
| ObjectiveIcon | objective | objective, icon, core, target, bullseye, objective |
| OfficeBuildingIcon | office-building | office-building, officebuilding, icon, core, organization, organisation, business |
| OnCallIcon | on-call | on-call, oncall, icon, core, phone, on-call, support |
| OperationsIcon | operations | operations, icon, core, incident management, alerting, opsgenie, it operations, it ops, radar |
| PageIcon | page | page, file, document, icon, core, single page, feed, document, jira status |
| PagesIcon | pages | pages, icon, core, multiple pages, feeds, documents |
| PaintBucketIcon | paint-bucket | paint-bucket, paintbucket, icon, core, paint, bucket, fill, background, customize |
| PaintPaletteIcon | paint-palette | paint-palette, paintpalette, icon, core, background, customize |
| PanelLeftIcon | panel-left | panel-left, panelleft, icon, core, detail view, left rail, drawer, preview panel, sidebar |
| PanelRightIcon | panel-right | panel-right, panelright, icon, core, detail view, right rail, drawer, preview panel, sidebar |
| PenIcon | pen | pen, icon, core, pen tool, nib, fountain pen, design, work type |
| PeopleGroupIcon | people-group | people-group, peoplegroup, person, user, group, icon, core, users, customers, people |
| PersonIcon | person | person, person, user, avatar, icon, core, user, customer |
| PersonAddIcon | person-add | person-add, personadd, icon, core, user, customer, plus |
| PersonAddedIcon | person-added | person-added, personadded, icon, core, user, customer, check, tick |
| PersonAvatarIcon | person-avatar | person-avatar, personavatar, icon, core, user, customer |
| PersonOffboardIcon | person-offboard | person-offboard, personoffboard, icon, core, user, customer, right arrow |
| PersonRemoveIcon | person-remove | person-remove, personremove, icon, core, person, remove, delete, unfollow |
| PersonWarningIcon | person-warning | person-warning, personwarning, icon, core, person, warning, alert |
| PhoneIcon | phone | phone, icon, core, call, dial out |
| PinIcon | pin | pin, icon, core, push pin, thumbtack, tack |
| PinFilledIcon | pin-filled | pin-filled, pinfilled, icon, core, push pin, thumbtack, tack, filled |
| PlusSquareIcon | plus-square | plus-square, plussquare, icon, core, square, plus, add, work type |
| PowerPlugIcon | power-plug | power-plug, powerplug, icon, core, plug-in, add-on, socket |
| PremiumIcon | premium | premium, icon, core, AI, sparkles, stars, new, feature |
| PresenterModeIcon | presenter-mode | presenter-mode, presentermode, icon, core, pointer, cursor, presentation, present |
| PrinterIcon | printer | printer, icon, core, print |
| PriorityBlockerIcon | priority-blocker | priority-blocker, priorityblocker, icon, core, blocked, showstopper, work type status |
| PriorityCriticalIcon | priority-critical | priority-critical, prioritycritical, icon, core, priority, work type status |
| PriorityHighIcon | priority-high | priority-high, priorityhigh, icon, core, priority, work type status |
| PriorityHighestIcon | priority-highest | priority-highest, priorityhighest, icon, core, priority, work type status |
| PriorityLowIcon | priority-low | priority-low, prioritylow, icon, core, priority, work type status |
| PriorityLowestIcon | priority-lowest | priority-lowest, prioritylowest, icon, core, priority, work type status |
| PriorityMajorIcon | priority-major | priority-major, prioritymajor, icon, core, priority, work type status |
| PriorityMediumIcon | priority-medium | priority-medium, prioritymedium, icon, core, priority, work type status |
| PriorityMinorIcon | priority-minor | priority-minor, priorityminor, icon, core, priority, work type status |
| PriorityTrivialIcon | priority-trivial | priority-trivial, prioritytrivial, icon, core, priority, work type status |
| ProblemIcon | problem | problem, icon, core, stop, priority, work type status |
| ProjectIcon | project | project, icon, core, rocket, rocketship, spaceship |
| ProjectStatusIcon | project-status | project-status, projectstatus, icon, core, status, traffic lights |
| ProjectionScreenIcon | projection-screen | projection-screen, projectionscreen, icon, core, present, presentation, projector screen, keynote |
| PullRequestIcon | pull-request | pull-request, pullrequest, icon, core, git pull request, bitbucket pull request, jira status |
| PulseIcon | pulse | pulse, icon, core, pulse, wave, heartbeat, health |
| QuestionCircleIcon | question-circle | question-circle, questioncircle, help, icon, core, help, answers, faq, jira status |
| QuotationMarkIcon | quotation-mark | quotation-mark, quotationmark, icon, core, quote, testimonial, blockquote, jira status |
| RadioCheckedIcon | radio-checked | radio-checked, radiochecked, icon, core, radio, input type, selected |
| RadioUncheckedIcon | radio-unchecked | radio-unchecked, radiounchecked, icon, core, radio, input type, unselected |
| RedoIcon | redo | redo, icon, core, editor, redo, backwards |
| RefreshIcon | refresh | refresh, cycle, icon, core, refresh, reload, update, circular arrows, replay |
| ReleaseIcon | release | release, icon, core, ship, boat |
| RetryIcon | retry | retry, icon, core, try again,  |
| RoadmapIcon | roadmap | roadmap, icon, core |
| ScalesIcon | scales | scales, icon, core, scales, rule, law |
| ScorecardIcon | scorecard | scorecard, icon, core, tick, check, circle, unfinished |
| ScreenIcon | screen | screen, desktop, computer, monitor, icon, core, display, monitor, desktop |
| ScreenPlusIcon | screen-plus | screen-plus, screenplus, icon, core, screen, display, monitor, plus, add |
| SearchIcon | search | search, find, magnify, icon, core, magnifying glass |
| SendIcon | send | send, mail, icon, core, submit, paper airplane, paper aeroplane |
| SettingsIcon | settings | settings, cog, options, configuration, icon, core, system preferences, gear, cog |
| ShapesIcon | shapes | shapes, icon, core, objects, whiteboard, asset, graphic |
| ShareIcon | share | share, icon, core, share, access |
| ShieldIcon | shield | shield, icon, core, security, secure, safety, defence, protection, guard |
| ShieldStrikethroughIcon | shield-strikethrough | shield-strikethrough, shieldstrikethrough, icon, core, ️security, secure, safety, defence, protection, guard, strikethrough, classification |
| ShortcutIcon | shortcut | shortcut, export, icon, core, addshortcut, square, plus |
| ShowMoreHorizontalIcon | show-more-horizontal | show-more-horizontal, showmorehorizontal, icon, core, ellipses, three dots, meatball, more actions |
| ShowMoreVerticalIcon | show-more-vertical | show-more-vertical, showmorevertical, more, menu, options, kebab-menu, ellipsis-vertical, show-more-vertical, three-dots, vertical-dots, actions, overflow, settings |
| ShrinkDiagonalIcon | shrink-diagonal | shrink-diagonal, shrinkdiagonal, icon, core, resize, diagonal arrows |
| ShrinkHorizontalIcon | shrink-horizontal | shrink-horizontal, shrinkhorizontal, icon, core, contract, width, horizontal arrows |
| ShrinkVerticalIcon | shrink-vertical | shrink-vertical, shrinkvertical, icon, core, contract, height, vertical arrows |
| SidebarCollapseIcon | sidebar-collapse | sidebar-collapse, sidebarcollapse, icon, core, navigation, close sidebar |
| SidebarExpandIcon | sidebar-expand | sidebarexpand, icon, core, navigation, open sidebar |
| SmartLinkIcon | smart-link | smart-link, smartlink, icon, core, smart link |
| SmartLinkCardIcon | smart-link-card | smart-link-card, smartlinkcard, icon, core, smart link, url, card, link preview |
| SmartLinkEmbedIcon | smart-link-embed | smart-link-embed, smartlinkembed, icon, core, smart link, url, embed |
| SmartLinkInlineIcon | smart-link-inline | smart-link-inline, smartlinkinline, icon, core, smart link, url, inline |
| SmartLinkListIcon | smart-link-list | smart-link-list, smartlinklist, icon, core, smart link, url, embed, list, table, linked search results |
| SnippetIcon | snippet | snippet, icon, core, scissors, cut |
| SortAscendingIcon | sort-ascending | sort-ascending, sortascending, icon, core, data, sort, up |
| SortDescendingIcon | sort-descending | sort-descending, sortdescending, icon, core, data, sort, down |
| SpreadsheetIcon | spreadsheet | spreadsheet, icon, core, table, cells, data |
| SprintIcon | sprint | sprint, icon, core, loop, iterate |
| StarStarredIcon | star-starred | star-starred, starstarred, icon, core, favourite, star, starred, filled |
| StarUnstarredIcon | star-unstarred | star-unstarred, starunstarred, icon, core, favourite, star |
| StatusDiscoveryIcon | status-discovery | status-discovery, statusdiscovery, icon, core, discovery, note, filled, onboarding, status |
| StatusErrorIcon | status-error | status-error, statuserror, icon, core, filled, status, danger, exclamation, !, error |
| StatusInformationIcon | status-information | status-information, statusinformation, icon, core, info, filled, status, information |
| StatusSuccessIcon | status-success | status-success, statussuccess, icon, core, tick, completed, success, filled, check mark, status |
| StatusVerifiedIcon | status-verified | status-verified, statusverified, icon, core, verified badge, status |
| StatusWarningIcon | status-warning | status-warning, statuswarning, icon, core, alert, filled, exclamation, !, warning, status |
| StopwatchIcon | stopwatch | stopwatch, icon, core, timer |
| StoryIcon | story | story, icon, core, bookmark, work type |
| StrokeWeightExtraLargeIcon | stroke-weight-extra-large | stroke-weight-extra-large, strokeweightextralarge, icon, core, border, weight, thickness, stroke, confluence, editor, whiteboards, thickest |
| StrokeWeightLargeIcon | stroke-weight-large | stroke-weight-large, strokeweightlarge, icon, core, border, weight, thickness, stroke, thick, confluence, editor, whiteboards |
| StrokeWeightMediumIcon | stroke-weight-medium | stroke-weight-medium, strokeweightmedium, icon, core, border, weight, stroke, medium, thickness, confluence, editor, whiteboards |
| StrokeWeightSmallIcon | stroke-weight-small | stroke-weight-small, strokeweightsmall, icon, core, border, weight, thickness, stroke, confluence, editor, whiteboards, thin |
| SubtasksIcon | subtasks | subtasks, icon, core, todo, checklist, work type |
| SuccessIcon | success | success, icon, core, tick, completed, success, filled, check mark, status |
| SupportIcon | support | support, icon, core, support, help, life raft, life ring, lifebuoy, life preserver |
| TableCellClearIcon | table-cell-clear | table-cell-clear, tablecellclear, icon, core, table, cell, clear, empty |
| TableCellMergeIcon | table-cell-merge | table-cell-merge, tablecellmerge, icon, core, table, cell, merge, combine, join |
| TableCellSplitIcon | table-cell-split | table-cell-split, tablecellsplit, icon, core, table, cell, split, divide, separate |
| TableColumnAddLeftIcon | table-column-add-left | table-column-add-left, tablecolumnaddleft, icon, core, table, column, add, plus, left, before |
| TableColumnAddRightIcon | table-column-add-right | table-column-add-right, tablecolumnaddright, icon, core, table, column, add, right, after |
| TableColumnDeleteIcon | table-column-delete | table-column-delete, tablecolumndelete, icon, core, table, column, delete, remove, x |
| TableColumnMoveLeftIcon | table-column-move-left | table-column-move-left, tablecolumnmoveleft, icon, core, table, column, move, left, arrow |
| TableColumnMoveRightIcon | table-column-move-right | table-column-move-right, tablecolumnmoveright, icon, core, table, column, move, right, arrow |
| TableColumnsDistributeIcon | table-columns-distribute | table-columns-distribute, tablecolumnsdistribute, icon, core, table, columns, distribute, even, equidistant |
| TableRowAddAboveIcon | table-row-add-above | table-row-add-above, tablerowaddabove, icon, core, table, row, add, plus, above, up |
| TableRowAddBelowIcon | table-row-add-below | table-row-add-below, tablerowaddbelow, icon, core, table, row, add, plus, below, down |
| TableRowDeleteIcon | table-row-delete | table-row-delete, tablerowdelete, icon, core, table, row, delete, remove, x |
| TableRowMoveDownIcon | table-row-move-down | table-row-move-down, tablerowmovedown, icon, core, table, row, move, down, arrow, after |
| TableRowMoveUpIcon | table-row-move-up | table-row-move-up, tablerowmoveup, icon, core, table, row, move, up, arrow, above |
| TagIcon | tag | tag, icon, core, label, topic |
| TakeoutFoodIcon | takeout-food | takeout-food, takeoutfood, icon, core, takeaway, takeout, food, burger, drink |
| TargetIcon | target | target, icon, core, target, bullseye |
| TaskIcon | task | task, check, tick, icon, core, single task, todo, list, check mark, tick |
| TaskInProgressIcon | task-in-progress | task-in-progress, taskinprogress, icon, core, calendar, task, status, in progress |
| TaskToDoIcon | task-to-do | task-to-do, tasktodo, icon, core, calendar, task, to-do, todo, status |
| TasksIcon | tasks | tasks, icon, core, multiple tasks, todo, list, check mark, tick |
| TeamsIcon | teams | teams, icon, core, infinite love, people, persons, customers, users |
| TextIcon | text | text, icon, core, character, font, letter, type, typography, text |
| TextBoldIcon | text-bold | text-bold, textbold, icon, core, text, type, bold, font |
| TextHeadingIcon | text-heading | text-heading, textheading, icon, core, text, heading, H, editor, text style |
| TextIndentLeftIcon | text-indent-left | text-indent-left, textindentleft, icon, core, text, outdent, left, arrow |
| TextIndentRightIcon | text-indent-right | text-indent-right, textindentright, icon, core, text, indent, right, arrow |
| TextItalicIcon | text-italic | text-italic, textitalic, icon, core, text, type, italic, font |
| TextShortenIcon | text-shorten | text-shorten, textshorten, icon, core, text, shorten, abbreviate, condense, AI |
| TextSpellcheckIcon | text-spellcheck | text-spellcheck, textspellcheck, icon, core, text, spelling, typo, spellcheck |
| TextStrikethroughIcon | text-strikethrough | text-strikethrough, textstrikethrough, icon, core, text, strikethrough, editor, cross out |
| TextStyleIcon | text-style | text-style, textstyle, icon, core, characters, font, letters, type, typography |
| TextUnderlineIcon | text-underline | text-underline, textunderline, icon, core, text, underline, U, editor |
| TextWrapIcon | text-wrap | text-wrap, textwrap, icon, core, text, wrap, line wrap |
| ThemeIcon | theme | theme, icon, core, theme, light mode, dark mode, theme switcher |
| ThumbsDownIcon | thumbs-down | thumbs-down, thumbsdown, icon, core, vote, downvote, dislike, feedback, hand |
| ThumbsUpIcon | thumbs-up | thumbs-up, thumbsup, icon, core, vote, upvote, like, feedback, hand |
| TimelineIcon | timeline | timeline, icon, core, gantt, calendar |
| ToolsIcon | tools | tools, icon, core, tools, wrench, spanner, screwdriver |
| TransitionIcon | transition | transition, icon, core, connector, movement |
| TranslateIcon | translate | translate, icon, core, language, translation, globe |
| TreeIcon | tree | tree, icon, core, hierarchy, org chart, structure |
| UndoIcon | undo | undo, icon, core, editor, undo, backwards |
| UploadIcon | upload | upload, cloud, icon, core, up arrow, file upload |
| VehicleCarIcon | vehicle-car | vehicle-car, vehiclecar, icon, core, car, transportation, delivery |
| VideoIcon | video | video, icon, core, video file, video content |
| VideoNextIcon | video-next | video-next, videonext, icon, core, next, skip, video control |
| VideoNextOverlayIcon | video-next-overlay | video-next-overlay, videonextoverlay, icon, core, next, skip, video control, overlay |
| VideoPauseIcon | video-pause | video-pause, videopause, icon, core, pause, video control |
| VideoPauseOverlayIcon | video-pause-overlay | video-pause-overlay, videopauseoverlay, icon, core, pause, video control, overlay |
| VideoPlayIcon | video-play | video-play, videoplay, icon, core, play, video control |
| VideoPlayOverlayIcon | video-play-overlay | video-play-overlay, videoplayoverlay, icon, core, play, video control, overlay |
| VideoPreviousIcon | video-previous | video-previous, videoprevious, icon, core, previous, rewind, video control |
| VideoPreviousOverlayIcon | video-previous-overlay | video-previous-overlay, videopreviousoverlay, icon, core, previous, rewind, video control, overlay |
| VideoSkipBackwardFifteenIcon | video-skip-backward-fifteen | video-skip-backward-fifteen, videoskipbackwardfifteen, icon, core, skip, backward, 15 seconds, video control |
| VideoSkipBackwardTenIcon | video-skip-backward-ten | video-skip-backward-ten, videoskipbackwardten, icon, core, skip, backward, 10 seconds, video control |
| VideoSkipForwardFifteenIcon | video-skip-forward-fifteen | video-skip-forward-fifteen, videoskipforwardfifteen, icon, core, skip, forward, 15 seconds, video control |
| VideoSkipForwardTenIcon | video-skip-forward-ten | video-skip-forward-ten, videoskipforwardten, icon, core, skip, forward, 10 seconds, video control |
| VideoStopIcon | video-stop | video-stop, videostop, icon, core, stop, video control |
| VideoStopOverlayIcon | video-stop-overlay | video-stop-overlay, videostopoverlay, icon, core, stop, video control, overlay |
| VolumeHighIcon | volume-high | volume-high, volumehigh, icon, core, volume, high, unmuted, audio |
| VolumeLowIcon | volume-low | volume-low, volumelow, icon, core, volume, low, quiet, audio |
| VolumeMutedIcon | volume-muted | volume-muted, volumemuted, icon, core, volume, muted, no sound, audio |
| WarningIcon | warning | warning, alert, icon, core, filled, status, exclamation, !, warning |
| WhiteboardIcon | whiteboard | whiteboard, icon, core, whiteboard, canvas, drawing |
| WorkItemIcon | work-item | work-item, workitem, icon, core, work item, task, issue |
| WorkItemsIcon | work-items | work-items, workitems, icon, core, work items, tasks, issues |
| ZoomInIcon | zoom-in | zoom-in, zoomin, icon, core, zoom, magnify, enlarge |
| ZoomOutIcon | zoom-out | zoom-out, zoomout, icon, core, zoom, reduce, shrink |

### IconTile component
A tile component that displays an icon with customizable background, shape, and appearance.
- **Keywords:** icon, tile, container, background, shape, appearance
- **Categories:** images-and-icons
- **Status:** release-candidate
#### Usage Guidelines
 - Use for icon presentation with background styling
 - Choose appropriate shapes and appearances
 - Maintain consistent sizing across tiles
 - Use for visual emphasis or categorization
#### Accessibility Guidelines
 - Provide appropriate labels for icon tiles
 - Ensure sufficient color contrast
 - Use meaningful icon choices
 - Consider touch target sizes
#### Content Guidelines
 - Use clear, recognizable icons
 - Choose appropriate colors and shapes
 - Ensure visual consistency across tiles
#### Prop guidance

- **icon** - The icon component to display
- **label** - Required descriptive label for accessibility
- **appearance** - Color appearance (blue, green, red, etc.)
- **shape** - Circle or square tile shape
- **size** - Tile size in pixels (16, 24, 32, 40, 48)

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import { IconTile } from '@atlaskit/icon';
+import AddIcon from '@atlaskit/icon/core/add';
+import CheckMarkIcon from '@atlaskit/icon/core/check-mark';

-<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
-  <AddIcon className="w-4 h-4 text-white" />
-</div>
+<IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="24" />

-<div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
-  <CheckIcon className="w-5 h-5 text-white" />
-</div>
+<IconTile icon={CheckMarkIcon} label="Success icon" appearance="green" shape="square" size="32" />
```


## @atlaskit/lozenge Package
### Lozenge component
A lozenge is a small visual indicator used to show status, category, or other short text labels.
- **Keywords:** lozenge, badge, label, status, indicator, pill
- **Categories:** status-indicators
- **Status:** general-availability
#### Usage Guidelines
 - Use for status indicators or short labels
 - Choose appropriate appearance variants
 - Keep text concise and meaningful
 - Use consistent styling across similar lozenges
 - Consider color coding for different status types
#### Accessibility Guidelines
 - Ensure sufficient color contrast for text readability
 - Provide appropriate labels for screen readers
 - Use meaningful colors and appearances
 - Consider color-blind users when choosing colors
#### Content Guidelines
 - Use clear, concise text
 - Ensure text is meaningful and descriptive
 - Use consistent terminology across lozenges
 - Consider text length and readability
#### Prop guidance

- **appearance** - success (positive), removed (negative), inprogress (ongoing), primary (neutral)
- **isBold** - Use for emphasis when needed
- **textColor** - Override default text color if required

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import Lozenge from '@atlaskit/lozenge';

-<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
-  Success
-</span>
+<Lozenge appearance="success">Success</Lozenge>

-<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
-  Error
-</span>
+<Lozenge appearance="removed">Error</Lozenge>

-<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
-  In Progress
-</span>
+<Lozenge appearance="inprogress">In Progress</Lozenge>
```


## @atlaskit/navigation-system Package
### Root component
The root container component for the navigation system that provides the overall layout structure and context.
- **Keywords:** navigation, layout, root, container, app, shell
- **Categories:** navigation, layout
- **Status:** beta
#### Usage Guidelines
 - Use as the top-level container for your application's navigation
 - Must wrap all other navigation system components
 - Provides the foundational layout structure and theming context
 - Should be placed at the root of your application's component tree
#### Accessibility Guidelines
 - Ensures proper landmark structure for screen readers
 - Provides skip links functionality for keyboard navigation
 - Maintains proper focus management across navigation areas

### SideNav component
The main sidebar navigation component that can be collapsed and expanded, containing navigation items and sections.
- **Keywords:** navigation, sidebar, menu, side, nav, collapsible
- **Categories:** navigation, layout
- **Status:** beta
#### Usage Guidelines
 - Use for primary navigation within your application
 - Can be collapsed to save space on smaller screens
 - Contains navigation items, sections, and other sidebar content
 - Works in conjunction with SideNavHeader, SideNavContent, and SideNavFooter
#### Accessibility Guidelines
 - Provides proper ARIA landmarks for navigation
 - Supports keyboard navigation within the sidebar
 - Announces state changes when collapsed/expanded

### TopNav component
The top navigation bar component that typically contains global actions, user profile, and app branding.
- **Keywords:** navigation, top, header, bar, nav, global
- **Categories:** navigation, layout
- **Status:** beta
#### Usage Guidelines
 - Use for global navigation and actions
 - Contains app branding, search, user profile, and other global elements
 - Should remain visible across different pages
 - Works with TopNavStart, TopNavMiddle, and TopNavEnd for layout
#### Accessibility Guidelines
 - Provides proper heading structure for screen readers
 - Ensures keyboard accessibility for all interactive elements
 - Maintains consistent focus management

### Main component
The main content area component that contains the primary application content.
- **Keywords:** layout, main, content, area, body
- **Categories:** navigation, layout
- **Status:** beta
#### Usage Guidelines
 - Use to wrap your main application content
 - Provides proper layout structure and spacing
 - Works with Aside component for sidebar content
 - Handles scrolling and responsive behavior
#### Accessibility Guidelines
 - Provides proper main landmark for screen readers
 - Ensures content is accessible and properly structured
 - Maintains proper focus flow within content area

### Aside component
A secondary content area component that can be used for supplementary information or actions.
- **Keywords:** layout, aside, sidebar, secondary, content
- **Categories:** navigation, layout
- **Status:** beta
#### Usage Guidelines
 - Use for secondary content that complements the main area
 - Can be resizable and collapsible
 - Works alongside Main component for two-column layouts
 - Good for supplementary information, filters, or secondary actions
#### Accessibility Guidelines
 - Provides proper complementary landmark
 - Ensures content is accessible when collapsed/expanded
 - Maintains proper focus management

### ExpandableMenuItem component
A navigation menu item that can expand and collapse to show/hide sub-items.
- **Keywords:** navigation, menu, item, expandable, collapsible, sidebar
- **Categories:** navigation, interaction
- **Status:** beta
#### Usage Guidelines
 - Use for navigation items that have sub-items or sub-sections
 - Provides clear visual indication of expandable state
 - Maintains proper hierarchy and nesting
 - Use sparingly to avoid overwhelming the navigation
#### Accessibility Guidelines
 - Provides proper ARIA expanded state announcements
 - Supports keyboard navigation for expand/collapse
 - Maintains proper focus management when expanding

### FlyoutMenuItem component
A navigation menu item that shows additional content in a flyout panel when activated.
- **Keywords:** navigation, menu, item, flyout, popup, dropdown
- **Categories:** navigation, interaction
- **Status:** beta
#### Usage Guidelines
 - Use for navigation items that need to show additional content or actions
 - Good for complex navigation patterns or contextual information
 - Ensure flyout content is relevant and not overwhelming
 - Consider mobile experience when using flyouts
#### Accessibility Guidelines
 - Provides proper ARIA controls for flyout state
 - Ensures keyboard accessibility for flyout content
 - Maintains proper focus management when opening/closing

### ButtonMenuItem component
A navigation menu item that behaves like a button, triggering actions rather than navigation.
- **Keywords:** navigation, menu, item, button, action, click
- **Categories:** navigation, interaction
- **Status:** beta
#### Usage Guidelines
 - Use for actions that don't navigate to different pages
 - Good for toggles, filters, or other interactive actions
 - Provide clear visual feedback for button state
 - Use consistent styling with other navigation items
#### Accessibility Guidelines
 - Provides proper button semantics for screen readers
 - Ensures keyboard accessibility for button actions
 - Provides clear feedback for button state changes

### LinkMenuItem component
A navigation menu item that behaves like a link, navigating to different pages or sections.
- **Keywords:** navigation, menu, item, link, href, anchor
- **Categories:** navigation, interaction
- **Status:** beta
#### Usage Guidelines
 - Use for navigation to different pages or sections
 - Provide clear indication of current page/section
 - Use descriptive text that indicates the destination
 - Maintain consistent styling with other navigation items
#### Accessibility Guidelines
 - Provides proper link semantics for screen readers
 - Indicates current page/section for screen readers
 - Ensures keyboard accessibility for navigation

### MenuSection component
A container component for grouping related navigation items with optional headings and dividers.
- **Keywords:** navigation, menu, section, group, heading, divider
- **Categories:** navigation, layout
- **Status:** beta
#### Usage Guidelines
 - Use to group related navigation items together
 - Add headings to provide context for grouped items
 - Use dividers to separate different sections
 - Keep sections logically organized and not too large
#### Accessibility Guidelines
 - Provides proper heading structure for screen readers
 - Uses appropriate ARIA landmarks for section grouping
 - Ensures proper focus flow within sections

### CreateButton component
A specialized button component for the top navigation that triggers creation actions.
- **Keywords:** navigation, top, button, create, add, new, action
- **Categories:** navigation, interaction
- **Status:** beta
#### Usage Guidelines
 - Use in the top navigation for primary creation actions
 - Should be prominently placed and easily accessible
 - Use consistent styling with other top navigation items
 - Provide clear indication of what will be created
#### Accessibility Guidelines
 - Provides clear button semantics for screen readers
 - Ensures keyboard accessibility for creation actions
 - Provides appropriate focus management

### Profile component
A user profile component for the top navigation that displays user information and account actions.
- **Keywords:** navigation, top, profile, user, avatar, account
- **Categories:** navigation, interaction
- **Status:** beta
#### Usage Guidelines
 - Use in the top navigation for user account access
 - Display user avatar and name when available
 - Provide access to account settings and logout
 - Handle both logged-in and logged-out states
#### Accessibility Guidelines
 - Provides proper user information for screen readers
 - Ensures keyboard accessibility for profile actions
 - Maintains proper focus management for dropdown menus

### Notifications component
A notifications component for the top navigation that displays alerts and notification counts.
- **Keywords:** navigation, top, notifications, alerts, bell, badge
- **Categories:** navigation, interaction
- **Status:** beta
#### Usage Guidelines
 - Use in the top navigation for system notifications
 - Display notification count badge when there are unread items
 - Provide clear visual indication of notification state
 - Ensure notifications are easily dismissible
#### Accessibility Guidelines
 - Announces notification count changes to screen readers
 - Provides keyboard accessibility for notification actions
 - Ensures proper focus management for notification panels

## @atlaskit/progress-bar Package
### ProgressBar component
A progress bar communicates the status of a system process, showing completion percentage or indeterminate progress.
- **Keywords:** progress, bar, loading, status, completion, indeterminate
- **Categories:** loading
- **Status:** general-availability
#### Usage Guidelines
 - Use for showing progress of known duration
 - Provide clear progress indicators
 - Use indeterminate state for unknown duration
 - Position progress bars prominently when active
 - Consider providing percentage or time estimates
#### Accessibility Guidelines
 - Provide appropriate ARIA labels for progress bars
 - Announce progress changes to screen readers
 - Use appropriate color contrast for visibility
 - Provide alternative text for progress status
#### Content Guidelines
 - Use clear, descriptive progress messages
 - Provide meaningful context for progress
 - Consider showing estimated time remaining
 - Use consistent progress terminology
#### Prop guidance

- **value** - Progress value between 0 and 1 (0 = 0%, 1 = 100%)
- **isIndeterminate** - Show indeterminate loading state when true
- **appearance** - Visual style: default, success, inverse
- **ariaLabel** - Accessibility label for screen readers
- **testId** - Testing identifier

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import ProgressBar from '@atlaskit/progress-bar';

-<div className="w-full bg-gray-200 rounded-full h-2.5">
-  <div
-    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
-    style={{ width: '45%' }}
-  ></div>
-</div>
+<ProgressBar value={0.45} ariaLabel="Loading progress" />

-<div className="w-full bg-gray-200 rounded-full h-2.5">
-  <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
-</div>
+<ProgressBar isIndeterminate ariaLabel="Loading" />

-<div className="w-full bg-gray-200 rounded-full h-2.5">
-  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
-</div>
+<ProgressBar value={1} appearance="success" ariaLabel="Complete" />
```


### SuccessProgressBar component
A progress bar variant that indicates successful completion of a process.
- **Keywords:** progress, bar, success, complete, finished
- **Categories:** loading
- **Status:** general-availability
#### Usage Guidelines
 - Use to indicate successful completion
 - Show briefly before transitioning to next state
 - Use appropriate success styling
 - Consider providing success message
#### Content Guidelines
 - Use clear success messaging
 - Indicate what was completed successfully
 - Provide next steps if applicable

### TransparentProgressBar component
A progress bar variant with transparent background for overlay contexts.
- **Keywords:** progress, bar, transparent, overlay, subtle
- **Categories:** loading
- **Status:** general-availability
#### Usage Guidelines
 - Use in overlay or modal contexts
 - Ensure sufficient contrast with background
 - Use for subtle progress indication
 - Consider backdrop visibility
#### Content Guidelines
 - Ensure progress is visible against background
 - Use appropriate contrast for readability
 - Keep progress indication clear

## @atlaskit/radio Package
### Radio component
A radio button component for single selection from a set of mutually exclusive choices. Use for custom radio button presentations like options in tables or when you need fine control over individual radio buttons.
- **Keywords:** radio, button, input, form, selection, choice, option
- **Categories:** form, interaction
- **Status:** general-availability
#### Usage Guidelines
 - Use for custom radio button presentations (e.g., options in tables)
 - Use when you need fine control over individual radio buttons
 - List options in logical order (most likely to least likely)
 - Make one option the default (safest, most secure option)
 - Add 'None' option if unselected state is needed
 - Add 'Other' option if not all options can be listed
#### Accessibility Guidelines
 - Include error messages for required or invalid radio fields
 - Never preselect high-risk options for payment, privacy, or security
 - Don't use disabled radio buttons if they need to remain in tab order
 - Use validation instead of disabled state for better accessibility
#### Content Guidelines
 - Use clear, descriptive labels that provide context
 - Keep labels concise but informative
 - Use sentence case for labels
 - Avoid alphabetical ordering (not localizable)
 - Avoid overlapping or skipping numeric choices
#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import { Radio } from '@atlaskit/radio';

-<input
-  type="radio"
-  name="option"
-  value="option1"
-  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
-/>
+<Radio value="option1" label="Option 1" />
```


### RadioGroup component
A radio group component that presents a list of options where only one choice can be selected. Use for most radio button scenarios where you want a simple list of mutually exclusive options.
- **Keywords:** radio, group, form, selection, choice, options, list
- **Categories:** form, interaction
- **Status:** general-availability
#### Usage Guidelines
 - Use for most radio button scenarios with simple option lists
 - List options in logical order (most likely to least likely)
 - Make one option the default (safest, most secure option)
 - Add 'None' option if unselected state is needed
 - Add 'Other' option if not all options can be listed
 - Use select component for longer lists of options
#### Accessibility Guidelines
 - Include error messages for required or invalid radio fields
 - Never preselect high-risk options for payment, privacy, or security
 - Don't use disabled radio buttons if they need to remain in tab order
 - Use validation instead of disabled state for better accessibility
 - Ensure proper keyboard navigation with arrow keys
#### Content Guidelines
 - Use clear, descriptive labels that provide context
 - Keep labels concise but informative
 - Use sentence case for labels
 - Avoid alphabetical ordering (not localizable)
 - Avoid overlapping or skipping numeric choices
#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import { RadioGroup } from '@atlaskit/radio';

-<div className="space-y-2">
-  <label className="flex items-center">
-    <input type="radio" name="size" value="small" className="w-4 h-4" />
-    <span className="ml-2">Small</span>
-  </label>
-  <label className="flex items-center">
-    <input type="radio" name="size" value="medium" className="w-4 h-4" />
-    <span className="ml-2">Medium</span>
-  </label>
-</div>
+const options = [
+	 { name: "small", value: "small", label: "Small" },
+	 { name: "medium", value: "medium", label: "Medium" },
+]
+<RadioGroup name="size" options={options} />
```


## @atlaskit/skeleton Package
### Skeleton component
A skeleton acts as a placeholder for content, usually while the content loads.
- **Keywords:** skeleton, placeholder, loading, content, shimmer, animation
- **Categories:** loading
- **Status:** early-access
#### Usage Guidelines
 - Use to indicate content is loading
 - Match skeleton structure to actual content layout
 - Use appropriate animation and timing
 - Replace with actual content when ready
 - Consider different skeleton patterns for different content types
#### Accessibility Guidelines
 - Provide appropriate loading announcements
 - Use skeleton patterns that match actual content structure
 - Ensure skeleton content is not announced as actual content
 - Consider screen reader experience during loading states
#### Content Guidelines
 - Use skeleton patterns that represent actual content structure
 - Maintain consistent skeleton styling
 - Consider content hierarchy in skeleton design
 - Use appropriate animation timing
#### Prop guidance

- **height** - Height of the skeleton (string or number)
- **width** - Width of the skeleton (string or number)
- **isShimmering** - Enable shimmer animation effect (default: true)

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import Skeleton from '@atlaskit/skeleton';

-<div className="animate-pulse">
-  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
-  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
-</div>
+<div>
+  <Skeleton height="16px" width="75%" />
+  <Skeleton height="16px" width="50%" />
+</div>

-<div className="animate-pulse">
-  <div className="h-48 bg-gray-300 rounded mb-4"></div>
-  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
-  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
-</div>
+<div>
+  <Skeleton height="192px" width="100%" />
+  <Skeleton height="16px" width="75%" />
+  <Skeleton height="16px" width="50%" />
+</div>
```


## @atlaskit/tabs Package
### Tabs component
Tabs are used to organize content by grouping similar information on the same page.
- **Keywords:** tabs, navigation, content, organization, grouping
- **Categories:** navigation
- **Status:** general-availability
#### Usage Guidelines
 - Use to organize related content on the same page
 - Keep tab labels concise and descriptive
 - Limit the number of tabs to avoid overcrowding
 - Use consistent tab ordering and grouping
 - Consider responsive behavior for many tabs
#### Accessibility Guidelines
 - Ensure proper keyboard navigation between tabs
 - Use appropriate ARIA attributes for tab panels
 - Provide clear focus indicators
 - Announce tab changes to screen readers
 - Ensure tab content is accessible
#### Content Guidelines
 - Write clear, descriptive tab labels
 - Group related content logically
 - Use consistent naming conventions
 - Ensure tab content is relevant and complete
#### Prop guidance

- **selected** - Index of the currently selected tab
- **onChange** - Handler called when tab selection changes
- **children** - Tab content (TabList and TabPanel components)

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';

-<div>
-  <div className="border-b border-gray-200">
-    <nav className="-mb-px flex space-x-8">
-      <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
-        Tab 1
-      </button>
-      <button className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
-        Tab 2
-      </button>
-    </nav>
-  </div>
-  <div className="py-4">
-    <div>Tab 2 content</div>
-  </div>
-</div>
+<Tabs selected={1} onChange={(index) => setSelectedTab(index)}>
+  <TabList>
+    <Tab>Tab 1</Tab>
+    <Tab>Tab 2</Tab>
+  </TabList>
+  <TabPanel>Tab 1 content</TabPanel>
+  <TabPanel>Tab 2 content</TabPanel>
+</Tabs>
```


## @atlaskit/tag Package
### Tag component
A tag is a compact element used to categorize, label, or organize content.
- **Keywords:** tag, label, category, filter, chip, badge
- **Categories:** data-display
- **Status:** general-availability
#### Usage Guidelines
 - Use to categorize or label content
 - Keep tag text concise and meaningful
 - Use appropriate colors and appearances
 - Consider tag removal functionality
 - Group related tags logically
#### Accessibility Guidelines
 - Provide appropriate labels for tags
 - Ensure sufficient color contrast for text readability
 - Use clear, descriptive tag text
 - Consider keyboard navigation for interactive tags
 - Provide alternative text for tag removal actions
#### Content Guidelines
 - Use clear, descriptive tag labels
 - Keep tag text concise
 - Use consistent terminology across tags
 - Consider tag hierarchy and grouping
#### Prop guidance

- **text** - Text content of the tag
- **appearance** - Visual style: default, rounded
- **color** - Custom color for the tag
- **isRemovable** - Allow tag to be removed (if supported)

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import Tag from '@atlaskit/tag';

-<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
-  React
-</span>
+<Tag text="React" />

-<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
-  Completed
-</span>
+<Tag text="Completed" color="green" />

-<span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
-  Default
-</span>
+<Tag text="Default" appearance="default" />
```


## @atlaskit/textarea Package
### Textarea component
A textarea is a multiline text input control for longer text content.
- **Keywords:** textarea, input, form, text, multiline, input, field
- **Categories:** forms-and-input
- **Status:** general-availability
#### Usage Guidelines
 - Use for longer text input needs
 - Provide appropriate sizing for content type
 - Use clear, descriptive labels
 - Consider character limits and validation
 - Use appropriate placeholder text
#### Accessibility Guidelines
 - Provide clear labels for all textareas
 - Use appropriate placeholder text that doesn't replace labels
 - Provide keyboard navigation support
 - Indicate required fields clearly
 - Use appropriate error states and messaging
#### Content Guidelines
 - Write clear, descriptive labels
 - Use helpful placeholder text
 - Provide appropriate error messages
 - Consider content length and formatting
#### Prop guidance

- **placeholder** - Placeholder text when empty
- **resize** - Resize behavior: auto, vertical, horizontal, none
- **maxHeight** - Maximum height before scrolling
- **name** - Name attribute for form submission
- **defaultValue** - Initial value for uncontrolled component
- **isDisabled** - Disable the textarea
- **isRequired** - Mark field as required

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import TextArea from '@atlaskit/textarea';

-<textarea
-  placeholder="Enter your message"
-  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
-  rows={4}
-/>
+<TextArea placeholder="Enter your message" resize="none" />

-<div>
-  <label className="block text-sm font-medium text-gray-700 mb-1">
-    Description <span className="text-red-500">*</span>
-  </label>
-  <textarea
-    required
-    className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
-    rows={4}
-  />
-  <p className="mt-1 text-sm text-red-600">This field is required</p>
-</div>
+<TextArea
+  label="Description"
+  isRequired
+  isInvalid
+  errorMessage="This field is required"
+/>
```


## @atlaskit/toggle Package
### Toggle component
A toggle is used to view or switch between enabled or disabled states.
- **Keywords:** toggle, switch, on-off, enabled, disabled, state
- **Categories:** forms-and-input
- **Status:** general-availability
#### Usage Guidelines
 - Use for binary on/off states
 - Provide clear labels that describe the toggle's function
 - Use appropriate default states
 - Consider immediate vs. delayed state changes
 - Use consistent toggle behavior across the interface
#### Accessibility Guidelines
 - Provide clear labels for all toggles
 - Use appropriate ARIA attributes for toggle state
 - Ensure keyboard navigation support
 - Provide clear visual feedback for state changes
 - Use descriptive labels that explain the toggle's purpose
#### Content Guidelines
 - Write clear, descriptive labels
 - Use action-oriented language when appropriate
 - Ensure labels clearly indicate what the toggle controls
 - Use consistent terminology across toggles
#### Prop guidance

- **id** - Unique identifier for the toggle
- **label** - Descriptive label for the toggle
- **isChecked** - Current checked state
- **onChange** - Handler called when toggle state changes
- **isDisabled** - Disable the toggle

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import Toggle from '@atlaskit/toggle';

-<label className="relative inline-flex items-center cursor-pointer">
-  <input type="checkbox" className="sr-only peer" />
-  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
-  <span className="ml-3 text-sm font-medium text-gray-900">Enable notifications</span>
-</label>
+<Toggle
+  id="notifications"
+  label="Enable notifications"
+  isChecked={isEnabled}
+  onChange={setIsEnabled}
+/>

-<label className="relative inline-flex items-center cursor-pointer opacity-50">
-  <input type="checkbox" disabled className="sr-only peer" />
-  <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
-  <span className="ml-3 text-sm font-medium text-gray-400">Disabled toggle</span>
-</label>
+<Toggle
+  id="disabled"
+  label="Disabled toggle"
+  isDisabled
+/>
```


## @atlaskit/tokens Package
### token function
Design tokens provide consistent, semantic values for colors, spacing, typography, and other design properties across the Atlassian Design System. Use tokens instead of hardcoded values to ensure consistency and proper theming.
- **Keywords:** token, design, system, color, spacing, typography, radius, theme, css, style, variable
- **Categories:** tokens
- **Status:** general-availability
#### Usage Guidelines
 - AVOID hardcoding any CSS values where a token exists for that type; in  many cases you may be forced to use a token
 - Use the `token()` function with inline styles or CSS-in-JS
 - Use semantic token names for better maintainability
#### Accessibility Guidelines
 - Use color tokens to ensure proper contrast ratios
 - Test color combinations for accessibility compliance
 - Use semantic color names (success, warning, danger) for better meaning
#### Use cases

- **Background colors** (`bg-` in Tailwind) - Most common background colors have corresponding
  `color.background.*` tokens
- **Surface colors** (`bg-` in Tailwind) - Body, cards and modals have corresponding
  `elevation.surface.*` tokens
- **Text colors** (`text-` in Tailwind) - Most text colors have corresponding `color.text.*` tokens
- **Border colors** - Use `color.border.*` tokens when available
- **Icon colors** - Use `color.icon.*` tokens for icon styling

#### Understanding token values

- Always prefer design tokens over hardcoded values
- Use semantic color names (success, warning, danger)
- Maintain consistent color usage across components
- Test color contrast for accessibility

#### Translation from Tailwind

##### To convert

1. Find Tailwind classes that have token equivalents in tables below
2. Replace with `token()` using inline styles
3. Keep remaining Tailwind classes for layout/utilities without tokens

##### Requirements

- **NEVER** assume tailwind color equals the token color
- **Instead** use the conversion table below
- **Fallback** to hardcoded values **ONLY IF** no applicable token exists

##### Examples

- `bg-blue-100` = `token('color.background.accent.blue.subtlest')`
- `text-gray-600` = `token('color.text.accent.gray')`
- `border-gray-200` = `token('color.border')`

#### Popular colors

##### Background colors (`bg-`)

| Tailwind Class | Tailwind Hex | Design Token                            | Token Hex |
| -------------- | ------------ | --------------------------------------- | --------- |
| bg-blue-50     | #EFF6FF      | color.background.accent.blue.subtlest   | #E9F2FF   |
| bg-blue-100    | #DBEAFE      | color.background.accent.blue.subtlest   | #E9F2FF   |
| bg-gray-100    | #F3F4F6      | elevation.surface.sunken                | #F1F2F4   |
| bg-gray-200    | #E5E7EB      | color.background.accent.gray.subtlest   | #F1F2F4   |
| bg-gray-800    | #1F2937      | color.background.brand.boldest          | #1C2B41   |
| bg-green-100   | #DCFCE7      | color.background.accent.green.subtlest  | #DCFFF1   |
| bg-green-700   | #15803D      | color.background.accent.green.bolder    | #1F845A   |
| bg-red-50      | #FEF2F2      | color.background.accent.red.subtlest    | #FFECEB   |
| bg-red-100     | #FEE2E2      | color.background.accent.red.subtlest    | #FFECEB   |
| bg-yellow-50   | #FEFCE8      | color.background.accent.yellow.subtlest | #FFF7D6   |
| bg-yellow-100  | #FEF9C3      | color.background.accent.yellow.subtlest | #FFF7D6   |
| bg-white       | #FFFFFF      | elevation.surface                       | #FFFFFF   |
| bg-white       | #FFFFFF      | elevation.surface.raised                | #FFFFFF   |

##### Text colors (`text-`)

| Tailwind Class  | Tailwind Hex | Design Token                    | Token Hex |
| --------------- | ------------ | ------------------------------- | --------- |
| text-black      | #000000      | color.text                      | #172B4D   |
| text-white      | #FFFFFF      | color.text.inverse              | #FFFFFF   |
| text-gray-500   | #6B7280      | color.text.subtlest             | #626F86   |
| text-gray-600   | #4B5563      | color.text.accent.gray          | #44546F   |
| text-gray-900   | #111827      | color.text                      | #172B4D   |
| text-gray-950   | #030712      | color.text.accent.gray.bolder   | #091E42   |
| text-blue-600   | #2563EB      | color.text.selected             | #0C66E4   |
| text-blue-800   | #1E40AF      | color.text.accent.blue          | #0055CC   |
| text-blue-900   | #0C4A6E      | color.text.accent.blue.bolder   | #09326C   |
| text-green-800  | #166534      | color.text.accent.green.bolder  | #164B35   |
| text-red-600    | #DC2626      | color.text.accent.red           | #AE2E24   |
| text-red-900    | #7F1D1D      | color.text.accent.red.bolder    | #5D1F1A   |
| text-orange-800 | #9A3412      | color.text.accent.orange        | #A54800   |
| text-orange-900 | #702E00      | color.text.accent.orange.bolder | #702E00   |
| text-purple-700 | #7E22CE      | color.text.accent.purple        | #5E4DB2   |
| text-purple-900 | #581C87      | color.text.accent.purple.bolder | #352C63   |

##### Icon colors (`fill-`)

| Tailwind Class  | Tailwind Hex | Design Token              | Token Hex |
| --------------- | ------------ | ------------------------- | --------- |
| fill-blue-500   | #3B82F6      | color.icon.accent.blue    | #579DFF   |
| fill-green-500  | #22C55E      | color.icon.accent.green   | #22A06B   |
| fill-red-500    | #EF4444      | color.icon.accent.red     | #C9372C   |
| fill-orange-500 | #F97316      | color.icon.accent.orange  | #E56910   |
| fill-yellow-500 | #EAB308      | color.icon.accent.yellow  | #E2B203   |
| fill-purple-500 | #A855F7      | color.icon.accent.purple  | #8F7EE7   |
| fill-teal-500   | #14B8A6      | color.icon.accent.teal    | #2898BD   |
| fill-lime-500   | #84CC16      | color.icon.accent.lime    | #6A9A23   |
| fill-pink-600   | #DB2777      | color.icon.accent.magenta | #CD519D   |

##### Border colors (`border-`)

| Tailwind Class    | Tailwind Hex | Design Token               | Token Hex |
| ----------------- | ------------ | -------------------------- | --------- |
| border-gray-200   | #E5E7EB      | color.border               | #DFE1E6   |
| border-gray-300   | #D1D5DB      | color.border               | #DFE1E6   |
| border-gray-400   | #9CA3AF      | color.border.input         | #8590A2   |
| border-blue-500   | #3B82F6      | color.border.focused       | #388BFF   |
| border-red-600    | #DC2626      | color.border.accent.red    | #E2483D   |
| border-green-500  | #22C55E      | color.border.accent.green  | #4BCE97   |
| border-yellow-400 | #FACC15      | color.border.accent.yellow | #E2B203   |

##### Secondary colors

| Tailwind Class | Pixel Value | Design Token                                     | Pixel Value |
| -------------- | ----------- | ------------------------------------------------ | ----------- |
| bg-emerald-50  | #ECFDF5     | color.background.accent.green.subtlest           | #DCFFF1     |
| bg-emerald-600 | #059669     | color.background.accent.green.bolder             | #1F845A     |
| bg-emerald-700 | #047857     | color.background.accent.green.bolder             | #1F845A     |
| bg-fuchsia-100 | #FAE8FF     | color.background.accent.magenta.subtlest         | #FFECF8     |
| bg-fuchsia-50  | #FDF4FF     | color.background.accent.magenta.subtlest         | #FFECF8     |
| bg-gray-100    | #F3F4F6     | color.background.accent.gray.subtlest            | #F1F2F4     |
| bg-gray-200    | #E5E7EB     | color.background.accent.gray.subtlest            | #F1F2F4     |
| bg-gray-50     | #F9FAFB     | color.background.input.hovered                   | #F7F8F9     |
| bg-gray-800    | #1F2937     | color.background.brand.boldest                   | #1C2B41     |
| bg-gray-900    | #111827     | color.background.brand.boldest                   | #1C2B41     |
| bg-green-100   | #DCFCE7     | color.background.accent.green.subtlest           | #DCFFF1     |
| bg-green-200   | #BBF7D0     | color.background.accent.green.subtlest.hovered   | #BAF3DB     |
| bg-green-300   | #86EFAC     | color.background.accent.green.subtlest.pressed   | #7EE2B8     |
| bg-green-400   | #4ADE80     | color.background.accent.green.subtler.pressed    | #4BCE97     |
| bg-green-50    | #F0FDF4     | color.background.accent.green.subtlest.hovered   | #BAF3DB     |
| bg-green-700   | #15803D     | color.background.accent.green.bolder             | #1F845A     |
| bg-green-800   | #166534     | color.background.accent.green.bolder             | #1F845A     |
| bg-indigo-100  | #E0E7FF     | color.background.accent.blue.subtlest            | #E9F2FF     |
| bg-indigo-200  | #C7D2FE     | color.background.accent.blue.subtlest.hovered    | #CCE0FF     |
| bg-indigo-300  | #A5B4FC     | color.background.accent.blue.subtlest.hovered    | #CCE0FF     |
| bg-indigo-400  | #818CF8     | color.background.accent.purple.subtler.pressed   | #9F8FEF     |
| bg-indigo-50   | #EEF2FF     | color.background.accent.blue.subtlest            | #E9F2FF     |
| bg-indigo-700  | #4338CA     | color.background.accent.purple.bolder            | #6E5DC6     |
| bg-lime-100    | #ECFCCB     | color.background.accent.lime.subtlest            | #EFFFD6     |
| bg-lime-200    | #D9F99D     | color.background.accent.lime.subtlest.hovered    | #D3F1A7     |
| bg-lime-300    | #BEF264     | color.background.accent.lime.subtlest.pressed    | #B3DF72     |
| bg-lime-400    | #A3E635     | color.background.accent.lime.subtler.pressed     | #94C748     |
| bg-lime-50     | #F7FEE7     | color.background.accent.lime.subtlest            | #EFFFD6     |
| bg-orange-100  | #FFEDD5     | color.background.accent.orange.subtlest          | #FFF3EB     |
| bg-orange-200  | #FED7AA     | color.background.accent.orange.subtlest.pressed  | #FEC195     |
| bg-orange-300  | #FDBA74     | color.background.accent.orange.subtler.pressed   | #FEA362     |
| bg-orange-400  | #FB923C     | color.background.accent.orange.subtler.pressed   | #FEA362     |
| bg-orange-50   | #FFF7ED     | color.background.accent.orange.subtlest          | #FFF3EB     |
| bg-pink-100    | #FCE7F3     | color.background.accent.magenta.subtlest.hovered | #FDD0EC     |
| bg-pink-200    | #FBCFE8     | color.background.accent.magenta.subtlest.hovered | #FDD0EC     |
| bg-pink-300    | #F9A8D4     | color.background.accent.magenta.subtlest.pressed | #F797D2     |
| bg-pink-400    | #F472B6     | color.background.accent.magenta.subtlest.pressed | #F797D2     |
| bg-pink-50     | #FDF2F8     | color.background.accent.magenta.subtlest.hovered | #FDD0EC     |
| bg-purple-100  | #F3E8FF     | color.background.accent.purple.subtlest          | #F3F0FF     |
| bg-purple-200  | #E9D5FF     | color.background.accent.purple.subtlest          | #F3F0FF     |
| bg-purple-300  | #D8B4FE     | color.background.accent.purple.subtlest.hovered  | #DFD8FD     |
| bg-purple-400  | #C084FC     | color.background.accent.purple.subtler.pressed   | #9F8FEF     |
| bg-purple-50   | #FAF5FF     | color.background.accent.purple.subtlest          | #F3F0FF     |
| bg-red-100     | #FEE2E2     | color.background.accent.red.subtlest             | #FFECEB     |
| bg-red-200     | #FECACA     | color.background.accent.red.subtlest.hovered     | #FFD5D2     |
| bg-red-300     | #FCA5A5     | color.background.accent.red.subtlest.pressed     | #FD9891     |
| bg-red-400     | #F87171     | color.background.accent.red.subtler.pressed      | #F87168     |
| bg-red-50      | #FEF2F2     | color.background.accent.red.subtlest             | #FFECEB     |
| bg-rose-100    | #FFE4E6     | color.background.accent.red.subtlest             | #FFECEB     |
| bg-rose-200    | #FECDD3     | color.background.accent.red.subtlest.hovered     | #FFD5D2     |
| bg-rose-300    | #FDA4AF     | color.background.accent.red.subtlest.pressed     | #FD9891     |
| bg-rose-400    | #FB7185     | color.background.accent.red.subtler.pressed      | #F87168     |
| bg-rose-50     | #FFF1F2     | color.background.accent.red.subtlest             | #FFECEB     |
| bg-sky-100     | #E0F2FE     | color.background.accent.teal.subtlest            | #E7F9FF     |
| bg-sky-200     | #BAE6FD     | color.background.accent.teal.subtlest.hovered    | #C6EDFB     |
| bg-sky-300     | #7DD3FC     | color.background.accent.teal.subtlest.hovered    | #C6EDFB     |
| bg-sky-400     | #38BDF8     | color.background.accent.teal.subtler.pressed     | #6CC3E0     |
| bg-sky-50      | #F0F9FF     | color.background.accent.teal.subtlest            | #E7F9FF     |
| bg-slate-100   | #F1F5F9     | color.background.input.hovered                   | #F7F8F9     |
| bg-slate-200   | #E2E8F0     | color.background.accent.gray.subtlest.hovered    | #DCDFE4     |
| bg-slate-300   | #CBD5E1     | color.background.accent.gray.subtlest.hovered    | #DCDFE4     |
| bg-slate-50    | #F8FAFC     | color.background.input.hovered                   | #F7F8F9     |
| bg-stone-100   | #F5F5F4     | color.background.accent.yellow.subtlest          | #FFF7D6     |
| bg-stone-50    | #FAFAF9     | color.background.accent.yellow.subtlest          | #FFF7D6     |
| bg-teal-100    | #CCFBF1     | color.background.accent.green.subtlest           | #DCFFF1     |
| bg-teal-200    | #99F6E4     | color.background.accent.green.subtlest.hovered   | #BAF3DB     |
| bg-teal-300    | #5EEAD4     | color.background.accent.green.subtlest.pressed   | #7EE2B8     |
| bg-teal-400    | #2DD4BF     | color.background.accent.green.subtler.pressed    | #4BCE97     |
| bg-teal-50     | #F0FDFA     | color.background.accent.green.subtlest.hovered   | #BAF3DB     |
| bg-teal-600    | #0D9488     | color.background.accent.green.bolder             | #1F845A     |
| bg-teal-700    | #0F766E     | color.background.accent.green.bolder             | #1F845A     |
| bg-violet-100  | #EDE9FE     | color.background.accent.purple.subtlest.hovered  | #DFD8FD     |
| bg-violet-200  | #DDD6FE     | color.background.accent.purple.subtlest.hovered  | #DFD8FD     |
| bg-violet-300  | #C4B5FD     | color.background.accent.purple.subtlest.hovered  | #DFD8FD     |
| bg-violet-400  | #A78BFA     | color.background.accent.purple.subtler.pressed   | #9F8FEF     |
| bg-violet-50   | #F5F3FF     | color.background.accent.purple.subtlest          | #F3F0FF     |
| bg-yellow-100  | #FEF9C3     | color.background.accent.yellow.subtlest          | #FFF7D6     |
| bg-yellow-200  | #FEF08A     | color.background.accent.yellow.subtlest.hovered  | #F8E6A0     |
| bg-yellow-300  | #FDE047     | color.background.accent.yellow.subtlest.pressed  | #F5CD47     |
| bg-yellow-400  | #FACC15     | color.background.accent.yellow.subtler.pressed   | #E2B203     |
| bg-yellow-50   | #FEFCE8     | color.background.accent.yellow.subtlest          | #FFF7D6     |
| bg-yellow-500  | #EAB308     | color.background.accent.yellow.subtler.pressed   | #E2B203     |
| bg-yellow-600  | #CA8A04     | color.background.accent.yellow.subtle.pressed    | #CF9F02     |
| bg-zinc-100    | #F4F4F5     | color.background.accent.gray.subtlest            | #F1F2F4     |
| bg-zinc-200    | #E4E4E7     | color.background.accent.gray.subtlest            | #F1F2F4     |
| bg-zinc-300    | #D4D4D8     | color.background.accent.gray.subtlest.hovered    | #DCDFE4     |
| bg-zinc-400    | #A1A1AA     | color.background.accent.gray.subtlest.pressed    | #B3B9C4     |

Example migration from Tailwind classes to ADS color tokens:

```tsx
+import { token } from '@atlaskit/tokens';
-<div className="bg-gray-100 text-gray-700 border border-gray-300">Content</div>
+<div style={{
+  backgroundColor: token('elevation.surface.sunken'),
+  color: token('color.text.accent.gray'),
+  borderColor: token('color.border')
+}}>Content</div>

-<span className="text-green-600 bg-green-100">Success</span>
+<span style={{
+  color: token('color.text.accent.green.bolder'),
+  backgroundColor: token('color.background.accent.green.subtlest')
+}}>Success</span>
```

#### Use cases

- **Padding** - Internal spacing within components
- **Margin** - External spacing between components
- **Gap** - Spacing between flex/grid items
- **Width/Height** - Component dimensions

#### Understanding token values

- **space.0** - 0px (no spacing)
- **space.025** - 2px (very tight)
- **space.050** - 4px (tight)
- **space.100** - 8px (small)
- **space.150** - 12px (medium-small)
- **space.200** - 16px (default)
- **space.250** - 20px (medium)
- **space.300** - 24px (large)
- **space.400** - 32px (very large)
- **space.500** - 40px (extra large)
- **space.600** - 48px (huge)
- **space.800** - 64px (massive)
- **space.1000** - 80px (extreme)

These token values may be the 16-base rem equivalents; pixel values are used for reference.

#### Translation from Tailwind

##### To convert

1. Find Tailwind classes that have token equivalents in tables below
2. Replace with `token()` using inline styles
3. Keep remaining Tailwind classes for layout/utilities without tokens

##### Requirements

- **NEVER** assume tailwind number equals the token number
- **Instead** use the conversion table below
- **Fallback** to hardcoded values **ONLY IF** an applicable tokene xists

##### Examples

- `p-6` = `token('space.300')` (NOT `space.600`)
- `m-4` = `margin: token('space.200')` (NOT `space.400`)
- `gap-8` = `gap: token('space.400')` (NOT `space.800`)

##### Margin and padding

| Tailwind Class | Pixel Value | Design Token | Pixel Value |
| -------------- | ----------- | ------------ | ----------- |
| m-0            | 0px         | space.0      | 0px         |
| p-0            | 0px         | space.0      | 0px         |
| m-0.5          | 2px         | space.025    | 2px         |
| p-0.5          | 2px         | space.025    | 2px         |
| m-1            | 4px         | space.050    | 4px         |
| p-1            | 4px         | space.050    | 4px         |
| m-1.5          | 6px         | space.075    | 6px         |
| p-1.5          | 6px         | space.075    | 6px         |
| m-2            | 8px         | space.100    | 8px         |
| p-2            | 8px         | space.100    | 8px         |
| m-3            | 12px        | space.150    | 12px        |
| p-3            | 12px        | space.150    | 12px        |
| m-4            | 16px        | space.200    | 16px        |
| p-4            | 16px        | space.200    | 16px        |
| m-5            | 20px        | space.250    | 20px        |
| p-5            | 20px        | space.250    | 20px        |
| m-6            | 24px        | space.300    | 24px        |
| p-6            | 24px        | space.300    | 24px        |
| m-8            | 32px        | space.400    | 32px        |
| p-8            | 32px        | space.400    | 32px        |
| m-10           | 40px        | space.500    | 40px        |
| p-10           | 40px        | space.500    | 40px        |
| m-12           | 48px        | space.600    | 48px        |
| p-12           | 48px        | space.600    | 48px        |
| m-16           | 64px        | space.800    | 64px        |
| p-16           | 64px        | space.800    | 64px        |
| m-20           | 80px        | space.1000   | 80px        |
| p-20           | 80px        | space.1000   | 80px        |

##### Gap values

| Tailwind Class | Pixel Value | Design Token | Pixel Value |
| -------------- | ----------- | ------------ | ----------- |
| gap-0          | 0px         | space.0      | 0px         |
| gap-0.5        | 2px         | space.025    | 2px         |
| gap-1          | 4px         | space.050    | 4px         |
| gap-1.5        | 6px         | space.075    | 6px         |
| gap-2          | 8px         | space.100    | 8px         |
| gap-3          | 12px        | space.150    | 12px        |
| gap-4          | 16px        | space.200    | 16px        |
| gap-5          | 20px        | space.250    | 20px        |
| gap-6          | 24px        | space.300    | 24px        |
| gap-8          | 32px        | space.400    | 32px        |
| gap-10         | 40px        | space.500    | 40px        |
| gap-12         | 48px        | space.600    | 48px        |
| gap-16         | 64px        | space.800    | 64px        |
| gap-20         | 80px        | space.1000   | 80px        |

##### Example migration from Tailwind classes to ADS spacing tokens

```tsx
+import { token } from '@atlaskit/tokens';
-<div className="p-4 m-2 gap-3">Content</div>
+<div
+	style={{
+		padding: token('space.200'),
+		margin: token('space.100'),
+		gap: token('space.150'),
+	}}
+>
+	Content
+</div>;
```

#### Use cases

- **Small radius** - Subtle rounding for inputs and buttons
- **Medium radius** - Standard rounding for cards and panels
- **Large radius** - Prominent rounding for modals and overlays
- **Circle radius** - Perfect circles for avatars and icons

#### Understanding token values

- **border.radius.050** - 2px (subtle rounding)
- **border.radius.200** - 4px (standard rounding)
- **border.radius.300** - 8px (prominent rounding)
- **border.radius.400** - 12px (large rounding)
- **border.radius.circle** - 9999px (perfect circle)

#### Translation from Tailwind

##### To convert

1. Find Tailwind classes that have token equivalents in tables below
2. Replace with `token()` using inline styles
3. Keep remaining Tailwind classes for layout/utilities without tokens

##### Requirements

- **NEVER** assume tailwind number equals the token number
- **Instead** use the conversion table below
- **Fallback** to hardcoded values **ONLY IF** no applicable token exists

##### Examples

- `rounded-lg` = `token('border.radius.300')` (NOT `border.radius.800`)
- `rounded-sm` = `token('border.radius.050')` (NOT `border.radius.100`)
- `rounded-full` = `token('border.radius.circle')`

##### Border radius values

| Tailwind Class | Pixel Value | Design Token         | Pixel Value |
| -------------- | ----------- | -------------------- | ----------- |
| rounded-sm     | 2px         | border.radius.050    | 2px         |
| rounded        | 4px         | border.radius.200    | 4px         |
| rounded-lg     | 8px         | border.radius.300    | 8px         |
| rounded-xl     | 12px        | border.radius.400    | 12px        |
| rounded-full   | 9999px      | border.radius.circle | 9999px      |

##### Example migration from Tailwind classes to ADS radius tokens

```tsx
+import { token } from '@atlaskit/tokens';
-<div className="rounded-lg">Card content</div>
+<div style={{ borderRadius: token('border.radius.300') }}>Card content</div>

-<img className="rounded-full" src="…" />
+<img style={{ borderRadius: token('border.radius.circle') }} src="…" />
```


## @atlaskit/tooltip Package
### Tooltip component
A tooltip is a floating, non-actionable label used to explain a user interface element or feature.
- **Keywords:** tooltip, hint, help, floating, label, explanation
- **Categories:** overlays-and-layering
- **Status:** general-availability
#### Usage Guidelines
 - Use to provide additional context or explanation
 - Keep tooltip content concise and helpful
 - Position tooltips appropriately to avoid obstruction
 - Use consistent tooltip behavior across the interface
 - Consider mobile touch interactions
#### Accessibility Guidelines
 - Ensure tooltip content is announced by screen readers
 - Use appropriate hover/focus triggers
 - Provide keyboard access to tooltip content
 - Use clear, descriptive tooltip text
 - Consider tooltip timing and persistence
#### Content Guidelines
 - Write clear, concise explanatory text
 - Use helpful, actionable information
 - Avoid redundant information already visible
 - Use consistent tone and style
#### Prop guidance

- **content** - Tooltip text or JSX content
- **position** - Tooltip position (top, bottom, left, right)
- **delay** - Delay before showing tooltip (default 300ms)
- **testId** - Testing identifier

#### Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code.

```diff
+import Tooltip from '@atlaskit/tooltip';

-<div className="relative group">
-  <button className="px-4 py-2 bg-blue-500 text-white rounded">Hover me</button>
-  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity">
-    Tooltip content
-    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
-  </div>
-</div>
+<Tooltip content="Tooltip content">
+  <button>Hover me</button>
+</Tooltip>

-<div className="relative group">
-  <span className="text-gray-500">?</span>
-  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 rounded">
-    Help text
-  </div>
-</div>
+<Tooltip content="Help text" position="top">
+  <span>?</span>
+</Tooltip>
```

