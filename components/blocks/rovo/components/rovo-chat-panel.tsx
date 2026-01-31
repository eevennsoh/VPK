"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { token } from "@atlaskit/tokens";
import { useRovoChat, Message } from "@/app/contexts/context-rovo-chat";
import { useStreamingChat } from "@/app/hooks/use-streaming-chat";
import RovoChatHeader from "./rovo-chat-header";
import RovoChatMessages from "./rovo-chat-messages";
import RovoChatInput from "./rovo-chat-input";
import { useSpeechRecognition } from "../hooks/use-speech-recognition";
import { useSuggestedQuestions } from "../hooks/use-suggested-questions";
import { useStreamingCallbacks } from "../hooks/use-streaming-callbacks";
import { useUrlParams } from "../hooks/use-url-params";
import styles from "./rovo-chat-panel.module.css";

interface RovoChatPanelProps {
	onClose: () => void;
	product: "home" | "jira" | "confluence" | "rovo" | "search";
}

export default function RovoChatPanel({ onClose, product }: Readonly<RovoChatPanelProps>) {
	const router = useRouter();
	const [prompt, setPrompt] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);
	const [variant, setVariant] = useState<"sidepanel" | "floating">("sidepanel");
	const [webResultsEnabled, setWebResultsEnabled] = useState(false);
	const [companyKnowledgeEnabled, setCompanyKnowledgeEnabled] = useState(true);
	const [selectedReasoning, setSelectedReasoning] = useState("deep-research");
	const { messages, setMessages } = useRovoChat();
	const { name: userName } = useUrlParams();
	const { streamMessage, abort } = useStreamingChat();

	const [contextEnabled, setContextEnabled] = useState(product === "confluence" || product === "jira");

	const { isListening, interimText, toggleDictation } = useSpeechRecognition({
		onFinalTranscript: (transcript) => setPrompt((prev) => prev + transcript),
	});
	const { fetchSuggestedQuestions } = useSuggestedQuestions({ setMessages });
	const { createStreamingCallbacks } = useStreamingCallbacks({ setMessages, fetchSuggestedQuestions });

	useEffect(() => {
		return () => abort();
	}, [abort]);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	const getContextDescription = useCallback(() => {
		if (!contextEnabled) return undefined;
		if (product === "confluence") return "You have context from the current Confluence page.";
		if (product === "jira") return "You have context from the current Jira board.";
		return undefined;
	}, [contextEnabled, product]);

	const handleSuggestedQuestionClick = useCallback(
		async (question: string) => {
			if (!question.trim()) return;

			setMessages((prev) => prev.map((msg) => ({ ...msg, suggestedQuestions: undefined })));

			const userMessage: Message = {
				id: Date.now().toString(),
				type: "user",
				content: question,
			};

			setMessages((prev) => [...prev, userMessage]);

			const recentHistory = messages.slice(-6).filter((msg) => msg.id !== userMessage.id);

			await streamMessage(
				question,
				{
					conversationHistory: recentHistory,
					contextDescription: getContextDescription(),
					userName: userName || undefined,
				},
				createStreamingCallbacks(question, recentHistory)
			);
		},
		[messages, userName, setMessages, streamMessage, createStreamingCallbacks, getContextDescription]
	);

	const handleSubmit = useCallback(async () => {
		if (!prompt.trim()) return;

		setMessages((prev) => prev.map((msg) => ({ ...msg, suggestedQuestions: undefined })));

		const userMessage: Message = {
			id: Date.now().toString(),
			type: "user",
			content: prompt,
		};

		setMessages((prev) => [...prev, userMessage]);
		const currentPrompt = prompt;
		setPrompt("");

		const recentHistory = messages.slice(-6).filter((msg) => msg.id !== userMessage.id);

		await streamMessage(
			currentPrompt,
			{
				conversationHistory: recentHistory,
				contextDescription: getContextDescription(),
				userName: userName || undefined,
			},
			createStreamingCallbacks(currentPrompt, recentHistory)
		);
	}, [prompt, messages, userName, setMessages, streamMessage, createStreamingCallbacks, getContextDescription]);

	const hasChatStarted = messages.length > 0;

	const getPanelHeight = (): string => {
		if (variant !== "floating") {
			return "calc(100vh - 48px)";
		}
		return hasChatStarted ? "640px" : "340px";
	};

	return (
		<div
			className={styles.rovoChatPanel}
			style={{
				width: "400px",
				height: getPanelHeight(),
				backgroundColor: token("elevation.surface"),
				borderLeft: variant === "sidepanel" ? `1px solid ${token("color.border")}` : "none",
				borderRadius: variant === "floating" ? token("radius.xlarge") : "0",
				boxShadow: variant === "floating" ? token("elevation.shadow.overlay") : "none",
				display: "flex",
				flexDirection: "column",
				position: variant === "floating" ? "fixed" : "relative",
				bottom: variant === "floating" ? "24px" : "auto",
				right: variant === "floating" ? "24px" : "auto",
				zIndex: variant === "floating" ? 1000 : "auto",
				transition: "height 0.3s ease",
			}}
		>
			<RovoChatHeader
				onClose={onClose}
				variant={variant}
				onVariantChange={setVariant}
				onFullScreen={() => {
					setMessages([]);
					router.push("/rovo");
				}}
			/>

			<RovoChatMessages
				ref={scrollRef}
				messages={messages}
				variant={variant}
				hasChatStarted={hasChatStarted}
				onSuggestedQuestionClick={handleSuggestedQuestionClick}
				userName={userName ?? undefined}
			/>

			<RovoChatInput
				prompt={prompt}
				interimText={interimText}
				isListening={isListening}
				onPromptChange={setPrompt}
				onSubmit={handleSubmit}
				onToggleDictation={toggleDictation}
				contextEnabled={contextEnabled}
				onContextToggle={setContextEnabled}
				product={product}
				selectedReasoning={selectedReasoning}
				onReasoningChange={setSelectedReasoning}
				webResultsEnabled={webResultsEnabled}
				onWebResultsChange={setWebResultsEnabled}
				companyKnowledgeEnabled={companyKnowledgeEnabled}
				onCompanyKnowledgeChange={setCompanyKnowledgeEnabled}
			/>
		</div>
	);
}
