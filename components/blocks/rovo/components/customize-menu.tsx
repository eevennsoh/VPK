"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import Toggle from "@atlaskit/toggle";
import Heading from "@atlaskit/heading";
import { DropdownItem } from "@atlaskit/dropdown-menu";
import RandomizeIcon from "@atlaskit/icon-lab/core/randomize";
import ZoomInIcon from "@atlaskit/icon/core/zoom-in";
import TelescopeIcon from "@atlaskit/icon-lab/core/telescope";
import GlobeIcon from "@atlaskit/icon/core/globe";
import OfficeBuildingIcon from "@atlaskit/icon/core/office-building";
import AppsIcon from "@atlaskit/icon/core/apps";
import SettingsIcon from "@atlaskit/icon/core/settings";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import AddIcon from "@atlaskit/icon/core/add";

interface CustomizeMenuProps {
	selectedReasoning: string;
	onReasoningChange: (reasoning: string) => void;
	webResultsEnabled: boolean;
	onWebResultsChange: (enabled: boolean) => void;
	companyKnowledgeEnabled: boolean;
	onCompanyKnowledgeChange: (enabled: boolean) => void;
	onClose: () => void;
}

export default function CustomizeMenu({
	selectedReasoning,
	onReasoningChange,
	webResultsEnabled,
	onWebResultsChange,
	companyKnowledgeEnabled,
	onCompanyKnowledgeChange,
	onClose,
}: CustomizeMenuProps) {
	return (
		<>
			<div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 400,
				}}
				onClick={onClose}
			/>
			<div
				style={{
					position: "fixed",
					bottom: "94px",
					right: "28px",
					zIndex: 500,
					backgroundColor: token("elevation.surface.overlay"),
					borderRadius: token("radius.large"),
					boxShadow: token("elevation.shadow.overlay"),
					border: `1px solid ${token("color.border")}`,
					width: "330px",
					padding: token("space.100"),
				}}
			>
				{/* Reasoning Section */}
				<div style={{ marginBottom: token("space.200") }}>
					<div style={{ padding: `${token("space.050")} ${token("space.200")} 0` }}>
						<Heading size="xxsmall" color="color.text">
							Reasoning
						</Heading>
					</div>
					<div
						style={{
							backgroundColor: token("elevation.surface.sunken"),
							borderRadius: token("radius.xlarge"),
							marginTop: token("space.100"),
						}}
					>
						<div style={{ paddingTop: token("space.100"), paddingBottom: token("space.100") }}>
							<DropdownItem
								elemBefore={
									<div
										style={{
											width: "32px",
											height: "32px",
											borderRadius: token("radius.full"),
											backgroundColor:
												selectedReasoning === "let-rovo-decide"
													? token("color.background.selected")
													: token("color.background.neutral"),
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<RandomizeIcon label="Let Rovo decide" />
									</div>
								}
								description="Rovo picks reasoning for the job"
								onClick={() => {
									onReasoningChange("let-rovo-decide");
									onClose();
								}}
							>
								Let Rovo decide
							</DropdownItem>
						</div>
						<div style={{ paddingTop: token("space.100"), paddingBottom: token("space.100") }}>
							<DropdownItem
								elemBefore={
									<div
										style={{
											width: "32px",
											height: "32px",
											borderRadius: token("radius.full"),
											backgroundColor:
												selectedReasoning === "think-deeper"
													? token("color.background.selected")
													: token("color.background.neutral"),
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<ZoomInIcon label="Think deeper" />
									</div>
								}
								description="Longer thinking for robust responses"
								onClick={() => {
									onReasoningChange("think-deeper");
									onClose();
								}}
							>
								Think deeper
							</DropdownItem>
						</div>
						<div style={{ paddingTop: token("space.100"), paddingBottom: token("space.100") }}>
							<DropdownItem
								elemBefore={
									<div
										style={{
											width: "32px",
											height: "32px",
											borderRadius: token("radius.full"),
											backgroundColor:
												selectedReasoning === "deep-research"
													? token("color.background.selected")
													: token("color.background.neutral"),
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<TelescopeIcon label="Deep research" />
									</div>
								}
								elemAfter={selectedReasoning === "deep-research" ? <AddIcon label="Selected" /> : null}
								description="Synthesize insights and create reports"
								onClick={() => {
									onReasoningChange("deep-research");
									onClose();
								}}
							>
								Deep research
							</DropdownItem>
						</div>
					</div>
				</div>

				{/* Sources Section */}
				<div style={{ marginBottom: token("space.200") }}>
					<div style={{ padding: `${token("space.100")} ${token("space.200")} 0` }}>
						<Heading size="xxsmall" color="color.text">
							Sources
						</Heading>
					</div>
					<div
						style={{
							backgroundColor: token("elevation.surface.sunken"),
							borderRadius: token("radius.xlarge"),
							marginTop: token("space.100"),
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								padding: token("space.150"),
								justifyContent: "space-between",
							}}
						>
							<div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
								<div
									style={{
										width: "32px",
										height: "32px",
										borderRadius: token("radius.full"),
										backgroundColor: token("color.background.neutral"),
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<GlobeIcon label="Web results" />
								</div>
								<span style={{ font: token("font.body") }}>Include web results</span>
							</div>
							<Toggle
								isChecked={webResultsEnabled}
								onChange={() => onWebResultsChange(!webResultsEnabled)}
								label="Include web results"
							/>
						</div>

						<div
							style={{
								display: "flex",
								alignItems: "center",
								padding: token("space.150"),
								justifyContent: "space-between",
								backgroundColor: companyKnowledgeEnabled
									? (token("color.background.selected" as any) as string)
									: "transparent",
								borderRadius: `${token("radius.xlarge")} ${token("radius.xlarge")} 0 0`,
							}}
						>
							<div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
								<div
									style={{
										width: "32px",
										height: "32px",
										borderRadius: token("radius.full"),
										backgroundColor: companyKnowledgeEnabled
											? token("color.background.selected")
											: token("color.background.neutral"),
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<OfficeBuildingIcon label="Company knowledge" />
								</div>
								<span
									style={{
										font: token("font.body"),
										fontWeight: companyKnowledgeEnabled ? 500 : 400,
									}}
								>
									Search company knowledge
								</span>
							</div>
							<Toggle
								isChecked={companyKnowledgeEnabled}
								onChange={() => onCompanyKnowledgeChange(!companyKnowledgeEnabled)}
								label="Search company knowledge"
							/>
						</div>

						<div
							style={{
								height: "1px",
								backgroundColor: token("color.border"),
								margin: `0 ${token("space.200")}`,
							}}
						/>

						<DropdownItem
							elemBefore={
								<div
									style={{
										width: "32px",
										height: "32px",
										borderRadius: token("radius.full"),
										backgroundColor: token("color.background.neutral"),
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<AppsIcon label="Filter by apps" />
								</div>
							}
							onClick={onClose}
						>
							Filter by apps
						</DropdownItem>
					</div>
				</div>

				{/* Settings Section */}
				<div
					style={{
						backgroundColor: token("elevation.surface.sunken"),
						borderRadius: token("radius.xlarge"),
					}}
				>
					<DropdownItem
						elemBefore={
							<div
								style={{
									width: "32px",
									height: "32px",
									borderRadius: token("radius.full"),
									backgroundColor: token("color.background.neutral"),
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<SettingsIcon label="Settings" />
							</div>
						}
						elemAfter={<ChevronRightIcon label="Open settings" />}
						onClick={onClose}
					>
						Rovo settings
					</DropdownItem>
				</div>
			</div>
		</>
	);
}
