"use client";

import AppLayout from "@/components/blocks/layout/page";
import ConfluenceView from "@/components/blocks/confluence/page";

export default function ConfluencePage() {
	return (
		<AppLayout product="confluence">
			<ConfluenceView />
		</AppLayout>
	);
}
