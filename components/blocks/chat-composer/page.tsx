"use client";

import { useState, useRef, useEffect } from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Tooltip from "@atlaskit/tooltip";
import AddIcon from "@atlaskit/icon/core/add";
import CustomizeIcon from "@atlaskit/icon/core/customize";
import ClipboardIcon from "@atlaskit/icon/core/clipboard";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import CrossIcon from "@atlaskit/icon/core/cross";
import AddMenu from "./components/add-menu";
import CustomizeMenu, { type CustomizeMenuProps } from "./components/customize-menu";
import PlanBadge from "./components/plan-badge";
import FooterDisclaimer from "@/components/ui/footer-disclaimer";

export interface ChatComposerProps {
	/** Current prompt text */
	prompt: string;
	/** Callback when prompt changes */
	onPromptChange: (prompt: string) => void;
	/** Callback when form is submitted */
	onSubmit: () => void;
	/** Placeholder text for the textarea */
	placeholder?: string;
	/** Show the Add (+) menu button */
	showAddMenu?: boolean;
	/** Show the Customize (sliders) menu button */
	showCustomizeMenu?: boolean;
	/** Show the Plan mode button/badge */
	showPlanMode?: boolean;
	/** Show the microphone button */
	showMicrophone?: boolean;
	/** Show the disclaimer footer */
	showDisclaimer?: boolean;
	/** Custom height for the textarea container */
	customHeight?: string;
	/** Whether plan mode is enabled */
	planModeEnabled?: boolean;
	/** Callback when plan mode toggle is clicked */
	onPlanModeToggle?: (enabled: boolean) => void;
	/** Whether voice dictation is active */
	isListening?: boolean;
	/** Interim (not yet finalized) speech-to-text */
	interimText?: string;
	/** Callback to toggle voice dictation */
	onToggleDictation?: () => void;
	/** Props for the customize menu (required if showCustomizeMenu is true) */
	customizeMenuProps?: Omit<CustomizeMenuProps, "onClose">;
}

// Hoisted static styles
const styles = {
	wrapper: {
		padding: `0 ${token("space.100")}`,
	},
	container: {
		backgroundColor: token("elevation.surface"),
		border: `1px solid ${token("color.border")}`,
		borderRadius: token("radius.xlarge"),
		padding: "16px 16px 12px",
		// Shadow from Figma Spike (node 1-128360): upward projection, large blur for subtle glow
		boxShadow: "0px -2px 50px 8px rgba(30, 31, 33, 0.08)",
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
		fontFamily: "inherit",
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
`;

export default function ChatComposer({
	prompt,
	onPromptChange,
	onSubmit,
	placeholder = "Ask, @mention, or / for skills",
	showAddMenu = true,
	showCustomizeMenu = true,
	showPlanMode = true,
	showMicrophone = true,
	showDisclaimer = true,
	customHeight,
	planModeEnabled = false,
	onPlanModeToggle,
	isListening = false,
	interimText = "",
	onToggleDictation,
	customizeMenuProps,
}: ChatComposerProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
	const [isCustomizeMenuOpen, setIsCustomizeMenuOpen] = useState(false);

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
		}
	};

	useEffect(() => {
		if (!customHeight) {
			adjustTextareaHeight();
		}
	}, [prompt, customHeight]);

	const handleSubmit = () => {
		if (!prompt.trim()) return;
		onSubmit();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const displayValue = prompt + interimText;

	const containerStyle = {
		...styles.container,
		...(customHeight ? { display: "flex", flexDirection: "column" as const, height: customHeight } : {}),
	};

	const textareaStyle = {
		...styles.textarea,
		...(customHeight ? { minHeight: "100%", maxHeight: "100%", height: "100%" } : {}),
	};

	const inputWrapperStyle = {
		...styles.inputWrapper,
		...(customHeight ? { flex: 1 } : {}),
	};

	return (
		<div style={styles.wrapper}>
			<div style={containerStyle}>
				<div style={inputWrapperStyle}>
					<textarea
						ref={textareaRef}
						value={displayValue}
						onChange={(e) => {
							const newValue = e.target.value;
							// If listening, only allow changes that reduce length (deletions)
							if (!isListening || newValue.length < prompt.length) {
								onPromptChange(newValue);
								if (!customHeight) {
									setTimeout(adjustTextareaHeight, 0);
								}
							}
						}}
						onKeyDown={handleKeyDown}
						placeholder={isListening ? "Listening..." : placeholder}
						aria-label="Chat message input"
						rows={1}
						className="chat-composer-textarea"
						style={textareaStyle}
					/>
					<style>{textareaCSS}</style>

					{/* Visual indicator for interim text */}
					{interimText && (
						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								pointerEvents: "none",
								padding: "0",
								font: token("font.body"),
								fontFamily: "inherit",
								color: "transparent",
								whiteSpace: "pre-wrap",
								wordWrap: "break-word",
								minHeight: "20px",
								maxHeight: "120px",
								overflowY: "auto",
							}}
						>
							<span style={{ color: token("color.text") }}>{prompt}</span>
							<span
								style={{
									color: token("color.text.subtle"),
									backgroundColor: token("color.background.accent.yellow.subtler"),
									padding: "0 2px",
									borderRadius: token("radius.xsmall"),
								}}
							>
								{interimText}
							</span>
						</div>
					)}
				</div>

				<div style={styles.actionsRow}>
					<div style={{ ...styles.buttonGroup, position: "relative" }}>
						{/* Add menu button */}
						{showAddMenu && (
							<div style={{ position: "relative" }}>
								<IconButton icon={AddIcon} label="Add" appearance="subtle" shape="circle" onClick={() => setIsAddMenuOpen(!isAddMenuOpen)} />
								{isAddMenuOpen && <AddMenu onClose={() => setIsAddMenuOpen(false)} />}
							</div>
						)}

						{/* Customize menu button */}
						{showCustomizeMenu && (
							<div style={{ position: "relative" }}>
								<IconButton icon={CustomizeIcon} label="Customize" appearance="subtle" shape="circle" onClick={() => setIsCustomizeMenuOpen(!isCustomizeMenuOpen)} />
								{isCustomizeMenuOpen && customizeMenuProps && <CustomizeMenu {...customizeMenuProps} onClose={() => setIsCustomizeMenuOpen(false)} />}
							</div>
						)}

						{/* Plan mode toggle or badge */}
						{showPlanMode && !planModeEnabled && (
							<Tooltip content="Enter plan mode ⇧Tab" position="top">
								<IconButton icon={ClipboardIcon} label="Enter plan mode" appearance="subtle" shape="circle" onClick={() => onPlanModeToggle?.(true)} />
							</Tooltip>
						)}
						{showPlanMode && planModeEnabled && (
							<PlanBadge onClose={() => onPlanModeToggle?.(false)} />
						)}
					</div>

					<div style={styles.buttonGroup}>
						{/* Microphone button */}
						{showMicrophone && onToggleDictation && (
							<IconButton
								icon={isListening ? CrossIcon : MicrophoneIcon}
								label={isListening ? "Stop listening" : "Voice"}
								appearance="subtle"
								spacing="default"
								shape="circle"
								onClick={onToggleDictation}
							/>
						)}

						{/* Submit button */}
						<IconButton icon={ArrowUpIcon} label="Submit" appearance="primary" spacing="default" shape="circle" isDisabled={!prompt.trim()} onClick={handleSubmit} />
					</div>
				</div>
			</div>

			{showDisclaimer && <FooterDisclaimer />}
		</div>
	);
}
