"use client";

import { useSkillsAdmin } from "./Hooks";
import SkillsComponent from "@/components/admin/skills";

export default function SkillsContainer() {
  const { 
    categories,
    isCatOpen,
    isSkillOpen,
    activeCategoryId,
    catForm,
    skillForm,
    setIsCatOpen,
    setIsSkillOpen,
    setActiveCategoryId,
    onCatSubmit,
    onSkillSubmit,
    deleteCategory,
    deleteSkill,
    openEditCategory,
    openEditSkill,
    editingCategory,
    editingSkill
  } = useSkillsAdmin();

  return (
    <SkillsComponent 
      categories={categories}
      isCatOpen={isCatOpen}
      isSkillOpen={isSkillOpen}
      activeCategoryId={activeCategoryId}
      catForm={catForm}
      skillForm={skillForm}
      setIsCatOpen={setIsCatOpen}
      setIsSkillOpen={setIsSkillOpen}
      setActiveCategoryId={setActiveCategoryId}
      onCatSubmit={onCatSubmit}
      onSkillSubmit={onSkillSubmit}
      deleteCategory={deleteCategory}
      deleteSkill={deleteSkill}
      openEditCategory={openEditCategory}
      openEditSkill={openEditSkill}
      editingCategory={editingCategory}
      editingSkill={editingSkill}
    />
  );
}
