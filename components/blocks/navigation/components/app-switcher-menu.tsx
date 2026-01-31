"use client";

import { ButtonItem, MenuGroup, Section } from "@atlaskit/menu";
import { token } from "@atlaskit/tokens";
import {
	HomeIcon,
	JiraIcon,
	ConfluenceIcon,
	RovoIcon,
	SearchIcon as SearchLogo,
} from "@atlaskit/logo";

interface AppSwitcherMenuProps {
	onNavigate: (path: string) => void;
}

export function AppSwitcherMenu({ onNavigate }: Readonly<AppSwitcherMenuProps>) {
	function handleNavigateHome(): void {
		onNavigate("/");
	}

	function handleNavigateSearch(): void {
		onNavigate("/search");
	}

	function handleNavigateJira(): void {
		onNavigate("/jira");
	}

	function handleNavigateConfluence(): void {
		onNavigate("/confluence");
	}

	function handleNavigateRovo(): void {
		onNavigate("/rovo");
	}

	return (
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
						onClick={handleNavigateHome}
					>
						Home
					</ButtonItem>
					<ButtonItem
						iconBefore={<SearchLogo appearance="brand" shouldUseNewLogoDesign />}
						onClick={handleNavigateSearch}
					>
						Search
					</ButtonItem>
					<ButtonItem
						iconBefore={<JiraIcon appearance="brand" shouldUseNewLogoDesign />}
						onClick={handleNavigateJira}
					>
						Jira
					</ButtonItem>
					<ButtonItem
						iconBefore={<ConfluenceIcon appearance="brand" shouldUseNewLogoDesign />}
						onClick={handleNavigateConfluence}
					>
						Confluence
					</ButtonItem>
					<ButtonItem
						iconBefore={<RovoIcon appearance="brand" shouldUseNewLogoDesign />}
						onClick={handleNavigateRovo}
					>
						Rovo
					</ButtonItem>
				</Section>
			</MenuGroup>
		</div>
	);
}
