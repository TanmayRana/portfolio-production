import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash, Edit } from "lucide-react";

import FormDialog from "@/components/admin/FormDialog";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";
import SkillProgressBar from "@/components/admin/SkillProgressBar";
import ImageUploader from "@/components/admin/ImageUploader";

import { SkillCategory } from "@/containers/admin/skills/Hooks";

interface SkillsComponentProps {
  categories: SkillCategory[];
  isCatOpen: boolean;
  isSkillOpen: boolean;
  activeCategoryId: string | null;
  catForm: UseFormReturn<any>;
  skillForm: UseFormReturn<any>;
  setIsCatOpen: (open: boolean) => void;
  setIsSkillOpen: (open: boolean) => void;
  setActiveCategoryId: (id: string | null) => void;
  onCatSubmit: (data: any) => void;
  onSkillSubmit: (data: any) => void;
  deleteCategory: (id: string) => void;
  deleteSkill: (id: string) => void;
  openEditCategory: (cat: SkillCategory) => void;
  openEditSkill: (skill: any) => void;
  editingCategory: SkillCategory | null;
  editingSkill: any | null;
}

export default function SkillsComponent({
  categories,
  isCatOpen,
  isSkillOpen,
  activeCategoryId,
  catForm,
  skillForm,
  setIsCatOpen,
  setIsSkillOpen,
  setActiveCategoryId,
  onCatSubmit,
  onSkillSubmit,
  deleteCategory,
  deleteSkill,
  openEditCategory,
  openEditSkill,
  editingCategory,
  editingSkill,
}: SkillsComponentProps) {
  return (
    <div className="p-6  space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
        <FormDialog
          open={isCatOpen}
          onOpenChange={setIsCatOpen}
          triggerText="Add Category"
          triggerIcon={<Plus size={16} />}
          title={editingCategory ? "Edit Category" : "Add Category"}
        >
          <form
            onSubmit={catForm.handleSubmit(onCatSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input placeholder="Frontend" {...catForm.register("name")} />
            </div>
            <div className="space-y-2">
              <Label>Category Icon</Label>
              <ImageUploader
                label="Icon"
                currentUrl={catForm.watch("icon")}
                onUpload={(url) => catForm.setValue("icon", url)}
              />
            </div>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </FormDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Card
            key={cat.id}
            className="shadow-lg flex flex-col h-full border-primary/20"
          >
            <CardHeader className="flex flex-row items-center justify-between bg-muted/50 pb-4 border-b">
              <div className="flex items-center gap-2">
                <span className="text-2xl flex items-center justify-center w-8 h-8">
                  {cat.icon && cat.icon.startsWith("http") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover rounded" />
                  ) : (
                    cat.icon
                  )}
                </span>
                <CardTitle className="text-xl">{cat.name}</CardTitle>
              </div>
              <div className="flex gap-1 items-center">
                <Button variant="ghost" size="icon" onClick={() => openEditCategory(cat)}>
                  <Edit size={16} className="text-blue-500" />
                </Button>
                <ConfirmDeleteDialog
                  onConfirm={() => deleteCategory(cat.id)}
                  trigger={
                    <Button variant="ghost" size="icon">
                      <Trash size={16} className="text-red-500" />
                    </Button>
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col gap-4">
              <div className="space-y-4 flex-1">
                {cat.skills?.map((skill) => (
                  <SkillProgressBar
                    key={skill.id}
                    name={skill.name}
                    level={skill.level}
                    onEdit={() => openEditSkill(skill)}
                    onDelete={() => {
                      if (window.confirm("Delete skill?"))
                        deleteSkill(skill.id);
                    }}
                  />
                ))}
              </div>

              <FormDialog
                open={isSkillOpen && activeCategoryId === cat.id}
                onOpenChange={(open) => {
                  setIsSkillOpen(open);
                  if (open) setActiveCategoryId(cat.id);
                  else setActiveCategoryId(null);
                }}
                triggerText="Add Skill"
                triggerIcon={<Plus size={16} />}
                title={editingSkill ? `Edit Skill in ${cat.name}` : `Add Skill to ${cat.name}`}
              >
                <form
                  onSubmit={skillForm.handleSubmit(onSkillSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label>Skill Name</Label>
                    <Input
                      placeholder="React.js"
                      {...skillForm.register("name")}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Proficiency Level</Label>
                      <span>{skillForm.watch("level")}%</span>
                    </div>
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      onValueChange={(v) => skillForm.setValue("level", v[0])}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Save
                  </Button>
                </form>
              </FormDialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
