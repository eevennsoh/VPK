"use client";

import { token } from "@atlaskit/tokens";
import { Inline, Text } from "@atlaskit/primitives";
import { IconButton } from "@atlaskit/button/new";
import ClipboardIcon from "@atlaskit/icon/core/clipboard";
import CrossIcon from "@atlaskit/icon/core/cross";

export interface PlanBadgeProps {
	/**
	 * Callback when the close button is clicked to exit plan mode
	 */
	onClose: () => void;
}

/**
 * "Deep research" pill badge shown when plan mode is active.
 * Displays a closeable badge with clipboard icon and label.
 */
export default function PlanBadge({ onClose }: PlanBadgeProps) {
	return (
		<div
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: token("space.025"),
				backgroundColor: token("elevation.surface"),
				border: `1px solid ${token("color.border")}`,
				borderRadius: "999px",
				paddingLeft: token("space.150"),
				paddingRight: token("space.050"),
				paddingTop: token("space.050"),
				paddingBottom: token("space.050"),
			}}
		>
			<Inline space="space.075" alignBlock="center">
				<ClipboardIcon label="" size="small" color={token("color.icon")} />
				<Text size="medium" weight="medium">
					Deep research
				</Text>
			</Inline>
			<IconButton
				icon={CrossIcon}
				label="Exit plan mode"
				appearance="subtle"
				spacing="compact"
				onClick={onClose}
			/>
		</div>
	);
}
