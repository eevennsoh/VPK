"use client";

import { token } from "@atlaskit/tokens";
import { Text } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import InlineEdit from "@atlaskit/inline-edit";
import Textfield from "@atlaskit/textfield";

export function Description() {
	return (
		<div style={{ marginBottom: token("space.300") }}>
			<Heading size="small" as="h3">
				Description
			</Heading>
			<div style={{ marginTop: token("space.100") }}>
				<InlineEdit
					defaultValue=""
					label="Description"
					editView={(fieldProps) => <Textfield {...fieldProps} />}
					readView={() => (
						<div
							style={{
								padding: token("space.050"),
								marginLeft: token("space.negative.100"),
								borderRadius: token("radius.small"),
								color: token("color.text.subtlest"),
							}}
						>
							<Text color="color.text.subtlest">Edit description</Text>
						</div>
					)}
					onConfirm={() => {}}
				/>
			</div>
		</div>
	);
}
