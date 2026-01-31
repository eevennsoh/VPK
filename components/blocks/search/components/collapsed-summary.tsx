"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import { Text, Stack } from "@atlaskit/primitives";
import Link from "@atlaskit/link";

import SummaryFooter from "./summary-footer";

interface CollapsedSummaryProps {
	onExpand: () => void;
}

/**
 * Collapsed state preview for AI summary panel with truncated text and fade effect
 */
export default function CollapsedSummary({ onExpand }: Readonly<CollapsedSummaryProps>): React.ReactElement {
	function handleClick(): void {
		onExpand();
	}

	function handleReadMoreClick(e: React.MouseEvent): void {
		e.preventDefault();
		e.stopPropagation();
		onExpand();
	}

	return (
		<div onClick={handleClick} style={{ cursor: "pointer" }}>
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
					<Link href="#" onClick={handleReadMoreClick}>
						Read more
					</Link>
				</div>

				<SummaryFooter stopPropagation />
			</Stack>
		</div>
	);
}
