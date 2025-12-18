import { useState } from "react";
import TaskCard from "./TaskCard";

const columnStyles = {
  slate: {
    header: "text-slate-700 dark:text-slate-300",
    badge: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    ring: "ring-slate-400 dark:ring-slate-600",
    border: "border-slate-200 dark:border-slate-700",
    empty: "bg-slate-50 dark:bg-slate-900/30",
  },
  blue: {
    header: "text-blue-700 dark:text-blue-300",
    badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    ring: "ring-blue-400 dark:ring-blue-600",
    border: "border-blue-200 dark:border-blue-800",
    empty: "bg-blue-50 dark:bg-blue-900/20",
  },
  green: {
    header: "text-green-700 dark:text-green-300",
    badge:
      "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
    ring: "ring-green-400 dark:ring-green-600",
    border: "border-green-200 dark:border-green-800",
    empty: "bg-green-50 dark:bg-green-900/20",
  },
};

export default function KanbanColumn({
  title,
  count,
  tasks,
  status,
  onMoveTask,
  columnColor = "slate",
  columnIcon = "📌",
}) {
  const [draggedOver, setDraggedOver] = useState(false);
  const style = columnStyles[columnColor] || columnStyles.slate;

  const handleDragOver = (e) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedOver(false);
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      onMoveTask(taskId, status);
    }
  };

  return (
    <div
      className={`rounded-xl p-6 bg-card border-2 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col ${
        style.border
      } ${draggedOver ? `ring-2 ring-offset-2 ${style.ring}` : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{columnIcon}</span>
          <div>
            <h2 className={`text-lg font-bold ${style.header}`}>{title}</h2>
            <p
              className={`text-xs font-semibold ${style.badge} px-2 py-1 rounded mt-1 inline-block`}
            >
              {count} {count === 1 ? "task" : "tasks"}
            </p>
          </div>
        </div>
        <div
          className={`w-12 h-12 rounded-lg ${style.badge} flex items-center justify-center font-bold text-base shadow-md flex-shrink-0`}
        >
          {count}
        </div>
      </div>

      {/* Tasks Container - Flexible height, no scrollbar */}
      {tasks.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center py-12 rounded-lg border-2 border-dashed ${
            style.border
          } ${style.empty}`}
        >
          <p className="text-muted-foreground text-sm font-medium">
            No tasks yet
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            Drag tasks here or create new
          </p>
        </div>
      ) : (
        <div className="space-y-3 flex-1 flex flex-col">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
