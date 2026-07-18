import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
  disabled?: boolean;
  actionIcon?: ReactNode;
}

export default function PageHeader({ title, actionText, onAction, disabled, actionIcon }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {actionText && onAction && (
        <Button onClick={onAction} disabled={disabled} className="gap-2">
          {actionIcon}
          {actionText}
        </Button>
      )}
    </div>
  );
}
