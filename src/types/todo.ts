export type Category = { 
  id: string;
  name: string; 
  color: string 
};

export type CreateTodoDto = Omit<Todo, "id">;

export type Todo = {
  id: number;
  title: string;
  done: boolean;
  category: string;   // category name
  dueDate: string;    // '' 가능
  order: number;
};

export type SortBy = "manual" | "dueDateAsc" | "dueDateDesc" | "category" | "idDesc";
