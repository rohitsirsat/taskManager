import { Calendar, Flag, Tag, User, FileText } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function TaskCard({ task }) {
  const priorityStyles = {
    low: {
      bg: "bg-accent/10 dark:bg-accent/20",
      text: "text-accent dark:text-accent",
      badge: "bg-accent/40 dark:bg-accent/60 text-accent-foreground",
      border: "border-accent/30 dark:border-accent/50",
    },
    medium: {
      bg: "bg-yellow-100/50 dark:bg-yellow-900/20",
      text: "text-yellow-700 dark:text-yellow-400",
      badge:
        "bg-yellow-400/40 dark:bg-yellow-600/60 text-yellow-900 dark:text-yellow-100",
      border: "border-yellow-300/50 dark:border-yellow-700/50",
    },
    high: {
      bg: "bg-red-100/50 dark:bg-red-900/20",
      text: "text-red-700 dark:text-red-400",
      badge: "bg-red-500/40 dark:bg-red-600/60 text-red-900 dark:text-red-100",
      border: "border-red-300/50 dark:border-red-700/50",
    },
  };

  const statusStyles = {
    todo: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    in_progress:
      "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    done: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  };

  const priority = priorityStyles[task.priority] || priorityStyles.medium;
  const statusClass = statusStyles[task.status] || statusStyles.todo;

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("taskId", task._id);
  };

  const getInitials = (username) => {
    return (
      username
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  const getAvatarColor = (userId) => {
    const colors = [
      "bg-gradient-to-br from-pink-500 to-rose-500",
      "bg-gradient-to-br from-blue-500 to-cyan-500",
      "bg-gradient-to-br from-purple-500 to-indigo-500",
      "bg-gradient-to-br from-green-500 to-emerald-500",
      "bg-gradient-to-br from-orange-500 to-amber-500",
    ];
    const hash = userId.charCodeAt(userId.length - 1);
    return colors[hash % colors.length];
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`bg-card rounded-lg p-4 shadow-md hover:shadow-lg border-2 transition-all duration-200 cursor-grab active:cursor-grabbing hover:scale-105 group ${priority.border}`}
    >
      {/* Title and Priority */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-foreground text-sm flex-1 line-clamp-2 group-hover:text-primary transition-colors">
          {task.title}
        </h3>
        <div
          className={`${priority.badge} rounded-full p-2 flex-shrink-0 shadow-sm`}
        >
          <Flag size={14} className="text-primary-foreground" />
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusClass}`}
        >
          {task.status.charAt(0).toUpperCase() +
            task.status.slice(1).replace("-", " ")}
        </span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-xs mb-3 line-clamp-2 group-hover:text-foreground transition-colors">
        {task.description}
      </p>

      {/* Attachments Count */}
      {task.attachments && task.attachments.length > 0 && (
        <div className="flex items-center gap-1 mb-3 text-muted-foreground text-xs">
          <FileText size={12} />
          <span>{task.attachments.length} attachment(s)</span>
        </div>
      )}

      {/* Subtasks Count */}
      {task.subTasks && task.subTasks.length > 0 && (
        <div className="flex items-center gap-1 mb-3 text-muted-foreground text-xs">
          <span>✓ {task.subTasks.length} subtask(s)</span>
        </div>
      )}

      {/* Footer: Assignees and Timestamp */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50 dark:border-border/30">
        <div className="flex items-center gap-2">
          {/* Assigned To */}
          {task.assignedTo && (
            <div
              className={`w-7 h-7 rounded-full ${getAvatarColor(
                task.assignedTo._id,
              )} text-white flex items-center justify-center text-xs font-bold shadow-md`}
              title={`Assigned to: ${task.assignedTo.username}`}
            >
              {getInitials(task.assignedTo.username)}
            </div>
          )}

          {/* Assigned By */}
          {task.assignedBy && (
            <div
              className={`w-6 h-6 rounded-full ${getAvatarColor(
                task.assignedBy._id,
              )} text-white flex items-center justify-center text-xs font-bold shadow-md opacity-70 border border-white/30`}
              title={`Assigned by: ${task.assignedBy.username}`}
            >
              {getInitials(task.assignedBy.username)}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium">
          <Calendar size={12} className="text-primary/60" />
          <span className="group-hover:text-primary transition-colors">
            {dayjs(task?.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
}
