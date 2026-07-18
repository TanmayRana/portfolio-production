import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import StatusBadge from "./StatusBadge";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface ExperienceCardProps {
  id: string;
  companyName: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  technologies?: string[];
  publishedStatus?: "Published" | "Draft";
  onEdit: () => void;
  onDelete: () => void;
}

export default function ExperienceCard({
  companyName,
  position,
  location,
  startDate,
  endDate,
  technologies = [],
  publishedStatus,
  onEdit,
  onDelete
}: ExperienceCardProps) {
  return (
    <Card className={`shadow-sm ${publishedStatus === 'Draft' ? 'opacity-60' : ''}`}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{position} @ {companyName}</CardTitle>
          <CardDescription>{startDate} - {endDate || "Present"} | {location}</CardDescription>
        </div>
        <div className="flex gap-2 items-center">
          {publishedStatus && <StatusBadge status={publishedStatus} />}
          <Button variant="outline" size="icon" onClick={onEdit}>
            <Edit size={16} />
          </Button>
          <ConfirmDeleteDialog 
            onConfirm={onDelete} 
            trigger={<Button variant="destructive" size="icon"><Trash size={16} /></Button>} 
          />
        </div>
      </CardHeader>
      {technologies.length > 0 && (
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Technologies</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {technologies.map((tech, i) => (
                <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{tech}</span>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
