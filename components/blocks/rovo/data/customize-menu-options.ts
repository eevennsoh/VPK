/**
 * Customize menu configuration data
 */

import RandomizeIcon from "@atlaskit/icon-lab/core/randomize";
import ZoomInIcon from "@atlaskit/icon/core/zoom-in";
import TelescopeIcon from "@atlaskit/icon-lab/core/telescope";

export interface ReasoningOption {
	id: string;
	icon: typeof RandomizeIcon;
	label: string;
	description: string;
}

export const REASONING_OPTIONS: ReasoningOption[] = [
	{
		id: "let-rovo-decide",
		icon: RandomizeIcon,
		label: "Let Rovo decide",
		description: "Rovo picks reasoning for the job",
	},
	{
		id: "think-deeper",
		icon: ZoomInIcon,
		label: "Think deeper",
		description: "Longer thinking for robust responses",
	},
	{
		id: "deep-research",
		icon: TelescopeIcon,
		label: "Deep research",
		description: "Synthesize insights and create reports",
	},
] as const;
