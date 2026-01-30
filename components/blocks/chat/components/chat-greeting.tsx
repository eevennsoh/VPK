"use client";

import { token } from "@atlaskit/tokens";
import { Stack, Text } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import Image from "next/image";
import { defaultSuggestions, planModeSuggestions, type RovoSuggestion } from "@/lib/rovo-suggestions";

interface ChatGreetingProps {
	/**
	 * Controls which illustration and suggestions to display:
	 * - "chat" (default): Shows chat bubbles illustration with default suggestions
	 * - "plan": Shows write/pencil illustration with plan mode suggestions
	 */
	variant?: "chat" | "plan";
	/**
	 * Optional custom heading text
	 */
	heading?: string;
	/**
	 * Callback when a suggestion is clicked
	 */
	onSuggestionClick?: (suggestion: RovoSuggestion) => void;
}

const illustrations = {
	chat: {
		src: "/Chat.svg",
		alt: "Chat",
	},
	plan: {
		src: "/Write.svg",
		alt: "Plan",
	},
};

// Styles for the icon container - 32x32 with border
const iconContainerStyles = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "32px",
	height: "32px",
	minWidth: "32px",
	borderRadius: token("radius.large"),
	backgroundColor: token("elevation.surface"),
	border: `1px solid ${token("color.border")}`,
} as const;

// Styles for the list item row
const listItemStyles = {
	display: "flex",
	alignItems: "center",
	gap: token("space.150"),
	padding: token("space.075"),
	borderRadius: token("radius.large"),
	width: "100%",
	cursor: "pointer",
	transition: "background-color 0.1s ease",
} as const;

function SkillListItem({
	suggestion,
	onClick,
}: Readonly<{
	suggestion: RovoSuggestion;
	onClick?: () => void;
}>) {
	const IconComponent = suggestion.icon;
	const isSkill = suggestion.type === "skill";

	// Get icon color based on type - skills have colored icons
	const iconColor = isSkill ? token("color.icon.discovery") : token("color.icon");

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick?.();
				}
			}}
			style={listItemStyles}
			onMouseEnter={(e) => {
				e.currentTarget.style.backgroundColor = token("color.background.neutral.subtle.hovered");
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.backgroundColor = "transparent";
			}}
		>
			{/* Icon container - 32x32 bordered box */}
			<div style={iconContainerStyles}>
				{suggestion.imageSrc ? (
					<Image
						src={suggestion.imageSrc}
						alt={suggestion.label}
						width={20}
						height={20}
						style={{ objectFit: "contain" }}
					/>
				) : IconComponent ? (
					<IconComponent label={suggestion.label} size="medium" color={iconColor} />
				) : null}
			</div>

			{/* Label text */}
			<Text color="color.text.subtle">{suggestion.label}</Text>
		</div>
	);
}

export default function ChatGreeting({
	variant = "chat",
	heading = "Let's do this together",
	onSuggestionClick,
}: Readonly<ChatGreetingProps>) {
	const illustration = illustrations[variant];
	const suggestions = variant === "plan" ? planModeSuggestions : defaultSuggestions;

	return (
		<div style={{ width: "100%" }}>
			<Stack space="space.300">
				{/* Greeting section - centered */}
				<Stack space="space.100" alignInline="center">
					<Image
						src={illustration.src}
						alt={illustration.alt}
						width={80}
						height={80}
						style={{ objectFit: "contain" }}
					/>
					<Heading size="large">{heading}</Heading>
				</Stack>

				{/* Skills list - full width */}
				<div style={{ width: "100%" }}>
					<Stack space="space.050">
						{suggestions.map((suggestion) => (
							<SkillListItem
								key={suggestion.id}
								suggestion={suggestion}
								onClick={() => onSuggestionClick?.(suggestion)}
							/>
						))}
					</Stack>
				</div>
			</Stack>
		</div>
	);
}
