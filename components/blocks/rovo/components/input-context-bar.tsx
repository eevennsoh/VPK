"use client";

import { token } from "@atlaskit/tokens";
import { Box, Inline, Text } from "@atlaskit/primitives";
import Tag from "@atlaskit/tag";
import LocationIcon from "@atlaskit/icon/core/location";
import PageIcon from "@atlaskit/icon/core/page";
import BoardIcon from "@atlaskit/icon/core/board";

interface InputContextBarProps {
	product: "jira" | "confluence";
}

export default function InputContextBar({ product }: Readonly<InputContextBarProps>) {
	return (
		<Box
			backgroundColor="color.background.neutral"
			paddingBlock="space.050"
			paddingInline="space.150"
			style={{
				borderRadius: token("radius.xlarge"),
				marginBottom: token("space.150"),
			}}
		>
			<Inline space="space.050" alignBlock="center">
				<LocationIcon label="Context" size="small" color={token("color.icon.subtlest")} />
				<Text size="small" color="color.text.subtle">
					Context:
				</Text>
				<Tag
					text={product === "confluence" ? "Demo Live page" : "Vitafleet Q4 launch"}
					color="blue"
					elemBefore={
						product === "confluence" ? (
							<PageIcon label="Page" size="small" color={token("color.icon.brand")} />
						) : (
							<BoardIcon label="Board" size="small" color={token("color.icon.brand")} />
						)
					}
				/>
			</Inline>
		</Box>
	);
}
