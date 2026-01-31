"use client";

import { useState } from "react";
import { IconButton } from "@atlaskit/button/new";
import Tooltip from "@atlaskit/tooltip";
import AddIcon from "@atlaskit/icon/core/add";
import CustomizeIcon from "@atlaskit/icon/core/customize";
import ClipboardIcon from "@atlaskit/icon/core/clipboard";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import CrossIcon from "@atlaskit/icon/core/cross";
import AddMenu from "./add-menu";
import CustomizeMenu, { type CustomizeMenuProps } from "./customize-menu";
import PlanBadge from "./plan-badge";
import { composerStyles } from "../data/styles";

interface ComposerActionsProps {
	showAddMenu: boolean;
	showCustomizeMenu: boolean;
	showPlanMode: boolean;
	showMicrophone: boolean;
	planModeEnabled: boolean;
	onPlanModeToggle?: (enabled: boolean) => void;
	isListening: boolean;
	onToggleDictation?: () => void;
	customizeMenuProps?: Omit<CustomizeMenuProps, "onClose">;
	canSubmit: boolean;
	onSubmit: () => void;
}

export default function ComposerActions({
	showAddMenu,
	showCustomizeMenu,
	showPlanMode,
	showMicrophone,
	planModeEnabled,
	onPlanModeToggle,
	isListening,
	onToggleDictation,
	customizeMenuProps,
	canSubmit,
	onSubmit,
}: Readonly<ComposerActionsProps>): React.ReactElement {
	const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
	const [isCustomizeMenuOpen, setIsCustomizeMenuOpen] = useState(false);

	return (
		<div style={composerStyles.actionsRow}>
			<div style={{ ...composerStyles.buttonGroup, position: "relative" }}>
				{showAddMenu && (
					<div style={{ position: "relative" }}>
						<IconButton
							icon={AddIcon}
							label="Add"
							appearance="subtle"
							shape="circle"
							onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
						/>
						{isAddMenuOpen && <AddMenu onClose={() => setIsAddMenuOpen(false)} />}
					</div>
				)}

				{showCustomizeMenu && (
					<div style={{ position: "relative" }}>
						<IconButton
							icon={CustomizeIcon}
							label="Customize"
							appearance="subtle"
							shape="circle"
							onClick={() => setIsCustomizeMenuOpen(!isCustomizeMenuOpen)}
						/>
						{isCustomizeMenuOpen && customizeMenuProps && (
							<CustomizeMenu {...customizeMenuProps} onClose={() => setIsCustomizeMenuOpen(false)} />
						)}
					</div>
				)}

				{showPlanMode && !planModeEnabled && (
					<Tooltip content="Enter plan mode ⇧Tab" position="top">
						<IconButton
							icon={ClipboardIcon}
							label="Enter plan mode"
							appearance="subtle"
							shape="circle"
							onClick={() => onPlanModeToggle?.(true)}
						/>
					</Tooltip>
				)}
				{showPlanMode && planModeEnabled && <PlanBadge onClose={() => onPlanModeToggle?.(false)} />}
			</div>

			<div style={composerStyles.buttonGroup}>
				{showMicrophone && onToggleDictation && (
					<IconButton
						icon={isListening ? CrossIcon : MicrophoneIcon}
						label={isListening ? "Stop listening" : "Voice"}
						appearance="subtle"
						spacing="default"
						shape="circle"
						onClick={onToggleDictation}
					/>
				)}

				<IconButton
					icon={ArrowUpIcon}
					label="Submit"
					appearance="primary"
					spacing="default"
					shape="circle"
					isDisabled={!canSubmit}
					onClick={onSubmit}
				/>
			</div>
		</div>
	);
}
