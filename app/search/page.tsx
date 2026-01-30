"use client";

import AppLayout from "@/components/blocks/layout/page";
import SearchResultsView from "@/components/blocks/search/page";

export default function SearchPage() {
	return (
		<AppLayout product="search">
			<SearchResultsView />
		</AppLayout>
	);
}
