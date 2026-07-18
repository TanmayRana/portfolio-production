import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, Edit, Trash } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  liveUrl,
  githubUrl,
  technologies,
  onEdit,
  onDelete
}: ProjectCardProps) {
  return (
    <Card className="shadow-lg overflow-hidden flex flex-col h-full border-muted/50 hover:border-primary/30 transition-colors">
      <div className="aspect-video bg-muted relative group">
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
          onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400?text=No+Image")} 
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-1 mt-1">
          {technologies.map((tech, i) => (
            <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{tech}</span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/20 p-4">
        <div className="flex gap-2">
          {liveUrl && (
            <Button variant="outline" size="icon" asChild>
              <a href={liveUrl} target="_blank" rel="noreferrer"><ExternalLink size={16} /></a>
            </Button>
          )}
          {githubUrl && (
            <Button variant="outline" size="icon" asChild>
              <a href={githubUrl} target="_blank" rel="noreferrer"><Code size={16} /></a>
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onEdit}><Edit size={16} /></Button>
          <Button variant="destructive" size="icon" onClick={onDelete}><Trash size={16} /></Button>
        </div>
      </CardFooter>
    </Card>
  );
}
