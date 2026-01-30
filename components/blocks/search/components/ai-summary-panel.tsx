"use client";

import React, { useState, useRef } from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import { Text, Stack, Inline, Box } from "@atlaskit/primitives";

// Icons
import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ThumbsUpIcon from "@atlaskit/icon/core/thumbs-up";
import ThumbsDownIcon from "@atlaskit/icon/core/thumbs-down";
import CopyIcon from "@atlaskit/icon/core/copy";
import ArrowLeftIcon from "@atlaskit/icon/core/arrow-left";
import ArrowRightIcon from "@atlaskit/icon/core/arrow-right";
import InformationCircleIcon from "@atlaskit/icon/core/information-circle";
import Tag from "@atlaskit/tag";
import Link from "@atlaskit/link";
import AiChatIcon from "@atlaskit/icon/core/ai-chat";

import SourceCard from "./source-card";
import { MOCK_SOURCES, SUMMARY_ITEMS, SUGGESTED_QUESTIONS } from "../data/ai-summary-data";

interface AISummaryPanelProps {
	defaultExpanded?: boolean;
}

export default function AISummaryPanel({ defaultExpanded = true }: Readonly<AISummaryPanelProps>) {
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
								{MOCK_SOURCES.map((source) => (
									<SourceCard key={source.id} source={source} />
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
							{SUGGESTED_QUESTIONS.map((question) => (
								<Button key={question} appearance="default" iconBefore={AiChatIcon}>
									{question}
								</Button>
							))}
						</Inline>
					</Stack>
				)}
			</Box>
		</>
	);
}
