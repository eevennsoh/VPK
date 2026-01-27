"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";

export function ProjectItem() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				padding: token("space.050"),
				borderRadius: token("radius.xsmall"),
				cursor: "pointer",
				gap: token("space.025"),
				minHeight: "32px",
			}}
		>
			{/* Project avatar/icon */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "20px",
					height: "20px",
					backgroundColor: token("color.background.discovery.bold"),
					borderRadius: token("radius.small"),
					marginLeft: token("space.050"),
				}}
			>
				<div
					style={{
						width: "12px",
						height: "12px",
						backgroundColor: "white",
						borderRadius: token("radius.xsmall"),
					}}
				/>
			</div>

			{/* Project name */}
			<span
				style={{
					font: token("font.body"),
					fontWeight: token("font.weight.medium"),
					color: token("color.text.subtle"),
					flex: 1,
					paddingLeft: token("space.025"),
				}}
			>
				Vitafleet
			</span>

			{/* More options */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					marginRight: token("space.025"),
				}}
			>
				<ShowMoreHorizontalIcon label="More options" color={token("color.icon.subtle")} size="small" />
			</div>
		</div>
	);
}
