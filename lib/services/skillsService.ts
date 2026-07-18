import { SkillsRepository } from "@/lib/repositories/skillsRepository";

export class SkillsService {
  static async getSkillsData() {
    const categories = await SkillsRepository.getSkillCategories();
    const skills = await SkillsRepository.getSkills();

    const data = categories.map(cat => ({
      ...cat,
      skills: skills.filter(skill => skill.categoryId === cat.id)
    }));

    return data;
  }
}
