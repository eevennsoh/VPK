"use client";

import React from "react";
import { Stack, Inline, Flex, Text, Box } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";

import ShareIcon from "@atlaskit/icon/core/share";
import ExpandHorizontalIcon from "@atlaskit/icon/core/expand-horizontal";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import TeamsIcon from "@atlaskit/icon/core/teams";

import { JIRA_TABS } from "../data/tabs";

interface JiraHeaderProps {
	selectedTab: number;
	onTabChange: (tabIndex: number) => void;
}

const JiraHeader: React.FC<Readonly<JiraHeaderProps>> = ({ selectedTab, onTabChange }) => {
	return (
		<Box paddingBlockStart="space.200">
			<Stack space="space.050">
				{/* Top row: Spaces label and heading with buttons */}
				<Flex
					justifyContent="space-between"
					alignItems="center"
					gap="space.100"
				>
					<Box paddingInline="space.300">
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
					</Box>

					<Box paddingInline="space.300">
						<Inline space="space.100">
							<IconButton icon={ShareIcon} label="Share" />
							<IconButton icon={ExpandHorizontalIcon} label="Expand" />
						</Inline>
					</Box>
				</Flex>

				{/* Tabs */}
				<div>
					<Tabs id="jira-tabs" selected={selectedTab} onChange={onTabChange}>
						<TabList>
							{JIRA_TABS.map((tab, index) => {
								const IconComponent = tab.icon;
								const isFirst = index === 0;
								const isSelected = selectedTab === index;

								const tabContent = (
									<Tab key={tab.label}>
										<Inline space="space.075" alignBlock="center">
											<IconComponent
												label={tab.label}
												color={isSelected ? token("color.icon.selected") : "currentColor"}
											/>
											<Text weight="medium" color={isSelected ? "color.text.selected" : undefined}>
												{tab.label}
											</Text>
										</Inline>
									</Tab>
								);

								if (isFirst) {
									return (
										<div key={tab.label} style={{ marginLeft: token("space.300") }}>
											{tabContent}
										</div>
									);
								}

								return tabContent;
							})}
						</TabList>
						{JIRA_TABS.map((tab) => (
							<TabPanel key={tab.label}>
								{tab.hasContent ? (
									<div />
								) : (
									<div style={{ padding: token("space.400") }}>
										<Text weight="medium" color="color.text.subtlest">
											No content here
										</Text>
									</div>
								)}
							</TabPanel>
						))}
					</Tabs>
				</div>
			</Stack>
		</Box>
	);
};

export default JiraHeader;
