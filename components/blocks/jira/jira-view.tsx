"use client";

import React, { useState, useEffect } from "react";
import { token } from "@atlaskit/tokens";
import JiraHeader from "./jira-header";
import BoardToolbar from "./board-toolbar";
import BoardColumnsContainer from "./board-columns-container";
import JiraWorkItemModal from "./jira-work-item-modal";

export default function JiraView() {
	const [selectedTab, setSelectedTab] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedWorkItem, setSelectedWorkItem] = useState<{ title: string; code: string } | null>(null);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleCardClick = (title: string, code: string) => {
		setSelectedWorkItem({ title, code });
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const avatars = [
		{ src: "/people/Avatar-1.png", name: "User 1" },
		{ src: "/people/Avatar-2.png", name: "User 2" },
		{ src: "/people/Avatar-3.png", name: "User 3" },
		{ src: "/people/Avatar-4.png", name: "User 4" },
		{ src: "/people/Avatar-5.png", name: "User 5" },
		{ src: "/people/Avatar-6.png", name: "User 6" },
		{ src: "/people/Avatar-7.png", name: "User 7" },
	];

	return (
		<div style={{ height: "calc(100vh - 48px)", display: "flex", flexDirection: "column" }}>
			{/* Header Section */}
			<JiraHeader selectedTab={selectedTab} onTabChange={setSelectedTab} />

			{/* Board Tab Content */}
			{selectedTab === 1 && (
				<div
					style={{ flexGrow: 1, display: "flex", flexDirection: "column", paddingTop: token("space.200") }}
				>
					{/* Toolbar */}
					<BoardToolbar avatars={avatars} isMounted={isMounted} />

					{/* Board columns */}
					<BoardColumnsContainer onCardClick={handleCardClick} />
				</div>
			)}

			{/* Work Item Modal */}
			<JiraWorkItemModal
				isOpen={isModalOpen}
				onClose={handleModalClose}
				workItemTitle={selectedWorkItem?.title}
				workItemCode={selectedWorkItem?.code}
			/>
		</div>
	);
}
