import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProjectsData, saveProjectData, deleteProjectData } from "@/lib/store/projectsSlice";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string | null;
  githubUrl: string | null;
  technologies: string[];
}

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  imageUrl: z.string().min(5, "Image URL is required"),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  technologies: z.string().min(2, "Technologies are required (comma separated)"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export function useProjectsAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: projects } = useSelector((state: RootState) => state.projects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { title: "", description: "", imageUrl: "", liveUrl: "", githubUrl: "", technologies: "" },
  });

  useEffect(() => {
    dispatch(fetchProjectsData());
  }, [dispatch]);

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...(editingId && { id: editingId }),
        ...data,
        technologies: data.technologies.split(",").map((s: string) => s.trim())
      };

      await dispatch(saveProjectData(payload)).unwrap();
      toast.success(`Project ${editingId ? "updated" : "added"} successfully!`);
      setIsDialogOpen(false);
      form.reset();
      setEditingId(null);
      dispatch(fetchProjectsData());
    } catch (error: any) {
      toast.error(error.message || "Failed to save project.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteProjectData(id)).unwrap();
      toast.success("Project deleted.");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete project.");
    }
  };

  const openEdit = (proj: Project) => {
    setEditingId(proj.id);
    form.reset({ 
      title: proj.title, 
      description: proj.description,
      imageUrl: proj.imageUrl,
      liveUrl: proj.liveUrl || "",
      githubUrl: proj.githubUrl || "",
      technologies: proj.technologies.join(", ")
    });
    setIsDialogOpen(true);
  };

  return {
    projects,
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
