"use client";

import { useState } from "react";
import { Inline, Box } from "@atlaskit/primitives";
import Button, { IconButton } from "@atlaskit/button/new";
import { DatePicker } from "@atlaskit/datetime-picker";
import DropdownMenu from "@atlaskit/dropdown-menu";
import CalendarIcon from "@atlaskit/icon/core/calendar";
import CrossIcon from "@atlaskit/icon/core/cross";
import { token } from "@atlaskit/tokens";

interface DueDateDisplayProps {
	dueDate: number | null;
	onEdit?: () => void;
}

/**
 * Determines the visual status of a due date relative to today.
 */
function getDueDateStatus(timestamp: number): "overdue" | "today" | "future" {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const dueDate = new Date(timestamp);
	const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

	if (dueDateOnly < today) {
		return "overdue";
	} else if (dueDateOnly.getTime() === today.getTime()) {
		return "today";
	}
	return "future";
}

/**
 * Formats a timestamp to a locale-aware date string.
 */
function formatDate(timestamp: number): string {
	return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(timestamp));
}

/**
 * Displays the due date with visual indicators based on status.
 * Overdue: red/danger color
 * Due today: yellow/warning color
 * Future: subtle/neutral color
 * No date: shows a subtle "Add date" button
 */
export function DueDateDisplay({ dueDate, onEdit }: DueDateDisplayProps) {
	if (dueDate === null) {
		return (
			<IconButton
				icon={CalendarIcon}
				label="Add due date"
				appearance="subtle"
				spacing="compact"
				onClick={onEdit}
			/>
		);
	}

	const status = getDueDateStatus(dueDate);
	const formattedDate = formatDate(dueDate);

	const colorMap = {
		overdue: token("color.text.danger"),
		today: token("color.text.warning"),
		future: token("color.text.subtlest"),
	};

	const iconColorMap = {
		overdue: token("color.icon.danger"),
		today: token("color.icon.warning"),
		future: token("color.icon.subtle"),
	};

	return (
		<Box
			as="button"
			onClick={onEdit}
			padding="space.050"
			style={{
				background: "none",
				border: "none",
				cursor: "pointer",
				borderRadius: token("radius.small"),
			}}
		>
			<Inline alignBlock="center" space="space.050">
				<CalendarIcon
					label="Due date"
					color={iconColorMap[status]}
				/>
				<span
					style={{
						fontSize: "12px",
						color: colorMap[status],
					}}
				>
					{formattedDate}
				</span>
			</Inline>
		</Box>
	);
}

interface DueDatePickerProps {
	dueDate: number | null;
	onDueDateChange: (dueDate: number | null) => void;
}

/**
 * A compact date picker for setting or clearing a due date.
 * Uses @atlaskit/datetime-picker with a dropdown for inline use.
 */
export function DueDatePicker({ dueDate, onDueDateChange }: DueDatePickerProps) {
	const [isOpen, setIsOpen] = useState(false);

	// Convert timestamp to ISO date string (YYYY-MM-DD) for DatePicker
	const dateValue = dueDate ? new Date(dueDate).toISOString().split("T")[0] : "";

	const handleDateChange = (isoDate: string) => {
		if (isoDate) {
			// Parse ISO date and convert to timestamp at start of day
			const [year, month, day] = isoDate.split("-").map(Number);
			const date = new Date(year, month - 1, day);
			onDueDateChange(date.getTime());
		}
		setIsOpen(false);
	};

	const handleClear = () => {
		onDueDateChange(null);
		setIsOpen(false);
	};

	return (
		<DropdownMenu
			isOpen={isOpen}
			onOpenChange={({ isOpen }) => setIsOpen(isOpen)}
			placement="bottom-start"
			shouldRenderToParent
			trigger={({ triggerRef, ...props }) => (
				<Box ref={triggerRef} {...props}>
					<DueDateDisplay
						dueDate={dueDate}
						onEdit={() => setIsOpen(!isOpen)}
					/>
				</Box>
			)}
		>
			<Box padding="space.150" style={{ minWidth: "280px" }}>
				<DatePicker
					value={dateValue}
					onChange={handleDateChange}
					shouldShowCalendarButton={false}
					placeholder="Select a date"
				/>
				{dueDate !== null && (
					<Box paddingBlockStart="space.100">
						<Button
							appearance="subtle"
							iconBefore={CrossIcon}
							onClick={handleClear}
						>
							Clear date
						</Button>
					</Box>
				)}
			</Box>
		</DropdownMenu>
	);
}
