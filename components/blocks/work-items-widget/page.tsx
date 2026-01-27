'use client';

import React from 'react';
import Image from 'next/image';
import { token } from '@atlaskit/tokens';
import Lozenge from '@atlaskit/lozenge';
import Button from '@atlaskit/button/new';
import { IconButton } from '@atlaskit/button/new';
import CopyIcon from '@atlaskit/icon/core/copy';

interface WorkItem {
	key: string;
	summary: string;
	status: string;
	dueDate?: string;
	priority?: 'High' | 'Medium' | 'Low';
}

interface WorkItemsWidgetProps {
	data: {
		items: WorkItem[];
		assignedTo?: string;
	};
	onInsert?: () => void;
	showInsertMenu?: boolean;
	moreMenu?: React.ReactNode;
}

// Hoisted static styles - prevents object recreation on each render
const styles = {
	container: {
		backgroundColor: token('elevation.surface'),
		borderRadius: token('radius.large'),
		overflow: 'hidden',
		boxShadow: token('elevation.shadow.raised'),
	},
	header: {
		padding: token('space.150'),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottom: `1px solid ${token('color.border')}`,
	},
	headerContent: {
		display: 'flex',
		alignItems: 'center',
		gap: token('space.100'),
	},
	headerTitle: {
		font: token('font.body'),
		color: token('color.text'),
	},
	itemBase: {
		padding: `${token('space.100')} ${token('space.150')}`,
		display: 'flex',
		flexDirection: 'column' as const,
		gap: token('space.075'),
		cursor: 'pointer',
	},
	itemRow: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		gap: token('space.100'),
	},
	itemContent: {
		flex: 1,
	},
	itemKeyRow: {
		display: 'flex',
		alignItems: 'center',
		gap: token('space.100'),
		marginBottom: token('space.050'),
	},
	itemKey: {
		font: token('font.body.small'),
		fontWeight: 600,
		color: token('color.link'),
		fontFamily: 'monospace',
	},
	itemSummary: {
		font: token('font.body'),
		fontWeight: 500,
		color: token('color.text'),
	},
	dueDate: {
		font: token('font.body.small'),
		color: token('color.text.subtlest'),
		display: 'flex',
		alignItems: 'center',
		gap: token('space.050'),
	},
	insertSeparator: {
		height: token('space.200'),
		borderBottom: `1px solid ${token('color.border')}`,
	},
	insertActions: {
		padding: `${token('space.100')} ${token('space.150')} ${token('space.150')}`,
		display: 'flex',
		gap: token('space.100'),
	},
	errorState: {
		padding: token('space.150'),
		color: token('color.text.danger'),
	},
} as const;

// Interactive state values
const interactiveStyles = {
	hoverBg: token('color.background.neutral.subtle.hovered'),
	focusOutline: `2px solid ${token('color.border.focused')}`,
};

export default function WorkItemsWidget({ data, onInsert, showInsertMenu, moreMenu }: WorkItemsWidgetProps) {
	if (!data || !data.items || !Array.isArray(data.items)) {
		return <div style={styles.errorState}>Error: Invalid widget data</div>;
	}

	const getStatusAppearance = (status: string): 'default' | 'inprogress' | 'success' | 'removed' => {
		const lowerStatus = status.toLowerCase();
		if (lowerStatus.includes('progress') || lowerStatus.includes('review')) return 'inprogress';
		if (lowerStatus.includes('done') || lowerStatus.includes('complete')) return 'success';
		if (lowerStatus.includes('blocked')) return 'removed';
		return 'default';
	};

	const getPriorityColor = (priority?: string) => {
		switch (priority) {
			case 'High':
				return token('color.text.danger');
			case 'Medium':
				return token('color.text.warning');
			case 'Low':
				return token('color.text.subtle');
			default:
				return token('color.text.subtle');
		}
	};

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date);
		} catch {
			return dateString;
		}
	};

	const handleWorkItemClick = (item: WorkItem) => {
		// Handle work item click - can be extended to navigate or show details
		console.log('Work item clicked:', item.key);
	};

	const handleWorkItemKeyDown = (e: React.KeyboardEvent, item: WorkItem) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleWorkItemClick(item);
		}
	};

	const showInsertActions = showInsertMenu ?? Boolean(onInsert);

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<div style={styles.headerContent}>
					<Image src="/Jira.svg" alt="Jira" width={16} height={16} style={{ objectFit: 'contain' }} />
					<div style={styles.headerTitle}>
						{data.assignedTo ? `Work items assigned to ${data.assignedTo}` : 'Work Items'}
					</div>
				</div>
				{moreMenu}
			</div>

			{data.items.map((item, index) => (
				<div
					key={index}
					role="button"
					tabIndex={0}
					onClick={() => handleWorkItemClick(item)}
					onKeyDown={(e) => handleWorkItemKeyDown(e, item)}
					style={{
						...styles.itemBase,
						borderBottom: index < data.items.length - 1 ? `1px solid ${token('color.border')}` : 'none',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = interactiveStyles.hoverBg;
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'transparent';
					}}
					onFocus={(e) => {
						e.currentTarget.style.backgroundColor = interactiveStyles.hoverBg;
						e.currentTarget.style.outline = interactiveStyles.focusOutline;
						e.currentTarget.style.outlineOffset = '-2px';
					}}
					onBlur={(e) => {
						e.currentTarget.style.backgroundColor = 'transparent';
						e.currentTarget.style.outline = 'none';
					}}
				>
					<div style={styles.itemRow}>
						<div style={styles.itemContent}>
							<div style={styles.itemKeyRow}>
								<span style={styles.itemKey}>{item.key}</span>
								{item.priority && (
									<span
										style={{
											fontSize: '10px',
											fontWeight: 600,
											color: getPriorityColor(item.priority),
											textTransform: 'uppercase',
											letterSpacing: '0.5px',
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
