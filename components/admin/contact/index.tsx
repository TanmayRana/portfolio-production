import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Code, Briefcase, Globe } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import { ContactFormValues } from "@/containers/admin/contact/Hooks";

interface ContactComponentProps {
  form: UseFormReturn<ContactFormValues>;
  isSaving: boolean;
  initialLoaded: boolean;
  onSubmit: (data: ContactFormValues) => void;
}

export default function ContactComponent({
  form,
  isSaving,
  initialLoaded,
  onSubmit,
}: ContactComponentProps) {
  return (
    <div className="p-6  space-y-6">
      <PageHeader
        title="Contact Information"
        actionText={isSaving ? "Saving..." : "Save Changes"}
        disabled={isSaving || !initialLoaded}
        onAction={form.handleSubmit(onSubmit)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Basic Contact</CardTitle>
            <CardDescription>Primary ways to reach you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail size={16} /> Email
                </Label>
                <Input
                  placeholder="tanmay@example.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone size={16} /> Phone
                </Label>
                <Input
                  placeholder="+91 9876543210"
                  {...form.register("phone")}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin size={16} /> Location
                </Label>
                <Input
                  placeholder="Bangalore, Karnataka, India"
                  {...form.register("location")}
                />
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>
              Links to your professional profiles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Code size={16} /> GitHub
                </Label>
                <Input
                  placeholder="https://github.com/username"
                  {...form.register("github")}
                />
                {form.formState.errors.github && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.github.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase size={16} /> LinkedIn
                </Label>
                <Input
                  placeholder="https://linkedin.com/in/username"
                  {...form.register("linkedin")}
                />
                {form.formState.errors.linkedin && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.linkedin.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe size={16} /> Twitter/X
                </Label>
                <Input
                  placeholder="https://twitter.com/username"
                  {...form.register("twitter")}
                />
                {form.formState.errors.twitter && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.twitter.message}
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
