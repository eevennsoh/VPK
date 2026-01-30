"use client";

import { useCallback } from "react";
import { Message } from "@/app/contexts/context-rovo-chat";
import { API_ENDPOINTS } from "@/lib/api-config";

interface UseSuggestedQuestionsOptions {
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

interface UseSuggestedQuestionsReturn {
	fetchSuggestedQuestions: (userMessage: string, history: Message[], assistantResponse: string, messageId: string) => Promise<void>;
}

export function useSuggestedQuestions({ setMessages }: Readonly<UseSuggestedQuestionsOptions>): UseSuggestedQuestionsReturn {
	const fetchSuggestedQuestions = useCallback(
		async (userMessage: string, history: Message[], assistantResponse: string, messageId: string) => {
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
		},
		[setMessages]
	);

	return { fetchSuggestedQuestions };
}
