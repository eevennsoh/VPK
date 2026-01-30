"use client";

import { token } from "@atlaskit/tokens";
import UploadIcon from "@atlaskit/icon/core/upload";
import LinkIcon from "@atlaskit/icon/core/link";
import MentionIcon from "@atlaskit/icon/core/mention";
import AddIcon from "@atlaskit/icon/core/add";
import PageIcon from "@atlaskit/icon/core/page";

export interface AddMenuProps {
	onClose: () => void;
}

const menuItemStyle = {
	padding: "6px 12px",
	cursor: "pointer",
	borderRadius: token("radius.small"),
	display: "flex",
	alignItems: "center",
	gap: "8px",
} as const;

export default function AddMenu({ onClose }: AddMenuProps) {
	const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.backgroundColor = token("color.background.neutral.subtle.hovered");
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.backgroundColor = "transparent";
	};

	return (
		<>
			<div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 400,
				}}
				onClick={onClose}
			/>
			<div
				style={{
					position: "fixed",
					bottom: "94px",
					right: "160px",
					backgroundColor: token("elevation.surface.overlay"),
					borderRadius: token("radius.large"),
					boxShadow: token("elevation.shadow.overlay"),
					border: `1px solid ${token("color.border")}`,
					minWidth: "200px",
					zIndex: 500,
					padding: "4px",
				}}
			>
				<div
					style={menuItemStyle}
					onClick={onClose}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<UploadIcon label="Upload file" />
					<span>Upload file</span>
				</div>
				<div
					style={menuItemStyle}
					onClick={onClose}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<LinkIcon label="Add link" />
					<span>Add a link</span>
				</div>
				<div
					style={menuItemStyle}
					onClick={onClose}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<MentionIcon label="Mention someone" />
					<span>Mention someone</span>
				</div>
				<div
					style={menuItemStyle}
					onClick={onClose}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<AddIcon label="More formatting" />
					<span>More formatting</span>
				</div>
				<div
					style={menuItemStyle}
					onClick={onClose}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<PageIcon label="Add current page as context" />
					<span>Add current page as context</span>
				</div>
			</div>
		</>
	);
}
