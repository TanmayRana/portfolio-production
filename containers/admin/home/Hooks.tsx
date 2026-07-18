import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setHeroData, fetchHeroData, submitHeroForm } from "./heroReducer";

export const heroSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  tagline: z.string().min(5, "Tagline must be at least 5 characters"),
  heroDescription: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
});

export type HeroFormValues = z.infer<typeof heroSchema>;

export function useHomeAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  // We will configure the Redux store to register this reducer under `adminHero` key.
  const heroData = useSelector((state: RootState) => (state as any).adminHero?.data || state.hero?.data);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchHeroData());
  }, [dispatch]);

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      name: heroData?.name || "",
      tagline: heroData?.tagline || "",
      heroDescription: heroData?.heroDescription || "",
      imageUrl: heroData?.imageUrl || "",
      videoUrl: heroData?.videoUrl || "",
    },
  });

  useEffect(() => {
    if (heroData) {
      form.reset({
        name: heroData.name,
        tagline: heroData.tagline,
        heroDescription: heroData.heroDescription,
        imageUrl: heroData.imageUrl || "",
        videoUrl: heroData.videoUrl || "",
      });
    }
  }, [heroData, form]);

  const onSubmit = async (data: HeroFormValues) => {
    setIsSaving(true);
    try {
      const resultAction = await dispatch(submitHeroForm(data));
      if (submitHeroForm.fulfilled.match(resultAction)) {
        toast.success("Hero section updated successfully!");
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast.error("Failed to update Hero section.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    form,
    isSaving,
    onSubmit,
  };
}
