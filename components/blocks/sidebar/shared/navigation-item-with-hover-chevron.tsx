"use client";

import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import AddIcon from "@atlaskit/icon/core/add";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import { NavigationItemWithHoverChevronProps } from "./types";

export function NavigationItemWithHoverChevron({
	icon: Icon,
	label,
	isExpanded = false,
	hasActions = false,
	onClick,
}: NavigationItemWithHoverChevronProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				padding: token("space.050"),
				borderRadius: token("radius.xsmall"),
				cursor: "pointer",
				backgroundColor: "transparent",
				position: "relative",
				gap: token("space.025"),
				minHeight: "32px",
			}}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Icon - swaps to chevron on hover */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "24px",
					height: "24px",
					marginLeft: token("space.025"),
				}}
			>
				{isHovered ? (
					isExpanded ? (
						<ChevronDownIcon label="Expanded" color={token("color.icon.subtle")} size="small" />
					) : (
						<ChevronRightIcon label="Collapsed" color={token("color.icon.subtle")} size="small" />
					)
				) : (
					<Icon label={label} color={token("color.icon.subtle")} />
				)}
			</div>

			{/* Label */}
			<span
				style={{
					font: token("font.body"),
					fontWeight: token("font.weight.medium"),
					color: token("color.text.subtle"),
					flex: 1,
					paddingLeft: token("space.025"),
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{label}
			</span>

			{/* Right actions - only show on hover if hasActions */}
			{hasActions && isHovered && (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: token("space.050"),
						marginRight: token("space.025"),
					}}
				>
					<IconButton
						icon={AddIcon}
						label="Add"
						appearance="subtle"
						spacing="compact"
						onClick={(e) => {
							e.stopPropagation();
						}}
					/>
					<IconButton
						icon={ShowMoreHorizontalIcon}
						label="More"
						appearance="subtle"
						spacing="compact"
						onClick={(e) => {
							e.stopPropagation();
						}}
					/>
				</div>
			)}
		</div>
	);
}
