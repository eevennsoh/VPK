"use client";

import { useState } from "react";
import { token } from "@atlaskit/tokens";
import PersonAvatarIcon from "@atlaskit/icon/core/person-avatar";
import ClockIcon from "@atlaskit/icon/core/clock";
import StarUnstarredIcon from "@atlaskit/icon/core/star-unstarred";
import AppsIcon from "@atlaskit/icon/core/apps";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import AlignTextLeftIcon from "@atlaskit/icon/core/align-text-left";
import DashboardIcon from "@atlaskit/icon/core/dashboard";
import SpacesIcon from "@atlaskit/icon-lab/core/spaces";
import PlanIcon from "@atlaskit/icon-lab/core/plan";
import { NavigationItem } from "../components/navigation-item";
import { NavigationItemWithHoverChevron } from "../components/navigation-item-with-hover-chevron";
import { Divider } from "../components/divider";
import { ProjectItem } from "../components/project-item";
import { SectionHeading } from "../components/section-heading";
import { STARRED_PROJECTS, JIRA_EXTERNAL_LINKS } from "../data/jira-navigation";

interface JiraSidebarProps {
	selectedItem: string;
	onSelectItem: (item: string) => void;
}

export function JiraSidebar({
	selectedItem,
	onSelectItem,
}: Readonly<JiraSidebarProps>) {
	const [isSpacesExpanded, setIsSpacesExpanded] = useState(true);

	return (
		<>
			<NavigationItem
				icon={PersonAvatarIcon}
				label="For you"
				isSelected={selectedItem === "For you"}
				onClick={() => onSelectItem("For you")}
			/>
			<NavigationItem
				icon={ClockIcon}
				label="Recent"
				hasChevron
				onClick={() => onSelectItem("Recent")}
			/>
			<NavigationItem
				icon={StarUnstarredIcon}
				label="Starred"
				hasChevron
				onClick={() => onSelectItem("Starred")}
			/>

			<NavigationItemWithHoverChevron
				icon={AppsIcon}
				label="Apps"
				isExpanded={false}
				onClick={() => onSelectItem("Apps")}
			/>

			<NavigationItemWithHoverChevron
				icon={PlanIcon}
				label="Plans"
				isExpanded={false}
				hasActions={true}
				onClick={() => onSelectItem("Plans")}
			/>

			<NavigationItemWithHoverChevron
				icon={SpacesIcon}
				label="Spaces"
				isExpanded={isSpacesExpanded}
				hasActions={true}
				onClick={() => setIsSpacesExpanded(!isSpacesExpanded)}
			/>

			{isSpacesExpanded && (
				<>
					<SectionHeading>Starred</SectionHeading>
					<div style={{ paddingLeft: token("space.150") }}>
						{STARRED_PROJECTS.map((project) => (
							<ProjectItem
								key={project.id}
								name={project.name}
								imageSrc={project.imageSrc}
								isSelected={selectedItem === project.name}
								onClick={() => onSelectItem(project.name)}
							/>
						))}
					</div>

					<div style={{ paddingLeft: token("space.150") }}>
						<NavigationItem
							icon={AlignTextLeftIcon}
							label="View all plans"
							onClick={() => onSelectItem("View all plans")}
						/>
					</div>
					<NavigationItem
						icon={DashboardIcon}
						label="Dashboards"
						onClick={() => onSelectItem("Dashboards")}
					/>
				</>
			)}

			<Divider />

			{JIRA_EXTERNAL_LINKS.map((link) => (
				<NavigationItem
					key={link.id}
					icon={link.icon}
					label={link.label}
					href={link.href}
					hasExternalLink
					onClick={() => onSelectItem(link.label)}
				/>
			))}

			<Divider />

			<NavigationItem
				icon={ShowMoreHorizontalIcon}
				label="More"
				onClick={() => onSelectItem("More")}
			/>
		</>
	);
}
