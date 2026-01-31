"use client";

import { Inline, Stack } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Heading from "@atlaskit/heading";

import CrossIcon from "@atlaskit/icon/core/cross";
import ShareIcon from "@atlaskit/icon/core/share";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import LockUnlockedIcon from "@atlaskit/icon/core/lock-unlocked";
import EyeOpenIcon from "@atlaskit/icon/core/eye-open";
import TaskIcon from "@atlaskit/icon/core/task";
import AddIcon from "@atlaskit/icon/core/add";
import AppsIcon from "@atlaskit/icon/core/apps";

import { useWorkItemModal } from "@/app/contexts/context-work-item-modal";

export function ModalHeader() {
	const { meta } = useWorkItemModal();
	const { workItem } = meta;

	return (
		<div
			style={{
				height: "32px",
				minHeight: "32px",
				maxHeight: "32px",
				marginTop: token("space.300"),
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				paddingLeft: token("space.300"),
				paddingRight: token("space.300"),
				backgroundColor: token("elevation.surface.overlay"),
			}}
		>
			<Breadcrumbs>
				<BreadcrumbsItem
					href="#"
					text="Vitafleet Q4 launch"
					iconBefore={
						<img
							src="/Projectavatar.png"
							alt="Project"
							style={{
								width: "20px",
								height: "20px",
								borderRadius: token("radius.xsmall"),
								marginRight: token("space.025"),
							}}
						/>
					}
				/>
				<BreadcrumbsItem
					text={workItem.title}
					iconBefore={<TaskIcon label="Task" color={token("color.icon.brand")} />}
				/>
			</Breadcrumbs>

			<Inline space="space.100" alignBlock="center">
				<IconButton icon={LockUnlockedIcon} label="No restrictions" appearance="default" />
				<Button appearance="default" iconBefore={EyeOpenIcon}>
					1
				</Button>
				<IconButton icon={ShareIcon} label="Share" appearance="default" />
				<IconButton icon={ShowMoreHorizontalIcon} label="Actions" appearance="default" />
				<IconButton icon={CrossIcon} label="Close" appearance="default" onClick={meta.onClose} />
			</Inline>
		</div>
	);
}

export function ModalTitle() {
	const { meta } = useWorkItemModal();

	return (
		<Stack space="space.100">
			<Heading size="large">{meta.workItem.title}</Heading>
			<Inline space="space.100">
				<Button iconBefore={AddIcon} appearance="default">
					Add
				</Button>
				<Button iconBefore={AppsIcon} appearance="default">
					Apps
				</Button>
			</Inline>
		</Stack>
	);
}

export function ModalDescription() {
	return null;
}
