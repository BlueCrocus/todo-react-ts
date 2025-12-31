import type { Category, SortBy, Todo } from "../types/todo";

export type TodoState = {
  todos: Todo[];
  categories: Category[];
  sortBy: SortBy;
  query: string;
  isCategoryModalOpen: boolean;
};

export type TodoAction =
  | { type: "ADD_TODO"; payload: { title: string; category: string; dueDate: string } }
  | { type: "TOGGLE_TODO"; payload: { id: number } }
  | { type: "REMOVE_TODO"; payload: { id: number } }
  | { type: "UPDATE_TODO"; payload: { id: number; title: string; category: string; dueDate: string } }
  | { type: "MOVE_TODO"; payload: { id: number; direction: "up" | "down" } }
  | { type: "ADD_CATEGORY"; payload: { name: string; color: string } }
  | { type: "REMOVE_CATEGORY"; payload: { name: string } }
  | { type: "SET_SORT"; payload: { sortBy: SortBy } }
  | { type: "SET_QUERY"; payload: { query: string } }
  | { type: "OPEN_CATEGORY_MODAL" }
  | { type: "CLOSE_CATEGORY_MODAL" };

export const initialState: TodoState = {
  todos: [],
  categories: [{ name: "미지정", color: "#999" }],
  sortBy: "manual",
  query: "",
  isCategoryModalOpen: false,
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    default:
      return state;
  }
}
