"use client";

import React from "react";
import { Stack, Inline } from "@atlaskit/primitives/compiled";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";

import ShareIcon from "@atlaskit/icon/core/share";
import ExpandHorizontalIcon from "@atlaskit/icon/core/expand-horizontal";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import TeamsIcon from "@atlaskit/icon/core/teams";
import GlobeIcon from "@atlaskit/icon/core/globe";
import BoardIcon from "@atlaskit/icon/core/board";
import TableIcon from "@atlaskit/icon/core/table";
import FormIcon from "@atlaskit/icon/core/form";
import PageIcon from "@atlaskit/icon/core/page";
import AttachmentIcon from "@atlaskit/icon/core/attachment";
import CalendarIcon from "@atlaskit/icon/core/calendar";

interface JiraHeaderProps {
	selectedTab: number;
	onTabChange: (tabIndex: number) => void;
}

const JiraHeader: React.FC<JiraHeaderProps> = ({ selectedTab, onTabChange }) => {
	return (
		<div
			style={{
				paddingTop: token("space.200"),
			}}
		>
			<Stack space="space.050">
				{/* Top row: Spaces label and heading with buttons */}
				<div
					style={{
						display: "flex",
						paddingLeft: token("space.300"),
						paddingRight: token("space.300"),
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Stack space="space.025">
						<Text size="medium" color="color.text.subtle" weight="medium">
							Spaces
						</Text>
						<Inline space="space.100" alignBlock="center">
							<img
								src="/Projectavatar.png"
								alt="Project avatar"
								style={{ width: "20px", height: "20px", borderRadius: token("radius.xsmall") }}
							/>
							<Heading size="medium">Vitafleet Q4 launch</Heading>
							<IconButton icon={TeamsIcon} label="Teams" />
							<IconButton icon={ShowMoreHorizontalIcon} label="More options" appearance="subtle" />
						</Inline>
					</Stack>

					<Inline space="space.100">
						<IconButton icon={ShareIcon} label="Share" />
						<IconButton icon={ExpandHorizontalIcon} label="Expand" />
					</Inline>
				</div>

				{/* Tabs */}
				<div>
					<Tabs id="jira-tabs" selected={selectedTab} onChange={onTabChange}>
						<TabList>
							<div style={{ marginLeft: token("space.300") }}>
<Tab>
								<Inline space="space.075" alignBlock="center">
									<GlobeIcon
										label="Summary"
										color={selectedTab === 0 ? token("color.icon.selected") : "currentColor"}
									/>
									<Text weight="medium" color={selectedTab === 0 ? "color.text.selected" : undefined}>
										Summary
									</Text>
								</Inline>
							</Tab>
							</div>
							<Tab>
								<Inline space="space.075" alignBlock="center">
									<BoardIcon
										label="Board"
										color={selectedTab === 1 ? token("color.icon.selected") : "currentColor"}
									/>
									<Text weight="medium" color={selectedTab === 1 ? "color.text.selected" : undefined}>
										Board
									</Text>
								</Inline>
							</Tab>
							<Tab>
								<Inline space="space.075" alignBlock="center">
									<TableIcon
										label="List"
										color={selectedTab === 2 ? token("color.icon.selected") : "currentColor"}
									/>
									<Text weight="medium" color={selectedTab === 2 ? "color.text.selected" : undefined}>
										List
									</Text>
								</Inline>
							</Tab>
							<Tab>
								<Inline space="space.075" alignBlock="center">
									<FormIcon
										label="Forms"
										color={selectedTab === 3 ? token("color.icon.selected") : "currentColor"}
									/>
									<Text weight="medium" color={selectedTab === 3 ? "color.text.selected" : undefined}>
										Forms
									</Text>
								</Inline>
							</Tab>
							<Tab>
								<Inline space="space.075" alignBlock="center">
									<PageIcon
										label="Pages"
										color={selectedTab === 4 ? token("color.icon.selected") : "currentColor"}
									/>
									<Text weight="medium" color={selectedTab === 4 ? "color.text.selected" : undefined}>
										Pages
									</Text>
								</Inline>
							</Tab>
							<Tab>
								<Inline space="space.075" alignBlock="center">
									<AttachmentIcon
										label="Attachments"
										color={selectedTab === 5 ? token("color.icon.selected") : "currentColor"}
									/>
									<Text weight="medium" color={selectedTab === 5 ? "color.text.selected" : undefined}>
										Attachments
									</Text>
								</Inline>
							</Tab>
							<Tab>
								<Inline space="space.075" alignBlock="center">
									<CalendarIcon
										label="Calendar"
										color={selectedTab === 6 ? token("color.icon.selected") : "currentColor"}
									/>
									<Text weight="medium" color={selectedTab === 6 ? "color.text.selected" : undefined}>
										Calendar
									</Text>
								</Inline>
							</Tab>
						</TabList>
						<TabPanel>
							<div style={{ padding: token("space.400") }}>
								<Text weight="medium" color="color.text.subtlest">
									No content here
								</Text>
							</div>
						</TabPanel>
						<TabPanel>
							<div />
						</TabPanel>
						<TabPanel>
							<div style={{ padding: token("space.400") }}>
								<Text color="color.text.subtlest">No content here</Text>
							</div>
						</TabPanel>
						<TabPanel>
							<div style={{ padding: token("space.400") }}>
								<Text color="color.text.subtlest">No content here</Text>
							</div>
						</TabPanel>
						<TabPanel>
							<div style={{ padding: token("space.400") }}>
								<Text color="color.text.subtlest">No content here</Text>
							</div>
						</TabPanel>
						<TabPanel>
							<div style={{ padding: token("space.400") }}>
								<Text color="color.text.subtlest">No content here</Text>
							</div>
						</TabPanel>
						<TabPanel>
							<div style={{ padding: token("space.400") }}>
								<Text color="color.text.subtlest">No content here</Text>
							</div>
						</TabPanel>
					</Tabs>
				</div>
			</Stack>
		</div>
	);
};

export default JiraHeader;
