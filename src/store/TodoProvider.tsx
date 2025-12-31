import { createContext, useContext, useReducer } from "react";
import { initialState, todoReducer } from "./todoReducer";
import type { TodoAction, TodoState } from "./todoReducer";

const TodoStateContext = createContext<TodoState | null>(null);
const TodoDispatchContext = createContext<React.Dispatch<TodoAction> | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const v = useContext(TodoStateContext);
  if (!v) throw new Error("useTodoState must be used within TodoProvider");
  return v;
}

export function useTodoDispatch() {
  const v = useContext(TodoDispatchContext);
  if (!v) throw new Error("useTodoDispatch must be used within TodoProvider");
  return v;
}
