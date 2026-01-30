"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import BoardColumn from "./board-column";
import KanbanCard from "./kanban-card";

interface BoardColumnsContainerProps {
	onCardClick: (title: string, code: string) => void;
}

const BoardColumnsContainer: React.FC<BoardColumnsContainerProps> = ({ onCardClick }) => {
	return (
		<div
			style={{
				flex: 1,
				paddingBlock: token("space.200"),
				paddingInline: token("space.300"),
				overflowX: "auto",
				overflowY: "hidden",
				minHeight: 0,
			}}
		>
			<div style={{ display: "flex", gap: token("space.150"), height: "100%" }}>
				<BoardColumn title="Backlog" count={20}>
					<KanbanCard
						title="[Jira Experiment] Gather Feedback"
						code="CAID-118"
						tags={[
							{ text: "rovo-search", color: "blue" },
							{ text: "jira", color: "purple" },
						]}
						priority="major"
						avatarSrc="/people/Avatar-1.png"
						onClick={() => onCardClick("[Jira Experiment] Gather Feedback", "CAID-118")}
					/>
					<KanbanCard
						title="SATN Knowledge new design"
						code="CAID-341"
						tags={[
							{ text: "search", color: "teal" },
							{ text: "design", color: "magenta" },
						]}
						priority="medium"
						avatarSrc="/people/Avatar-2.png"
						onClick={() => onCardClick("SATN Knowledge new design", "CAID-341")}
					/>
					<KanbanCard
						title="SATN Actions"
						code="CAID-382"
						tags={[
							{ text: "search", color: "teal" },
							{ text: "actions", color: "orange" },
						]}
						priority="minor"
						avatarSrc="/people/Avatar-3.png"
						onClick={() => onCardClick("SATN Actions", "CAID-382")}
					/>
					<KanbanCard
						title="SATN AI Search - Discovery"
						code="CAID-383"
						tags={[
							{ text: "search", color: "teal" },
							{ text: "ai", color: "purple" },
							{ text: "discovery", color: "lime" },
						]}
						priority="minor"
						avatarSrc="/people/Avatar-4.png"
						onClick={() => onCardClick("SATN AI Search - Discovery", "CAID-383")}
					/>
				</BoardColumn>

				<BoardColumn title="Planning" count={27}>
					<KanbanCard
						title="Atlassian Search + Pricing and Packaging for TWC"
						code="CAID-136"
						priority="minor"
						tags={[
							{ text: "pricing", color: "green" },
							{ text: "twc", color: "yellow" },
						]}
						avatarSrc="/people/Avatar-5.png"
						onClick={() => onCardClick("Atlassian Search + Pricing and Packaging for TWC", "CAID-136")}
					/>
					<KanbanCard
						title="Rovo Search: Personalized filters in Full Page Search"
						code="CAID-143"
						priority="major"
						tags={[
							{ text: "rovo", color: "blue" },
							{ text: "search", color: "teal" },
						]}
						avatarSrc="/people/Avatar-6.png"
						onClick={() => onCardClick("Rovo Search: Personalized filters in Full Page Search", "CAID-143")}
					/>
					<KanbanCard
						title="TIP Action Plan"
						code="CAID-174"
						priority="major"
						tags={[{ text: "planning", color: "orange" }]}
						avatarSrc="/people/Avatar-7.png"
						onClick={() => onCardClick("TIP Action Plan", "CAID-174")}
					/>
					<KanbanCard
						title="Rovo 2.0 Shift & Brand Uplift"
						code="CAID-202"
						priority="minor"
						tags={[
							{ text: "rovo", color: "blue" },
							{ text: "brand", color: "magenta" },
						]}
						avatarSrc="/people/Avatar-8.png"
						onClick={() => onCardClick("Rovo 2.0 Shift & Brand Uplift", "CAID-202")}
					/>
				</BoardColumn>

				<BoardColumn title="In Progress" count={54}>
					<KanbanCard
						title="3P Connectors"
						code="CAID-11"
						priority="major"
						tags={[
							{ text: "connectors", color: "purple" },
							{ text: "integration", color: "lime" },
						]}
						avatarSrc="/people/Avatar-9.png"
						onClick={() => onCardClick("3P Connectors", "CAID-11")}
					/>
					<KanbanCard
						title="Rovo Search"
						code="CAID-12"
						priority="medium"
						tags={[
							{ text: "rovo", color: "blue" },
							{ text: "search", color: "teal" },
						]}
						avatarSrc="/people/Avatar-10.png"
						onClick={() => onCardClick("Rovo Search", "CAID-12")}
					/>
					<KanbanCard
						title="Topics, Definitions, Knowledge Cards"
						code="CAID-14"
						priority="minor"
						tags={[
							{ text: "knowledge", color: "green" },
							{ text: "rovo", color: "blue" },
						]}
						avatarSrc="/people/Avatar-1.png"
						onClick={() => onCardClick("Topics, Definitions, Knowledge Cards", "CAID-14")}
					/>
					<KanbanCard
						title="Enriched search (related widgets)"
						code="CAID-68"
						priority="medium"
						tags={[
							{ text: "search", color: "teal" },
							{ text: "widgets", color: "orange" },
						]}
						avatarSrc="/people/Avatar-2.png"
						onClick={() => onCardClick("Enriched search (related widgets)", "CAID-68")}
					/>
				</BoardColumn>

				<BoardColumn title="In Review" count={4}>
					<KanbanCard
						title="Content Guidelines"
						code="CAID-454"
						priority="major"
						tags={[
							{ text: "documentation", color: "grey" },
							{ text: "guidelines", color: "yellow" },
						]}
						avatarSrc="/people/Avatar-3.png"
						onClick={() => onCardClick("Content Guidelines", "CAID-454")}
					/>
					<KanbanCard
						title="/ commands in editor and command K showing skills"
						code="CAID-474"
						priority="major"
						tags={[
							{ text: "editor", color: "red" },
							{ text: "rovo", color: "blue" },
							{ text: "commands", color: "purple" },
						]}
						avatarSrc="/people/Avatar-4.png"
						onClick={() => onCardClick("/ commands in editor and command K showing skills", "CAID-474")}
					/>
					<KanbanCard
						title="Agent skills, slash commands and other"
						code="CAID-486"
						priority="medium"
						tags={[
							{ text: "ai-agents", color: "purple" },
							{ text: "rovo", color: "blue" },
						]}
						avatarSrc="/people/Avatar-5.png"
						onClick={() => onCardClick("Agent skills, slash commands and other", "CAID-486")}
					/>
					<KanbanCard
						title="Long running AI tasks"
						code="CAID-488"
						priority="major"
						tags={[
							{ text: "ai", color: "purple" },
							{ text: "performance", color: "orange" },
						]}
						avatarSrc="/people/Avatar-6.png"
						onClick={() => onCardClick("Long running AI tasks", "CAID-488")}
					/>
				</BoardColumn>

				<BoardColumn title="Done" count={236}>
					<KanbanCard
						title="AI Platform BB: Proactive Edit Suggestions in Confluence Editor"
						code="CAID-1"
						priority="minor"
						tags={[
							{ text: "ai", color: "purple" },
							{ text: "confluence", color: "blue" },
						]}
						avatarSrc="/people/Avatar-7.png"
						onClick={() =>
							onCardClick("AI Platform BB: Proactive Edit Suggestions in Confluence Editor", "CAID-1")
						}
					/>
					<KanbanCard
						title="Confluence AI 3 Year Vision v2"
						code="CAID-3"
						priority="medium"
						tags={[
							{ text: "vision", color: "magenta" },
							{ text: "ai", color: "purple" },
						]}
						avatarSrc="/people/Avatar-8.png"
						onClick={() => onCardClick("Confluence AI 3 Year Vision v2", "CAID-3")}
					/>
					<KanbanCard
						title="Rovo branded product experiences and entry points"
						code="CAID-8"
						priority="medium"
						tags={[
							{ text: "rovo", color: "blue" },
							{ text: "brand", color: "magenta" },
							{ text: "ux", color: "lime" },
						]}
						avatarSrc="/people/Avatar-9.png"
						onClick={() => onCardClick("Rovo branded product experiences and entry points", "CAID-8")}
					/>
					<KanbanCard
						title="Admin Experiences for Rovo Search"
						code="CAID-10"
						priority="major"
						tags={[
							{ text: "admin", color: "red" },
							{ text: "rovo", color: "blue" },
						]}
						avatarSrc="/people/Avatar-10.png"
						onClick={() => onCardClick("Admin Experiences for Rovo Search", "CAID-10")}
					/>
				</BoardColumn>

				{/* Spacer for right padding */}
				<div style={{ minWidth: "24px", width: "24px", flexShrink: 0 }} />
			</div>
		</div>
	);
};

export default BoardColumnsContainer;
