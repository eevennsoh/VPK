"use client";

import { token } from "@atlaskit/tokens";
import { Box, Inline, Pressable, Text } from "@atlaskit/primitives";
import { ADD_MENU_ITEMS } from "../data/input-menu-items";

interface InputAddMenuProps {
	onClose: () => void;
}

export default function InputAddMenu({ onClose }: Readonly<InputAddMenuProps>) {
	return (
		<>
			{/* Backdrop */}
			<div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 400,
				}}
				onClick={onClose}
			/>
			{/* Menu */}
			<Box
				backgroundColor="elevation.surface.overlay"
				style={{
					position: "fixed",
					bottom: "94px",
					right: "160px",
					borderRadius: token("radius.large"),
					boxShadow: token("elevation.shadow.overlay"),
					border: `1px solid ${token("color.border")}`,
					minWidth: "200px",
					zIndex: 500,
					padding: token("space.050"),
				}}
			>
				{ADD_MENU_ITEMS.map((item) => {
					const IconComponent = item.icon;
					return (
						<Pressable
							key={item.label}
							onClick={onClose}
							backgroundColor="color.background.neutral.subtle"
							padding="space.075"
							style={{
								borderRadius: token("radius.small"),
								cursor: "pointer",
							}}
						>
							<Inline space="space.100" alignBlock="center">
								<IconComponent label={item.label} />
								<Text>{item.text}</Text>
							</Inline>
						</Pressable>
					);
				})}
			</Box>
		</>
	);
}
