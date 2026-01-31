"use client";

import { token } from "@atlaskit/tokens";
import ClockIcon from "@atlaskit/icon/core/clock";

interface RecentSearchItemProps {
	query: string;
	onClick?: () => void;
}

export default function RecentSearchItem({ query, onClick }: Readonly<RecentSearchItemProps>) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
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
			<ClockIcon label="" color={token("color.icon.subtle")} />
			<div style={{ flex: 1 }}>
				<div style={{ font: token("font.body"), color: token("color.text") }}>{query}</div>
			</div>
			<div
				style={{
					font: token("font.body.small"),
					color: token("color.text.subtlest"),
					whiteSpace: "nowrap",
				}}
			>
				Recent search
			</div>
		</div>
	);
}
