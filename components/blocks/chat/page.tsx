"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";

import { token } from "@atlaskit/tokens";
import ChatHeader from "./components/chat-header";
import ChatGreeting from "./components/chat-greeting";
import ChatComposer from "./components/chat-composer";
import { useChat, Message } from "@/app/contexts/context-chat";
import { useSystemPrompt } from "@/app/contexts/context-system-prompt";
import { useStreamingChat } from "@/app/hooks/use-streaming-chat";

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
	() => import("../widget/page"),
	{
		ssr: false,
		loading: () => (
			<div style={{ padding: token("space.200"), color: token("color.text.subtlest") }}>
				Loading widget...
			</div>
		),
	},
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
	const { messages, setMessages } = useChat();
	const { customPrompt } = useSystemPrompt();
	const { streamMessage, abort } = useStreamingChat();

	// Memoize rendered markdown to avoid regex work on every render
	const renderedMessages = useMemo(
		() =>
			messages.map((msg) => ({
				...msg,
				renderedHtml: msg.type === "assistant" ? renderMarkdownToHtml(msg.content) : undefined,
			})),
		[messages],
	);

	// Abort on unmount
	useEffect(() => {
		return () => abort();
	}, [abort]);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	const handleSubmit = useCallback(async (promptText: string) => {
		if (!promptText.trim()) return;

		// Add user message
		const userMessage: Message = {
			id: Date.now().toString(),
			type: "user",
			content: promptText,
		};
		setMessages((prev) => [...prev, userMessage]);

		// Get conversation history before adding new messages
		const recentHistory = messages.slice(-6).filter((msg) => msg.id !== userMessage.id);

		await streamMessage(
			promptText,
			{
				conversationHistory: recentHistory,
				customSystemPrompt: customPrompt,
			},
			{
				onStreamStart: (assistantMessageId) => {
					const assistantMessage: Message = {
						id: assistantMessageId,
						type: "assistant",
						content: "",
					};
					setMessages((prev) => [...prev, assistantMessage]);
				},
				onStreamUpdate: (assistantMessageId, update) => {
					setMessages((prev) =>
						prev.map((msg) =>
							msg.id === assistantMessageId ? { ...msg, ...update } : msg
						)
					);
				},
				onStreamComplete: (assistantMessageId, finalContent, widget) => {
					setMessages((prev) =>
						prev.map((msg) =>
							msg.id === assistantMessageId
								? {
										...msg,
										content: finalContent,
										widget: widget,
										widgetLoading: false,
									}
								: msg
						)
					);
				},
				onError: (assistantMessageId, errorMessage) => {
					setMessages((prev) =>
						prev.map((msg) =>
							msg.id === assistantMessageId
								? { ...msg, content: errorMessage, widgetLoading: false }
								: msg
						)
					);
				},
			}
		);
	}, [messages, customPrompt, setMessages, streamMessage]);

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
