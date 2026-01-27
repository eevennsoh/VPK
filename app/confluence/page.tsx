"use client";

import AppLayout from "@/components/blocks/layout/app-layout";
import ConfluenceView from "@/components/blocks/confluence/confluence-view";

export default function ConfluencePage() {
	return (
		<AppLayout product="confluence">
			<ConfluenceView />
		</AppLayout>
	);
}
