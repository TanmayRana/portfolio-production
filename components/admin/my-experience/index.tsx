import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import FormDialog from "@/components/admin/FormDialog";
import ImageUploader from "@/components/admin/ImageUploader";
import { ExperienceFormValues } from "@/containers/admin/my-experience/Hooks";
import { MyExperience } from "@/lib/store/myExperienceSlice";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";

interface MyExperienceComponentProps {
  experiences: MyExperience[];
  isDialogOpen: boolean;
  editingId: string | null;
  form: UseFormReturn<ExperienceFormValues>;
  setIsDialogOpen: (open: boolean) => void;
  setEditingId: (id: string | null) => void;
  onSubmit: (data: ExperienceFormValues) => void;
  handleDelete: (id: string) => void;
  openEdit: (exp: MyExperience) => void;
}

export default function MyExperienceComponent({
  experiences,
  isDialogOpen,
  editingId,
  form,
  setIsDialogOpen,
  setEditingId,
  onSubmit,
  handleDelete,
  openEdit,
}: MyExperienceComponentProps) {
  return (
    <div className="p-6  space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">My Experience</h1>
        <FormDialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              form.reset({ title: "", body: "", showIdeaMessage: false, order: 0 });
              setEditingId(null);
            } else if (!editingId) {
              // Auto-calculate the next order based on existing items
              const nextOrder = experiences && experiences.length > 0 
                ? Math.max(...experiences.map(e => e.order || 0)) + 1 
                : 0;
              form.reset({ title: "", body: "", showIdeaMessage: false, order: nextOrder });
            }
          }}
          triggerText="Add My Experience"
          triggerIcon={<Plus size={16} />}
          title={editingId ? "Edit My Experience" : "Add My Experience"}
          maxWidth="max-w-xl"
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="e.g. 5+ Years of Frontend Development"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Body / Description</Label>
              <Textarea
                placeholder="I have worked extensively with..."
                className="min-h-[120px]"
                {...form.register("body")}
              />
              {form.formState.errors.body && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.body.message}
                </p>
              )}
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <div className="space-y-1 leading-none">
                <Label>Show "Turning ideas into reality" message?</Label>
                <p className="text-[0.8rem] text-muted-foreground">
                  Check this to display the message alongside the card.
                </p>
              </div>
              <input
                type="checkbox"
                className="w-4 h-4 mt-1"
                {...form.register("showIdeaMessage")}
              />
            </div>

            <div className="space-y-2">
              <Label>Display Order (0 is first)</Label>
              <Input
                type="number"
                placeholder="0"
                {...form.register("order", { valueAsNumber: true })}
              />
              {form.formState.errors.order && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.order.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Save Experience
            </Button>
          </form>
        </FormDialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {experiences &&
          experiences.map((exp) => (
            <Card key={exp.id} className="shadow-md flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-xl">{exp.title}</CardTitle>
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-md shrink-0">
                    Order: {exp.order}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 whitespace-pre-line text-muted-foreground">
                {exp.body}
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(exp)}
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
                <ConfirmDeleteDialog
                  onConfirm={() => handleDelete(exp.id)}
                  trigger={
                    <Button variant="destructive" size="sm">
                      <Trash className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  }
                />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
