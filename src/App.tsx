import { useEffect } from "react";
import { getTodos } from "./api/todos";
import { getCategories } from "./api/categories";
import { useTodoDispatch, useTodoState } from "./store/TodoProvider";
import TodoForm from "./components/TodoForm/TodoForm";

export default function App() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();

  useEffect(() => {
    let alive = true;

    async function fetchInitialData() {
      try {
        const [todos, categoriesWithId] = await Promise.all([
          getTodos(),
          getCategories(),
        ]);

        if (!alive) return;

        dispatch({ type: "SET_TODOS", payload: { todos } });

        // state에는 id 없이 name/color만 저장
        dispatch({
          type: "SET_CATEGORIES",
          payload: {
            categories: categoriesWithId.map(({ id, name, color }) => ({
              id,
              name,
              color,
            })),
          },
        });
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
      }
    }

    fetchInitialData();

    // ✅ cleanup (여기에 import 같은 거 절대 안 넣음)
    return () => {
      alive = false;
    };
  }, [dispatch]);

  // ✅ order 기준 정렬 (수동 정렬 대비)
  const orderedTodos = [...state.todos].sort((a, b) => a.order - b.order);

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          paddingBottom: 8,
        }}
      >
        <h1 style={{ margin: 0 }}>Todo List ✒️</h1>
        <button
          type="button"
          title="카테고리 설정"
          onClick={() => dispatch({ type: "OPEN_CATEGORY_MODAL" })}
          style={{
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
          }}
        >
          ⚙️
        </button>
      </header>

      {/* Todo 추가 폼 */}
      <TodoForm />

      {/* 임시 Todo 리스트 출력 (API + order 확인용) */}
      <ul style={{ marginTop: 20, padding: 0, listStyle: "none" }}>
        {orderedTodos.length === 0 && (
          <li style={{ color: "#777", textAlign: "center", padding: 20 }}>
            할 일이 없습니다.
          </li>
        )}

        {orderedTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: "10px 12px",
              marginBottom: 8,
              background: "#f9f9f9",
              borderRadius: 6,
              display: "flex",
              gap: 8,
            }}
          >
            <span style={{ fontWeight: "bold" }}>{todo.order}.</span>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>

      {/* 카테고리 모달 (임시) */}
      {state.isCategoryModalOpen && (
        <div
          onClick={() => dispatch({ type: "CLOSE_CATEGORY_MODAL" })}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: 10,
              padding: 20,
              width: "min(500px, 90%)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ margin: 0 }}>⚙️ 카테고리 관리</h2>
              <button
                onClick={() => dispatch({ type: "CLOSE_CATEGORY_MODAL" })}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: 18,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ marginTop: 12, color: "#666" }}>
              카테고리 CRUD는 다음 단계에서 구현합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
