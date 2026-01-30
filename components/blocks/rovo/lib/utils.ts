// Hoisted regex patterns - prevents recreation on each function call
const ESCAPE_PATTERNS = [
	{ pattern: /&/g, replacement: "&amp;" },
	{ pattern: /</g, replacement: "&lt;" },
	{ pattern: />/g, replacement: "&gt;" },
] as const;

const MARKDOWN_PATTERNS = [
	// Code blocks ```code```
	{ pattern: /```([\s\S]*?)```/g, replacement: "<pre><code>$1</code></pre>" },
	// Headings (must be processed before line breaks)
	{ pattern: /^### (.*?)$/gm, replacement: "<h3>$1</h3>" },
	{ pattern: /^## (.*?)$/gm, replacement: "<h2>$1</h2>" },
	{ pattern: /^# (.*?)$/gm, replacement: "<h1>$1</h1>" },
	// Remove newlines immediately after headers to prevent extra br tags
	{ pattern: /(<\/h[1-6]>)\n+/g, replacement: "$1" },
	// Unordered lists - handle * and - bullets
	{ pattern: /^[*-] (.+)$/gm, replacement: "<li>$1</li>" },
	// Ordered lists
	{ pattern: /^\d+\. (.+)$/gm, replacement: "<li>$1</li>" },
] as const;

const LIST_WRAPPER_PATTERN = /(<li>.*?<\/li>[\n\r]*)+/g;
const LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
const INLINE_CODE_PATTERN = /`([^`]+)`/g;
const BOLD_PATTERN = /\*\*([^*]+)\*\*/g;
const ITALIC_PATTERN = /(^|[^*])\*([^*]+)\*(?!\*)/g;
const MULTIPLE_NEWLINES_PATTERN = /\n{3,}/g;
const NEWLINE_PATTERN = /\n/g;

// Enhanced markdown-to-HTML renderer for assistant messages
export function renderMarkdownToHtml(text: string): string {
	let html = text;

	// Escape HTML characters
	for (const { pattern, replacement } of ESCAPE_PATTERNS) {
		html = html.replace(pattern, replacement);
	}

	// Apply markdown patterns
	for (const { pattern, replacement } of MARKDOWN_PATTERNS) {
		html = html.replace(pattern, replacement);
	}

	// Wrap consecutive <li> tags in <ul> and clean up extra newlines
	html = html.replace(LIST_WRAPPER_PATTERN, (match) => {
		const cleaned = match.replace(/[\n\r]+/g, "");
		return `<ul>${cleaned}</ul>`;
	});

	// Links [text](url)
	html = html.replace(
		LINK_PATTERN,
		'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
	);

	// Inline code `code`
	html = html.replace(INLINE_CODE_PATTERN, "<code>$1</code>");

	// Bold **text**
	html = html.replace(BOLD_PATTERN, "<strong>$1</strong>");

	// Italic *text* (simple heuristic, avoids matching **bold**)
	html = html.replace(ITALIC_PATTERN, "$1<em>$2</em>");

	// Clean up multiple consecutive line breaks (3+ newlines become 2)
	html = html.replace(MULTIPLE_NEWLINES_PATTERN, "\n\n");

	// Line breaks
	html = html.replace(NEWLINE_PATTERN, "<br/>");

	return html;
}
