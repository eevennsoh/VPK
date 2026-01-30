"use client";

import AppProvider from "@atlaskit/app-provider";
import { ThemeWrapper } from "@/components/utils/theme-wrapper";
import { SystemPromptProvider } from "@/app/contexts/context-system-prompt";
import { SidebarProvider } from "@/app/contexts/context-sidebar";
import { RovoChatProvider } from "@/app/contexts/context-rovo-chat";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		// Enable new Shape token from Atlassian Design System
		<AppProvider defaultTheme={{ shape: "shape" }}>
			<ThemeWrapper>
				<SidebarProvider>
					<RovoChatProvider>
						<SystemPromptProvider>{children}</SystemPromptProvider>
					</RovoChatProvider>
				</SidebarProvider>
			</ThemeWrapper>
		</AppProvider>
	);
}
