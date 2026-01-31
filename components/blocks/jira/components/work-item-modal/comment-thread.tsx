"use client";

import { token } from "@atlaskit/tokens";
import { Text, Inline, Stack, Box } from "@atlaskit/primitives";
import Avatar from "@atlaskit/avatar";

import { CommentActions } from "./comment-actions";

interface CommentProps {
	authorName: string;
	avatarSrc: string;
	timestamp: string;
	content: string;
}

function Comment({ authorName, avatarSrc, timestamp, content }: Readonly<CommentProps>) {
	return (
		<Inline space="space.100" alignBlock="start">
			<Avatar size="small" src={avatarSrc} />
			<Stack space="space.050">
				<Text weight="semibold">{authorName}</Text>
				<Text size="small" color="color.text.subtlest">
					{timestamp}
				</Text>
				<Text color="color.text.subtle">{content}</Text>
				<CommentActions />
			</Stack>
		</Inline>
	);
}

export function CommentThread() {
	return (
		<Stack space="space.200">
			<Box padding="space.100">
				<Comment
					authorName="Maia Ma"
					avatarSrc="/people/Avatar-1.png"
					timestamp="15 minutes ago"
					content="Project comment perspective visual card easy list of lists free. Plan files stickers real time Trello Gold visual organize list of lists."
				/>

				{/* Reply */}
				<div
					style={{
						marginLeft: "40px",
						marginTop: token("space.150"),
						paddingLeft: token("space.150"),
						borderLeft: `1px solid ${token("color.border")}`,
					}}
				>
					<Comment
						authorName="Priya Hansra"
						avatarSrc="/people/Avatar-2.png"
						timestamp="10 minutes ago"
						content="With large teams we have the potential to have a relationship with every traveler who travels with Beyond Gravity."
					/>
				</div>
			</Box>
		</Stack>
	);
}
