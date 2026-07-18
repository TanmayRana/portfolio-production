import { db } from "@/lib/db";
import { heroTable } from "@/lib/schema";
import { desc } from "drizzle-orm";

export class HeroRepository {
  static async getLatestHero() {
    const result = await db.select().from(heroTable).orderBy(desc(heroTable.createdAt)).limit(1);
    return result[0] || null;
  }

  static async ensureHeroTableExists() {
    await db.run(
      `CREATE TABLE IF NOT EXISTS hero (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        tagline TEXT NOT NULL,
        hero_description TEXT NOT NULL,
        video_url TEXT,
        image_url TEXT,
        created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
        updated_at TEXT DEFAULT (CURRENT_TIMESTAMP)
      )`
    );
  }

  static async insertHero(data: {
    name: string;
    tagline: string;
    heroDescription: string;
    videoUrl: string | null;
    imageUrl: string | null;
  }) {
    await db.insert(heroTable).values(data);
  }
}
