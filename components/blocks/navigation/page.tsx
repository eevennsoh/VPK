"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { useWindowWidth } from "@/components/hooks/use-window-width";
import { useClickOutside } from "@/components/hooks/use-click-outside";
import TextField from "@atlaskit/textfield";
import { token } from "@atlaskit/tokens";
import SearchIcon from "@atlaskit/icon/core/search";
import { useSidebar } from "@/app/contexts/context-sidebar";
import { useRovoChat } from "@/app/contexts/context-rovo-chat";
import { useTheme } from "@/components/utils/theme-wrapper";
import { useRouter, usePathname } from "next/navigation";
import SearchSuggestionsPanel from "./components/search-suggestions-panel";
import { LeftNavigation } from "./components/left-navigation";
import { RightNavigation } from "./components/right-navigation";
import { CreateButton } from "./components/create-button";

type Product = "home" | "jira" | "confluence" | "rovo" | "search";

interface TopNavigationProps {
	product: Product;
}

function getInitialSearchValue(pathname: string): string {
	return pathname === "/search" ? "2026 OKR planning" : "";
}

export default function TopNavigation({ product }: Readonly<TopNavigationProps>) {
	const pathname = usePathname();
	const [searchValue, setSearchValue] = useState(() => getInitialSearchValue(pathname));
	const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false);
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const windowWidth = useWindowWidth();
	const { isVisible, toggleSidebar, setHovered } = useSidebar();
	const { toggleChat } = useRovoChat();
	const { setTheme, actualTheme } = useTheme();
	const searchContainerRef = useRef<HTMLDivElement>(null);
	const searchPanelRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const searchRefs = useMemo(() => [searchContainerRef, searchPanelRef], []);

	useClickOutside(searchRefs, () => setIsSearchFocused(false), isSearchFocused);

	const toggleTheme = useCallback(() => {
		setTheme(actualTheme === "light" ? "dark" : "light");
	}, [setTheme, actualTheme]);

	const handleNavigate = useCallback(
		(path: string) => {
			router.push(path);
			setIsAppSwitcherOpen(false);
		},
		[router]
	);

	const handleSearchKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter") {
				router.push("/search");
				setIsSearchFocused(false);
			}
			if (e.key === "Escape") {
				setIsSearchFocused(false);
			}
		},
		[router]
	);

	const handleSearchAllApps = useCallback(() => {
		router.push("/search");
		setIsSearchFocused(false);
	}, [router]);

	const handleRecentItemClick = useCallback(() => {
		setIsSearchFocused(false);
	}, []);

	const handleRecentSearchClick = useCallback(
		(query: string) => {
			setSearchValue(query);
			router.push("/search");
			setIsSearchFocused(false);
		},
		[router]
	);

	const handleCloseSearch = useCallback(() => setIsSearchFocused(false), []);
	const handleFocusSearch = useCallback(() => setIsSearchFocused(true), []);
	const handleToggleAppSwitcher = useCallback(() => setIsAppSwitcherOpen((prev) => !prev), []);
	const handleCloseAppSwitcher = useCallback(() => setIsAppSwitcherOpen(false), []);
	const handleHoverEnter = useCallback(() => setHovered(true), [setHovered]);
	const handleHoverLeave = useCallback(() => setHovered(false), [setHovered]);

	const centerSectionStyle = useMemo(() => {
		const base = {
			display: "flex",
			alignItems: "center",
			gap: token("space.100"),
			width: "100%",
		};

		if (windowWidth >= 1516) {
			return { ...base, maxWidth: "762px" };
		}
		if (windowWidth >= 1028) {
			return { ...base, minWidth: "292px", maxWidth: "762px" };
		}
		return { ...base, maxWidth: "none" };
	}, [windowWidth]);

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
				<LeftNavigation
					product={product}
					windowWidth={windowWidth}
					isVisible={isVisible}
					isAppSwitcherOpen={isAppSwitcherOpen}
					onToggleSidebar={toggleSidebar}
					onToggleAppSwitcher={handleToggleAppSwitcher}
					onCloseAppSwitcher={handleCloseAppSwitcher}
					onNavigate={handleNavigate}
					onHoverEnter={handleHoverEnter}
					onHoverLeave={handleHoverLeave}
				/>

				{/* Center section - Search */}
				<div style={centerSectionStyle}>
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
								onFocus={handleFocusSearch}
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
						onSearchKeyDown={handleSearchKeyDown}
						onClose={handleCloseSearch}
						onSearchAllApps={handleSearchAllApps}
						onRecentItemClick={handleRecentItemClick}
						onRecentSearchClick={handleRecentSearchClick}
					/>

					<CreateButton windowWidth={windowWidth} />
				</div>

				{/* Right section */}
				<RightNavigation
					product={product}
					windowWidth={windowWidth}
					onToggleChat={toggleChat}
					onToggleTheme={toggleTheme}
				/>
			</div>
		</div>
	);
}
