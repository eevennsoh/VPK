import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Jira - VPK",
	description: "Jira board view",
};

export default function JiraLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
