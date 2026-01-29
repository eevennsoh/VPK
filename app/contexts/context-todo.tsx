"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

export interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
}

interface TodoContextType {
	todos: Todo[];
	addTodo: (title: string) => void;
	toggleTodo: (id: string) => void;
	deleteTodo: (id: string) => void;
}

const STORAGE_KEY = "vpk-todos";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
	const [todos, setTodos] = useState<Todo[]>(() => {
		if (typeof window === "undefined") return [];
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	const addTodo = useCallback((title: string) => {
		const newTodo: Todo = {
			id: crypto.randomUUID(),
			title: title.trim(),
			completed: false,
			createdAt: Date.now(),
		};
		setTodos((prev: Todo[]) => [newTodo, ...prev]);
	}, []);

	const toggleTodo = useCallback((id: string) => {
		setTodos((prev: Todo[]) =>
			prev.map((todo: Todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
		);
	}, []);

	const deleteTodo = useCallback((id: string) => {
		setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
	}, []);

	return (
		<TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
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
