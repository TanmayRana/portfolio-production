interface SkillProgressBarProps {
  name: string;
  level: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";

export default function SkillProgressBar({ name, level, onEdit, onDelete }: SkillProgressBarProps) {
  return (
    <div className="space-y-1 group">
      <div className="flex justify-between text-sm items-center">
        <span>{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{level}%</span>
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onEdit}>
                <Edit size={12} className="text-blue-500" />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onDelete}>
                <Trash size={12} className="text-red-500" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}
