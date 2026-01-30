"use client";

import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import { Text } from "@atlaskit/primitives/compiled";

// Icons
import LinkIcon from "@atlaskit/icon/core/link";
import RovoChatIcon from "@atlaskit/icon/core/rovo-chat";
import PagesIcon from "@atlaskit/icon/core/pages";

interface SearchResultCardProps {
	icon?: React.ComponentType<any>;
	iconColor?: string; // Accent color for the icon
	title: string;
	metadata: string[];
	excerpt: string;
	searchTerms?: string[];
	onClick?: () => void;
}

// Array of accent icon colors from ADS tokens
export const accentColors = [
	token("color.icon.information"), // Blue
	token("color.icon.success"), // Green
	token("color.icon.warning"), // Orange/Yellow
	token("color.icon.danger"), // Red
	token("color.icon.discovery"), // Purple
];

// Helper function to highlight search terms in text
const highlightSearchTerms = (text: string, searchTerms: string[] = []) => {
	if (searchTerms.length === 0) return text;

	// Create a regex pattern that matches any of the search terms (case insensitive)
	const pattern = new RegExp(`(${searchTerms.join("|")})`, "gi");
	const parts = text.split(pattern);

	return (
		<>
			{parts.map((part, index) => {
				const isMatch = searchTerms.some((term) => part.toLowerCase() === term.toLowerCase());
				return isMatch ? (
					<strong key={index} style={{ fontWeight: token("font.weight.bold") }}>
						{part}
					</strong>
				) : (
					<React.Fragment key={index}>{part}</React.Fragment>
				);
			})}
		</>
	);
};

export default function SearchResultCard({ icon: Icon = PagesIcon, iconColor = token("color.icon.information"), title, metadata, excerpt, searchTerms = [], onClick }: SearchResultCardProps) {
	const [isCardHovered, setIsCardHovered] = useState(false);
	const [isTitleHovered, setIsTitleHovered] = useState(false);

	return (
		<div
			style={{
				display: "flex",
			}}
			onClick={onClick}
			onMouseEnter={() => setIsCardHovered(true)}
			onMouseLeave={() => setIsCardHovered(false)}
			onFocus={() => setIsCardHovered(true)}
			onBlur={() => setIsCardHovered(false)}
			tabIndex={0}
		>
			{/* Custom icon tile on the left with 8px margin on either side */}
			<div style={{ paddingLeft: "8px", paddingRight: "8px" }}>
				<div
					style={{
						width: "32px",
						height: "32px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: token("color.background.neutral"),
						borderRadius: token("radius.medium"),
					}}
				>
					<Icon label={title} color={iconColor} />
				</div>
			</div>

			{/* Content section with 12px left and right margin, 4px vertical gap */}
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					gap: "4px",
					paddingLeft: "12px",
					paddingRight: "12px",
					minWidth: 0,
				}}
			>
				{/* Title row with hover buttons immediately to the right with 8px gap */}
				<div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
					<div
						style={{
							font: token("font.body.large"),
							color: token("color.text.brand"),
							textDecoration: isTitleHovered ? "underline" : "none",
							cursor: "pointer",
						}}
						onMouseEnter={() => setIsTitleHovered(true)}
						onMouseLeave={() => setIsTitleHovered(false)}
					>
						{highlightSearchTerms(title, searchTerms)}
					</div>

					{/* Hover buttons - immediately to the right of title text, shown when card is hovered */}
					{isCardHovered && (
						<div style={{ display: "flex", gap: token("space.050"), flexShrink: 0 }}>
							<IconButton
								icon={LinkIcon}
								label="Copy link"
								appearance="default"
								spacing="compact"
								onClick={(e) => {
									e.stopPropagation();
									// Handle copy link
								}}
							/>
							<Button
								appearance="default"
								spacing="compact"
								iconBefore={RovoChatIcon}
								onClick={(e) => {
									e.stopPropagation();
									// Handle summarize
								}}
							>
								Summarize
							</Button>
						</div>
					)}
				</div>

				{/* Metadata - 4px gap from title, body regular font size */}
				<div
					style={{
						font: token("font.body"),
						color: token("color.text.subtlest"),
						display: "flex",
						alignItems: "center",
						gap: token("space.100"),
						flexWrap: "wrap",
					}}
				>
					{metadata.map((item, index) => (
						<React.Fragment key={index}>
							{index > 0 && (
								<span
									style={{
										width: "4px",
										height: "4px",
										borderRadius: "50%",
										backgroundColor: token("color.text.subtlest"),
										display: "inline-block",
									}}
								/>
							)}
							<span>{item}</span>
						</React.Fragment>
					))}
				</div>

				{/* Excerpt - 4px gap from metadata */}
				<div
					style={{
						font: token("font.body"),
						color: token("color.text.subtle"),
						lineHeight: "20px",
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					}}
				>
					{highlightSearchTerms(excerpt, searchTerms)}
				</div>
			</div>
		</div>
	);
}
