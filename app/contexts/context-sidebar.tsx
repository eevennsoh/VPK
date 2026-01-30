"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Product = "home" | "jira" | "confluence" | "rovo" | "search";

interface SidebarContextType {
	isVisible: boolean;
	isHovered: boolean;
	currentRoute: Product;
	toggleSidebar: () => void;
	setHovered: (hovered: boolean) => void;
	setCurrentRoute: (route: Product) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
	const [isVisible, setIsVisible] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [currentRoute, setCurrentRoute] = useState<Product>("home");

	const toggleSidebar = () => {
		setIsVisible(!isVisible);
	};

	const setHovered = (hovered: boolean) => {
		setIsHovered(hovered);
	};

	return (
		<SidebarContext.Provider
			value={{ isVisible, isHovered, currentRoute, toggleSidebar, setHovered, setCurrentRoute }}
		>
			{children}
		</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (context === undefined) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
}
