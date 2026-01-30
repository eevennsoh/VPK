"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Message {
	id: string;
	type: "user" | "assistant";
	content: string;
	widget?: {
		type: string;
		data: any;
	};
	widgetLoading?: boolean;
	isStreaming?: boolean;
	suggestedQuestions?: string[];
	loadingSuggestions?: boolean;
}

interface RovoChatContextType {
	isOpen: boolean;
	toggleChat: () => void;
	closeChat: () => void;
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	resetChat: () => void;
	pendingPrompt: string | null;
	setPendingPrompt: (prompt: string | null) => void;
}

const RovoChatContext = createContext<RovoChatContextType | undefined>(undefined);

export function RovoChatProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

	const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);
	const closeChat = useCallback(() => setIsOpen(false), []);
	const resetChat = useCallback(() => setMessages([]), []);

	const setPendingPromptWithLog = useCallback((prompt: string | null) => {
		console.log("[RovoChatContext] setPendingPrompt called with:", prompt);
		setPendingPrompt(prompt);
	}, []);

	return (
		<RovoChatContext.Provider
			value={{
				isOpen,
				toggleChat,
				closeChat,
				messages,
				setMessages,
				resetChat,
				pendingPrompt,
				setPendingPrompt: setPendingPromptWithLog,
			}}
		>
			{children}
		</RovoChatContext.Provider>
	);
}

export function useRovoChat() {
	const context = useContext(RovoChatContext);
	if (context === undefined) {
		throw new Error("useRovoChat must be used within a RovoChatProvider");
	}
	return context;
}
