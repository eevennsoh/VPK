/**
 * Rovo Configuration
 *
 * This module provides the system prompt and payload builder for AI Gateway calls.
 * Used by both the Express backend and can be imported where needed.
 */

const ROVO_CONFIG = {
	userName: "User",
	userTitle: "Team Member",
};

function buildSystemPrompt(userName) {
	const currentDate = new Date().toLocaleString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
	});

	const userContext = userName ? `\n- User's Name: ${userName}` : "";

	return `You are an AI assistant built by Atlassian.

## Context
- Current Date/Time: ${currentDate}
- Organization: Atlassian${userContext}

## Your Capabilities

You are a helpful AI assistant that can answer questions, help with tasks, and provide information.

## Response Guidelines
- Be conversational, helpful, and professional${userName ? `\n- When appropriate, you may address the user by their first name (${userName.split(" ")[0]}) to create a more personalized experience, but don't overuse it` : ""}
- **Keep responses concise - aim for 200 words or less whenever possible**
- Use markdown formatting for clarity (bold key points, use lists, add headings for structure)
- Prioritize brevity and clarity over exhaustive detail`;
}

function buildUserMessage(message, conversationHistory, contextDescription) {
	const baseMessage = contextDescription ? `${contextDescription}\n\nUser question: ${message}` : message;

	if (conversationHistory && conversationHistory.length > 0) {
		return `Previous conversation context:\n${conversationHistory.map((msg) => `${msg.type === "user" ? "User" : "Assistant"}: ${msg.content}`).join("\n")}\n\nCurrent question: ${baseMessage}`;
	}

	return baseMessage;
}

function buildAIGatewayPayload(message, conversationHistory, contextDescription, userName) {
	const isBedrockEndpoint = /\/v1\/bedrock\/model\//.test(process.env.AI_GATEWAY_URL || "");

	if (isBedrockEndpoint) {
		return {
			anthropic_version: "bedrock-2023-05-31",
			max_tokens: 2000,
			system: buildSystemPrompt(userName),
			messages: [
				{
					role: "user",
					content: [
						{
							type: "text",
							text: buildUserMessage(message, conversationHistory, contextDescription),
						},
					],
				},
			],
		};
	}

	const messages = [
		{
			role: "system",
			content: buildSystemPrompt(userName),
		},
	];

	// Add conversation history
	if (conversationHistory && conversationHistory.length > 0) {
		conversationHistory.forEach((msg) => {
			messages.push({
				role: msg.type === "user" ? "user" : "assistant",
				content: msg.content,
			});
		});
	}

	// Build the user message with context if available
	const userMessageContent = contextDescription ? `${contextDescription}\n\nUser question: ${message}` : message;

	// Add current message
	messages.push({
		role: "user",
		content: userMessageContent,
	});

	return {
		model: "gpt-4o",
		messages: messages,
		max_completion_tokens: 2000,
		temperature: 1,
		stream: true,
	};
}

module.exports = {
	ROVO_CONFIG,
	buildSystemPrompt,
	buildUserMessage,
	buildAIGatewayPayload,
};
