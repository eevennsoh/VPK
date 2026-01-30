/**
 * Rovo Configuration
 *
 * This module provides the system prompt and payload builder for AI Gateway calls.
 * Used by both the Express backend and can be imported where needed.
 *
 * Supported endpoints:
 * - Bedrock (Claude): /v1/bedrock/model/{MODEL_ID}/invoke-with-response-stream
 * - OpenAI: /v1/openai/v1/chat/completions
 *
 * Default: Claude via Bedrock (anthropic.claude-3-5-haiku-20241022-v1:0)
 */

// Default models - update these to change the default model for each provider
const DEFAULT_MODELS = {
	bedrock: "anthropic.claude-3-5-haiku-20241022-v1:0", // Model ID is in the URL for Bedrock
	openai: "gpt-5.2-2025-12-11",
};

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

/**
 * Detects the endpoint type from the AI_GATEWAY_URL
 * @returns {'bedrock' | 'openai'}
 */
function detectEndpointType() {
	const aiGatewayUrl = process.env.AI_GATEWAY_URL || "";
	if (/\/v1\/bedrock\/model\//.test(aiGatewayUrl)) {
		return "bedrock";
	}
	return "openai";
}

function buildAIGatewayPayload(message, conversationHistory, contextDescription, userName) {
	const endpointType = detectEndpointType();

	// Bedrock format (Claude) - default
	if (endpointType === "bedrock") {
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

	// OpenAI format
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
		model: DEFAULT_MODELS.openai,
		messages: messages,
		max_completion_tokens: 2000,
		temperature: 1,
		stream: true,
	};
}

module.exports = {
	ROVO_CONFIG,
	DEFAULT_MODELS,
	buildSystemPrompt,
	buildUserMessage,
	buildAIGatewayPayload,
	detectEndpointType,
};
