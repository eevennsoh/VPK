"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { token } from "@atlaskit/tokens";
import { useRovoChat, Message } from "@/app/contexts/context-rovo-chat";
import { useStreamingChat } from "@/app/hooks/use-streaming-chat";
import Image from "next/image";
import RovoChatInput from "./components/rovo-chat-input";
import RovoChatMessages from "./components/rovo-chat-messages";
import Button from "@atlaskit/button/new";
import { IconButton } from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import SearchIcon from "@atlaskit/icon/core/search";
import ChartTrendUpIcon from "@atlaskit/icon/core/chart-trend-up";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import EditIcon from "@atlaskit/icon/core/edit";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import ArrowLeftIcon from "@atlaskit/icon/core/arrow-left";
import DiscoverMoreExamples from "./components/discover-more-examples";
import { useSpeechRecognition } from "./hooks/use-speech-recognition";
import { useSuggestedQuestions } from "./hooks/use-suggested-questions";
import { useStreamingCallbacks } from "./hooks/use-streaming-callbacks";
import styles from "./rovo.module.css";

// Hoisted styles - prevents object recreation on each render
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
	console.log("[RovoView] Component rendering/mounting");

	const [prompt, setPrompt] = useState("");
	const [webResultsEnabled, setWebResultsEnabled] = useState(false);
	const [companyKnowledgeEnabled, setCompanyKnowledgeEnabled] = useState(true);
	const [selectedReasoning, setSelectedReasoning] = useState("deep-research");
	const [contextEnabled, setContextEnabled] = useState(false);
	const [showMoreSection, setShowMoreSection] = useState(false);
	const [isClosingMore, setIsClosingMore] = useState(false);
	const [isChatMode, setIsChatMode] = useState(false);
	const [userName, setUserName] = useState<string>("");
	const scrollRef = useRef<HTMLDivElement>(null);
	const { messages, setMessages, pendingPrompt, setPendingPrompt } = useRovoChat();
	const hasProcessedPendingPrompt = useRef(false);
	const { streamMessage, abort } = useStreamingChat();

	// Use extracted hooks
	const { isListening, interimText, toggleDictation } = useSpeechRecognition({
		onFinalTranscript: (transcript) => setPrompt((prev) => prev + transcript),
	});
	const { fetchSuggestedQuestions } = useSuggestedQuestions({ setMessages });
	const { createStreamingCallbacks } = useStreamingCallbacks({ setMessages, fetchSuggestedQuestions });

	// Parse URL parameter for name
	useEffect(() => {
		if (typeof window !== "undefined") {
			const searchParams = new URLSearchParams(window.location.search);
			const nameParam = searchParams.get("name");
			if (nameParam) {
				setUserName(nameParam);
			}
		}
	}, []);

	// Abort on unmount
	useEffect(() => {
		return () => abort();
	}, [abort]);

	console.log("[RovoView] Current state - pendingPrompt:", pendingPrompt, "messages:", messages.length, "isChatMode:", isChatMode);

	const handleSubmit = useCallback(async () => {
		if (!prompt.trim()) return;

		// Switch to chat mode on first submit
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

		// Get conversation history before adding new messages
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

	const handleSuggestionClick = (suggestion: string) => {
		setPrompt(suggestion);
	};

	const handleSuggestedQuestionClick = useCallback(async (question: string) => {
		if (!question.trim()) return;

		// Clear suggested questions from all messages when clicking a suggestion
		setMessages((prev) => prev.map((msg) => ({ ...msg, suggestedQuestions: undefined })));

		// Switch to chat mode if not already
		if (!isChatMode) {
			setIsChatMode(true);
		}

		// Create user message
		const userMessage: Message = {
			id: Date.now().toString(),
			type: "user",
			content: question,
		};

		setMessages((prev) => [...prev, userMessage]);

		// Get conversation history before adding new messages
		const recentHistory = messages.slice(-6).filter((msg) => msg.id !== userMessage.id);

		// Submit directly instead of using setTimeout
		await streamMessage(
			question,
			{
				conversationHistory: recentHistory,
				userName: userName || undefined,
			},
			createStreamingCallbacks(question, recentHistory)
		);
	}, [isChatMode, messages, userName, setMessages, streamMessage, createStreamingCallbacks]);

	const handleBackToStart = () => {
		setMessages([]);
		setPrompt("");
		setIsChatMode(false);
	};

	// Reset to initial state when messages are cleared
	useEffect(() => {
		if (messages.length === 0 && isChatMode) {
			setIsChatMode(false);
			setPrompt("");
		}
	}, [messages, isChatMode]);

	// Auto-scroll to bottom when messages change
	useEffect(() => {
		if (scrollRef.current && isChatMode) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages, isChatMode]);

	// Process pending prompt from HomeView navigation
	useEffect(() => {
		console.log("[RovoView] Pending prompt effect running. pendingPrompt:", pendingPrompt, "hasProcessed:", hasProcessedPendingPrompt.current);

		if (pendingPrompt && !hasProcessedPendingPrompt.current) {
			console.log("[RovoView] Processing pending prompt:", pendingPrompt);
			hasProcessedPendingPrompt.current = true;

			// Submit the pending prompt directly
			const submitPendingPrompt = async () => {
				console.log("[RovoView] submitPendingPrompt starting...");
				if (!pendingPrompt.trim()) return;

				// Switch to chat mode on first submit
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
			{/* Rovo Header */}
			<div
				style={{
					position: isChatMode ? "static" : "absolute",
					top: isChatMode ? "auto" : 0,
					left: 0,
					right: 0,
					height: "56px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: `0 ${token("space.100")}`,
					backgroundColor: token("elevation.surface"),
					flexShrink: 0,
				}}
			>
				{/* Left side - Back button (when in chat mode), Rovo logo, text, and chevron */}
				<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
					{isChatMode && <IconButton icon={ArrowLeftIcon} label="Back" appearance="subtle" spacing="default" shape="circle" onClick={handleBackToStart} />}
					<Button appearance="subtle" spacing="default">
						<div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
							<img src="/rovomark.png" alt="Rovo" style={{ width: 20, height: 20, objectFit: "contain" }} />
							<span
								style={{
									font: token("font.heading.xsmall"),
									fontWeight: 600,
								}}
							>
								Rovo
							</span>
							<ChevronDownIcon label="Expand" size="small" />
						</div>
					</Button>
				</div>

				{/* Right side - New chat and More buttons */}
				<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
					<IconButton icon={EditIcon} label="New chat" appearance="subtle" spacing="default" shape="circle" onClick={handleBackToStart} />
					<IconButton icon={ShowMoreHorizontalIcon} label="More options" appearance="subtle" spacing="default" shape="circle" />
				</div>
			</div>

			{!isChatMode ? (
				<>
					{/* Initial state - Vertically centered container */}
					<div
						style={{
							width: "800px",
							maxWidth: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: token("space.100"),
						}}
					>
						{/* Rovo chat bubbles image */}
						<div>
							<Image src="/rovo-chat-bubbles.svg" alt="Rovo Chat" width={74} height={67} />
						</div>

						{/* How can I help? title */}
						<div style={{ marginBottom: token("space.400") }}>
							<Heading size="xlarge">
								{userName ? `How can I help, ${userName}?` : "How can I help?"}
							</Heading>
						</div>

						{/* Prompt box based on RovoChatInput - full width with 16px margin */}
						<div style={{ width: "100%", padding: "0 16px" }}>
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
								customHeight="131px"
								hideUsesAI={true}
							/>
						</div>

						{/* 4 buttons arranged horizontally with 24px margin and 8px gap */}
						{!showMoreSection && (
							<div
								style={{
									width: "100%",
									padding: "0 24px",
									marginTop: token("space.300"),
								}}
							>
								<div
									style={{
										display: "flex",
										gap: "8px",
										justifyContent: "center",
										flexWrap: "wrap",
									}}
								>
									<span className={styles.suggestionBtn}>
										<Button appearance="default" iconBefore={SearchIcon} onClick={() => handleSuggestionClick("Find information")}>
											Find information
										</Button>
									</span>
									<span className={styles.suggestionBtn}>
										<Button appearance="default" iconBefore={ChartTrendUpIcon} onClick={() => handleSuggestionClick("Measure productivity")}>
											Measure productivity
										</Button>
									</span>
									<span className={styles.suggestionBtn}>
										<Button appearance="default" iconBefore={SearchIcon} onClick={() => handleSuggestionClick("Find People")}>
											Find People
										</Button>
									</span>
									<span className={styles.suggestionBtn}>
										<Button appearance="default" iconBefore={ChevronDownIcon} onClick={() => setShowMoreSection(true)}>
											More
										</Button>
									</span>
								</div>
							</div>
						)}

						{/* More section - extracted to DiscoverMoreExamples component */}
						{showMoreSection && (
							<DiscoverMoreExamples
								onExampleClick={(prompt) => {
									setPrompt(prompt);
									// Keep the section visible so user can see other examples
								}}
								onClose={() => {
									setIsClosingMore(true);
									setTimeout(() => {
										setShowMoreSection(false);
										setIsClosingMore(false);
									}, 350); // Match the collapse animation duration
								}}
								isClosing={isClosingMore}
							/>
						)}
					</div>

					{/* "Uses AI. verify results." text fixed to bottom center */}
					<div
						style={{
							position: "fixed",
							bottom: "24px",
							left: "50%",
							transform: "translateX(-50%)",
							textAlign: "center",
						}}
					>
						<span
							style={{
								font: token("font.body.small"),
								color: token("color.text.subtlest"),
							}}
						>
							Uses AI. Verify results.
						</span>
					</div>
				</>
			) : (
				<>
					{/* Chat mode - Full screen chat experience */}
					<div className={styles.rovoViewChat} style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", alignItems: "center" }}>
						{/* Messages area - fills available space with max width */}
						<div style={{ flex: 1, width: "100%", maxWidth: "768px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
							<RovoChatMessages ref={scrollRef} messages={messages} variant="sidepanel" hasChatStarted={true} onSuggestedQuestionClick={handleSuggestedQuestionClick} userName={userName} />
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
