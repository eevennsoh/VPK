"use client";

import Lozenge from "@atlaskit/lozenge";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from "@atlaskit/dropdown-menu";
import { IconButton } from "@atlaskit/button/new";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import type { TodoPriority } from "@/app/contexts/context-todo";

interface PriorityBadgeProps {
	priority: TodoPriority;
}

/**
 * Displays a colored badge for a todo priority level.
 * Returns null when priority is null.
 */
export function PriorityBadge({ priority }: PriorityBadgeProps) {
	if (priority === null) {
		return null;
	}

	const config = {
		high: { appearance: "removed" as const, label: "High" },
		medium: { appearance: "moved" as const, label: "Medium" },
		low: { appearance: "inprogress" as const, label: "Low" },
	};

	const { appearance, label } = config[priority];

	return <Lozenge appearance={appearance}>{label}</Lozenge>;
}

interface PrioritySelectorProps {
	priority: TodoPriority;
	onPriorityChange: (priority: TodoPriority) => void;
}

/**
 * Dropdown selector for choosing a todo priority level.
 * Displays the current priority as a badge in the trigger button.
 */
export function PrioritySelector({ priority, onPriorityChange }: PrioritySelectorProps) {
	const priorities: { value: TodoPriority; label: string }[] = [
		{ value: "high", label: "High" },
		{ value: "medium", label: "Medium" },
		{ value: "low", label: "Low" },
		{ value: null, label: "None" },
	];

	return (
		<DropdownMenu
			placement="bottom-start"
			shouldRenderToParent
			trigger={({ triggerRef, ...props }) => (
				<IconButton
					ref={triggerRef}
					{...props}
					icon={ChevronDownIcon}
					label="Set priority"
					appearance="subtle"
					spacing="compact"
				/>
			)}
		>
			<DropdownItemGroup>
				{priorities.map(({ value, label }) => (
					<DropdownItem
						key={label}
						onClick={() => onPriorityChange(value)}
						isSelected={priority === value}
						elemBefore={
							value !== null ? (
								<PriorityBadge priority={value} />
							) : null
						}
					>
						{value === null ? label : ""}
					</DropdownItem>
				))}
			</DropdownItemGroup>
		</DropdownMenu>
	);
}
