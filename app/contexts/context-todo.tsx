"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

export type TodoPriority = "high" | "medium" | "low" | null;

export interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
	priority: TodoPriority;
	dueDate: number | null;
	description: string;
	tags: string[];
	order: number;
	parentId: string | null;
}

interface TodoContextType {
	todos: Todo[];
	addTodo: (title: string) => void;
	toggleTodo: (id: string) => void;
	deleteTodo: (id: string) => void;
	updateTodo: (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => void;
	reorderTodos: (todoIds: string[]) => void;
	clearCompleted: () => void;
}

const STORAGE_KEY = "vpk-todos";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

/**
 * Migrate legacy todos to include new fields with sensible defaults.
 * Ensures backwards compatibility with existing localStorage data.
 */
function migrateTodo(todo: Partial<Todo>, index: number): Todo {
	return {
		id: todo.id ?? crypto.randomUUID(),
		title: todo.title ?? "",
		completed: todo.completed ?? false,
		createdAt: todo.createdAt ?? Date.now(),
		priority: todo.priority ?? null,
		dueDate: todo.dueDate ?? null,
		description: todo.description ?? "",
		tags: todo.tags ?? [],
		order: todo.order ?? index,
		parentId: todo.parentId ?? null,
	};
}

export function TodoProvider({ children }: { children: ReactNode }) {
	const [todos, setTodos] = useState<Todo[]>(() => {
		if (typeof window === "undefined") return [];
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return [];
		try {
			const parsed = JSON.parse(stored) as Partial<Todo>[];
			return parsed.map((todo, index) => migrateTodo(todo, index));
		} catch {
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	const addTodo = useCallback((title: string) => {
		setTodos((prev: Todo[]) => {
			const maxOrder = prev.reduce((max, todo) => Math.max(max, todo.order), -1);
			const newTodo: Todo = {
				id: crypto.randomUUID(),
				title: title.trim(),
				completed: false,
				createdAt: Date.now(),
				priority: null,
				dueDate: null,
				description: "",
				tags: [],
				order: maxOrder + 1,
				parentId: null,
			};
			return [newTodo, ...prev];
		});
	}, []);

	const toggleTodo = useCallback((id: string) => {
		setTodos((prev: Todo[]) =>
			prev.map((todo: Todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
		);
	}, []);

	const deleteTodo = useCallback((id: string) => {
		setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
	}, []);

	const updateTodo = useCallback((id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => {
		setTodos((prev: Todo[]) =>
			prev.map((todo: Todo) => (todo.id === id ? { ...todo, ...updates } : todo))
		);
	}, []);

	const reorderTodos = useCallback((todoIds: string[]) => {
		setTodos((prev: Todo[]) => {
			return prev.map((todo) => {
				const newOrder = todoIds.indexOf(todo.id);
				if (newOrder !== -1) {
					return { ...todo, order: newOrder };
				}
				return todo;
			});
		});
	}, []);

	const clearCompleted = useCallback(() => {
		setTodos((prev: Todo[]) => prev.filter((todo: Todo) => !todo.completed));
	}, []);

	return (
		<TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo, reorderTodos, clearCompleted }}>
			{children}
		</TodoContext.Provider>
	);
}

export function useTodo() {
	const context = useContext(TodoContext);
	if (context === undefined) {
		throw new Error("useTodo must be used within a TodoProvider");
	}
	return context;
}
