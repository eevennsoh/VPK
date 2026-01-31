"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Message {
	id: string;
	type: "user" | "assistant";
	content: string;
	widget?: {
		type: string;
		data: unknown;
	};
	widgetLoading?: boolean;
}

interface ChatContextType {
	isOpen: boolean;
	toggleChat: () => void;
	closeChat: () => void;
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const toggleChat = () => setIsOpen((prev) => !prev);
	const closeChat = () => setIsOpen(false);

	return <ChatContext.Provider value={{ isOpen, toggleChat, closeChat, messages, setMessages }}>{children}</ChatContext.Provider>;
}

export function useChat() {
	const context = useContext(ChatContext);
	if (context === undefined) {
		throw new Error("useChat must be used within a ChatProvider");
	}
	return context;
}
