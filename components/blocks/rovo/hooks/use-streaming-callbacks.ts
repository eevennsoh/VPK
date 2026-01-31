"use client";

import { useCallback } from "react";
import { Message } from "@/app/contexts/context-rovo-chat";

interface UseStreamingCallbacksOptions {
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	fetchSuggestedQuestions: (userMessage: string, history: Message[], assistantResponse: string, messageId: string) => Promise<void>;
}

interface StreamingCallbacks {
	onStreamStart: (assistantMessageId: string) => void;
	onStreamUpdate: (assistantMessageId: string, update: Partial<Message>) => void;
	onStreamComplete: (assistantMessageId: string, finalContent: string, widget?: { type: string; data: unknown }) => void;
	onError: (assistantMessageId: string, errorMessage: string) => void;
}

interface UseStreamingCallbacksReturn {
	createStreamingCallbacks: (promptText: string, history: Message[]) => StreamingCallbacks;
}

export function useStreamingCallbacks({ setMessages, fetchSuggestedQuestions }: Readonly<UseStreamingCallbacksOptions>): UseStreamingCallbacksReturn {
	const createStreamingCallbacks = useCallback(
		(promptText: string, history: Message[]): StreamingCallbacks => ({
			onStreamStart: (assistantMessageId: string) => {
				const assistantMessage: Message = {
					id: assistantMessageId,
					type: "assistant",
					content: "",
					isStreaming: true,
				};
				setMessages((prev) => [...prev, assistantMessage]);
			},
			onStreamUpdate: (assistantMessageId: string, update: Partial<Message>) => {
				setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, ...update } : msg)));
			},
			onStreamComplete: (assistantMessageId: string, finalContent: string, widget?: { type: string; data: unknown }) => {
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === assistantMessageId
							? {
									...msg,
									content: finalContent,
									widget: widget,
									widgetLoading: false,
									isStreaming: false,
								}
							: msg
					)
				);
				// Fetch suggested questions after response is complete
				fetchSuggestedQuestions(promptText, history, finalContent, assistantMessageId);
			},
			onError: (assistantMessageId: string, errorMessage: string) => {
				setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: errorMessage, isStreaming: false } : msg)));
			},
		}),
		[setMessages, fetchSuggestedQuestions]
	);

	return { createStreamingCallbacks };
}
