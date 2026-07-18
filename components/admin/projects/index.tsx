import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

import PageHeader from "@/components/admin/PageHeader";
import FormDialog from "@/components/admin/FormDialog";
import ProjectCard from "@/components/admin/ProjectCard";
import ImageUploader from "@/components/admin/ImageUploader";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";

import { Project, ProjectFormValues } from "@/containers/admin/projects/Hooks";

interface ProjectsComponentProps {
  projects: Project[];
  isDialogOpen: boolean;
  editingId: string | null;
  form: UseFormReturn<ProjectFormValues>;
  setIsDialogOpen: (open: boolean) => void;
  setEditingId: (id: string | null) => void;
  onSubmit: (data: any) => void;
  handleDelete: (id: string) => void;
  openEdit: (proj: Project) => void;
}

export default function ProjectsComponent({
  projects,
  isDialogOpen,
  editingId,
  form,
  setIsDialogOpen,
  setEditingId,
  onSubmit,
  handleDelete,
  openEdit,
}: ProjectsComponentProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <FormDialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              form.reset();
              setEditingId(null);
            }
          }}
          triggerText="Add Project"
          triggerIcon={<Plus size={16} />}
          title={editingId ? "Edit Project" : "Add Project"}
          disableClose={true}
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="AI Generator" {...form.register("title")} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="A project about..."
                {...form.register("description")}
              />
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input placeholder="https://..." {...form.register("imageUrl")} />
              <ImageUploader
                label="Project Cover"
                currentUrl={form.watch("imageUrl")}
                onUpload={(url) =>
                  form.setValue("imageUrl", url, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Live URL</Label>
                <Input placeholder="https://" {...form.register("liveUrl")} />
              </div>
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input placeholder="https://" {...form.register("githubUrl")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Technologies (Comma separated)</Label>
              <Input
                placeholder="Next.js, Tailwind"
                {...form.register("technologies")}
              />
            </div>
            <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  form.reset();
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </FormDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <ProjectCard
            key={proj.id}
            id={proj.id}
            title={proj.title}
            description={proj.description}
            imageUrl={proj.imageUrl}
            liveUrl={proj.liveUrl}
            githubUrl={proj.githubUrl}
            technologies={proj.technologies}
            onEdit={() => openEdit(proj)}
            onDelete={() => handleDelete(proj.id)}
          />
        ))}
      </div>
    </div>
  );
}
