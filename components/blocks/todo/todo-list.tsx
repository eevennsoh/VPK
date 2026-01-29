"use client";

import { useMemo } from "react";
import { Stack, Inline, Box, Text } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import { token } from "@atlaskit/tokens";
import { useTodo } from "@/app/contexts/context-todo";
import { TodoItem } from "./todo-item";
import { AddTodo } from "./add-todo";
import { useTodoFilters, TodoFilters, ClearCompletedButton } from "./todo-filters";

export function TodoList() {
	const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();
	const {
		filters,
		setFilter,
		sortBy,
		setSortBy,
		sortDirection,
		toggleSortDirection,
		filterTodos,
		sortTodos,
	} = useTodoFilters();

	// Apply filters and sorting to todos
	const displayedTodos = useMemo(() => {
		const filtered = filterTodos(todos);
		return sortTodos(filtered);
	}, [todos, filterTodos, sortTodos]);

	// Count active (incomplete) items
	const activeCount = useMemo(
		() => todos.filter((todo) => !todo.completed).length,
		[todos]
	);

	return (
		<Box
			padding="space.400"
			style={{
				maxWidth: "600px",
				margin: "0 auto",
			}}
		>
			<Stack space="space.300">
				<Heading size="large">Todo list</Heading>
				<AddTodo onAdd={addTodo} />

				{/* Filters toolbar */}
				<TodoFilters
					filters={filters}
					setFilter={setFilter}
					sortBy={sortBy}
					setSortBy={setSortBy}
					sortDirection={sortDirection}
					toggleSortDirection={toggleSortDirection}
				/>

				{/* Todo items */}
				<Stack space="space.100">
					{displayedTodos.length === 0 ? (
						<Box
							padding="space.300"
							style={{
								textAlign: "center",
								borderRadius: token("radius.medium"),
								border: `1px dashed ${token("color.border")}`,
							}}
						>
							<Text color="color.text.subtlest">
								{todos.length === 0
									? "No todos yet. Add one above!"
									: "No todos match the current filters."}
							</Text>
						</Box>
					) : (
						displayedTodos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								onToggle={toggleTodo}
								onDelete={deleteTodo}
							/>
						))
					)}
				</Stack>

				{/* Footer with item count and clear completed button */}
				<Inline spread="space-between" alignBlock="center">
					<Text size="small" color="color.text.subtle">
						{activeCount} {activeCount === 1 ? "item" : "items"} left
					</Text>
					<ClearCompletedButton />
				</Inline>
			</Stack>
		</Box>
	);
}
