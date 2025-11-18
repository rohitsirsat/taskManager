import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateProjectForm({ onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  //   const [errors, setErrors] = useState<{ name?: string; description?: string }>({})
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Project name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // if (errors[name as keyof typeof errors]) {
    //   setErrors((prev) => ({ ...prev, [name]: undefined }))
    // }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Create New Project
        </h1>
        <p className="text-muted-foreground text-lg">
          Start building by setting up your project details
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name */}
        <div className="space-y-3">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-foreground"
          >
            Project Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="My Awesome Project"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className="h-11 text-base"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs text-destructive font-medium">
              {errors.name}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-3">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-foreground"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Tell us about your project..."
            value={formData.description}
            onChange={handleChange}
            disabled={isLoading}
            className="min-h-32 text-base resize-none"
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <p className="text-xs text-destructive font-medium">
              {errors.description}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="flex-1 h-11 text-base font-semibold"
          >
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={isLoading}
            className="flex-1 h-11 text-base font-semibold"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
