"use client";

import { useWorkExperienceAdmin } from "./Hooks";
import WorkExperienceComponent from "@/components/admin/work-experience";

export default function WorkExperienceContainer() {
  const { 
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
  } = useWorkExperienceAdmin();

  return (
    <WorkExperienceComponent 
      experiences={experiences}
      isDialogOpen={isDialogOpen}
      editingId={editingId}
      form={form}
      isSaving={isSaving}
      setIsDialogOpen={setIsDialogOpen}
      setEditingId={setEditingId}
      onSubmit={onSubmit}
      handleDelete={handleDelete}
      openEdit={openEdit}
    />
  );
}
