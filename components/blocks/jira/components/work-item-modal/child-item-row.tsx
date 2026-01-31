"use client";

import { token } from "@atlaskit/tokens";
import Link from "@atlaskit/link";
import Avatar from "@atlaskit/avatar";
import Lozenge, { type ThemeAppearance } from "@atlaskit/lozenge";

import PriorityMediumIcon from "@atlaskit/icon/core/priority-medium";
import PriorityLowestIcon from "@atlaskit/icon/core/priority-lowest";
import SubtasksIcon from "@atlaskit/icon/core/subtasks";

type Priority = "medium" | "lowest";
type Status = "inprogress" | "todo" | "done";

interface ChildItemRowProps {
	itemKey: string;
	summary: string;
	priority: Priority;
	status: Status;
}

function getPriorityIcon(priority: Priority) {
	if (priority === "medium") {
		return <PriorityMediumIcon label="Medium" color={token("color.icon.information")} />;
	}
	return <PriorityLowestIcon label="Lowest" color={token("color.icon.subtle")} />;
}

function getStatusConfig(status: Status): { appearance: ThemeAppearance; label: string } {
	switch (status) {
		case "inprogress":
			return { appearance: "inprogress", label: "IN Progress" };
		case "done":
			return { appearance: "success", label: "Done" };
		default:
			return { appearance: "default", label: "To do" };
	}
}

export function ChildItemRow({ itemKey, summary, priority, status }: Readonly<ChildItemRowProps>) {
	const priorityIcon = getPriorityIcon(priority);
	const statusConfig = getStatusConfig(status);

	return (
		<div style={{ display: "flex", padding: "0 8px" }}>
			<div
				style={{
					width: "32px",
					padding: token("space.100"),
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<SubtasksIcon label="Sub-task" color={token("color.icon.information")} />
			</div>
			<div style={{ width: "80px", padding: token("space.100") }}>
				<Link href="#">{itemKey}</Link>
			</div>
			<div style={{ flex: 1, padding: token("space.100") }}>
				<Link href="#">{summary}</Link>
			</div>
			<div
				style={{
					width: "32px",
					padding: token("space.100"),
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{priorityIcon}
			</div>
			<div
				style={{
					width: "32px",
					padding: token("space.100"),
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Avatar size="small" />
			</div>
			<div style={{ width: "120px", padding: token("space.100"), display: "flex", alignItems: "center" }}>
				<Lozenge appearance={statusConfig.appearance}>{statusConfig.label}</Lozenge>
			</div>
		</div>
	);
}
