"use client";

import React, { forwardRef } from "react";
import { Editor } from "@tiptap/react";
import { IconButton } from "@atlaskit/button/new";
import ListBulletedIcon from "@atlaskit/icon/core/list-bulleted";
import ListNumberedIcon from "@atlaskit/icon/core/list-numbered";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import { DropdownMenuItem, DropdownMenuContainer } from "./dropdown-menu-item";
import { DROPDOWN_POSITIONS } from "../../data/editor-colors";

interface ListDropdownProps {
	editor: Editor;
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
}

export const ListDropdown = forwardRef<HTMLDivElement, Readonly<ListDropdownProps>>(
	function ListDropdown({ editor, isOpen, onToggle, onClose }, ref) {
		function handleBulletList(): void {
			editor.chain().focus().toggleBulletList().run();
			onClose();
		}

		function handleNumberedList(): void {
			editor.chain().focus().toggleOrderedList().run();
			onClose();
		}

		const position = DROPDOWN_POSITIONS.list;

		return (
			<div style={{ position: "relative", display: "flex" }}>
				<IconButton
					icon={(iconProps) => <ListBulletedIcon {...iconProps} label="Bulleted list" size="small" />}
					label="Bulleted list"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					isSelected={editor.isActive("bulletList")}
					appearance="subtle"
					spacing="compact"
				/>
				<IconButton
					icon={(iconProps) => <ChevronDownIcon {...iconProps} label="" size="small" />}
					label="More list options"
					appearance="subtle"
					spacing="compact"
					onClick={onToggle}
				/>

				{isOpen && (
					<div ref={ref}>
						<DropdownMenuContainer top={position.top} left={position.left}>
							<DropdownMenuItem
								icon={<ListBulletedIcon label="Bulleted list" size="small" />}
								label="Bulleted list"
								isSelected={editor.isActive("bulletList")}
								onClick={handleBulletList}
							/>
							<DropdownMenuItem
								icon={<ListNumberedIcon label="Numbered list" size="small" />}
								label="Numbered list"
								isSelected={editor.isActive("orderedList")}
								onClick={handleNumberedList}
							/>
						</DropdownMenuContainer>
					</div>
				)}
			</div>
		);
	}
);
