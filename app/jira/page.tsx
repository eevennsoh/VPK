"use client";

import AppLayout from "@/components/blocks/layout/app-layout";
import JiraView from "@/components/blocks/jira/jira-view";

export default function JiraPage() {
	return (
		<AppLayout product="jira">
			<JiraView />
		</AppLayout>
	);
}
