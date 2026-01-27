// Enhanced markdown-to-HTML renderer for assistant messages
export function renderMarkdownToHtml(text: string): string {
	const escapeHtml = (s: string) =>
		s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

	let html = escapeHtml(text);

	// Code blocks ```code```
	html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");

	// Headings (must be processed before line breaks)
	html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
	html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
	html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>");

	// Remove newlines immediately after headers to prevent extra br tags
	html = html.replace(/(<\/h[1-6]>)\n+/g, "$1");

	// Unordered lists - handle * and - bullets
	html = html.replace(/^[*-] (.+)$/gm, "<li>$1</li>");

	// Ordered lists
	html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

	// Wrap consecutive <li> tags in <ul> and clean up extra newlines
	html = html.replace(/(<li>.*?<\/li>[\n\r]*)+/g, (match) => {
		const cleaned = match.replace(/[\n\r]+/g, "");
		return `<ul>${cleaned}</ul>`;
	});

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

	// Clean up multiple consecutive line breaks (3+ newlines become 2)
	html = html.replace(/\n{3,}/g, "\n\n");

	// Line breaks
	html = html.replace(/\n/g, "<br/>");

	return html;
}
