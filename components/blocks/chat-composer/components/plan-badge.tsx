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
 * Plan mode pill badge shown when plan mode is active.
 * Displays a closeable badge with clipboard icon and "Plan" label.
 */
export default function PlanBadge({ onClose }: Readonly<PlanBadgeProps>) {
	return (
		<div
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: token("space.025"),
				backgroundColor: token("color.background.selected"),
				border: `1px solid ${token("color.border.selected")}`,
				borderRadius: "999px",
				paddingLeft: token("space.150"),
				paddingRight: token("space.050"),
				paddingTop: token("space.050"),
				paddingBottom: token("space.050"),
				overflow: "hidden",
			}}
		>
			<Inline space="space.075" alignBlock="center">
				<ClipboardIcon label="" color={token("color.icon.selected")} />
				<Text size="medium" weight="medium" color="color.text.selected">
					Plan
				</Text>
			</Inline>
			<IconButton
				icon={(iconProps) => (
					<CrossIcon
						{...iconProps}
						color={token("color.icon.selected")}
						size="small"
					/>
				)}
				label="Exit plan mode"
				appearance="subtle"
				spacing="compact"
				shape="circle"
				onClick={onClose}
			/>
		</div>
	);
}
