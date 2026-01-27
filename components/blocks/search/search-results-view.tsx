"use client";

import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import SearchResultCard from "./search-result-card";
import AISummaryPanel from "./ai-summary-panel";
import FilterPanel from "./filter-panel";

// Icons
import FilterIcon from "@atlaskit/icon/core/filter";
import CalendarIcon from "@atlaskit/icon/core/calendar";
import FileIcon from "@atlaskit/icon/core/file";
import PersonIcon from "@atlaskit/icon/core/person";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import PagesIcon from "@atlaskit/icon/core/pages";
import WhiteboardIcon from "@atlaskit/icon/core/whiteboard";
import GoalIcon from "@atlaskit/icon/core/goal";
import TableIcon from "@atlaskit/icon/core/table";

// Mock search results for "OKRs 2026 planning process"
const mockResults = [
	{
		id: 1,
		title: "2026 OKR planning",
		type: "confluence",
		icon: PagesIcon,
		iconColor: token("color.icon.information"), // Blue
		metadata: ["Confluence", "Page", "CTO Strategic Initiatives", "Updated 7 months ago"],
		excerpt: "...The purpose of this section is to capture our work related to crafting KRs and OKRs for our L2 and L3 objectives for 2026...",
	},
	{
		id: 2,
		title: "OKRs Framework for 2026 Planning Process",
		type: "confluence",
		icon: PagesIcon,
		iconColor: token("color.icon.success"), // Green
		metadata: ["Confluence", "Page", "Product Strategy", "Updated 5 months ago"],
		excerpt: "...This document outlines the OKRs framework we will use throughout 2026. The planning process begins in Q4 2025 and continues quarterly...",
	},
	{
		id: 3,
		title: "2026 Annual Planning: OKR Alignment Workshop",
		type: "confluence",
		icon: WhiteboardIcon,
		iconColor: token("color.icon.discovery"), // Purple
		metadata: ["Confluence", "Whiteboard", "Leadership Team", "Updated 6 months ago"],
		excerpt: "...Workshop outcomes for aligning departmental OKRs with company objectives for 2026. Key results include defining measurable outcomes for the planning process...",
	},
	{
		id: 4,
		title: "Engineering OKRs - 2026 Planning Cycle",
		type: "confluence",
		icon: GoalIcon,
		iconColor: token("color.icon.warning"), // Orange
		metadata: ["Confluence", "Page", "Engineering", "Updated 4 months ago"],
		excerpt: "...Engineering team OKRs for 2026, including technical debt reduction, platform modernization, and developer experience improvements tied to the planning process...",
	},
	{
		id: 5,
		title: "Q1 2026 OKR Planning Session Notes",
		type: "confluence",
		icon: PagesIcon,
		iconColor: token("color.icon.danger"), // Red
		metadata: ["Confluence", "Page", "Product Management", "Updated 3 months ago"],
		excerpt: "...Notes from the Q1 2026 planning session covering OKR definitions, success metrics, and alignment with annual goals. The process involved cross-functional collaboration...",
	},
	{
		id: 6,
		title: "OKR Template - 2026 Planning",
		type: "confluence",
		icon: TableIcon,
		iconColor: token("color.icon.information"), // Blue
		metadata: ["Confluence", "Template", "Operations", "Updated 8 months ago"],
		excerpt: "...Standardized template for creating OKRs during the 2026 planning process. Includes sections for objectives, key results, initiatives, and success criteria...",
	},
	{
		id: 7,
		title: "Sales & Marketing OKRs: 2026 Annual Plan",
		type: "confluence",
		icon: GoalIcon,
		iconColor: token("color.icon.success"), // Green
		metadata: ["Confluence", "Page", "Sales & Marketing", "Updated 5 months ago"],
		excerpt: "...2026 OKRs focused on revenue growth, market expansion, and customer acquisition. The planning process incorporates feedback from 2025 retrospectives...",
	},
	{
		id: 8,
		title: "HR & People Ops: 2026 OKR Planning",
		type: "confluence",
		icon: PagesIcon,
		iconColor: token("color.icon.discovery"), // Purple
		metadata: ["Confluence", "Page", "Human Resources", "Updated 6 months ago"],
		excerpt: "...People operations OKRs for 2026 including talent acquisition, employee engagement, and organizational development goals aligned with the company planning process...",
	},
	{
		id: 9,
		title: "Finance OKRs - 2026 Budget Planning",
		type: "confluence",
		icon: TableIcon,
		iconColor: token("color.icon.warning"), // Orange
		metadata: ["Confluence", "Page", "Finance", "Updated 7 months ago"],
		excerpt: "...Financial objectives and key results for 2026 including cost optimization, revenue targets, and investment priorities. The planning process aligns with board expectations...",
	},
	{
		id: 10,
		title: "Customer Success: 2026 OKR Strategic Planning",
		type: "confluence",
		icon: GoalIcon,
		iconColor: token("color.icon.danger"), // Red
		metadata: ["Confluence", "Page", "Customer Success", "Updated 4 months ago"],
		excerpt: "...OKRs focused on customer retention, satisfaction scores, and expansion revenue for 2026. The planning process includes quarterly business reviews and success metrics...",
	},
];

export default function SearchResultsView() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const searchTerms = ["OKR", "OKRs", "2026", "planning"]; // Only bold these keywords

	// Filter results based on selected filter
	const filteredResults = selectedFilter === "all" ? mockResults : mockResults.filter((result) => result.type === selectedFilter);

	return (
		<div style={{ height: "calc(100vh - 48px)", display: "flex", flexDirection: "column" }}>
			{/* Filter Buttons Section */}
			<div
				style={{
					paddingTop: token("space.200"),
					paddingBottom: token("space.200"),
					display: "flex",
					justifyContent: "center",
					borderBottom: `1px solid ${token("color.border")}`,
				}}
			>
				<div style={{ width: "1104px", display: "flex", gap: token("space.100"), paddingLeft: "8px", paddingRight: "8px" }}>
					{/* Filter icon button */}
					<IconButton icon={FilterIcon} label="Filter" appearance="subtle" />

					{/* Last updated button */}
					<Button appearance="default" iconBefore={CalendarIcon} iconAfter={(iconProps) => <ChevronDownIcon {...iconProps} />}>
						Last updated
					</Button>

					{/* Type button */}
					<Button appearance="default" iconBefore={FileIcon} iconAfter={(iconProps) => <ChevronDownIcon {...iconProps} />}>
						Type
					</Button>

					{/* Contributor button */}
					<Button appearance="default" iconBefore={PersonIcon} iconAfter={(iconProps) => <ChevronDownIcon {...iconProps} />}>
						Contributor
					</Button>
				</div>
			</div>

			{/* Main Content - Two Column Layout */}
			<div
				style={{
					flex: 1,
					display: "flex",
					justifyContent: "center",
					overflowY: "auto",
				}}
			>
				<div
					style={{
						width: "1104px",
						paddingLeft: "8px",
						paddingRight: "8px",
						display: "flex",
						gap: "64px",
						paddingTop: token("space.200"),
					}}
				>
					{/* Left Column - Results */}
					<div
						style={{
							width: "768px",
							paddingTop: token("space.100"),
							paddingBottom: "20px",
						}}
					>
						<div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
							{/* AI Summary Panel */}
							<AISummaryPanel defaultExpanded={false} />

							{filteredResults.map((result) => (
								<SearchResultCard
									key={result.id}
									icon={result.icon}
									iconColor={result.iconColor}
									title={result.title}
									metadata={result.metadata}
									excerpt={result.excerpt}
									searchTerms={searchTerms}
									onClick={() => {
										console.log("Clicked result:", result.title);
									}}
								/>
							))}
						</div>
					</div>

					{/* Right Column - Filters */}
					<FilterPanel selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
				</div>
			</div>
		</div>
	);
}
