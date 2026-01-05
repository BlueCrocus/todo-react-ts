import { http } from "./http";
import type { Todo } from "../types/todo";

export type CreateTodoDto = Omit<Todo, "id">;
export type UpdateTodoDto = Partial<Omit<Todo, "id">>;

export async function getTodos() {
  const res = await http.get<Todo[]>("/todos");
  return res.data;
}
export type TodoCreateInput = {
  title: string;
  categoryId: string;
  dueDate?: string | null;
};

export type Todo = {
  id: string;
  title: string;
  categoryId: string;
  dueDate?: string | null;
  done: boolean;
  order: number;
};

export async function createTodo(input: TodoCreateInput & { order: number }) {
  const res = await fetch(`/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return (await res.json()) as Todo;
}
