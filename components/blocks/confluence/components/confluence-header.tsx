"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Text, Inline } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import Button, { IconButton, SplitButton } from "@atlaskit/button/new";
import Link from "@atlaskit/link";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import LockUnlockedIcon from "@atlaskit/icon/core/lock-unlocked";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import { useSidebar } from "@/app/contexts/context-sidebar";
import { useRovoChat } from "@/app/contexts/context-rovo-chat";
import { useClickOutside } from "@/components/hooks/use-click-outside";
import ShareDropdownMenu from "./share-dropdown-menu";
import { PRESENCE_USERS } from "../data/presence-users";

const AvatarGroup = dynamic(() => import("@atlaskit/avatar-group"), {
	ssr: false,
});

export default function ConfluenceHeader() {
	const { isVisible, isHovered } = useSidebar();
	const { isOpen: isRovoChatOpen } = useRovoChat();
	const isSidebarOpen = isVisible || isHovered;
	const sidebarWidth = isVisible ? "230px" : "0px";
	const rovoChatWidth = isRovoChatOpen ? "400px" : "0px";

	const [isShareDropdownOpen, setIsShareDropdownOpen] = React.useState(false);
	const shareButtonRef = React.useRef<HTMLButtonElement>(null);
	const shareMenuRef = React.useRef<HTMLDivElement>(null);

	useClickOutside(
		[shareMenuRef, shareButtonRef],
		() => setIsShareDropdownOpen(false),
		isShareDropdownOpen
	);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: `${token("space.100")} ${token("space.150")}`,
				backgroundColor: token("elevation.surface"),
				minHeight: "56px",
				gap: token("space.100"),
				position: "fixed",
				top: "48px",
				left: sidebarWidth,
				right: rovoChatWidth,
				zIndex: 50,
				transition: "left 0.15s cubic-bezier(0.4, 0, 0.2, 1), right 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
			}}
		>
			{/* Left section - only visible when sidebar is closed */}
			{!isSidebarOpen && (
				<Inline space="space.050" alignBlock="center">
					<div
						style={{
							padding: `${token("space.075")} ${token("space.100")}`,
							borderRadius: token("radius.medium"),
						}}
					>
						<Inline space="space.100" alignBlock="center">
							<ChevronDownIcon label="Expand breadcrumb" size="small" color={token("color.icon.subtle")} />
							<Text as="span" color="color.text.subtle">
								Vitafleet Marketing
							</Text>
						</Inline>
					</div>
				</Inline>
			)}

			{/* Right section */}
			<div style={{ marginLeft: "auto" }}>
				<Inline space="space.100" alignBlock="center">
					{/* Edited timestamp */}
					<div style={{ padding: `0 ${token("space.100")}` }}>
						<Link href="#" appearance="subtle">
							Edited 4h ago
						</Link>
					</div>

					{/* Presence avatars */}
					<div style={{ padding: `0 ${token("space.050")}` }}>
						<AvatarGroup
							appearance="stack"
							size="small"
							maxCount={3}
							data={PRESENCE_USERS.map((user) => ({
								key: user.key,
								name: user.name,
								src: user.src,
								borderColor: user.borderColor,
							}))}
						/>
					</div>

					{/* Actions */}
					<Inline space="space.050" alignBlock="center">
						{/* Share split button */}
						<div style={{ position: "relative" }}>
							<SplitButton appearance="default" spacing="default">
								<Button iconBefore={(iconProps) => <LockUnlockedIcon {...iconProps} label="Unlocked" />}>
									Share
								</Button>
								<IconButton
									ref={shareButtonRef}
									icon={(iconProps) => <ChevronDownIcon {...iconProps} label="More share options" size="small" />}
									label="More share options"
									onClick={() => setIsShareDropdownOpen(!isShareDropdownOpen)}
								/>
							</SplitButton>

							{isShareDropdownOpen && shareButtonRef.current && (
								<ShareDropdownMenu
									menuRef={shareMenuRef}
									buttonRect={shareButtonRef.current.getBoundingClientRect()}
									onClose={() => setIsShareDropdownOpen(false)}
								/>
							)}
						</div>

						{/* More options button */}
						<IconButton
							icon={(iconProps) => <ShowMoreHorizontalIcon {...iconProps} label="More options" />}
							label="More options"
							appearance="subtle"
						/>
					</Inline>
				</Inline>
			</div>
		</div>
	);
}
