import { useReducer } from "react";
import { initialState, todoReducer } from "./store/todoReducer";

export default function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <div style={{ padding: 24 }}>
      <h1>Todo List ✒️</h1>
      <p>todos: {state.todos.length}</p>
      <button onClick={() => dispatch({ type: "OPEN_CATEGORY_MODAL" })}>open modal</button>
    </div>
  );
}
