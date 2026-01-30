# Advanced React Composition Patterns

> Detailed patterns for building flexible, maintainable React components.

## Table of Contents

1. [Boolean Prop Alternatives](#boolean-prop-alternatives)
2. [Compound Components](#compound-components)
3. [State Lifting Patterns](#state-lifting-patterns)
4. [Internal Composition](#internal-composition)
5. [Custom Hooks for Logic](#custom-hooks-for-logic)
6. [Controlled vs Uncontrolled](#controlled-vs-uncontrolled)
7. [Polymorphic Components](#polymorphic-components)
8. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## Boolean Prop Alternatives

Boolean props seem convenient but quickly become unmanageable. Here are better alternatives:

### Problem: Boolean Prop Explosion

```tsx
// Bad: Accumulating boolean props
<Card
  isElevated
  isBordered
  isClickable
  isSelected
  isCompact
  isLoading
  hasHeader
  hasFooter
/>
```

### Solution 1: Variant Props

Replace related booleans with a single discriminated union:

```tsx
// Good: Single variant prop
interface Readonly<CardProps> {
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'compact' | 'default' | 'large';
  state?: 'idle' | 'loading' | 'selected';
  children: React.ReactNode;
}

<Card variant="elevated" size="compact" state="loading">
  Content
</Card>
```

### Solution 2: Compound Components

Replace structural booleans with compositional children:

```tsx
// Instead of hasHeader, hasFooter, hasActions
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>
    <Card.Actions>
      <Button>Save</Button>
    </Card.Actions>
  </Card.Footer>
</Card>
```

### Solution 3: Slot Props

For simpler cases, use slot props instead of booleans:

```tsx
// Instead of hasHeader boolean
interface Readonly<CardProps> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

<Card
  header={<Heading>Title</Heading>}
  footer={<Text>Updated today</Text>}
  actions={<Button>Save</Button>}
>
  Content
</Card>
```

### Decision Tree: Which Boolean Alternative?

```
Is the boolean about appearance/state?
├─ Yes → Use variant prop with union type
└─ No, it's about structure/content
   ├─ Simple (1-2 slots) → Use slot props
   └─ Complex (3+ related parts) → Use compound components
```

---

## Compound Components

Use when a component has multiple related parts that share implicit state.

### Implementation Pattern

```tsx
// 1. Create shared context
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs');
  }
  return context;
}

// 2. Create parent component
interface Readonly<TabsProps> {
  defaultValue: string;
  children: React.ReactNode;
  onChange?: (value: string) => void;
}

function Tabs({ defaultValue, children, onChange }: Readonly<TabsProps>) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleChange = useCallback((value: string) => {
    setActiveTab(value);
    onChange?.(value);
  }, [onChange]);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleChange }}>
      {children}
    </TabsContext.Provider>
  );
}

// 3. Create child components
interface Readonly<TabProps> {
  value: string;
  children: React.ReactNode;
}

function Tab({ value, children }: Readonly<TabProps>) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <Pressable
      onClick={() => setActiveTab(value)}
      backgroundColor={isActive ? 'color.background.selected' : undefined}
    >
      {children}
    </Pressable>
  );
}

function TabPanel({ value, children }: Readonly<TabProps>) {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) return null;
  return <Box>{children}</Box>;
}

// 4. Attach to parent
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
Tabs.List = TabList;

// Usage
<Tabs defaultValue="details" onChange={handleTabChange}>
  <Tabs.List>
    <Tabs.Tab value="details">Details</Tabs.Tab>
    <Tabs.Tab value="activity">Activity</Tabs.Tab>
    <Tabs.Tab value="comments">Comments</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel value="details">
    <DetailsContent />
  </Tabs.Panel>
  <Tabs.Panel value="activity">
    <ActivityFeed />
  </Tabs.Panel>
  <Tabs.Panel value="comments">
    <CommentsList />
  </Tabs.Panel>
</Tabs>
```

### When to Use Compound Components

- Multiple related sub-components
- Implicit shared state between parts
- Flexible arrangement of children
- Complex component with many optional parts

---

## State Lifting Patterns

### Pattern 1: Lift to Common Ancestor

When siblings need the same state:

```tsx
// Before: Each component manages its own state
function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
}

function MainContent() {
  // Needs to know if sidebar is collapsed for layout
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Duplicated!
}

// After: Lift to parent
function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Flex>
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
      <MainContent sidebarCollapsed={sidebarCollapsed} />
    </Flex>
  );
}
```

### Pattern 2: Context for Deep State

When state is needed many levels deep:

```tsx
// Create context
interface Readonly<WorkItemModalContextValue> {
  isOpen: boolean;
  workItem: WorkItem | null;
  open: (item: WorkItem) => void;
  close: () => void;
}

const WorkItemModalContext = createContext<WorkItemModalContextValue | null>(null);

// Provider component
function WorkItemModalProvider({ children }: { children: React.ReactNode }) {
  const [workItem, setWorkItem] = useState<WorkItem | null>(null);

  const open = useCallback((item: WorkItem) => setWorkItem(item), []);
  const close = useCallback(() => setWorkItem(null), []);

  return (
    <WorkItemModalContext.Provider value={{ isOpen: !!workItem, workItem, open, close }}>
      {children}
      {workItem && <WorkItemModal item={workItem} onClose={close} />}
    </WorkItemModalContext.Provider>
  );
}

// Hook for consumers
function useWorkItemModal() {
  const context = useContext(WorkItemModalContext);
  if (!context) throw new Error('useWorkItemModal must be used within WorkItemModalProvider');
  return context;
}

// Usage anywhere in tree
function KanbanCard({ item }: Readonly<KanbanCardProps>) {
  const { open } = useWorkItemModal();

  return (
    <Pressable onClick={() => open(item)}>
      <Text>{item.title}</Text>
    </Pressable>
  );
}
```

### When to Lift State

| Situation | Action |
|-----------|--------|
| 2 siblings need same state | Lift to parent |
| 3+ levels of prop drilling | Use Context |
| Global app state | Use Context at app root |
| Server state | Use data fetching library (SWR, React Query) |

---

## Internal Composition

Build complex public APIs from simple internal components.

### Pattern: Private Sub-components

```tsx
// Internal components - not exported
function ModalHeader({ title, onClose }: Readonly<ModalHeaderProps>) {
  return (
    <Flex justifyContent="space-between" alignItems="center" padding="space.200">
      <Heading size="medium">{title}</Heading>
      <IconButton icon={CloseIcon} label="Close" onClick={onClose} appearance="subtle" />
    </Flex>
  );
}

function ModalBody({ children }: Readonly<ModalBodyProps>) {
  return (
    <Box padding="space.200" paddingBlockStart="space.0">
      {children}
    </Box>
  );
}

function ModalFooter({ children }: Readonly<ModalFooterProps>) {
  return (
    <Flex
      justifyContent="flex-end"
      gap="space.100"
      padding="space.200"
      borderTop={`1px solid ${token('color.border')}`}
    >
      {children}
    </Flex>
  );
}

// Public API - clean and simple
interface Readonly<ModalProps> {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export function Modal({
  title,
  isOpen,
  onClose,
  children,
  footer,
  size = 'medium'
}: Readonly<ModalProps>) {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer size={size} onClick={e => e.stopPropagation()}>
        <ModalHeader title={title} onClose={onClose} />
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </ModalBackdrop>
  );
}

// Usage
<Modal
  title="Confirm deletion"
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  footer={
    <>
      <Button appearance="subtle" onClick={() => setShowConfirm(false)}>Cancel</Button>
      <Button appearance="danger" onClick={handleDelete}>Delete</Button>
    </>
  }
>
  <Text>Are you sure you want to delete this item?</Text>
</Modal>
```

---

## Custom Hooks for Logic

### Pattern: Extract All Business Logic

```tsx
// hooks/use-search.ts
interface UseSearchOptions {
  initialQuery?: string;
  debounceMs?: number;
}

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
  search: () => void;
  clear: () => void;
}

function useSearch({ initialQuery = '', debounceMs = 300 }: UseSearchOptions = {}): UseSearchReturn {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debouncedQuery = useDebounce(query, debounceMs);

  const search = useCallback(async () => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setResults(data.results);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [debouncedQuery]);

  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  // Auto-search on query change
  useEffect(() => {
    search();
  }, [search]);

  return { query, setQuery, results, isLoading, error, search, clear };
}

// Component is now pure UI
function SearchPanel() {
  const { query, setQuery, results, isLoading, error, clear } = useSearch({ debounceMs: 500 });

  return (
    <Stack space="space.200">
      <TextField
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
        elemAfterInput={query && <IconButton icon={CloseIcon} label="Clear" onClick={clear} />}
      />

      {isLoading && <Spinner />}
      {error && <ErrorMessage message={error.message} />}
      {results.map(result => (
        <SearchResultCard key={result.id} result={result} />
      ))}
    </Stack>
  );
}
```

### What to Extract to Hooks

| Extract | Keep in Component |
|---------|-------------------|
| API calls | JSX rendering |
| State management | Event binding (`onClick`, etc.) |
| Side effects | Conditional rendering |
| Computed values | Styling decisions |
| Event handlers with logic | Simple pass-through handlers |

---

## Controlled vs Uncontrolled

Support both patterns for maximum flexibility.

```tsx
interface Readonly<ToggleProps> {
  // Controlled mode
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
  // Uncontrolled mode
  defaultChecked?: boolean;
  // Common props
  label: string;
  isDisabled?: boolean;
}

function Toggle({
  isChecked: controlledChecked,
  onChange,
  defaultChecked = false,
  label,
  isDisabled = false,
}: Readonly<ToggleProps>) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = () => {
    const newValue = !checked;

    if (!isControlled) {
      setInternalChecked(newValue);
    }

    onChange?.(newValue);
  };

  return (
    <Inline space="space.100" alignBlock="center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={isDisabled}
      />
      <Text>{label}</Text>
    </Inline>
  );
}

// Controlled usage - parent owns state
const [darkMode, setDarkMode] = useState(false);
<Toggle label="Dark mode" isChecked={darkMode} onChange={setDarkMode} />

// Uncontrolled usage - component owns state
<Toggle label="Remember me" defaultChecked onChange={console.log} />
```

---

## Polymorphic Components

Allow the rendered element to be customized for semantic HTML.

```tsx
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'children'>;

function Text<E extends React.ElementType = 'span'>({
  as,
  children,
  ...props
}: PolymorphicProps<E>) {
  const Component = as || 'span';
  return <Component {...props}>{children}</Component>;
}

// Usage
<Text>Default span</Text>
<Text as="p">Paragraph</Text>
<Text as="label" htmlFor="input">Label</Text>
<Text as={Link} href="/home">Next.js Link</Text>
```

---

## Anti-Patterns to Avoid

### 1. Prop Drilling

```tsx
// Bad
<App user={user}>
  <Layout user={user}>
    <Header user={user}>
      <UserMenu user={user} />

// Good: Use context
<UserProvider user={user}>
  <App>
    <Layout>
      <Header>
        <UserMenu /> {/* Gets user from context */}
```

### 2. Logic in JSX

```tsx
// Bad
{items
  .filter(i => i.active && i.date > startDate)
  .sort((a, b) => b.priority - a.priority)
  .slice(0, 10)
  .map(item => <Item key={item.id} {...item} />)}

// Good: Compute outside JSX
const displayItems = useMemo(() =>
  items
    .filter(i => i.active && i.date > startDate)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 10),
  [items, startDate]
);

{displayItems.map(item => <Item key={item.id} {...item} />)}
```

### 3. Inline Object/Array Props

```tsx
// Bad: Creates new reference every render
<Component style={{ padding: 16 }} items={[1, 2, 3]} />

// Good: Stable references
const style = useMemo(() => ({ padding: 16 }), []);
const items = useMemo(() => [1, 2, 3], []);
<Component style={style} items={items} />

// Or extract to module scope if truly static
const STYLE = { padding: 16 };
const ITEMS = [1, 2, 3];
```

### 4. God Components

```tsx
// Bad: One component doing everything
function Dashboard() {
  // 50 lines of state
  // 100 lines of effects
  // 200 lines of handlers
  // 500 lines of JSX
}

// Good: Composed from focused components
function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardStats />
      <DashboardActivityFeed />
      <DashboardQuickActions />
    </DashboardLayout>
  );
}
```
