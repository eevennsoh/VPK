"use client";

import React, { forwardRef } from "react";
import { Editor } from "@tiptap/react";
import { IconButton } from "@atlaskit/button/new";
import TextBoldIcon from "@atlaskit/icon/core/text-bold";
import TextItalicIcon from "@atlaskit/icon/core/text-italic";
import TextUnderlineIcon from "@atlaskit/icon/core/text-underline";
import TextStrikethroughIcon from "@atlaskit/icon/core/text-strikethrough";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import { DropdownMenuItem, DropdownMenuContainer } from "./dropdown-menu-item";
import { DROPDOWN_POSITIONS } from "../../data/editor-colors";

interface FormattingDropdownProps {
	editor: Editor;
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
}

export const FormattingDropdown = forwardRef<HTMLDivElement, Readonly<FormattingDropdownProps>>(
	function FormattingDropdown({ editor, isOpen, onToggle, onClose }, ref) {
		function handleItalic(): void {
			editor.chain().focus().toggleItalic().run();
			onClose();
		}

		function handleUnderline(): void {
			editor.chain().focus().toggleUnderline().run();
			onClose();
		}

		function handleStrikethrough(): void {
			editor.chain().focus().toggleStrike().run();
			onClose();
		}

		const position = DROPDOWN_POSITIONS.bold;

		return (
			<div style={{ position: "relative", display: "flex" }}>
				<IconButton
					icon={() => <TextBoldIcon label="Bold" size="small" />}
					label="Bold"
					onClick={() => editor.chain().focus().toggleBold().run()}
					isSelected={editor.isActive("bold")}
					appearance="subtle"
					spacing="compact"
				/>
				<IconButton
					icon={(iconProps) => <ChevronDownIcon {...iconProps} label="" size="small" />}
					label="More formatting options"
					appearance="subtle"
					spacing="compact"
					onClick={onToggle}
				/>

				{isOpen && (
					<div ref={ref}>
						<DropdownMenuContainer top={position.top} left={position.left}>
							<DropdownMenuItem
								icon={<TextItalicIcon label="Italic" size="small" />}
								label="Italic"
								isSelected={editor.isActive("italic")}
								onClick={handleItalic}
							/>
							<DropdownMenuItem
								icon={<TextUnderlineIcon label="Underline" size="small" />}
								label="Underline"
								isSelected={editor.isActive("underline")}
								onClick={handleUnderline}
							/>
							<DropdownMenuItem
								icon={<TextStrikethroughIcon label="Strikethrough" size="small" />}
								label="Strikethrough"
								isSelected={editor.isActive("strike")}
								onClick={handleStrikethrough}
							/>
						</DropdownMenuContainer>
					</div>
				)}
			</div>
		);
	}
);
