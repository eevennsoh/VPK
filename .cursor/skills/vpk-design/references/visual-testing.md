# Visual Testing with Playwright MCP

Automated visual testing workflow for VPK components using the Playwright MCP browser tools.

## Prerequisites

1. **Dev server running** at `http://localhost:3000`
   ```bash
   pnpm run dev
   ```

2. **Playwright MCP server connected** — tools prefixed with `mcp__plugin_playwright_playwright__`

## Core Workflow

### 1. Open Page

```
browser_navigate(url="http://localhost:3000/jira")
```

Wait for the page to fully load:

```
browser_wait_for(state="networkidle")
```

### 2. Capture Screenshot

```
browser_take_screenshot(path="./screenshots/jira-light.png")
```

### 3. Close Browser

```
browser_close()
```

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

### Light Mode

```
browser_navigate(url="http://localhost:3000/jira")
browser_wait_for(state="networkidle")
browser_evaluate(expression="localStorage.setItem('ui-theme', 'light')")
browser_navigate(url="http://localhost:3000/jira")
browser_wait_for(state="networkidle")
browser_take_screenshot(path="./screenshots/jira-light.png")
```

### Dark Mode

```
browser_evaluate(expression="localStorage.setItem('ui-theme', 'dark')")
browser_navigate(url="http://localhost:3000/jira")
browser_wait_for(state="networkidle")
browser_take_screenshot(path="./screenshots/jira-dark.png")
```

### Complete Theme Test Sequence

```
# Open and set light mode
browser_navigate(url="http://localhost:3000/jira")
browser_wait_for(state="networkidle")
browser_evaluate(expression="localStorage.setItem('ui-theme', 'light')")
browser_navigate(url="http://localhost:3000/jira")
browser_wait_for(state="networkidle")
browser_take_screenshot(path="./screenshots/jira-light.png")

# Switch to dark mode
browser_evaluate(expression="localStorage.setItem('ui-theme', 'dark')")
browser_navigate(url="http://localhost:3000/jira")
browser_wait_for(state="networkidle")
browser_take_screenshot(path="./screenshots/jira-dark.png")

# Cleanup
browser_close()
```

---

## Figma Comparison Workflow

After implementing a Figma design, validate visually:

### 1. Get Figma Screenshot

```
get_screenshot(fileKey=":fileKey", nodeId=":nodeId")
```

### 2. Capture Implementation

```
browser_navigate(url="http://localhost:3000/[route]")
browser_wait_for(state="networkidle")
browser_take_screenshot(path="./screenshots/implementation.png")
```

### 3. Compare Side-by-Side

View both screenshots and check:

- Layout alignment
- Spacing consistency
- Color accuracy
- Typography matching
- Icon placement

---

## Advanced Patterns

### Capture Specific Element

```
browser_snapshot()  # Get page structure
browser_click(element="[data-testid='feature-card']")
browser_take_screenshot(path="./screenshots/feature-card.png")
```

### Capture After Interaction

```
browser_navigate(url="http://localhost:3000/jira")
browser_wait_for(state="networkidle")
browser_click(element="[data-testid='open-modal']")
browser_wait_for(state="networkidle")
browser_take_screenshot(path="./screenshots/modal-open.png")
```

### Responsive Testing

```
# Desktop
browser_resize(width=1440, height=900)
browser_take_screenshot(path="./screenshots/desktop.png")

# Tablet
browser_resize(width=768, height=1024)
browser_take_screenshot(path="./screenshots/tablet.png")

# Mobile
browser_resize(width=375, height=812)
browser_take_screenshot(path="./screenshots/mobile.png")
```

### Form Interaction

```
browser_fill_form(selector="#search-input", value="test query")
browser_press_key(key="Enter")
browser_wait_for(state="networkidle")
browser_take_screenshot(path="./screenshots/search-results.png")
```

---

## Troubleshooting

### Dev Server Not Running

**Symptom:** Navigation fails or times out.

**Solution:** Start the dev server first:
```bash
pnpm run dev
```

### Page Not Fully Loaded

**Symptom:** Screenshot shows loading state or incomplete UI.

**Solution:** Use appropriate wait strategy:
```
browser_wait_for(state="networkidle")
```

Or wait for specific elements:
```
browser_wait_for(selector="[data-testid='main-content']")
```

### Theme Not Applied

**Symptom:** Screenshot shows wrong theme after localStorage change.

**Solution:** Reload the page after setting localStorage:
```
browser_evaluate(expression="localStorage.setItem('ui-theme', 'dark')")
browser_navigate(url="http://localhost:3000/jira")
browser_wait_for(state="networkidle")
```

### Screenshots Directory

Screenshots are saved to `./screenshots/` by default. Create this directory if it doesn't exist:
```bash
mkdir -p screenshots
```

---

## Visual Test Checklist

Before completing visual testing:

- [ ] Light mode screenshot captured
- [ ] Dark mode screenshot captured
- [ ] Implementation matches Figma design
- [ ] All ADS tokens render correctly in both themes
- [ ] Interactive states work as expected
- [ ] No visual regressions from previous implementation

---

## Quick Reference

| Action | Command |
| ------ | ------- |
| Open page | `browser_navigate(url="...")` |
| Wait for load | `browser_wait_for(state="networkidle")` |
| Take screenshot | `browser_take_screenshot(path="...")` |
| Set light mode | `browser_evaluate(expression="localStorage.setItem('ui-theme', 'light')")` |
| Set dark mode | `browser_evaluate(expression="localStorage.setItem('ui-theme', 'dark')")` |
| Click element | `browser_click(element="...")` |
| Resize viewport | `browser_resize(width=..., height=...)` |
| Close browser | `browser_close()` |
