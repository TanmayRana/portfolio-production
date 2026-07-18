import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

import PageHeader from "@/components/admin/PageHeader";
import FormDialog from "@/components/admin/FormDialog";
import CertificationCard from "@/components/admin/CertificationCard";
import ImageUploader from "@/components/admin/ImageUploader";

import {
  Certification,
  CertFormValues,
} from "@/containers/admin/certifications/Hooks";

interface CertificationsComponentProps {
  certifications: Certification[];
  isDialogOpen: boolean;
  editingId: string | null;
  form: UseFormReturn<CertFormValues>;
  setIsDialogOpen: (open: boolean) => void;
  setEditingId: (id: string | null) => void;
  onSubmit: (data: any) => void;
  handleDelete: (id: string) => void;
  openEdit: (cert: Certification) => void;
}

export default function CertificationsComponent({
  certifications,
  isDialogOpen,
  editingId,
  form,
  setIsDialogOpen,
  setEditingId,
  onSubmit,
  handleDelete,
  openEdit,
}: CertificationsComponentProps) {
  return (
    <div className="p-6  space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
        <FormDialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              form.reset();
              setEditingId(null);
            }
          }}
          triggerText="Add Certification"
          triggerIcon={<Plus size={16} />}
          title={editingId ? "Edit Certification" : "Add Certification"}
          disableClose={true}
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="AWS Cloud Practitioner"
                {...form.register("title")}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issuer</Label>
                <Input
                  placeholder="Amazon Web Services"
                  {...form.register("issuer")}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" {...form.register("date")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Verification Link</Label>
                <Input
                  placeholder="https://..."
                  {...form.register("verificationLink")}
                />
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  placeholder="0"
                  {...form.register("order", { valueAsNumber: true })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input placeholder="https://..." {...form.register("imageUrl")} />
              <div className="pt-2">
                <ImageUploader
                  label="Certificate Image"
                  currentUrl={form.watch("imageUrl")}
                  onUpload={(url) =>
                    form.setValue("imageUrl", url, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Details about this certification..."
                {...form.register("description")}
              />
            </div>
            {/* <Button type="submit" className="w-full">Save</Button> */}
            <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  form.reset();
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </FormDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <CertificationCard
            key={cert.id}
            id={cert.id}
            title={cert.title}
            issuer={cert.issuer}
            date={cert.date}
            verificationLink={cert.verificationLink}
            description={cert.description}
            imageUrl={cert.imageUrl}
            onEdit={() => openEdit(cert)}
            onDelete={() => handleDelete(cert.id)}
          />
        ))}
      </div>
    </div>
  );
}
