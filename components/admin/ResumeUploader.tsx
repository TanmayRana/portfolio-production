import { UploadCloud, Loader2, Eye, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { uploadToImageKit, deleteFromImageKitByUrl } from "@/lib/imagekit";
import { toast } from "sonner";

interface ResumeUploaderProps {
  label?: string;
  currentUrl?: string;
  onUpload?: (url: string) => void;
  onFileName?: (name: string) => void;
}

export default function ResumeUploader({ label = "Resume File", currentUrl, onUpload, onFileName }: ResumeUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        if (currentUrl) {
          await deleteFromImageKitByUrl(currentUrl);
        }
        const result = await uploadToImageKit(file, "/videoProtfolio/resume");
        if (result?.url && onUpload) {
          onUpload(result.url);
          if (onFileName) onFileName(file.name);
          toast.success(`${label} uploaded successfully`);
        } else if (!result?.url) {
          toast.error(`Failed to upload ${label}`);
        }
      } catch (error) {
        console.error("Upload failed", error);
        toast.error(`Failed to upload ${label}`);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentUrl) {
      try {
        setIsUploading(true);
        await deleteFromImageKitByUrl(currentUrl);
        if (onUpload) {
          onUpload("");
        }
        if (onFileName) {
          onFileName("");
        }
        toast.success(`${label} removed successfully`);
      } catch (error) {
        console.error("Remove failed", error);
        toast.error(`Failed to remove ${label}`);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentUrl) {
      window.open(currentUrl, '_blank');
    }
  };

  return (
    <div 
      className={`border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center space-y-2 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
      onClick={() => !isUploading && fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="application/pdf,image/jpeg,image/png" 
        className="hidden" 
        disabled={isUploading}
      />
      {isUploading ? (
        <div className="py-4">
          <Loader2 className="mx-auto h-12 w-12 text-muted-foreground animate-spin" />
        </div>
      ) : currentUrl ? (
        <div className="relative w-full h-32 md:h-40 rounded flex flex-col items-center justify-center bg-black/5 dark:bg-white/5 group">
          <UploadCloud className="mx-auto h-12 w-12 text-green-500 mb-2" />
          <span className="text-sm font-medium text-green-600">File Ready</span>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded">
            <button
              type="button"
              onClick={handlePreview}
              title="Preview"
              className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              title="Remove"
              className="p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
      )}
      
      {!currentUrl && (
        <>
          <div className="text-sm font-medium">
            {isUploading ? "Uploading..." : `Drag & drop your ${label} here`}
          </div>
          <div className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG</div>
        </>
      )}
    </div>
  );
}
