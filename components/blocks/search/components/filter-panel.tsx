"use client";

import React, { useState } from "react";
import Image from "next/image";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import { Text } from "@atlaskit/primitives";

// Icons
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import FeedbackIcon from "@atlaskit/icon/core/feedback";
import GlobeIcon from "@atlaskit/icon/core/globe";
import AppSwitcherIcon from "@atlaskit/icon/core/app-switcher";

// Logos
import { JiraIcon, ConfluenceIcon, BitbucketIcon, CompassIcon, JiraServiceManagementIcon, JiraProductDiscoveryIcon, LoomIcon, AssetsIcon, ProjectsIcon, GoalsIcon, FocusIcon } from "@atlaskit/logo";

/**
 * Filter item data structure
 */
export interface FilterItem {
	id: string;
	name: string;
	icon?: any;
	count?: string;
	actionLabel?: string;
}

/**
 * Props for individual filter item
 */
interface FilterItemProps {
	item: FilterItem;
	isSelected: boolean;
	onClick: () => void;
}

/**
 * Individual filter list item component with selection, hover, and interaction states
 */
const FilterListItem: React.FC<Readonly<FilterItemProps>> = ({ item, isSelected, onClick }) => {
	const [isHovered, setIsHovered] = useState(false);
	const Icon = item.icon;

	// Check if it's a string (image path) or a component
	const isImagePath = typeof Icon === "string";

	// Check if it's a logo component (from @atlaskit/logo)
	const isLogoComponent = Icon === ConfluenceIcon || Icon === JiraIcon || Icon === BitbucketIcon || Icon === CompassIcon || Icon === LoomIcon || Icon === JiraServiceManagementIcon || Icon === JiraProductDiscoveryIcon || Icon === AssetsIcon || Icon === ProjectsIcon || Icon === GoalsIcon || Icon === FocusIcon;

	return (
		<div
			onClick={onClick}
			role="button"
			tabIndex={0}
			aria-pressed={isSelected}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: `${token("space.100")} ${token("space.150")}`,
				cursor: "pointer",
				backgroundColor: isSelected ? token("color.background.selected") : "transparent",
				borderLeft: isSelected ? `3px solid ${token("color.border.brand")}` : "3px solid transparent",
				transition: "background-color 0.15s",
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick();
				}
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: token("space.100"), flex: 1, minWidth: 0 }}>
				{Icon && (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "24px",
							height: "24px",
							flexShrink: 0,
							color: isSelected ? token("color.icon.accent.blue") : "currentColor",
						}}
					>
						{isImagePath ? <Image src={Icon} alt={item.name} width={24} height={24} style={{ objectFit: "contain" }} /> : isLogoComponent ? <Icon appearance="brand" label={item.name} size="small" shouldUseNewLogoDesign /> : <Icon label={item.name} color="currentColor" />}
					</div>
				)}
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						flex: 1,
					}}
				>
					<Text weight="medium" color={isSelected ? "color.text.accent.blue" : "color.text"}>
						{item.name}
					</Text>
				</div>
			</div>

			{/* Show count or more button based on hover and selection state */}
			{item.count && (
				<div style={{ flexShrink: 0, marginLeft: token("space.100") }}>
					{isHovered && !isSelected ? (
						<IconButton
							icon={ShowMoreHorizontalIcon}
							label="More options"
							appearance="subtle"
							spacing="compact"
							onClick={(e) => {
								e.stopPropagation();
								console.log("More options clicked for:", item.name);
							}}
						/>
					) : (
						<Text size="small" color={isSelected ? "color.text.accent.blue" : "color.text.subtlest"} weight="regular">
							{item.count}
						</Text>
					)}
				</div>
			)}

			{item.actionLabel && (
				<div style={{ flexShrink: 0, marginLeft: token("space.100") }}>
					<Text color="color.link" weight="medium">
						{item.actionLabel}
					</Text>
				</div>
			)}
		</div>
	);
};

/**
 * Props for the FilterPanel component
 */
interface FilterPanelProps {
	/** Currently selected filter ID */
	selectedFilter: string;
	/** Callback when a filter is selected */
	onFilterChange: (filterId: string) => void;
}

/**
 * Filter panel component showing product and category filters
 */
export default function FilterPanel({ selectedFilter, onFilterChange }: Readonly<FilterPanelProps>) {
	const [showMoreProducts, setShowMoreProducts] = useState(false);

	// Product filters with correct logo imports
	const productFilters: FilterItem[] = [
		{ id: "all", name: "All", icon: AppSwitcherIcon, count: "15M" },
		{ id: "confluence", name: "Confluence", icon: ConfluenceIcon, count: "2.9M" },
		{ id: "jira", name: "Jira", icon: JiraIcon, count: "2.6M" },
		{ id: "slack", name: "Slack", icon: "/slacklogo.png", count: "3.1M" },
		{ id: "jsm", name: "Jira Service Management", icon: JiraServiceManagementIcon, count: "2M" },
		{ id: "drive", name: "Google Drive", icon: "/googledrive.png", count: "98K" },
		{ id: "loom", name: "Loom", icon: LoomIcon, count: "28K" },
		{ id: "jpd", name: "Jira Product Discovery", icon: JiraProductDiscoveryIcon, count: "47K" },
		{ id: "assets", name: "Assets", icon: AssetsIcon, count: "8K" },
		{ id: "bitbucket", name: "Bitbucket", icon: BitbucketIcon, count: "6.8K" },
		{ id: "compass", name: "Compass", icon: CompassIcon, count: "672" },
		{ id: "gcal", name: "Google Calendar", icon: "/googlecalendar.png", count: "1.3K" },
		{ id: "focus", name: "Focus", icon: FocusIcon, count: "65" },
		{ id: "sharepoint", name: "Microsoft SharePo...", icon: "/integration-icons.png", actionLabel: "Connect" },
		{ id: "teams", name: "Teams", icon: "/integration-icons.png", actionLabel: "Connect" },
		{ id: "miro", name: "Miro", icon: "/miro.png", actionLabel: "Connect" },
	];

	// Category filters with correct logo imports
	const categoryFilters: FilterItem[] = [
		{ id: "projects", name: "Projects", icon: ProjectsIcon },
		{ id: "goals", name: "Goals", icon: GoalsIcon },
		{ id: "webpages", name: "Web pages", icon: GlobeIcon, count: "4.2M" },
	];

	// Display limited products initially, show all when expanded
	const displayedProducts = showMoreProducts ? productFilters : productFilters.slice(0, 13);

	return (
		<div
			style={{
				width: "264px",
				paddingTop: token("space.100"),
				paddingBottom: token("space.100"),
			}}
		>
			<div style={{ display: "flex", flexDirection: "column" }}>
				{/* Product Filters */}
				{displayedProducts.map((item) => (
					<FilterListItem key={item.id} item={item} isSelected={selectedFilter === item.id} onClick={() => onFilterChange(item.id)} />
				))}

				{/* Show more button */}
				{!showMoreProducts && (
					<div
						onClick={() => setShowMoreProducts(true)}
						role="button"
						tabIndex={0}
						aria-label="Show more products"
						style={{
							display: "flex",
							alignItems: "center",
							gap: token("space.150"),
							padding: `${token("space.100")} ${token("space.250")}`,
							cursor: "pointer",
							transition: "background-color 0.15s",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = token("color.background.neutral.subtle.hovered");
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "transparent";
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								setShowMoreProducts(true);
							}
						}}
					>
						<ShowMoreHorizontalIcon label="Show more" color="currentColor" />
						<Text weight="regular" color="color.text">
							Show more
						</Text>
					</div>
				)}

				{/* Divider */}
				<div
					style={{
						height: "1px",
						backgroundColor: token("color.border"),
						margin: `${token("space.150")} 0`,
					}}
				/>

				{/* Category Filters */}
				{categoryFilters.map((item) => (
					<FilterListItem key={item.id} item={item} isSelected={selectedFilter === item.id} onClick={() => onFilterChange(item.id)} />
				))}

				{/* Divider */}
				<div
					style={{
						height: "1px",
						backgroundColor: token("color.border"),
						margin: `${token("space.150")} 0`,
					}}
				/>

				{/* Footer link */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: token("space.100"),
						padding: `${token("space.200")} ${token("space.150")}`,
					}}
				>
					<FeedbackIcon label="Feedback" color="currentColor" />
					<div>
						<Text weight="regular" color="color.text">
							Improve search{" "}
						</Text>
						<Text weight="medium" color="color.link">
							Give feedback
						</Text>
					</div>
				</div>
			</div>
		</div>
	);
}
