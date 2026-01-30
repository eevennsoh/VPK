"use client";

import { Stack } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import Image from "next/image";

export default function ChatGreeting() {
	return (
		<Stack space="space.100" alignInline="center">
			<Image src="/Chat.svg" alt="Chat" width={80} height={80} style={{ objectFit: "contain" }} />
			<Heading size="xlarge">Let&apos;s do this together</Heading>
		</Stack>
	);
}
