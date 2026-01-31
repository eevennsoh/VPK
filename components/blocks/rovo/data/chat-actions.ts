/**
 * Chat messages action items data
 */

import AiGenerativeTextSummaryIcon from "@atlaskit/icon/core/ai-generative-text-summary";
import SmartLinkIcon from "@atlaskit/icon/core/smart-link";
import CommentIcon from "@atlaskit/icon/core/comment";
import ChildWorkItemsIcon from "@atlaskit/icon/core/child-work-items";
import TagIcon from "@atlaskit/icon/core/tag";

export interface ActionItem {
	icon: typeof AiGenerativeTextSummaryIcon;
	label: string;
}

export const ACTION_ITEMS: ActionItem[] = [
	{ icon: AiGenerativeTextSummaryIcon, label: "Improve description" },
	{ icon: SmartLinkIcon, label: "Link Confluence content" },
	{ icon: CommentIcon, label: "Summarize comments" },
	{ icon: ChildWorkItemsIcon, label: "Suggest child work items" },
	{ icon: TagIcon, label: "Link similar work items" },
] as const;
