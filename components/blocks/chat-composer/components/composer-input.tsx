"use client";

import { useRef, useEffect, useCallback } from "react";
import { token } from "@atlaskit/tokens";
import { composerStyles, textareaCSS } from "../data/styles";

interface ComposerInputProps {
	prompt: string;
	onPromptChange: (prompt: string) => void;
	onSubmit: () => void;
	placeholder: string;
	customHeight?: string;
	isListening: boolean;
	interimText: string;
}

export default function ComposerInput({
	prompt,
	onPromptChange,
	onSubmit,
	placeholder,
	customHeight,
	isListening,
	interimText,
}: Readonly<ComposerInputProps>): React.ReactElement {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustTextareaHeight = useCallback(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
		}
	}, []);

	useEffect(() => {
		if (!customHeight) {
			adjustTextareaHeight();
		}
	}, [prompt, customHeight, adjustTextareaHeight]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSubmit();
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		// If listening, only allow changes that reduce length (deletions)
		if (!isListening || newValue.length < prompt.length) {
			onPromptChange(newValue);
			if (!customHeight) {
				setTimeout(adjustTextareaHeight, 0);
			}
		}
	};

	const displayValue = prompt + interimText;

	const inputWrapperStyle = {
		...composerStyles.inputWrapper,
		...(customHeight ? { flex: 1 } : {}),
	};

	const textareaStyle = {
		...composerStyles.textarea,
		...(customHeight ? { minHeight: "100%", maxHeight: "100%", height: "100%" } : {}),
	};

	return (
		<div style={inputWrapperStyle}>
			<textarea
				ref={textareaRef}
				value={displayValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder={isListening ? "Listening..." : placeholder}
				aria-label="Chat message input"
				rows={1}
				className="chat-composer-textarea"
				style={textareaStyle}
			/>
			<style>{textareaCSS}</style>

			{interimText && <InterimTextOverlay prompt={prompt} interimText={interimText} />}
		</div>
	);
}

interface InterimTextOverlayProps {
	prompt: string;
	interimText: string;
}

function InterimTextOverlay({ prompt, interimText }: Readonly<InterimTextOverlayProps>): React.ReactElement {
	return (
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
	);
}
