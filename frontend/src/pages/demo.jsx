import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import ProjectsTable from "@/components/projects-table";
import {
  Layers,
  CheckSquare,
  FileText,
  Users,
  Plus,
  Search,
  Calendar,
} from "lucide-react";
import { redirect } from "next/navigation";

export default function DashboardIndex() {
  redirect("/dashboard/projects");
}

// This component is now redundant due to the redirect, but keeping it for reference
export function DashboardPage() {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Complete overhaul of company website with modern design",
      members: [
        { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      memberCount: 3,
      created: "2 days ago",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Native iOS and Android app for customer engagement",
      members: [
        { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Tom Brown", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      memberCount: 2,
      created: "1 week ago",
      status: "Planning",
    },
    {
      id: 3,
      name: "Marketing Campaign Q1",
      description: "Digital marketing strategy and content creation for Q1",
      members: [
        { name: "Lisa Davis", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Emma Taylor", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Ryan Miller", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      memberCount: 4,
      created: "3 days ago",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Layers className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                ProjectFlow
              </span>
            </div>
            <div className="hidden md:block text-muted-foreground">
              Building the Future - One Project at a Time
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10 w-64 bg-muted/50"
              />
            </div>
            <ThemeToggle />
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-sidebar min-h-[calc(100vh-4rem)] sticky top-16">
          <div className="p-6">
            <nav className="space-y-2">
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <CheckSquare className="h-5 w-5" />
                <span>Tasks</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span>Notes</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-medium"
              >
                <Layers className="h-5 w-5" />
                <span>Projects</span>
              </a>
            </nav>
          </div>

          {/* User Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sidebar-border">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  john.doe@example.com
                </p>
                <p className="text-xs text-sidebar-foreground/70">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Projects</h1>
                <p className="text-muted-foreground mt-1">
                  Manage and organize your team projects
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create New Project
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Projects
                      </p>
                      <p className="text-2xl font-bold text-foreground">12</p>
                    </div>
                    <Layers className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Active Tasks
                      </p>
                      <p className="text-2xl font-bold text-foreground">47</p>
                    </div>
                    <CheckSquare className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Team Members
                      </p>
                      <p className="text-2xl font-bold text-foreground">23</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Completed
                      </p>
                      <p className="text-2xl font-bold text-foreground">89%</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projects Table */}
            <ProjectsTable
              projects={projects.map((p) => ({
                id: p.id,
                name: p.name,
                description: p.description,
                membersCount: p.memberCount,
                created: p.created,
              }))}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
