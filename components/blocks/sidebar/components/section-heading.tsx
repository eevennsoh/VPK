"use client";

import React from "react";
import { token } from "@atlaskit/tokens";

export function SectionHeading({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				padding: `${token("space.100")} 0 ${token("space.050")} ${token("space.075")}`,
				font: token("font.body.small"),
				fontWeight: token("font.weight.semibold"),
				color: token("color.text.subtlest"),
				textTransform: "uppercase" as const,
				letterSpacing: "0.5px",
			}}
		>
			{children}
		</div>
	);
}
