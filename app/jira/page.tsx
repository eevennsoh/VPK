"use client";

import AppLayout from "@/components/blocks/layout/page";
import JiraView from "@/components/blocks/jira/page";

export default function JiraPage() {
	return (
		<AppLayout product="jira">
			<JiraView />
		</AppLayout>
	);
}
