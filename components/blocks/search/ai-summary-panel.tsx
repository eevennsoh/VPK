"use client";

import React, { useState, useRef } from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives/compiled";
import { Stack, Inline, Box } from "@atlaskit/primitives/compiled";

// Icons
import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ThumbsUpIcon from "@atlaskit/icon/core/thumbs-up";
import ThumbsDownIcon from "@atlaskit/icon/core/thumbs-down";
import CopyIcon from "@atlaskit/icon/core/copy";
import ArrowLeftIcon from "@atlaskit/icon/core/arrow-left";
import ArrowRightIcon from "@atlaskit/icon/core/arrow-right";
import InformationCircleIcon from "@atlaskit/icon/core/information-circle";
import PagesIcon from "@atlaskit/icon/core/pages";
import { ConfluenceIcon } from "@atlaskit/logo";
import Avatar from "@atlaskit/avatar";
import Tag from "@atlaskit/tag";
import Link from "@atlaskit/link";
import AiChatIcon from "@atlaskit/icon/core/ai-chat";

interface SourceCard {
	id: string;
	title: string;
	author: string;
	authorAvatar?: string;
	updatedDate?: string;
	excerpt: string;
	type: string;
}

interface AISummaryPanelProps {
	defaultExpanded?: boolean;
}

const mockSources: SourceCard[] = [
	{
		id: "1",
		title: "2026 OKR planning",
		author: "Dani McKenzie",
		authorAvatar: "/people/Avatar-1.png",
		excerpt: "The purpose of this section is to capture our work related to crafting KRs and OKRs for our L2 and L3 objectives for 2026",
		type: "Confluence",
	},
	{
		id: "2",
		title: "FY 2026 OKRs",
		author: "Oksana Levchuk",
		authorAvatar: "/people/Avatar-2.png",
		updatedDate: "Updated on ...",
		excerpt: "This page provides an overview of the FY 2026 OKRs. You can access it here",
		type: "Confluence",
	},
	{
		id: "3",
		title: "Goals - H1 2026",
		author: "Sarah Chen",
		authorAvatar: "/people/Avatar-3.png",
		excerpt: "This page lists relevant OKRs for the first half of 2026, including L1, L2, and L3 objectives",
		type: "Confluence",
	},
	{
		id: "4",
		title: "Q1 2026 Planning Review",
		author: "James Wilson",
		authorAvatar: "/people/Avatar-4.png",
		updatedDate: "Updated 2 weeks ago",
		excerpt: "Comprehensive review of Q1 planning sessions with key takeaways and action items for 2026 OKR implementation",
		type: "Confluence",
	},
];

export default function AISummaryPanel({ defaultExpanded = true }: AISummaryPanelProps) {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);
	const carouselRef = useRef<HTMLDivElement>(null);

	const handlePrevSource = () => {
		if (carouselRef.current) {
			const cardWidth = 316 + 16; // card width + gap
			carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
		}
	};

	const handleNextSource = () => {
		if (carouselRef.current) {
			const cardWidth = 316 + 16; // card width + gap
			carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
		}
	};

	return (
		<>
			<style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
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
					<IconButton icon={isExpanded ? ChevronUpIcon : ChevronDownIcon} label={isExpanded ? "Collapse" : "Expand"} appearance="subtle" onClick={() => setIsExpanded(!isExpanded)} spacing="compact" />
				</div>

				{/* Collapsed State - Preview */}
				{!isExpanded && (
					<div
						onClick={() => setIsExpanded(true)}
						style={{
							cursor: "pointer",
						}}
					>
						<Stack space="space.200">
							{/* Preview Text - truncated with fade effect */}
							<div style={{ position: "relative", marginRight: token("space.200") }}>
								<div style={{ font: token("font.body") }}>
									<Text>For detailed information on the OKRs for 2026, you can refer to the following resources:</Text>
								</div>

								<div style={{ font: token("font.body"), paddingLeft: token("space.100") }}>
									<Text weight="semibold">1. 2026 OKR Planning</Text>
									<Text>: This page captures the work related to crafting KRs and OKRs for L2 and L3 objectives for 2026. You can view it </Text>
								</div>

								{/* Fade out gradient overlay */}
								<div
									style={{
										position: "absolute",
										bottom: 0,
										left: 0,
										right: 0,
										height: "40px",
										background: `linear-gradient(to bottom, transparent, ${token("elevation.surface")})`,
										pointerEvents: "none",
									}}
								/>
							</div>

							{/* Read more button */}
							<div>
								<Link
									href="#"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setIsExpanded(true);
									}}
								>
									Read more
								</Link>
							</div>

							{/* Footer Actions - same as expanded */}
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Inline space="space.050" alignBlock="center">
									<InformationCircleIcon label="Information" color={token("color.icon.subtle")} size="small" />
									<Text size="small" color="color.text.subtle">
										Uses AI. Verify results.
									</Text>
								</Inline>

								<Inline space="space.050">
									<IconButton
										icon={ThumbsUpIcon}
										label="Helpful"
										appearance="subtle"
										onClick={(e) => {
											e.stopPropagation();
										}}
									/>
									<IconButton
										icon={ThumbsDownIcon}
										label="Not helpful"
										appearance="subtle"
										onClick={(e) => {
											e.stopPropagation();
										}}
									/>
									<IconButton
										icon={CopyIcon}
										label="Copy"
										appearance="subtle"
										onClick={(e) => {
											e.stopPropagation();
										}}
									/>
								</Inline>
							</div>
						</Stack>
					</div>
				)}

				{/* Expanded Content */}
				{isExpanded && (
					<Stack space="space.100" style={{ marginRight: token("space.200") }}>
						{/* Summary Text */}
						<div style={{ font: token("font.body") }}>
							<Text>For detailed information on the OKRs for 2026, you can refer to the following resources:</Text>
						</div>

						{/* Numbered List */}
						<div style={{ paddingLeft: token("space.100") }}>
							<Stack space="space.150">
								<div style={{ font: token("font.body") }}>
									<Text weight="semibold">1. 2026 OKR Planning</Text>
									<Text>
										: This page captures the work related to crafting KRs and OKRs for L2 and L3 objectives for 2026. You can view it{" "}
										<Link href="#">here</Link>{" "}
										<Tag text="1" appearance="rounded" color="blue" removeButtonLabel="" isRemovable={false} />
										.
									</Text>
								</div>

								<div style={{ font: token("font.body") }}>
									<Text weight="semibold">2. FY 2026 OKRs</Text>
									<Text>
										: This page provides an overview of the FY 2026 OKRs. You can access it{" "}
										<Link href="#">here</Link>{" "}
										<Tag text="2" appearance="rounded" color="blue" removeButtonLabel="" isRemovable={false} />
										.
									</Text>
								</div>

								<div style={{ font: token("font.body") }}>
									<Text weight="semibold">3. Goals - H1 2026</Text>
									<Text>
										: This page lists relevant OKRs for the first half of 2026, including L1, L2, and L3 objectives. You can find it{" "}
										<Link href="#">here</Link>{" "}
										<Tag text="3" appearance="rounded" color="blue" removeButtonLabel="" isRemovable={false} />
										.
									</Text>
								</div>
							</Stack>
						</div>

						<div style={{ font: token("font.body"), marginTop: token("space.100") }}>
							<Text>These resources should provide you with comprehensive insights into the objectives and key results planned for 2026.</Text>
						</div>

						{/* Sources Section */}
						<div>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.100") }}>
								<div style={{ color: token("color.text.subtlest") }}>
									<Heading size="xxsmall">Sources</Heading>
								</div>
								<Inline space="space.050">
									<IconButton icon={ArrowLeftIcon} label="Previous source" appearance="subtle" onClick={handlePrevSource} />
									<IconButton icon={ArrowRightIcon} label="Next source" appearance="subtle" onClick={handleNextSource} />
								</Inline>
							</div>

							{/* Source Cards */}
							<div
								ref={carouselRef}
								style={{
									display: "flex",
									gap: token("space.200"),
									overflowX: "auto",
									scrollbarWidth: "none", // Firefox
									msOverflowStyle: "none", // IE/Edge
								}}
								className="hide-scrollbar"
							>
								{mockSources.map((source) => (
									<div
										key={source.id}
										style={{
											minWidth: "316px",
											width: "316px",
											flexShrink: 0,
											border: `1px solid ${token("color.border")}`,
											borderRadius: token("radius.xlarge"),
											padding: token("space.200"),
											backgroundColor: token("elevation.surface"),
											display: "flex",
											flexDirection: "column",
										}}
									>
										<Stack space="space.100" grow="fill">
											<Inline space="space.100" alignBlock="center">
												<PagesIcon label="Page" color={token("color.icon.information")} />
												<div style={{ color: token("color.link") }}>
													<Heading size="xsmall">{source.title}</Heading>
												</div>
											</Inline>

											<Inline space="space.100" alignBlock="center">
												<Avatar size="xsmall" name={source.author} src={source.authorAvatar} />
												<Text size="small" color="color.text.subtle">
													Created by {source.author}
													{source.updatedDate && ` • ${source.updatedDate}`}
												</Text>
											</Inline>

											<div style={{ flexGrow: 1 }}>
												<Text size="small">{source.excerpt}</Text>
											</div>

											<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: token("space.100") }}>
												<Inline space="space.050" alignBlock="center">
													<ConfluenceIcon appearance="brand" size="xsmall" label="Confluence" shouldUseNewLogoDesign />
													<Text size="small" color="color.text.subtle">
														{source.type}
													</Text>
												</Inline>
												<Button appearance="default" spacing="compact">
													Open preview
												</Button>
											</div>
										</Stack>
									</div>
								))}
							</div>
						</div>

						{/* Footer Actions */}
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Inline space="space.050" alignBlock="center">
								<InformationCircleIcon label="Information" color={token("color.icon.subtle")} />
								<Text size="small" color="color.text.subtle">
									Uses AI. Verify results.
								</Text>
							</Inline>

							<Inline space="space.050">
								<IconButton icon={ThumbsUpIcon} label="Helpful" appearance="subtle" />
								<IconButton icon={ThumbsDownIcon} label="Not helpful" appearance="subtle" />
								<IconButton icon={CopyIcon} label="Copy" appearance="subtle" />
							</Inline>
						</div>

						{/* Suggested Questions */}
						<Inline space="space.100" shouldWrap style={{ paddingTop: token("space.200"), paddingBottom: token("space.100"), borderTop: `1px solid ${token("color.border")}` }}>
							<Button appearance="default" iconBefore={AiChatIcon}>
								Open chat
							</Button>
							<Button appearance="default" iconBefore={AiChatIcon}>
								What are the L2 objectives?
							</Button>
							<Button appearance="default" iconBefore={AiChatIcon}>
								How are KRs defined for 2026?
							</Button>
						</Inline>
					</Stack>
				)}
			</Box>
		</>
	);
}
