"use client";

import { useContactAdmin } from "./Hooks";
import ContactComponent from "@/components/admin/contact";

export default function ContactContainer() {
  const { form, isSaving, initialLoaded, onSubmit } = useContactAdmin();

  return (
    <ContactComponent 
      form={form} 
      isSaving={isSaving} 
      initialLoaded={initialLoaded}
      onSubmit={onSubmit} 
    />
  );
}
