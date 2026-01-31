"use client";

import React from "react";
import { Inline } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import BoardColumn from "./board-column";
import KanbanCard from "./kanban-card";
import { BOARD_COLUMNS } from "../data/board-data";

interface BoardColumnsContainerProps {
	onCardClick: (title: string, code: string) => void;
}

const BoardColumnsContainer: React.FC<Readonly<BoardColumnsContainerProps>> = ({ onCardClick }) => {
	return (
		<div
			style={{
				flex: 1,
				paddingBlock: token("space.200"),
				paddingInline: token("space.300"),
				overflowX: "auto",
				overflowY: "hidden",
				minHeight: 0,
			}}
		>
			<Inline space="space.150" alignBlock="stretch">
				{BOARD_COLUMNS.map((column) => (
					<BoardColumn key={column.title} title={column.title} count={column.count}>
						{column.cards.map((card) => (
							<KanbanCard
								key={card.code}
								title={card.title}
								code={card.code}
								tags={card.tags.map((tag) => ({ text: tag.text, color: tag.color }))}
								priority={card.priority}
								avatarSrc={card.avatarSrc}
								onClick={() => onCardClick(card.title, card.code)}
							/>
						))}
					</BoardColumn>
				))}

				{/* Spacer for right padding */}
				<div style={{ minWidth: "24px", width: "24px", flexShrink: 0 }} />
			</Inline>
		</div>
	);
};

export default BoardColumnsContainer;
