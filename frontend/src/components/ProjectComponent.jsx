import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";

function ProjectComponent({
  onSubmit,
  isEdit = false,
  isLoading = false,
  project = null,
}) {
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
  });

  const [errors, setErrors] = useState({});

  // keep form in sync when `project` prop changes
  useEffect(() => {
    setFormData({
      name: project?.name || "",
      description: project?.description || "",
    });
    setErrors({});
  }, [project]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Project name is required";
    if (!formData.description?.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEdit && project && typeof onSubmit === "function") {
        await onSubmit(project._id, formData);
      } else if (!isEdit && typeof onSubmit === "function") {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error("Project submit error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button size="sm" variant="editive" className="cursor-pointer">
            <Edit />
          </Button>
        ) : (
          <Button size="sm" className="cursor-pointer">
            Create Project
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Update Project" : "Create New Project"}
            </DialogTitle>
            <DialogDescription>
              Start building by setting up your project details
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="example project"
                value={formData.name}
                onChange={handleDataChange}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                type="text"
                placeholder="Describe your project..."
                value={formData.description}
                onChange={handleDataChange}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p className="text-xs text-destructive font-medium">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                  ? "Update"
                  : "Create"}
            </Button>

            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectComponent;
