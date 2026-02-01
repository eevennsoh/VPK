# ADS Design Verification Guide

> Comprehensive guide for verifying existing UI code follows Atlassian Design System patterns.

## Overview

Use this guide when asked to verify, audit, or check UI code for ADS compliance. The verification process analyzes code against four categories: token compliance, component usage, accessibility, and content standards.

---

## Verification Methods

### 1. Automated Code Analysis

Use `ads_analyze_a11y` MCP tool for accessibility analysis:

```typescript
await ads_analyze_a11y({
	code: componentCode,
	componentName: "ComponentName",
	includePatternAnalysis: true,
});
```

This tool:
- Analyzes React code with axe-core rules
- Provides ADS-specific suggestions
- Includes pattern-based analysis for common issues

### 2. Token Compliance Scan

Search for these anti-patterns in the code:

| Anti-pattern | Correct Pattern | Regex to Find |
|--------------|-----------------|---------------|
| `#1868DB`, `#fff`, etc. | `token("color.*")` | `#[0-9a-fA-F]{3,6}` |
| `rgb(...)`, `rgba(...)` | `token("color.*")` | `rgba?\([^)]+\)` |
| `16px`, `24px`, etc. | `token("space.*")` | `\d+px` (in style values) |
| `1rem`, `2rem`, etc. | `token("space.*")` | `\d+rem` |
| Named colors | `token("color.*")` | `color:\s*(red\|blue\|...)` |

### 3. Component Verification

Check for native HTML elements that should be ADS components:

| Native HTML | ADS Component | Import |
|-------------|---------------|--------|
| `<button>` | `Button` | `@atlaskit/button/new` |
| `<input type="text">` | `TextField` | `@atlaskit/textfield` |
| `<input type="checkbox">` | `Checkbox` | `@atlaskit/checkbox` |
| `<textarea>` | `TextArea` | `@atlaskit/textarea` |
| `<select>` | `Select` | `@atlaskit/select` |
| `<h1>`-`<h6>` | `Heading` | `@atlaskit/heading` |
| `<p>`, `<span>` for text | `Text` | `@atlaskit/primitives` |
| `<div>` for layout | `Box`, `Stack`, `Inline`, `Flex` | `@atlaskit/primitives` |

### 4. Visual Verification

Use `/agent-browser` to:
- Compare against Figma designs
- Test light/dark mode rendering
- Verify responsive behavior

```
/agent-browser
"Take screenshots of http://localhost:<port>/path in both light and dark mode"
```

---

## Verification Workflow

### Single Component Verification

1. **Read the target code**
   ```
   Read: /path/to/component.tsx
   ```

2. **Token compliance scan**
   - Search for hardcoded hex colors: `#[0-9a-fA-F]{3,6}`
   - Search for pixel values in styles: `\d+px`
   - Search for named colors in style props

3. **Component usage check**
   - Search for native HTML elements: `<button`, `<input`, `<h[1-6]>`, `<p>`, `<span>`
   - Verify ADS primitives are used for layout

4. **Accessibility analysis**
   - Run `ads_analyze_a11y` on the code
   - Check all icons have `label` prop
   - Check form inputs have labels

5. **Content standards review**
   - Check headings for sentence case
   - Check button labels for verb + noun pattern
   - Verify US English spelling

6. **Generate report**
   - Use the verification report format below

### Directory Verification

1. **Discover files**
   ```
   Glob: components/blocks/[feature]/**/*.tsx
   ```

2. **Batch analysis**
   - Run single component checks on each file
   - Track issues by file

3. **Aggregate and prioritize**
   - Group issues by severity
   - Identify patterns across files

4. **Generate summary**
   - Overall compliance score
   - File-by-file breakdown
   - Common patterns to fix

---

## Verification Checklists

### Token Compliance Checklist

- [ ] **Colors** - No hex values (`#fff`, `#1868DB`)
- [ ] **Colors** - No rgb/rgba values (`rgb(0, 0, 0)`)
- [ ] **Colors** - No named colors (`red`, `blue`, `white`)
- [ ] **Spacing** - No pixel values for padding/margin/gap (`16px`)
- [ ] **Spacing** - No rem values (`1rem`, `2rem`)
- [ ] **Typography** - No raw font-size values
- [ ] **Typography** - No raw font-weight values
- [ ] **Borders** - No raw border-radius values
- [ ] **Shadows** - No raw box-shadow values

**Correct patterns:**
```tsx
// Colors
color: token("color.text")
backgroundColor: token("elevation.surface.raised")

// Spacing
padding: token("space.200")
gap: token("space.100")

// Typography
font: token("font.body")
<Text size="medium">...</Text>
<Heading size="large">...</Heading>

// Borders
borderRadius: token("radius.medium")

// Shadows
boxShadow: token("elevation.shadow.raised")
```

### Component Usage Checklist

- [ ] **Buttons** - Using `Button` from `@atlaskit/button/new`
- [ ] **Icon buttons** - Using `IconButton` from `@atlaskit/button/new`
- [ ] **Text inputs** - Using `TextField` from `@atlaskit/textfield`
- [ ] **Text areas** - Using `TextArea` from `@atlaskit/textarea`
- [ ] **Checkboxes** - Using `Checkbox` from `@atlaskit/checkbox`
- [ ] **Radio buttons** - Using `Radio` from `@atlaskit/radio`
- [ ] **Selects** - Using `Select` from `@atlaskit/select`
- [ ] **Toggles** - Using `Toggle` from `@atlaskit/toggle`
- [ ] **Headings** - Using `Heading` from `@atlaskit/heading`
- [ ] **Text** - Using `Text` from `@atlaskit/primitives`
- [ ] **Layout** - Using `Box`, `Stack`, `Inline`, `Flex`, `Grid` from `@atlaskit/primitives`

### Accessibility Checklist

- [ ] **Icons** - All icons have meaningful `label` prop
- [ ] **Form inputs** - All inputs have associated `<Label>` or `aria-label`
- [ ] **Buttons** - All buttons have accessible names
- [ ] **Links** - Link text is descriptive (not "click here" or "learn more")
- [ ] **Images** - All images have `alt` text
- [ ] **Color contrast** - Using token pairs that ensure WCAG compliance
- [ ] **Focus states** - Interactive elements have visible focus indicators
- [ ] **Keyboard access** - All interactive elements are keyboard accessible

### Content Standards Checklist

- [ ] **Sentence case** - All UI text uses sentence case (not Title Case)
- [ ] **Contractions** - Using contractions where natural ("can't", "don't")
- [ ] **US English** - Using US spelling ("color" not "colour")
- [ ] **Active voice** - Using active voice over passive
- [ ] **Button labels** - Using verb + noun pattern ("Save changes", "Delete project")
- [ ] **Vocabulary** - Using correct terms:
  - "app" (not "add-on" or "plugin")
  - "sign in" (not "log in" in UI)
  - "menu" (not "dropdown")
  - "allowlist/blocklist" (not "whitelist/blacklist")

---

## Verification Report Format

Use this format when reporting verification results:

```markdown
## ADS Compliance Report: [ComponentName or Path]

**File(s):** `path/to/component.tsx`
**Date:** YYYY-MM-DD

---

### Token Compliance: ✓ PASS / ✗ FAIL

**Issues found:**
- Line 42: Hardcoded color `#1868DB` → use `token("color.link")`
- Line 67: Hardcoded spacing `16px` → use `token("space.200")`

**Status:** X issues found

---

### Component Usage: ✓ PASS / ✗ FAIL

**Issues found:**
- Line 23: Native `<button>` → use `Button` from `@atlaskit/button/new`
- Line 45: Native `<h2>` → use `Heading` from `@atlaskit/heading`

**Status:** X issues found

---

### Accessibility: ✓ PASS / ✗ FAIL

**Issues found:**
- Line 78: Icon missing `label` prop
- Line 92: Form input missing associated label

**Status:** X issues found

---

### Content Standards: ✓ PASS / ✗ FAIL

**Issues found:**
- Line 34: "Save Changes" should be "Save changes" (sentence case)
- Line 56: "Log In" should be "Sign in"

**Status:** X issues found

---

### Summary

| Category | Status | Issues |
|----------|--------|--------|
| Token Compliance | ✓/✗ | X |
| Component Usage | ✓/✗ | X |
| Accessibility | ✓/✗ | X |
| Content Standards | ✓/✗ | X |

**Overall:** X of 4 checks passed

### Priority Fixes

1. [Most critical issue with fix]
2. [Second priority issue with fix]
3. [Third priority issue with fix]
```

---

## Directory Report Format

For multi-file audits:

```markdown
## ADS Compliance Audit: [Directory Path]

**Scope:** X files analyzed
**Date:** YYYY-MM-DD

---

### Overall Summary

| Category | Pass Rate | Total Issues |
|----------|-----------|--------------|
| Token Compliance | X/Y files | Z issues |
| Component Usage | X/Y files | Z issues |
| Accessibility | X/Y files | Z issues |
| Content Standards | X/Y files | Z issues |

**Overall Score:** X% compliant

---

### Files with Issues

#### `component-a.tsx` (3 issues)
- Token: Hardcoded color on line 42
- Accessibility: Missing icon label on line 78
- Content: Title case on line 34

#### `component-b.tsx` (1 issue)
- Component: Native button on line 23

#### `component-c.tsx` ✓
- All checks passed

---

### Common Patterns to Fix

1. **Hardcoded colors** - Found in X files
   - Pattern: `#1868DB` used for links
   - Fix: Replace with `token("color.link")`

2. **Native HTML elements** - Found in X files
   - Pattern: `<button>` used instead of ADS Button
   - Fix: Import and use `Button` from `@atlaskit/button/new`

---

### Recommended Actions

1. [Bulk fix recommendation]
2. [Pattern-based fix recommendation]
3. [Tooling recommendation if applicable]
```

---

## Quick Reference

### Common Token Replacements

| Hardcoded Value | ADS Token |
|-----------------|-----------|
| `#1868DB` (Atlassian blue) | `token("color.link")` |
| `#172B4D` (dark text) | `token("color.text")` |
| `#6B778C` (subtle text) | `token("color.text.subtle")` |
| `#FFFFFF` (white bg) | `token("elevation.surface")` |
| `#F4F5F7` (gray bg) | `token("color.background.neutral")` |
| `16px` padding | `token("space.200")` |
| `8px` padding | `token("space.100")` |
| `4px` padding | `token("space.050")` |
| `24px` padding | `token("space.300")` |
| `4px` border-radius | `token("radius.small")` |
| `8px` border-radius | `token("radius.large")` |

### Common Component Replacements

```tsx
// Before → After

// Buttons
<button onClick={...}>Save</button>
→ <Button onClick={...}>Save</Button>

// Inputs
<input type="text" value={...} />
→ <TextField value={...} />

// Headings
<h2>Section title</h2>
→ <Heading size="medium">Section title</Heading>

// Text
<p>Body text</p>
→ <Text>Body text</Text>

// Layout
<div style={{ display: 'flex', gap: '16px' }}>
→ <Flex gap="space.200">
```
