"use client";

import { useCertificationsAdmin } from "./Hooks";
import CertificationsComponent from "@/components/admin/certifications";

export default function CertificationsContainer() {
  const { 
    certifications,
    isDialogOpen,
    editingId,
    form,
    setIsDialogOpen,
    setEditingId,
    onSubmit,
    handleDelete,
    openEdit
  } = useCertificationsAdmin();

  return (
    <CertificationsComponent 
      certifications={certifications}
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
