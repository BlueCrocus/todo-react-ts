import { useMemo, useState } from "react";
import { createTodo } from "../../api/todos";
import { useTodoDispatch, useTodoState } from "../../store/TodoProvider";

export default function TodoForm() {
  const { todos, categories } = useTodoState();
  const dispatch = useTodoDispatch();

  const [title, setTitle] = useState("");
  const [categoryName, setCategoryName] = useState(categories[0]?.name ?? "미지정");
  const [dueDate, setDueDate] = useState("");

  const nextOrder = useMemo(() => {
    const max = todos.reduce((acc, t) => Math.max(acc, t.order ?? 0), 0);
    return max + 1;
  }, [todos]);

  // ✅ name -> id 매핑
  const selectedCategoryId = useMemo(() => {
    const found = categories.find((c) => c.name === categoryName);
    return found?.id ?? categories[0]?.id ?? "uncategorized";
  }, [categories, categoryName]);

  async function onSubmit() {
    const trimmed = title.trim();
    if (!trimmed) return;
    if (trimmed.length > 30) return;

    const created = await createTodo({
      title: trimmed,
      categoryId: selectedCategoryId,       
      dueDate: dueDate ? dueDate : null,
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
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        style={{ width: 150, height: 40 }}
      >
        {categories.map((c) => (
          <option key={c.id} value={c.name}>
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
