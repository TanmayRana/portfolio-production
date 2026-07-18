import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/admin/PageHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import VideoUploader from "@/components/admin/VideoUploader";
import { HeroFormValues } from "@/containers/admin/home/Hooks";

interface HomeComponentProps {
  form: UseFormReturn<HeroFormValues>;
  isSaving: boolean;
  onSubmit: (data: HeroFormValues) => void;
}

export default function HomeComponent({ form, isSaving, onSubmit }: HomeComponentProps) {
  return (
    <div className="p-6  space-y-6">
      <PageHeader 
        title="Home Page Management" 
        actionText={isSaving ? "Saving..." : "Save Changes"}
        disabled={isSaving}
        onAction={form.handleSubmit(onSubmit)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="shadow-lg border-muted/50 bg-background/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Hero Details</CardTitle>
              <CardDescription>
                Update the main hero section of your portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" {...form.register("name")} />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" placeholder="Full Stack Developer" {...form.register("tagline")} />
                  {form.formState.errors.tagline && (
                    <p className="text-sm text-red-500">{form.formState.errors.tagline.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heroDescription">Hero Description</Label>
                  <Textarea 
                    id="heroDescription" 
                    placeholder="Briefly introduce yourself..." 
                    className="min-h-[120px]"
                    {...form.register("heroDescription")} 
                  />
                  {form.formState.errors.heroDescription && (
                    <p className="text-sm text-red-500">{form.formState.errors.heroDescription.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label>Profile Image URL</Label>
                    <Input placeholder="https://..." {...form.register("imageUrl")} />
                    <div className="pt-2">
                      <ImageUploader label="Profile Image" currentUrl={form.watch("imageUrl")} onUpload={(url) => form.setValue("imageUrl", url, { shouldValidate: true, shouldDirty: true })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Hero Video URL</Label>
                    <Input placeholder="https://..." {...form.register("videoUrl")} />
                    <div className="pt-2">
                      <VideoUploader label="Hero Video" currentUrl={form.watch("videoUrl")} onUpload={(url) => form.setValue("videoUrl", url, { shouldValidate: true, shouldDirty: true })} />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview Section */}
        <div className="hidden lg:block space-y-6">
          <Card className="shadow-lg border-muted/50 bg-gradient-to-br from-background to-muted/20">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how it looks on your portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4 bg-background shadow-inner min-h-[400px] relative overflow-hidden">
                {form.watch("videoUrl") && (
                  <video 
                    src={form.watch("videoUrl")} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
                  />
                )}
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  {form.watch("imageUrl") ? (
                    <img src={form.watch("imageUrl")} alt="Profile" className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-primary/20" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-muted-foreground shadow-xl border-4 border-primary/20">
                      Image
                    </div>
                  )}
                  <h2 className="text-4xl font-extrabold tracking-tight">
                    {form.watch("name") || "Your Name"}
                  </h2>
                  <p className="text-xl text-muted-foreground font-medium">
                    {form.watch("tagline") || "Your Professional Tagline"}
                  </p>
                  <p className="text-md max-w-md mx-auto text-muted-foreground/80 leading-relaxed">
                    {form.watch("heroDescription") || "Your detailed description will appear here."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
