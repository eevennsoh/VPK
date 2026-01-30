"use client";

import { ReactNode } from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import { Text, Stack, Inline } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import Link from "@atlaskit/link";
import Avatar from "@atlaskit/avatar";
import Badge from "@atlaskit/badge";
import Lozenge from "@atlaskit/lozenge";
import InlineEdit from "@atlaskit/inline-edit";
import Textfield from "@atlaskit/textfield";

import CrossIcon from "@atlaskit/icon/core/cross";
import ShareIcon from "@atlaskit/icon/core/share";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import LockUnlockedIcon from "@atlaskit/icon/core/lock-unlocked";
import EyeOpenIcon from "@atlaskit/icon/core/eye-open";
import TaskIcon from "@atlaskit/icon/core/task";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";
import AutomationIcon from "@atlaskit/icon/core/automation";
import PriorityMediumIcon from "@atlaskit/icon/core/priority-medium";
import PriorityLowestIcon from "@atlaskit/icon/core/priority-lowest";
import AddIcon from "@atlaskit/icon/core/add";
import AppsIcon from "@atlaskit/icon/core/apps";
import SubtasksIcon from "@atlaskit/icon/core/subtasks";
import SortDescendingIcon from "@atlaskit/icon/core/sort-descending";
import ThumbsUpIcon from "@atlaskit/icon/core/thumbs-up";
import EmojiAddIcon from "@atlaskit/icon/core/emoji-add";
import EditIcon from "@atlaskit/icon/core/edit";
import ReplyLeftIcon from "@atlaskit/icon-lab/core/reply-left";

import { useWorkItemModal } from "@/app/contexts/context-work-item-modal";

// ============================================
// Compound Components for WorkItemModal
// ============================================

/**
 * Backdrop - Modal overlay
 */
function Backdrop() {
	const { meta } = useWorkItemModal();

	return (
		<div
			onClick={meta.onClose}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: token("color.blanket"),
				zIndex: 500,
			}}
		/>
	);
}

/**
 * Container - Main modal container
 */
function Container({ children }: { children: ReactNode }) {
	return (
		<div
			style={{
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				width: "calc(100vw - 120px)",
				maxWidth: "1200px",
				height: "calc(100vh - 120px)",
				backgroundColor: token("elevation.surface.overlay"),
				borderRadius: token("radius.xlarge"),
				boxShadow: token("elevation.shadow.overlay"),
				zIndex: 501,
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}
		>
			{children}
		</div>
	);
}

/**
 * Header - Top header with breadcrumb and action buttons
 */
function Header() {
	const { meta } = useWorkItemModal();
	const { workItem } = meta;

	return (
		<div
			style={{
				height: "32px",
				minHeight: "32px",
				maxHeight: "32px",
				marginTop: token("space.300"),
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				paddingLeft: token("space.300"),
				paddingRight: token("space.300"),
				backgroundColor: token("elevation.surface.overlay"),
			}}
		>
			{/* Left side - Breadcrumb */}
			<Breadcrumbs>
				<BreadcrumbsItem
					href="#"
					text="Vitafleet Q4 launch"
					iconBefore={
						<img
							src="/Projectavatar.png"
							alt="Project"
							style={{
								width: "20px",
								height: "20px",
								borderRadius: token("radius.xsmall"),
								marginRight: token("space.025"),
							}}
						/>
					}
				/>
				<BreadcrumbsItem
					text={workItem.title}
					iconBefore={<TaskIcon label="Task" color={token("color.icon.brand")} />}
				/>
			</Breadcrumbs>

			{/* Right side - Action buttons */}
			<div style={{ display: "flex", gap: token("space.100"), alignItems: "center" }}>
				<IconButton icon={LockUnlockedIcon} label="No restrictions" appearance="default" />
				<Button appearance="default" iconBefore={EyeOpenIcon}>
					1
				</Button>
				<IconButton icon={ShareIcon} label="Share" appearance="default" />
				<IconButton icon={ShowMoreHorizontalIcon} label="Actions" appearance="default" />
				<IconButton icon={CrossIcon} label="Close" appearance="default" onClick={meta.onClose} />
			</div>
		</div>
	);
}

/**
 * TwoColumnLayout - Container for left and right columns
 */
function TwoColumnLayout({ children }: { children: ReactNode }) {
	return (
		<div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
			{children}
		</div>
	);
}

/**
 * LeftColumn - Main content area
 */
function LeftColumn({ children }: { children: ReactNode }) {
	return (
		<div style={{ flex: 1, overflowY: "auto", padding: token("space.400") }}>
			{children}
		</div>
	);
}

/**
 * RightColumn - Sidebar with details
 */
function RightColumn({ children }: { children: ReactNode }) {
	return (
		<div
			style={{
				minWidth: "320px",
				maxWidth: "450px",
				width: "408px",
				overflowY: "auto",
				display: "flex",
				flexDirection: "column",
				paddingLeft: token("space.100"),
				paddingRight: token("space.300"),
			}}
		>
			{children}
		</div>
	);
}

/**
 * Title - Work item title and action buttons
 */
function Title() {
	const { meta } = useWorkItemModal();

	return (
		<div style={{ marginBottom: token("space.200") }}>
			<Heading size="large">{meta.workItem.title}</Heading>
			<div style={{ display: "flex", gap: token("space.100"), marginTop: token("space.100") }}>
				<Button iconBefore={AddIcon} appearance="default">
					Add
				</Button>
				<Button iconBefore={AppsIcon} appearance="default">
					Apps
				</Button>
			</div>
		</div>
	);
}

/**
 * Description - Editable description section
 */
function Description() {
	return (
		<div style={{ marginBottom: token("space.300") }}>
			<Heading size="small" as="h3">
				Description
			</Heading>
			<div style={{ marginTop: token("space.100") }}>
				<InlineEdit
					defaultValue=""
					label="Description"
					editView={(fieldProps) => <Textfield {...fieldProps} />}
					readView={() => (
						<div
							style={{
								padding: token("space.050"),
								marginLeft: token("space.negative.100"),
								borderRadius: token("radius.small"),
								color: token("color.text.subtlest"),
							}}
						>
							<Text color="color.text.subtlest">Edit description</Text>
						</div>
					)}
					onConfirm={() => {}}
				/>
			</div>
		</div>
	);
}

/**
 * ChildItems - Table of child work items with progress
 */
function ChildItems() {
	return (
		<div style={{ marginBottom: token("space.300") }}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: token("space.100"),
				}}
			>
				<Heading size="small" as="h3">
					Child work items
				</Heading>
				<div style={{ display: "flex", gap: token("space.100") }}>
					<IconButton icon={ShowMoreHorizontalIcon} label="Manage" appearance="subtle" spacing="compact" />
					<IconButton icon={AddIcon} label="Add work item" appearance="subtle" spacing="compact" />
				</div>
			</div>

			{/* Progress Bars */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: token("space.200"),
					marginBottom: token("space.100"),
				}}
			>
				<div
					style={{
						flex: 1,
						display: "flex",
						height: "6px",
						borderRadius: token("radius.small"),
						overflow: "hidden",
					}}
				>
					<div
						style={{
							flex: 1,
							backgroundColor: token("color.background.success.bold"),
							borderRadius: `${token("radius.small")} 0 0 ${token("radius.small")}`,
						}}
						title="1 of 3 Done"
					/>
					<div style={{ flex: 1, backgroundColor: token("color.background.information.bold") }} title="1 of 3 In progress" />
					<div
						style={{
							flex: 1,
							backgroundColor: token("color.border"),
							borderRadius: `0 ${token("radius.small")} ${token("radius.small")} 0`,
						}}
						title="1 of 3 To do"
					/>
				</div>
				<Text>33% Done</Text>
			</div>

			{/* Table */}
			<div
				style={{
					border: `1px solid ${token("color.border")}`,
					borderRadius: token("radius.medium"),
					overflow: "hidden",
				}}
			>
				{/* Table Header */}
				<div
					style={{
						display: "flex",
						backgroundColor: token("elevation.surface.sunken"),
						borderBottom: `1px solid ${token("color.border")}`,
						padding: "0 8px",
						fontWeight: "medium",
					}}
				>
					<div style={{ width: "32px", padding: token("space.100"), display: "flex", alignItems: "center" }}>
						<Text size="small" weight="semibold" color="color.text">Type</Text>
					</div>
					<div style={{ width: "80px", padding: token("space.100"), borderLeft: `1px solid ${token("color.border")}` }}>
						<Text size="small" weight="semibold" color="color.text">Key</Text>
					</div>
					<div style={{ flex: 1, padding: token("space.100"), borderLeft: `1px solid ${token("color.border")}` }}>
						<Text size="small" weight="semibold" color="color.text">Summary</Text>
					</div>
					<div style={{ width: "32px", padding: token("space.100"), borderLeft: `1px solid ${token("color.border")}` }}>
						<Text size="small" weight="semibold" color="color.text">Priority</Text>
					</div>
					<div style={{ width: "32px", padding: token("space.100"), borderLeft: `1px solid ${token("color.border")}` }}>
						<Text size="small" weight="semibold" color="color.text">Assignee</Text>
					</div>
					<div style={{ width: "120px", padding: token("space.100"), borderLeft: `1px solid ${token("color.border")}` }}>
						<Text size="small" weight="semibold" color="color.text">Status</Text>
					</div>
				</div>

				{/* Row 1 */}
				<div style={{ display: "flex", padding: "0 8px" }}>
					<div style={{ width: "32px", padding: token("space.100"), display: "flex", alignItems: "center", justifyContent: "center" }}>
						<SubtasksIcon label="Sub-task" color={token("color.icon.information")} />
					</div>
					<div style={{ width: "80px", padding: token("space.100") }}>
						<Link href="#">BG-1</Link>
					</div>
					<div style={{ flex: 1, padding: token("space.100") }}>
						<Link href="#">Update header logo to svg</Link>
					</div>
					<div style={{ width: "32px", padding: token("space.100"), display: "flex", alignItems: "center", justifyContent: "center" }}>
						<PriorityMediumIcon label="Medium" color={token("color.icon.information")} />
					</div>
					<div style={{ width: "32px", padding: token("space.100"), display: "flex", alignItems: "center", justifyContent: "center" }}>
						<Avatar size="small" />
					</div>
					<div style={{ width: "120px", padding: token("space.100"), display: "flex", alignItems: "center" }}>
						<Lozenge appearance="inprogress">IN Progress</Lozenge>
					</div>
				</div>

				{/* Row 2 */}
				<div style={{ display: "flex", padding: "0 8px" }}>
					<div style={{ width: "32px", padding: token("space.100"), display: "flex", alignItems: "center", justifyContent: "center" }}>
						<SubtasksIcon label="Sub-task" color={token("color.icon.information")} />
					</div>
					<div style={{ width: "80px", padding: token("space.100") }}>
						<Link href="#">BG-2</Link>
					</div>
					<div style={{ flex: 1, padding: token("space.100") }}>
						<Link href="#">[UI] Toggle to enable/disable Autofix</Link>
					</div>
					<div style={{ width: "32px", padding: token("space.100"), display: "flex", alignItems: "center", justifyContent: "center" }}>
						<PriorityLowestIcon label="Lowest" color={token("color.icon.subtle")} />
					</div>
					<div style={{ width: "32px", padding: token("space.100"), display: "flex", alignItems: "center", justifyContent: "center" }}>
						<Avatar size="small" />
					</div>
					<div style={{ width: "120px", padding: token("space.100"), display: "flex", alignItems: "center" }}>
						<Lozenge appearance="default">To do</Lozenge>
					</div>
				</div>
			</div>
		</div>
	);
}

/**
 * Attachments - File attachments carousel
 */
function Attachments() {
	const files = [
		{ name: "Background001", ext: "png", date: "17 Mar 2025, 09:12 AM", color: token("color.background.success") },
		{ name: "NewerBackground001", ext: "png", date: "17 Mar 2025, 09:12 AM", color: token("color.background.warning") },
		{ name: "Background002", ext: "png", date: "17 Mar 2025, 09:12 AM", color: token("color.background.discovery") },
	];

	return (
		<div style={{ marginBottom: token("space.300") }}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: token("space.100"),
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
					<Heading size="small" as="h3">Attachments</Heading>
					<Badge appearance="default">5</Badge>
				</div>
				<div style={{ display: "flex", gap: token("space.100") }}>
					<IconButton icon={ShowMoreHorizontalIcon} label="Manage" appearance="subtle" spacing="compact" />
					<IconButton icon={AddIcon} label="Add attachment" appearance="subtle" spacing="compact" />
				</div>
			</div>

			<div
				style={{
					display: "flex",
					gap: token("space.050"),
					overflowX: "auto",
					padding: token("space.025"),
				}}
			>
				{files.map((file, i) => (
					<div
						key={i}
						style={{
							width: "160px",
							flexShrink: 0,
							borderRadius: token("radius.medium"),
							overflow: "hidden",
							boxShadow: token("elevation.shadow.raised"),
						}}
					>
						<div style={{ height: "88px", backgroundColor: file.color }} />
						<div style={{ padding: token("space.050"), backgroundColor: token("elevation.surface") }}>
							<div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
								<Text size="small" weight="bold">{file.name}.{file.ext}</Text>
							</div>
							<div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
								<Text size="small" color="color.text">{file.date}</Text>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

/**
 * Activity - Comments and activity feed
 */
function Activity() {
	return (
		<div style={{ marginBottom: token("space.300") }}>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
				<Heading size="small" as="h3">Activity</Heading>
			</div>

			{/* Filter Buttons */}
			<div
				style={{
					borderRadius: token("radius.small"),
					border: `1px solid ${token("color.border")}`,
					display: "flex",
					gap: token("space.050"),
					marginBottom: token("space.200"),
					overflowX: "auto",
					padding: token("space.050"),
				}}
			>
				{["All", "Comments", "History", "Work log"].map((filter, i) => (
					<Button key={i} appearance="subtle" spacing="compact" isSelected={filter === "Comments"}>
						{filter}
					</Button>
				))}
				<IconButton icon={SortDescendingIcon} label="Reverse sort order" appearance="subtle" spacing="compact" />
			</div>

			{/* Add Comment Section */}
			<div style={{ display: "flex", gap: token("space.100"), marginBottom: token("space.200") }}>
				<Avatar size="small" src="/people/Avatar-1.png" />
				<div style={{ flex: 1 }}>
					<div style={{ marginBottom: token("space.100") }}>
						<Textfield placeholder="Add a comment" aria-label="Add comment" />
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: token("space.050"),
							fontSize: "12px",
							color: token("color.text.subtlest"),
						}}
					>
						<Text size="small">Pro tip:</Text>
						<div
							style={{
								border: `1px solid ${token("color.border")}`,
								borderRadius: token("radius.medium"),
								padding: "0px 4px",
								fontSize: "12px",
								fontWeight: "600",
							}}
						>
							M
						</div>
						<Text size="small">to comment</Text>
					</div>
				</div>
			</div>

			{/* Comments */}
			<CommentThread />
		</div>
	);
}

/**
 * CommentThread - Individual comment with replies
 */
function CommentThread() {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: token("space.200") }}>
			<div style={{ padding: token("space.100") }}>
				<div style={{ display: "flex", gap: token("space.100") }}>
					<Avatar size="small" src="/people/Avatar-1.png" />
					<div style={{ flex: 1 }}>
						<div style={{ marginBottom: token("space.050") }}>
							<Text weight="semibold">Maia Ma</Text>
							<div>
								<Text size="small" color="color.text.subtlest">15 minutes ago</Text>
							</div>
						</div>
						<Text color="color.text.subtle">
							Project comment perspective visual card easy list of lists free. Plan files stickers real time Trello Gold visual organize list of lists.
						</Text>
						<CommentActions />
					</div>
				</div>

				{/* Reply */}
				<div
					style={{
						marginLeft: "40px",
						marginTop: token("space.150"),
						paddingLeft: token("space.150"),
						borderLeft: `1px solid ${token("color.border")}`,
					}}
				>
					<div style={{ display: "flex", gap: token("space.100") }}>
						<Avatar size="small" src="/people/Avatar-2.png" />
						<div style={{ flex: 1 }}>
							<div style={{ marginBottom: token("space.050") }}>
								<Text weight="semibold">Priya Hansra</Text>
								<div>
									<Text size="small" color="color.text.subtlest">10 minutes ago</Text>
								</div>
							</div>
							<Text color="color.text.subtle">
								With large teams we have the potential to have a relationship with every traveler who travels with Beyond Gravity.
							</Text>
							<CommentActions />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/**
 * CommentActions - Action buttons for comments
 */
function CommentActions() {
	return (
		<div style={{ display: "flex", gap: token("space.100"), marginTop: token("space.100") }}>
			<IconButton
				icon={(iconProps) => <ReplyLeftIcon {...iconProps} color={token("color.icon.subtlest")} />}
				label="Reply"
				appearance="subtle"
				spacing="compact"
			/>
			<IconButton
				icon={(iconProps) => <ThumbsUpIcon {...iconProps} color={token("color.icon.subtlest")} />}
				label="Thumbs up"
				appearance="subtle"
				spacing="compact"
			/>
			<IconButton
				icon={(iconProps) => <EmojiAddIcon {...iconProps} color={token("color.icon.subtlest")} />}
				label="Add reaction"
				appearance="subtle"
				spacing="compact"
			/>
			<IconButton
				icon={(iconProps) => <EditIcon {...iconProps} color={token("color.icon.subtlest")} />}
				label="Edit"
				appearance="subtle"
				spacing="compact"
			/>
			<IconButton
				icon={(iconProps) => <ShowMoreHorizontalIcon {...iconProps} color={token("color.icon.subtlest")} />}
				label="More actions"
				appearance="subtle"
				spacing="compact"
			/>
		</div>
	);
}

/**
 * StatusHeader - Backlog button and automation icon
 */
function StatusHeader() {
	return (
		<div style={{ padding: "12px 0px 8px" }}>
			<Inline space="space.100" alignBlock="center">
				<Button appearance="default" iconAfter={(iconProps) => <ChevronDownIcon {...iconProps} size="small" />}>
					Backlog
				</Button>
				<IconButton icon={AutomationIcon} label="Automation" appearance="default" />
			</Inline>
		</div>
	);
}

/**
 * DetailsAccordion - Collapsible details section
 */
function DetailsAccordion() {
	const { state, actions } = useWorkItemModal();

	return (
		<div style={{ border: `1px solid ${token("color.border")}`, borderRadius: token("radius.medium") }}>
			<div style={{ padding: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Heading size="small">Details</Heading>
				<IconButton
					icon={state.isDetailsOpen ? ChevronUpIcon : ChevronDownIcon}
					label={state.isDetailsOpen ? "Collapse" : "Expand"}
					appearance="subtle"
					onClick={actions.toggleDetails}
				/>
			</div>

			{state.isDetailsOpen && (
				<Stack space="space.0">
					<div style={{ padding: "8px 12px" }}>
						<DetailRow label="Assignee">
							<Inline space="space.100" alignBlock="center">
								<Avatar size="small" />
								<Text weight="medium">Unassigned</Text>
							</Inline>
							<div style={{ paddingTop: "4px", paddingLeft: "8px" }}>
								<Link href="#">Assign to me</Link>
							</div>
						</DetailRow>

						<DetailRow label="Reporter">
							<Inline space="space.100" alignBlock="center">
								<Avatar size="small" src="/people/Avatar-1.png" />
								<Text weight="medium">Giannis Antetokounmpo</Text>
							</Inline>
						</DetailRow>

						<DetailRow label="Priority">
							<Inline space="space.100" alignBlock="center">
								<PriorityMediumIcon label="Medium priority" color={token("color.icon.information")} />
								<Text weight="medium">Medium</Text>
							</Inline>
						</DetailRow>

						<DetailRow label="Start date">
							<Text>Mar 14, 2025</Text>
						</DetailRow>

						<DetailRow label="Parent">
							<Link href="#">BG-6</Link>
						</DetailRow>

						<DetailRow label="Labels" noPadding>
							<div style={{ display: "flex", flexWrap: "wrap", gap: token("space.100"), paddingTop: "6px" }}>
								<LabelTag>wcag21</LabelTag>
								<LabelTag>Team25</LabelTag>
							</div>
						</DetailRow>
					</div>
				</Stack>
			)}
		</div>
	);
}

/**
 * DetailRow - Single row in details section
 */
function DetailRow({ label, children, noPadding }: { label: string; children: ReactNode; noPadding?: boolean }) {
	return (
		<div style={{ paddingBottom: noPadding ? 0 : "12px" }}>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div style={{ width: "126px", display: "flex", alignItems: "center" }}>
					<Text weight="medium" color="color.text.subtlest">{label}</Text>
				</div>
				<div style={{ flex: 1, padding: "0 8px" }}>{children}</div>
			</div>
		</div>
	);
}

/**
 * LabelTag - Label badge
 */
function LabelTag({ children }: { children: string }) {
	return (
		<span
			style={{
				padding: "2px 4px",
				fontSize: "14px",
				border: `1px solid ${token("color.border")}`,
				borderRadius: token("radius.medium"),
				backgroundColor: "transparent",
			}}
		>
			{children}
		</span>
	);
}

/**
 * MoreFieldsAccordion - Collapsible more fields section
 */
function MoreFieldsAccordion() {
	const { state, actions } = useWorkItemModal();

	return (
		<div style={{ border: `1px solid ${token("color.border")}`, borderRadius: token("radius.medium") }}>
			<div style={{ padding: "8px" }}>
				<Inline space="space.100" alignBlock="center" spread="space-between">
					<Inline space="space.100" alignBlock="center">
						<Heading size="small">More fields</Heading>
						<Text size="small" color="color.text.subtlest">Approvers</Text>
					</Inline>
					<IconButton
						icon={state.isMoreFieldsOpen ? ChevronUpIcon : ChevronDownIcon}
						label={state.isMoreFieldsOpen ? "Collapse" : "Expand"}
						appearance="subtle"
						onClick={actions.toggleMoreFields}
					/>
				</Inline>
			</div>

			{state.isMoreFieldsOpen && (
				<div style={{ padding: "8px 12px 12px" }}>
					<Stack space="space.100">
						<div>
							<Text weight="medium" color="color.text.subtlest">Approvers</Text>
							<div style={{ marginTop: "4px" }}>
								<Inline space="space.100" alignBlock="center">
									<Avatar size="small" src="/people/Avatar-1.png" />
									<Text>John Smith</Text>
								</Inline>
							</div>
						</div>
						<div>
							<Text weight="medium" color="color.text.subtlest">Story Points</Text>
							<div style={{ marginTop: "4px" }}>
								<Text>5</Text>
							</div>
						</div>
					</Stack>
				</div>
			)}
		</div>
	);
}

/**
 * AutomationAccordion - Collapsible automation section
 */
function AutomationAccordion() {
	const { state, actions } = useWorkItemModal();

	return (
		<div style={{ border: `1px solid ${token("color.border")}`, borderRadius: token("radius.medium") }}>
			<div style={{ padding: "8px" }}>
				<Inline space="space.100" alignBlock="center" spread="space-between">
					<Inline space="space.100" alignBlock="center">
						<Heading size="small">Automation</Heading>
						<Text size="small" color="color.text.subtlest">Rule executions</Text>
					</Inline>
					<IconButton
						icon={state.isAutomationOpen ? ChevronUpIcon : ChevronDownIcon}
						label={state.isAutomationOpen ? "Collapse" : "Expand"}
						appearance="subtle"
						onClick={actions.toggleAutomation}
					/>
				</Inline>
			</div>

			{state.isAutomationOpen && (
				<div style={{ padding: "8px 12px 12px" }}>
					<Stack space="space.150">
						<div>
							<div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
								<AutomationIcon label="Automation" color={token("color.icon.success")} />
								<Text weight="medium">Auto-assign rule</Text>
							</div>
							<Text size="small" color="color.text.subtlest">Last executed: 2 hours ago</Text>
						</div>
						<div>
							<div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
								<AutomationIcon label="Automation" color={token("color.icon.success")} />
								<Text weight="medium">Status transition</Text>
							</div>
							<Text size="small" color="color.text.subtlest">Last executed: 5 days ago</Text>
						</div>
					</Stack>
				</div>
			)}
		</div>
	);
}

/**
 * SidebarStack - Wrapper for sidebar accordions
 */
function SidebarStack({ children }: { children: ReactNode }) {
	return <Stack space="space.100">{children}</Stack>;
}

// ============================================
// Compound Component Export
// ============================================

const WorkItemModal = {
	Backdrop,
	Container,
	Header,
	TwoColumnLayout,
	LeftColumn,
	RightColumn,
	Title,
	Description,
	ChildItems,
	Attachments,
	Activity,
	StatusHeader,
	DetailsAccordion,
	MoreFieldsAccordion,
	AutomationAccordion,
	SidebarStack,
	DetailRow,
	LabelTag,
	CommentThread,
	CommentActions,
};

export default WorkItemModal;
