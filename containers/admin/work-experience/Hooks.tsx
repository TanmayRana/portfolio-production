import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchWorkExperienceData, saveWorkExperienceData, deleteWorkExperienceData } from "@/lib/store/workExperienceSlice";

export interface WorkExperience {
  id: string;
  companyName: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  keyAchievements: string[];
  technologies: string[];
  publishedStatus: "Published" | "Draft";
  order?: number;
}

export const workExperienceSchema = z.object({
  companyName: z.string().min(2, "Company Name is required"),
  position: z.string().min(2, "Position is required"),
  location: z.string().min(2, "Location is required"),
  startDate: z.string().min(2, "Start Date is required"),
  endDate: z.string().optional().nullable(),
  description: z.string().min(2, "Description is required (comma separated)"),
  keyAchievements: z.string().optional(),
  technologies: z.string().min(2, "Technologies are required (comma separated)"),
  publishedStatus: z.boolean(),
  order: z.number().optional(),
});

export type WorkExpFormValues = z.infer<typeof workExperienceSchema>;

export function useWorkExperienceAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: experiences, status } = useSelector((state: RootState) => state.workExperience);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const isSaving = status === "loading";

  const form = useForm<WorkExpFormValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: { companyName: "", position: "", location: "", startDate: "", endDate: "", description: "", keyAchievements: "", technologies: "", publishedStatus: true, order: 0 },
  });

  useEffect(() => {
    dispatch(fetchWorkExperienceData());
  }, [dispatch]);

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...(editingId && { id: editingId }),
        ...data,
        description: data.description.split(",").map((s: string) => s.trim()),
        keyAchievements: data.keyAchievements ? data.keyAchievements.split(",").map((s: string) => s.trim()) : [],
        technologies: data.technologies.split(",").map((s: string) => s.trim()),
        publishedStatus: data.publishedStatus ? "Published" : "Draft",
        order: data.order || 0
      };

      await dispatch(saveWorkExperienceData(payload)).unwrap();
      toast.success(`Work Experience ${editingId ? "updated" : "added"} successfully!`);
      setIsDialogOpen(false);
      form.reset({ companyName: "", position: "", location: "", startDate: "", endDate: "", description: "", keyAchievements: "", technologies: "", publishedStatus: true, order: 0 });
      setEditingId(null);
      dispatch(fetchWorkExperienceData());
    } catch (error: any) {
      toast.error(error.message || "Failed to save work experience.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteWorkExperienceData(id)).unwrap();
      toast.success("Work Experience deleted.");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete work experience.");
    }
  };

  const openEdit = (exp: WorkExperience) => {
    setEditingId(exp.id);
    form.reset({ 
      companyName: exp.companyName, 
      position: exp.position,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate || "",
      description: exp.description.join(", "),
      keyAchievements: exp.keyAchievements.join(", "),
      technologies: exp.technologies.join(", "),
      publishedStatus: exp.publishedStatus === "Published",
      order: exp.order ?? 0
    });
    setIsDialogOpen(true);
  };

  return {
    experiences,
    isDialogOpen,
    editingId,
    form,
    isSaving,
    setIsDialogOpen,
    setEditingId,
    onSubmit,
    handleDelete,
    openEdit
  };
}
