"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Text } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import Button, { IconButton, SplitButton } from "@atlaskit/button/new";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from "@atlaskit/dropdown-menu";
import Link from "@atlaskit/link";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import LockUnlockedIcon from "@atlaskit/icon/core/lock-unlocked";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import { useSidebar } from "@/app/contexts/context-sidebar";
import { useRovoChat } from "@/app/contexts/context-rovo-chat";

// Import AvatarGroup dynamically to avoid hydration mismatch
const AvatarGroup = dynamic(() => import("@atlaskit/avatar-group"), {
	ssr: false,
});

export default function ConfluenceHeader() {
	const { isVisible, isHovered } = useSidebar();
	const { isOpen: isRovoChatOpen } = useRovoChat();
	const isSidebarOpen = isVisible || isHovered;
	const sidebarWidth = isVisible ? "230px" : "0px";
	const rovoChatWidth = isRovoChatOpen ? "400px" : "0px";

	// State for share dropdown
	const [isShareDropdownOpen, setIsShareDropdownOpen] = React.useState(false);
	const shareButtonRef = React.useRef<HTMLButtonElement>(null);
	const shareMenuRef = React.useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			const isInsideDropdown = shareMenuRef.current?.contains(target) || shareButtonRef.current?.contains(target);

			if (!isInsideDropdown) {
				setIsShareDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

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
				top: "48px", // Position below TopNavigation
				left: sidebarWidth,
				right: rovoChatWidth,
				zIndex: 50, // Below TopNavigation and Sidebar
				transition: "left 0.15s cubic-bezier(0.4, 0, 0.2, 1), right 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
			}}
		>
			{/* Left section - only visible when sidebar is closed */}
			{!isSidebarOpen && (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: token("space.050"),
					}}
				>
					{/* Breadcrumb */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: token("space.100"),
							padding: `${token("space.075")} ${token("space.100")}`,
							borderRadius: token("radius.medium"),
						}}
					>
						<ChevronDownIcon label="Expand breadcrumb" size="small" color={token("color.icon.subtle")} />
						<Text as="span" color="color.text.subtle">
							Vitafleet Marketing
						</Text>
					</div>
				</div>
			)}

			{/* Right section - always visible */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: token("space.100"),
					marginLeft: "auto",
				}}
			>
				{/* Edited timestamp */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: token("space.050"),
						padding: `0 ${token("space.100")}`,
					}}
				>
					<Link href="#" appearance="subtle">
						Edited 4h ago
					</Link>
				</div>

				{/* Presence avatars */}
				<div
					style={{
						padding: `0 ${token("space.050")}`,
					}}
				>
					<AvatarGroup
						appearance="stack"
						size="small"
						maxCount={3}
						data={[
							{
								key: "user1",
								name: "Victoria Styles",
								src: "/people/Avatar-1.png",
								borderColor: token("color.border.brand"),
							},
							{
								key: "user2",
								name: "Fidelis Ejima",
								src: "/people/Avatar-2.png",
								borderColor: token("color.border.success"),
							},
							{
								key: "user3",
								name: "Aoife Burke",
								src: "/people/Avatar-3.png",
								borderColor: token("color.border.discovery"),
							},
							{
								key: "user4",
								name: "Additional User 1",
							},
							{
								key: "user5",
								name: "Additional User 2",
							},
						]}
					/>
				</div>

				{/* Actions */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: token("space.050"),
					}}
				>
					{/* Share split button */}
					<div style={{ position: "relative" }}>
						<SplitButton appearance="default" spacing="default">
							<Button iconBefore={(iconProps) => <LockUnlockedIcon {...iconProps} label="Unlocked" />}>Share</Button>
							<IconButton
								ref={shareButtonRef}
								icon={(iconProps) => <ChevronDownIcon {...iconProps} label="More share options" size="small" />}
								label="More share options"
								onClick={() => setIsShareDropdownOpen(!isShareDropdownOpen)}
							/>
						</SplitButton>

						{/* Share Dropdown Menu */}
						{isShareDropdownOpen && shareButtonRef.current && (
							<div
								ref={shareMenuRef}
								style={{
									position: "fixed",
									top: `${shareButtonRef.current.getBoundingClientRect().bottom + 4}px`,
									left: `${shareButtonRef.current.getBoundingClientRect().left - 138}px`,
									backgroundColor: token("elevation.surface.overlay"),
									borderRadius: token("radius.medium"),
									boxShadow: token("elevation.shadow.overlay"),
									zIndex: 2000,
									width: "170px",
									padding: token("space.075"),
								}}
							>
								<button
									onClick={() => {
										// Handle share with team
										setIsShareDropdownOpen(false);
									}}
									style={{
										width: "100%",
										padding: token("space.100"),
										border: "none",
										background: "transparent",
										cursor: "pointer",
										textAlign: "left",
										borderRadius: token("radius.medium"),
										fontSize: "14px",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = token("color.background.neutral.hovered");
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = "transparent";
									}}
								>
									Share with team
								</button>
								<button
									onClick={() => {
										// Handle copy link
										setIsShareDropdownOpen(false);
									}}
									style={{
										width: "100%",
										padding: token("space.100"),
										border: "none",
										background: "transparent",
										cursor: "pointer",
										textAlign: "left",
										borderRadius: token("radius.medium"),
										fontSize: "14px",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = token("color.background.neutral.hovered");
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = "transparent";
									}}
								>
									Copy link
								</button>
								<button
									onClick={() => {
										// Handle share via email
										setIsShareDropdownOpen(false);
									}}
									style={{
										width: "100%",
										padding: token("space.100"),
										border: "none",
										background: "transparent",
										cursor: "pointer",
										textAlign: "left",
										borderRadius: token("radius.medium"),
										fontSize: "14px",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = token("color.background.neutral.hovered");
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = "transparent";
									}}
								>
									Share via email
								</button>
							</div>
						)}
					</div>

					{/* More options button */}
					<IconButton icon={(iconProps) => <ShowMoreHorizontalIcon {...iconProps} label="More options" />} label="More options" appearance="subtle" />
				</div>
			</div>
		</div>
	);
}
