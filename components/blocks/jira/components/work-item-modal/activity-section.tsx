"use client";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import { Text, Inline, Box, Stack, Flex } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import Avatar from "@atlaskit/avatar";
import Textfield from "@atlaskit/textfield";

import SortDescendingIcon from "@atlaskit/icon/core/sort-descending";

import { CommentThread } from "./comment-thread";

const ACTIVITY_FILTERS = ["All", "Comments", "History", "Work log"] as const;

function ActivityFilters() {
	return (
		<Box
			paddingBlockEnd="space.200"
		>
			<Inline space="space.050">
				{ACTIVITY_FILTERS.map((filter) => (
					<Button key={filter} appearance="subtle" spacing="compact" isSelected={filter === "Comments"}>
						{filter}
					</Button>
				))}
				<IconButton icon={SortDescendingIcon} label="Reverse sort order" appearance="subtle" spacing="compact" />
			</Inline>
		</Box>
	);
}

function AddCommentSection() {
	return (
		<Box paddingBlockEnd="space.200">
			<Inline space="space.100" alignBlock="start">
				<Avatar size="small" src="/people/Avatar-1.png" />
				<Stack space="space.100">
					<Textfield placeholder="Add a comment" aria-label="Add comment" />
					<Inline space="space.050" alignBlock="center">
						<Text size="small">Pro tip:</Text>
						<div
							style={{
								border: `1px solid ${token("color.border")}`,
								borderRadius: token("radius.medium"),
								padding: "0px 4px",
								fontSize: "12px",
								fontWeight: "600",
							}}
						>
							M
						</div>
						<Text size="small">to comment</Text>
					</Inline>
				</Stack>
			</Inline>
		</Box>
	);
}

export function ActivitySection() {
	return (
		<Box paddingBlockEnd="space.300">
			<Box paddingBlockEnd="space.200">
				<Flex justifyContent="space-between" alignItems="center">
					<Heading size="small" as="h3">
						Activity
					</Heading>
				</Flex>
			</Box>

			<ActivityFilters />
			<AddCommentSection />
			<CommentThread />
		</Box>
	);
}
