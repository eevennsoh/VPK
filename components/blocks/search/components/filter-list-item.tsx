"use client";

import React, { useState } from "react";
import Image from "next/image";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import { Text } from "@atlaskit/primitives";
import { LOGO_COMPONENTS, type FilterItem } from "../data/filter-data";

import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";

interface FilterListItemProps {
	item: FilterItem;
	isSelected: boolean;
	onClick: () => void;
}

/**
 * Individual filter list item component with selection, hover, and interaction states
 */
export default function FilterListItem({ item, isSelected, onClick }: Readonly<FilterListItemProps>) {
	const [isHovered, setIsHovered] = useState(false);
	const Icon = item.icon;

	const isImagePath = typeof Icon === "string";
	const isLogoComponent = Icon && LOGO_COMPONENTS.some((LogoComponent) => Icon === LogoComponent);

	function handleKeyDown(e: React.KeyboardEvent): void {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick();
		}
	}

	function handleMoreClick(e: React.MouseEvent): void {
		e.stopPropagation();
	}

	return (
		<div
			onClick={onClick}
			role="button"
			tabIndex={0}
			aria-pressed={isSelected}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: `${token("space.100")} ${token("space.150")}`,
				cursor: "pointer",
				backgroundColor: isSelected ? token("color.background.selected") : "transparent",
				borderLeft: isSelected ? `3px solid ${token("color.border.brand")}` : "3px solid transparent",
				transition: "background-color 0.15s",
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onKeyDown={handleKeyDown}
		>
			<div style={{ display: "flex", alignItems: "center", gap: token("space.100"), flex: 1, minWidth: 0 }}>
				{Icon && (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "24px",
							height: "24px",
							flexShrink: 0,
							color: isSelected ? token("color.icon.accent.blue") : "currentColor",
						}}
					>
						{isImagePath ? (
							<Image src={Icon} alt={item.name} width={24} height={24} style={{ objectFit: "contain" }} />
						) : isLogoComponent ? (
							<Icon appearance="brand" label={item.name} size="small" shouldUseNewLogoDesign />
						) : (
							<Icon label={item.name} color="currentColor" />
						)}
					</div>
				)}
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						flex: 1,
					}}
				>
					<Text weight="medium" color={isSelected ? "color.text.accent.blue" : "color.text"}>
						{item.name}
					</Text>
				</div>
			</div>

			{item.count && (
				<div style={{ flexShrink: 0, marginLeft: token("space.100") }}>
					{isHovered && !isSelected ? (
						<IconButton
							icon={ShowMoreHorizontalIcon}
							label="More options"
							appearance="subtle"
							spacing="compact"
							onClick={handleMoreClick}
						/>
					) : (
						<Text size="small" color={isSelected ? "color.text.accent.blue" : "color.text.subtlest"} weight="regular">
							{item.count}
						</Text>
					)}
				</div>
			)}

			{item.actionLabel && (
				<div style={{ flexShrink: 0, marginLeft: token("space.100") }}>
					<Text color="color.link" weight="medium">
						{item.actionLabel}
					</Text>
				</div>
			)}
		</div>
	);
}
