"use client";

import { token } from "@atlaskit/tokens";
import PageIcon from "@atlaskit/icon/core/page";

interface RecentItemCardProps {
	title: string;
	metadata: string;
	timestamp: string;
	onClick?: () => void;
}

export default function RecentItemCard({
	title,
	metadata,
	timestamp,
	onClick,
}: Readonly<RecentItemCardProps>) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "flex-start",
				gap: "12px",
				padding: "8px 12px",
				borderRadius: "6px",
				cursor: "pointer",
				transition: "background-color 0.2s ease",
			}}
			onMouseEnter={(e) =>
				(e.currentTarget.style.backgroundColor = token("color.background.neutral.subtle.hovered"))
			}
			onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
			onClick={onClick}
		>
			<div style={{ marginTop: "2px" }}>
				<PageIcon label="" color={token("color.icon.accent.blue")} />
			</div>
			<div style={{ flex: 1, minWidth: 0 }}>
				<div style={{ font: token("font.body"), color: token("color.text"), marginBottom: "2px" }}>
					{title}
				</div>
				<div style={{ font: token("font.body.small"), color: token("color.text.subtlest") }}>{metadata}</div>
			</div>
			<div
				style={{
					font: token("font.body.small"),
					color: token("color.text.subtlest"),
					whiteSpace: "nowrap",
				}}
			>
				{timestamp}
			</div>
		</div>
	);
}
