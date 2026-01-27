"use client";

import React from "react";
import { Inline } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import Button from "@atlaskit/button/new";
import Badge from "@atlaskit/badge";
import AddIcon from "@atlaskit/icon/core/add";

interface BoardColumnProps {
	title: string;
	count: number;
	children: React.ReactNode;
}

const BoardColumn: React.FC<BoardColumnProps> = ({ title, count, children }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "270px",
				minWidth: "270px",
				maxWidth: "270px",
				flexShrink: 0,
				height: "100%",
				backgroundColor: token("elevation.surface.sunken"),
				borderRadius: token("radius.large"),
			}}
		>
			{/* Column header */}
			<div style={{ paddingBlock: token("space.200"), paddingInline: token("space.150") }}>
				<Inline space="space.100" alignBlock="center">
					<span
						style={{
							font: token("font.body.small"),
							fontWeight: token("font.weight.medium"),
							color: token("color.text.subtle"),
						}}
					>
						{title.toUpperCase()}
					</span>
					<Badge appearance="default">{count}</Badge>
				</Inline>
			</div>

			{/* Scrollable content */}
			<div
				style={{
					flexGrow: 1,
					overflowY: "auto",
					paddingBottom: token("space.100"),
					paddingInline: token("space.050"),
					display: "flex",
					flexDirection: "column",
					gap: token("space.050"),
				}}
			>
				{children}
			</div>

			{/* Create button */}
			<div style={{ paddingTop: token("space.100"), paddingBottom: "8px", paddingLeft: token("space.150") }}>
				<Button appearance="subtle" iconBefore={AddIcon}>
					Create
				</Button>
			</div>
		</div>
	);
};

export default BoardColumn;
