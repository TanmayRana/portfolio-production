import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchResumeData, saveResumeData, deleteResumeData, ResumeData } from "./resumeReducer";

export type Resume = ResumeData;

export function useResumeAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: resume, status } = useSelector((state: RootState) => (state as any).adminResume || state.resume);
  const isSaving = status === "loading";

  const [fileUrlInput, setFileUrlInput] = useState("");
  const [fileNameInput, setFileNameInput] = useState("");

  useEffect(() => {
    dispatch(fetchResumeData());
  }, [dispatch]);

  useEffect(() => {
    if (resume) {
      setFileUrlInput(resume.fileUrl);
      setFileNameInput(resume.fileName || "");
    }
  }, [resume]);

  const handleSave = async () => {
    if (!fileUrlInput) {
      toast.error("File URL is required");
      return;
    }
    try {
      await dispatch(saveResumeData({ fileUrl: fileUrlInput, fileName: fileNameInput })).unwrap();
      toast.success("Resume updated successfully!");
      dispatch(fetchResumeData());
    } catch (error: any) {
      toast.error(error.message || "Failed to update resume.");
    }
  };

  const handleDelete = async () => {
    if (!resume) return;
    try {
      await dispatch(deleteResumeData(resume.id)).unwrap();
      toast.success("Resume deleted.");
      setFileUrlInput("");
      setFileNameInput("");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete resume.");
    }
  };

  return {
    resume,
    fileUrlInput,
    fileNameInput,
    isSaving,
    setFileUrlInput,
    setFileNameInput,
    handleSave,
    handleDelete
  };
}
