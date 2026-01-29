"use client";

import { useState, useCallback, useMemo } from "react";
import { Inline, Box, Text } from "@atlaskit/primitives";
import Button, { IconButton } from "@atlaskit/button/new";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from "@atlaskit/dropdown-menu";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import ArrowDownIcon from "@atlaskit/icon/core/arrow-down";
import DeleteIcon from "@atlaskit/icon/core/delete";
import { token } from "@atlaskit/tokens";
import { useTodo, type Todo, type TodoPriority } from "@/app/contexts/context-todo";

export type StatusFilter = "all" | "active" | "completed";
export type PriorityFilter = "all" | "high" | "medium" | "low";
export type SortField = "createdAt" | "dueDate" | "priority" | "title";
export type SortDirection = "asc" | "desc";

interface TodoFiltersState {
	status: StatusFilter;
	priority: PriorityFilter;
	sortBy: SortField;
	sortDirection: SortDirection;
}

interface UseTodoFiltersReturn {
	filters: {
		status: StatusFilter;
		priority: PriorityFilter;
	};
	setFilter: <K extends "status" | "priority">(key: K, value: K extends "status" ? StatusFilter : PriorityFilter) => void;
	sortBy: SortField;
	setSortBy: (field: SortField) => void;
	sortDirection: SortDirection;
	toggleSortDirection: () => void;
	filterTodos: (todos: Todo[]) => Todo[];
	sortTodos: (todos: Todo[]) => Todo[];
}

function getPriorityOrder(priority: TodoPriority): number {
	switch (priority) {
		case "high":
			return 3;
		case "medium":
			return 2;
		case "low":
			return 1;
		default:
			return 0;
	}
}

export function useTodoFilters(): UseTodoFiltersReturn {
	const [state, setState] = useState<TodoFiltersState>({
		status: "all",
		priority: "all",
		sortBy: "createdAt",
		sortDirection: "desc",
	});

	const setFilter = useCallback(<K extends "status" | "priority">(
		key: K,
		value: K extends "status" ? StatusFilter : PriorityFilter
	) => {
		setState((prev) => ({ ...prev, [key]: value }));
	}, []);

	const setSortBy = useCallback((field: SortField) => {
		setState((prev) => ({ ...prev, sortBy: field }));
	}, []);

	const toggleSortDirection = useCallback(() => {
		setState((prev) => ({
			...prev,
			sortDirection: prev.sortDirection === "asc" ? "desc" : "asc",
		}));
	}, []);

	const filterTodos = useCallback(
		(todos: Todo[]): Todo[] => {
			return todos.filter((todo) => {
				// Status filter
				if (state.status === "active" && todo.completed) return false;
				if (state.status === "completed" && !todo.completed) return false;

				// Priority filter
				if (state.priority !== "all" && todo.priority !== state.priority) return false;

				return true;
			});
		},
		[state.status, state.priority]
	);

	const sortTodos = useCallback(
		(todos: Todo[]): Todo[] => {
			const sorted = [...todos].sort((a, b) => {
				let comparison = 0;

				switch (state.sortBy) {
					case "createdAt":
						comparison = a.createdAt - b.createdAt;
						break;
					case "dueDate":
						// Null due dates go to the end
						if (a.dueDate === null && b.dueDate === null) comparison = 0;
						else if (a.dueDate === null) comparison = 1;
						else if (b.dueDate === null) comparison = -1;
						else comparison = a.dueDate - b.dueDate;
						break;
					case "priority":
						comparison = getPriorityOrder(a.priority) - getPriorityOrder(b.priority);
						break;
					case "title":
						comparison = a.title.localeCompare(b.title);
						break;
				}

				return state.sortDirection === "asc" ? comparison : -comparison;
			});

			return sorted;
		},
		[state.sortBy, state.sortDirection]
	);

	return {
		filters: {
			status: state.status,
			priority: state.priority,
		},
		setFilter,
		sortBy: state.sortBy,
		setSortBy,
		sortDirection: state.sortDirection,
		toggleSortDirection,
		filterTodos,
		sortTodos,
	};
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "active", label: "Active" },
	{ value: "completed", label: "Completed" },
];

const PRIORITY_OPTIONS: { value: PriorityFilter; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "high", label: "High" },
	{ value: "medium", label: "Medium" },
	{ value: "low", label: "Low" },
];

const SORT_OPTIONS: { value: SortField; label: string }[] = [
	{ value: "createdAt", label: "Created date" },
	{ value: "dueDate", label: "Due date" },
	{ value: "priority", label: "Priority" },
	{ value: "title", label: "Alphabetical" },
];

function getSortDirectionLabel(sortBy: SortField, direction: SortDirection): string {
	switch (sortBy) {
		case "createdAt":
			return direction === "desc" ? "Newest first" : "Oldest first";
		case "dueDate":
			return direction === "asc" ? "Soonest first" : "Latest first";
		case "priority":
			return direction === "desc" ? "High to low" : "Low to high";
		case "title":
			return direction === "asc" ? "A to Z" : "Z to A";
	}
}

interface FilterButtonGroupProps {
	label: string;
	options: { value: string; label: string }[];
	value: string;
	onChange: (value: string) => void;
}

function FilterButtonGroup({ label, options, value, onChange }: FilterButtonGroupProps) {
	return (
		<Inline alignBlock="center" space="space.100">
			<span style={{ whiteSpace: "nowrap" }}>
				<Text size="small" color="color.text.subtle">
					{label}:
				</Text>
			</span>
			<Inline space="space.050">
				{options.map((option) => {
					const isSelected = value === option.value;

					return (
						<Button
							key={option.value}
							appearance={isSelected ? "default" : "subtle"}
							isSelected={isSelected}
							onClick={() => onChange(option.value)}
							spacing="compact"
						>
							{option.label}
						</Button>
					);
				})}
			</Inline>
		</Inline>
	);
}

interface TodoFiltersProps {
	filters: {
		status: StatusFilter;
		priority: PriorityFilter;
	};
	setFilter: <K extends "status" | "priority">(key: K, value: K extends "status" ? StatusFilter : PriorityFilter) => void;
	sortBy: SortField;
	setSortBy: (field: SortField) => void;
	sortDirection: SortDirection;
	toggleSortDirection: () => void;
}

export function TodoFilters({
	filters,
	setFilter,
	sortBy,
	setSortBy,
	sortDirection,
	toggleSortDirection,
}: TodoFiltersProps) {
	const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
	const currentSortOption = SORT_OPTIONS.find((opt) => opt.value === sortBy);

	return (
		<Box
			padding="space.150"
			backgroundColor="elevation.surface.sunken"
			style={{
				borderRadius: token("radius.medium"),
			}}
		>
			<Inline spread="space-between" alignBlock="center" rowSpace="space.100">
				<Inline space="space.300" alignBlock="center">
					<FilterButtonGroup
						label="Status"
						options={STATUS_OPTIONS}
						value={filters.status}
						onChange={(v) => setFilter("status", v as StatusFilter)}
					/>
					<FilterButtonGroup
						label="Priority"
						options={PRIORITY_OPTIONS}
						value={filters.priority}
						onChange={(v) => setFilter("priority", v as PriorityFilter)}
					/>
				</Inline>

				<Inline space="space.100" alignBlock="center">
					<span style={{ whiteSpace: "nowrap" }}>
						<Text size="small" color="color.text.subtle">
							Sort:
						</Text>
					</span>
					<DropdownMenu
						placement="bottom-end"
						isOpen={isSortMenuOpen}
						onOpenChange={({ isOpen }) => setIsSortMenuOpen(isOpen)}
						trigger={({ triggerRef, ...props }) => (
							<Button
								ref={triggerRef}
								{...props}
								appearance="subtle"
								spacing="compact"
								iconAfter={ChevronDownIcon}
							>
								{currentSortOption?.label}
							</Button>
						)}
					>
						<DropdownItemGroup>
							{SORT_OPTIONS.map((option) => (
								<DropdownItem
									key={option.value}
									isSelected={sortBy === option.value}
									onClick={() => {
										setSortBy(option.value);
										setIsSortMenuOpen(false);
									}}
								>
									{option.label}
								</DropdownItem>
							))}
						</DropdownItemGroup>
					</DropdownMenu>
					<IconButton
						icon={sortDirection === "asc" ? ArrowUpIcon : ArrowDownIcon}
						label={getSortDirectionLabel(sortBy, sortDirection)}
						appearance="subtle"
						spacing="compact"
						onClick={toggleSortDirection}
					/>
				</Inline>
			</Inline>
		</Box>
	);
}

export function ClearCompletedButton() {
	const { todos, clearCompleted } = useTodo();

	const completedCount = useMemo(
		() => todos.filter((todo) => todo.completed).length,
		[todos]
	);

	if (completedCount === 0) {
		return null;
	}

	return (
		<Button
			appearance="danger"
			spacing="compact"
			iconBefore={DeleteIcon}
			onClick={clearCompleted}
		>
			Clear completed ({completedCount})
		</Button>
	);
}
