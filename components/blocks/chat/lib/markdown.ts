/**
 * Minimal markdown-to-HTML renderer for assistant messages.
 * Supports: links, inline code, bold, italic, and line breaks.
 */
export function renderMarkdownToHtml(text: string): string {
	const escapeHtml = (s: string) =>
		s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

	let html = escapeHtml(text);

	// Links [text](url)
	html = html.replace(
		/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
		'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
	);

	// Inline code `code`
	html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

	// Bold **text**
	html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

	// Italic *text* (simple heuristic, avoids matching **bold**)
	html = html.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>");

	// Line breaks
	html = html.replace(/\n/g, "<br/>");

	return html;
}
