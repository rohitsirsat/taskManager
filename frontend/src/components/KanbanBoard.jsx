import { useState, useEffect } from "react";
import KanbanColumn from "./KanbanColumn";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProject } from "@/context/ProjectContext";
import { toast } from "sonner";

export default function KanbanBoard({ searchQuery }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { project } = useProject();

  // Load tasks from project when it changes
  useEffect(() => {
    if (project?.tasks && Array.isArray(project.tasks)) {
      setTasks(project.tasks);
    }
  }, [project]);

  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Call your API to create task
      // const response = await createTask({
      //   ...newTask,
      //   projectId: project._id,
      //   status: "todo",
      //   priority: "medium",
      // });

      // For now, add locally
      const task = {
        _id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        status: "todo",
        priority: "medium",
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, task]);
      setNewTask({ title: "", description: "" });
      setIsDialogOpen(false);
      toast.success("Task created successfully");
    } catch (error) {
      toast.error("Failed to create task");
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      // TODO: Call your API to update task status
      // const response = await updateTask(taskId, { status: newStatus });

      // Update locally
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
      toast.success("Task status updated");
    } catch (error) {
      toast.error("Failed to update task");
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const todoTasks = filteredTasks.filter((t) => t.status === "todo");

  const inProgressTasks = filteredTasks.filter(
    (t) => t.status === "in-progress",
  );
  const doneTasks = filteredTasks.filter((t) => t.status === "done");

  return (
    <div className="space-y-6">
      {/* Quick Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="hidden" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Add New Task
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="border-border bg-background focus:ring-primary"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Textarea
                placeholder="Task description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="border-border bg-background focus:ring-primary min-h-24"
                disabled={isSubmitting}
              />
            </div>
            <Button
              onClick={handleAddTask}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
        <KanbanColumn
          title="To Do"
          key="To Do"
          count={todoTasks.length}
          tasks={todoTasks}
          status="todo"
          onMoveTask={moveTask}
          columnColor="slate"
          columnIcon="📋"
        />
        <KanbanColumn
          title="In Progress"
          key="In Progress"
          count={inProgressTasks.length}
          tasks={inProgressTasks}
          status="in-progress"
          onMoveTask={moveTask}
          columnColor="blue"
          columnIcon="⚙️"
        />
        <KanbanColumn
          title="Done"
          key="Done"
          count={doneTasks.length}
          tasks={doneTasks}
          status="done"
          onMoveTask={moveTask}
          columnColor="green"
          columnIcon="✅"
        />
      </div>
    </div>
  );
}
