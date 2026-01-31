"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import { Inline } from "@atlaskit/primitives";
import Button, { IconButton } from "@atlaskit/button/new";
import AlignTextLeftIcon from "@atlaskit/icon/core/align-text-left";
import CrossIcon from "@atlaskit/icon/core/cross";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import GrowHorizontalIcon from "@atlaskit/icon/core/grow-horizontal";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import TextDensityCompressIcon from "@atlaskit/icon-lab/core/text-density-compress";
import TaskToDoIcon from "@atlaskit/icon/core/task-to-do";
import ImageIcon from "@atlaskit/icon/core/image";
import RovoIcon from "@atlaskit/icon-lab/core/rovo";

interface TitleActionBarProps {
	isVisible: boolean;
}

export default function TitleActionBar({ isVisible }: Readonly<TitleActionBarProps>) {
	return (
		<div
			style={{
				height: "32px",
				display: "flex",
				alignItems: "center",
				marginLeft: token("space.negative.050"),
				opacity: isVisible ? 1 : 0,
				visibility: isVisible ? "visible" : "hidden",
				transition: "opacity 0.2s ease, visibility 0.2s ease",
				overflow: "visible",
			}}
		>
			<Inline alignBlock="center">
				{/* Alignment dropdown */}
				{/* @ts-ignore */}
				<Button
					appearance="subtle"
					iconBefore={(iconProps) => <AlignTextLeftIcon {...iconProps} />}
					iconAfter={(iconProps) => <ChevronDownIcon {...iconProps} size="small" />}
				/>

				{/* Remove emoji button */}
				{/* @ts-ignore */}
				<Button
					appearance="subtle"
					iconBefore={(iconProps) => <CrossIcon {...iconProps} size="small" />}
				>
					Remove emoji
				</Button>

				{/* Status button */}
				{/* @ts-ignore */}
				<Button
					appearance="subtle"
					iconBefore={(iconProps) => <TaskToDoIcon {...iconProps} />}
				>
					Status
				</Button>

				{/* Header image button */}
				{/* @ts-ignore */}
				<Button
					appearance="subtle"
					iconBefore={(iconProps) => <ImageIcon {...iconProps} />}
				>
					Header image
				</Button>

				{/* Suggest title button */}
				{/* @ts-ignore */}
				<Button
					appearance="subtle"
					iconBefore={(iconProps) => <RovoIcon {...iconProps} />}
				>
					Suggest title
				</Button>

				{/* Text density button */}
				{/* @ts-ignore */}
				<IconButton appearance="subtle" icon={TextDensityCompressIcon} label="Text density" />

				{/* Width dropdown */}
				{/* @ts-ignore */}
				<Button
					appearance="subtle"
					iconBefore={(iconProps) => <GrowHorizontalIcon {...iconProps} />}
					iconAfter={(iconProps) => <ChevronDownIcon {...iconProps} size="small" />}
				/>

				{/* Voice typing button */}
				{/* @ts-ignore */}
				<Button
					appearance="subtle"
					iconBefore={(iconProps) => <MicrophoneIcon {...iconProps} />}
				>
					Voice typing
				</Button>
			</Inline>
		</div>
	);
}
