import { ConfluenceLogo, LoomLogoWrapper, GoalsLogo, TeamsLogo } from "../components/product-logos";

export interface StarredProject {
	id: string;
	name: string;
	imageSrc: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComponent = React.ComponentType<any>;

export interface ExternalLink {
	id: string;
	label: string;
	icon: IconComponent;
	href?: string;
}

export const STARRED_PROJECTS: readonly StarredProject[] = [
	{
		id: "vitafleet-q4-launch",
		name: "Vitafleet Q4 Launch",
		imageSrc: "/Projectavatar.png",
	},
	{
		id: "customer-portal",
		name: "Customer Portal",
		imageSrc: "/Project-1.png",
	},
	{
		id: "vitafleet-research-team",
		name: "VitaFleet Research Team",
		imageSrc: "/Project-2.png",
	},
] as const;

export const JIRA_EXTERNAL_LINKS: readonly ExternalLink[] = [
	{
		id: "confluence",
		label: "Confluence",
		icon: ConfluenceLogo,
		href: "/confluence",
	},
	{
		id: "loom",
		label: "Loom",
		icon: LoomLogoWrapper,
	},
	{
		id: "goals",
		label: "Goals",
		icon: GoalsLogo,
	},
	{
		id: "teams",
		label: "Teams",
		icon: TeamsLogo,
	},
] as const;
