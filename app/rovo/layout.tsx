import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rovo - VPK",
	description: "Rovo AI assistant",
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [{ url: "/apple-touch-icon.png" }],
	},
};

export default function RovoLayout({ children }: { children: React.ReactNode }) {
	return children;
}
