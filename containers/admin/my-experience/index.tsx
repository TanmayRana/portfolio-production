"use client";

import { useMyExperienceAdmin } from "./Hooks";
import MyExperienceComponent from "@/components/admin/my-experience";

export default function MyExperienceContainer() {
  const { 
    experiences,
    isDialogOpen,
    editingId,
    form,
    setIsDialogOpen,
    setEditingId,
    onSubmit,
    handleDelete,
    openEdit
  } = useMyExperienceAdmin();

  return (
    <MyExperienceComponent 
      experiences={experiences}
      isDialogOpen={isDialogOpen}
      editingId={editingId}
      form={form}
      setIsDialogOpen={setIsDialogOpen}
      setEditingId={setEditingId}
      onSubmit={onSubmit}
      handleDelete={handleDelete}
      openEdit={openEdit}
    />
  );
}
