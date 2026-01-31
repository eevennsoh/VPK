import { useState, useEffect } from "react";

/**
 * Hook that returns true after the component has mounted.
 * Useful for avoiding hydration mismatches in Next.js.
 */
export function useIsMounted(): boolean {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return isMounted;
}
