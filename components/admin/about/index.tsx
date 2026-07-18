import { UseFormReturn, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/admin/PageHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import { AboutFormValues } from "@/containers/admin/about/Hooks";

interface AboutComponentProps {
  form: UseFormReturn<AboutFormValues>;
  isSaving: boolean;
  initialLoaded: boolean;
  onSubmit: (data: AboutFormValues) => void;
  imageUrl?: string | null;
}

export default function AboutComponent({
  form,
  isSaving,
  initialLoaded,
  onSubmit,
  imageUrl,
}: AboutComponentProps) {
  const watchDescription = form.watch("aboutDescription") || "";
  const watchSignature = form.watch("signature");

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="About Page Management"
        actionText={isSaving ? "Saving..." : "Save Changes"}
        disabled={isSaving || !initialLoaded}
        onAction={form.handleSubmit(onSubmit)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg border-muted/50">
          <CardHeader>
            <CardTitle>About Details</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="aboutDescription">About Description</Label>
                  <span className="text-xs text-muted-foreground">
                    {watchDescription.length} characters
                  </span>
                </div>
                <Textarea
                  id="aboutDescription"
                  placeholder="I am a Full Stack Developer..."
                  className="min-h-[250px]"
                  {...form.register("aboutDescription")}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Markdown is supported.
                </p>
                {form.formState.errors.aboutDescription && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.aboutDescription.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Signature Image</Label>
                <Controller
                  name="signature"
                  control={form.control}
                  render={({ field }) => (
                    <ImageUploader
                      label="Signature"
                      currentUrl={field.value || ""}
                      onUpload={(url) => field.onChange(url)}
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Hero Image (Linked)</Label>
                <div className="p-4 border rounded-md bg-muted/50 text-sm text-muted-foreground">
                  {imageUrl ? (
                    <div className="flex items-center gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl} alt="Hero image" className="h-16 w-16 object-cover rounded-md border border-muted" />
                      <span>This image is synced from your Hero Section.</span>
                    </div>
                  ) : (
                    <span>No image synced from Hero Section yet.</span>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card className="shadow-lg border-muted/50 bg-muted/10 hidden md:block">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h2>{form.watch("name") || "Your Name"}</h2>
              <div className="whitespace-pre-wrap text-muted-foreground">
                {watchDescription || "Your about text will appear here."}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
