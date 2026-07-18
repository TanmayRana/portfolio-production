import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit, Trash } from "lucide-react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface CertificationCardProps {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verificationLink?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CertificationCard({
  title,
  issuer,
  date,
  verificationLink,
  description,
  imageUrl,
  onEdit,
  onDelete
}: CertificationCardProps) {
  return (
    <Card className="shadow-lg overflow-hidden flex flex-col h-full hover:border-primary/30 transition-colors">
      {imageUrl ? (
        <div className="aspect-video bg-muted relative group">
          <img 
            src={imageUrl} 
            alt={title} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
            onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400?text=No+Image")} 
          />
        </div>
      ) : (
        <div className="h-4 bg-primary/20"></div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{issuer} • {date}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/20 p-4">
        <div className="flex gap-2">
          {verificationLink && (
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href={verificationLink} target="_blank" rel="noreferrer"><CheckCircle size={16} /> Verify</a>
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onEdit}><Edit size={16} /></Button>
          <ConfirmDeleteDialog 
            onConfirm={onDelete} 
            trigger={<Button variant="destructive" size="icon"><Trash size={16} /></Button>} 
          />
        </div>
      </CardFooter>
    </Card>
  );
}
