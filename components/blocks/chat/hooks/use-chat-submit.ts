"use client";

import { useState, useCallback } from "react";
import { useChat, Message } from "@/app/contexts/context-chat";
import { useSystemPrompt } from "@/app/contexts/context-system-prompt";
import { useStreamingChat } from "@/app/hooks/use-streaming-chat";

interface UseChatSubmitReturn {
	prompt: string;
	setPrompt: (prompt: string) => void;
	handleSubmit: () => Promise<void>;
	abort: () => void;
}

export function useChatSubmit(): UseChatSubmitReturn {
	const [prompt, setPrompt] = useState("");
	const { messages, setMessages } = useChat();
	const { customPrompt } = useSystemPrompt();
	const { streamMessage, abort } = useStreamingChat();

	const handleSubmit = useCallback(async () => {
		if (!prompt.trim()) return;

		const promptText = prompt;
		setPrompt("");

		const userMessage: Message = {
			id: Date.now().toString(),
			type: "user",
			content: promptText,
		};
		setMessages((prev) => [...prev, userMessage]);

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
						prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, ...update } : msg))
					);
				},
				onStreamComplete: (assistantMessageId, finalContent, widget) => {
					setMessages((prev) =>
						prev.map((msg) =>
							msg.id === assistantMessageId
								? { ...msg, content: finalContent, widget, widgetLoading: false }
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
	}, [prompt, messages, customPrompt, setMessages, streamMessage]);

	return { prompt, setPrompt, handleSubmit, abort };
}
