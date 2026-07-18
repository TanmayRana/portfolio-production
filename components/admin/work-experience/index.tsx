import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";

import FormDialog from "@/components/admin/FormDialog";
import ExperienceCard from "@/components/admin/ExperienceCard";

import {
  WorkExperience,
  WorkExpFormValues,
} from "@/containers/admin/work-experience/Hooks";

interface WorkExpComponentProps {
  experiences: WorkExperience[];
  isDialogOpen: boolean;
  editingId: string | null;
  form: UseFormReturn<WorkExpFormValues>;
  isSaving: boolean;
  setIsDialogOpen: (open: boolean) => void;
  setEditingId: (id: string | null) => void;
  onSubmit: (data: any) => void;
  handleDelete: (id: string) => void;
  openEdit: (exp: WorkExperience) => void;
}

export default function WorkExperienceComponent({
  experiences,
  isDialogOpen,
  editingId,
  form,
  isSaving,
  setIsDialogOpen,
  setEditingId,
  onSubmit,
  handleDelete,
  openEdit,
}: WorkExpComponentProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Work Experience</h1>
        <FormDialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              form.reset();
              setEditingId(null);
            }
          }}
          triggerText="Add Work Experience"
          triggerIcon={<Plus size={16} />}
          title={editingId ? "Edit Work Experience" : "Add Work Experience"}
          maxWidth="max-w-2xl"
          disableClose={true}
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  placeholder="ABC Technologies"
                  {...form.register("companyName")}
                />
              </div>
              <div className="space-y-2">
                <Label>Position / Role</Label>
                <Input
                  placeholder="Frontend Developer"
                  {...form.register("position")}
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Bangalore, India"
                  {...form.register("location")}
                />
              </div>
              <div className="space-y-2">
                <Label>Published Status</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    checked={form.watch("publishedStatus")}
                    onCheckedChange={(c) => form.setValue("publishedStatus", c)}
                  />
                  <span>
                    {form.watch("publishedStatus") ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" {...form.register("startDate")} />
              </div>
              <div className="space-y-2">
                <Label>End Date (leave blank for Present)</Label>
                <Input type="date" {...form.register("endDate")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description / Bullet Points (Comma Separated)</Label>
              <Textarea
                placeholder="Developed responsive apps..."
                {...form.register("description")}
              />
            </div>
            <div className="space-y-2">
              <Label>Key Achievements (Comma Separated)</Label>
              <Textarea
                placeholder="Reduced loading time..."
                {...form.register("keyAchievements")}
              />
            </div>
            <div className="space-y-2">
              <Label>Technologies Used (Comma Separated)</Label>
              <Input
                placeholder="React, Next.js, Tailwind"
                {...form.register("technologies")}
              />
            </div>
            <div className="space-y-2">
              <Label>Display Order (0 is first)</Label>
              <Input
                type="number"
                placeholder="0"
                {...form.register("order", { valueAsNumber: true })}
              />
            </div>

            {/* button section */}
            <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  form.reset();
                  setEditingId(null);
                }}
                disabled={false}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="min-w-[120px]"
              >
                {isSaving ? "Saving..." : "Save Experience"}
              </Button>
            </div>
          </form>
        </FormDialog>
      </div>

      <div className="grid gap-4">
        {experiences.map((exp) => (
          <ExperienceCard
            key={exp.id}
            id={exp.id}
            companyName={exp.companyName}
            position={exp.position}
            location={exp.location}
            startDate={exp.startDate}
            endDate={exp.endDate}
            technologies={exp.technologies}
            publishedStatus={exp.publishedStatus}
            onEdit={() => openEdit(exp)}
            onDelete={() => handleDelete(exp.id)}
          />
        ))}
      </div>
    </div>
  );
}
