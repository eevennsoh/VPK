"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import TextField from "@atlaskit/textfield";
import Avatar from "@atlaskit/avatar";
import { token } from "@atlaskit/tokens";
import {
	HomeIcon,
	JiraIcon,
	ConfluenceIcon,
	RovoIcon,
	SearchIcon as SearchLogo,
} from "@atlaskit/logo";
import { ButtonItem, MenuGroup, Section } from "@atlaskit/menu";

import SidebarCollapseIcon from "@atlaskit/icon/core/sidebar-collapse";
import SidebarExpandIcon from "@atlaskit/icon/core/sidebar-expand";
import AppSwitcherIcon from "@atlaskit/icon/core/app-switcher";
import SearchIcon from "@atlaskit/icon/core/search";
import AddIcon from "@atlaskit/icon/core/add";
import NotificationIcon from "@atlaskit/icon/core/notification";
import QuestionCircleIcon from "@atlaskit/icon/core/question-circle";
import ThemeIcon from "@atlaskit/icon/core/theme";

import { useSidebar } from "@/app/contexts/context-sidebar";
import { useRovoChat } from "@/app/contexts/context-rovo-chat";
import { useTheme } from "@/components/utils/theme-wrapper";
import { useRouter, usePathname } from "next/navigation";
import SearchSuggestionsPanel from "./search-suggestions-panel";

type Product = "home" | "jira" | "confluence" | "rovo" | "search";

interface TopNavigationProps {
	product: Product;
}

export default function TopNavigation({ product }: TopNavigationProps) {
	const [searchValue, setSearchValue] = useState("");
	const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [windowWidth, setWindowWidth] = useState(0);
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const { isVisible, toggleSidebar, setHovered } = useSidebar();
	const { toggleChat } = useRovoChat();
	const { setTheme, actualTheme } = useTheme();
	const appSwitcherButtonRef = useRef<HTMLButtonElement>(null);
	const searchContainerRef = useRef<HTMLDivElement>(null);
	const searchPanelRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const pathname = usePathname();

	const toggleTheme = () => setTheme(actualTheme === "light" ? "dark" : "light");

	useEffect(() => {
		setIsMounted(true);
		setWindowWidth(window.innerWidth);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (pathname === "/search") {
			setSearchValue("2026 OKR planning");
		} else {
			setSearchValue("");
		}
	}, [pathname]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				appSwitcherButtonRef.current &&
				!appSwitcherButtonRef.current.contains(event.target as Node)
			) {
				const appSwitcherMenu = document.getElementById("app-switcher-menu");
				if (appSwitcherMenu && !appSwitcherMenu.contains(event.target as Node)) {
					setIsAppSwitcherOpen(false);
				}
			}

			if (
				isSearchFocused &&
				searchContainerRef.current &&
				!searchContainerRef.current.contains(event.target as Node) &&
				searchPanelRef.current &&
				!searchPanelRef.current.contains(event.target as Node)
			) {
				setIsSearchFocused(false);
			}
		};

		if (isAppSwitcherOpen || isSearchFocused) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isAppSwitcherOpen, isSearchFocused]);

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

	const appSwitcherMenu = useMemo(() => (
		<div
			style={{
				backgroundColor: token("elevation.surface.overlay"),
				borderRadius: token("radius.small"),
				boxShadow: token("elevation.shadow.overlay"),
				overflow: "hidden",
			}}
		>
			<MenuGroup spacing="cozy" minWidth={320} maxWidth={320}>
				<Section>
					<ButtonItem
						iconBefore={<HomeIcon appearance="brand" shouldUseNewLogoDesign />}
						onClick={() => {
							router.push("/");
							setIsAppSwitcherOpen(false);
						}}
					>
						Home
					</ButtonItem>
					<ButtonItem
						iconBefore={<SearchLogo appearance="brand" shouldUseNewLogoDesign />}
						onClick={() => {
							router.push("/search");
							setIsAppSwitcherOpen(false);
						}}
					>
						Search
					</ButtonItem>
					<ButtonItem
						iconBefore={<JiraIcon appearance="brand" shouldUseNewLogoDesign />}
						onClick={() => {
							router.push("/jira");
							setIsAppSwitcherOpen(false);
						}}
					>
						Jira
					</ButtonItem>
					<ButtonItem
						iconBefore={<ConfluenceIcon appearance="brand" shouldUseNewLogoDesign />}
						onClick={() => {
							router.push("/confluence");
							setIsAppSwitcherOpen(false);
						}}
					>
						Confluence
					</ButtonItem>
					<ButtonItem
						iconBefore={<RovoIcon appearance="brand" shouldUseNewLogoDesign />}
						onClick={() => {
							router.push("/rovo");
							setIsAppSwitcherOpen(false);
						}}
					>
						Rovo
					</ButtonItem>
				</Section>
			</MenuGroup>
		</div>
	), [router]);

	return (
		<div
			style={{
				backgroundColor: token("elevation.surface"),
				borderBottom: `1px solid ${token("color.border")}`,
				height: "48px",
				position: "sticky",
				top: 0,
				zIndex: 100,
				alignItems: "center",
			}}
		>
			<div
				style={{
					height: "100%",
					paddingLeft: token("space.150"),
					paddingRight: token("space.150"),
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					position: "relative",
				}}
			>
				{isVisible && (
					<div
						style={{
							position: "absolute",
							bottom: -1,
							left: 0,
							width: "230px",
							height: "1px",
							backgroundColor: token("elevation.surface"),
							zIndex: 1,
						}}
					/>
				)}
				{/* Left section */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: token("space.050"),
						flex: 1,
						position: "relative",
						zIndex: 101,
						height: "100%",
						...(windowWidth >= 1028 && windowWidth < 1516 && { flex: "0 0 330px", width: "330px" }),
						...(windowWidth < 1028 && !isVisible && { flex: "0 0 auto", minWidth: "120px" }),
						...(windowWidth < 1028 && isVisible && { flex: "0 0 260px", width: "260px" }),
					}}
				>
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
							onClick={toggleSidebar}
							onMouseEnter={() => setHovered(true)}
							onMouseLeave={() => setHovered(false)}
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
								onClick={() => setIsAppSwitcherOpen(!isAppSwitcherOpen)}
							/>
							{isAppSwitcherOpen && (
								<div
									id="app-switcher-menu"
									style={{
										position: "absolute",
										top: "100%",
										left: 0,
										marginTop: token("space.100"),
										zIndex: 200,
									}}
								>
									{appSwitcherMenu}
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

				{/* Center section - Search */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: token("space.100"),
						width: "100%",
						...(windowWidth >= 1516 && { maxWidth: "762px" }),
						...(windowWidth >= 1028 && windowWidth < 1516 && { minWidth: "292px", maxWidth: "762px" }),
						...(windowWidth < 1028 && { maxWidth: "none" }),
					}}
				>
					<style
						dangerouslySetInnerHTML={{
							__html: `
              .search-box-wrapper input {
                height: 28px !important;
                box-sizing: border-box !important;
                padding: 6px 8px !important;
              }
            `,
						}}
					/>
					<div ref={searchContainerRef} className="search-box-wrapper" style={{ flex: 1, position: "relative" }}>
						{!isSearchFocused && (
							<TextField
								value={searchValue}
								onChange={(e) => setSearchValue((e.target as HTMLInputElement).value)}
								onFocus={() => setIsSearchFocused(true)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										router.push("/search");
									}
								}}
								placeholder="Search"
								isCompact
								elemBeforeInput={
									<div style={{ paddingLeft: token("space.100"), display: "flex", alignItems: "center" }}>
										<SearchIcon label="" />
									</div>
								}
							/>
						)}
					</div>

					<SearchSuggestionsPanel
						ref={searchPanelRef}
						isVisible={isSearchFocused}
						searchValue={searchValue}
						onSearchChange={setSearchValue}
						onSearchKeyDown={(e) => {
							if (e.key === "Enter") {
								router.push("/search");
								setIsSearchFocused(false);
							}
							if (e.key === "Escape") {
								setIsSearchFocused(false);
							}
						}}
						onClose={() => setIsSearchFocused(false)}
						onSearchAllApps={() => {
							router.push("/search");
							setIsSearchFocused(false);
						}}
						onRecentItemClick={(title) => {
							console.log("Clicked recent item:", title);
							setIsSearchFocused(false);
						}}
						onRecentSearchClick={(query) => {
							setSearchValue(query);
							router.push("/search");
							setIsSearchFocused(false);
						}}
					/>

					{/* Create button */}
					{windowWidth >= 768 ? (
						<Button appearance="primary" iconBefore={AddIcon}>
							Create
						</Button>
					) : (
						<IconButton icon={AddIcon} label="Create" appearance="primary" />
					)}
				</div>

				{/* Right section */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: token("space.100"),
						flex: 1,
						justifyContent: "flex-end",
						marginLeft: "8px",
						...(windowWidth >= 1028 && windowWidth < 1516 && { flex: "0 0 330px", width: "330px" }),
					}}
				>
					{/* Rovo chat button - hidden when on Rovo page */}
					{product !== "rovo" &&
						(windowWidth >= 768 ? (
							<Button appearance="default" onClick={toggleChat}>
								<div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
									<img
										src="/rovomark.png"
										alt="Rovo"
										style={{ width: 16, height: 16, objectFit: "contain" }}
									/>
									Ask Rovo
								</div>
							</Button>
						) : (
							<IconButton
								icon={() => (
									<img
										src="/rovomark.png"
										alt="Rovo"
										style={{ width: 16, height: 16, objectFit: "contain" }}
									/>
								)}
								label="Ask Rovo"
								appearance="default"
								onClick={toggleChat}
							/>
						))}

					{/* Notifications */}
					<IconButton icon={NotificationIcon} label="Notifications" appearance="subtle" spacing="default" />

					{/* Help */}
					<IconButton icon={QuestionCircleIcon} label="Help" appearance="subtle" spacing="default" />

					{/* Theme Toggle */}
					<IconButton
						icon={ThemeIcon}
						label="Toggle theme"
						appearance="subtle"
						spacing="default"
						onClick={toggleTheme}
					/>

					{/* Profile */}
					{isMounted ? (
						<Avatar
							size="small"
							name="User Profile"
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
						/>
					) : (
						<div
							style={{
								width: 24,
								height: 24,
								borderRadius: token("radius.full"),
								backgroundColor: token("color.background.neutral"),
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
