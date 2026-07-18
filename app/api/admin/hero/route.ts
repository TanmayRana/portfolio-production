import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { heroTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, tagline, heroDescription, imageUrl, videoUrl } = body;

    // Check if hero entry already exists
    const existingHero = await db.select().from(heroTable).limit(1);

    let result;
    if (existingHero.length > 0) {
      // Update existing
      result = await db.update(heroTable)
        .set({ name, tagline, heroDescription, imageUrl, videoUrl })
        .where(eq(heroTable.id, existingHero[0].id))
        .returning();
    } else {
      // Insert new
      result = await db.insert(heroTable)
        .values({ name, tagline, heroDescription, imageUrl, videoUrl })
        .returning();
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Hero API Error:", error);
    return NextResponse.json({ error: "Failed to save hero data" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const existingHero = await db.select().from(heroTable).limit(1);
    return NextResponse.json(existingHero[0] || null);
  } catch (error) {
    console.error("Hero API Error:", error);
    return NextResponse.json({ error: "Failed to fetch hero data" }, { status: 500 });
  }
}
