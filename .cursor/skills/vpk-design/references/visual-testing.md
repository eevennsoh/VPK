# Visual Testing with /agent-browser

Automated visual testing workflow for VPK components using the `/agent-browser` skill.

## Overview

The `/agent-browser` skill provides browser automation capabilities powered by Playwright. Instead of calling Playwright MCP tools directly, describe what you want to test in natural language.

## Prerequisites

1. **Dev server running** at `http://localhost:3000`
   ```bash
   pnpm run dev
   ```

2. **Browser skill available** — invoke with `/agent-browser`

---

## Core Workflow

Invoke the skill and describe your testing needs:

```
/agent-browser
"Navigate to http://localhost:3000/jira and take a screenshot"
```

The skill handles browser launch, navigation, waiting, and cleanup automatically.

---

## Route Mapping

| Block Location                  | Test URL                           |
| ------------------------------- | ---------------------------------- |
| `components/blocks/jira/`       | `http://localhost:3000/jira`       |
| `components/blocks/confluence/` | `http://localhost:3000/confluence` |
| `components/blocks/rovo/`       | `http://localhost:3000/rovo`       |
| `components/blocks/search/`     | `http://localhost:3000/search`     |
| `components/blocks/widget/`     | `http://localhost:3000/widgets`    |
| `components/blocks/chat/`       | `http://localhost:3000/chat`       |
| `components/blocks/sidebar/`    | `http://localhost:3000/jira` (visible in layout) |
| `components/blocks/navigation/` | `http://localhost:3000/jira` (visible in layout) |

---

## Theme Testing

VPK uses `ThemeWrapper` which persists theme to localStorage with key `ui-theme`.

### Example Prompts

**Light and dark mode screenshots:**

```
/agent-browser
"Take screenshots of http://localhost:3000/jira in both light and dark mode.
Set localStorage 'ui-theme' to 'light', take a screenshot, then set it to 'dark' and take another."
```

**Single theme test:**

```
/agent-browser
"Navigate to http://localhost:3000/confluence, set localStorage 'ui-theme' to 'dark',
reload the page, and take a screenshot."
```

---

## Figma Comparison Workflow

After implementing a Figma design, validate visually:

1. **Get Figma screenshot** using Figma MCP: `get_screenshot(fileKey=":fileKey", nodeId=":nodeId")`

2. **Capture implementation:**
   ```
   /agent-browser
   "Take a screenshot of http://localhost:3000/[route] in light mode"
   ```

3. **Compare side-by-side** — check for:
   - Layout alignment
   - Spacing consistency
   - Color accuracy
   - Typography matching
   - Icon placement

---

## Advanced Testing

### Responsive Testing

```
/agent-browser
"Test http://localhost:3000/jira at desktop (1440x900), tablet (768x1024),
and mobile (375x812) sizes. Take a screenshot at each size."
```

### Interactive Element Testing

```
/agent-browser
"Navigate to http://localhost:3000/jira, click the 'Create' button,
wait for the modal to appear, and take a screenshot."
```

### Form Interaction

```
/agent-browser
"Go to http://localhost:3000/search, type 'test query' in the search input,
press Enter, wait for results, and take a screenshot."
```

---

## Troubleshooting

### Dev Server Not Running

**Symptom:** Navigation fails or times out.

**Solution:** Start the dev server first:
```bash
pnpm run dev
```

### Theme Not Applied

**Symptom:** Screenshot shows wrong theme.

**Solution:** Ensure you reload the page after setting localStorage:
```
"Set localStorage 'ui-theme' to 'dark', then reload the page and take a screenshot"
```

### Screenshots Directory

Screenshots are typically saved to `./screenshots/`. Create this directory if needed:
```bash
mkdir -p screenshots
```

---

## Visual Test Checklist

Before completing visual testing:

- [ ] Light mode screenshot captured
- [ ] Dark mode screenshot captured
- [ ] Implementation matches Figma design (if applicable)
- [ ] All ADS tokens render correctly in both themes
- [ ] Interactive states work as expected
- [ ] No visual regressions from previous implementation
