"use client";

import { useRef, useCallback } from "react";
import { API_ENDPOINTS } from "@/lib/api-config";

// Generic message interface that works for both chat contexts
export interface StreamingMessage {
	id: string;
	type: "user" | "assistant";
	content: string;
	widget?: {
		type: string;
		data: unknown;
	};
	widgetLoading?: boolean;
	isStreaming?: boolean;
	suggestedQuestions?: string[];
	loadingSuggestions?: boolean;
}

interface StreamingOptions {
	/** Conversation history for context (last N messages) */
	conversationHistory?: StreamingMessage[];
	/** Custom system prompt override */
	customSystemPrompt?: string;
	/** User name for personalization */
	userName?: string;
	/** Context description */
	contextDescription?: string;
	/** Abort signal for cancellation */
	signal?: AbortSignal;
}

interface StreamingCallbacks {
	/** Called when streaming starts with initial assistant message */
	onStreamStart: (assistantMessageId: string) => void;
	/** Called during streaming with updated content */
	onStreamUpdate: (
		assistantMessageId: string,
		update: Partial<StreamingMessage>
	) => void;
	/** Called when streaming completes */
	onStreamComplete: (
		assistantMessageId: string,
		finalContent: string,
		widget?: { type: string; data: unknown }
	) => void;
	/** Called on error */
	onError: (assistantMessageId: string, errorMessage: string) => void;
}

interface UseStreamingChatReturn {
	/** Submit a message and stream the response */
	streamMessage: (
		prompt: string,
		options: StreamingOptions,
		callbacks: StreamingCallbacks
	) => Promise<{ success: boolean; content?: string }>;
	/** Abort the current streaming request */
	abort: () => void;
	/** Check if currently streaming */
	isStreaming: boolean;
}

/**
 * Format error messages from API responses
 */
async function formatErrorMessage(response: Response): Promise<string> {
	const contentType = response.headers.get("content-type") || "";
	let details = "";

	if (contentType.includes("application/json")) {
		try {
			const data = await response.json();
			const rawDetails = data?.details || data?.error || "";
			details =
				typeof rawDetails === "string"
					? rawDetails
					: JSON.stringify(rawDetails);
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

	const backendUnavailable =
		/ECONNREFUSED|fetch failed|ENOTFOUND|NetworkError|Failed to fetch/i.test(
			details
		);
	if (backendUnavailable) {
		return `${statusText}. Backend unavailable. Start it with pnpm run dev.`;
	}

	return `${statusText}: ${details}`;
}

/**
 * Parse SSE stream and extract text, widget loading signals, and widget data
 */
interface ParsedChunk {
	text?: string;
	widgetLoading?: { type: string };
	isWidgetData?: boolean;
}

function parseSSELine(line: string): ParsedChunk | null {
	if (!line.startsWith("data: ")) return null;

	const data = line.slice(6);
	if (data === "[DONE]") return null;

	try {
		const parsed = JSON.parse(data);
		if (!parsed.text) return null;

		// Check for loading signal
		if (parsed.text.includes("WIDGET_LOADING:")) {
			const loadingMatch = parsed.text.match(/WIDGET_LOADING:(\w+)/);
			if (loadingMatch) {
				return { widgetLoading: { type: loadingMatch[1] } };
			}
			return null;
		}

		return { text: parsed.text };
	} catch {
		return null;
	}
}

/**
 * Hook for handling streaming chat with AI Gateway
 *
 * Extracts common streaming logic used by ChatPanel and RovoView into a reusable hook.
 * Follows the composition pattern by providing callbacks for state updates
 * rather than managing state directly.
 */
export function useStreamingChat(): UseStreamingChatReturn {
	const abortControllerRef = useRef<AbortController | null>(null);
	const isStreamingRef = useRef(false);

	const abort = useCallback(() => {
		abortControllerRef.current?.abort();
		isStreamingRef.current = false;
	}, []);

	const streamMessage = useCallback(
		async (
			prompt: string,
			options: StreamingOptions,
			callbacks: StreamingCallbacks
		): Promise<{ success: boolean; content?: string }> => {
			if (!prompt.trim()) {
				return { success: false };
			}

			// Cancel any in-flight request
			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();

			const signal = options.signal || abortControllerRef.current.signal;
			isStreamingRef.current = true;

			const assistantMessageId = (Date.now() + 1).toString();
			callbacks.onStreamStart(assistantMessageId);

			try {
				const response = await fetch(API_ENDPOINTS.CHAT, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						message: prompt,
						conversationHistory: options.conversationHistory || [],
						customSystemPrompt: options.customSystemPrompt,
						userName: options.userName,
						contextDescription: options.contextDescription,
					}),
					signal,
				});

				if (!response.ok) {
					const errorMessage = await formatErrorMessage(response);
					callbacks.onError(assistantMessageId, errorMessage);
					isStreamingRef.current = false;
					return { success: false };
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
						const parsed = parseSSELine(line);
						if (!parsed) continue;

						// Handle widget loading signal
						if (parsed.widgetLoading) {
							callbacks.onStreamUpdate(assistantMessageId, {
								widgetLoading: true,
								widget: { type: parsed.widgetLoading.type, data: null },
							});
							continue;
						}

						// Handle text content
						if (parsed.text) {
							fullText += parsed.text;

							// Check for widget data start
							if (!widgetBufferStarted && fullText.includes("WIDGET_DATA:")) {
								widgetBufferStarted = true;
								const beforeWidget = fullText.split("WIDGET_DATA:")[0].trim();
								widgetTextBuffer =
									"WIDGET_DATA:" + fullText.split("WIDGET_DATA:")[1];

								const typeMatch = widgetTextBuffer.match(/"type":"([^"]+)"/);
								if (typeMatch) {
									widgetType = typeMatch[1];
								}

								callbacks.onStreamUpdate(assistantMessageId, {
									content: beforeWidget,
									widgetLoading: true,
									widget: widgetType
										? { type: widgetType, data: null }
										: undefined,
									isStreaming: true,
								});
							} else if (widgetBufferStarted) {
								// Continue buffering widget data
								widgetTextBuffer =
									"WIDGET_DATA:" + fullText.split("WIDGET_DATA:")[1];

								if (!widgetType) {
									const typeMatch = widgetTextBuffer.match(/"type":"([^"]+)"/);
									if (typeMatch) {
										widgetType = typeMatch[1];
										callbacks.onStreamUpdate(assistantMessageId, {
											widget: { type: widgetType, data: null },
											isStreaming: true,
										});
									}
								}
							} else {
								// Regular text update
								callbacks.onStreamUpdate(assistantMessageId, {
									content: fullText,
									isStreaming: true,
								});
							}
						}
					}
				}

				// Parse final widget data if present
				if (widgetBufferStarted && widgetTextBuffer) {
					const widgetMatch = widgetTextBuffer.match(
						/WIDGET_DATA:({[\s\S]*})/
					);
					if (widgetMatch) {
						try {
							const widgetData = JSON.parse(widgetMatch[1]);
							const textContent = fullText
								.replace(/WIDGET_DATA:{[\s\S]*}/, "")
								.trim();

							callbacks.onStreamComplete(
								assistantMessageId,
								textContent,
								widgetData
							);
							isStreamingRef.current = false;
							return { success: true, content: textContent };
						} catch (e) {
							console.error("Failed to parse widget data:", e);
							callbacks.onStreamUpdate(assistantMessageId, {
								widgetLoading: false,
								isStreaming: false,
							});
						}
					}
				} else {
					// No widget - just complete
					callbacks.onStreamComplete(assistantMessageId, fullText);
				}

				isStreamingRef.current = false;
				return { success: true, content: fullText };
			} catch (error) {
				console.error("Error fetching AI response:", error);
				const rawMessage =
					error instanceof Error ? error.message : String(error);
				const backendUnavailable =
					/ECONNREFUSED|fetch failed|ENOTFOUND|NetworkError|Failed to fetch/i.test(
						rawMessage
					);
				const errorMessage = backendUnavailable
					? "Backend unavailable. Start it with pnpm run dev."
					: `Sorry, I encountered an error. ${rawMessage}`;

				callbacks.onError(assistantMessageId, errorMessage);
				isStreamingRef.current = false;
				return { success: false };
			}
		},
		[]
	);

	return {
		streamMessage,
		abort,
		get isStreaming() {
			return isStreamingRef.current;
		},
	};
}
