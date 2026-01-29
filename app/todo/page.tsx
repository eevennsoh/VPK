"use client";

import AppLayout from "@/components/blocks/layout/app-layout";
import { TodoProvider } from "@/app/contexts/context-todo";
import { TodoList } from "@/components/blocks/todo/todo-list";

export default function TodoPage() {
	return (
		<AppLayout product="home">
			<TodoProvider>
				<TodoList />
			</TodoProvider>
		</AppLayout>
	);
}
