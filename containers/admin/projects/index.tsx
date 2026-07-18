"use client";

import { useProjectsAdmin } from "./Hooks";
import ProjectsComponent from "@/components/admin/projects";

export default function ProjectsContainer() {
  const { 
    projects,
    isDialogOpen,
    editingId,
    form,
    setIsDialogOpen,
    setEditingId,
    onSubmit,
    handleDelete,
    openEdit
  } = useProjectsAdmin();

  return (
    <ProjectsComponent 
      projects={projects}
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
