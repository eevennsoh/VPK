"use client";

import { token } from "@atlaskit/tokens";
import WorkItemsWidget from "@/components/blocks/widget/page";

const sampleData = {
	items: [
		{
			key: "JRA-123",
			summary: "Implement user authentication flow",
			status: "In Progress",
			dueDate: "Jan 30, 2026",
			priority: "High" as const,
		},
		{
			key: "JRA-124",
			summary: "Add dark mode support to dashboard",
			status: "To Do",
			dueDate: "Feb 5, 2026",
			priority: "Medium" as const,
		},
		{
			key: "JRA-125",
			summary: "Fix pagination bug in search results",
			status: "Done",
			priority: "Low" as const,
		},
	],
	assignedTo: "Demo User",
};

export default function WidgetsPage() {
	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundColor: token("color.background.neutral.subtle"),
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "32px 16px",
			}}
		>
			<div style={{ width: "100%", maxWidth: "480px" }}>
				<WorkItemsWidget
					data={sampleData}
					onInsert={() => console.log("Insert clicked")}
					showInsertMenu={true}
				/>
			</div>
		</div>
	);
}
