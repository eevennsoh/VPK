"use client";

import { ReactNode } from "react";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import { Inline, Stack, Box } from "@atlaskit/primitives";

import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import AutomationIcon from "@atlaskit/icon/core/automation";

interface SidebarStackProps {
	children: ReactNode;
}

export function SidebarStack({ children }: Readonly<SidebarStackProps>) {
	return <Stack space="space.100">{children}</Stack>;
}

export function StatusHeader() {
	return (
		<Box paddingBlockStart="space.150" paddingBlockEnd="space.100">
			<Inline space="space.100" alignBlock="center">
				<Button
					appearance="default"
					iconAfter={(iconProps) => <ChevronDownIcon {...iconProps} size="small" />}
				>
					Backlog
				</Button>
				<IconButton icon={AutomationIcon} label="Automation" appearance="default" />
			</Inline>
		</Box>
	);
}
