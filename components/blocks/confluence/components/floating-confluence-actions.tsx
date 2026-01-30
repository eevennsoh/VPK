"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import AiGenerativeAudioBriefingIcon from "@atlaskit/icon-lab/core/ai-generative-audio-briefing";
import CommentIcon from "@atlaskit/icon/core/comment";
import InformationCircleIcon from "@atlaskit/icon/core/information-circle";
import VideoIcon from "@atlaskit/icon/core/video";
import { useRovoChat } from "@/app/contexts/context-rovo-chat";

export default function FloatingConfluenceActions() {
	const { isOpen } = useRovoChat();

	return (
		<div
			style={{
				position: "fixed",
				bottom: isOpen ? "24px" : "80px", // 24px when chat is open, otherwise 80px (24px + 48px button + 8px gap)
				right: isOpen ? "424px" : "24px", // Move left by 400px (chat panel width) when open
				width: "48px",
				backgroundColor: token("elevation.surface.raised"),
				borderRadius: token("radius.xlarge"),
				display: "flex",
				flexDirection: "column",
				gap: token("space.100"), // 8px
				padding: token("space.100"), // 8px
				zIndex: 500,
				boxShadow: token("elevation.shadow.raised"),
				transition: "bottom 0.15s cubic-bezier(0.4, 0, 0.2, 1), right 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
			}}
		>
			<IconButton icon={CommentIcon} label="Comment" appearance="subtle" spacing="default" shape="default" />
			<IconButton icon={InformationCircleIcon} label="Information" appearance="subtle" spacing="default" shape="default" />
			<IconButton icon={AiGenerativeAudioBriefingIcon} label="Audio briefing" appearance="subtle" spacing="default" shape="default" />
			<IconButton icon={VideoIcon} label="Video" appearance="subtle" spacing="default" shape="default" />
		</div>
	);
}
