"use client";

import React, { useState, useMemo } from "react";
import { token } from "@atlaskit/tokens";
import Button from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import SearchIcon from "@atlaskit/icon/core/search";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";
import Textfield from "@atlaskit/textfield";
import Checkbox from "@atlaskit/checkbox";
import ExampleCard from "./example-card";
import { Example, DEFAULT_EXAMPLES, USE_CASE_OPTIONS, ROLE_OPTIONS } from "../data/examples";

export type { Example };

export interface DiscoverMoreExamplesProps {
	onExampleClick: (prompt: string) => void;
	onClose: () => void;
	examples?: Example[];
	isClosing?: boolean;
}

export default function DiscoverMoreExamples({ onExampleClick, onClose, examples = DEFAULT_EXAMPLES, isClosing = false }: Readonly<DiscoverMoreExamplesProps>) {
	const [searchTerm, setSearchTerm] = useState("");
	const [showUseCasesMenu, setShowUseCasesMenu] = useState(false);
	const [showRolesMenu, setShowRolesMenu] = useState(false);
	const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
	const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

	const filteredExamples = useMemo(() => examples.filter((example) => {
		// Filter by search term
		const matchesSearch = !searchTerm || example.title.toLowerCase().includes(searchTerm.toLowerCase()) || example.description.toLowerCase().includes(searchTerm.toLowerCase());

		// Filter by use case
		const matchesUseCase = selectedUseCases.length === 0 || selectedUseCases.includes(example.useCase);

		// Filter by role
		const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(example.role);

		return matchesSearch && matchesUseCase && matchesRole;
	}), [examples, searchTerm, selectedUseCases, selectedRoles]);

	return (
		<div
			style={{
				width: "760px",
				marginTop: token("space.300"),
				display: "flex",
				flexDirection: "column",
				animation: isClosing ? "collapseSpace 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "expandSpace 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
				overflow: "hidden",
				height: isClosing ? "600px" : "0px",
			}}
		>
			<style
				dangerouslySetInnerHTML={{
					__html: `
          @keyframes expandSpace {
            from {
              height: 0px;
            }
            to {
              height: 600px;
            }
          }
          @keyframes collapseSpace {
            from {
              height: 600px;
            }
            to {
              height: 0px;
            }
          }
          @keyframes contentFadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes contentFadeSlideDown {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(40px);
            }
          }
        `,
				}}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: token("space.200"),
					flex: 1,
					minHeight: 0,
					animation: isClosing ? "contentFadeSlideDown 0.25s cubic-bezier(0.4, 0, 1, 1) forwards" : "contentFadeSlideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
				}}
			>
				{/* Header with title and Less button */}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						paddingInline: "8px",
					}}
				>
					<Heading size="medium">Discover more examples</Heading>
					<Button appearance="subtle" iconBefore={ChevronUpIcon} onClick={onClose}>
						Less
					</Button>
				</div>

				{/* Search box */}
				<div style={{ height: "32px", paddingInline: "8px" }}>
					<Textfield
						placeholder="Search"
						value={searchTerm}
						onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
						spacing="compact"
						elemBeforeInput={
							<div style={{ paddingLeft: "8px" }}>
								<SearchIcon label="Search" size="small" />
							</div>
						}
					/>
				</div>

				{/* Filter buttons */}
				<div style={{ display: "flex", gap: "8px", paddingInline: "8px" }}>
					<div style={{ position: "relative" }}>
						<Button appearance="default" iconAfter={showUseCasesMenu ? ChevronUpIcon : ChevronDownIcon} onClick={() => setShowUseCasesMenu(!showUseCasesMenu)}>
							Use cases
						</Button>
						{showUseCasesMenu && (
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
									onClick={() => setShowUseCasesMenu(false)}
								/>
								<div
									style={{
										position: "absolute",
										top: "100%",
										left: 0,
										marginTop: "4px",
										backgroundColor: token("elevation.surface.overlay"),
										borderRadius: token("radius.large"),
										boxShadow: token("elevation.shadow.overlay"),
										border: `1px solid ${token("color.border")}`,
										minWidth: "200px",
										zIndex: 500,
										padding: "8px",
									}}
								>
									{USE_CASE_OPTIONS.map((useCase) => (
										<div key={useCase} style={{ padding: "4px 0" }}>
											<Checkbox
												label={useCase}
												isChecked={selectedUseCases.includes(useCase)}
												onChange={(e) => {
													if ((e.target as HTMLInputElement).checked) {
														setSelectedUseCases([...selectedUseCases, useCase]);
													} else {
														setSelectedUseCases(selectedUseCases.filter((uc) => uc !== useCase));
													}
												}}
											/>
										</div>
									))}
								</div>
							</>
						)}
					</div>

					<div style={{ position: "relative" }}>
						<Button appearance="default" iconAfter={showRolesMenu ? ChevronUpIcon : ChevronDownIcon} onClick={() => setShowRolesMenu(!showRolesMenu)}>
							Roles
						</Button>
						{showRolesMenu && (
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
									onClick={() => setShowRolesMenu(false)}
								/>
								<div
									style={{
										position: "absolute",
										top: "100%",
										left: 0,
										marginTop: "4px",
										backgroundColor: token("elevation.surface.overlay"),
										borderRadius: token("radius.large"),
										boxShadow: token("elevation.shadow.overlay"),
										border: `1px solid ${token("color.border")}`,
										minWidth: "200px",
										zIndex: 500,
										padding: "8px",
									}}
								>
									{ROLE_OPTIONS.map((role) => (
										<div key={role} style={{ padding: "4px 0" }}>
											<Checkbox
												label={role}
												isChecked={selectedRoles.includes(role)}
												onChange={(e) => {
													if ((e.target as HTMLInputElement).checked) {
														setSelectedRoles([...selectedRoles, role]);
													} else {
														setSelectedRoles(selectedRoles.filter((r) => r !== role));
													}
												}}
											/>
										</div>
									))}
								</div>
							</>
						)}
					</div>
				</div>

				{/* Cards grid */}
				<div
					className="more-examples-scroll"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(3, 1fr)",
						gridAutoRows: "146px",
						gap: "16px",
						overflowY: "auto",
						overflowX: "hidden",
						padding: "8px",
						paddingBottom: "24px",
						scrollbarWidth: "thin",
						flex: 1,
						minHeight: 0,
					}}
				>
					{filteredExamples.map((example, index) => (
						<ExampleCard
							key={index}
							iconPath={example.iconPath}
							title={example.title}
							description={example.description}
							onClick={() => {
								// Generate a detailed prompt from title and description
								const prompt = example.prompt || `${example.title}. ${example.description}`;
								onExampleClick(prompt);
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
