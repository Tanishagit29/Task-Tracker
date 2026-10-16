import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "taskly.tasks.v1";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "completed", label: "Completed" },
];

const EMPTY_TEXT = {
  all: "Nothing here yet. Add your first task above.",
  pending: "No pending tasks. Nice work!",
  completed: "No completed tasks yet.",
};

// Read saved tasks safely (localStorage can be blocked or hold bad data).
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t) => t && typeof t.id === "string" && typeof t.text === "string"
    ).map((t) => ({ id: t.id, text: t.text, completed: Boolean(t.completed) }));
  } catch {
    return [];
  }
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function ProgressRing({ percent }) {
  const size = 132;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="ring" role="img" aria-label={`${percent}% of tasks completed`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="ring-track"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className="ring-value"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring-label">
        <strong>{percent}%</strong>
        <span>done</span>
      </div>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const inputRef = useRef(null);

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* storage unavailable – app still works for this session */
    }
  }, [tasks]);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const visible = useMemo(() => {
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const counts = { all: total, pending, completed };

  function addTask(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) {
      setError("Please type a task before adding.");
      inputRef.current?.focus();
      return;
    }
    setTasks((prev) => [{ id: makeId(), text: value, completed: false }, ...prev]);
    setText("");
    setError("");
    inputRef.current?.focus();
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <aside className="side">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <h1>Taskly</h1>
        </div>
        <p className="tagline">Small steps, tracked.</p>

        <ProgressRing percent={percent} />

        <dl className="stats">
          <div className="stat">
            <dt>Total</dt>
            <dd data-testid="total-count">{total}</dd>
          </div>
          <div className="stat stat-done">
            <dt>Completed</dt>
            <dd data-testid="completed-count">{completed}</dd>
          </div>
          <div className="stat stat-pending">
            <dt>Pending</dt>
            <dd data-testid="pending-count">{pending}</dd>
          </div>
        </dl>

        <p className="saved">
          <span className="dot" aria-hidden="true" /> Saved in this browser
        </p>
      </aside>

      <main className="main">
        <form className="composer" onSubmit={addTask} noValidate>
          <label htmlFor="task-input" className="composer-title">
            What needs doing?
          </label>
          <div className="composer-row">
            <input
              id="task-input"
              ref={inputRef}
              type="text"
              value={text}
              placeholder="e.g. Finish the project report"
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError("");
              }}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "task-error" : undefined}
              autoComplete="off"
            />
            <button type="submit" className="btn-add">
              Add
            </button>
          </div>
          {error && (
            <p id="task-error" className="error" role="alert">
              {error}
            </p>
          )}
        </form>

        <div className="list-head">
          <div className="pills" role="tablist" aria-label="Filter tasks">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={"pill" + (filter === f.id ? " active" : "")}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span className="pill-count">{counts[f.id]}</span>
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="empty">{EMPTY_TEXT[filter]}</div>
        ) : (
          <ul className="tasks">
            {visible.map((t) => (
              <li key={t.id} className={"task" + (t.completed ? " is-done" : "")}>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                    aria-label={`Mark "${t.text}" as ${t.completed ? "pending" : "completed"}`}
                  />
                  <span className="box" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                </label>
                <span className="task-text">{t.text}</span>
                <span className={"badge " + (t.completed ? "badge-done" : "badge-pending")}>
                  {t.completed ? "Completed" : "Pending"}
                </span>
                <button
                  type="button"
                  className="btn-del"
                  onClick={() => deleteTask(t.id)}
                  aria-label={`Delete "${t.text}"`}
                  title="Delete"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
