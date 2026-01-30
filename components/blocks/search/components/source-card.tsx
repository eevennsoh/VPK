"use client";

import { token } from "@atlaskit/tokens";
import Button from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import { Text, Stack, Inline, Box, Flex } from "@atlaskit/primitives";
import PagesIcon from "@atlaskit/icon/core/pages";
import { ConfluenceIcon } from "@atlaskit/logo";
import Avatar from "@atlaskit/avatar";
import { SourceCard as SourceCardData } from "../data/ai-summary-data";

interface SourceCardProps {
	source: SourceCardData;
}

export default function SourceCard({ source }: Readonly<SourceCardProps>) {
	return (
		<Box
			backgroundColor="elevation.surface"
			padding="space.200"
			style={{
				minWidth: "316px",
				width: "316px",
				flexShrink: 0,
				border: `1px solid ${token("color.border")}`,
				borderRadius: token("radius.xlarge"),
			}}
		>
			<Stack space="space.100" grow="fill">
				<Inline space="space.100" alignBlock="center">
					<PagesIcon label="Page" color={token("color.icon.information")} />
					<Box style={{ color: token("color.link") }}>
						<Heading size="xsmall">{source.title}</Heading>
					</Box>
				</Inline>

				<Inline space="space.100" alignBlock="center">
					<Avatar size="xsmall" name={source.author} src={source.authorAvatar} />
					<Text size="small" color="color.text.subtle">
						Created by {source.author}
						{source.updatedDate && ` • ${source.updatedDate}`}
					</Text>
				</Inline>

				<Box style={{ flexGrow: 1 }}>
					<Text size="small">{source.excerpt}</Text>
				</Box>

				<Flex justifyContent="space-between" alignItems="center" style={{ marginTop: token("space.100") }}>
					<Inline space="space.050" alignBlock="center">
						<ConfluenceIcon appearance="brand" size="xsmall" label="Confluence" shouldUseNewLogoDesign />
						<Text size="small" color="color.text.subtle">
							{source.type}
						</Text>
					</Inline>
					<Button appearance="default" spacing="compact">
						Open preview
					</Button>
				</Flex>
			</Stack>
		</Box>
	);
}
