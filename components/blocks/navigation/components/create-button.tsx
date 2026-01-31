"use client";

import { IconButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import AddIcon from "@atlaskit/icon/core/add";

interface CreateButtonProps {
	windowWidth: number;
}

export function CreateButton({ windowWidth }: Readonly<CreateButtonProps>) {
	if (windowWidth >= 768) {
		return (
			<Button appearance="primary" iconBefore={AddIcon}>
				Create
			</Button>
		);
	}

	return <IconButton icon={AddIcon} label="Create" appearance="primary" />;
}
