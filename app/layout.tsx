import type { Metadata } from "next";
import "@atlaskit/css-reset";
import "./globals.css";
import "@/lib/platform-feature-flags";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
	title: "V—P—K: Venn Prototype Kit",
	description: "A prototype kit to vibe code Atlassian products",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				{/* Atlassian DS-CDN Font Integration */}
				<link rel="preconnect" href="https://ds-cdn.prod-east.frontend.public.atl-paas.net" />
				<link rel="preload" href="https://ds-cdn.prod-east.frontend.public.atl-paas.net/assets/fonts/atlassian-sans/v3/AtlassianSans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
				<link rel="preload stylesheet" href="https://ds-cdn.prod-east.frontend.public.atl-paas.net/assets/font-rules/v5/atlassian-fonts.css" as="style" crossOrigin="anonymous" />
			</head>
			<body className="font-sans antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
