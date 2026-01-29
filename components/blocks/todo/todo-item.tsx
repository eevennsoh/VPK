"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { Checkbox } from "@atlaskit/checkbox";
import { Inline, Stack, Box, Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import Textfield from "@atlaskit/textfield";
import CrossIcon from "@atlaskit/icon/core/cross";
import { token } from "@atlaskit/tokens";
import type { Todo, TodoPriority } from "@/app/contexts/context-todo";
import { useTodo } from "@/app/contexts/context-todo";
import { PriorityBadge, PrioritySelector } from "@/components/blocks/todo/todo-priority";
import { DueDatePicker } from "@/components/blocks/todo/todo-due-date";
import { TodoDescription } from "@/components/blocks/todo/todo-description";

interface TodoItemProps {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
	const { updateTodo } = useTodo();
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(todo.title);
	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);

	const handleSave = useCallback(() => {
		const trimmedValue = editValue.trim();
		if (trimmedValue && trimmedValue !== todo.title) {
			updateTodo(todo.id, { title: trimmedValue });
		} else {
			setEditValue(todo.title);
		}
		setIsEditing(false);
	}, [editValue, todo.id, todo.title, updateTodo]);

	const handleCancel = useCallback(() => {
		setEditValue(todo.title);
		setIsEditing(false);
	}, [todo.title]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				event.preventDefault();
				handleSave();
			} else if (event.key === "Escape") {
				event.preventDefault();
				handleCancel();
			}
		},
		[handleSave, handleCancel]
	);

	const handleDoubleClick = useCallback(() => {
		if (!todo.completed) {
			setEditValue(todo.title);
			setIsEditing(true);
		}
	}, [todo.completed, todo.title]);

	const handlePriorityChange = useCallback(
		(priority: TodoPriority) => {
			updateTodo(todo.id, { priority });
		},
		[todo.id, updateTodo]
	);

	const handleDueDateChange = useCallback(
		(dueDate: number | null) => {
			updateTodo(todo.id, { dueDate });
		},
		[todo.id, updateTodo]
	);

	const handleToggleDescription = useCallback(() => {
		setIsDescriptionExpanded((prev) => !prev);
	}, []);

	return (
		<Box
			padding="space.100"
			backgroundColor={isEditing ? "elevation.surface.sunken" : "elevation.surface"}
			style={{
				borderRadius: token("radius.medium"),
				border: `1px solid ${isEditing ? token("color.border.focused") : token("color.border")}`,
				transition: "background-color 150ms ease, border-color 150ms ease",
			}}
		>
			<Stack space="space.050">
				{/* Main row with checkbox, title, priority, due date, and actions */}
				<Inline alignBlock="center" spread="space-between">
					<Inline alignBlock="center" space="space.100" grow="fill">
						<Checkbox
							isChecked={todo.completed}
							onChange={() => onToggle(todo.id)}
							label=""
						/>
						{isEditing ? (
							<Box xcss={{ flexGrow: 1 }}>
								<Textfield
									ref={inputRef}
									value={editValue}
									onChange={(e) => setEditValue((e.target as HTMLInputElement).value)}
									onBlur={handleSave}
									onKeyDown={handleKeyDown}
									isCompact
									aria-label="Edit todo title"
								/>
							</Box>
						) : (
							<Inline alignBlock="center" space="space.100" grow="fill">
								<span
									style={{
										textDecoration: todo.completed ? "line-through" : "none",
										color: todo.completed
											? token("color.text.disabled")
											: token("color.text"),
										cursor: todo.completed ? "default" : "text",
									}}
									onDoubleClick={handleDoubleClick}
								>
									<Text as="span">{todo.title}</Text>
								</span>
								<PriorityBadge priority={todo.priority} />
							</Inline>
						)}
					</Inline>
					<Inline alignBlock="center" space="space.050">
						<DueDatePicker
							dueDate={todo.dueDate}
							onDueDateChange={handleDueDateChange}
						/>
						<PrioritySelector
							priority={todo.priority}
							onPriorityChange={handlePriorityChange}
						/>
						<Button
							appearance="subtle"
							iconBefore={CrossIcon}
							aria-label="Delete todo"
							onClick={() => onDelete(todo.id)}
						>{""}</Button>
					</Inline>
				</Inline>

				{/* Expandable description section */}
				<Box paddingInlineStart="space.400">
					<TodoDescription
						todoId={todo.id}
						description={todo.description}
						isExpanded={isDescriptionExpanded}
						onToggleExpand={handleToggleDescription}
					/>
				</Box>
			</Stack>
		</Box>
	);
}
