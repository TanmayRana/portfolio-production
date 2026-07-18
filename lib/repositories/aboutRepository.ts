import { db } from "@/lib/db";
import { aboutTable, heroTable, contactTable } from "@/lib/schema";

export class AboutRepository {
  static async getAboutRecord() {
    const result = await db.select().from(aboutTable).limit(1);
    return result[0] || null;
  }

  static async getHeroImageOnly() {
    const result = await db.select({ imageUrl: heroTable.imageUrl }).from(heroTable).limit(1);
    return result[0]?.imageUrl || null;
  }

  static async getContactRecord() {
    const result = await db.select().from(contactTable).limit(1);
    return result[0] || null;
  }
}
