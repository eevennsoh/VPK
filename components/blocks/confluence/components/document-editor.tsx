"use client";

import React, { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { token } from "@atlaskit/tokens";
import Button, { IconButton } from "@atlaskit/button/new";
import BookOpenIcon from "@atlaskit/icon-lab/core/book-open";
import EmojiAddIcon from "@atlaskit/icon/core/emoji-add";
import AlignTextLeftIcon from "@atlaskit/icon/core/align-text-left";
import CrossIcon from "@atlaskit/icon/core/cross";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import GrowHorizontalIcon from "@atlaskit/icon/core/grow-horizontal";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import TextDensityCompressIcon from "@atlaskit/icon-lab/core/text-density-compress";
import TaskToDoIcon from "@atlaskit/icon/core/task-to-do";
import ImageIcon from "@atlaskit/icon/core/image";
import RovoIcon from "@atlaskit/icon-lab/core/rovo";
import EditorBubbleMenu from "./editor-bubble-menu";
import LivePageIcon from "@/components/ui/icon-livepage";
import "../confluence/editor-styles.css";

const initialContent = `
  <p>This is a rich text editor built with Tiptap. You can format your text in various ways:</p>
  
  <h2>Text Formatting</h2>
  <p>You can make text <strong>bold</strong>, <em>italic</em>, <u>underline</u>, or <s>strikethrough</s>.</p>
  
  <h2>Lists</h2>
  <p>Create bulleted lists:</p>
  <ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
  </ul>
  
  <p>Or numbered lists:</p>
  <ol>
    <li>Step one</li>
    <li>Step two</li>
    <li>Step three</li>
  </ol>
  
  <h2>Code Blocks</h2>
  <pre><code>function hello() {
  console.log('Hello, world!');
}</code></pre>
  
  <h2>Blockquotes</h2>
  <blockquote>
    <p>This is a blockquote. Use it for important callouts or quotes.</p>
  </blockquote>
  
  <p>Start editing to see the magic happen!</p>
`;

export default function DocumentEditor() {
	const titleRef = useRef<HTMLDivElement>(null);
	const [isHoveringTitle, setIsHoveringTitle] = useState(false);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: "editor-link",
				},
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
				alignments: ["left", "center", "right"],
			}),
			TextStyle,
			Color,
			Highlight.configure({
				multicolor: true,
			}),
		],
		content: initialContent,
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "tiptap-editor",
			},
		},
	});

	const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		// Prevent Enter key from creating new lines
		if (e.key === "Enter") {
			e.preventDefault();
			titleRef.current?.blur();
		}
	};

	return (
		<div
			style={{
				backgroundColor: token("elevation.surface"),
				borderRadius: token("radius.large"),
				overflow: "visible",
				minHeight: "calc(100vh - 200px)",
				position: "relative",
				display: "flex",
				flexDirection: "column",
				paddingTop: 0,
			}}
		>
			{/* Fixed Title Section */}
			<div
				onMouseEnter={() => setIsHoveringTitle(true)}
				onMouseLeave={() => setIsHoveringTitle(false)}
				style={{
					paddingTop: token("space.250"),
					paddingBottom: token("space.300"),
					paddingLeft: token("space.500"),
					paddingRight: token("space.500"),
					flexShrink: 0,
				}}
			>
				{/* Action Bar Container - Fixed Height */}
				<div
					style={{
						height: "32px",
						display: "flex",
						alignItems: "center",
						marginLeft: token("space.negative.050"),
						opacity: isHoveringTitle ? 1 : 0,
						visibility: isHoveringTitle ? "visible" : "hidden",
						transition: "opacity 0.2s ease, visibility 0.2s ease",
						overflow: "visible",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							overflow: "visible",
						}}
					>
						{/* 1. Split button with left align icon */}
						{/* @ts-ignore */}
						<Button appearance="subtle" iconBefore={(iconProps) => <AlignTextLeftIcon {...iconProps} />} iconAfter={(iconProps) => <ChevronDownIcon {...iconProps} size="small" />} />

						{/* 2. Remove emoji button */}
						{/* @ts-ignore */}
						<Button appearance="subtle" iconBefore={(iconProps) => <CrossIcon {...iconProps} size="small" />}>
							Remove emoji
						</Button>

						{/* 3. Status button */}
						{/* @ts-ignore */}
						<Button appearance="subtle" iconBefore={(iconProps) => <TaskToDoIcon {...iconProps} />}>
							Status
						</Button>

						{/* 4. Header image button */}
						{/* @ts-ignore */}
						<Button appearance="subtle" iconBefore={(iconProps) => <ImageIcon {...iconProps} />}>
							Header image
						</Button>

						{/* 5. Suggest title button */}
						{/* @ts-ignore */}
						<Button appearance="subtle" iconBefore={(iconProps) => <RovoIcon {...iconProps} />}>
							Suggest title
						</Button>

						{/* 6. Icon button */}
						{/* @ts-ignore */}
						<IconButton appearance="subtle" icon={TextDensityCompressIcon} label="Text density" />

						{/* 7. Split button with expand icon */}
						{/* @ts-ignore */}
						<Button appearance="subtle" iconBefore={(iconProps) => <GrowHorizontalIcon {...iconProps} />} iconAfter={(iconProps) => <ChevronDownIcon {...iconProps} size="small" />} />

						{/* 8. Voice typing button */}
						{/* @ts-ignore */}
						<Button appearance="subtle" iconBefore={(iconProps) => <MicrophoneIcon {...iconProps} />}>
							Voice typing
						</Button>
					</div>
				</div>

				{/* 40px vertical gap */}
				<div style={{ height: "40px" }} />

				{/* Title Row */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: token("space.100"),
						gap: "12px",
					}}
				>
					{/* Icon Container */}
					<div
						style={{
							width: "40px",
							height: "40px",
							borderRadius: token("radius.large"),
							backgroundColor: token("color.background.neutral"),
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexShrink: 0,
							opacity: 0.6,
						}}
					>
						<LivePageIcon size={26} />
					</div>

					{/* Title */}
					<div
						ref={titleRef}
						contentEditable
						suppressContentEditableWarning
						onKeyDown={handleTitleKeyDown}
						style={{
							margin: 0,
							fontSize: "32px",
							fontWeight: 400,
							lineHeight: "1.2",
							fontFamily: token("font.family.brand.heading"),
							color: token("color.text"),
							outline: "none",
							cursor: "text",
						}}
					>
						Demo Live page
					</div>
				</div>

				{/* Metadata Buttons */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginLeft: token("space.negative.100"),
					}}
				>
					{/* Author Button */}
					<Button appearance="subtle" spacing="compact">
						<span
							style={{
								fontWeight: token("font.weight.regular"),
								display: "flex",
								alignItems: "center",
								gap: token("space.100"),
							}}
						>
							<img
								src="/people/Avatar-1.png"
								alt="Charlie Atlas"
								style={{
									width: 16,
									height: 16,
									borderRadius: "50%",
									objectFit: "cover",
								}}
							/>
							By Charlie Atlas
						</span>
					</Button>

					{/* Read Time Button */}
					<Button appearance="subtle" spacing="compact">
						<BookOpenIcon label="Read time" size="small" />
						<span
							style={{
								fontWeight: token("font.weight.regular"),
								marginLeft: token("space.100"),
							}}
						>
							3 min
						</span>
					</Button>

					{/* Add Emoji Button */}
					<Button appearance="subtle" spacing="compact">
						<EmojiAddIcon label="Add emoji" size="small" />
						<span
							style={{
								fontWeight: token("font.weight.regular"),
								marginLeft: token("space.100"),
							}}
						>
							Add an emoji
						</span>
					</Button>
				</div>
			</div>

			{/* Scrollable Editor Content */}
			<div
				style={{
					padding: `${token("space.400")} ${token("space.500")}`,
					overflow: "auto",
					flex: 1,
				}}
			>
				<EditorContent editor={editor} />
				{editor && <EditorBubbleMenu editor={editor} />}
			</div>
		</div>
	);
}
