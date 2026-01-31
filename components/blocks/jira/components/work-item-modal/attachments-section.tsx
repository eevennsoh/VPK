"use client";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import { Text } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import Badge from "@atlaskit/badge";

import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import AddIcon from "@atlaskit/icon/core/add";

interface AttachmentFile {
	name: string;
	ext: string;
	date: string;
	color: string;
}

const ATTACHMENT_FILES: AttachmentFile[] = [
	{ name: "Background001", ext: "png", date: "17 Mar 2025, 09:12 AM", color: token("color.background.success") },
	{ name: "NewerBackground001", ext: "png", date: "17 Mar 2025, 09:12 AM", color: token("color.background.warning") },
	{ name: "Background002", ext: "png", date: "17 Mar 2025, 09:12 AM", color: token("color.background.discovery") },
];

interface AttachmentCardProps {
	file: AttachmentFile;
}

function AttachmentCard({ file }: Readonly<AttachmentCardProps>) {
	return (
		<div
			style={{
				width: "160px",
				flexShrink: 0,
				borderRadius: token("radius.medium"),
				overflow: "hidden",
				boxShadow: token("elevation.shadow.raised"),
			}}
		>
			<div style={{ height: "88px", backgroundColor: file.color }} />
			<div style={{ padding: token("space.050"), backgroundColor: token("elevation.surface") }}>
				<div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
					<Text size="small" weight="bold">
						{file.name}.{file.ext}
					</Text>
				</div>
				<div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
					<Text size="small" color="color.text">
						{file.date}
					</Text>
				</div>
			</div>
		</div>
	);
}

export function AttachmentsSection() {
	return (
		<div style={{ marginBottom: token("space.300") }}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: token("space.100"),
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
					<Heading size="small" as="h3">
						Attachments
					</Heading>
					<Badge appearance="default">5</Badge>
				</div>
				<div style={{ display: "flex", gap: token("space.100") }}>
					<IconButton icon={ShowMoreHorizontalIcon} label="Manage" appearance="subtle" spacing="compact" />
					<IconButton icon={AddIcon} label="Add attachment" appearance="subtle" spacing="compact" />
				</div>
			</div>

			<div
				style={{
					display: "flex",
					gap: token("space.050"),
					overflowX: "auto",
					padding: token("space.025"),
				}}
			>
				{ATTACHMENT_FILES.map((file, i) => (
					<AttachmentCard key={i} file={file} />
				))}
			</div>
		</div>
	);
}
