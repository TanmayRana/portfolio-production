import { db } from "@/lib/db";
import { skillCategoryTable, skillTable } from "@/lib/schema";

export class SkillsRepository {
  static async getSkillCategories() {
    return await db.select().from(skillCategoryTable).orderBy(skillCategoryTable.order);
  }

  static async getSkills() {
    return await db.select().from(skillTable).orderBy(skillTable.order);
  }
}
