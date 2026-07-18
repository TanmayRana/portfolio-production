import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aboutTable, heroTable, contactTable } from "@/lib/schema";

export async function GET() {
  try {
    const existingAbout = await db.select().from(aboutTable).limit(1);
    const heroInfo = await db.select({ imageUrl: heroTable.imageUrl }).from(heroTable).limit(1);
    const contactInfo = await db.select().from(contactTable).limit(1);

    const aboutData = existingAbout[0] || null;
    const imageUrl = heroInfo[0]?.imageUrl || null;
    const contactData = contactInfo[0] || null;

    return NextResponse.json({
      success: true,
      data: {
        about: aboutData,
        imageUrl: imageUrl,
        contact: contactData
      }
    });
  } catch (err) {
    console.error("GET /api/about error:", err);
    return NextResponse.json({ success: false, message: "Failed to fetch about data." }, { status: 500 });
  }
}
