"use client";

import { useHomeAdmin } from "./Hooks";
import HomeComponent from "@/components/admin/home";

export default function HomeContainer() {
  const { form, isSaving, onSubmit } = useHomeAdmin();

  return (
    <HomeComponent 
      form={form} 
      isSaving={isSaving} 
      onSubmit={onSubmit} 
    />
  );
}
