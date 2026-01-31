"use client";

import Image from "next/image";
import { token } from "@atlaskit/tokens";
import Button from "@atlaskit/button/new";
import { IconButton } from "@atlaskit/button/new";
import CopyIcon from "@atlaskit/icon/core/copy";
import { WorkItemRow } from "./components/work-item";
import type { WorkItem, WorkItemsData } from "./lib/types";

interface WorkItemsWidgetProps {
	data: WorkItemsData;
	onInsert?: () => void;
	showInsertMenu?: boolean;
	moreMenu?: React.ReactNode;
}

const styles = {
	container: {
		backgroundColor: token("elevation.surface"),
		borderRadius: token("radius.large"),
		overflow: "hidden",
		boxShadow: token("elevation.shadow.raised"),
	},
	header: {
		padding: token("space.150"),
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottom: `1px solid ${token("color.border")}`,
	},
	headerContent: {
		display: "flex",
		alignItems: "center",
		gap: token("space.100"),
	},
	headerTitle: {
		font: token("font.body"),
		color: token("color.text"),
	},
	insertSeparator: {
		height: token("space.200"),
		borderBottom: `1px solid ${token("color.border")}`,
	},
	insertActions: {
		padding: `${token("space.100")} ${token("space.150")} ${token("space.150")}`,
		display: "flex",
		gap: token("space.100"),
	},
	errorState: {
		padding: token("space.150"),
		color: token("color.text.danger"),
	},
} as const;

export default function WorkItemsWidget({ data, onInsert, showInsertMenu, moreMenu }: Readonly<WorkItemsWidgetProps>) {
	if (!data || !data.items || !Array.isArray(data.items)) {
		return <div style={styles.errorState}>Error: Invalid widget data</div>;
	}

	const handleWorkItemClick = (_item: WorkItem) => {
		// Click handler - implement navigation or modal as needed
	};

	const showInsertActions = showInsertMenu ?? Boolean(onInsert);

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<div style={styles.headerContent}>
					<Image src="/Jira.svg" alt="Jira" width={16} height={16} style={{ objectFit: "contain" }} />
					<div style={styles.headerTitle}>
						{data.assignedTo ? `Work items assigned to ${data.assignedTo}` : "Work Items"}
					</div>
				</div>
				{moreMenu}
			</div>

			{data.items.map((item, index) => (
				<WorkItemRow
					key={item.key}
					item={item}
					isLast={index === data.items.length - 1}
					onClick={handleWorkItemClick}
				/>
			))}

			{showInsertActions && onInsert && (
				<>
					<div style={styles.insertSeparator} />
					<div style={styles.insertActions}>
						<Button appearance="default" onClick={onInsert}>
							Insert in page
						</Button>
						<IconButton icon={CopyIcon} label="Copy" appearance="subtle" />
					</div>
				</>
			)}
		</div>
	);
}
