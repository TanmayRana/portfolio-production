"use client";

import { useResumeAdmin } from "./Hooks";
import ResumeComponent from "@/components/admin/resume";

export default function ResumeContainer() {
  const { 
    resume, 
    fileUrlInput, 
    fileNameInput, 
    isSaving, 
    setFileUrlInput, 
    setFileNameInput, 
    handleSave, 
    handleDelete 
  } = useResumeAdmin();

  return (
    <ResumeComponent 
      resume={resume}
      fileUrlInput={fileUrlInput}
      fileNameInput={fileNameInput}
      isSaving={isSaving}
      setFileUrlInput={setFileUrlInput}
      setFileNameInput={setFileNameInput}
      handleSave={handleSave}
      handleDelete={handleDelete}
    />
  );
}
