"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

import { token } from "@atlaskit/tokens";
import ChatHeader from "./components/chat-header";
import ChatGreeting from "./components/chat-greeting";
import ChatComposer from "./components/chat-composer";
import { useChat, Message } from "@/app/contexts/context-chat";
import { useSystemPrompt } from "@/app/contexts/context-system-prompt";
import { API_ENDPOINTS } from "@/app/lib/api-config";

// Type for work items widget data
interface WorkItemsData {
	items: {
		key: string;
		summary: string;
		status: string;
		dueDate?: string;
		priority?: "High" | "Medium" | "Low";
	}[];
	assignedTo?: string;
}

// Dynamic import for conditional widget - reduces initial bundle size
const WorkItemsWidget = dynamic<{ data: WorkItemsData; onInsert?: () => void; showInsertMenu?: boolean; moreMenu?: React.ReactNode }>(
	() => import("../work-items-widget/page"),
	{ ssr: false },
);

// Minimal markdown-to-HTML renderer for assistant messages
function renderMarkdownToHtml(text: string): string {
	const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

	let html = escapeHtml(text);

	// Links [text](url)
	html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1<\/a>');

	// Inline code `code`
	html = html.replace(/`([^`]+)`/g, "<code>$1<\/code>");

	// Bold **text**
	html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1<\/strong>");

	// Italic *text* (simple heuristic, avoids matching **bold**)
	html = html.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2<\/em>");

	// Line breaks
	html = html.replace(/\n/g, "<br/>");

	return html;
}

const HOTEL_LOADING_MESSAGES = ["Accessing calendar...", "Confirming travel policy...", "Searching hotels..."];

interface ChatPanelProps {
	onClose: () => void;
}

// Hoisted static styles - prevents object recreation on each render
const styles = {
	loadingWidget: {
		padding: token("space.200"),
		backgroundColor: token("color.background.neutral.subtle"),
		borderRadius: token("radius.large"),
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		color: token("color.text.subtlest"),
		font: token("font.body"),
		marginLeft: token("space.150"),
		marginRight: token("space.150"),
	},
	chatPanel: {
		width: "100%",
		minWidth: "400px",
		height: "100vh",
		maxHeight: "800px",
		backgroundColor: token("elevation.surface"),
		border: `1px solid ${token("color.border")}`,
		borderRadius: token("radius.xlarge"),
		display: "flex",
		flexDirection: "column" as const,
	},
	scrollContainer: {
		flex: 1,
		minHeight: 0,
		overflowY: "auto" as const,
		display: "flex",
		flexDirection: "column" as const,
	},
	messagesContainer: {
		padding: token("space.150"),
		display: "flex",
		flexDirection: "column" as const,
		gap: token("space.300"),
		paddingBottom: token("space.1000"),
		flex: 1,
	},
	emptyState: {
		display: "flex",
		flexDirection: "column" as const,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	userBubble: {
		backgroundColor: token("color.background.brand.bold"),
		borderRadius: `${token("radius.xlarge")} ${token("radius.xlarge")} ${token("radius.small")} ${token("radius.xlarge")}`,
		padding: `${token("space.100")} ${token("space.150")}`,
		color: token("color.text.inverse"),
		font: token("font.body"),
		maxWidth: "85%",
	},
	assistantContainer: {
		width: "100%",
	},
} as const;

function LoadingWidget({ widgetType }: { widgetType?: string }) {
	const [step, setStep] = useState(0);

	useEffect(() => {
		if (widgetType === "hotels") {
			const interval = setInterval(() => {
				setStep((prev) => (prev + 1) % HOTEL_LOADING_MESSAGES.length);
			}, 1200);
			return () => clearInterval(interval);
		}
	}, [widgetType]);

	const getMessage = () => {
		if (widgetType === "hotels") return HOTEL_LOADING_MESSAGES[step % HOTEL_LOADING_MESSAGES.length];
		if (widgetType === "work-items") return "Loading work items...";
		return "Loading widget...";
	};

	return <div style={styles.loadingWidget}>{getMessage()}</div>;
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const abortControllerRef = useRef<AbortController | null>(null);
	const { messages, setMessages } = useChat();
	const { customPrompt } = useSystemPrompt();

	// Memoize rendered markdown to avoid regex work on every render
	const renderedMessages = useMemo(
		() =>
			messages.map((msg) => ({
				...msg,
				renderedHtml: msg.type === "assistant" ? renderMarkdownToHtml(msg.content) : undefined,
			})),
		[messages],
	);

	const formatErrorMessage = async (response: Response) => {
		const contentType = response.headers.get("content-type") || "";
		let details = "";

		if (contentType.includes("application/json")) {
			try {
				const data = await response.json();
				const rawDetails = data?.details || data?.error || "";
				details = typeof rawDetails === "string" ? rawDetails : JSON.stringify(rawDetails);
			} catch {
				details = "";
			}
		} else {
			try {
				details = await response.text();
			} catch {
				details = "";
			}
		}

		const statusText = `Request failed (${response.status})`;
		if (!details) return statusText;

		const backendUnavailable = /ECONNREFUSED|fetch failed|ENOTFOUND|NetworkError|Failed to fetch/i.test(details);
		if (backendUnavailable) {
			return `${statusText}. Backend unavailable. Start it with pnpm run dev.`;
		}

		return `${statusText}: ${details}`;
	};

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	const handleSubmit = async (promptText: string) => {
		if (!promptText.trim()) return;

		// Cancel any in-flight request before starting a new one
		abortControllerRef.current?.abort();
		abortControllerRef.current = new AbortController();
		const signal = abortControllerRef.current.signal;

		const userMessage: Message = {
			id: Date.now().toString(),
			type: "user",
			content: promptText,
		};

		setMessages((prev) => [...prev, userMessage]);
		const currentPrompt = promptText;

		const assistantMessageId = (Date.now() + 1).toString();
		const assistantMessage: Message = {
			id: assistantMessageId,
			type: "assistant",
			content: "",
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
					customSystemPrompt: customPrompt,
				}),
				signal,
			});

			if (!response.ok) {
				const errorMessage = await formatErrorMessage(response);
				setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: errorMessage, widgetLoading: false } : msg)));
				return;
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

									setMessages((prev) =>
										prev.map((msg) =>
											msg.id === assistantMessageId ? { ...msg, content: beforeWidget, widgetLoading: true, widget: widgetType ? { type: widgetType, data: null } : undefined } : msg,
										),
									);
								} else if (widgetBufferStarted) {
									widgetTextBuffer = "WIDGET_DATA:" + fullText.split("WIDGET_DATA:")[1];

									if (!widgetType) {
										const typeMatch = widgetTextBuffer.match(/"type":"([^"]+)"/);
										if (typeMatch) {
											widgetType = typeMatch[1];
											console.log("Widget type detected:", widgetType);
											setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widget: { type: widgetType!, data: null } } : msg)));
										}
									}
								} else {
									setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: fullText } : msg)));
								}
							}
						} catch {
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
										}
									: msg,
							),
						);
					} catch (e) {
						console.error("Failed to parse widget data:", e);
						console.error("Widget text buffer:", widgetTextBuffer);
						setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widgetLoading: false } : msg)));
					}
				} else {
					console.error("Widget match failed. Buffer:", widgetTextBuffer);
				}
			}
		} catch (error) {
			console.error("Error fetching AI response:", error);
			const rawMessage = error instanceof Error ? error.message : String(error);
			const backendUnavailable = /ECONNREFUSED|fetch failed|ENOTFOUND|NetworkError|Failed to fetch/i.test(rawMessage);
			const errorMessage = backendUnavailable ? "Backend unavailable. Start it with pnpm run dev." : `Sorry, I encountered an error. ${rawMessage}`;
			setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: errorMessage, widgetLoading: false } : msg)));
		}
	};

	return (
		<div style={styles.chatPanel}>
			<ChatHeader onClose={onClose} />

			<div ref={scrollRef} style={styles.scrollContainer}>
				<div style={styles.messagesContainer}>
					{renderedMessages.length === 0 ? (
						<div style={styles.emptyState}>
							<ChatGreeting />
						</div>
					) : (
						renderedMessages.map((message) => (
							<div
								key={message.id}
								style={{
									display: "flex",
									justifyContent: message.type === "user" ? "flex-end" : "flex-start",
									paddingLeft: message.type === "user" ? token("space.300") : "0",
								}}
							>
								{message.type === "user" ? (
									<div style={styles.userBubble}>{message.content}</div>
								) : (
									<div style={styles.assistantContainer}>
										<div
											style={{
												font: token("font.body"),
												color: token("color.text"),
												marginBottom: message.widget || message.widgetLoading ? token("space.100") : "0",
												paddingLeft: token("space.150"),
												paddingRight: token("space.150"),
											}}
											dangerouslySetInnerHTML={{ __html: message.renderedHtml ?? "" }}
										/>
										{message.widgetLoading && <LoadingWidget widgetType={message.widget?.type} />}
										{message.widget && !message.widgetLoading && <>{message.widget.type === "work-items" && <WorkItemsWidget data={message.widget.data as WorkItemsData} />}</>}
									</div>
								)}
							</div>
						))
					)}
				</div>
			</div>

			<ChatComposer onSubmit={handleSubmit} />
		</div>
	);
}
