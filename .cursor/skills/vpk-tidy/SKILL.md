---
name: vpk-tidy
description: >-
  This skill should be used when the user asks to "tidy up a component", "refactor component",
  "clean up React code", "make component reusable", "extract components", "modularize code",
  "simplify code", "improve code clarity", "refine code", "reduce complexity",
  or wants to improve component organization, reusability, and maintainability.
argument-hint: "<component-path>"
---

# React Component Tidy

> Refactor React components for reusability, modularity, and maintainability while leveraging existing codebase patterns.

## Purpose

This skill helps tidy up React components by:

1. **Reusing existing components** - Check if functionality already exists in the codebase
2. **Extending when needed** - Modify existing components to support new use cases
3. **Extracting new primitives** - Break down code into modular, reusable pieces
4. **Following folder conventions** - Place components in the correct location

---

## Quick Start

```bash
/vpk-tidy <path>   # Refactor component with full cleanup
```

---

## Architectural Rules

These rules are **mandatory** for every refactored component:

### 1. Modular Components

Break designs into independent files. Avoid large, single-file outputs.

```
# Bad: One 500-line file
components/blocks/dashboard/page.tsx  (500 lines)

# Good: Modular structure
components/blocks/dashboard/
├── page.tsx                    (50 lines - composes sub-components)
├── components/
│   ├── dashboard-header.tsx    (80 lines)
│   ├── stats-grid.tsx          (60 lines)
│   ├── activity-feed.tsx       (90 lines)
│   └── quick-actions.tsx       (70 lines)
└── hooks/
    └── use-dashboard-data.ts   (40 lines)
```

**Rule:** Components exceeding 150 lines must be split.

### 2. Logic Isolation

Move event handlers and business logic into custom hooks.

```tsx
// Bad: Logic mixed with UI
function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const data = await fetch(`/api/search?q=${query}`);
      setResults(await data.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // ... 100 more lines of UI
}

// Good: Logic extracted to hook
// hooks/use-search.ts
function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (query) => {
    setLoading(true);
    try {
      const data = await fetch(`/api/search?q=${query}`);
      setResults(await data.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}

// Component is now pure UI
function SearchResults() {
  const { results, loading, error, search } = useSearch();
  // Clean UI code only
}
```

### 3. Data Decoupling

Move all static text, image URLs, and lists to separate data files.

```tsx
// Bad: Hardcoded data in component
function Navigation() {
  return (
    <nav>
      <NavItem href="/home" icon={HomeIcon} label="Home" />
      <NavItem href="/projects" icon={FolderIcon} label="Projects" />
      <NavItem href="/settings" icon={SettingsIcon} label="Settings" />
    </nav>
  );
}

// Good: Data extracted
// data/navigation.ts
export const NAV_ITEMS = [
  { href: '/home', icon: HomeIcon, label: 'Home' },
  { href: '/projects', icon: FolderIcon, label: 'Projects' },
  { href: '/settings', icon: SettingsIcon, label: 'Settings' },
] as const;

// Component uses data
import { NAV_ITEMS } from './data/navigation';

function Navigation() {
  return (
    <nav>
      {NAV_ITEMS.map(item => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
```

**Extract to data files:**
- Navigation items
- Menu options
- Feature lists
- Image URLs and assets
- Static content strings
- Configuration objects

### 4. Type Safety

Every component must define a TypeScript interface named `[ComponentName]Props` and use `Readonly<>` wrapper in the function parameter.

```tsx
// Required pattern for all components
interface ComponentNameProps {
  // Props definition
}

// Example
interface CardProps {
  title: string;
  description?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Card({
  title,
  description,
  variant = 'default',
  children,
  onClick,
}: Readonly<CardProps>) {
  // Implementation
}
```

**Type rules:**
- Define interface as `[ComponentName]Props`, use `Readonly<>` in function parameter
- Export props interface when component is exported
- Use discriminated unions for variant props
- Avoid `any` - use `unknown` with type guards if needed

---

## Code Simplification Rules

Apply these refinements to improve code clarity while preserving functionality:

### 1. Clarity Over Brevity

Prefer explicit, readable code over compact solutions. Avoid nested ternary operators.

```tsx
// Bad: Nested ternary
const status = isLoading ? 'loading' : isError ? 'error' : isSuccess ? 'success' : 'idle';

// Good: Explicit conditions
function getStatus() {
  if (isLoading) return 'loading';
  if (isError) return 'error';
  if (isSuccess) return 'success';
  return 'idle';
}
```

### 2. Reduce Unnecessary Complexity

Eliminate redundant nesting and simplify conditionals.

```tsx
// Bad: Deeply nested callbacks
useEffect(() => {
  fetchData().then(data => {
    processData(data).then(result => {
      saveResult(result).then(() => {
        notifyUser();
      });
    });
  });
}, []);

// Good: Flat async/await
useEffect(() => {
  async function loadAndProcess() {
    const data = await fetchData();
    const result = await processData(data);
    await saveResult(result);
    notifyUser();
  }
  loadAndProcess();
}, []);
```

### 3. Extract Complex Conditions

Move complex boolean expressions to named variables.

```tsx
// Bad: Inline complex condition
if (user && user.permissions && user.permissions.includes('admin') && !user.suspended) {
  showAdminPanel();
}

// Good: Named condition
const canAccessAdmin = user?.permissions?.includes('admin') && !user?.suspended;
if (canAccessAdmin) {
  showAdminPanel();
}
```

### 4. Project Standards

- Use `function` keyword over arrow functions for top-level functions
- Use explicit return type annotations for exported functions
- Follow proper import sorting (ES modules)
- Maintain consistent naming conventions

### 5. Preserve Helpful Abstractions

Don't remove abstractions that improve organization - only eliminate truly redundant ones.

**What to simplify:**
- Nested ternary operators → switch/if-else chains
- Deeply nested callbacks → named async functions
- Redundant wrappers → inline when clearer
- Inconsistent patterns → align with project standards

**What to preserve:**
- Helpful abstractions that improve organization
- Type safety (don't weaken types for brevity)
- Readable structure (don't over-compress)
- Useful comments that explain "why"

---

## Composition Patterns

### Avoid Boolean Prop Proliferation

Never accumulate boolean props. Use compound components, lifting state, or composing internals.

```tsx
// Bad: Boolean prop explosion
<Button
  isLoading
  isDisabled
  isCompact
  isFullWidth
  isPrimary
  hasIcon
  hasDropdown
/>

// Good: Compound components
<Button appearance="primary" size="compact" width="full">
  <Button.Icon><AddIcon /></Button.Icon>
  <Button.Label>Create</Button.Label>
  <Button.Dropdown>
    <DropdownItem>Option 1</DropdownItem>
  </Button.Dropdown>
</Button>
```

### Compound Component Pattern

Use when components have multiple related parts sharing implicit state.

```tsx
// Implementation
const TabsContext = createContext<TabsContextValue | null>(null);

function Tabs({ children, defaultValue }: Readonly<TabsProps>) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">First</Tabs.Tab>
    <Tabs.Tab value="tab2">Second</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs>
```

### Lift State Up

When multiple components need the same state, lift it to the nearest common ancestor.

```tsx
// Bad: Duplicated state
function FilterPanel() {
  const [filters, setFilters] = useState({});
  // ...
}

function ResultsList() {
  const [filters, setFilters] = useState({}); // Duplicated!
  // ...
}

// Good: Lifted state
function SearchPage() {
  const [filters, setFilters] = useState({});

  return (
    <>
      <FilterPanel filters={filters} onChange={setFilters} />
      <ResultsList filters={filters} />
    </>
  );
}
```

### Compose Internals

Build complex components by composing simpler internal components.

```tsx
// Internal components (not exported)
function CardHeader({ title, actions }: Readonly<CardHeaderProps>) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading size="small">{title}</Heading>
      {actions}
    </Flex>
  );
}

function CardBody({ children }: Readonly<CardBodyProps>) {
  return <Box paddingBlock="space.200">{children}</Box>;
}

function CardFooter({ children }: Readonly<CardFooterProps>) {
  return (
    <Inline space="space.100" alignInline="end">
      {children}
    </Inline>
  );
}

// Public API uses slots
interface CardProps {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ title, actions, children, footer }: Readonly<CardProps>) {
  return (
    <Box backgroundColor="elevation.surface.raised" padding="space.200">
      <CardHeader title={title} actions={actions} />
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Box>
  );
}
```

---

## Workflow

### Step 1: Analyze the Target Component

Read the component file to understand:

- What it renders and its responsibilities
- What sub-components or patterns it uses
- What could be extracted as reusable pieces
- What violates the architectural rules

### Step 2: Audit Existing Components

Before creating anything new, search for existing components.

**Search locations:**

```
components/
├── blocks/          # Feature-specific components
│   └── [feature]/
│       ├── page.tsx           # Main feature view
│       └── components/        # Feature-specific sub-components
├── ui/              # Shared UI primitives
└── utils/           # Utility components
```

### Step 3: Apply Architectural Rules

For the target component, ensure compliance with all four rules:

1. **Modular** - Split if >150 lines
2. **Logic isolated** - Extract hooks for business logic
3. **Data decoupled** - Move static data to data files
4. **Type safe** - Add `Readonly<ComponentNameProps>` interface

### Step 4: Apply Composition Patterns

Refactor the component structure:

1. Replace boolean props with variants or compound components
2. Lift shared state to common ancestors
3. Compose complex UIs from internal sub-components

### Step 5: Apply Simplification Rules

After structural refactoring, apply code clarity improvements:

1. Replace nested ternaries with if/else or switch
2. Flatten nested callbacks with async/await
3. Extract complex conditions to named variables
4. Align with project coding standards

---

## Component Placement Guidelines

| Location | When to Use | Examples |
|----------|-------------|----------|
| `components/ui/` | Used by 2+ features, no feature logic | `footer-disclaimer.tsx` |
| `components/blocks/[feature]/components/` | Feature-specific sub-components | `kanban-card.tsx` |
| `components/blocks/[feature]/hooks/` | Feature-specific logic hooks | `use-board-state.ts` |
| `components/blocks/[feature]/data/` | Feature-specific static data | `board-columns.ts` |
| `components/utils/` | Utility/wrapper components | `theme-wrapper.tsx` |

---

## Refactoring Checklist

### Architectural Rules

- [ ] Component is <150 lines (or split into sub-components)
- [ ] Business logic extracted to custom hooks
- [ ] Static data moved to data files
- [ ] Props interface defined as `ComponentNameProps`, used as `Readonly<ComponentNameProps>` in function

### Code Simplification

- [ ] No nested ternary operators
- [ ] No unnecessary nesting (max 3 levels)
- [ ] Complex conditions extracted to named variables
- [ ] Consistent function declaration style
- [ ] Helpful abstractions preserved
- [ ] Code is readable without being overly compact

### Composition Patterns

- [ ] No boolean prop proliferation (max 2-3 boolean props)
- [ ] Compound pattern used for related parts
- [ ] State lifted to appropriate level
- [ ] Complex UI composed from internal components

### Best Practices

- [ ] Each component has single responsibility
- [ ] No deeply nested JSX (>4 levels)
- [ ] Props have sensible defaults
- [ ] No prop drilling (use context for deep state)

---

## References

For detailed guidance, see:

- **`references/patterns.md`** - Advanced composition patterns with full examples
- **`/vpk-design`** - ADS components, tokens, and styling guidelines
