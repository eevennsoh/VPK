"use client";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";

import ThumbsUpIcon from "@atlaskit/icon/core/thumbs-up";
import EmojiAddIcon from "@atlaskit/icon/core/emoji-add";
import EditIcon from "@atlaskit/icon/core/edit";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import ReplyLeftIcon from "@atlaskit/icon-lab/core/reply-left";

export function CommentActions() {
	return (
		<div style={{ display: "flex", gap: token("space.100"), marginTop: token("space.100") }}>
			<IconButton
				icon={(iconProps) => <ReplyLeftIcon {...iconProps} color={token("color.icon.subtlest")} />}
				label="Reply"
				appearance="subtle"
				spacing="compact"
			/>
			<IconButton
				icon={(iconProps) => <ThumbsUpIcon {...iconProps} color={token("color.icon.subtlest")} />}
				label="Thumbs up"
				appearance="subtle"
				spacing="compact"
			/>
			<IconButton
				icon={(iconProps) => <EmojiAddIcon {...iconProps} color={token("color.icon.subtlest")} />}
				label="Add reaction"
				appearance="subtle"
				spacing="compact"
			/>
			<IconButton
				icon={(iconProps) => <EditIcon {...iconProps} color={token("color.icon.subtlest")} />}
				label="Edit"
				appearance="subtle"
				spacing="compact"
			/>
			<IconButton
				icon={(iconProps) => <ShowMoreHorizontalIcon {...iconProps} color={token("color.icon.subtlest")} />}
				label="More actions"
				appearance="subtle"
				spacing="compact"
			/>
		</div>
	);
}
