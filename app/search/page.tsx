"use client";

import AppLayout from "@/components/blocks/layout/app-layout";
import SearchResultsView from "@/components/blocks/search/search-results-view";

export default function SearchPage() {
	return (
		<AppLayout product="search">
			<SearchResultsView />
		</AppLayout>
	);
}
