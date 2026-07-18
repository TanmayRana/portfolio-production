import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
  fetchSkillsData,
  addCategoryData,
  deleteCategoryData,
  addSkillData,
  deleteSkillData,
  updateCategoryData,
  updateSkillData,
} from "./skillsReducer";

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  categoryId: string;
  name: string;
  level: number;
}

export function useSkillsAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: categories } = useSelector((state: RootState) => (state as any).adminSkills || state.skills);
  
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isSkillOpen, setIsSkillOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const catForm = useForm({ defaultValues: { name: "", icon: "" } });
  const skillForm = useForm({ defaultValues: { name: "", level: 50 } });

  useEffect(() => {
    dispatch(fetchSkillsData());
  }, [dispatch]);

  const onCatSubmit = async (data: any) => {
    try {
      if (editingCategory) {
        await dispatch(updateCategoryData({ id: editingCategory.id, ...data })).unwrap();
        toast.success("Category updated");
      } else {
        await dispatch(addCategoryData(data)).unwrap();
        toast.success("Category added");
      }
      setIsCatOpen(false);
      setEditingCategory(null);
      catForm.reset({ name: "", icon: "" });
      dispatch(fetchSkillsData());
    } catch (error: any) {
      toast.error(error.message || "Failed to save category");
    }
  };

  const onSkillSubmit = async (data: any) => {
    if (!activeCategoryId && !editingSkill) return;
    try {
      if (editingSkill) {
        await dispatch(updateSkillData({ id: editingSkill.id, ...data, categoryId: editingSkill.categoryId })).unwrap();
        toast.success("Skill updated");
      } else {
        await dispatch(addSkillData({ ...data, categoryId: activeCategoryId })).unwrap();
        toast.success("Skill added");
      }
      setIsSkillOpen(false);
      setEditingSkill(null);
      skillForm.reset({ name: "", level: 50 });
      dispatch(fetchSkillsData());
    } catch (error: any) {
      toast.error(error.message || "Failed to save skill");
    }
  };

  const openEditCategory = (cat: SkillCategory) => {
    setEditingCategory(cat);
    catForm.reset({ name: cat.name, icon: cat.icon });
    setIsCatOpen(true);
  };

  const openEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setActiveCategoryId(skill.categoryId);
    skillForm.reset({ name: skill.name, level: skill.level });
    setIsSkillOpen(true);
  };

  const deleteCategory = async (id: string) => {
    try {
      await dispatch(deleteCategoryData(id)).unwrap();
      dispatch(fetchSkillsData());
    } catch (error: any) {
      toast.error(error.message || "Failed to delete category");
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await dispatch(deleteSkillData(id)).unwrap();
      dispatch(fetchSkillsData());
    } catch (error: any) {
      toast.error(error.message || "Failed to delete skill");
    }
  };

  return {
    categories,
    isCatOpen,
    isSkillOpen,
    activeCategoryId,
    catForm,
    skillForm,
    setIsCatOpen: (open: boolean) => {
      setIsCatOpen(open);
      if (!open) {
        setEditingCategory(null);
        catForm.reset({ name: "", icon: "" });
      }
    },
    setIsSkillOpen: (open: boolean) => {
      setIsSkillOpen(open);
      if (!open) {
        setEditingSkill(null);
        skillForm.reset({ name: "", level: 50 });
      }
    },
    setActiveCategoryId,
    onCatSubmit,
    onSkillSubmit,
    deleteCategory,
    deleteSkill,
    openEditCategory,
    openEditSkill,
    editingCategory,
    editingSkill
  };
}
