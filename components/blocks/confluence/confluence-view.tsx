"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import ConfluenceHeader from "./confluence-header";
import DocumentEditor from "./document-editor";
import FloatingConfluenceActions from "./floating-confluence-actions";

export default function ConfluenceView() {
	return (
		<div
			style={{
				height: "calc(100vh - 48px)", // Full viewport minus TopNavigation height
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}
		>
			{/* Fixed Header */}
			<ConfluenceHeader />

			{/* Scrollable Content Area */}
			<div
				style={{
					flex: 1,
					overflow: "auto",
					marginTop: "56px", // Height of fixed header
				}}
			>
				<div
					style={{
						padding: `0px ${token("space.300")}`,
						display: "flex",
						justifyContent: "center",
					}}
				>
					<div style={{ maxWidth: "760px", width: "100%" }}>
						<DocumentEditor />
					</div>
				</div>
			</div>

			{/* Floating Confluence Actions */}
			<FloatingConfluenceActions />
		</div>
	);
}
