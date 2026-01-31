"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import { token } from "@atlaskit/tokens";
import NotificationIcon from "@atlaskit/icon/core/notification";
import QuestionCircleIcon from "@atlaskit/icon/core/question-circle";
import ThemeIcon from "@atlaskit/icon/core/theme";

// Dynamic import for Avatar to prevent hydration mismatch
const Avatar = dynamic(() => import("@atlaskit/avatar").then((mod) => mod.default), {
	ssr: false,
	loading: () => (
		<div
			style={{
				width: 24,
				height: 24,
				borderRadius: token("radius.full"),
				backgroundColor: token("color.background.neutral"),
			}}
		/>
	),
});

type Product = "home" | "jira" | "confluence" | "rovo" | "search";

interface RightNavigationProps {
	product: Product;
	windowWidth: number;
	onToggleChat: () => void;
	onToggleTheme: () => void;
}

export function RightNavigation({
	product,
	windowWidth,
	onToggleChat,
	onToggleTheme,
}: Readonly<RightNavigationProps>) {
	const containerStyle = {
		display: "flex",
		alignItems: "center",
		gap: token("space.100"),
		flex: 1,
		justifyContent: "flex-end",
		marginLeft: "8px",
		...(windowWidth >= 1028 && windowWidth < 1516 && { flex: "0 0 330px", width: "330px" }),
	};

	return (
		<div style={containerStyle}>
			{/* Rovo chat button - hidden when on Rovo page */}
			{product !== "rovo" && (
				<>
					{windowWidth >= 768 ? (
						<Button appearance="default" onClick={onToggleChat}>
							<div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
								<Image src="/rovomark.png" alt="Rovo" width={16} height={16} style={{ objectFit: "contain" }} />
								Ask Rovo
							</div>
						</Button>
					) : (
						<IconButton
							icon={() => (
								<Image src="/rovomark.png" alt="Rovo" width={16} height={16} style={{ objectFit: "contain" }} />
							)}
							label="Ask Rovo"
							appearance="default"
							onClick={onToggleChat}
						/>
					)}
				</>
			)}

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
				onClick={onToggleTheme}
			/>

			{/* Profile - Dynamic import handles hydration with loading fallback */}
			<Avatar
				size="small"
				name="User Profile"
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
			/>
		</div>
	);
}
