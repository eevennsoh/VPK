"use client";

import Link from "next/link";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Stack, Text } from "@atlaskit/primitives";
import ArrowRightIcon from "@atlaskit/icon/core/arrow-right";

const blocks = [
	{
		name: "Chat",
		description: "AI chat interface with streaming responses and widget support",
		href: "/chat",
	},
	{
		name: "Widgets",
		description: "Data display widgets like work items from Jira",
		href: "/widgets",
	},
	{
		name: "Jira",
		description: "Kanban board view with work items and project navigation",
		href: "/jira",
	},
	{
		name: "Confluence",
		description: "Document editor with rich text formatting and collaboration",
		href: "/confluence",
	},
	{
		name: "Rovo",
		description: "AI assistant with chat interface and deep research",
		href: "/rovo",
	},
	{
		name: "Search",
		description: "Search results page with AI summary and filters",
		href: "/search",
	},
];

export default function Home() {
	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundColor: token("color.background.neutral.subtle"),
				padding: "48px 16px",
			}}
		>
			<div style={{ maxWidth: "800px", margin: "0 auto" }}>
				<Stack space="space.400">
					<Heading size="xlarge">Component Blocks</Heading>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
							gap: token("space.200"),
						}}
					>
						{blocks.map((block) => (
							<Link key={block.href} href={block.href} style={{ textDecoration: "none" }}>
								<div
									style={{
										backgroundColor: token("elevation.surface"),
										padding: token("space.300"),
										borderRadius: "8px",
										border: `${token("border.width")} solid ${token("color.border")}`,
										transition: "box-shadow 0.2s ease",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.boxShadow = token("elevation.shadow.raised");
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.boxShadow = "none";
									}}
								>
									<Stack space="space.100">
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<Text weight="bold" size="large">
												{block.name}
											</Text>
											<ArrowRightIcon label="" color={token("color.icon.subtle")} />
										</div>
										<Text color="color.text.subtle">{block.description}</Text>
									</Stack>
								</div>
							</Link>
						))}
					</div>
				</Stack>
			</div>
		</div>
	);
}
