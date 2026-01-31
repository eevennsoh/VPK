"use client";

import Image from "next/image";
import { token } from "@atlaskit/tokens";
import { Inline } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import { IconButton } from "@atlaskit/button/new";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import EditIcon from "@atlaskit/icon/core/edit";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import ArrowLeftIcon from "@atlaskit/icon/core/arrow-left";

interface RovoViewHeaderProps {
	isChatMode: boolean;
	onBackToStart: () => void;
}

export default function RovoViewHeader({
	isChatMode,
	onBackToStart,
}: Readonly<RovoViewHeaderProps>) {
	return (
		<div
			style={{
				position: isChatMode ? "static" : "absolute",
				top: isChatMode ? "auto" : 0,
				left: 0,
				right: 0,
				height: "56px",
				padding: `0 ${token("space.100")}`,
				backgroundColor: token("elevation.surface"),
				flexShrink: 0,
			}}
		>
			<div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: token("space.050") }}>
				{/* Left side - Back button (when in chat mode), Rovo logo, text, and chevron */}
				<Inline space="space.050" alignBlock="center">
					{isChatMode && (
						<IconButton
							icon={ArrowLeftIcon}
							label="Back"
							appearance="subtle"
							spacing="default"
							shape="circle"
							onClick={onBackToStart}
						/>
					)}
					<Button appearance="subtle" spacing="default">
						<Inline space="space.100" alignBlock="center">
							<Image
								src="/rovomark.png"
								alt="Rovo"
								width={20}
								height={20}
								style={{ objectFit: "contain" }}
							/>
							<span style={{ font: token("font.heading.xsmall"), fontWeight: token("font.weight.semibold") }}>
								Rovo
							</span>
							<ChevronDownIcon label="Expand" size="small" />
						</Inline>
					</Button>
				</Inline>

				{/* Right side - New chat and More buttons */}
				<Inline space="space.050" alignBlock="center">
					<IconButton
						icon={EditIcon}
						label="New chat"
						appearance="subtle"
						spacing="default"
						shape="circle"
						onClick={onBackToStart}
					/>
					<IconButton
						icon={ShowMoreHorizontalIcon}
						label="More options"
						appearance="subtle"
						spacing="default"
						shape="circle"
					/>
				</Inline>
			</div>
		</div>
	);
}
