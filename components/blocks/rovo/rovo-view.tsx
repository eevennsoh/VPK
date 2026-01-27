"use client";

import React, { useState, useRef, useEffect } from "react";
import { token } from "@atlaskit/tokens";
import { useRovoChat, Message } from "@/app/contexts/context-rovo-chat";
import { API_ENDPOINTS } from "@/app/lib/api-config";
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

// TypeScript declarations for Speech Recognition API
declare global {
	interface Window {
		SpeechRecognition: any;
		webkitSpeechRecognition: any;
	}
}

export default function RovoView() {
	console.log("[RovoView] Component rendering/mounting");

	const [prompt, setPrompt] = useState("");
	const [isListening, setIsListening] = useState(false);
	const [interimText, setInterimText] = useState("");
	const [webResultsEnabled, setWebResultsEnabled] = useState(false);
	const [companyKnowledgeEnabled, setCompanyKnowledgeEnabled] = useState(true);
	const [selectedReasoning, setSelectedReasoning] = useState("deep-research");
	const [contextEnabled, setContextEnabled] = useState(false);
	const [showMoreSection, setShowMoreSection] = useState(false);
	const [isClosingMore, setIsClosingMore] = useState(false);
	const [isChatMode, setIsChatMode] = useState(false);
	const [userName, setUserName] = useState<string>("");
	const recognitionRef = useRef<any>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const { messages, setMessages, pendingPrompt, setPendingPrompt } = useRovoChat();
	const hasProcessedPendingPrompt = useRef(false);

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

	console.log("[RovoView] Current state - pendingPrompt:", pendingPrompt, "messages:", messages.length, "isChatMode:", isChatMode);

	const fetchSuggestedQuestions = async (userMessage: string, history: Message[], assistantResponse: string, messageId: string) => {
		try {
			setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, loadingSuggestions: true } : msg)));

			const response = await fetch(API_ENDPOINTS.SUGGESTED_QUESTIONS, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: userMessage,
					conversationHistory: history.slice(-6),
					assistantResponse: assistantResponse,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === messageId
							? {
									...msg,
									suggestedQuestions: data.questions,
									loadingSuggestions: false,
								}
							: msg
					)
				);
			} else {
				setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, loadingSuggestions: false } : msg)));
			}
		} catch (error) {
			console.error("Failed to fetch suggested questions:", error);
			setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, loadingSuggestions: false } : msg)));
		}
	};

	const handleSubmit = async () => {
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

		const assistantMessageId = (Date.now() + 1).toString();
		const assistantMessage: Message = {
			id: assistantMessageId,
			type: "assistant",
			content: "",
			isStreaming: true,
		};
		setMessages((prev) => [...prev, assistantMessage]);

		try {
			// Get last 3 messages (excluding the one we just added) for context
			const recentHistory = messages.slice(-6).filter((msg) => msg.id !== userMessage.id);

			const response = await fetch(API_ENDPOINTS.CHAT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: currentPrompt,
					conversationHistory: recentHistory,
					contextDescription: undefined,
					userName: userName || undefined,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to get response");
			}

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();

			if (!reader) {
				throw new Error("No reader available");
			}

			let fullText = "";
			let widgetBufferStarted = false;
			let widgetTextBuffer = "";
			let widgetType: string | null = null;

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				const lines = chunk.split("\n");

				for (const line of lines) {
					if (line.startsWith("data: ")) {
						const data = line.slice(6);
						if (data === "[DONE]") {
							break;
						}
						try {
							const parsed = JSON.parse(data);
							if (parsed.text) {
								// Check for loading signal - don't add to fullText
								if (parsed.text.includes("WIDGET_LOADING:")) {
									const loadingMatch = parsed.text.match(/WIDGET_LOADING:(\w+)/);
									if (loadingMatch) {
										const type = loadingMatch[1];
										console.log("Widget loading signal detected:", type);
										setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widgetLoading: true, widget: { type, data: null } } : msg)));
									}
									continue; // Skip adding to fullText
								}

								fullText += parsed.text;

								if (!widgetBufferStarted && fullText.includes("WIDGET_DATA:")) {
									console.log("Widget data detected in stream");
									widgetBufferStarted = true;
									const beforeWidget = fullText.split("WIDGET_DATA:")[0].trim();
									widgetTextBuffer = "WIDGET_DATA:" + fullText.split("WIDGET_DATA:")[1];

									const typeMatch = widgetTextBuffer.match(/"type":"([^"]+)"/);
									if (typeMatch) {
										widgetType = typeMatch[1];
										console.log("Widget type detected:", widgetType);
									}

									setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: beforeWidget, widgetLoading: true, widget: widgetType ? { type: widgetType, data: null } : undefined, isStreaming: true } : msg)));
								} else if (widgetBufferStarted) {
									widgetTextBuffer = "WIDGET_DATA:" + fullText.split("WIDGET_DATA:")[1];

									if (!widgetType) {
										const typeMatch = widgetTextBuffer.match(/"type":"([^"]+)"/);
										if (typeMatch) {
											widgetType = typeMatch[1];
											console.log("Widget type detected:", widgetType);
											setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widget: { type: widgetType!, data: null }, isStreaming: true } : msg)));
										}
									}
								} else {
									setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: fullText, isStreaming: true } : msg)));
								}
							}
						} catch (e) {
							// Skip invalid JSON
						}
					}
				}
			}

			console.log("Stream finished. Full text length:", fullText.length);
			console.log("Widget buffer started:", widgetBufferStarted);
			if (widgetBufferStarted) {
				console.log("Widget text buffer:", widgetTextBuffer);
			}

			if (widgetBufferStarted && widgetTextBuffer) {
				console.log("Attempting to parse widget buffer");
				const widgetMatch = widgetTextBuffer.match(/WIDGET_DATA:({[\s\S]*})/);
				console.log("Widget match:", widgetMatch ? "found" : "not found");
				if (widgetMatch) {
					console.log("Matched JSON string:", widgetMatch[1]);
					try {
						const widgetData = JSON.parse(widgetMatch[1]);
						console.log("Parsed widget data:", widgetData);
						const textContent = fullText.replace(/WIDGET_DATA:{[\s\S]*}/, "").trim();

						setMessages((prev) =>
							prev.map((msg) =>
								msg.id === assistantMessageId
									? {
											...msg,
											content: textContent,
											widget: widgetData,
											widgetLoading: false,
											isStreaming: false,
										}
									: msg
							)
						);

						// Fetch suggested questions after response is complete
						const recentHistory = messages.slice(-6);
						fetchSuggestedQuestions(currentPrompt, recentHistory, textContent, assistantMessageId);
					} catch (e) {
						console.error("Failed to parse widget data:", e);
						console.error("Widget text buffer:", widgetTextBuffer);
						setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widgetLoading: false, isStreaming: false } : msg)));
					}
				} else {
					console.error("Widget match failed. Buffer:", widgetTextBuffer);
				}
			} else {
				// No widget - just mark streaming as complete
				setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg)));

				// Fetch suggested questions after response is complete
				const recentHistory = messages.slice(-6);
				fetchSuggestedQuestions(currentPrompt, recentHistory, fullText, assistantMessageId);
			}
		} catch (error) {
			console.error("Error fetching AI response:", error);
			setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: "Sorry, I encountered an error. Please try again.", isStreaming: false } : msg)));
		}
	};

	const toggleDictation = () => {
		if (!recognitionRef.current) {
			alert("Speech recognition is not supported in your browser");
			return;
		}

		if (isListening) {
			recognitionRef.current.stop();
			setIsListening(false);
			setInterimText("");
		} else {
			recognitionRef.current.start();
			setIsListening(true);
		}
	};

	const handleSuggestionClick = (suggestion: string) => {
		setPrompt(suggestion);
	};

	const handleSuggestedQuestionClick = async (question: string) => {
		if (!question.trim()) return;

		// Clear suggested questions from all messages when clicking a suggestion
		setMessages((prev) => prev.map((msg) => ({ ...msg, suggestedQuestions: undefined })));

		// Set the prompt and submit it
		setPrompt(question);

		// Trigger submit after setting the prompt
		setTimeout(() => {
			handleSubmit();
		}, 0);
	};

	const handleBackToStart = () => {
		setMessages([]);
		setPrompt("");
		setIsChatMode(false);
	};

	// Initialize speech recognition
	useEffect(() => {
		if (typeof window !== "undefined") {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			if (SpeechRecognition) {
				const recognition = new SpeechRecognition();
				recognition.continuous = true;
				recognition.interimResults = true;
				recognition.lang = "en-US";

				recognition.onresult = (event: any) => {
					let finalTranscript = "";
					let interimTranscript = "";

					for (let i = event.resultIndex; i < event.results.length; i++) {
						const transcript = event.results[i][0].transcript;
						if (event.results[i].isFinal) {
							finalTranscript += transcript;
						} else {
							interimTranscript += transcript;
						}
					}

					// Update interim text for live display
					setInterimText(interimTranscript);

					// Only update the actual value when we have final results
					if (finalTranscript) {
						setPrompt((prev) => prev + finalTranscript);
						setInterimText(""); // Clear interim text after adding final text
					}
				};

				recognition.onerror = (event: any) => {
					console.error("Speech recognition error:", event.error);
					setIsListening(false);
					setInterimText("");
				};

				recognition.onend = () => {
					setIsListening(false);
					setInterimText("");
				};

				recognitionRef.current = recognition;
			}
		}

		return () => {
			if (recognitionRef.current) {
				recognitionRef.current.stop();
			}
		};
	}, []);

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
				setPendingPrompt(null);

				const assistantMessageId = (Date.now() + 1).toString();
				const assistantMessage: Message = {
					id: assistantMessageId,
					type: "assistant",
					content: "",
					isStreaming: true,
				};
				setMessages((prev) => [...prev, assistantMessage]);

				try {
					const response = await fetch(API_ENDPOINTS.CHAT, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							message: pendingPrompt,
							conversationHistory: [],
							contextDescription: undefined,
							userName: userName || undefined,
						}),
					});

					if (!response.ok) {
						throw new Error("Failed to get response");
					}

					const reader = response.body?.getReader();
					const decoder = new TextDecoder();

					if (!reader) {
						throw new Error("No reader available");
					}

					let fullText = "";
					let widgetBufferStarted = false;
					let widgetTextBuffer = "";
					let widgetType: string | null = null;

					while (true) {
						const { done, value } = await reader.read();
						if (done) break;

						const chunk = decoder.decode(value, { stream: true });
						const lines = chunk.split("\n");

						for (const line of lines) {
							if (line.startsWith("data: ")) {
								const data = line.slice(6);
								if (data === "[DONE]") {
									break;
								}
								try {
									const parsed = JSON.parse(data);
									if (parsed.text) {
										if (parsed.text.includes("WIDGET_LOADING:")) {
											const loadingMatch = parsed.text.match(/WIDGET_LOADING:(\w+)/);
											if (loadingMatch) {
												const type = loadingMatch[1];
												setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widgetLoading: true, widget: { type, data: null } } : msg)));
											}
											continue;
										}

										fullText += parsed.text;

										if (!widgetBufferStarted && fullText.includes("WIDGET_DATA:")) {
											widgetBufferStarted = true;
											const beforeWidget = fullText.split("WIDGET_DATA:")[0].trim();
											widgetTextBuffer = "WIDGET_DATA:" + fullText.split("WIDGET_DATA:")[1];

											const typeMatch = widgetTextBuffer.match(/"type":"([^"]+)"/);
											if (typeMatch) {
												widgetType = typeMatch[1];
											}

											setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: beforeWidget, widgetLoading: true, widget: widgetType ? { type: widgetType, data: null } : undefined, isStreaming: true } : msg)));
										} else if (widgetBufferStarted) {
											widgetTextBuffer = "WIDGET_DATA:" + fullText.split("WIDGET_DATA:")[1];

											if (!widgetType) {
												const typeMatch = widgetTextBuffer.match(/"type":"([^"]+)"/);
												if (typeMatch) {
													widgetType = typeMatch[1];
													setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widget: { type: widgetType!, data: null }, isStreaming: true } : msg)));
												}
											}
										} else {
											setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: fullText, isStreaming: true } : msg)));
										}
									}
								} catch (e) {
									// Skip invalid JSON
								}
							}
						}
					}

					if (widgetBufferStarted && widgetTextBuffer) {
						const widgetMatch = widgetTextBuffer.match(/WIDGET_DATA:({[\s\S]*})/);
						if (widgetMatch) {
							try {
								const widgetData = JSON.parse(widgetMatch[1]);
								const textContent = fullText.replace(/WIDGET_DATA:{[\s\S]*}/, "").trim();

								setMessages((prev) =>
									prev.map((msg) =>
										msg.id === assistantMessageId
											? {
													...msg,
													content: textContent,
													widget: widgetData,
													widgetLoading: false,
													isStreaming: false,
												}
											: msg
									)
								);

								fetchSuggestedQuestions(pendingPrompt, [], textContent, assistantMessageId);
							} catch (e) {
								console.error("Failed to parse widget data:", e);
								setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widgetLoading: false, isStreaming: false } : msg)));
							}
						}
					} else {
						setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg)));

						fetchSuggestedQuestions(pendingPrompt, [], fullText, assistantMessageId);
					}
				} catch (error) {
					console.error("Error fetching AI response:", error);
					setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: "Sorry, I encountered an error. Please try again.", isStreaming: false } : msg)));
				}
			};

			submitPendingPrompt();
		}
	}, [pendingPrompt]); // Only depend on pendingPrompt - other functions are stable or not needed in deps

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: isChatMode ? "stretch" : "center",
				justifyContent: isChatMode ? "flex-start" : "center",
				minHeight: "calc(100vh - 48px)",
				height: "calc(100vh - 48px)",
				position: "relative",
				padding: isChatMode ? 0 : "24px",
			}}
		>
			<style
				dangerouslySetInnerHTML={{
					__html: `
          .rovo-suggestion-btn button {
            border-radius: ${token("radius.xlarge")} !important;
          }
          /* Custom scrollbar styling */
          .more-examples-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .more-examples-scroll::-webkit-scrollbar-track {
            background: ${token("color.background.neutral")};
            border-radius: ${token("radius.medium")};
          }
          .more-examples-scroll::-webkit-scrollbar-thumb {
            background: ${token("color.background.neutral.bold")};
            border-radius: ${token("radius.medium")};
          }
          .more-examples-scroll::-webkit-scrollbar-thumb:hover {
            background: ${token("color.background.neutral.bold.hovered")};
          }
          /* Text truncation utilities */
          .truncate-1-line {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .truncate-2-lines {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          /* Markdown styling for Rovo View */
          .rovo-view-chat h1 {
            font-size: 20px;
            font-weight: 600;
            margin: 16px 0 8px 0;
            line-height: 1.3;
          }
          .rovo-view-chat h2 {
            font-size: 18px;
            font-weight: 600;
            margin: 14px 0 8px 0;
            line-height: 1.3;
          }
          .rovo-view-chat h3 {
            font-size: 16px;
            font-weight: 600;
            margin: 12px 0 6px 0;
            line-height: 1.3;
          }
          .rovo-view-chat * ul {
            margin: 4px 0 !important;
            padding-left: 20px !important;
          }
          .rovo-view-chat li {
            margin: 2px 0;
            line-height: 1.5;
          }
          .rovo-view-chat code {
            background-color: ${token("elevation.surface.sunken")};
            padding: 2px 6px;
            border-radius: var(--ds-radius-xsmall);
            font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            font-size: 13px;
          }
          .rovo-view-chat pre {
            background-color: ${token("elevation.surface.sunken")};
            padding: 12px;
            border-radius: var(--ds-radius-medium);
            overflow-x: auto;
            margin: 12px 0;
          }
          .rovo-view-chat pre code {
            background-color: transparent;
            padding: 0;
            font-size: 13px;
            line-height: 1.5;
          }
          .rovo-view-chat a {
            color: ${token("color.text.selected")};
            text-decoration: none;
          }
          .rovo-view-chat a:hover {
            text-decoration: underline;
          }
        `,
				}}
			/>

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
								onPromptChange={(newPrompt) => {
									setPrompt(newPrompt);
									setInterimText("");
								}}
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
									<span className="rovo-suggestion-btn">
										<Button appearance="default" iconBefore={SearchIcon} onClick={() => handleSuggestionClick("Find information")}>
											Find information
										</Button>
									</span>
									<span className="rovo-suggestion-btn">
										<Button appearance="default" iconBefore={ChartTrendUpIcon} onClick={() => handleSuggestionClick("Measure productivity")}>
											Measure productivity
										</Button>
									</span>
									<span className="rovo-suggestion-btn">
										<Button appearance="default" iconBefore={SearchIcon} onClick={() => handleSuggestionClick("Find People")}>
											Find People
										</Button>
									</span>
									<span className="rovo-suggestion-btn">
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
					<div className="rovo-view-chat" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", alignItems: "center" }}>
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
							onPromptChange={(newPrompt) => {
								setPrompt(newPrompt);
								setInterimText("");
							}}
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
