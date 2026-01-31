"use client";

import React, { forwardRef } from "react";
import { Editor } from "@tiptap/react";
import { IconButton } from "@atlaskit/button/new";
import TextIcon from "@atlaskit/icon/core/text";
import TextHeadingOneIcon from "@atlaskit/icon-lab/core/text-heading-one";
import TextHeadingTwoIcon from "@atlaskit/icon-lab/core/text-heading-two";
import TextHeadingThreeIcon from "@atlaskit/icon-lab/core/text-heading-three";
import QuotationMarkIcon from "@atlaskit/icon/core/quotation-mark";
import { DropdownMenuItem, DropdownMenuContainer } from "./dropdown-menu-item";
import { useTextStyle, type TextStyleType } from "./hooks/use-text-style";
import { DROPDOWN_POSITIONS } from "../../data/editor-colors";

interface TextStyleDropdownProps {
	editor: Editor;
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
}

export const TextStyleDropdown = forwardRef<HTMLDivElement, Readonly<TextStyleDropdownProps>>(
	function TextStyleDropdown({ editor, isOpen, onToggle, onClose }, ref) {
		const { currentStyle, currentIcon: CurrentIcon, setTextStyle } = useTextStyle(editor);

		function handleStyleSelect(style: TextStyleType): void {
			setTextStyle(style);
			onClose();
		}

		const position = DROPDOWN_POSITIONS.textStyle;

		return (
			<div style={{ position: "relative" }}>
				<IconButton
					icon={(iconProps) => <CurrentIcon {...iconProps} label="Text style" size="small" />}
					label={currentStyle}
					appearance="subtle"
					spacing="compact"
					onClick={onToggle}
				/>

				{isOpen && (
					<div ref={ref}>
						<DropdownMenuContainer top={position.top} left={position.left}>
							<DropdownMenuItem
								icon={<TextIcon label="Normal text" size="small" />}
								label="Normal text"
								isSelected={editor.isActive("paragraph")}
								onClick={() => handleStyleSelect("normal")}
							/>
							<DropdownMenuItem
								icon={<TextHeadingOneIcon label="Heading 1" size="small" />}
								label="Heading 1"
								isSelected={editor.isActive("heading", { level: 1 })}
								onClick={() => handleStyleSelect("h1")}
								fontSize="18px"
								fontWeight={600}
							/>
							<DropdownMenuItem
								icon={<TextHeadingTwoIcon label="Heading 2" size="small" />}
								label="Heading 2"
								isSelected={editor.isActive("heading", { level: 2 })}
								onClick={() => handleStyleSelect("h2")}
								fontSize="16px"
								fontWeight={600}
							/>
							<DropdownMenuItem
								icon={<TextHeadingThreeIcon label="Heading 3" size="small" />}
								label="Heading 3"
								isSelected={editor.isActive("heading", { level: 3 })}
								onClick={() => handleStyleSelect("h3")}
								fontSize="14px"
								fontWeight={600}
							/>
							<DropdownMenuItem
								icon={<QuotationMarkIcon label="Quote" size="small" />}
								label="Quote"
								isSelected={editor.isActive("blockquote")}
								onClick={() => handleStyleSelect("quote")}
							/>
						</DropdownMenuContainer>
					</div>
				)}
			</div>
		);
	}
);
