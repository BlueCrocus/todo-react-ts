import { useEffect } from "react";
import { getTodos } from "./api/todos";
import { getCategories } from "./api/categories";
import { useTodoDispatch, useTodoState } from "./store/TodoProvider";

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

        // state에서는 id 없이 name/color만 쓰는 방식(간단)
        dispatch({
          type: "SET_CATEGORIES",
          payload: {
            categories: categoriesWithId.map(({ name, color }) => ({ name, color })),
          },
        });
      } catch (e) {
        console.error("Failed to fetch initial data:", e);
        // 여기서 나중에 Toast로 에러 표시하면 포폴 점수 올라감
      }
    }

    fetchInitialData();

    return () => {
      alive = false;
    };
  }, [dispatch]);

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Todo List ✒️</h1>
        <button
          type="button"
          onClick={() => dispatch({ type: "OPEN_CATEGORY_MODAL" })}
          title="카테고리 설정"
          style={{
            border: "none",
            background: "transparent",
            fontSize: 22,
            cursor: "pointer",
          }}
        >
          ⚙️
        </button>
      </header>

      <div style={{ marginTop: 16 }}>
        <p style={{ margin: 0 }}>todos: {state.todos.length}</p>
        <p style={{ margin: 0 }}>categories: {state.categories.length}</p>
        <p style={{ marginTop: 8, color: "#666" }}>
          API 연결 확인용 화면입니다. 다음 단계에서 UI 컴포넌트로 분리합니다.
        </p>
      </div>

      {/* 카테고리 모달은 다음 단계에서 CategoryModal 컴포넌트로 구현 */}
      {state.isCategoryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => dispatch({ type: "CLOSE_CATEGORY_MODAL" })}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: 12,
              padding: 16,
              width: "min(520px, 92vw)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0 }}>⚙️ 카테고리 관리</h2>
              <button
                type="button"
                onClick={() => dispatch({ type: "CLOSE_CATEGORY_MODAL" })}
                style={{ border: "none", background: "transparent", fontSize: 18, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginTop: 12, color: "#666" }}>
              모달 UI/기능은 다음 PR에서 구현합니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
