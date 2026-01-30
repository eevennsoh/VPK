"use client";

import React, { forwardRef, useEffect } from "react";
import { token } from "@atlaskit/tokens";
import Button from "@atlaskit/button/new";
import { IconButton } from "@atlaskit/button/new";
import TextField from "@atlaskit/textfield";
import SearchIcon from "@atlaskit/icon/core/search";
import ClockIcon from "@atlaskit/icon/core/clock";
import FolderClosedIcon from "@atlaskit/icon/core/folder-closed";
import PersonIcon from "@atlaskit/icon/core/person";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import PageIcon from "@atlaskit/icon/core/page";
import CustomizeIcon from "@atlaskit/icon/core/customize";
import { RECENT_SEARCHES, RECENT_ITEMS } from "../data/search-data";

interface SearchSuggestionsPanelProps {
	isVisible: boolean;
	searchValue: string;
	onSearchChange: (value: string) => void;
	onSearchKeyDown: (e: React.KeyboardEvent) => void;
	onClose?: () => void;
	onSearchAllApps?: () => void;
	onRecentItemClick?: (title: string) => void;
	onRecentSearchClick?: (query: string) => void;
}

const SearchSuggestionsPanel = forwardRef<HTMLDivElement, Readonly<SearchSuggestionsPanelProps>>(
	(
		{
			isVisible,
			searchValue,
			onSearchChange,
			onSearchKeyDown,
			onClose,
			onSearchAllApps,
			onRecentItemClick,
			onRecentSearchClick,
		},
		ref
	) => {
		useEffect(() => {
			if (isVisible) {
				setTimeout(() => {
					const input = document.querySelector(".focused-search-box input") as HTMLInputElement;
					if (input) {
						input.focus();
					}
				}, 10);
			}
		}, [isVisible]);

		if (!isVisible) return null;

		return (
			<div
				ref={ref}
				style={{
					position: "fixed",
					top: "6px",
					left: "50%",
					transform: "translateX(-50%)",
					zIndex: 1000,
				}}
			>
				{/* Focused Search Box */}
				<div
					style={{
						width: "780px",
						height: "36px",
						backgroundColor: token("elevation.surface.overlay"),
						borderRadius: "8px",
						boxShadow: token("elevation.shadow.overlay"),
						display: "flex",
						alignItems: "center",
						marginBottom: "8px",
					}}
				>
					<style
						dangerouslySetInnerHTML={{
							__html: `
            .focused-search-box input {
              height: 36px !important;
              box-sizing: border-box !important;
              padding: 6px 8px !important;
              border: none !important;
              background: transparent !important;
            }
            .focused-search-box input:focus {
              outline: none !important;
              box-shadow: none !important;
              border: none !important;
            }
            .focused-search-box > div {
              border: none !important;
              background: transparent !important;
            }
            .focused-search-box > div:focus-within {
              border: none !important;
              box-shadow: none !important;
            }
          `,
						}}
					/>
					<div className="focused-search-box" style={{ flex: 1 }}>
						<TextField
							value={searchValue}
							onChange={(e) => onSearchChange((e.target as HTMLInputElement).value)}
							onKeyDown={onSearchKeyDown}
							placeholder="Search"
							autoFocus
							elemBeforeInput={
								<div style={{ paddingLeft: token("space.100"), display: "flex", alignItems: "center" }}>
									<SearchIcon label="" />
								</div>
							}
						/>
					</div>
				</div>

				{/* Suggestions Panel */}
				<div
					style={{
						width: "780px",
						height: "530px",
						backgroundColor: token("elevation.surface.overlay"),
						borderRadius: "12px",
						boxShadow: token("elevation.shadow.overlay"),
						padding: "8px 0",
						overflow: "hidden",
					}}
				>
					{/* Filter Button Bar */}
					<div
						style={{
							padding: "0 8px 12px",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: "100px",
						}}
					>
						{/* Left group */}
						<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
							<Button
								iconBefore={FolderClosedIcon}
								iconAfter={(iconProps: any) => <ChevronDownIcon {...iconProps} size="small" />}
							>
								Space
							</Button>
							<Button
								iconBefore={PersonIcon}
								iconAfter={(iconProps: any) => <ChevronDownIcon {...iconProps} size="small" />}
							>
								Contributor
							</Button>
							<IconButton icon={CustomizeIcon} label="Customize filters" appearance="subtle" />
						</div>

						{/* Right group */}
						<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
							<Button
								iconBefore={() => (
									<img src="/googledrive.png" alt="" style={{ width: "20px", height: "20px" }} />
								)}
							>
								Google Drive
							</Button>
							<Button
								iconBefore={() => (
									<img src="/slacklogo.png" alt="" style={{ width: "20px", height: "20px" }} />
								)}
							>
								Slack
							</Button>
							<Button>+47</Button>
						</div>
					</div>

					{/* Recent Search Items */}
					<div style={{ padding: "0 8px" }}>
						{RECENT_SEARCHES.map((search, index) => (
							<div
								key={index}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "12px",
									padding: "8px 12px",
									borderRadius: "6px",
									cursor: "pointer",
									transition: "background-color 0.2s ease",
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.backgroundColor = token(
										"color.background.neutral.subtle.hovered"
									))
								}
								onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
								onClick={() => onRecentSearchClick?.(search)}
							>
								<ClockIcon label="" color={token("color.icon.subtle")} />
								<div style={{ flex: 1 }}>
									<div style={{ font: token("font.body"), color: token("color.text") }}>{search}</div>
								</div>
								<div
									style={{
										font: token("font.body.small"),
										color: token("color.text.subtlest"),
										whiteSpace: "nowrap",
									}}
								>
									Recent search
								</div>
							</div>
						))}
					</div>

					{/* RECENT Section */}
					<div style={{ marginTop: "8px", padding: "0 8px" }}>
						<div
							style={{
								font: token("font.body.small"),
								fontWeight: token("font.weight.bold"),
								color: token("color.text.subtlest"),
								letterSpacing: "0.06em",
								padding: "8px 12px 4px",
							}}
						>
							RECENT
						</div>

						{RECENT_ITEMS.map((item, index) => (
							<div
								key={index}
								style={{
									display: "flex",
									alignItems: "flex-start",
									gap: "12px",
									padding: "8px 12px",
									borderRadius: "6px",
									cursor: "pointer",
									transition: "background-color 0.2s ease",
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.backgroundColor = token(
										"color.background.neutral.subtle.hovered"
									))
								}
								onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
								onClick={() => onRecentItemClick?.(item.title)}
							>
								<div style={{ marginTop: "2px" }}>
									<PageIcon label="" color={token("color.icon.accent.blue")} />
								</div>
								<div style={{ flex: 1, minWidth: 0 }}>
									<div
										style={{ font: token("font.body"), color: token("color.text"), marginBottom: "2px" }}
									>
										{item.title}
									</div>
									<div style={{ font: token("font.body.small"), color: token("color.text.subtlest") }}>
										{item.metadata}
									</div>
								</div>
								<div
									style={{
										font: token("font.body.small"),
										color: token("color.text.subtlest"),
										whiteSpace: "nowrap",
									}}
								>
									{item.timestamp}
								</div>
							</div>
						))}
					</div>

					{/* Search all apps footer */}
					<div
						style={{
							marginTop: "8px",
							padding: "8px 8px",
							borderTop: `1px solid ${token("color.border")}`,
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "12px",
								padding: "8px 12px",
								borderRadius: "6px",
								cursor: "pointer",
								transition: "background-color 0.2s ease",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.backgroundColor = token("color.background.neutral.subtle.hovered"))
							}
							onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
							onClick={onSearchAllApps}
						>
							<SearchIcon label="" color={token("color.icon")} />
							<div style={{ flex: 1 }}>
								<div style={{ font: token("font.body"), color: token("color.text") }}>Search all apps</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

SearchSuggestionsPanel.displayName = "SearchSuggestionsPanel";

export default SearchSuggestionsPanel;
