"use client";

import { token } from "@atlaskit/tokens";
import { Text, Inline, Box } from "@atlaskit/primitives";
import InformationCircleIcon from "@atlaskit/icon/core/information-circle";

export default function FooterDisclaimer() {
	return (
		<Box paddingBlock="space.100">
			<Inline space="space.050" alignBlock="center" alignInline="center">
				<InformationCircleIcon label="Information" color={token("color.icon.subtlest")} size="small" />
				<Text size="small" color="color.text.subtlest">
					Uses AI. Verify results.
				</Text>
			</Inline>
		</Box>
	);
}
