"use client";

import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import CrossIcon from "@atlaskit/icon/core/cross";
import EditIcon from "@atlaskit/icon/core/edit";
import SmartLinkEmbedIcon from "@atlaskit/icon/core/smart-link-embed";
import PanelRightIcon from "@atlaskit/icon/core/panel-right";
import FullscreenEnterIcon from "@atlaskit/icon/core/fullscreen-enter";
import LinkExternalIcon from "@atlaskit/icon/core/link-external";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import { useRovoChat } from "@/app/contexts/context-rovo-chat";

interface RovoChatHeaderProps {
	onClose: () => void;
	variant: "sidepanel" | "floating";
	onVariantChange: (variant: "sidepanel" | "floating") => void;
	onFullScreen?: () => void;
}

export default function RovoChatHeader({
	onClose,
	variant,
	onVariantChange,
	onFullScreen,
}: Readonly<RovoChatHeaderProps>) {
	const { setMessages } = useRovoChat();
	const [isVariantMenuOpen, setIsVariantMenuOpen] = useState(false);
	const [hoveredVariant, setHoveredVariant] = useState<string | null>(null);

	return (
		<div
			className="rovo-chat-panel"
			style={{
				padding: token("space.150"),
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: token("space.100"),
					padding: token("space.050"),
				}}
			>
				<img src="/rovomark.png" alt="Rovo" style={{ width: 20, height: 20, objectFit: "contain" }} />
				<span
					style={{
						font: token("font.body"),
						fontWeight: token("font.weight.semibold"),
						color: token("color.text"),
					}}
				>
					Rovo
				</span>
				<div style={{ width: "12px", height: "12px", display: "flex", alignItems: "center" }}>
					<ChevronDownIcon label="Expand" size="small" />
				</div>
			</div>

			<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
				<IconButton
					icon={EditIcon}
					label="New chat"
					appearance="subtle"
					spacing="default"
					shape="circle"
					onClick={() => setMessages([])}
				/>
				<div style={{ position: "relative" }}>
					<IconButton
						icon={SmartLinkEmbedIcon}
						label="Switch view"
						appearance="subtle"
						spacing="default"
						shape="circle"
						onClick={() => setIsVariantMenuOpen(!isVariantMenuOpen)}
					/>
					{isVariantMenuOpen && (
						<>
							<div
								style={{
									position: "fixed",
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									zIndex: 400,
								}}
								onClick={() => setIsVariantMenuOpen(false)}
							/>
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
								<div
									style={{
										padding: "8px 12px 4px",
									}}
								>
									<span
										style={{
											font: token("font.body.small"),
											fontWeight: token("font.weight.semibold"),
											color: token("color.text.subtlest"),
										}}
									>
										Switch to
									</span>
								</div>

								{/* Side panel option */}
								<div
									style={{
										padding: "8px 12px",
										cursor: "pointer",
										borderRadius: token("radius.small"),
										display: "flex",
										alignItems: "center",
										gap: "8px",
										justifyContent: "space-between",
										backgroundColor:
											variant === "sidepanel" ? token("color.background.selected") : "transparent",
									}}
									onClick={() => {
										onVariantChange("sidepanel");
										setIsVariantMenuOpen(false);
									}}
									onMouseEnter={(e) => {
										setHoveredVariant("sidepanel");
										if (variant !== "sidepanel") {
											e.currentTarget.style.backgroundColor = token(
												"color.background.neutral.subtle.hovered"
											);
										}
									}}
									onMouseLeave={(e) => {
										setHoveredVariant(null);
										if (variant !== "sidepanel") {
											e.currentTarget.style.backgroundColor = "transparent";
										}
									}}
								>
									<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
										<PanelRightIcon label="Side panel" />
										<span
											style={{ font: token("font.body"), fontWeight: variant === "sidepanel" ? 500 : 400 }}
										>
											Side panel
										</span>
									</div>
								</div>

								{/* Floating option */}
								<div
									style={{
										padding: "8px 12px",
										cursor: "pointer",
										borderRadius: token("radius.small"),
										display: "flex",
										alignItems: "center",
										gap: "8px",
										justifyContent: "space-between",
										backgroundColor:
											variant === "floating" ? token("color.background.selected") : "transparent",
									}}
									onClick={() => {
										onVariantChange("floating");
										setIsVariantMenuOpen(false);
									}}
									onMouseEnter={(e) => {
										setHoveredVariant("floating");
										if (variant !== "floating") {
											e.currentTarget.style.backgroundColor = token(
												"color.background.neutral.subtle.hovered"
											);
										}
									}}
									onMouseLeave={(e) => {
										setHoveredVariant(null);
										if (variant !== "floating") {
											e.currentTarget.style.backgroundColor = "transparent";
										}
									}}
								>
									<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
										<SmartLinkEmbedIcon label="Floating" />
										<span
											style={{ font: token("font.body"), fontWeight: variant === "floating" ? 500 : 400 }}
										>
											Floating
										</span>
									</div>
								</div>

								{/* Full screen option */}
								<div
									style={{
										padding: "8px 12px",
										cursor: "pointer",
										borderRadius: token("radius.small"),
										display: "flex",
										alignItems: "center",
										gap: "8px",
										justifyContent: "space-between",
										backgroundColor: "transparent",
									}}
									onClick={() => {
										setIsVariantMenuOpen(false);
										if (onFullScreen) {
											onFullScreen();
										}
									}}
									onMouseEnter={(e) => {
										setHoveredVariant("fullscreen");
										e.currentTarget.style.backgroundColor = token(
											"color.background.neutral.subtle.hovered"
										);
									}}
									onMouseLeave={(e) => {
										setHoveredVariant(null);
										e.currentTarget.style.backgroundColor = "transparent";
									}}
								>
									<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
										<FullscreenEnterIcon label="Full screen" />
										<span style={{ font: token("font.body"), fontWeight: 400 }}>Full screen</span>
									</div>
									{hoveredVariant === "fullscreen" && <LinkExternalIcon label="Open in new tab" />}
								</div>
							</div>
						</>
					)}
				</div>
				<IconButton
					icon={ShowMoreHorizontalIcon}
					label="More"
					appearance="subtle"
					spacing="default"
					shape="circle"
				/>
				<IconButton
					icon={CrossIcon}
					label="Close"
					appearance="subtle"
					spacing="default"
					shape="circle"
					onClick={onClose}
				/>
			</div>
		</div>
	);
}
