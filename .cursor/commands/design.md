# Design - Create Design System Compliant Components

## Quick Workflow

```
1. Detect context (component name, section, type, Figma link)
2. Call ADS MCP for tokens, icons, components
3. Generate component with proper organization
4. Validate quality & accessibility
```

## Essential Workflow

### Step 1: Smart Context Detection

**I will automatically infer from your request:**

- **Component name & type** from natural language
  - "create a search modal" → `SearchModal.tsx`, type: modal
  - "I need a work item card" → `WorkItemCard.tsx`, type: card
  
- **Section/folder** from keywords or active file
  - "for Jira" → `app/components/jira/`
  - "Confluence editor" → `app/components/confluence/`
  - Active file in `search/` → use `search/` folder
  
- **Figma links** auto-detected and processed
  - Any `https://figma.com/...` URL triggers Figma MCP
  
- **Design images** recognized for visual analysis

**No parameters required - just describe what you need naturally!**

### Step 2: Mandatory ADS MCP Integration

**Before writing any code, I will ALWAYS:**

```typescript
// Search for what we need
await mcp_ads_ads_plan({
  tokens: ["background", "text", "spacing", "border radius"],
  icons: ["close", "search", "edit"],
  components: ["button", "modal", "input"],
  limit: 3
});
```

**This is non-negotiable to:**
- Find correct icon packages (@atlaskit/icon vs @atlaskit/icon-lab)
- Discover appropriate ADS components
- Identify semantic design tokens

### Step 3: Generate Component

**With proper structure:**
```tsx
import { css } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';
// ADS components (from MCP)
import Button from '@atlaskit/button/new';
// Icons (verified via MCP)
import CloseIcon from '@atlaskit/icon/core/close';

const styles = css({
  container: {
    backgroundColor: token('elevation.surface'),
    padding: token('space.200'),
    borderRadius: token('border.radius.100'),
  },
});

interface ComponentProps {
  /** Description */
  onClose?: () => void;
}

export function ComponentName({ onClose }: ComponentProps) {
  return (
    <div css={styles.container}>
      {/* Accessible markup */}
    </div>
  );
}
```

### Step 4: Quality Validation

**Every component must have:**
- ✅ All colors use `token('color.*')`
- ✅ All spacing uses `token('space.*')`
- ✅ Icons verified via ADS MCP
- ✅ ADS components from `@atlaskit/*`
- ✅ Accessibility (ARIA, keyboard, focus)
- ✅ TypeScript types & JSDoc
- ✅ Proper file location

## File Organization

**Auto-determined based on context:**

```
app/components/
├── confluence/     # Confluence features (editor, pages)
├── jira/          # Jira features (work items, boards)
├── rovo/          # Rovo chat & AI
├── search/        # Search functionality
└── [shared]/      # Shared components
```

**Sub-folders for complex features:**
```
app/components/search/
├── SearchBar.tsx
├── SearchResults.tsx
└── filters/
    ├── FilterPanel.tsx
    └── FilterButton.tsx
```

## Natural Language Examples

**Just describe what you need:**

```
✅ "create a modal to edit work items"
   → JiraWorkItemEditModal.tsx in app/components/jira/

✅ "I need a floating menu for the confluence editor"
   → FloatingEditorMenu.tsx in app/components/confluence/

✅ "build a search results card with filters"
   → SearchResultsCard.tsx in app/components/search/

✅ "add a user profile dropdown to the top nav"
   → UserProfileDropdown.tsx in app/components/
```

## Design Matching (Figma/Images)

**When you provide a Figma link or design image:**

1. **Extract specifications:**
   - Colors → `color.*` tokens
   - Spacing → `space.*` tokens
   - Typography → `font.*` tokens
   - Borders → `border.radius.*` tokens

2. **Identify components:**
   - Match UI patterns to ADS components
   - Use MCP to find exact imports

3. **Implement pixel-perfect:**
   - Use exact measurements from design
   - Map all values to design tokens
   - Maintain accessibility

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| **Icon not found** | Use ADS MCP to search - it's in @atlaskit/icon OR @atlaskit/icon-lab |
| **Component too custom** | Build with primitives (Box, Stack) + tokens |
| **Color doesn't match** | Find closest semantic token, note if custom needed |
| **Spacing feels off** | Use t-shirt sizing: space.100 (8px), .200 (16px), .300 (24px) |
| **Dark mode broken** | Used hardcoded colors - replace with tokens |

## Command Checklist

When I receive `/design`, I will:

- [ ] Parse natural language for component name, type, section
- [ ] Check for Figma links → call Figma MCP
- [ ] Check for design images → analyze visually
- [ ] Call ADS MCP for tokens, icons, components
- [ ] Determine correct folder from context
- [ ] Generate component with design tokens
- [ ] Include accessibility features
- [ ] Add TypeScript types & JSDoc
- [ ] Suggest running accessibility analysis

## Quality Standards

**Never use hardcoded values:**

❌ **WRONG:**
```tsx
backgroundColor: '#FFFFFF',
padding: '16px',
color: '#172B4D',
```

✅ **CORRECT:**
```tsx
backgroundColor: token('elevation.surface'),
padding: token('space.200'),
color: token('color.text'),
```

**Always verify icon imports:**
```typescript
// MUST use MCP to find correct package
await mcp_ads_ads_plan({ icons: ["close"], tokens: [], components: [] });

// Then use exact path returned
import CloseIcon from '@atlaskit/icon/core/close';
```

**Accessibility is mandatory:**
- Semantic HTML elements
- ARIA labels for all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators using `color.border.focused`
- Screen reader support

## After Generation

**I will suggest:**

```typescript
// Optional: Validate accessibility
await mcp_ads_ads_analyze_a11y({
  code: generatedCode,
  componentName: "ComponentName",
  includePatternAnalysis: true
});
```

## Need More Details?

- **📖 Full Design System:** [AtlassianDesignSystem.md](../.codelassian/rules/AtlassianDesignSystem.md)
- **🎨 Design Tokens:** Complete token reference in ADS docs
- **♿ Accessibility:** Run `mcp_ads_ads_get_a11y_guidelines` for specific topics
- **🔍 Icon Search:** Use `mcp_ads_ads_plan` to find any icon

## Next Steps

After creating component:
- Use `/run` to test locally
- Use `/commit` to save changes
- Consider accessibility analysis
- Deploy with `/deploy` when ready
