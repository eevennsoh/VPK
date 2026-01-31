"use client";

import { token } from "@atlaskit/tokens";
import { ChatProvider } from "@/app/contexts/context-chat";
import ChatPanel from "@/components/blocks/chat/page";

export default function ChatPage() {
	return (
		<ChatProvider>
			<div
				style={{
					minHeight: "100vh",
					backgroundColor: token("color.background.neutral.subtle"),
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "0 16px",
				}}
			>
				<ChatPanel onClose={() => {}} />
			</div>
		</ChatProvider>
	);
}
