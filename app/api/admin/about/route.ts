import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aboutTable, heroTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, aboutDescription, signature } = body;

    const existingAbout = await db.select().from(aboutTable).limit(1);

    let result;
    if (existingAbout.length > 0) {
      result = await db.update(aboutTable)
        .set({ name, aboutDescription, signature })
        .where(eq(aboutTable.id, existingAbout[0].id))
        .returning();
    } else {
      result = await db.insert(aboutTable)
        .values({ name, aboutDescription, signature })
        .returning();
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("About API Error:", error);
    return NextResponse.json({ error: "Failed to save about data" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const existingAbout = await db.select().from(aboutTable).limit(1);
    const heroInfo = await db.select({ imageUrl: heroTable.imageUrl }).from(heroTable).limit(1);
    
    let aboutData = existingAbout[0] || null;
    
    // If we have hero image, merge it into the response so the frontend can preview it
    if (aboutData && heroInfo[0]?.imageUrl) {
      aboutData = { ...aboutData, imageUrl: heroInfo[0].imageUrl };
    } else if (!aboutData && heroInfo[0]?.imageUrl) {
      // If no about data yet, just return the hero image url
      return NextResponse.json({ imageUrl: heroInfo[0].imageUrl });
    }

    return NextResponse.json(aboutData);
  } catch (error) {
    console.error("About API Error:", error);
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 });
  }
}
