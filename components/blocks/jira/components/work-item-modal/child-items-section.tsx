"use client";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import { Inline, Box, Flex } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";

import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import AddIcon from "@atlaskit/icon/core/add";

import { ChildItemRow } from "./child-item-row";
import { ChildItemsProgressBar } from "./child-items-progress-bar";
import { ChildItemsTableHeader } from "./child-items-table-header";

export function ChildItemsSection() {
	return (
		<Box paddingBlockEnd="space.300">
			<Box paddingBlockEnd="space.100">
				<Flex justifyContent="space-between" alignItems="center">
					<Heading size="small" as="h3">
						Child work items
					</Heading>
					<Inline space="space.100">
						<IconButton icon={ShowMoreHorizontalIcon} label="Manage" appearance="subtle" spacing="compact" />
						<IconButton icon={AddIcon} label="Add work item" appearance="subtle" spacing="compact" />
					</Inline>
				</Flex>
			</Box>

			<ChildItemsProgressBar />

			<div
				style={{
					border: `1px solid ${token("color.border")}`,
					borderRadius: token("radius.medium"),
					overflow: "hidden",
				}}
			>
				<ChildItemsTableHeader />
				<ChildItemRow
					itemKey="BG-1"
					summary="Update header logo to svg"
					priority="medium"
					status="inprogress"
				/>
				<ChildItemRow
					itemKey="BG-2"
					summary="[UI] Toggle to enable/disable Autofix"
					priority="lowest"
					status="todo"
				/>
			</div>
		</Box>
	);
}
