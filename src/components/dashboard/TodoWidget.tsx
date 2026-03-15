import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoWidget = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Milch kaufen", completed: false },
    { id: 2, text: "Kinder abholen", completed: false },
    { id: 3, text: "Wäsche starten", completed: true },
    { id: 4, text: "Paket zur Post bringen", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    const value = newTodo.trim();
    if (!value) return;

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: value,
        completed: false,
      },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          Aufgaben
        </h2>
        <span className="text-xs text-muted-foreground">
          {todos.filter((t) => !t.completed).length} offen
        </span>
      </div>

      <div className="mb-3 flex gap-2">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          placeholder="Neue Aufgabe"
          className="h-9 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-accent"
        />
        <button
          onClick={addTodo}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition hover:opacity-90"
          aria-label="Aufgabe hinzufügen"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/40 px-3 py-2"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                todo.completed
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-background"
              }`}
              aria-label="Aufgabe abhaken"
            >
              {todo.completed ? <Check className="h-3 w-3" /> : null}
            </button>

            <span
              className={`min-w-0 flex-1 truncate text-sm ${
                todo.completed
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
            >
              {todo.text}
            </span>

            <button
              onClick={() => removeTodo(todo.id)}
              className="text-muted-foreground transition hover:text-destructive"
              aria-label="Aufgabe löschen"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}

        {todos.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Keine Aufgaben
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoWidget;
