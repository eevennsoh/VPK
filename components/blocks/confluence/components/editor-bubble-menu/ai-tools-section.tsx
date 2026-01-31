"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import { Inline } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import MagicWandIcon from "@atlaskit/icon/core/magic-wand";

export function AIToolsSection(): React.ReactElement {
	return (
		<div
			style={{
				padding: `${token("space.050")} ${token("space.050")}`,
				borderRight: `1px solid ${token("color.border")}`,
			}}
		>
			<Inline alignBlock="center">
				<Button
					appearance="subtle"
					spacing="compact"
					iconBefore={() => (
						<img
							src="/rovomark.png"
							alt="Rovo"
							style={{ width: "12px", height: "12px", objectFit: "contain" }}
						/>
					)}
					iconAfter={(iconProps) => (
						<ChevronDownIcon {...iconProps} label="More options" size="small" />
					)}
				>
					Ask Rovo
				</Button>

				<Button
					appearance="subtle"
					spacing="compact"
					iconBefore={(iconProps) => (
						<MagicWandIcon {...iconProps} label="Improve writing" size="small" />
					)}
				>
					Improve writing
				</Button>
			</Inline>
		</div>
	);
}
