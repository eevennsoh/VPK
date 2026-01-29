"use client";

import { useState } from "react";
import { Inline } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import Textfield from "@atlaskit/textfield";
import AddIcon from "@atlaskit/icon/core/add";

interface AddTodoProps {
	onAdd: (title: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
	const [title, setTitle] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim()) {
			onAdd(title);
			setTitle("");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Inline space="space.100" alignBlock="center">
				<Textfield
					placeholder="Add a new todo..."
					value={title}
					onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
					elemAfterInput={
						<Button
							type="submit"
							appearance="primary"
							iconBefore={AddIcon}
							label="Add todo"
						/>
					}
				/>
			</Inline>
		</form>
	);
}
