import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchCertificationsData, saveCertificationData, deleteCertificationData } from "@/lib/store/certificationsSlice";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verificationLink: string | null;
  description: string | null;
  imageUrl: string | null;
  order: number;
}

export const certSchema = z.object({
  title: z.string().min(2, "Title is required"),
  issuer: z.string().min(2, "Issuer is required"),
  date: z.string().min(2, "Date is required"),
  verificationLink: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number().optional(),
});

export type CertFormValues = z.infer<typeof certSchema>;

export function useCertificationsAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: certifications } = useSelector((state: RootState) => state.certifications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<CertFormValues>({
    resolver: zodResolver(certSchema),
    defaultValues: { title: "", issuer: "", date: "", verificationLink: "", description: "", imageUrl: "", order: 0 },
  });

  useEffect(() => {
    dispatch(fetchCertificationsData());
  }, [dispatch]);

  const onSubmit = async (data: any) => {
    try {
      const payload = { ...(editingId && { id: editingId }), ...data };
      await dispatch(saveCertificationData(payload)).unwrap();
      toast.success(`Certification ${editingId ? "updated" : "added"} successfully!`);
      setIsDialogOpen(false);
      form.reset();
      setEditingId(null);
      dispatch(fetchCertificationsData());
    } catch (error: any) {
      toast.error(error.message || "Failed to save certification.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCertificationData(id)).unwrap();
      toast.success("Certification deleted.");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete certification.");
    }
  };

  const openEdit = (cert: Certification) => {
    setEditingId(cert.id);
    form.reset({ 
      title: cert.title, 
      issuer: cert.issuer,
      date: cert.date,
      verificationLink: cert.verificationLink || "",
      description: cert.description || "",
      imageUrl: cert.imageUrl || "",
      order: cert.order || 0
    });
    setIsDialogOpen(true);
  };

  return {
    certifications,
    isDialogOpen,
    editingId,
    form,
    setIsDialogOpen,
    setEditingId,
    onSubmit,
    handleDelete,
    openEdit
  };
}
