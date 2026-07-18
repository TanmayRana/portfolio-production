import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchMyExperienceData, addMyExperience, updateMyExperience, deleteMyExperience, MyExperience } from "@/lib/store/myExperienceSlice";

export const experienceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  body: z.string().min(5, "Body is required"),
  showIdeaMessage: z.boolean().optional(),
  order: z.number().optional(),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;

export function useMyExperienceAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: experiences, status } = useSelector((state: RootState) => state.myExperience);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: { title: "", body: "", showIdeaMessage: false, order: 0 },
  });

  useEffect(() => {
    dispatch(fetchMyExperienceData());
  }, [dispatch]);

  const onSubmit = async (data: ExperienceFormValues) => {
    try {
      // Check for duplicate order
      const duplicateOrder = experiences?.find(
        (exp) => exp.order === data.order && exp.id !== editingId
      );

      if (duplicateOrder) {
        toast.error(`Order ${data.order} is already in use by "${duplicateOrder.title}". Please choose a different order.`);
        return;
      }

      if (editingId) {
        await dispatch(updateMyExperience({ id: editingId, ...data })).unwrap();
        toast.success("Experience updated successfully!");
      } else {
        await dispatch(addMyExperience(data)).unwrap();
        toast.success("Experience added successfully!");
      }
      setIsDialogOpen(false);
      form.reset({ title: "", body: "", showIdeaMessage: false, order: 0 });
      setEditingId(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to save experience.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteMyExperience(id)).unwrap();
      toast.success("Experience deleted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete experience.");
    }
  };

  const openEdit = (exp: MyExperience) => {
    setEditingId(exp.id);
    form.reset({
      title: exp.title,
      body: exp.body,
      showIdeaMessage: exp.showIdeaMessage || false,
      order: exp.order ?? 0,
    });
    setIsDialogOpen(true);
  };

  return {
    experiences,
    isDialogOpen,
    editingId,
    form,
    setIsDialogOpen,
    setEditingId,
    onSubmit,
    handleDelete,
    openEdit
  };
}
