"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { token } from "@atlaskit/tokens";
import { useRovoChat, Message } from "@/app/contexts/context-rovo-chat";
import { API_ENDPOINTS } from "@/lib/api-config";
import RovoChatHeader from "./rovo-chat-header";
import RovoChatMessages from "./rovo-chat-messages";
import RovoChatInput from "./rovo-chat-input";
import { useSpeechRecognition } from "../hooks/use-speech-recognition";
import { useSuggestedQuestions } from "../hooks/use-suggested-questions";

interface RovoChatPanelProps {
	onClose: () => void;
	product: "home" | "jira" | "confluence" | "rovo";
}

export default function RovoChatPanel({ onClose, product }: Readonly<RovoChatPanelProps>) {
	const router = useRouter();
	const [prompt, setPrompt] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);
	const [variant, setVariant] = useState<"sidepanel" | "floating">("sidepanel");
	const [webResultsEnabled, setWebResultsEnabled] = useState(false);
	const [companyKnowledgeEnabled, setCompanyKnowledgeEnabled] = useState(true);
	const [selectedReasoning, setSelectedReasoning] = useState("deep-research");
	const [userName, setUserName] = useState<string>("");
	const { messages, setMessages } = useRovoChat();

	const [contextEnabled, setContextEnabled] = useState(product === "confluence" || product === "jira");

	// Use extracted hooks
	const { isListening, interimText, toggleDictation } = useSpeechRecognition({
		onFinalTranscript: (transcript) => setPrompt((prev) => prev + transcript),
	});
	const { fetchSuggestedQuestions } = useSuggestedQuestions({ setMessages });

	useEffect(() => {
		if (typeof window !== "undefined") {
			const searchParams = new URLSearchParams(window.location.search);
			const nameParam = searchParams.get("name");
			if (nameParam) {
				setUserName(nameParam);
			}
		}
	}, []);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	const getContextDescription = () => {
		if (!contextEnabled) return "";
		if (product === "confluence") return "You have context from the current Confluence page.";
		if (product === "jira") return "You have context from the current Jira board.";
		return "";
	};

	const handleSuggestedQuestionClick = async (question: string) => {
		if (!question.trim()) return;

		setMessages((prev) => prev.map((msg) => ({ ...msg, suggestedQuestions: undefined })));

		const userMessage: Message = {
			id: Date.now().toString(),
			type: "user",
			content: question,
		};

		setMessages((prev) => [...prev, userMessage]);

		const assistantMessageId = (Date.now() + 1).toString();
		const assistantMessage: Message = {
			id: assistantMessageId,
			type: "assistant",
			content: "",
			isStreaming: true,
		};
		setMessages((prev) => [...prev, assistantMessage]);

		try {
			const recentHistory = messages.slice(-6).filter((msg) => msg.id !== userMessage.id);

			const response = await fetch(API_ENDPOINTS.CHAT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: question,
					conversationHistory: recentHistory,
					contextDescription: contextEnabled ? getContextDescription() : undefined,
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
								fullText += parsed.text;
								setMessages((prev) =>
									prev.map((msg) =>
										msg.id === assistantMessageId ? { ...msg, content: fullText, isStreaming: true } : msg
									)
								);
							}
						} catch (e) {
							// Skip invalid JSON
						}
					}
				}
			}

			setMessages((prev) =>
				prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg))
			);

			fetchSuggestedQuestions(question, recentHistory, fullText, assistantMessageId);
		} catch (error) {
			console.error("Error fetching AI response:", error);
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === assistantMessageId
						? { ...msg, content: "Sorry, I encountered an error. Please try again.", isStreaming: false }
						: msg
				)
			);
		}
	};

	const handleSubmit = async () => {
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

		const assistantMessageId = (Date.now() + 1).toString();
		const assistantMessage: Message = {
			id: assistantMessageId,
			type: "assistant",
			content: "",
			isStreaming: true,
		};
		setMessages((prev) => [...prev, assistantMessage]);

		try {
			const recentHistory = messages.slice(-6).filter((msg) => msg.id !== userMessage.id);

			const response = await fetch(API_ENDPOINTS.CHAT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: currentPrompt,
					conversationHistory: recentHistory,
					contextDescription: contextEnabled ? getContextDescription() : undefined,
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
								fullText += parsed.text;
								setMessages((prev) =>
									prev.map((msg) =>
										msg.id === assistantMessageId ? { ...msg, content: fullText, isStreaming: true } : msg
									)
								);
							}
						} catch (e) {
							// Skip invalid JSON
						}
					}
				}
			}

			setMessages((prev) =>
				prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg))
			);

			fetchSuggestedQuestions(currentPrompt, recentHistory, fullText, assistantMessageId);
		} catch (error) {
			console.error("Error fetching AI response:", error);
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === assistantMessageId
						? { ...msg, content: "Sorry, I encountered an error. Please try again.", isStreaming: false }
						: msg
				)
			);
		}
	};

	const hasChatStarted = messages.length > 0;

	return (
		<div
			style={{
				width: "400px",
				height: variant === "floating" ? (hasChatStarted ? "640px" : "340px") : "calc(100vh - 48px)",
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
			<style
				dangerouslySetInnerHTML={{
					__html: `
        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInIcons {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .rovo-chat-panel h1 {
          font-size: 20px;
          font-weight: 600;
          margin: 16px 0 8px 0;
          line-height: 1.3;
        }
        .rovo-chat-panel h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 14px 0 8px 0;
          line-height: 1.3;
        }
        .rovo-chat-panel h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 12px 0 6px 0;
          line-height: 1.3;
        }
        .rovo-chat-panel h1 + br,
        .rovo-chat-panel h2 + br,
        .rovo-chat-panel h3 + br,
        .rovo-chat-panel h4 + br,
        .rovo-chat-panel h5 + br,
        .rovo-chat-panel h6 + br {
          display: none;
        }
        .rovo-chat-panel * ul {
          margin: 4px 0 !important;
          padding-left: 20px !important;
        }
        .rovo-chat-panel li {
          margin: 2px 0;
          line-height: 1.5;
        }
        .rovo-chat-panel code {
          background-color: ${token("elevation.surface.sunken")};
          padding: 2px 6px;
          border-radius: var(--ds-radius-xsmall);
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
          font-size: 13px;
        }
        .rovo-chat-panel pre {
          background-color: ${token("elevation.surface.sunken")};
          padding: 12px;
          border-radius: var(--ds-radius-medium);
          overflow-x: auto;
          margin: 12px 0;
        }
        .rovo-chat-panel pre code {
          background-color: transparent;
          padding: 0;
          font-size: 13px;
          line-height: 1.5;
        }
        .rovo-chat-panel a {
          color: ${token("color.text.selected")};
          text-decoration: none;
        }
        .rovo-chat-panel a:hover {
          text-decoration: underline;
        }
      `,
				}}
			/>

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
				userName={userName}
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
