"use client";

import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import Image from "next/image";
import PersonAvatarIcon from "@atlaskit/icon/core/person-avatar";
import ClockIcon from "@atlaskit/icon/core/clock";
import StarUnstarredIcon from "@atlaskit/icon/core/star-unstarred";
import GlobeIcon from "@atlaskit/icon/core/globe";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import LinkExternalIcon from "@atlaskit/icon/core/link-external";
import PagesIcon from "@atlaskit/icon/core/pages";
import WhiteboardIcon from "@atlaskit/icon/core/whiteboard";
import DatabaseIcon from "@atlaskit/icon/core/database";
import CommentIcon from "@atlaskit/icon/core/comment";
import CalendarIcon from "@atlaskit/icon/core/calendar";
import QuotationMarkIcon from "@atlaskit/icon/core/quotation-mark";
import AppsIcon from "@atlaskit/icon/core/apps";
import AddIcon from "@atlaskit/icon/core/add";
import SearchIcon from "@atlaskit/icon/core/search";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import FolderOpenIcon from "@atlaskit/icon/core/folder-open";
import TextField from "@atlaskit/textfield";
import { JiraIcon, LoomIcon, GoalsIcon, TeamsIcon } from "@atlaskit/logo";
import { NavigationItem } from "../components/navigation-item";
import { NavigationItemWithHoverChevron } from "../components/navigation-item-with-hover-chevron";
import { Divider } from "../components/divider";

// Logo wrapper components
const JiraLogo = ({ label }: { label: string; color?: string }) => <JiraIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />;

const LoomLogoWrapper = ({ label }: { label: string; color?: string }) => <LoomIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />;

const GoalsLogo = ({ label }: { label: string; color?: string }) => <GoalsIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />;

const TeamsLogo = ({ label }: { label: string; color?: string }) => <TeamsIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />;

interface ConfluenceSidebarProps {
	selectedItem: string;
	onSelectItem: (item: string) => void;
}

export function ConfluenceSidebar({ selectedItem, onSelectItem }: Readonly<ConfluenceSidebarProps>) {
	const [isContentExpanded, setIsContentExpanded] = useState(true);
	const [searchValue, setSearchValue] = useState("");

	return (
		<>
			{/* Global navigation */}
			<NavigationItem icon={PersonAvatarIcon} label="For you" isSelected={selectedItem === "For you"} onClick={() => onSelectItem("For you")} />
			<NavigationItem icon={ClockIcon} label="Recent" hasChevron onClick={() => onSelectItem("Recent")} />
			<NavigationItem icon={StarUnstarredIcon} label="Starred" hasChevron onClick={() => onSelectItem("Starred")} />
			<NavigationItem icon={GlobeIcon} label="Spaces" hasChevron onClick={() => onSelectItem("Spaces")} />

			<Divider />

			{/* Space navigation - Vitafleet */}
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
			>
				{/* Space logo */}
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
					<Image src="/Projectavatar.png" alt="" width={20} height={20} />
				</div>

				{/* Space name */}
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
					Vitafleet
				</span>

				{/* Actions */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: token("space.050"),
						marginRight: token("space.025"),
					}}
				>
					<ShowMoreHorizontalIcon label="More" color={token("color.icon.subtle")} size="small" />
				</div>
			</div>

			<div style={{ height: token("space.100") }} />

			{/* Shortcuts section */}
			<NavigationItem icon={LinkExternalIcon} label="Shortcuts" onClick={() => onSelectItem("Shortcuts")} />

			{/* Content section - expanded */}
			<NavigationItemWithHoverChevron icon={PagesIcon} label="Content" isExpanded={isContentExpanded} hasActions={true} onClick={() => setIsContentExpanded(!isContentExpanded)} />

			{/* Content tree - visible when expanded */}
			{isContentExpanded && (
				<div style={{ paddingLeft: token("space.100") }}>
					{/* Search field */}
					<div
						style={{
							padding: `${token("space.100")} ${token("space.150")} ${token("space.100")} 0`,
						}}
					>
						<style>{`
              .sidebar-search-field input {
                font: ${token("font.body")} !important;
                height: 32px !important;
                box-sizing: border-box !important;
              }
              .sidebar-search-field > div {
                height: 32px !important;
              }
            `}</style>
						<div className="sidebar-search-field">
							<TextField
								placeholder="Search by title"
								value={searchValue}
								onChange={(e) => setSearchValue((e.target as HTMLInputElement).value)}
								elemBeforeInput={
									<div
										style={{
											display: "flex",
											alignItems: "center",
											paddingLeft: token("space.100"),
										}}
									>
										<SearchIcon label="Search" color={token("color.icon.subtle")} />
									</div>
								}
							/>
						</div>
					</div>

					{/* FY26 Planning - expanded */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							padding: token("space.050"),
							borderRadius: token("radius.xsmall"),
							cursor: "pointer",
							backgroundColor: "transparent",
							position: "relative",
							gap: token("space.025"),
							minHeight: "32px",
							marginLeft: "-16px",
						}}
						onClick={() => {}}
					>
						{/* Chevron down on the left */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "24px",
								height: "24px",
								marginLeft: token("space.025"),
							}}
						>
							<ChevronDownIcon label="Expanded" color={token("color.icon.subtle")} size="small" />
						</div>

						{/* Folder icon */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<FolderOpenIcon label="FY26 Planning" color={token("color.icon.subtle")} />
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
							FY26 Planning
						</span>
					</div>

					{/* Nested pages */}
					<div style={{ paddingLeft: token("space.150") }}>
						<NavigationItem icon={PagesIcon} label="Demo Live page" isSelected={selectedItem === "Demo Live page"} onClick={() => onSelectItem("Demo Live page")} />
						<NavigationItem icon={WhiteboardIcon} label="Goals Brainstorm" onClick={() => onSelectItem("Goals Brainstorm")} />
						<NavigationItem icon={WhiteboardIcon} label="Trend Research" onClick={() => onSelectItem("Trend Research")} />
						<NavigationItem icon={DatabaseIcon} label="Financial Forecast" onClick={() => onSelectItem("Financial Forecast")} />
					</div>

					{/* Create button */}
					<div style={{ paddingLeft: token("space.150") }}>
						<NavigationItem icon={AddIcon} label="Create" onClick={() => {}} />
					</div>
				</div>
			)}

			{/* Other expandable sections */}
			<NavigationItemWithHoverChevron icon={QuotationMarkIcon} label="Blogs" isExpanded={false} onClick={() => {}} />
			<NavigationItemWithHoverChevron icon={CommentIcon} label="Questions" isExpanded={false} onClick={() => {}} />
			<NavigationItemWithHoverChevron icon={CalendarIcon} label="Calendars" isExpanded={false} onClick={() => {}} />
			<NavigationItemWithHoverChevron icon={AppsIcon} label="Space apps" isExpanded={false} onClick={() => {}} />

			<Divider />

			{/* External links */}
			<NavigationItem icon={JiraLogo} label="Jira" href="/jira" hasExternalLink onClick={() => onSelectItem("Jira")} />
			<NavigationItem icon={LoomLogoWrapper} label="Loom" hasExternalLink onClick={() => onSelectItem("Loom")} />
			<NavigationItem icon={GoalsLogo} label="Goals" hasExternalLink onClick={() => onSelectItem("Goals")} />
			<NavigationItem icon={TeamsLogo} label="Teams" hasExternalLink onClick={() => onSelectItem("Teams")} />

			<Divider />

			{/* More */}
			<NavigationItem icon={ShowMoreHorizontalIcon} label="More" onClick={() => onSelectItem("More")} />
		</>
	);
}
