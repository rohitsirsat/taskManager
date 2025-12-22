import { useState } from "react";
import KanbanBoard from "@/components/KanbanBoard";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useProject } from "@/context/ProjectContext";

export default function ProjectDashBoardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const { project } = useProject();

  return (
    <main className="bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card shadow-sm">
        <div className="px-8 py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {project?.name}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Project management & collaboration
          </p>
        </div>

        {/* Navigation Tabs */}
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Search and Add Task Controls */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-3 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border shadow-sm hover:shadow-md transition-shadow"
            />
          </div>
          <Button
            onClick={() => setShowAddTask(!showAddTask)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            Add Task
          </Button>
        </div>

        {/* Kanban Board */}
        <KanbanBoard searchQuery={searchQuery} />
      </div>
    </main>
  );
}
