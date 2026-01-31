"use client";

import { token } from "@atlaskit/tokens";
import SearchIcon from "@atlaskit/icon/core/search";

interface SearchAllAppsFooterProps {
	onClick?: () => void;
}

export default function SearchAllAppsFooter({ onClick }: Readonly<SearchAllAppsFooterProps>) {
	return (
		<div
			style={{
				marginTop: "8px",
				padding: "8px 8px",
				borderTop: `1px solid ${token("color.border")}`,
			}}
		>
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
				<SearchIcon label="" color={token("color.icon")} />
				<div style={{ flex: 1 }}>
					<div style={{ font: token("font.body"), color: token("color.text") }}>Search all apps</div>
				</div>
			</div>
		</div>
	);
}
