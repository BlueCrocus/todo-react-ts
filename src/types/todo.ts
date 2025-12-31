export type Category = { name: string; color: string };

export type Todo = {
  id: number;
  title: string;
  done: boolean;
  category: string;   // category name
  dueDate: string;    // '' 가능
};

export type SortBy = "manual" | "dueDateAsc" | "dueDateDesc" | "category" | "idDesc";
