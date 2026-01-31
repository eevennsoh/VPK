import { token } from "@atlaskit/tokens";

export const chatStyles = {
	loadingWidget: {
		padding: token("space.200"),
		backgroundColor: token("color.background.neutral.subtle"),
		borderRadius: token("radius.large"),
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		color: token("color.text.subtlest"),
		font: token("font.body"),
		marginLeft: token("space.150"),
		marginRight: token("space.150"),
	},
	chatPanel: {
		width: "100%",
		maxWidth: "400px",
		height: "100vh",
		maxHeight: "800px",
		backgroundColor: token("elevation.surface"),
		border: `1px solid ${token("color.border")}`,
		borderRadius: token("radius.xlarge"),
		display: "flex",
		flexDirection: "column" as const,
	},
	scrollContainer: {
		flex: 1,
		minHeight: 0,
		overflowY: "auto" as const,
		display: "flex",
		flexDirection: "column" as const,
	},
	messagesContainer: {
		padding: token("space.150"),
		paddingBottom: token("space.400"), // 32px gap from ChatComposer
		display: "flex",
		flexDirection: "column" as const,
		gap: token("space.300"),
		flex: 1,
		justifyContent: "flex-end",
	},
	emptyState: {
		display: "flex",
		flexDirection: "column" as const,
		alignItems: "center",
		width: "100%",
	},
	userBubble: {
		backgroundColor: token("color.background.brand.bold"),
		borderRadius: `${token("radius.xlarge")} ${token("radius.xlarge")} ${token("radius.small")} ${token("radius.xlarge")}`,
		padding: `${token("space.100")} ${token("space.150")}`,
		color: token("color.text.inverse"),
		font: token("font.body"),
		maxWidth: "85%",
	},
	assistantContainer: {
		width: "100%",
	},
	assistantMessage: {
		font: token("font.body"),
		color: token("color.text"),
		paddingLeft: token("space.150"),
		paddingRight: token("space.150"),
	},
} as const;

export const HOTEL_LOADING_MESSAGES = [
	"Accessing calendar...",
	"Confirming travel policy...",
	"Searching hotels...",
];
