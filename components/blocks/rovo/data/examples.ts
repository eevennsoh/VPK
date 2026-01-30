/**
 * Examples data for the discover more examples panel
 */

export interface Example {
	iconPath: string;
	title: string;
	description: string;
	useCase: string;
	role: string;
	prompt?: string;
}

export const DEFAULT_EXAMPLES: Example[] = [
	{ iconPath: "/rovoillustrations/form.svg", title: "Analyze customer feedback", description: "Gather and synthesize customer feedback on product/feature", useCase: "Analysis", role: "Product Manager" },
	{ iconPath: "/rovoillustrations/lightbulb.svg", title: "Brainstorm ideas for project", description: "We're running a brainstorming session on topic/problem/goal", useCase: "Brainstorming", role: "Product Manager" },
	{ iconPath: "/rovoillustrations/visible.svg", title: "Compare Jira work item", description: "Review the summary, description, and comments of the current request", useCase: "Analysis", role: "Developer" },
	{ iconPath: "/rovoillustrations/check.svg", title: "Convert request into JQL", description: "Write a JQL query to find all unresolved bugs assigned to my team", useCase: "Analysis", role: "Developer" },
	{ iconPath: "/rovoillustrations/form.svg", title: "Create a document", description: "Generate a Confluence page summarizing information", useCase: "Documentation", role: "Product Manager" },
	{ iconPath: "/rovoillustrations/shapes.svg", title: "Create A/B testing plan", description: "Create a detailed A/B testing plan for project/feature", useCase: "Planning", role: "Product Manager" },
	{ iconPath: "/rovoillustrations/check.svg", title: "Create an effective OKR", description: "Help me create an effective OKR for my team", useCase: "Planning", role: "Product Manager" },
	{ iconPath: "/rovoillustrations/visible.svg", title: "Create background research plan", description: "Create a first draft or conduct background research on topic/work", useCase: "Planning", role: "Product Manager" },
	{ iconPath: "/rovoillustrations/download.svg", title: "Create customer onboarding steps", description: "As a customer success lead, outline a clear customer onboarding", useCase: "Planning", role: "Customer Success" },
];

export const USE_CASE_OPTIONS = ["Analysis", "Brainstorming", "Documentation", "Planning"] as const;
export const ROLE_OPTIONS = ["Product Manager", "Developer", "Designer", "Customer Success"] as const;
