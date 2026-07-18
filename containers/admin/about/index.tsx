"use client";

import { useAboutAdmin } from "./Hooks";
import AboutComponent from "@/components/admin/about";

export default function AboutContainer() {
  const { form, isSaving, initialLoaded, onSubmit, imageUrl } = useAboutAdmin();

  return (
    <AboutComponent 
      form={form} 
      isSaving={isSaving} 
      initialLoaded={initialLoaded}
      onSubmit={onSubmit} 
      imageUrl={imageUrl}
    />
  );
}
