"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRovoChat, Message } from "@/app/contexts/context-rovo-chat";
import { useStreamingChat } from "@/app/hooks/use-streaming-chat";
import RovoChatInput from "./components/rovo-chat-input";
import RovoChatMessages from "./components/rovo-chat-messages";
import RovoViewHeader from "./components/rovo-view-header";
import RovoInitialView from "./components/rovo-initial-view";
import { useSpeechRecognition } from "./hooks/use-speech-recognition";
import { useSuggestedQuestions } from "./hooks/use-suggested-questions";
import { useStreamingCallbacks } from "./hooks/use-streaming-callbacks";
import { useUrlParams } from "./hooks/use-url-params";
import styles from "./rovo.module.css";

const containerStyles = {
	initial: {
		display: "flex",
		flexDirection: "column" as const,
		alignItems: "center",
		justifyContent: "center",
		minHeight: "calc(100vh - 48px)",
		height: "calc(100vh - 48px)",
		position: "relative" as const,
		padding: "24px",
	},
	chatMode: {
		display: "flex",
		flexDirection: "column" as const,
		alignItems: "stretch",
		justifyContent: "flex-start",
		minHeight: "calc(100vh - 48px)",
		height: "calc(100vh - 48px)",
		position: "relative" as const,
		padding: 0,
	},
} as const;

export default function RovoView() {
	const [prompt, setPrompt] = useState("");
	const [webResultsEnabled, setWebResultsEnabled] = useState(false);
	const [companyKnowledgeEnabled, setCompanyKnowledgeEnabled] = useState(true);
	const [selectedReasoning, setSelectedReasoning] = useState("deep-research");
	const [contextEnabled, setContextEnabled] = useState(false);
	const [showMoreSection, setShowMoreSection] = useState(false);
	const [isClosingMore, setIsClosingMore] = useState(false);
	const [isChatMode, setIsChatMode] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const { messages, setMessages, pendingPrompt, setPendingPrompt } = useRovoChat();
	const hasProcessedPendingPrompt = useRef(false);
	const { streamMessage, abort } = useStreamingChat();

	const { isListening, interimText, toggleDictation } = useSpeechRecognition({
		onFinalTranscript: (transcript) => setPrompt((prev) => prev + transcript),
	});
	const { fetchSuggestedQuestions } = useSuggestedQuestions({ setMessages });
	const { createStreamingCallbacks } = useStreamingCallbacks({ setMessages, fetchSuggestedQuestions });
	const { name: userName } = useUrlParams();

	useEffect(() => {
		return () => abort();
	}, [abort]);

	const handleSubmit = useCallback(async () => {
		if (!prompt.trim()) return;

		if (!isChatMode) {
			setIsChatMode(true);
		}

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
				userName: userName || undefined,
			},
			createStreamingCallbacks(currentPrompt, recentHistory)
		);
	}, [prompt, isChatMode, messages, userName, setMessages, streamMessage, createStreamingCallbacks]);

	const handleSuggestedQuestionClick = useCallback(
		async (question: string) => {
			if (!question.trim()) return;

			setMessages((prev) => prev.map((msg) => ({ ...msg, suggestedQuestions: undefined })));

			if (!isChatMode) {
				setIsChatMode(true);
			}

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
					userName: userName || undefined,
				},
				createStreamingCallbacks(question, recentHistory)
			);
		},
		[isChatMode, messages, userName, setMessages, streamMessage, createStreamingCallbacks]
	);

	const handleBackToStart = () => {
		setMessages([]);
		setPrompt("");
		setIsChatMode(false);
	};

	useEffect(() => {
		if (scrollRef.current && isChatMode) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages, isChatMode]);

	useEffect(() => {
		if (pendingPrompt && !hasProcessedPendingPrompt.current) {
			hasProcessedPendingPrompt.current = true;

			const submitPendingPrompt = async () => {
				if (!pendingPrompt.trim()) return;

				setIsChatMode(true);

				const userMessage: Message = {
					id: Date.now().toString(),
					type: "user",
					content: pendingPrompt,
				};

				setMessages((prev) => [...prev, userMessage]);
				const promptToSubmit = pendingPrompt;
				setPendingPrompt(null);

				await streamMessage(
					promptToSubmit,
					{
						conversationHistory: [],
						userName: userName || undefined,
					},
					createStreamingCallbacks(promptToSubmit, [])
				);
			};

			submitPendingPrompt();
		}
	}, [pendingPrompt, userName, setMessages, setPendingPrompt, streamMessage, createStreamingCallbacks]);

	return (
		<div style={isChatMode ? containerStyles.chatMode : containerStyles.initial}>
			<RovoViewHeader isChatMode={isChatMode} onBackToStart={handleBackToStart} />

			{!isChatMode ? (
				<RovoInitialView
					userName={userName}
					prompt={prompt}
					interimText={interimText}
					isListening={isListening}
					onPromptChange={setPrompt}
					onSubmit={handleSubmit}
					onToggleDictation={toggleDictation}
					contextEnabled={contextEnabled}
					onContextToggle={setContextEnabled}
					selectedReasoning={selectedReasoning}
					onReasoningChange={setSelectedReasoning}
					webResultsEnabled={webResultsEnabled}
					onWebResultsChange={setWebResultsEnabled}
					companyKnowledgeEnabled={companyKnowledgeEnabled}
					onCompanyKnowledgeChange={setCompanyKnowledgeEnabled}
					showMoreSection={showMoreSection}
					onShowMoreSection={setShowMoreSection}
					isClosingMore={isClosingMore}
					onSetIsClosingMore={setIsClosingMore}
				/>
			) : (
				<>
					{/* Chat mode - Full screen chat experience */}
					<div
						className={styles.rovoViewChat}
						style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", alignItems: "center" }}
					>
						{/* Messages area - fills available space with max width */}
						<div style={{ flex: 1, width: "100%", maxWidth: "768px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
							<RovoChatMessages
								ref={scrollRef}
								messages={messages}
								variant="sidepanel"
								hasChatStarted={true}
								onSuggestedQuestionClick={handleSuggestedQuestionClick}
								userName={userName ?? undefined}
							/>
						</div>
					</div>

					{/* Input box at the bottom */}
					<div style={{ flexShrink: 0, maxWidth: "800px", width: "100%", margin: "0 auto" }}>
						<RovoChatInput
							prompt={prompt}
							interimText={interimText}
							isListening={isListening}
							onPromptChange={setPrompt}
							onSubmit={handleSubmit}
							onToggleDictation={toggleDictation}
							contextEnabled={contextEnabled}
							onContextToggle={setContextEnabled}
							product="rovo"
							selectedReasoning={selectedReasoning}
							onReasoningChange={setSelectedReasoning}
							webResultsEnabled={webResultsEnabled}
							onWebResultsChange={setWebResultsEnabled}
							companyKnowledgeEnabled={companyKnowledgeEnabled}
							onCompanyKnowledgeChange={setCompanyKnowledgeEnabled}
						/>
					</div>
				</>
			)}
		</div>
	);
}
