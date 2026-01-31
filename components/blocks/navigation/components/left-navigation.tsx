"use client";

import { useRef, useMemo, RefObject } from "react";
import { IconButton } from "@atlaskit/button/new";
import { token } from "@atlaskit/tokens";
import {
	HomeIcon,
	JiraIcon,
	ConfluenceIcon,
	RovoIcon,
	SearchIcon as SearchLogo,
} from "@atlaskit/logo";
import SidebarCollapseIcon from "@atlaskit/icon/core/sidebar-collapse";
import SidebarExpandIcon from "@atlaskit/icon/core/sidebar-expand";
import AppSwitcherIcon from "@atlaskit/icon/core/app-switcher";
import { useClickOutside } from "@/components/hooks/use-click-outside";
import { AppSwitcherMenu } from "./app-switcher-menu";

type Product = "home" | "jira" | "confluence" | "rovo" | "search";

interface LeftNavigationProps {
	product: Product;
	windowWidth: number;
	isVisible: boolean;
	isAppSwitcherOpen: boolean;
	onToggleSidebar: () => void;
	onToggleAppSwitcher: () => void;
	onCloseAppSwitcher: () => void;
	onNavigate: (path: string) => void;
	onHoverEnter: () => void;
	onHoverLeave: () => void;
}

export function LeftNavigation({
	product,
	windowWidth,
	isVisible,
	isAppSwitcherOpen,
	onToggleSidebar,
	onToggleAppSwitcher,
	onCloseAppSwitcher,
	onNavigate,
	onHoverEnter,
	onHoverLeave,
}: Readonly<LeftNavigationProps>) {
	const appSwitcherButtonRef = useRef<HTMLButtonElement>(null);
	const appSwitcherMenuRef = useRef<HTMLDivElement>(null);

	const appSwitcherRefs: RefObject<HTMLElement | null>[] = useMemo(
		() => [appSwitcherButtonRef, appSwitcherMenuRef],
		[]
	);

	useClickOutside(appSwitcherRefs, onCloseAppSwitcher, isAppSwitcherOpen);

	const renderLogo = useMemo(() => {
		const iconProps = { appearance: "brand" as const, size: "small" as const, shouldUseNewLogoDesign: true };

		let Icon;
		let name;

		switch (product) {
			case "search":
				Icon = SearchLogo;
				name = "Search";
				break;
			case "jira":
				Icon = JiraIcon;
				name = "Jira";
				break;
			case "confluence":
				Icon = ConfluenceIcon;
				name = "Confluence";
				break;
			case "rovo":
				Icon = RovoIcon;
				name = "Rovo";
				break;
			case "home":
			default:
				Icon = HomeIcon;
				name = "Home";
				break;
		}

		return (
			<div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
				<Icon {...iconProps} />
				{windowWidth >= 1028 && <span style={{ font: token("font.heading.xsmall") }}>{name}</span>}
			</div>
		);
	}, [product, windowWidth]);

	const containerStyle = useMemo(() => {
		const base = {
			display: "flex",
			alignItems: "center",
			gap: token("space.050"),
			flex: 1,
			position: "relative" as const,
			zIndex: 101,
			height: "100%",
		};

		if (windowWidth >= 1028 && windowWidth < 1516) {
			return { ...base, flex: "0 0 330px", width: "330px" };
		}
		if (windowWidth < 1028 && !isVisible) {
			return { ...base, flex: "0 0 auto", minWidth: "120px" };
		}
		if (windowWidth < 1028 && isVisible) {
			return { ...base, flex: "0 0 260px", width: "260px" };
		}
		return base;
	}, [windowWidth, isVisible]);

	return (
		<div style={containerStyle}>
			{/* Sidebar toggle */}
			<div
				style={{
					position: "absolute",
					left: isVisible ? "180px" : "0",
					transition: "left 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
					display: "flex",
					alignItems: "center",
					height: "100%",
				}}
			>
				<IconButton
					icon={isVisible ? SidebarCollapseIcon : SidebarExpandIcon}
					label={isVisible ? "Collapse sidebar" : "Expand sidebar"}
					appearance="subtle"
					spacing="default"
					onClick={onToggleSidebar}
					onMouseEnter={onHoverEnter}
					onMouseLeave={onHoverLeave}
				/>
			</div>

			{/* App switcher */}
			<div
				style={{
					position: "absolute",
					left: isVisible ? "0" : "40px",
					transition: "left 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
					display: "flex",
					alignItems: "center",
					height: "100%",
				}}
			>
				<div style={{ position: "relative" }}>
					<IconButton
						ref={appSwitcherButtonRef}
						icon={AppSwitcherIcon}
						label="Switch apps"
						appearance="subtle"
						spacing="default"
						isSelected={isAppSwitcherOpen}
						onClick={onToggleAppSwitcher}
					/>
					{isAppSwitcherOpen && (
						<div
							ref={appSwitcherMenuRef}
							style={{
								position: "absolute",
								top: "100%",
								left: 0,
								marginTop: token("space.100"),
								zIndex: 200,
							}}
						>
							<AppSwitcherMenu onNavigate={onNavigate} />
						</div>
					)}
				</div>
			</div>

			{/* Logo/Brand */}
			<div
				style={{
					position: "absolute",
					left: isVisible ? "40px" : "80px",
					transition: "left 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
					marginLeft: token("space.050"),
					display: "flex",
					alignItems: "center",
					height: "100%",
				}}
			>
				{renderLogo}
			</div>
		</div>
	);
}
