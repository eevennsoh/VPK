/**
 * Rovo Chat Suggestions
 *
 * Static catalog of skill/prompt suggestions for the Rovo chat sidebar.
 * Supports two modes: default (chat) and plan mode.
 */

import type { ComponentType } from "react";

// Icon imports - these will be used by consuming components
import LightbulbIcon from "@atlaskit/icon/core/lightbulb";
import BookOpenIcon from "@atlaskit/icon-lab/core/book-open";
import EditIcon from "@atlaskit/icon/core/edit";
import LocationIcon from "@atlaskit/icon/core/location";
import FeedbackIcon from "@atlaskit/icon/core/feedback";
import CalendarIcon from "@atlaskit/icon/core/calendar";
import PersonIcon from "@atlaskit/icon/core/person";

export interface RovoSuggestion {
	id: string;
	label: string;
	/** ADS icon component for skills */
	icon?: ComponentType<{ label: string; color?: string; size?: "small" | "medium" | "large" }>;
	/** Image path for prompts with rich illustrations */
	imageSrc?: string;
	/** Indicates if this is a "skill" (ADS icon) or "prompt" (rich illustration) */
	type: "skill" | "prompt";
}

/**
 * Default mode suggestions - shown when plan mode is disabled
 * Based on Figma design
 */
export const defaultSuggestions: RovoSuggestion[] = [
	{
		id: "collect-insights",
		label: "Collect insights",
		icon: LightbulbIcon,
		type: "skill",
	},
	{
		id: "organize-folder",
		label: "Organize folder",
		imageSrc: "/googledrive.png",
		type: "prompt",
	},
	{
		id: "send-message",
		label: "Send message",
		imageSrc: "/slacklogo.png",
		type: "prompt",
	},
	{
		id: "conduct-surveys",
		label: "Conduct follow-up surveys",
		imageSrc: "/rovoillustrations/visible.svg",
		type: "prompt",
	},
	{
		id: "brainstorm-ideas",
		label: "Brainstorm ideas for project",
		imageSrc: "/rovoillustrations/shapes.svg",
		type: "prompt",
	},
	{
		id: "discover-more",
		label: "Discover more prompts and skills",
		icon: BookOpenIcon,
		type: "skill",
	},
];

/**
 * Plan mode suggestions - shown when plan mode is enabled
 * Based on Figma design
 */
export const planModeSuggestions: RovoSuggestion[] = [
	{
		id: "develop-strategy",
		label: "Develop a strategy for ongoing feedback collection",
		imageSrc: "/rovoillustrations/form.svg",
		type: "prompt",
	},
	{
		id: "train-staff",
		label: "Train staff on new processes and tools",
		imageSrc: "/rovoillustrations/lightbulb.svg",
		type: "prompt",
	},
	{
		id: "implement-feedback",
		label: "Implement feedback loops for continuous improvement",
		imageSrc: "/rovoillustrations/check.svg",
		type: "prompt",
	},
	{
		id: "schedule-meetings",
		label: "Schedule regular team meetings to discuss progress",
		icon: CalendarIcon,
		type: "prompt",
	},
	{
		id: "assign-mentors",
		label: "Assign mentors for new employees to enhance onboarding",
		icon: PersonIcon,
		type: "prompt",
	},
	{
		id: "summarize-page",
		label: "Summarize page",
		icon: BookOpenIcon,
		type: "skill",
	},
];

/**
 * Get suggestions based on mode
 */
export function getSuggestions(planModeEnabled: boolean): RovoSuggestion[] {
	return planModeEnabled ? planModeSuggestions : defaultSuggestions;
}
