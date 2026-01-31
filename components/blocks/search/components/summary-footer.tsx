"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import { Text, Inline } from "@atlaskit/primitives";

import ThumbsUpIcon from "@atlaskit/icon/core/thumbs-up";
import ThumbsDownIcon from "@atlaskit/icon/core/thumbs-down";
import CopyIcon from "@atlaskit/icon/core/copy";
import InformationCircleIcon from "@atlaskit/icon/core/information-circle";

interface SummaryFooterProps {
	/** Whether to stop event propagation on button clicks */
	stopPropagation?: boolean;
}

/**
 * Footer actions for AI summary panel with feedback buttons and disclaimer
 */
export default function SummaryFooter({
	stopPropagation = false,
}: Readonly<SummaryFooterProps>): React.ReactElement {
	function handleThumbsUp(e: React.MouseEvent): void {
		if (stopPropagation) e.stopPropagation();
	}

	function handleThumbsDown(e: React.MouseEvent): void {
		if (stopPropagation) e.stopPropagation();
	}

	function handleCopy(e: React.MouseEvent): void {
		if (stopPropagation) e.stopPropagation();
	}

	return (
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
				<IconButton icon={ThumbsUpIcon} label="Helpful" appearance="subtle" onClick={handleThumbsUp} />
				<IconButton icon={ThumbsDownIcon} label="Not helpful" appearance="subtle" onClick={handleThumbsDown} />
				<IconButton icon={CopyIcon} label="Copy" appearance="subtle" onClick={handleCopy} />
			</Inline>
		</div>
	);
}
