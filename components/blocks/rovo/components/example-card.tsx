"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import Image from "next/image";

export interface ExampleCardProps {
	iconPath: string;
	title: string;
	description: string;
	onClick?: () => void;
}

export default function ExampleCard({ iconPath, title, description, onClick }: ExampleCardProps) {
	return (
		<div
			style={{
				backgroundColor: token("elevation.surface"),
				border: `1px solid ${token("color.border")}`,
				borderRadius: token("radius.xlarge"),
				padding: "16px",
				cursor: "pointer",
				transition: "all 0.2s ease",
				display: "flex",
				flexDirection: "column",
				gap: "8px",
				boxShadow: "none",
				height: "146px",
			}}
			onClick={onClick}
			onMouseEnter={(e) => {
				e.currentTarget.style.boxShadow = token("elevation.shadow.overlay");
				e.currentTarget.style.transform = "translateY(-4px)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.boxShadow = "none";
				e.currentTarget.style.transform = "translateY(0)";
			}}
		>
			<Image src={iconPath} alt="" width={32} height={32} />
			<div
				className="truncate-1-line"
				style={{
					font: token("font.body"),
					fontWeight: token("font.weight.medium"),
					color: token("color.text.subtle"),
				}}
			>
				{title}
			</div>
			<div
				className="truncate-2-lines"
				style={{
					font: token("font.body.small"),
					color: token("color.text.subtlest"),
					lineHeight: 1.4,
				}}
			>
				{description}
			</div>
		</div>
	);
}
