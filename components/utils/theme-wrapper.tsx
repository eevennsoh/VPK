"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSetColorMode } from "@atlaskit/app-provider";
import { setGlobalTheme } from "@atlaskit/tokens";
import Button from "@atlaskit/button/new";
import Select, { type OptionType } from "@atlaskit/select";
import LightbulbIcon from "@atlaskit/icon/core/lightbulb";
import StarStarredIcon from "@atlaskit/icon/core/star-starred";
import DevicesIcon from "@atlaskit/icon/core/devices";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	actualTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeWrapperProps {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
}

export function ThemeWrapper({ children, defaultTheme = "light", storageKey = "ui-theme" }: Readonly<ThemeWrapperProps>) {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem(storageKey) as Theme;
			if (stored && ["light", "dark", "system"].includes(stored)) {
				return stored;
			}
		}
		return defaultTheme;
	});
	const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");
	const setColorMode = useSetColorMode();

	// Update actual theme based on current theme setting
	useEffect(() => {
		const updateActualTheme = () => {
			let newActualTheme: "light" | "dark" = "light";

			if (theme === "system") {
				newActualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			} else {
				newActualTheme = theme;
			}

			setActualTheme(newActualTheme);

			// Update Atlassian's color mode
			setColorMode(newActualTheme);
			setGlobalTheme({
				colorMode: newActualTheme,
				light: "light",
				dark: "dark",
				shape: "shape",
			});

			// Update document class for our custom CSS
			if (typeof document !== "undefined") {
				const root = document.documentElement;
				root.classList.remove("light", "dark");
				root.classList.add(newActualTheme);
			}
		};

		updateActualTheme();

		// Listen for system theme changes when in system mode
		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			mediaQuery.addEventListener("change", updateActualTheme);
			return () => mediaQuery.removeEventListener("change", updateActualTheme);
		}
	}, [theme, setColorMode]);

	// Update theme and persist to localStorage
	const updateTheme = (newTheme: Theme) => {
		setTheme(newTheme);
		if (typeof window !== "undefined") {
			localStorage.setItem(storageKey, newTheme);
		}
	};

	const value: ThemeContextType = {
		theme,
		setTheme: updateTheme,
		actualTheme,
	};

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeWrapper");
	}
	return context;
}

// Theme toggle component for easy integration
export function ThemeToggle() {
	const { theme, setTheme, actualTheme } = useTheme();

	const handleToggle = () => {
		if (theme === "light") {
			setTheme("dark");
		} else if (theme === "dark") {
			setTheme("system");
		} else {
			setTheme("light");
		}
	};

	const getThemeIcon = () => {
		if (theme === "system") {
			return <DevicesIcon label="System theme" />;
		}
		return actualTheme === "dark" ? <StarStarredIcon label="Dark theme" /> : <LightbulbIcon label="Light theme" />;
	};

	const getThemeLabel = () => {
		if (theme === "system") {
			return `System (${actualTheme})`;
		}
		return theme === "dark" ? "Dark" : "Light";
	};

	return (
		<Button onClick={handleToggle} appearance="subtle" iconBefore={getThemeIcon}>
			{getThemeLabel()}
		</Button>
	);
}

// Theme selector dropdown component
const themeOptions: OptionType[] = [
	{ value: "light", label: "Light" },
	{ value: "dark", label: "Dark" },
	{ value: "system", label: "System" },
];

export function ThemeSelector() {
	const { theme, setTheme } = useTheme();

	const selectedOption = themeOptions.find((opt) => opt.value === theme);

	return (
		<Select
			inputId="theme-selector"
			options={themeOptions}
			value={selectedOption}
			onChange={(newValue: OptionType | null) => {
				if (newValue) {
					setTheme(newValue.value as Theme);
				}
			}}
			isSearchable={false}
			aria-label="Select theme"
		/>
	);
}
