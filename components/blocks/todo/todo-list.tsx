"use client";

import { Stack, Box, Text } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import { token } from "@atlaskit/tokens";
import { useTodo } from "@/app/contexts/context-todo";
import { TodoItem } from "./todo-item";
import { AddTodo } from "./add-todo";

export function TodoList() {
	const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();

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
				<Stack space="space.100">
					{todos.length === 0 ? (
						<Box
							padding="space.300"
							style={{
								textAlign: "center",
								borderRadius: token("radius.medium"),
								border: `1px dashed ${token("color.border")}`,
							}}
						>
							<Text color="color.text.subtlest">
								No todos yet. Add one above!
							</Text>
						</Box>
					) : (
						todos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								onToggle={toggleTodo}
								onDelete={deleteTodo}
							/>
						))
					)}
				</Stack>
			</Stack>
		</Box>
	);
}
