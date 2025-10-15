import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "../components/themeToggle.jsx";
import {
  Layers,
  CheckSquare,
  FileText,
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
  Clock,
} from "lucide-react";

export default function HomePage() {
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
    <div>
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
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                          {project.name}
                        </h3>
                        <Badge
                          variant={
                            project.status === "In Progress"
                              ? "default"
                              : project.status === "Active"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-6">
                      {/* Members */}
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {project.members.slice(0, 3).map((member, index) => (
                            <Avatar
                              key={index}
                              className="h-8 w-8 border-2 border-background"
                            >
                              <AvatarImage
                                src={member.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.memberCount > 3 && (
                            <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs font-medium">
                                +{project.memberCount - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {project.memberCount}
                        </span>
                      </div>

                      {/* Created */}
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{project.created}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
