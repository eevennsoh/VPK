"use client";

import { ReactNode } from "react";
import { Text, Flex, Box } from "@atlaskit/primitives";

interface DetailRowProps {
	label: string;
	children: ReactNode;
	noPadding?: boolean;
}

export function DetailRow({ label, children, noPadding }: Readonly<DetailRowProps>) {
	return (
		<Box paddingBlockEnd={noPadding ? "space.0" : "space.150"}>
			<Flex justifyContent="space-between">
				<Box style={{ width: "126px", display: "flex", alignItems: "center" }}>
					<Text weight="medium" color="color.text.subtlest">
						{label}
					</Text>
				</Box>
				<Box paddingInline="space.100" style={{ flex: 1 }}>{children}</Box>
			</Flex>
		</Box>
	);
}
