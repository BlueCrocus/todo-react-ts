import { http } from "./http";
import type { Todo } from "../types/todo";

export type CreateTodoDto = Omit<Todo, "id">;
export type UpdateTodoDto = Partial<Omit<Todo, "id">>;

export async function getTodos() {
  const res = await http.get<Todo[]>("/todos");
  return res.data;
}
