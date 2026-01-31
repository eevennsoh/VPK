"use client";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import { Stack, Inline, Text } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";

import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";
import AutomationIcon from "@atlaskit/icon/core/automation";

import { useWorkItemModal } from "@/app/contexts/context-work-item-modal";

interface AutomationRuleProps {
	name: string;
	lastExecuted: string;
}

function AutomationRule({ name, lastExecuted }: Readonly<AutomationRuleProps>) {
	return (
		<div>
			<div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
				<AutomationIcon label="Automation" color={token("color.icon.success")} />
				<Text weight="medium">{name}</Text>
			</div>
			<Text size="small" color="color.text.subtlest">
				Last executed: {lastExecuted}
			</Text>
		</div>
	);
}

export function AutomationAccordion() {
	const { state, actions } = useWorkItemModal();

	return (
		<div style={{ border: `1px solid ${token("color.border")}`, borderRadius: token("radius.medium") }}>
			<div style={{ padding: "8px" }}>
				<Inline space="space.100" alignBlock="center" spread="space-between">
					<Inline space="space.100" alignBlock="center">
						<Heading size="small">Automation</Heading>
						<Text size="small" color="color.text.subtlest">
							Rule executions
						</Text>
					</Inline>
					<IconButton
						icon={state.isAutomationOpen ? ChevronUpIcon : ChevronDownIcon}
						label={state.isAutomationOpen ? "Collapse" : "Expand"}
						appearance="subtle"
						onClick={actions.toggleAutomation}
					/>
				</Inline>
			</div>

			{state.isAutomationOpen && (
				<div style={{ padding: "8px 12px 12px" }}>
					<Stack space="space.150">
						<AutomationRule name="Auto-assign rule" lastExecuted="2 hours ago" />
						<AutomationRule name="Status transition" lastExecuted="5 days ago" />
					</Stack>
				</div>
			)}
		</div>
	);
}
