"use client";

import React, { useState, useRef, useMemo } from "react";
import { Editor } from "@tiptap/react";
import { token } from "@atlaskit/tokens";
import { Inline } from "@atlaskit/primitives";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import LinkIcon from "@atlaskit/icon/core/link";
import CommentIcon from "@atlaskit/icon/core/comment";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import { useClickOutside } from "@/components/hooks/use-click-outside";
import { useSelectionPosition } from "./hooks/use-selection-position";
import { TextStyleDropdown } from "./text-style-dropdown";
import { FormattingDropdown } from "./formatting-dropdown";
import { ListDropdown } from "./list-dropdown";
import { AlignmentDropdown } from "./alignment-dropdown";
import { AIToolsSection } from "./ai-tools-section";

type DropdownType = "textStyle" | "bold" | "list" | "align" | null;

interface EditorBubbleMenuProps {
	editor: Editor;
}

export default function EditorBubbleMenu({ editor }: Readonly<EditorBubbleMenuProps>): React.ReactElement | null {
	const { show, position } = useSelectionPosition(editor);
	const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const textStyleMenuRef = useRef<HTMLDivElement>(null);
	const boldMenuRef = useRef<HTMLDivElement>(null);
	const listMenuRef = useRef<HTMLDivElement>(null);
	const alignMenuRef = useRef<HTMLDivElement>(null);

	const dropdownRefs = useMemo(
		() => [textStyleMenuRef, boldMenuRef, listMenuRef, alignMenuRef],
		[]
	);

	useClickOutside(dropdownRefs, () => setOpenDropdown(null), openDropdown !== null);

	function toggleDropdown(dropdown: DropdownType): void {
		setOpenDropdown(openDropdown === dropdown ? null : dropdown);
	}

	function closeDropdown(): void {
		setOpenDropdown(null);
	}

	function addLink(): void {
		const url = window.prompt("Enter URL");
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	}

	if (!show) {
		return null;
	}

	return (
		<div
			ref={menuRef}
			style={{
				position: "fixed",
				top: position.top,
				left: position.left,
				transform: "translate(-50%, -100%)",
				display: "flex",
				alignItems: "stretch",
				backgroundColor: token("elevation.surface.overlay"),
				borderRadius: token("radius.large"),
				boxShadow: token("elevation.shadow.overlay"),
				zIndex: 1000,
				pointerEvents: "auto",
			}}
		>
			<AIToolsSection />

			<div style={{ padding: `${token("space.050")} ${token("space.100")}` }}>
				<Inline space="space.050" alignBlock="center">
					<TextStyleDropdown
					ref={textStyleMenuRef}
					editor={editor}
					isOpen={openDropdown === "textStyle"}
					onToggle={() => toggleDropdown("textStyle")}
					onClose={closeDropdown}
				/>

				<FormattingDropdown
					ref={boldMenuRef}
					editor={editor}
					isOpen={openDropdown === "bold"}
					onToggle={() => toggleDropdown("bold")}
					onClose={closeDropdown}
				/>

				<ListDropdown
					ref={listMenuRef}
					editor={editor}
					isOpen={openDropdown === "list"}
					onToggle={() => toggleDropdown("list")}
					onClose={closeDropdown}
				/>

				<AlignmentDropdown
					ref={alignMenuRef}
					editor={editor}
					isOpen={openDropdown === "align"}
					onToggle={() => toggleDropdown("align")}
					onClose={closeDropdown}
				/>

				<IconButton
					icon={(iconProps) => <LinkIcon {...iconProps} label="Link" size="small" />}
					label="Link"
					onClick={addLink}
					isSelected={editor.isActive("link")}
					appearance="subtle"
					spacing="compact"
				/>

				<Button
					appearance="subtle"
					iconBefore={(iconProps) => <CommentIcon {...iconProps} label="Comment" size="small" />}
					spacing="compact"
				>
					Comment
				</Button>

				<IconButton
					icon={(iconProps) => (
						<ShowMoreHorizontalIcon {...iconProps} label="More options" size="small" />
					)}
					label="More options"
					appearance="subtle"
					spacing="compact"
				/>
				</Inline>
			</div>
		</div>
	);
}
