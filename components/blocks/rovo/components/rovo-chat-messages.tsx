"use client";

import React, { forwardRef } from "react";
import { token } from "@atlaskit/tokens";
import { Stack } from "@atlaskit/primitives/compiled";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import AiGenerativeTextSummaryIcon from "@atlaskit/icon/core/ai-generative-text-summary";
import SmartLinkIcon from "@atlaskit/icon/core/smart-link";
import CommentIcon from "@atlaskit/icon/core/comment";
import ChildWorkItemsIcon from "@atlaskit/icon/core/child-work-items";
import TagIcon from "@atlaskit/icon/core/tag";
import ThumbsUpIcon from "@atlaskit/icon/core/thumbs-up";
import ThumbsDownIcon from "@atlaskit/icon/core/thumbs-down";
import CopyIcon from "@atlaskit/icon/core/copy";
import AiChatIcon from "@atlaskit/icon/core/ai-chat";
import LoadingWidget from "./loading-widget";
import { Message } from "@/app/contexts/context-rovo-chat";
import { renderMarkdownToHtml } from "../lib/utils";

interface RovoChatMessagesProps {
	messages: Message[];
	variant: "sidepanel" | "floating";
	hasChatStarted: boolean;
	onSuggestedQuestionClick?: (question: string) => void;
	userName?: string;
}

const actionIcons = [
	AiGenerativeTextSummaryIcon,
	SmartLinkIcon,
	CommentIcon,
	ChildWorkItemsIcon,
	TagIcon,
];

const RovoChatMessages = forwardRef<HTMLDivElement, RovoChatMessagesProps>(
	({ messages, variant, hasChatStarted, onSuggestedQuestionClick, userName }, ref) => {
		return (
			<div
				ref={ref}
				style={{
					flex: 1,
					overflowY: "auto",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						padding: "12px",
						display: "flex",
						flexDirection: "column",
						gap: "24px",
						paddingBottom: "80px",
					}}
				>
					{messages.length === 0 ? (
						<div
							style={{
								padding: "0 4px 20px",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: token("space.300"),
							}}
						>
							{variant === "sidepanel" && (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: token("space.100"),
										padding: "8px 8px 8px 24px",
									}}
								>
									<img
										src="/rovo-chat-bubbles.svg"
										alt="Chat"
										style={{ width: 80, height: 80, objectFit: "contain" }}
									/>
									<Heading size="xlarge">
										{userName ? `How can I help, ${userName}?` : "How can I help?"}
									</Heading>
								</div>
							)}

							<div style={{ width: "100%" }}>
								<Stack space="space.050">
									{[
										"Improve description",
										"Link Confluence content",
										"Summarize comments",
										"Suggest child work items",
										"Link similar work items",
									].map((action, index) => {
										const IconComponent = actionIcons[index];
										return (
											<div
												key={index}
												style={{
													display: "flex",
													alignItems: "center",
													gap: token("space.150"),
													padding: "6px 4px",
													borderRadius: token("radius.small"),
													cursor: "pointer",
													backgroundColor: token("elevation.surface"),
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.backgroundColor = token(
														"color.background.neutral.subtle.hovered"
													);
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.backgroundColor = token("elevation.surface");
												}}
											>
												<div
													style={{
														width: "32px",
														height: "32px",
														backgroundColor: token("elevation.surface"),
														borderRadius: token("radius.large"),
														border: `1px solid ${token("color.border")}`,
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														padding: "4px",
													}}
												>
													<IconComponent label={action} color={token("color.icon.subtle")} />
												</div>
												<span
													style={{
														font: token("font.body"),
														fontWeight: 400,
														color: token("color.text.subtle"),
													}}
												>
													{action}
												</span>
											</div>
										);
									})}
								</Stack>
							</div>
						</div>
					) : (
						messages.map((message) => (
							<div
								key={message.id}
								style={{
									display: "flex",
									justifyContent: message.type === "user" ? "flex-end" : "flex-start",
									paddingLeft: message.type === "user" ? "24px" : "0",
								}}
							>
								{message.type === "user" ? (
									<div
										style={{
											backgroundColor: token("color.background.brand.bold"),
											borderRadius: `${token("radius.xlarge")} ${token("radius.xlarge")} ${token("radius.small")} ${token("radius.xlarge")}`,
											padding: "12px 16px",
											color: token("elevation.surface"),
											font: token("font.body"),
											maxWidth: "85%",
										}}
									>
										{message.content}
									</div>
								) : (
									<div
										style={{
											width: "100%",
										}}
									>
										<div
											style={
												{
													font: token("font.body"),
													color: token("color.text"),
													paddingLeft: "12px",
													paddingRight: "12px",
													marginBottom:
														message.widget || message.widgetLoading ? token("space.100") : "0",
												} as any
											}
											dangerouslySetInnerHTML={{
												__html: `<style>ul { padding-left: 20px !important; margin: 4px 0 !important; }</style>${renderMarkdownToHtml(message.content)}`,
											}}
										/>

										{/* Feedback icons - only show after streaming completes */}
										{!message.isStreaming && message.content && (
											<div
												style={{
													display: "flex",
													gap: "8px",
													paddingLeft: "12px",
													paddingTop: "8px",
													opacity: message.isStreaming === false ? 1 : 0,
													animation: message.isStreaming === false ? "fadeInIcons 0.3s ease-in" : "none",
												}}
											>
												<IconButton
													icon={ThumbsUpIcon}
													label="Like"
													appearance="subtle"
													spacing="compact"
													shape="default"
												/>
												<IconButton
													icon={ThumbsDownIcon}
													label="Dislike"
													appearance="subtle"
													spacing="compact"
													shape="default"
												/>
												<IconButton
													icon={CopyIcon}
													label="Copy"
													appearance="subtle"
													spacing="compact"
													shape="default"
													onClick={() => {
														navigator.clipboard.writeText(message.content);
													}}
												/>
											</div>
										)}

										{/* Suggested follow-up questions */}
										{!message.isStreaming &&
											message.suggestedQuestions &&
											message.suggestedQuestions.length > 0 && (
												<div
													style={{
														display: "flex",
														flexDirection: "column",
														alignItems: "flex-end",
														gap: "8px",
														paddingTop: "20px",
														opacity: message.isStreaming === false ? 1 : 0,
														animation:
															message.isStreaming === false ? "fadeInIcons 0.3s ease-in" : "none",
													}}
												>
													{message.suggestedQuestions.map((question, index) => (
														<Button
															key={index}
															iconBefore={AiChatIcon}
															appearance="default"
															onClick={() => onSuggestedQuestionClick?.(question)}
														>
															<span style={{ fontWeight: token("font.weight.medium") }}>{question}</span>
														</Button>
													))}
												</div>
											)}

										{message.widgetLoading && <LoadingWidget widgetType={message.widget?.type} />}
									</div>
								)}
							</div>
						))
					)}
				</div>
			</div>
		);
	}
);

RovoChatMessages.displayName = "RovoChatMessages";

// Custom comparison function for React.memo to ensure effective memoization
const arePropsEqual = (
	prevProps: RovoChatMessagesProps,
	nextProps: RovoChatMessagesProps
): boolean => {
	// Check primitive props first (fast)
	if (
		prevProps.variant !== nextProps.variant ||
		prevProps.hasChatStarted !== nextProps.hasChatStarted ||
		prevProps.userName !== nextProps.userName
	) {
		return false;
	}

	// Check messages array - compare length and last message for streaming updates
	if (prevProps.messages.length !== nextProps.messages.length) {
		return false;
	}

	// Check if any message content or streaming state changed
	for (let i = 0; i < prevProps.messages.length; i++) {
		const prev = prevProps.messages[i];
		const next = nextProps.messages[i];
		if (
			prev.id !== next.id ||
			prev.content !== next.content ||
			prev.isStreaming !== next.isStreaming ||
			prev.suggestedQuestions !== next.suggestedQuestions ||
			prev.widgetLoading !== next.widgetLoading
		) {
			return false;
		}
	}

	// Note: onSuggestedQuestionClick should be memoized in parent
	return true;
};

export default React.memo(RovoChatMessages, arePropsEqual);
