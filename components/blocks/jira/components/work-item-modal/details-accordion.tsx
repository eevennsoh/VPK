"use client";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import { Stack, Inline, Text, Flex, Box } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import Link from "@atlaskit/link";
import Avatar from "@atlaskit/avatar";

import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";
import PriorityMediumIcon from "@atlaskit/icon/core/priority-medium";

import { useWorkItemModal } from "@/app/contexts/context-work-item-modal";
import { DetailRow } from "./detail-row";
import { LabelTag } from "./label-tag";

export function DetailsAccordion() {
	const { state, actions } = useWorkItemModal();

	return (
		<div style={{ border: `1px solid ${token("color.border")}`, borderRadius: token("radius.medium") }}>
			<Box padding="space.100">
				<Flex justifyContent="space-between" alignItems="center">
					<Heading size="small">Details</Heading>
					<IconButton
						icon={state.isDetailsOpen ? ChevronUpIcon : ChevronDownIcon}
						label={state.isDetailsOpen ? "Collapse" : "Expand"}
						appearance="subtle"
						onClick={actions.toggleDetails}
					/>
				</Flex>
			</Box>

			{state.isDetailsOpen && (
				<Stack space="space.0">
					<Box paddingBlock="space.100" paddingInline="space.150">
						<DetailRow label="Assignee">
							<Inline space="space.100" alignBlock="center">
								<Avatar size="small" />
								<Text weight="medium">Unassigned</Text>
							</Inline>
							<Box paddingBlockStart="space.050" paddingInlineStart="space.100">
								<Link href="#">Assign to me</Link>
							</Box>
						</DetailRow>

						<DetailRow label="Reporter">
							<Inline space="space.100" alignBlock="center">
								<Avatar size="small" src="/people/Avatar-1.png" />
								<Text weight="medium">Giannis Antetokounmpo</Text>
							</Inline>
						</DetailRow>

						<DetailRow label="Priority">
							<Inline space="space.100" alignBlock="center">
								<PriorityMediumIcon label="Medium priority" color={token("color.icon.information")} />
								<Text weight="medium">Medium</Text>
							</Inline>
						</DetailRow>

						<DetailRow label="Start date">
							<Text>Mar 14, 2025</Text>
						</DetailRow>

						<DetailRow label="Parent">
							<Link href="#">BG-6</Link>
						</DetailRow>

						<DetailRow label="Labels" noPadding>
							<Inline space="space.100" shouldWrap>
								<LabelTag>wcag21</LabelTag>
								<LabelTag>Team25</LabelTag>
							</Inline>
						</DetailRow>
					</Box>
				</Stack>
			)}
		</div>
	);
}
