"use client";

import type { IconProps } from "@atlaskit/icon";
import Button from "@atlaskit/button/new";
import { IconButton } from "@atlaskit/button/new";
import FolderClosedIcon from "@atlaskit/icon/core/folder-closed";
import PersonIcon from "@atlaskit/icon/core/person";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import CustomizeIcon from "@atlaskit/icon/core/customize";

export default function FilterButtonBar(): React.ReactElement {
	return (
		<div
			style={{
				padding: "0 8px 12px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				gap: "100px",
			}}
		>
			{/* Left group */}
			<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
				<Button
					iconBefore={FolderClosedIcon}
					iconAfter={(iconProps: IconProps) => <ChevronDownIcon {...iconProps} size="small" />}
				>
					Space
				</Button>
				<Button
					iconBefore={PersonIcon}
					iconAfter={(iconProps: IconProps) => <ChevronDownIcon {...iconProps} size="small" />}
				>
					Contributor
				</Button>
				<IconButton icon={CustomizeIcon} label="Customize filters" appearance="subtle" />
			</div>

			{/* Right group */}
			<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
				<Button
					iconBefore={() => <img src="/googledrive.png" alt="" style={{ width: "20px", height: "20px" }} />}
				>
					Google Drive
				</Button>
				<Button
					iconBefore={() => <img src="/slacklogo.png" alt="" style={{ width: "20px", height: "20px" }} />}
				>
					Slack
				</Button>
				<Button>+47</Button>
			</div>
		</div>
	);
}
