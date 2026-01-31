"use client";

import { type CustomizeMenuProps } from "./components/customize-menu";
import ComposerInput from "./components/composer-input";
import ComposerActions from "./components/composer-actions";
import FooterDisclaimer from "@/components/ui/footer-disclaimer";
import { composerStyles } from "./data/styles";

/** Configuration for which features to display in the composer */
export interface ComposerFeatures {
	/** Show the Add (+) menu button */
	addMenu?: boolean;
	/** Show the Customize (sliders) menu button */
	customizeMenu?: boolean;
	/** Show the Plan mode button/badge */
	planMode?: boolean;
	/** Show the microphone button */
	microphone?: boolean;
	/** Show the disclaimer footer */
	disclaimer?: boolean;
}

const DEFAULT_FEATURES: ComposerFeatures = {
	addMenu: true,
	customizeMenu: true,
	planMode: true,
	microphone: true,
	disclaimer: true,
};

export interface ChatComposerProps {
	/** Current prompt text */
	prompt: string;
	/** Callback when prompt changes */
	onPromptChange: (prompt: string) => void;
	/** Callback when form is submitted */
	onSubmit: () => void;
	/** Placeholder text for the textarea */
	placeholder?: string;
	/** Feature toggles for the composer UI */
	features?: ComposerFeatures;
	/** Custom height for the textarea container */
	customHeight?: string;
	/** Whether plan mode is enabled */
	planModeEnabled?: boolean;
	/** Callback when plan mode toggle is clicked */
	onPlanModeToggle?: (enabled: boolean) => void;
	/** Whether voice dictation is active */
	isListening?: boolean;
	/** Interim (not yet finalized) speech-to-text */
	interimText?: string;
	/** Callback to toggle voice dictation */
	onToggleDictation?: () => void;
	/** Props for the customize menu (required if features.customizeMenu is true) */
	customizeMenuProps?: Omit<CustomizeMenuProps, "onClose">;
}

export default function ChatComposer({
	prompt,
	onPromptChange,
	onSubmit,
	placeholder = "Ask, @mention, or / for skills",
	features: featuresProp,
	customHeight,
	planModeEnabled = false,
	onPlanModeToggle,
	isListening = false,
	interimText = "",
	onToggleDictation,
	customizeMenuProps,
}: Readonly<ChatComposerProps>): React.ReactElement {
	const features = { ...DEFAULT_FEATURES, ...featuresProp };

	const handleSubmit = () => {
		if (!prompt.trim()) return;
		onSubmit();
	};

	const containerStyle = {
		...composerStyles.container,
		...(customHeight ? { display: "flex", flexDirection: "column" as const, height: customHeight } : {}),
	};

	return (
		<div style={composerStyles.wrapper}>
			<div style={containerStyle}>
				<ComposerInput
					prompt={prompt}
					onPromptChange={onPromptChange}
					onSubmit={handleSubmit}
					placeholder={placeholder}
					customHeight={customHeight}
					isListening={isListening}
					interimText={interimText}
				/>

				<ComposerActions
					showAddMenu={features.addMenu ?? true}
					showCustomizeMenu={features.customizeMenu ?? true}
					showPlanMode={features.planMode ?? true}
					showMicrophone={features.microphone ?? true}
					planModeEnabled={planModeEnabled}
					onPlanModeToggle={onPlanModeToggle}
					isListening={isListening}
					onToggleDictation={onToggleDictation}
					customizeMenuProps={customizeMenuProps}
					canSubmit={!!prompt.trim()}
					onSubmit={handleSubmit}
				/>
			</div>

			{features.disclaimer && <FooterDisclaimer />}
		</div>
	);
}
