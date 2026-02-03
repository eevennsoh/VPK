"use client";

import Tooltip from "@atlaskit/tooltip";
import type { ReactNode } from "react";

interface CustomTooltipProps {
	content: ReactNode;
	children: ReactNode;
	position?: "top" | "bottom" | "left" | "right" | "mouse";
	hideTooltipOnMouseDown?: boolean;
	hideTooltipOnClick?: boolean;
	delay?: number;
	testId?: string;
}

export default function CustomTooltip({
	content,
	children,
	position = "top",
	hideTooltipOnMouseDown = true,
	hideTooltipOnClick,
	delay,
	testId,
}: Readonly<CustomTooltipProps>) {
	return (
		<Tooltip
			content={content}
			position={position}
			hideTooltipOnMouseDown={hideTooltipOnMouseDown}
			hideTooltipOnClick={hideTooltipOnClick}
			delay={delay}
			testId={testId}
		>
			{children}
		</Tooltip>
	);
}
