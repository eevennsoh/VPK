"use client";

import { useState, useRef, useEffect, useMemo } from "react";

import ChatHeader from "./components/chat-header";
import ChatGreeting from "./components/chat-greeting";
import MessageBubble from "./components/message-bubble";
import ChatComposer from "@/components/blocks/chat-composer/page";
import { useChat } from "@/app/contexts/context-chat";
import { chatStyles } from "./data/styles";
import { renderMarkdownToHtml } from "./lib/markdown";
import { useChatSubmit } from "./hooks/use-chat-submit";

interface ChatPanelProps {
	onClose: () => void;
}

export default function ChatPanel({ onClose }: Readonly<ChatPanelProps>): React.ReactElement {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [selectedReasoning, setSelectedReasoning] = useState("deep-research");
	const [webResultsEnabled, setWebResultsEnabled] = useState(false);
	const [companyKnowledgeEnabled, setCompanyKnowledgeEnabled] = useState(true);
	const [planModeEnabled, setPlanModeEnabled] = useState(false);
	const { messages } = useChat();
	const { prompt, setPrompt, handleSubmit, abort } = useChatSubmit();

	const renderedMessages = useMemo(
		() =>
			messages.map((msg) => ({
				...msg,
				renderedHtml: msg.type === "assistant" ? renderMarkdownToHtml(msg.content) : undefined,
			})),
		[messages]
	);

	useEffect(() => {
		return () => abort();
	}, [abort]);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div style={chatStyles.chatPanel}>
			<ChatHeader onClose={onClose} />

			<div ref={scrollRef} style={chatStyles.scrollContainer}>
				<div style={chatStyles.messagesContainer}>
					{renderedMessages.length === 0 ? (
						<div style={chatStyles.emptyState}>
							<ChatGreeting />
						</div>
					) : (
						renderedMessages.map((message) => (
							<MessageBubble key={message.id} message={message} />
						))
					)}
				</div>
			</div>

			<ChatComposer
				prompt={prompt}
				onPromptChange={setPrompt}
				onSubmit={handleSubmit}
				features={{
					addMenu: true,
					customizeMenu: true,
					planMode: true,
					microphone: false,
					disclaimer: true,
				}}
				planModeEnabled={planModeEnabled}
				onPlanModeToggle={setPlanModeEnabled}
				customizeMenuProps={{
					selectedReasoning,
					onReasoningChange: setSelectedReasoning,
					webResultsEnabled,
					onWebResultsChange: setWebResultsEnabled,
					companyKnowledgeEnabled,
					onCompanyKnowledgeChange: setCompanyKnowledgeEnabled,
				}}
			/>
		</div>
	);
}
