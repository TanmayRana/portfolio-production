import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerText: string;
  triggerIcon?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: string;
  disableClose?: boolean;
}

export default function FormDialog({
  open,
  onOpenChange,
  triggerText,
  triggerIcon,
  title,
  description,
  children,
  maxWidth = "max-w-xl",
  disableClose = false,
}: FormDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (disableClose && !newOpen) return;
        onOpenChange(newOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button className="gap-2">
          {triggerIcon} {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`w-full sm:${maxWidth} ${maxWidth} max-h-[85vh] overflow-y-auto`}
        showCloseButton={!disableClose}
        onInteractOutside={(e) => {
          if (disableClose) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (disableClose) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
