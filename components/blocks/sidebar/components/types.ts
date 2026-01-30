export interface NavigationItemProps {
	icon: React.ComponentType<any>;
	label: string;
	href?: string;
	isSelected?: boolean;
	hasChevron?: boolean;
	hasExternalLink?: boolean;
	hasActions?: boolean;
	onClick?: () => void;
}

export interface NavigationItemWithHoverChevronProps {
	icon: React.ComponentType<any>;
	label: string;
	isExpanded?: boolean;
	hasActions?: boolean;
	onClick?: () => void;
}
