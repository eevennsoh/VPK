"use client";

import React, { forwardRef } from "react";
import { Editor } from "@tiptap/react";
import { IconButton } from "@atlaskit/button/new";
import AlignTextLeftIcon from "@atlaskit/icon/core/align-text-left";
import AlignTextCenterIcon from "@atlaskit/icon/core/align-text-center";
import AlignTextRightIcon from "@atlaskit/icon/core/align-text-right";
import { DropdownMenuItem, DropdownMenuContainer } from "./dropdown-menu-item";
import { DROPDOWN_POSITIONS } from "../../data/editor-colors";

type Alignment = "left" | "center" | "right";

interface AlignmentDropdownProps {
	editor: Editor;
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
}

export const AlignmentDropdown = forwardRef<HTMLDivElement, Readonly<AlignmentDropdownProps>>(
	function AlignmentDropdown({ editor, isOpen, onToggle, onClose }, ref) {
		function getCurrentAlignment(): Alignment {
			if (editor.isActive({ textAlign: "center" })) return "center";
			if (editor.isActive({ textAlign: "right" })) return "right";
			return "left";
		}

		function getAlignmentIcon(): typeof AlignTextLeftIcon {
			const alignment = getCurrentAlignment();
			switch (alignment) {
				case "center":
					return AlignTextCenterIcon;
				case "right":
					return AlignTextRightIcon;
				default:
					return AlignTextLeftIcon;
			}
		}

		function handleAlignment(alignment: Alignment): void {
			editor.chain().focus().setTextAlign(alignment).run();
			onClose();
		}

		const AlignmentIcon = getAlignmentIcon();
		const currentAlignment = getCurrentAlignment();
		const position = DROPDOWN_POSITIONS.align;

		return (
			<div style={{ position: "relative" }}>
				<IconButton
					icon={() => <AlignmentIcon label="Text alignment" size="small" />}
					label="Text alignment"
					appearance="subtle"
					spacing="compact"
					onClick={onToggle}
				/>

				{isOpen && (
					<div ref={ref}>
						<DropdownMenuContainer top={position.top} left={position.left}>
							<DropdownMenuItem
								icon={<AlignTextLeftIcon label="Align left" size="small" />}
								label="Align left"
								isSelected={currentAlignment === "left"}
								onClick={() => handleAlignment("left")}
							/>
							<DropdownMenuItem
								icon={<AlignTextCenterIcon label="Align center" size="small" />}
								label="Align center"
								isSelected={currentAlignment === "center"}
								onClick={() => handleAlignment("center")}
							/>
							<DropdownMenuItem
								icon={<AlignTextRightIcon label="Align right" size="small" />}
								label="Align right"
								isSelected={currentAlignment === "right"}
								onClick={() => handleAlignment("right")}
							/>
						</DropdownMenuContainer>
					</div>
				)}
			</div>
		);
	}
);
