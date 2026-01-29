"use client";

import { Checkbox } from "@atlaskit/checkbox";
import { Inline, Box, Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import CrossIcon from "@atlaskit/icon/core/cross";
import { token } from "@atlaskit/tokens";
import type { Todo } from "@/app/contexts/context-todo";

interface TodoItemProps {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
	return (
		<Box
			padding="space.100"
			backgroundColor="elevation.surface"
			style={{
				borderRadius: token("radius.medium"),
				border: `1px solid ${token("color.border")}`,
			}}
		>
			<Inline alignBlock="center" spread="space-between">
				<Inline alignBlock="center" space="space.100">
					<Checkbox
						isChecked={todo.completed}
						onChange={() => onToggle(todo.id)}
						label=""
					/>
					<Text
						as="span"
						style={{
							textDecoration: todo.completed ? "line-through" : "none",
							color: todo.completed
								? token("color.text.disabled")
								: token("color.text"),
						}}
					>
						{todo.title}
					</Text>
				</Inline>
				<Button
					appearance="subtle"
					iconBefore={CrossIcon}
					label="Delete todo"
					onClick={() => onDelete(todo.id)}
				/>
			</Inline>
		</Box>
	);
}
