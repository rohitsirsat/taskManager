import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Clock,
  FolderOpen,
  Users,
  Loader2,
} from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useProject } from "@/context/ProjectContext..jsx";
import { Loader } from "@/components/Loader";
import CreateProjectForm from "@/components/CreateProjectForm";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";
dayjs.extend(relativeTime);

export default function HomePage() {
  const {
    projects,
    isLoading,
    isLoadingMore,
    fetchAllProjects,
    createNewProject,
    loadMoreProjects,
    hasNextPage,
    totalProjects,
    deleteExistingProject,
  } = useProject();
  const [editingProject, setEditingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = (project) => {
    setEditingProject(project);
    setIsEditDialogOpen(true);
  };

  const handleCreateSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await createNewProject(formData);

      // refresh projects list
      if (typeof fetchAllProjects === "function") {
        await fetchAllProjects();
      }
    } catch (err) {
      console.error("Error creating project:", err);
    } finally {
      setIsSubmitting(false);
      setIsCreateDialogOpen(false);
    }
  };

  const handleEditSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // TODO: call updateProject API
      // await updateProject(editingProject._id, formData);
      console.log("Update payload for", editingProject?._id, formData);

      // refresh projects list
      if (typeof fetchAllProjects === "function") {
        await fetchAllProjects();
      }
    } catch (err) {
      console.error("Error updating project:", err);
    } finally {
      setIsSubmitting(false);
      setIsEditDialogOpen(false);
      setEditingProject(null);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const res = await deleteExistingProject(projectId);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("your not the author");
    }
  };

  const handleLoadMore = async () => {
    try {
      await loadMoreProjects();
    } catch (error) {
      console.error("Load more error:", e);
    }
  };

  if (isLoading) {
    return <Loader message="Loading projects..." />;
  } else if (projects.length === 0) {
    return (
      <div>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderOpen />
            </EmptyMedia>
            <EmptyTitle>No Projects Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any projects yet. Get started by creating
              your first project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className={"cursor-pointer"}
              >
                Create Project
              </Button>
            </div>
          </EmptyContent>
        </Empty>

        {/* Create Project Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <CreateProjectForm
            onSubmit={handleCreateSubmit}
            isLoading={isSubmitting}
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          />
        </Dialog>
      </div>
    );
  } else {
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

              <Button
                className="rounded-2xl cursor-pointer"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
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
                      key={project._id}
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
                          <span className="text-sm text-muted-foreground">
                            <Users />
                          </span>
                          <div className="flex -space-x-2">
                            {project.projectMembers.map((member) => (
                              <Avatar
                                key={member._id}
                                className="h-8 w-8 border-2 border-background"
                              >
                                <AvatarImage
                                  src={
                                    member.memberDetails?.avatar?.url ||
                                    "/placeholder.svg"
                                  }
                                />
                                <AvatarFallback>
                                  {member.memberDetails?.username
                                    ?.split(" ")
                                    .map((n) => n[0])
                                    .join("") || "U"}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {project.projectMembers?.length > 3 && (
                              <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                <span className="text-xs font-medium">
                                  +{project.memberCount - 3}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Created */}
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{dayjs(project?.createdAt).fromNow()}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(project)}
                            aria-label={`Edit ${project.name}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteProject(project._id)}
                            variant="ghost"
                            size="sm"
                            className={"cursor-pointer"}
                          >
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

          {hasNextPage && (
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="rounded-md cursor-pointer"
              >
                {isLoadingMore ? (
                  <div className="flex flex-row justify-center items-center space-x-2">
                    <p>Loading</p>
                    <Loader2 className="animate-spin" />
                  </div>
                ) : (
                  `Load more (${projects.length}/${totalProjects})`
                )}
              </Button>
            </div>
          )}
        </main>

        {/* Create Project Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <CreateProjectForm
            onSubmit={handleCreateSubmit}
            isLoading={isSubmitting}
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          />
        </Dialog>

        {/* Edit Project Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <CreateProjectForm
            onSubmit={handleEditSubmit}
            isLoading={isSubmitting}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          />
        </Dialog>
      </div>
    );
  }
}
