"use client";

import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import { Text, Stack, Inline, Box } from "@atlaskit/primitives";

import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import AiChatIcon from "@atlaskit/icon/core/ai-chat";
import Tag from "@atlaskit/tag";
import Link from "@atlaskit/link";

import CollapsedSummary from "./collapsed-summary";
import SourcesCarousel from "./sources-carousel";
import SummaryFooter from "./summary-footer";
import { MOCK_SOURCES, SUMMARY_ITEMS, SUGGESTED_QUESTIONS } from "../data/ai-summary-data";

interface AISummaryPanelProps {
	defaultExpanded?: boolean;
}

export default function AISummaryPanel({ defaultExpanded = true }: Readonly<AISummaryPanelProps>): React.ReactElement {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);

	function handleToggle(): void {
		setIsExpanded(!isExpanded);
	}

	function handleExpand(): void {
		setIsExpanded(true);
	}

	return (
		<Box
			backgroundColor="elevation.surface"
			style={{
				border: `1px solid ${token("color.border")}`,
				borderRadius: token("radius.large"),
				paddingTop: token("space.100"),
				paddingRight: token("space.100"),
				paddingBottom: token("space.100"),
				paddingLeft: token("space.200"),
				marginBottom: token("space.300"),
			}}
		>
			{/* Header */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: token("space.100"),
				}}
			>
				<div style={{ color: token("color.text.subtle") }}>
					<Heading size="xxsmall">Answer</Heading>
				</div>
				<IconButton
					icon={isExpanded ? ChevronUpIcon : ChevronDownIcon}
					label={isExpanded ? "Collapse" : "Expand"}
					appearance="subtle"
					onClick={handleToggle}
					spacing="compact"
				/>
			</div>

			{/* Collapsed State */}
			{!isExpanded && <CollapsedSummary onExpand={handleExpand} />}

			{/* Expanded Content */}
			{isExpanded && (
				<div style={{ marginRight: token("space.200") }}>
					<Stack space="space.100">
					{/* Summary Text */}
					<div style={{ font: token("font.body") }}>
						<Text>For detailed information on the OKRs for 2026, you can refer to the following resources:</Text>
					</div>

					{/* Numbered List */}
					<div style={{ paddingLeft: token("space.100") }}>
						<Stack space="space.150">
							{SUMMARY_ITEMS.map((item) => (
								<div key={item.tagNumber} style={{ font: token("font.body") }}>
									<Text weight="semibold">{item.tagNumber}. {item.title}</Text>
									<Text>
										: {item.description} You can view it <Link href="#">here</Link>{" "}
										<Tag text={item.tagNumber} appearance="rounded" color="blue" removeButtonLabel="" isRemovable={false} />
										.
									</Text>
								</div>
							))}
						</Stack>
					</div>

					<div style={{ font: token("font.body"), marginTop: token("space.100") }}>
						<Text>These resources should provide you with comprehensive insights into the objectives and key results planned for 2026.</Text>
					</div>

					<SourcesCarousel sources={MOCK_SOURCES} />

					<SummaryFooter />

					{/* Suggested Questions */}
					<div
						style={{
							paddingTop: token("space.200"),
							paddingBottom: token("space.100"),
							borderTop: `1px solid ${token("color.border")}`,
							display: "flex",
							flexWrap: "wrap",
							gap: token("space.100"),
						}}
					>
						{SUGGESTED_QUESTIONS.map((question) => (
							<Button key={question} appearance="default" iconBefore={AiChatIcon}>
								{question}
							</Button>
						))}
					</div>
					</Stack>
				</div>
			)}
		</Box>
	);
}
