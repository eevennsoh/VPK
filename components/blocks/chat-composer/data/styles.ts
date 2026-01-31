import { token } from "@atlaskit/tokens";

export const composerStyles = {
	wrapper: {
		padding: `0 ${token("space.100")}`,
	},
	container: {
		backgroundColor: token("elevation.surface"),
		border: `1px solid ${token("color.border")}`,
		borderRadius: token("radius.xlarge"),
		padding: "16px 16px 12px",
		// Shadow from Figma Spike (node 1-128360): upward projection, large blur for subtle glow
		boxShadow: "0px -2px 50px 8px rgba(30, 31, 33, 0.08)",
	},
	inputWrapper: {
		position: "relative" as const,
		width: "100%",
		display: "flex",
		alignItems: "center",
	},
	textarea: {
		width: "100%",
		border: "none",
		outline: "none",
		backgroundColor: "transparent",
		resize: "none" as const,
		font: token("font.body"),
		fontFamily: "inherit",
		color: token("color.text"),
		minHeight: "20px",
		maxHeight: "120px",
		overflowY: "auto" as const,
	},
	actionsRow: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: token("space.150"),
	},
	buttonGroup: {
		display: "flex",
		alignItems: "center",
		gap: token("space.050"),
	},
} as const;

export const textareaCSS = `
	.chat-composer-textarea::placeholder {
		color: ${token("color.text.subtlest")};
	}
`;
