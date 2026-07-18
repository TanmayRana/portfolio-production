import { UploadCloud, Loader2, Eye, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { uploadToImageKit, deleteFromImageKitByUrl } from "@/lib/imagekit";
import { toast } from "sonner";

interface ImageUploaderProps {
  label?: string;
  currentUrl?: string;
  onUpload?: (url: string) => void;
}

export default function ImageUploader({ label = "Image", currentUrl, onUpload }: ImageUploaderProps) {
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
        const result = await uploadToImageKit(file, "/videoProtfolio/image");
        if (result?.url && onUpload) {
          onUpload(result.url);
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
      className={`border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center space-y-2 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
      onClick={() => !isUploading && fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
        disabled={isUploading}
      />
      {isUploading ? (
        <div className="py-4">
          <Loader2 className="mx-auto h-8 w-8 text-muted-foreground animate-spin" />
        </div>
      ) : currentUrl ? (
        <div className="relative w-full h-32 md:h-40 rounded overflow-hidden flex items-center justify-center bg-black/5 dark:bg-white/5 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
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
        <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
      )}
      <div className="text-sm font-medium">
        {isUploading ? "Uploading..." : currentUrl ? "Click to change image" : `Drag & drop your ${label} here`}
      </div>
      <div className="text-xs text-muted-foreground">
        {isUploading ? "Please wait" : "Or click to select a file"}
      </div>
    </div>
  );
}
