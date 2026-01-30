"use client";

import { useState, useRef, useEffect } from "react";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import AddIcon from "@atlaskit/icon/core/add";
import CustomizeIcon from "@atlaskit/icon/core/customize";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import FooterDisclaimer from "@/components/ui/footer-disclaimer";

interface ChatComposerProps {
	onSubmit: (prompt: string) => void;
}

// Hoisted static styles - prevents object recreation on each render
const styles = {
	wrapper: {
		padding: `0 ${token("space.100")}`,
	},
	container: {
		backgroundColor: token("elevation.surface"),
		border: `${token("border.width")} solid ${token("color.border")}`,
		borderRadius: token("radius.xlarge"),
		padding: `${token("space.200")} ${token("space.200")} ${token("space.150")}`,
		boxShadow: token("elevation.shadow.raised"),
	},
	inputWrapper: {
		position: "relative" as const,
		width: "100%",
		display: "flex",
		alignItems: "center",
	},
	textarea: {
		width: "100%",
		border: "none",
		outline: "none",
		backgroundColor: "transparent",
		resize: "none" as const,
		font: token("font.body"),
		color: token("color.text"),
		minHeight: "20px",
		maxHeight: "120px",
		overflowY: "auto" as const,
	},
	actionsRow: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: token("space.150"),
	},
	buttonGroup: {
		display: "flex",
		alignItems: "center",
		gap: token("space.050"),
	},
} as const;

// CSS for pseudo-elements (can't be in style objects)
const textareaCSS = `
	.chat-composer-textarea::placeholder {
		color: ${token("color.text.subtlest")};
	}
	.chat-composer-textarea:focus-visible {
		outline: 2px solid ${token("color.border.focused")};
		outline-offset: 2px;
	}
`;

export default function ChatComposer({ onSubmit }: ChatComposerProps) {
	const [prompt, setPrompt] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
		}
	};

	useEffect(() => {
		adjustTextareaHeight();
	}, [prompt]);

	const handleSubmit = () => {
		if (!prompt.trim()) return;
		onSubmit(prompt);
		setPrompt("");
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	return (
		<div style={styles.wrapper}>
			<div style={styles.container}>
				<div style={styles.inputWrapper}>
					<textarea
						ref={textareaRef}
						value={prompt}
						onChange={(e) => {
							setPrompt(e.target.value);
							setTimeout(adjustTextareaHeight, 0);
						}}
						onKeyDown={handleKeyDown}
						placeholder="Ask, @mention, or / for skills"
						aria-label="Chat message input"
						rows={1}
						className="chat-composer-textarea"
						style={styles.textarea}
					/>
					<style>{textareaCSS}</style>
				</div>

				<div style={styles.actionsRow}>
					<div style={styles.buttonGroup}>
						<IconButton icon={AddIcon} label="Add" appearance="subtle" shape="circle" />
						<IconButton icon={CustomizeIcon} label="Customize" appearance="subtle" shape="circle" />
					</div>

					<div style={styles.buttonGroup}>
						<IconButton icon={MicrophoneIcon} label="Voice" appearance="subtle" spacing="default" shape="circle" />
						<IconButton icon={ArrowUpIcon} label="Submit" appearance="primary" spacing="default" shape="circle" isDisabled={!prompt.trim()} onClick={handleSubmit} />
					</div>
				</div>
			</div>

			<FooterDisclaimer />
		</div>
	);
}
