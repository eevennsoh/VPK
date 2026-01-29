"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Text } from "@atlaskit/primitives";
import { IconButton } from "@atlaskit/button/new";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import { token } from "@atlaskit/tokens";
import { useTodo } from "@/app/contexts/context-todo";

interface TodoDescriptionProps {
	todoId: string;
	description: string;
	isExpanded?: boolean;
	onToggleExpand?: () => void;
}

const styles = {
	toggleButton: {
		display: "flex",
		alignItems: "center",
		gap: token("space.050"),
		cursor: "pointer",
		padding: `${token("space.050")} 0`,
	},
	contentWrapper: {
		overflow: "hidden",
		transition: "max-height 0.2s ease-out, opacity 0.2s ease-out",
	},
	expandedBackground: {
		backgroundColor: token("elevation.surface.sunken"),
		borderRadius: token("radius.medium"),
		padding: token("space.150"),
		marginTop: token("space.100"),
	},
	textarea: {
		width: "100%",
		border: "none",
		outline: "none",
		backgroundColor: "transparent",
		resize: "none" as const,
		font: token("font.body"),
		color: token("color.text"),
		minHeight: "60px",
		maxHeight: "200px",
		overflowY: "auto" as const,
	},
	readViewText: {
		whiteSpace: "pre-wrap" as const,
		wordBreak: "break-word" as const,
	},
} as const;

const textareaCSS = `
	.todo-description-textarea::placeholder {
		color: ${token("color.text.subtlest")};
	}
	.todo-description-textarea:focus-visible {
		outline: none;
	}
`;

export function TodoDescription({
	todoId,
	description,
	isExpanded = false,
	onToggleExpand,
}: TodoDescriptionProps) {
	const { updateTodo } = useTodo();
	const [isEditing, setIsEditing] = useState(false);
	const [localDescription, setLocalDescription] = useState(description);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Sync local state with prop changes
	useEffect(() => {
		setLocalDescription(description);
	}, [description]);

	// Focus textarea when entering edit mode
	useEffect(() => {
		if (isEditing && textareaRef.current) {
			textareaRef.current.focus();
			// Move cursor to end
			textareaRef.current.selectionStart = textareaRef.current.value.length;
		}
	}, [isEditing]);

	const adjustTextareaHeight = useCallback(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
		}
	}, []);

	useEffect(() => {
		if (isEditing) {
			adjustTextareaHeight();
		}
	}, [localDescription, isEditing, adjustTextareaHeight]);

	const handleSave = useCallback(() => {
		const trimmedDescription = localDescription.trim();
		if (trimmedDescription !== description) {
			updateTodo(todoId, { description: trimmedDescription });
		}
		setIsEditing(false);
	}, [localDescription, description, todoId, updateTodo]);

	const handleBlur = useCallback(() => {
		handleSave();
	}, [handleSave]);

	const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
		// Allow Escape to cancel editing
		if (e.key === "Escape") {
			setLocalDescription(description);
			setIsEditing(false);
		}
	}, [description]);

	const handleToggle = useCallback(() => {
		onToggleExpand?.();
	}, [onToggleExpand]);

	const handleStartEditing = useCallback(() => {
		setIsEditing(true);
	}, []);

	const hasDescription = description.trim().length > 0;
	const showToggle = hasDescription || isExpanded;

	if (!showToggle && !isEditing) {
		return null;
	}

	return (
		<Box paddingBlockStart="space.050">
			{/* Toggle header */}
			<div
				style={styles.toggleButton}
				onClick={handleToggle}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleToggle();
					}
				}}
			>
				<IconButton
					icon={isExpanded ? ChevronDownIcon : ChevronRightIcon}
					label={isExpanded ? "Collapse notes" : "Expand notes"}
					appearance="subtle"
					spacing="compact"
					onClick={(e) => {
						e.stopPropagation();
						handleToggle();
					}}
				/>
				<Text size="small" color="color.text.subtle">
					{hasDescription ? "Notes" : "Add notes..."}
				</Text>
			</div>

			{/* Expandable content */}
			<div
				style={{
					...styles.contentWrapper,
					maxHeight: isExpanded ? "300px" : "0",
					opacity: isExpanded ? 1 : 0,
				}}
			>
				<div style={styles.expandedBackground}>
					{isEditing ? (
						<>
							<textarea
								ref={textareaRef}
								value={localDescription}
								onChange={(e) => {
									setLocalDescription(e.target.value);
									setTimeout(adjustTextareaHeight, 0);
								}}
								onBlur={handleBlur}
								onKeyDown={handleKeyDown}
								placeholder="Add notes..."
								aria-label="Todo notes"
								className="todo-description-textarea"
								style={styles.textarea}
							/>
							<style>{textareaCSS}</style>
						</>
					) : (
						<div
							onClick={handleStartEditing}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleStartEditing();
								}
							}}
							role="button"
							tabIndex={0}
							style={{ cursor: "text", minHeight: "40px" }}
						>
							{hasDescription ? (
								<div style={styles.readViewText}>
									<Text as="p">{description}</Text>
								</div>
							) : (
								<Text color="color.text.subtlest">Add notes...</Text>
							)}
						</div>
					)}
				</div>
			</div>
		</Box>
	);
}

export default TodoDescription;
