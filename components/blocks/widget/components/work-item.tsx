"use client";

import { token } from "@atlaskit/tokens";
import Lozenge from "@atlaskit/lozenge";
import type { WorkItem } from "../lib/types";

interface WorkItemRowProps {
	item: WorkItem;
	isLast: boolean;
	onClick: (item: WorkItem) => void;
}

const styles = {
	itemBase: {
		padding: `${token("space.100")} ${token("space.150")}`,
		display: "flex",
		flexDirection: "column" as const,
		gap: token("space.075"),
		cursor: "pointer",
	},
	itemRow: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "space-between",
		gap: token("space.100"),
	},
	itemContent: {
		flex: 1,
	},
	itemKeyRow: {
		display: "flex",
		alignItems: "center",
		gap: token("space.100"),
		marginBottom: token("space.050"),
	},
	itemKey: {
		font: token("font.body.small"),
		fontWeight: 600,
		color: token("color.link"),
		fontFamily: "monospace",
	},
	itemSummary: {
		font: token("font.body"),
		fontWeight: 500,
		color: token("color.text"),
	},
	dueDate: {
		font: token("font.body.small"),
		color: token("color.text.subtlest"),
		display: "flex",
		alignItems: "center",
		gap: token("space.050"),
	},
} as const;

const interactiveStyles = {
	hoverBg: token("color.background.neutral.subtle.hovered"),
	focusOutline: `2px solid ${token("color.border.focused")}`,
};

function getStatusAppearance(status: string): "default" | "inprogress" | "success" | "removed" {
	const lowerStatus = status.toLowerCase();
	if (lowerStatus.includes("progress") || lowerStatus.includes("review")) return "inprogress";
	if (lowerStatus.includes("done") || lowerStatus.includes("complete")) return "success";
	if (lowerStatus.includes("blocked")) return "removed";
	return "default";
}

function getPriorityColor(priority?: string) {
	switch (priority) {
		case "High":
			return token("color.text.danger");
		case "Medium":
			return token("color.text.warning");
		case "Low":
			return token("color.text.subtle");
		default:
			return token("color.text.subtle");
	}
}

function formatDate(dateString: string) {
	try {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
	} catch {
		return dateString;
	}
}

export function WorkItemRow({ item, isLast, onClick }: Readonly<WorkItemRowProps>) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick(item);
		}
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={() => onClick(item)}
			onKeyDown={handleKeyDown}
			style={{
				...styles.itemBase,
				borderBottom: isLast ? "none" : `1px solid ${token("color.border")}`,
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.backgroundColor = interactiveStyles.hoverBg;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.backgroundColor = "transparent";
			}}
			onFocus={(e) => {
				e.currentTarget.style.backgroundColor = interactiveStyles.hoverBg;
				e.currentTarget.style.outline = interactiveStyles.focusOutline;
				e.currentTarget.style.outlineOffset = "-2px";
			}}
			onBlur={(e) => {
				e.currentTarget.style.backgroundColor = "transparent";
				e.currentTarget.style.outline = "none";
			}}
		>
			<div style={styles.itemRow}>
				<div style={styles.itemContent}>
					<div style={styles.itemKeyRow}>
						<span style={styles.itemKey}>{item.key}</span>
						{item.priority && (
							<span
								style={{
									fontSize: "10px",
									fontWeight: 600,
									color: getPriorityColor(item.priority),
									textTransform: "uppercase",
									letterSpacing: "0.5px",
								}}
							>
								{item.priority}
							</span>
						)}
					</div>
					<div style={styles.itemSummary}>{item.summary}</div>
				</div>
				<Lozenge appearance={getStatusAppearance(item.status)}>{item.status}</Lozenge>
			</div>
			{item.dueDate && (
				<div style={styles.dueDate}>
					<span>Due:</span>
					<span style={{ fontWeight: 500 }}>{formatDate(item.dueDate)}</span>
				</div>
			)}
		</div>
	);
}
