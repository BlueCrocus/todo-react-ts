import { useMemo, useState } from "react";
import { createTodo } from "../../api/todos";
import { useTodoDispatch, useTodoState } from "../../store/TodoProvider";

export default function TodoForm() {
  const { todos, categories } = useTodoState();
  const dispatch = useTodoDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]?.name ?? "미지정");
  const [dueDate, setDueDate] = useState("");

  // ✅ 다음 order 계산: 현재 todos 중 max(order)+1
  const nextOrder = useMemo(() => {
    const max = todos.reduce((acc, t) => Math.max(acc, t.order ?? 0), 0);
    return max + 1;
  }, [todos]);

  async function onSubmit() {
    const trimmed = title.trim();
    if (!trimmed) return;

    if (trimmed.length > 30) return; // 바닐라와 동일 제한 :contentReference[oaicite:1]{index=1}

    const created = await createTodo({
      title: trimmed,
      done: false,
      category: category || "미지정",
      dueDate,
      order: nextOrder,
    });

    dispatch({ type: "ADD_TODO", payload: { todo: created } });

    setTitle("");
    setDueDate("");
  }

  return (
    <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일 제목"
        maxLength={30}
        style={{ flex: 1, minWidth: 180, height: 40, padding: "0 10px" }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: 150, height: 40 }}
      >
        {categories.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ width: 150, height: 40 }}
      />

      <button type="button" onClick={onSubmit} style={{ height: 40, padding: "0 14px" }}>
        ✚
      </button>
    </div>
  );
}
