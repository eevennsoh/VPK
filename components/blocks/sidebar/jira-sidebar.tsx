"use client";

import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import Image from "next/image";
import PersonAvatarIcon from "@atlaskit/icon/core/person-avatar";
import ClockIcon from "@atlaskit/icon/core/clock";
import StarUnstarredIcon from "@atlaskit/icon/core/star-unstarred";
import AppsIcon from "@atlaskit/icon/core/apps";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import AlignTextLeftIcon from "@atlaskit/icon/core/align-text-left";
import DashboardIcon from "@atlaskit/icon/core/dashboard";
import SpacesIcon from "@atlaskit/icon-lab/core/spaces";
import PlanIcon from "@atlaskit/icon-lab/core/plan";
import { ConfluenceIcon, LoomIcon, GoalsIcon, TeamsIcon } from "@atlaskit/logo";
import { NavigationItem, NavigationItemWithHoverChevron, Divider } from "./shared";

const ConfluenceLogo = ({ label }: { label: string; color?: string }) => (
	<ConfluenceIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />
);

const LoomLogoWrapper = ({ label }: { label: string; color?: string }) => (
	<LoomIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />
);

const GoalsLogo = ({ label }: { label: string; color?: string }) => (
	<GoalsIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />
);

const TeamsLogo = ({ label }: { label: string; color?: string }) => (
	<TeamsIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />
);

interface JiraSidebarProps {
	selectedItem: string;
	onSelectItem: (item: string) => void;
}

export function JiraSidebar({ selectedItem, onSelectItem }: JiraSidebarProps) {
	const [isSpacesExpanded, setIsSpacesExpanded] = useState(true);

	return (
		<>
			{/* Personal navigation items */}
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

			{/* Apps section */}
			<NavigationItemWithHoverChevron
				icon={AppsIcon}
				label="Apps"
				isExpanded={false}
				onClick={() => onSelectItem("Apps")}
			/>

			{/* Plans section */}
			<NavigationItemWithHoverChevron
				icon={PlanIcon}
				label="Plans"
				isExpanded={false}
				hasActions={true}
				onClick={() => onSelectItem("Plans")}
			/>

			{/* Spaces section */}
			<NavigationItemWithHoverChevron
				icon={SpacesIcon}
				label="Spaces"
				isExpanded={isSpacesExpanded}
				hasActions={true}
				onClick={() => setIsSpacesExpanded(!isSpacesExpanded)}
			/>

			{/* Starred projects subsection - only visible when Spaces is expanded */}
			{isSpacesExpanded && (
				<>
					<div
						style={{
							fontSize: "11px",
							fontWeight: 600,
							color: token("color.text.subtlest"),
							paddingLeft: token("space.150"),
							paddingTop: token("space.050"),
							paddingBottom: token("space.050"),
							letterSpacing: "0.5px",
						}}
					>
						Starred
					</div>
					<div style={{ paddingLeft: token("space.150") }}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								padding: token("space.050"),
								borderRadius: token("radius.xsmall"),
								cursor: "pointer",
								backgroundColor:
									selectedItem === "Vitafleet Q4 Launch"
										? token("color.background.accent.blue.subtlest")
										: "transparent",
								position: "relative",
								gap: token("space.025"),
								minHeight: "32px",
							}}
							onClick={() => onSelectItem("Vitafleet Q4 Launch")}
						>
							{/* Selected indicator */}
							{selectedItem === "Vitafleet Q4 Launch" && (
								<div
									style={{
										position: "absolute",
										left: 0,
										top: "50%",
										transform: "translateY(-50%)",
										width: "2px",
										height: "12px",
										backgroundColor: token("color.border.selected"),
										borderRadius: token("radius.xsmall"),
									}}
								/>
							)}

							{/* Project image */}
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: "24px",
									height: "24px",
									marginLeft: token("space.025"),
									borderRadius: token("radius.small"),
									overflow: "hidden",
								}}
							>
								<Image src="/Projectavatar.png" alt="" width={24} height={24} />
							</div>

							{/* Label */}
							<span
								style={{
									font: token("font.body"),
									fontWeight: token("font.weight.medium"),
									color:
										selectedItem === "Vitafleet Q4 Launch"
											? token("color.text.selected")
											: token("color.text.subtle"),
									flex: 1,
									paddingLeft: token("space.025"),
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								Vitafleet Q4 Launch
							</span>
						</div>

						<div
							style={{
								display: "flex",
								alignItems: "center",
								padding: token("space.050"),
								borderRadius: token("radius.xsmall"),
								cursor: "pointer",
								gap: token("space.025"),
								minHeight: "32px",
							}}
							onClick={() => onSelectItem("Customer Portal")}
						>
							{/* Project image */}
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: "24px",
									height: "24px",
									marginLeft: token("space.025"),
									borderRadius: token("radius.small"),
									overflow: "hidden",
								}}
							>
								<Image src="/Project-1.png" alt="" width={24} height={24} />
							</div>

							{/* Label */}
							<span
								style={{
									font: token("font.body"),
									fontWeight: token("font.weight.medium"),
									color: token("color.text.subtle"),
									flex: 1,
									paddingLeft: token("space.025"),
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								Customer Portal
							</span>
						</div>

						<div
							style={{
								display: "flex",
								alignItems: "center",
								padding: token("space.050"),
								borderRadius: token("radius.xsmall"),
								cursor: "pointer",
								gap: token("space.025"),
								minHeight: "32px",
							}}
							onClick={() => onSelectItem("VitaFleet Research Team")}
						>
							{/* Project image */}
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: "24px",
									height: "24px",
									marginLeft: token("space.025"),
									borderRadius: token("radius.small"),
									overflow: "hidden",
								}}
							>
								<Image src="/Project-2.png" alt="" width={24} height={24} />
							</div>

							{/* Label */}
							<span
								style={{
									font: token("font.body"),
									fontWeight: token("font.weight.medium"),
									color: token("color.text.subtle"),
									flex: 1,
									paddingLeft: token("space.025"),
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								VitaFleet Research Team
							</span>
						</div>
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

			{/* External links */}
			<NavigationItem
				icon={ConfluenceLogo}
				label="Confluence"
				href="/confluence"
				hasExternalLink
				onClick={() => onSelectItem("Confluence")}
			/>
			<NavigationItem
				icon={LoomLogoWrapper}
				label="Loom"
				hasExternalLink
				onClick={() => onSelectItem("Loom")}
			/>
			<NavigationItem
				icon={GoalsLogo}
				label="Goals"
				hasExternalLink
				onClick={() => onSelectItem("Goals")}
			/>
			<NavigationItem
				icon={TeamsLogo}
				label="Teams"
				hasExternalLink
				onClick={() => onSelectItem("Teams")}
			/>

			<Divider />

			{/* More */}
			<NavigationItem
				icon={ShowMoreHorizontalIcon}
				label="More"
				onClick={() => onSelectItem("More")}
			/>
		</>
	);
}
