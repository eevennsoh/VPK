# Vibe coding tool guidelines

## Core Principle: ADS First, Always

**Default Approach**: Always attempt to use Atlassian Design System (@atlaskit) components, tokens,
and icons FIRST before considering alternatives. Only fall back to shadcn/ui, lucide-react, or
custom solutions when ADS doesn't provide the needed functionality.

**Priority**: Preserve existing design and functionality
**Priority**: Use design tokens first → Tailwind classes for missing tokens → inline styles as last resort
**Priority**: ADS components first → Shadcn for anything missing → custom components as a last resort
**Priority**: When generating new content follow the Content Writing Guidelines below

## Quick Navigation Guide

### 🎨 **Colors**

- **First**: Use ADS design tokens for all colors
- **NEVER USE**: Hex values like `#FFFFFF`
- **Reference**: Colors section for available tokens and tailwind references
- **Fallback**: Tailwind classes only when no appropriate token exists

### 🆎 **Headings**

- **NEVER USE** native html heading elements like `<h1>`,`
- **Instead** use ADS Heading component
- **Fallback**: Custom text styling only if ADS doesn't cover the use case

### **Text**

- **NEVER USE** native html heading elements like `<p>`,`<span>`,`<div>`
- **Instead** use ADS Text primitive
- **Fallback**: Custom text styling only if ADS doesn't cover the use case

### 🎨 **Padding, marging, gaps**

- **NEVER USE** pixel or rem values for padding, margin or gap
- **Instead** use space tokens like `space.100` instead
- **Fallback**: Custom tailwind spacing if ADS doesn't cover the use case

### 🎨 **Lozenge**

- **Never** use custom lozenge implementations with Tailwind
- **Always** import from `@atlaskit/lozenge`
- **Always** use semantic appearances for consistent meaning

### 🎨 **Buttons**

- **Never** use native `<button>` elements with Tailwind classes
- **Always** import from `@atlaskit/button/new`
- **Instead**: use Button for buttons with text and icons, use IconButon for icon only buttons
  without a label, and use DropdownMenu for buttons with a chevron appended

### 🧭 **Navigation Systems**

- **Template Pre-configured**: Navigation system (top header + side nav) is already set up in the
  template
- **DO NOT MODIFY**: Keep the existing TopNavigation and SideNavigation components as-is
- **Focus Area**: Only modify the main content area inside the navigation shell

### 📐 **Layout & Structure**

- **Always**: Use divs with inline styles and spacing tokens for anything autolayout or layout

### 🎯 **Icons**

- **NEVER** use an icon from `@atlaskit/icon/glyph/`, this is deprecated
- **ALWAYS** use an icon from `@atlaskit/icon/core/` and `@atlaskit/icon-lab/core/`
- **First**: Use ADS icon library exclusively, search in the #icons table below
- **Process**: Always search ADS icons before considering alternatives
- **NEVER** suggest icons not listed below
- **NEVER** invent or guess icon names
- **ALWAYS** verify the exact icon name exists
- **NEVER** invent or guess icon names - use table below
- **ALWAYS** use lucide-react icons if not found in ADS
- Import pattern: `import AddIcon from '@atlaskit/icon/core/add';`

## Common Icon Mappings

❌ `folder` → ✅ `folder-closed` or `folder-open`
❌ `user` → ✅ `person`
❌ `play` → ✅ `video-play`
❌ `arrow` → ✅ `arrow-right`, `arrow-left`, etc.
❌ `chevron` → ✅ `chevron-down`, `chevron-up`, etc.

### 📊 **Progress Bar**

- **Never** use custom progress implementations with Tailwind
- **Always** import from `@atlaskit/progress-bar`
- **Use cases**: Loading states, completion tracking, file uploads
- **Key props**: `value` (0-100), `isIndeterminate`, `appearance`

### 🗂️ **Drawer**

- **Never** use custom drawer/modal implementations with Tailwind
- **Always** import from `@atlaskit/drawer`
- **Use cases**: Side panels, detailed views, secondary content
- **Key props**: `isOpen`, `onClose`, `width`, `placement`

### ☑️ **Checkbox**

- **Never** use native `<input type="checkbox">` elements with Tailwind classes
- **Always** import from `@atlaskit/checkbox`
- **Use cases**: Form selections, multi-select lists, settings toggles
- **Key props**: `isChecked`, `onChange`, `isIndeterminate`, `isDisabled`

### 🚨 **Banner**

- **Never** use custom alert/notification implementations with Tailwind
- **Always** import from `@atlaskit/banner`
- **Use cases**: System messages, warnings, announcements, errors
- **Key props**: `appearance` (error, warning, announcement), `isOpen`, `onClose`

### 🔄 **Toggle**

- **Never** use custom toggle/switch implementations with Tailwind
- **Always** import from `@atlaskit/toggle`
- **Use cases**: Settings switches, feature toggles, on/off states
- **Key props**: `isChecked`, `onChange`, `isDisabled`, `size`

### 🏷️ **Tag**

- **Never** use custom tag implementations with Tailwind
- **Always** import from `@atlaskit/tag`
- **Use cases**: Labels, categories, filters, removable items
- **Key props**: `text`, `color`, `removeButtonLabel`, `onRemove`

### 📝 **Textarea**

- **Never** use native `<textarea>` elements with Tailwind classes
- **Always** import from `@atlaskit/textarea`
- **Use cases**: Multi-line text input, comments, descriptions
- **Key props**: `value`, `onChange`, `placeholder`, `isDisabled`, `isRequired`

### 📑 **Tabs**

- **Never** use custom tab implementations with Tailwind
- **Always** import from `@atlaskit/tabs`
- **Use cases**: Content organization, navigation within sections
- **Key props**: `tabs`, `selected`, `onChange`, `isDisabled`

### 💀 **Skeleton**

- **Never** use custom loading skeleton implementations with Tailwind
- **Always** import from `@atlaskit/skeleton`
- **Use cases**: Loading states, content placeholders, progressive loading
- **Key props**: `width`, `height`, `isShimmering`, `testId`

### 🔘 **Radio**

- **Never** use native `<input type="radio">` elements with Tailwind classes
- **Always** import from `@atlaskit/radio`
- **Use cases**: Single selection from multiple options, form choices
- **Key props**: `isChecked`, `onChange`, `isDisabled`, `value`

## Decision Tree

```
Need UI Element?
├── Check ADS Components → Found? → Use ADS
├── Check ADS Tokens → Found? → Use Tokens
├── Check ADS Icons → Found? → Use Icons
└── No ADS Solution? → Document why + Create minimal custom solution
```

## Key Reminders

1. **Top Navigation is locked** - Only modify `navigationConfig`, don't modify the React elements
2. **Side Navigation outer shell is locked** - Only modify what is inside `<SideNavContent>`
3. **Always start with ADS** - Don't assume something isn't available
4. **Use the guidelines** - They contain working examples and best practices
5. **Tokens over hardcoded values** - Always prefer design tokens
6. **Compose before creating** - Try combining ADS components before building custom
7. **Document exceptions** - If you can't use ADS, explain why

## Content Writing Guidelines

### Core Voice Characteristics:

- **Clear and direct**: Professional yet approachable
- **Helpful and empowering**: Consistent across communications
- **Localization-friendly**: Works across global audiences

#### Brand Personality:

- **Bold**: Motivate teams, offer best practices, provide accurate information
- **Optimistic**: Focus on key points that help users immediately, build confidence
- **Practical, with a Wink**: Be direct and concise, offer timely help, add appropriate moments of
  delight

#### Adaptive Tone by Context:

- **New users/learning**: Be prescriptive and supportive to build trust
- **Power users/productivity**: Be direct and efficient, highlight advanced capabilities
- **Problem resolution**: Maintain calm tone focused on solutions with appropriate empathy
- **Success/achievement**: Be celebratory but not overwhelming
- **Educational content**: Be thorough yet scannable with step-by-step guidance

### 🖊️ UI Copy Standards

- **ALWAYS** follow ADS content standards for consistent messaging
- **Tone**: Direct, concise, no unnecessary words or filler
- **Active voice**: Use active voice, not passive
- **Language**: **CRITICAL** - Use contractions ("can't", "don't", "you'll", "won't") - prefer
  contractions over full forms ("you will" → "you'll", "cannot" → "can't")
- **Language**: **CRITICAL** - Use US English spelling and conventions (e.g., "color" not "colour",
  "organize" not "organise")
- **Vocabulary**: Use "app" (not "add-on"/"plugin"), "sign in" in UI where possible (but "log in"
  may still appear in technical contexts), "menu" (not "dropdown"), "checkbox" (one word),
  "allowlist"/"blocklist" (not "whitelist"/"blacklist"), "canceled"/"canceling" (US spelling),
  "real-time" (hyphenated), "upgrade" (tiers/versions) vs "update" (minor changes), "work item" (not
  "issue" in Jira)
- **Inclusive language**: Use gender-neutral and inclusive language
- **Second person**: Use "your", "you" consistently
- **Messages**: Be specific and action-oriented ("Create project" vs "Create")
- **Message types**: Success (brief/celebratory), Error (solution-focused), Warning (explain
  consequences), Info (helpful context), Empty states (motivate action)
- **Accessibility**: Provide accessible labels, never rely on placeholder text for critical info,
  ensure screen reader context, never use "Learn more" as link text (always use descriptive,
  action-oriented text)

#### 📅 Formatting Standards

- **Capitalization**: **CRITICAL** - **ALWAYS** use sentence case for ALL UI text (headings, labels,
  buttons, settings)
  - "Project settings" NOT "Project Settings"
  - "Email notifications" NOT "Email Notifications"
  - "Privacy and security" NOT "Privacy and Security"
  - "Desktop notifications" NOT "Desktop Notifications"
  - "Weekly digest" NOT "Weekly Digest"
  - Applies to: headings, form labels, radio buttons, checkboxes, settings labels, section titles
  - Capitalize: first word, proper nouns, product names
  - Keep everything else lowercase
  - Don't use periods at the end (unless in a complete sentence)
  - **After colons**: Capitalize first word after colon if it starts a complete sentence; lowercase
    if it continues the sentence
- **Buttons**: Sentence case with verb + noun pattern - "Save changes", "Delete project", "Send
  message" (NOT "Message" or "Send")
- **Numbers and numerals**: **CRITICAL** - Use numerals for dates, times, measurements, percentages,
  quantities, and statistics ("3 projects", "25% complete", "2 hours ago"). Use commas for thousands
  ("1,000 items"). Spell out one through nine only at start of sentences ("Five projects" NOT "5
  projects"). Exception: Use words instead of numerals when they create better rhetorical effect or
  tone (e.g., "a thousand thanks", "three cheers", "countless possibilities")
- **Dates**: "January 8, 2020" (medium), "Jan 8, 2020" (short)
- **Time**: "3:30 p.m." (omit :00 for exact hours)
- **Lists**:
  - **Bulleted lists**: Start with lowercase if completing intro sentence, skip periods for
    fragments, max 6 items
  - **Numbered lists**: Capitalize first word, end with periods, don't create lists for 2 or fewer
    steps
  - **Parallel structure**: All list items must follow the same grammatical pattern
- **Serial comma**: Always use comma before "and" in series of three or more items (e.g., "dates,
  times, measurements, percentages, and statistics")
- **Em dashes**: Use sparingly, always include spaces before and after (e.g., "This feature — when
  enabled — will improve performance")

---

_Remember: The goal is consistent, accessible, and maintainable Atlassian experiences. ADS provides
this foundation._

- [Design System Documentation](https://atlassian.design/)
- [Component Library](https://atlassian.design/components)
- [Design Tokens](https://atlassian.design/foundations/design-tokens)
- [Accessibility Guidelines](https://atlassian.design/foundations/accessibility)
- [Content Standards](https://atlassian.design/foundations/content)
