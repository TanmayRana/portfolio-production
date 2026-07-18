import { db } from "@/lib/db";
import { myExperienceTable } from "@/lib/schema";

export class ExpertiseRepository {
  static async getExpertiseRecords() {
    return await db.select().from(myExperienceTable).orderBy(myExperienceTable.order);
  }
}
