import { useState, useEffect } from "react";

interface UrlParams {
	name: string | null;
}

/**
 * Hook that extracts URL parameters from the current page URL.
 * Specifically extracts the 'name' parameter used for Rovo agent names.
 */
export function useUrlParams(): UrlParams {
	const [params, setParams] = useState<UrlParams>({ name: null });

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const name = urlParams.get("name");
		setParams({ name });
	}, []);

	return params;
}
