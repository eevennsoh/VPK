"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import TopNavigation from "@/components/blocks/navigation/top-navigation";
import Sidebar from "@/components/blocks/sidebar/sidebar";
import RovoChatPanel from "@/components/blocks/rovo/components/rovo-chat-panel";
import FloatingRovoButton from "@/components/blocks/rovo/components/floating-rovo-button";
import { useSidebar } from "@/app/contexts/context-sidebar";
import { useRovoChat } from "@/app/contexts/context-rovo-chat";

type Product = "home" | "jira" | "confluence" | "rovo";

interface AppLayoutProps {
	product: Product;
	children: React.ReactNode;
}

export default function AppLayout({ product, children }: AppLayoutProps) {
	const { isVisible } = useSidebar();
	const { isOpen, closeChat } = useRovoChat();
	const sidebarWidth = isVisible ? "230px" : "0px";

	return (
		<div style={{ minHeight: "100vh", backgroundColor: token("color.background.neutral.subtle") }}>
			{/* Top Navigation */}
			<TopNavigation product={product} />

			{/* Main container with sidebar and content */}
			<div style={{ display: "flex", height: "calc(100vh - 48px)" }}>
				{/* Sidebar */}
				<Sidebar product={product} />

				{/* Main Content Area */}
				<div
					style={{
						marginLeft: sidebarWidth,
						transition: "margin-left 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
						flex: 1,
						overflow: "auto",
					}}
				>
					{children}
				</div>

				{/* Rovo Chat Panel */}
				{isOpen && <RovoChatPanel onClose={closeChat} product={product} />}
			</div>

			{/* Floating Rovo Button */}
			<FloatingRovoButton />
		</div>
	);
}
