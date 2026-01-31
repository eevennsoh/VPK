"use client";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import { Stack, Inline, Text } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import Avatar from "@atlaskit/avatar";

import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";

import { useWorkItemModal } from "@/app/contexts/context-work-item-modal";

export function MoreFieldsAccordion() {
	const { state, actions } = useWorkItemModal();

	return (
		<div style={{ border: `1px solid ${token("color.border")}`, borderRadius: token("radius.medium") }}>
			<div style={{ padding: "8px" }}>
				<Inline space="space.100" alignBlock="center" spread="space-between">
					<Inline space="space.100" alignBlock="center">
						<Heading size="small">More fields</Heading>
						<Text size="small" color="color.text.subtlest">
							Approvers
						</Text>
					</Inline>
					<IconButton
						icon={state.isMoreFieldsOpen ? ChevronUpIcon : ChevronDownIcon}
						label={state.isMoreFieldsOpen ? "Collapse" : "Expand"}
						appearance="subtle"
						onClick={actions.toggleMoreFields}
					/>
				</Inline>
			</div>

			{state.isMoreFieldsOpen && (
				<div style={{ padding: "8px 12px 12px" }}>
					<Stack space="space.100">
						<div>
							<Text weight="medium" color="color.text.subtlest">
								Approvers
							</Text>
							<div style={{ marginTop: "4px" }}>
								<Inline space="space.100" alignBlock="center">
									<Avatar size="small" src="/people/Avatar-1.png" />
									<Text>John Smith</Text>
								</Inline>
							</div>
						</div>
						<div>
							<Text weight="medium" color="color.text.subtlest">
								Story Points
							</Text>
							<div style={{ marginTop: "4px" }}>
								<Text>5</Text>
							</div>
						</div>
					</Stack>
				</div>
			)}
		</div>
	);
}
