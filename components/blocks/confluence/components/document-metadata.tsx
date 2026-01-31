"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import { Inline } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import BookOpenIcon from "@atlaskit/icon-lab/core/book-open";
import EmojiAddIcon from "@atlaskit/icon/core/emoji-add";

interface DocumentMetadataProps {
	author: {
		name: string;
		avatar: string;
	};
	readTime: string;
}

export default function DocumentMetadata({
	author,
	readTime,
}: Readonly<DocumentMetadataProps>) {
	return (
		<div style={{ marginLeft: token("space.negative.100") }}>
			<Inline alignBlock="center">
				{/* Author Button */}
				<Button appearance="subtle" spacing="compact">
					<span
						style={{
							fontWeight: token("font.weight.regular"),
							display: "flex",
							alignItems: "center",
							gap: token("space.100"),
						}}
					>
						<img
							src={author.avatar}
							alt={author.name}
							style={{
								width: 16,
								height: 16,
								borderRadius: "50%",
								objectFit: "cover",
							}}
						/>
						By {author.name}
					</span>
				</Button>

				{/* Read Time Button */}
				<Button appearance="subtle" spacing="compact">
					<BookOpenIcon label="Read time" size="small" />
					<span
						style={{
							fontWeight: token("font.weight.regular"),
							marginLeft: token("space.100"),
						}}
					>
						{readTime}
					</span>
				</Button>

				{/* Add Emoji Button */}
				<Button appearance="subtle" spacing="compact">
					<EmojiAddIcon label="Add emoji" size="small" />
					<span
						style={{
							fontWeight: token("font.weight.regular"),
							marginLeft: token("space.100"),
						}}
					>
						Add an emoji
					</span>
				</Button>
			</Inline>
		</div>
	);
}
