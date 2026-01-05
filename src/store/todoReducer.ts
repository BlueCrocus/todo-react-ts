import type { Category, SortBy, Todo } from "../types/todo";

export type TodoState = {
  todos: Todo[];
  categories: Category[];
  sortBy: SortBy;
  query: string;
  isCategoryModalOpen: boolean;
};

export type TodoAction =
  | { type: "SET_TODOS"; payload: { todos: Todo[] } }
  | { type: "SET_CATEGORIES"; payload: { categories: Category[] } }
  | { type: "SET_SORT"; payload: { sortBy: SortBy } }
  | { type: "SET_QUERY"; payload: { query: string } }
  | { type: "OPEN_CATEGORY_MODAL" }
  | { type: "CLOSE_CATEGORY_MODAL" }
  | { type: "ADD_TODO"; payload: { todo: Todo } };

export const initialState: TodoState = {
  todos: [],
  categories: [{id:"uncategorized", name: "미지정", color: "#999" }],
  sortBy: "manual",
  query: "",
  isCategoryModalOpen: false,
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload.todos };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload.categories };

    case "SET_SORT":
      return { ...state, sortBy: action.payload.sortBy };

    case "SET_QUERY":
      return { ...state, query: action.payload.query };

    case "OPEN_CATEGORY_MODAL":
      return { ...state, isCategoryModalOpen: true };

    case "CLOSE_CATEGORY_MODAL":
      return { ...state, isCategoryModalOpen: false };

    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload.todo] };

    case "ADD_TODO": {
      const next = [...state.todos, action.payload.todo].sort(
        (a, b) => a.order - b.order
      );
      return { ...state, todos: next };
    };

    default:
      return state;
  }
}
