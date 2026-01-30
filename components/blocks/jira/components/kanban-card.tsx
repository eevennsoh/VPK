"use client";

import React, { useState, useEffect } from "react";
import { Stack, Inline, Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import Avatar from "@atlaskit/avatar";
import Tag from "@atlaskit/tag";
import PriorityMajorIcon from "@atlaskit/icon/core/priority-major";
import PriorityMediumIcon from "@atlaskit/icon/core/priority-medium";
import PriorityMinorIcon from "@atlaskit/icon/core/priority-minor";
import TaskIcon from "@atlaskit/icon/core/task";

interface TagData {
	text: string;
	color?:
		| "standard"
		| "green"
		| "lime"
		| "blue"
		| "red"
		| "purple"
		| "magenta"
		| "grey"
		| "teal"
		| "orange"
		| "yellow";
}

interface KanbanCardProps {
	title: string;
	code: string;
	tags?: TagData[];
	priority: "major" | "medium" | "minor";
	avatarSrc?: string;
	onClick?: () => void;
}

const KanbanCard: React.FC<Readonly<KanbanCardProps>> = ({ title, code, tags, priority, avatarSrc, onClick }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const priorityIcons = {
		major: PriorityMajorIcon,
		medium: PriorityMediumIcon,
		minor: PriorityMinorIcon,
	};

	const priorityColors = {
		major: token("color.icon.danger"),
		medium: token("color.icon.information"),
		minor: token("color.icon.success"),
	};

	const PriorityIcon = priorityIcons[priority];
	const priorityColor = priorityColors[priority];

	return (
		<div
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				backgroundColor: isHovered
					? token("color.background.neutral.subtle.hovered")
					: token("elevation.surface"),
				borderRadius: token("radius.small"),
				padding: token("space.150"),
				cursor: "pointer",
				boxShadow: token("elevation.shadow.raised"),
				transition: "background-color 0.2s ease",
			}}
		>
			<Stack space="space.100">
				{/* Title */}
				<Text weight="regular">{title}</Text>

				{/* Tags */}
				{tags && tags.length > 0 && (
					<Inline space="space.050">
						{tags.map((tag, index) => (
							<Tag key={index} text={tag.text} color={tag.color || "standard"} isRemovable={false} />
						))}
					</Inline>
				)}

				{/* Footer */}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						paddingTop: token("space.050"),
					}}
				>
					<div style={{ display: "flex", gap: token("space.100"), alignItems: "center" }}>
						{/* Task Icon - always present */}
						<div style={{ width: "16px", height: "16px", display: "flex", alignItems: "center" }}>
							<TaskIcon label="Task" color={token("color.icon.brand")} />
						</div>
						{/* Code text */}
						<Text size="small" color="color.text.subtlest" weight="semibold">
							{code}
						</Text>
					</div>

					<div style={{ display: "flex", gap: token("space.075"), alignItems: "center" }}>
						<div style={{ width: "16px", height: "16px" }}>
							<PriorityIcon label={`${priority} priority`} color={priorityColor} />
						</div>
						{isMounted && <Avatar size="small" src={avatarSrc} name={code} />}
					</div>
				</div>
			</Stack>
		</div>
	);
};

export default KanbanCard;
