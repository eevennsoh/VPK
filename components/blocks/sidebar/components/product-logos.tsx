"use client";

import { ConfluenceIcon, JiraIcon, LoomIcon, GoalsIcon, TeamsIcon } from "@atlaskit/logo";

interface LogoProps {
	label: string;
	color?: string;
}

export function ConfluenceLogo(_props: Readonly<LogoProps>) {
	return <ConfluenceIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />;
}

export function JiraLogo(_props: Readonly<LogoProps>) {
	return <JiraIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />;
}

export function LoomLogoWrapper(_props: Readonly<LogoProps>) {
	return <LoomIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />;
}

export function GoalsLogo(_props: Readonly<LogoProps>) {
	return <GoalsIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />;
}

export function TeamsLogo(_props: Readonly<LogoProps>) {
	return <TeamsIcon appearance="brand" size="xsmall" shouldUseNewLogoDesign />;
}
