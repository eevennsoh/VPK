"use client";

import { token } from "@atlaskit/tokens";
import { Inline, Text } from "@atlaskit/primitives";
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
 * Displays a closeable badge with clipboard icon and "Plan" label in brand blue.
 */
export default function PlanBadge({ onClose }: Readonly<PlanBadgeProps>) {
	return (
		<div
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: token("space.025"),
				backgroundColor: token("elevation.surface"),
				border: `1px solid ${token("color.border.brand")}`,
				borderRadius: token("radius.full"),
				paddingLeft: token("space.150"),
				paddingRight: token("space.050"),
				paddingTop: token("space.050"),
				paddingBottom: token("space.050"),
				overflow: "hidden",
			}}
		>
		<Inline space="space.075" alignBlock="center">
			<ClipboardIcon label="Plan mode" size="small" color={token("color.icon.brand")} />
			<Text size="medium" weight="medium" color="color.text.brand">
				Plan
			</Text>
		</Inline>
		<button
			type="button"
			aria-label="Exit plan mode"
			onClick={onClose}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "24px",
				height: "24px",
				padding: "0",
				border: "none",
				background: "transparent",
				borderRadius: token("radius.full"),
				cursor: "pointer",
			}}
		>
			<CrossIcon label="" size="small" color={token("color.icon.brand")} />
		</button>
		</div>
	);
}
