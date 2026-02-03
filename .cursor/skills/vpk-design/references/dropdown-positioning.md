# ADS DropdownMenu Parent-Relative Positioning

By default, ADS DropdownMenu renders via a portal to `document.body`, which breaks positioning relative to a parent container. This pattern enables dropdown menus to be positioned relative to their parent element.

## When to Use

- Dropdowns that need to appear above/below their trigger within a specific container
- Menus in toolbars, action bars, or floating UI elements
- Any dropdown where portal-based positioning causes incorrect placement

## Pattern

```tsx
import { useId } from "react";
import DropdownMenu, { DropdownItemGroup, DropdownItem } from "@atlaskit/dropdown-menu";

function MyDropdown() {
	const menuId = useId();

	return (
		<div
			id={menuId}
			style={{
				position: "relative",
				overflow: "visible",
			}}
		>
			{/* Hidden trigger - DropdownMenu requires a trigger but we use IconButton */}
			<div style={{ display: "none" }}>
				<DropdownMenu
					trigger="Menu"
					isOpen={isOpen}
					onOpenChange={({ isOpen }) => setIsOpen(isOpen)}
					shouldRenderToParent
				>
					<DropdownItemGroup>
						<DropdownItem>Option 1</DropdownItem>
						<DropdownItem>Option 2</DropdownItem>
					</DropdownItemGroup>
				</DropdownMenu>
			</div>

			{/* Visible trigger button */}
			<IconButton
				icon={MenuIcon}
				label="Menu"
				onClick={() => setIsOpen(!isOpen)}
			/>

			{/* CSS override for portal positioning */}
			<style>{`
				[id="${menuId}"] [data-ds--level="1"] {
					position: absolute !important;
					left: 0 !important;
					bottom: calc(100% + 4px) !important;
					top: auto !important;
					min-width: max-content;
					margin: 0 !important;
					transform: none !important;
				}
			`}</style>
		</div>
	);
}
```

## Key Elements

| Element | Purpose |
|---------|---------|
| `useId()` | Generates unique ID for CSS scoping |
| `shouldRenderToParent` | Renders dropdown inside parent instead of portal |
| `position: relative` on wrapper | Establishes positioning context |
| `overflow: visible` | Allows dropdown to extend beyond container |
| `[data-ds--level="1"]` selector | Targets the ADS dropdown layer element |

## Alignment Options

### Horizontal Alignment

```css
/* Left-aligned (dropdown aligns to left edge of trigger) */
left: 0 !important;
right: auto !important;

/* Right-aligned (dropdown aligns to right edge of trigger) */
right: 0 !important;
left: auto !important;
```

### Vertical Direction

```css
/* Opens upward (above trigger) */
bottom: calc(100% + 4px) !important;
top: auto !important;

/* Opens downward (below trigger) */
top: calc(100% + 4px) !important;
bottom: auto !important;
```

## Example Implementation

See `components/blocks/chat-composer/components/composer-actions.tsx` for a working example with multiple dropdowns using this pattern.
