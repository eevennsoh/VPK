"use client";

import React, { useState, useRef } from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import AddIcon from "@atlaskit/icon/core/add";
import CustomizeIcon from "@atlaskit/icon/core/customize";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import CrossIcon from "@atlaskit/icon/core/cross";
import CustomizeMenu from "./customize-menu";
import InputAddMenu from "./input-add-menu";
import InputContextBar from "./input-context-bar";

interface RovoChatInputProps {
	prompt: string;
	interimText: string;
	isListening: boolean;
	onPromptChange: (prompt: string) => void;
	onSubmit: () => void;
	onToggleDictation: () => void;
	contextEnabled: boolean;
	onContextToggle: (enabled: boolean) => void;
	product: "home" | "jira" | "confluence" | "rovo";
	selectedReasoning: string;
	onReasoningChange: (reasoning: string) => void;
	webResultsEnabled: boolean;
	onWebResultsChange: (enabled: boolean) => void;
	companyKnowledgeEnabled: boolean;
	onCompanyKnowledgeChange: (enabled: boolean) => void;
	customHeight?: string;
	hideUsesAI?: boolean;
}

export default function RovoChatInput({
	prompt,
	interimText,
	isListening,
	onPromptChange,
	onSubmit,
	onToggleDictation,
	contextEnabled,
	onContextToggle,
	product,
	selectedReasoning,
	onReasoningChange,
	webResultsEnabled,
	onWebResultsChange,
	companyKnowledgeEnabled,
	onCompanyKnowledgeChange,
	customHeight,
	hideUsesAI = false,
}: Readonly<RovoChatInputProps>) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
	const [isCustomizeMenuOpen, setIsCustomizeMenuOpen] = useState(false);

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSubmit();
		}
	};

	return (
		<div style={{ padding: "0 12px" }}>
			{/* Context Bar */}
			{contextEnabled && (product === "confluence" || product === "jira") && (
				<InputContextBar product={product} />
			)}

			<div
				style={{
					backgroundColor: token("elevation.surface"),
					border: `1px solid ${token("color.border")}`,
					borderRadius: token("radius.xlarge"),
					padding: "16px 16px 12px",
					boxShadow: `0 -2px 50px 8px ${token("color.background.accent.gray.subtlest")}`,
					display: customHeight ? "flex" : "block",
					flexDirection: customHeight ? "column" : undefined,
					...(customHeight ? { height: customHeight } : {}),
				}}
			>
				<div style={{ position: "relative", width: "100%", flex: customHeight ? 1 : undefined }}>
					<textarea
						ref={textareaRef}
						value={prompt + interimText}
						onChange={(e) => {
							const newValue = e.target.value;
							if (!isListening || newValue.length < prompt.length) {
								onPromptChange(newValue);
								setTimeout(adjustTextareaHeight, 0);
							}
						}}
						onKeyDown={handleKeyDown}
						placeholder={isListening ? "Listening..." : "Write a prompt, @someone, or use / for actions"}
						rows={1}
						style={{
							width: "100%",
							border: "none",
							outline: "none",
							backgroundColor: "transparent",
							resize: "none",
							font: token("font.body"),
							fontFamily: "inherit",
							color: token("color.text"),
							minHeight: customHeight ? "100%" : "20px",
							maxHeight: customHeight ? "100%" : "120px",
							height: customHeight ? "100%" : "auto",
							overflowY: "auto",
						}}
					/>
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

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: token("space.150"),
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: token("space.050"),
							position: "relative",
						}}
					>
						<div style={{ position: "relative" }}>
							<IconButton
								icon={AddIcon}
								label="Add"
								appearance="subtle"
								shape="circle"
								onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
							/>
							{isAddMenuOpen && <InputAddMenu onClose={() => setIsAddMenuOpen(false)} />}
						</div>
						<div style={{ position: "relative" }}>
							<IconButton
								icon={CustomizeIcon}
								label="Customize"
								appearance="subtle"
								shape="circle"
								onClick={() => setIsCustomizeMenuOpen(!isCustomizeMenuOpen)}
							/>
							{isCustomizeMenuOpen && (
								<CustomizeMenu
									selectedReasoning={selectedReasoning}
									onReasoningChange={onReasoningChange}
									webResultsEnabled={webResultsEnabled}
									onWebResultsChange={onWebResultsChange}
									companyKnowledgeEnabled={companyKnowledgeEnabled}
									onCompanyKnowledgeChange={onCompanyKnowledgeChange}
									onClose={() => setIsCustomizeMenuOpen(false)}
								/>
							)}
						</div>
					</div>

					<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
						<IconButton
							icon={isListening ? CrossIcon : MicrophoneIcon}
							label={isListening ? "Stop listening" : "Voice"}
							appearance="subtle"
							spacing="default"
							shape="circle"
							onClick={onToggleDictation}
						/>
						<IconButton
							icon={ArrowUpIcon}
							label="Submit"
							appearance="primary"
							spacing="default"
							shape="circle"
							isDisabled={!prompt.trim()}
							onClick={onSubmit}
						/>
					</div>
				</div>
			</div>

			{!hideUsesAI && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						padding: "8px 0",
					}}
				>
					<span style={{ font: token("font.body.small"), color: token("color.text.subtlest") }}>
						Uses AI. Verify results.
					</span>
				</div>
			)}
		</div>
	);
}
