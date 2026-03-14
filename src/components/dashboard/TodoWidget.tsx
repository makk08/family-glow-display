import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const initialTodos: Todo[] = [
  { id: 1, text: "Buy groceries", done: false },
  { id: 2, text: "Fix kitchen light", done: false },
  { id: 3, text: "Call dentist", done: true },
  { id: 4, text: "Water the plants", done: false },
];

const TodoWidget = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");

  const toggle = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTodo = () => {
    if (!newText.trim()) return;
    setTodos((prev) => [
      { id: Date.now(), text: newText.trim(), done: false },
      ...prev,
    ]);
    setNewText("");
    setAdding(false);
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          To-Do
        </h2>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setAdding(!adding)}
          className="touch-target flex items-center justify-center rounded-xl bg-accent p-3 text-accent-foreground"
        >
          <Plus className="h-5 w-5" />
        </motion.button>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="flex gap-3">
              <input
                autoFocus
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                placeholder="Add a task…"
                className="h-14 flex-1 rounded-xl border border-border bg-secondary px-4 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={addTodo}
                className="touch-target flex items-center justify-center rounded-xl bg-accent px-5 text-accent-foreground"
              >
                <Check className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex items-center gap-4"
            >
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => toggle(todo.id)}
                className={`touch-target flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 transition-colors duration-200 ${
                  todo.done
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-secondary"
                }`}
              >
                {todo.done && <Check className="h-5 w-5" />}
              </motion.button>
              <span
                className={`flex-1 text-xl transition-all duration-200 ${
                  todo.done
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {todo.text}
              </span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => removeTodo(todo.id)}
                className="touch-target flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground active:text-destructive"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoWidget;
