import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchAboutData, submitAboutForm } from "@/lib/store/aboutSlice";

export const aboutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  aboutDescription: z.string().min(10, "Description must be at least 10 characters"),
  signature: z.string().optional().nullable(),
});

export type AboutFormValues = z.infer<typeof aboutSchema>;

export function useAboutAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: aboutData, status } = useSelector((state: RootState) => state.about);
  const isSaving = status === "loading";
  const [initialLoaded, setInitialLoaded] = useState(false);

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: { name: "", aboutDescription: "", signature: "" },
  });

  useEffect(() => {
    dispatch(fetchAboutData()).finally(() => setInitialLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (aboutData) {
      form.reset({
        name: aboutData.name || "",
        aboutDescription: aboutData.aboutDescription || "",
        signature: aboutData.signature || "",
      });
    }
  }, [aboutData, form]);

  const onSubmit = async (data: AboutFormValues) => {
    try {
      await dispatch(submitAboutForm(data)).unwrap();
      toast.success("About section updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update About section.");
    }
  };

  return {
    form,
    isSaving,
    initialLoaded,
    onSubmit,
    imageUrl: aboutData?.imageUrl || null,
  };
}
