/**
 * Loading messages shown during widget loading states
 */

export const HOTEL_LOADING_MESSAGES = [
	"Accessing calendar...",
	"Confirming travel policy...",
	"Searching hotels...",
] as const;

export const WIDGET_LOADING_MESSAGES: Record<string, string> = {
	"work-items": "Loading work items...",
	default: "Loading widget...",
} as const;
