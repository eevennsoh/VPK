"use client";

import dynamic from "next/dynamic";
import { token } from "@atlaskit/tokens";
import { chatStyles } from "../data/styles";
import type { WorkItemsData } from "../lib/types";
import type { Message } from "@/app/contexts/context-chat";
import LoadingWidget from "./loading-widget";

// Dynamic import for conditional widget - reduces initial bundle size
const WorkItemsWidget = dynamic<{
	data: WorkItemsData;
	onInsert?: () => void;
	showInsertMenu?: boolean;
	moreMenu?: React.ReactNode;
}>(
	() => import("../../widget/page"),
	{
		ssr: false,
		loading: () => (
			<div style={{ padding: token("space.200"), color: token("color.text.subtlest") }}>
				Loading widget...
			</div>
		),
	}
);

interface RenderedMessage extends Message {
	renderedHtml?: string;
}

interface MessageBubbleProps {
	message: RenderedMessage;
}

export default function MessageBubble({ message }: Readonly<MessageBubbleProps>): React.ReactElement {
	const messageContainerStyle = {
		display: "flex",
		justifyContent: message.type === "user" ? "flex-end" : "flex-start",
		paddingLeft: message.type === "user" ? token("space.300") : "0",
	};

	if (message.type === "user") {
		return (
			<div style={messageContainerStyle}>
				<div style={chatStyles.userBubble}>{message.content}</div>
			</div>
		);
	}

	const assistantMessageStyle = {
		...chatStyles.assistantMessage,
		marginBottom: message.widget || message.widgetLoading ? token("space.100") : "0",
	};

	return (
		<div style={messageContainerStyle}>
			<div style={chatStyles.assistantContainer}>
				<div
					style={assistantMessageStyle}
					dangerouslySetInnerHTML={{ __html: message.renderedHtml ?? "" }}
				/>
				{message.widgetLoading && <LoadingWidget widgetType={message.widget?.type} />}
				{message.widget && !message.widgetLoading && message.widget.type === "work-items" && (
					<WorkItemsWidget data={message.widget.data as WorkItemsData} />
				)}
			</div>
		</div>
	);
}
