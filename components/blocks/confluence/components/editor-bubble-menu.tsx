"use client";

import React from "react";
import { Editor } from "@tiptap/react";
import { token } from "@atlaskit/tokens";
import { IconButton, SplitButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from "@atlaskit/dropdown-menu";
import TextBoldIcon from "@atlaskit/icon/core/text-bold";
import TextItalicIcon from "@atlaskit/icon/core/text-italic";
import TextUnderlineIcon from "@atlaskit/icon/core/text-underline";
import TextStrikethroughIcon from "@atlaskit/icon/core/text-strikethrough";
import LinkIcon from "@atlaskit/icon/core/link";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import AlignTextLeftIcon from "@atlaskit/icon/core/align-text-left";
import AlignTextCenterIcon from "@atlaskit/icon/core/align-text-center";
import AlignTextRightIcon from "@atlaskit/icon/core/align-text-right";
import ListBulletedIcon from "@atlaskit/icon/core/list-bulleted";
import ListNumberedIcon from "@atlaskit/icon/core/list-numbered";
import CommentIcon from "@atlaskit/icon/core/comment";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import MagicWandIcon from "@atlaskit/icon/core/magic-wand";
import TextIcon from "@atlaskit/icon/core/text";
import TextHeadingOneIcon from "@atlaskit/icon-lab/core/text-heading-one";
import TextHeadingTwoIcon from "@atlaskit/icon-lab/core/text-heading-two";
import TextHeadingThreeIcon from "@atlaskit/icon-lab/core/text-heading-three";
import TextHeadingFourIcon from "@atlaskit/icon-lab/core/text-heading-four";
import TextHeadingFiveIcon from "@atlaskit/icon-lab/core/text-heading-five";
import TextHeadingSixIcon from "@atlaskit/icon-lab/core/text-heading-six";
import QuotationMarkIcon from "@atlaskit/icon/core/quotation-mark";
import TextStyleIcon from "@atlaskit/icon/core/text-style";

interface EditorBubbleMenuProps {
	editor: Editor;
}

// Color definitions using ADS tokens
const TEXT_COLORS = {
	default: { token: "color.text", value: "#172B4D" },
	blue: { token: "color.text.accent.blue.bolder", value: "#0052CC" },
	teal: { token: "color.text.accent.teal.bolder", value: "#008DA6" },
	green: { token: "color.text.accent.green.bolder", value: "#00875A" },
	yellow: { token: "color.text.accent.orange.bolder", value: "#FF8B00" },
	red: { token: "color.text.accent.red.bolder", value: "#DE350B" },
	purple: { token: "color.text.accent.purple.bolder", value: "#5E4DB2" },
	gray: { token: "color.text.subtle", value: "#6B778C" },
	blueLight: { token: "color.text.accent.blue", value: "#0065FF" },
	tealLight: { token: "color.text.accent.teal", value: "#00A3BF" },
	greenLight: { token: "color.text.accent.green", value: "#36B37E" },
	yellowLight: { token: "color.text.accent.orange", value: "#FFAB00" },
	redLight: { token: "color.text.accent.red", value: "#FF5630" },
	purpleLight: { token: "color.text.accent.purple", value: "#6554C0" },
	white: { token: "elevation.surface", value: "#FFFFFF" },
	blueSubtle: { token: "color.text.accent.blue", value: "#B3D4FF" },
	tealSubtle: { token: "color.text.accent.teal", value: "#B3F5FF" },
	greenSubtle: { token: "color.text.accent.green", value: "#ABF5D1" },
	yellowSubtle: { token: "color.text.accent.orange", value: "#FFF0B3" },
	redSubtle: { token: "color.text.accent.red", value: "#FFBDAD" },
	purpleSubtle: { token: "color.text.accent.purple", value: "#EAE6FF" },
};

const HIGHLIGHT_COLORS = {
	none: { token: "color.background.neutral.subtle", value: "transparent" },
	purple: { token: "color.background.accent.purple.subtlest", value: "#EAE6FF" },
	red: { token: "color.background.accent.red.subtlest", value: "#FFBDAD" },
	yellow: { token: "color.background.accent.yellow.subtlest", value: "#FFF0B3" },
	yellowAlt: {
		token: "color.background.accent.yellow.subtlest",
		value: "#FFF4B3",
	},
	green: { token: "color.background.accent.green.subtlest", value: "#D3F1A7" },
	teal: { token: "color.background.accent.teal.subtlest", value: "#B3F5FF" },
};

export default function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
	const [show, setShow] = React.useState(false);
	const [position, setPosition] = React.useState({ top: 0, left: 0 });
	const menuRef = React.useRef<HTMLDivElement>(null);

	// State for which dropdown is open
	const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

	// State for selected colors
	const [selectedTextColor, setSelectedTextColor] = React.useState<string>(TEXT_COLORS.default.value); // Default text color
	const [selectedHighlightColor, setSelectedHighlightColor] = React.useState<string>(HIGHLIGHT_COLORS.none.value); // Default no highlight

	// Refs for dropdown buttons
	const textStyleButtonRef = React.useRef<HTMLButtonElement>(null);
	const boldButtonRef = React.useRef<HTMLButtonElement>(null);
	const listButtonRef = React.useRef<HTMLButtonElement>(null);
	const alignButtonRef = React.useRef<HTMLButtonElement>(null);
	const colorButtonRef = React.useRef<HTMLButtonElement>(null);

	// Refs for dropdown menus
	const textStyleMenuRef = React.useRef<HTMLDivElement>(null);
	const boldMenuRef = React.useRef<HTMLDivElement>(null);
	const listMenuRef = React.useRef<HTMLDivElement>(null);
	const alignMenuRef = React.useRef<HTMLDivElement>(null);
	const colorMenuRef = React.useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			const isInsideDropdown =
				textStyleMenuRef.current?.contains(target) ||
				boldMenuRef.current?.contains(target) ||
				listMenuRef.current?.contains(target) ||
				alignMenuRef.current?.contains(target) ||
				colorMenuRef.current?.contains(target) ||
				textStyleButtonRef.current?.contains(target) ||
				boldButtonRef.current?.contains(target) ||
				listButtonRef.current?.contains(target) ||
				alignButtonRef.current?.contains(target) ||
				colorButtonRef.current?.contains(target);

			if (!isInsideDropdown) {
				setOpenDropdown(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Fixed dropdown positions
	const getDropdownPosition = (dropdownType: string) => {
		// Fixed positions for each dropdown
		const positions = {
			textStyle: { top: 40, left: 276 },
			bold: { top: 40, left: 324 },
			list: { top: 40, left: 356 },
			align: { top: 40, left: 404 },
			color: { top: 40, left: 440 },
		};

		return positions[dropdownType as keyof typeof positions] || { top: 40, left: 280 };
	};

	React.useEffect(() => {
		const updateMenu = () => {
			const { from, to } = editor.state.selection;
			const hasSelection = from !== to;

			if (!hasSelection) {
				setShow(false);
				return;
			}

			// Get the DOM coordinates of the selection
			const { view } = editor;
			const start = view.coordsAtPos(from);
			const end = view.coordsAtPos(to);

			// Position the menu above the selection
			const left = (start.left + end.left) / 2;
			const top = start.top - 10; // 10px above selection

			setPosition({ top, left });
			setShow(true);
		};

		editor.on("selectionUpdate", updateMenu);
		editor.on("transaction", updateMenu);

		return () => {
			editor.off("selectionUpdate", updateMenu);
			editor.off("transaction", updateMenu);
		};
	}, [editor]);

	const addLink = () => {
		const url = window.prompt("Enter URL");
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	};

	const getCurrentTextStyle = () => {
		if (editor.isActive("heading", { level: 1 })) return "Heading 1";
		if (editor.isActive("heading", { level: 2 })) return "Heading 2";
		if (editor.isActive("heading", { level: 3 })) return "Heading 3";
		if (editor.isActive("heading", { level: 4 })) return "Heading 4";
		if (editor.isActive("heading", { level: 5 })) return "Heading 5";
		if (editor.isActive("heading", { level: 6 })) return "Heading 6";
		if (editor.isActive("blockquote")) return "Quote";
		return "Normal text";
	};

	const getCurrentTextStyleIcon = () => {
		if (editor.isActive("heading", { level: 1 })) return TextHeadingOneIcon;
		if (editor.isActive("heading", { level: 2 })) return TextHeadingTwoIcon;
		if (editor.isActive("heading", { level: 3 })) return TextHeadingThreeIcon;
		if (editor.isActive("heading", { level: 4 })) return TextHeadingFourIcon;
		if (editor.isActive("heading", { level: 5 })) return TextHeadingFiveIcon;
		if (editor.isActive("heading", { level: 6 })) return TextHeadingSixIcon;
		if (editor.isActive("blockquote")) return QuotationMarkIcon;
		return TextIcon;
	};

	const setTextStyle = (style: string) => {
		switch (style) {
			case "normal":
				editor.chain().focus().setParagraph().run();
				break;
			case "h1":
				editor.chain().focus().toggleHeading({ level: 1 }).run();
				break;
			case "h2":
				editor.chain().focus().toggleHeading({ level: 2 }).run();
				break;
			case "h3":
				editor.chain().focus().toggleHeading({ level: 3 }).run();
				break;
			case "h4":
				editor.chain().focus().toggleHeading({ level: 4 }).run();
				break;
			case "h5":
				editor.chain().focus().toggleHeading({ level: 5 }).run();
				break;
			case "h6":
				editor.chain().focus().toggleHeading({ level: 6 }).run();
				break;
			case "quote":
				editor.chain().focus().toggleBlockquote().run();
				break;
		}
	};

	const getCurrentAlignment = () => {
		if (editor.isActive({ textAlign: "left" })) return "left";
		if (editor.isActive({ textAlign: "center" })) return "center";
		if (editor.isActive({ textAlign: "right" })) return "right";
		return "left"; // default
	};

	const getAlignmentIcon = () => {
		const alignment = getCurrentAlignment();
		switch (alignment) {
			case "center":
				return AlignTextCenterIcon;
			case "right":
				return AlignTextRightIcon;
			default:
				return AlignTextLeftIcon;
		}
	};

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
			{/* AI Tools Section */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					padding: `${token("space.050")} ${token("space.050")}`,
					borderRight: `1px solid ${token("color.border")}`,
				}}
			>
				{/* Ask Rovo Button */}
				<Button
					appearance="subtle"
					spacing="compact"
					iconBefore={() => <img src="/rovomark.png" alt="Rovo" style={{ width: "12px", height: "12px", objectFit: "contain" }} />}
					iconAfter={(iconProps) => <ChevronDownIcon {...iconProps} label="More options" size="small" />}
				>
					Ask Rovo
				</Button>

				{/* Improve Writing Button */}
				<Button appearance="subtle" spacing="compact" iconBefore={(iconProps) => <MagicWandIcon {...iconProps} label="Improve writing" size="small" />}>
					Improve writing
				</Button>
			</div>

			{/* Formatting Tools Section */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: token("space.050"),
					padding: `${token("space.050")} ${token("space.100")}`,
				}}
			>
				{/* Text Style Button */}
				<div style={{ position: "relative" }}>
					<IconButton
						ref={textStyleButtonRef}
						icon={(iconProps) => {
							const CurrentIcon = getCurrentTextStyleIcon();
							return <CurrentIcon {...iconProps} label="Text style" size="small" />;
						}}
						label={getCurrentTextStyle()}
						appearance="subtle"
						spacing="compact"
						onClick={() => setOpenDropdown(openDropdown === "textStyle" ? null : "textStyle")}
					/>

					{/* Text Style Dropdown Menu */}
					{openDropdown === "textStyle" && (
						<div
							ref={textStyleMenuRef}
							style={{
								position: "fixed",
								top: `${getDropdownPosition("textStyle").top}px`,
								left: `${getDropdownPosition("textStyle").left}px`,
								backgroundColor: token("elevation.surface.overlay"),
								borderRadius: token("radius.large"),
								boxShadow: token("elevation.shadow.overlay"),
								zIndex: 2000,
								minWidth: "200px",
								padding: token("space.075"),
							}}
						>
							<button
								onClick={() => {
									setTextStyle("normal");
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: !editor.isActive("paragraph") ? "transparent" : token("color.background.selected"),
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: !editor.isActive("paragraph") ? "inherit" : token("color.text.selected"),
								}}
							>
								<TextIcon label="Normal text" size="small" />
								<span>Normal text</span>
							</button>
							<button
								onClick={() => {
									setTextStyle("h1");
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: editor.isActive("heading", { level: 1 }) ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: editor.isActive("heading", { level: 1 }) ? token("color.text.selected") : "inherit",
								}}
							>
								<TextHeadingOneIcon label="Heading 1" size="small" />
								<span style={{ fontWeight: 600, fontSize: "18px" }}>Heading 1</span>
							</button>
							<button
								onClick={() => {
									setTextStyle("h2");
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: editor.isActive("heading", { level: 2 }) ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: editor.isActive("heading", { level: 2 }) ? token("color.text.selected") : "inherit",
								}}
							>
								<TextHeadingTwoIcon label="Heading 2" size="small" />
								<span style={{ fontWeight: 600, fontSize: "16px" }}>Heading 2</span>
							</button>
							<button
								onClick={() => {
									setTextStyle("h3");
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: editor.isActive("heading", { level: 3 }) ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: editor.isActive("heading", { level: 3 }) ? token("color.text.selected") : "inherit",
								}}
							>
								<TextHeadingThreeIcon label="Heading 3" size="small" />
								<span style={{ fontWeight: 600, fontSize: "14px" }}>Heading 3</span>
							</button>
							<button
								onClick={() => {
									setTextStyle("quote");
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: editor.isActive("blockquote") ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: editor.isActive("blockquote") ? token("color.text.selected") : "inherit",
								}}
							>
								<QuotationMarkIcon label="Quote" size="small" />
								<span>Quote</span>
							</button>
						</div>
					)}
				</div>

				{/* Bold Button with Formatting Options */}
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
						ref={boldButtonRef}
						icon={(iconProps) => <ChevronDownIcon {...iconProps} label="" size="small" />}
						label="More formatting options"
						appearance="subtle"
						spacing="compact"
						onClick={() => setOpenDropdown(openDropdown === "bold" ? null : "bold")}
					/>

					{/* Bold Dropdown Menu */}
					{openDropdown === "bold" && (
						<div
							ref={boldMenuRef}
							style={{
								position: "fixed",
								top: `${getDropdownPosition("bold").top}px`,
								left: `${getDropdownPosition("bold").left}px`,
								backgroundColor: token("elevation.surface.overlay"),
								borderRadius: token("radius.large"),
								boxShadow: token("elevation.shadow.overlay"),
								zIndex: 2000,
								minWidth: "200px",
								padding: token("space.075"),
							}}
						>
							<button
								onClick={() => {
									editor.chain().focus().toggleItalic().run();
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: editor.isActive("italic") ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: editor.isActive("italic") ? token("color.text.selected") : "inherit",
								}}
							>
								<TextItalicIcon label="Italic" size="small" />
								<span>Italic</span>
							</button>
							<button
								onClick={() => {
									editor.chain().focus().toggleUnderline().run();
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: editor.isActive("underline") ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: editor.isActive("underline") ? token("color.text.selected") : "inherit",
								}}
							>
								<TextUnderlineIcon label="Underline" size="small" />
								<span>Underline</span>
							</button>
							<button
								onClick={() => {
									editor.chain().focus().toggleStrike().run();
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: editor.isActive("strike") ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: editor.isActive("strike") ? token("color.text.selected") : "inherit",
								}}
							>
								<TextStrikethroughIcon label="Strikethrough" size="small" />
								<span>Strikethrough</span>
							</button>
						</div>
					)}
				</div>

				{/* Bulleted List Button with List Options */}
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
						ref={listButtonRef}
						icon={(iconProps) => <ChevronDownIcon {...iconProps} label="" size="small" />}
						label="More list options"
						appearance="subtle"
						spacing="compact"
						onClick={() => setOpenDropdown(openDropdown === "list" ? null : "list")}
					/>

					{/* List Dropdown Menu */}
					{openDropdown === "list" && (
						<div
							ref={listMenuRef}
							style={{
								position: "fixed",
								top: `${getDropdownPosition("list").top}px`,
								left: `${getDropdownPosition("list").left}px`,
								backgroundColor: token("elevation.surface.overlay"),
								borderRadius: token("radius.large"),
								boxShadow: token("elevation.shadow.overlay"),
								zIndex: 2000,
								minWidth: "200px",
								padding: token("space.075"),
							}}
						>
							<button
								onClick={() => {
									editor.chain().focus().toggleBulletList().run();
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: editor.isActive("bulletList") ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: editor.isActive("bulletList") ? token("color.text.selected") : "inherit",
								}}
							>
								<ListBulletedIcon label="Bulleted list" size="small" />
								<span>Bulleted list</span>
							</button>
							<button
								onClick={() => {
									editor.chain().focus().toggleOrderedList().run();
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: editor.isActive("orderedList") ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: editor.isActive("orderedList") ? token("color.text.selected") : "inherit",
								}}
							>
								<ListNumberedIcon label="Numbered list" size="small" />
								<span>Numbered list</span>
							</button>
						</div>
					)}
				</div>

				{/* Text Alignment Button */}
				<div style={{ position: "relative" }}>
					<IconButton
						ref={alignButtonRef}
						icon={() => {
							const AlignmentIcon = getAlignmentIcon();
							return <AlignmentIcon label="Text alignment" size="small" />;
						}}
						label="Text alignment"
						appearance="subtle"
						spacing="compact"
						onClick={() => setOpenDropdown(openDropdown === "align" ? null : "align")}
					/>

					{/* Alignment Dropdown Menu */}
					{openDropdown === "align" && (
						<div
							ref={alignMenuRef}
							style={{
								position: "fixed",
								top: `${getDropdownPosition("align").top}px`,
								left: `${getDropdownPosition("align").left}px`,
								backgroundColor: token("elevation.surface.overlay"),
								borderRadius: token("radius.large"),
								boxShadow: token("elevation.shadow.overlay"),
								zIndex: 2000,
								minWidth: "200px",
								padding: token("space.075"),
							}}
						>
							<button
								onClick={() => {
									editor.chain().focus().setTextAlign("left").run();
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: getCurrentAlignment() === "left" ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: getCurrentAlignment() === "left" ? token("color.text.selected") : "inherit",
								}}
							>
								<AlignTextLeftIcon label="Align left" size="small" />
								<span>Align left</span>
							</button>
							<button
								onClick={() => {
									editor.chain().focus().setTextAlign("center").run();
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: getCurrentAlignment() === "center" ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: getCurrentAlignment() === "center" ? token("color.text.selected") : "inherit",
								}}
							>
								<AlignTextCenterIcon label="Align center" size="small" />
								<span>Align center</span>
							</button>
							<button
								onClick={() => {
									editor.chain().focus().setTextAlign("right").run();
									setOpenDropdown(null);
								}}
								style={{
									width: "100%",
									padding: token("space.100"),
									border: "none",
									background: getCurrentAlignment() === "right" ? token("color.background.selected") : "transparent",
									cursor: "pointer",
									textAlign: "left",
									borderRadius: "0px",
									display: "flex",
									alignItems: "center",
									gap: token("space.100"),
									color: getCurrentAlignment() === "right" ? token("color.text.selected") : "inherit",
								}}
							>
								<AlignTextRightIcon label="Align right" size="small" />
								<span>Align right</span>
							</button>
						</div>
					)}
				</div>

				<IconButton icon={(iconProps) => <LinkIcon {...iconProps} label="Link" size="small" />} label="Link" onClick={addLink} isSelected={editor.isActive("link")} appearance="subtle" spacing="compact" />

				{/* Comment Button */}
				<Button appearance="subtle" iconBefore={(iconProps) => <CommentIcon {...iconProps} label="Comment" size="small" />} spacing="compact">
					Comment
				</Button>

				{/* More Options Button */}
				<IconButton icon={(iconProps) => <ShowMoreHorizontalIcon {...iconProps} label="More options" size="small" />} label="More options" appearance="subtle" spacing="compact" />
			</div>
		</div>
	);
}
