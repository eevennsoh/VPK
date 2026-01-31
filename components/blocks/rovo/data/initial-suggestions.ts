/**
 * Initial suggestion buttons shown on the Rovo landing page
 */

import SearchIcon from "@atlaskit/icon/core/search";
import ChartTrendUpIcon from "@atlaskit/icon/core/chart-trend-up";

export interface InitialSuggestion {
	icon: typeof SearchIcon;
	label: string;
}

export const INITIAL_SUGGESTIONS: InitialSuggestion[] = [
	{ icon: SearchIcon, label: "Find information" },
	{ icon: ChartTrendUpIcon, label: "Measure productivity" },
	{ icon: SearchIcon, label: "Find People" },
] as const;
