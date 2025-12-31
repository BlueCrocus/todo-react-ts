import { http } from "./http";
import type { Category } from "../types/todo";

export type CategoryWithId = Category & { id: number };

export async function getCategories() {
  const res = await http.get<CategoryWithId[]>("/categories");
  return res.data;
}
