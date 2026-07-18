import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchContactData, submitContactForm } from "@/lib/store/contactSlice";

export const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function useContactAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: contactData, status } = useSelector((state: RootState) => state.contact);
  const isSaving = status === "loading";
  const initialLoaded = status !== "idle";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: "", phone: "", location: "", github: "", linkedin: "", twitter: "" },
  });

  useEffect(() => {
    dispatch(fetchContactData());
  }, [dispatch]);

  useEffect(() => {
    if (contactData) {
      form.reset({
        email: contactData.email || "",
        phone: contactData.phone || "",
        location: contactData.location || "",
        github: contactData.github || "",
        linkedin: contactData.linkedin || "",
        twitter: contactData.twitter || ""
      });
    }
  }, [contactData, form]);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await dispatch(submitContactForm(data)).unwrap();
      toast.success("Contact information updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update contact info.");
    }
  };

  return {
    form,
    isSaving,
    initialLoaded,
    onSubmit
  };
}
