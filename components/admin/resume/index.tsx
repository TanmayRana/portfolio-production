import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, Trash } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import ResumeUploader from "@/components/admin/ResumeUploader";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";
import { Resume } from "@/containers/admin/resume/Hooks";

interface ResumeComponentProps {
  resume: Resume | null;
  fileUrlInput: string;
  fileNameInput: string;
  isSaving: boolean;
  setFileUrlInput: (val: string) => void;
  setFileNameInput: (val: string) => void;
  handleSave: () => void;
  handleDelete: () => void;
}

export default function ResumeComponent({
  resume,
  fileUrlInput,
  fileNameInput,
  isSaving,
  setFileUrlInput,
  setFileNameInput,
  handleSave,
  handleDelete,
}: ResumeComponentProps) {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Resume Management" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg border-dashed">
          <CardHeader>
            <CardTitle>Upload / Link Resume</CardTitle>
            <CardDescription>Supported formats: PDF, JPG, PNG.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>File Name</Label>
              <Input
                placeholder="Tanmay_Rana_Resume.pdf"
                value={fileNameInput}
                onChange={(e) => setFileNameInput(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>File URL</Label>
              <Input
                placeholder="https://..."
                value={fileUrlInput}
                onChange={(e) => setFileUrlInput(e.target.value)}
              />
            </div>
            <ResumeUploader
              currentUrl={fileUrlInput}
              onUpload={setFileUrlInput}
              onFileName={setFileNameInput}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isSaving} className="w-full">
              {isSaving
                ? "Saving..."
                : resume
                  ? "Update Resume"
                  : "Save Resume"}
            </Button>
          </CardFooter>
        </Card>

        {resume && (
          <Card className="shadow-lg bg-muted/10">
            <CardHeader>
              <CardTitle>Current Resume</CardTitle>
              <CardDescription>
                Preview and manage your active resume.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 min-h-[300px]">
              <FileText className="h-24 w-24 text-primary" />
              <div className="text-center">
                <p className="font-semibold">
                  {resume.fileName || "Resume File"}
                </p>
                <p className="text-sm text-muted-foreground break-all">
                  {resume.fileUrl}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-background p-4">
              <Button variant="outline" className="gap-2" asChild>
                <a
                  href={resume.fileUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download size={16} /> Download
                </a>
              </Button>
              <ConfirmDeleteDialog
                onConfirm={handleDelete}
                trigger={
                  <Button variant="destructive" className="gap-2">
                    <Trash size={16} /> Delete
                  </Button>
                }
              />
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
