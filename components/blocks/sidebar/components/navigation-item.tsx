"use client";

import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import AddIcon from "@atlaskit/icon/core/add";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import LinkExternalIcon from "@atlaskit/icon/core/link-external";
import Link from "next/link";
import { NavigationItemProps } from "./types";

export function NavigationItem({
	icon: Icon,
	label,
	href,
	isSelected = false,
	hasChevron = false,
	hasExternalLink = false,
	hasActions = false,
	onClick,
}: NavigationItemProps) {
	const [isHovered, setIsHovered] = useState(false);

	const content = (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				padding: token("space.050"),
				borderRadius: token("radius.xsmall"),
				cursor: "pointer",
				backgroundColor: isSelected ? token("color.background.accent.blue.subtlest") : "transparent",
				position: "relative",
				gap: token("space.025"),
				minHeight: "32px",
			}}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Selected indicator */}
			{isSelected && (
				<div
					style={{
						position: "absolute",
						left: 0,
						top: "50%",
						transform: "translateY(-50%)",
						width: "2px",
						height: "12px",
						backgroundColor: token("color.border.selected"),
						borderRadius: token("radius.xsmall"),
					}}
				/>
			)}

			{/* Icon */}
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
				<Icon label={label} color={isSelected ? token("color.icon.selected") : token("color.icon.subtle")} />
			</div>

			{/* Label */}
			<span
				style={{
					font: token("font.body"),
					fontWeight: token("font.weight.medium"),
					color: isSelected ? token("color.text.selected") : token("color.text.subtle"),
					flex: 1,
					paddingLeft: token("space.025"),
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{label}
			</span>

			{/* Right icons and actions */}
			{(hasChevron || hasExternalLink || hasActions) && (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: token("space.050"),
						marginRight: token("space.025"),
					}}
				>
					{hasActions && isHovered && (
						<>
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
						</>
					)}
					{hasChevron && <ChevronRightIcon label="Expand" color={token("color.icon.subtle")} size="small" />}
					{hasExternalLink && (
						<LinkExternalIcon label="External link" color={token("color.icon.subtle")} size="small" />
					)}
				</div>
			)}
		</div>
	);

	if (href) {
		return (
			<Link href={href} style={{ textDecoration: "none" }}>
				{content}
			</Link>
		);
	}

	return content;
}
