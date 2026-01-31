"use client";

import { token } from "@atlaskit/tokens";
import { Inline, Text } from "@atlaskit/primitives";
import Image from "next/image";
import Button from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import { INITIAL_SUGGESTIONS } from "../data/initial-suggestions";
import RovoChatInput from "./rovo-chat-input";
import DiscoverMoreExamples from "./discover-more-examples";
import styles from "../rovo.module.css";

interface RovoInitialViewProps {
	userName: string | null;
	prompt: string;
	interimText: string;
	isListening: boolean;
	onPromptChange: (value: string) => void;
	onSubmit: () => void;
	onToggleDictation: () => void;
	contextEnabled: boolean;
	onContextToggle: (enabled: boolean) => void;
	selectedReasoning: string;
	onReasoningChange: (value: string) => void;
	webResultsEnabled: boolean;
	onWebResultsChange: (enabled: boolean) => void;
	companyKnowledgeEnabled: boolean;
	onCompanyKnowledgeChange: (enabled: boolean) => void;
	showMoreSection: boolean;
	onShowMoreSection: (show: boolean) => void;
	isClosingMore: boolean;
	onSetIsClosingMore: (closing: boolean) => void;
}

export default function RovoInitialView({
	userName,
	prompt,
	interimText,
	isListening,
	onPromptChange,
	onSubmit,
	onToggleDictation,
	contextEnabled,
	onContextToggle,
	selectedReasoning,
	onReasoningChange,
	webResultsEnabled,
	onWebResultsChange,
	companyKnowledgeEnabled,
	onCompanyKnowledgeChange,
	showMoreSection,
	onShowMoreSection,
	isClosingMore,
	onSetIsClosingMore,
}: Readonly<RovoInitialViewProps>) {
	const handleSuggestionClick = (suggestion: string) => {
		onPromptChange(suggestion);
	};

	const handleCloseMoreSection = () => {
		onSetIsClosingMore(true);
		setTimeout(() => {
			onShowMoreSection(false);
			onSetIsClosingMore(false);
		}, 350);
	};

	return (
		<>
			{/* Vertically centered container */}
			<div style={{ width: "800px", maxWidth: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: token("space.100") }}>
				{/* Rovo chat bubbles image */}
				<div>
					<Image src="/rovo-chat-bubbles.svg" alt="Rovo Chat" width={74} height={67} />
				</div>

				{/* How can I help? title */}
				<div style={{ marginBottom: token("space.400") }}>
					<Heading size="xlarge">
						{userName ? `How can I help, ${userName}?` : "How can I help?"}
					</Heading>
				</div>

				{/* Prompt box based on RovoChatInput - full width with 16px margin */}
				<div style={{ width: "100%", padding: `0 ${token("space.200")}` }}>
					<RovoChatInput
						prompt={prompt}
						interimText={interimText}
						isListening={isListening}
						onPromptChange={onPromptChange}
						onSubmit={onSubmit}
						onToggleDictation={onToggleDictation}
						contextEnabled={contextEnabled}
						onContextToggle={onContextToggle}
						product="rovo"
						selectedReasoning={selectedReasoning}
						onReasoningChange={onReasoningChange}
						webResultsEnabled={webResultsEnabled}
						onWebResultsChange={onWebResultsChange}
						companyKnowledgeEnabled={companyKnowledgeEnabled}
						onCompanyKnowledgeChange={onCompanyKnowledgeChange}
						customHeight="131px"
						hideUsesAI={true}
					/>
				</div>

				{/* Suggestion buttons */}
				{!showMoreSection && (
					<div
						style={{
							width: "100%",
							padding: `0 ${token("space.300")}`,
							marginTop: token("space.300"),
						}}
					>
						<Inline space="space.100" alignInline="center" shouldWrap>
							{INITIAL_SUGGESTIONS.map((suggestion) => (
								<span key={suggestion.label} className={styles.suggestionBtn}>
									<Button
										appearance="default"
										iconBefore={suggestion.icon}
										onClick={() => handleSuggestionClick(suggestion.label)}
									>
										{suggestion.label}
									</Button>
								</span>
							))}
							<span className={styles.suggestionBtn}>
								<Button
									appearance="default"
									iconBefore={ChevronDownIcon}
									onClick={() => onShowMoreSection(true)}
								>
									More
								</Button>
							</span>
						</Inline>
					</div>
				)}

				{/* More section */}
				{showMoreSection && (
					<DiscoverMoreExamples
						onExampleClick={(examplePrompt) => {
							onPromptChange(examplePrompt);
						}}
						onClose={handleCloseMoreSection}
						isClosing={isClosingMore}
					/>
				)}
			</div>

			{/* "Uses AI. verify results." text fixed to bottom center */}
			<div
				style={{
					position: "fixed",
					bottom: token("space.300"),
					left: "50%",
					transform: "translateX(-50%)",
					textAlign: "center",
				}}
			>
				<Text size="small" color="color.text.subtlest">
					Uses AI. Verify results.
				</Text>
			</div>
		</>
	);
}
