"use client";

import { useState } from "react";
import { token } from "@atlaskit/tokens";
import { Inline, Text } from "@atlaskit/primitives";
import { IconButton } from "@atlaskit/button/new";
import SmartLinkEmbedIcon from "@atlaskit/icon/core/smart-link-embed";
import PanelRightIcon from "@atlaskit/icon/core/panel-right";
import FullscreenEnterIcon from "@atlaskit/icon/core/fullscreen-enter";
import LinkExternalIcon from "@atlaskit/icon/core/link-external";

type ChatVariant = "sidepanel" | "floating";

interface VariantMenuProps {
	variant: ChatVariant;
	onVariantChange: (variant: ChatVariant) => void;
	onFullScreen?: () => void;
}

interface MenuItemProps {
	icon: typeof PanelRightIcon;
	label: string;
	isSelected: boolean;
	isHovered: boolean;
	showExternalIcon?: boolean;
	onClick: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

function MenuItem({
	icon: Icon,
	label,
	isSelected,
	isHovered,
	showExternalIcon,
	onClick,
	onMouseEnter,
	onMouseLeave,
}: Readonly<MenuItemProps>) {
	const getBackgroundColor = () => {
		if (isSelected) return token("color.background.selected");
		if (isHovered) return token("color.background.neutral.subtle.hovered");
		return "transparent";
	};

	return (
		<div
			style={{
				padding: `${token("space.100")} ${token("space.150")}`,
				cursor: "pointer",
				borderRadius: token("radius.small"),
				backgroundColor: getBackgroundColor(),
			}}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<Inline space="space.100" alignBlock="center" spread="space-between">
				<Inline space="space.100" alignBlock="center">
					<Icon label={label} />
					<Text weight={isSelected ? "medium" : "regular"}>{label}</Text>
				</Inline>
				{showExternalIcon && <LinkExternalIcon label="Open in new tab" />}
			</Inline>
		</div>
	);
}

export default function VariantMenu({
	variant,
	onVariantChange,
	onFullScreen,
}: Readonly<VariantMenuProps>) {
	const [isOpen, setIsOpen] = useState(false);
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);

	const handleClose = () => setIsOpen(false);

	const handleSelectVariant = (newVariant: ChatVariant) => {
		onVariantChange(newVariant);
		handleClose();
	};

	const handleFullScreen = () => {
		handleClose();
		onFullScreen?.();
	};

	return (
		<div style={{ position: "relative" }}>
			<IconButton
				icon={SmartLinkEmbedIcon}
				label="Switch view"
				appearance="subtle"
				spacing="default"
				shape="circle"
				onClick={() => setIsOpen(!isOpen)}
			/>

			{isOpen && (
				<>
					{/* Backdrop */}
					<div
						style={{
							position: "fixed",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 400,
						}}
						onClick={handleClose}
					/>

					{/* Menu */}
					<div
						style={{
							position: "absolute",
							top: "40px",
							right: "0",
							backgroundColor: token("elevation.surface.overlay"),
							borderRadius: token("radius.large"),
							boxShadow: token("elevation.shadow.overlay"),
							border: `1px solid ${token("color.border")}`,
							minWidth: "180px",
							zIndex: 500,
							padding: "4px",
						}}
					>
						<div style={{ padding: `${token("space.100")} ${token("space.150")} ${token("space.050")}` }}>
							<Text size="small" weight="semibold" color="color.text.subtlest">
								Switch to
							</Text>
						</div>

						<MenuItem
							icon={PanelRightIcon}
							label="Side panel"
							isSelected={variant === "sidepanel"}
							isHovered={hoveredItem === "sidepanel"}
							onClick={() => handleSelectVariant("sidepanel")}
							onMouseEnter={() => setHoveredItem("sidepanel")}
							onMouseLeave={() => setHoveredItem(null)}
						/>

						<MenuItem
							icon={SmartLinkEmbedIcon}
							label="Floating"
							isSelected={variant === "floating"}
							isHovered={hoveredItem === "floating"}
							onClick={() => handleSelectVariant("floating")}
							onMouseEnter={() => setHoveredItem("floating")}
							onMouseLeave={() => setHoveredItem(null)}
						/>

						<MenuItem
							icon={FullscreenEnterIcon}
							label="Full screen"
							isSelected={false}
							isHovered={hoveredItem === "fullscreen"}
							showExternalIcon={hoveredItem === "fullscreen"}
							onClick={handleFullScreen}
							onMouseEnter={() => setHoveredItem("fullscreen")}
							onMouseLeave={() => setHoveredItem(null)}
						/>
					</div>
				</>
			)}
		</div>
	);
}
