import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { heroTable } from "@/lib/schema";
import { uploadToImageKit } from "@/lib/imagekit";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const heroData = await db.select().from(heroTable).orderBy(desc(heroTable.createdAt)).limit(1);
    return NextResponse.json({ success: true, data: heroData[0] || null });
  } catch (err) {
    console.error("GET /api/hero error:", err);
    return NextResponse.json({ success: false, message: "Failed to fetch hero data." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const tagline = formData.get("tagline") as string;
    const heroDescription = formData.get("heroDescription") as string;
    const videoFile = formData.get("video") as File | null;
    const imageFile = formData.get("image") as File | null;

    const errors: Record<string, string[]> = {};
    if (!name?.trim()) errors.name = ["Name is required"];
    if (!tagline?.trim()) errors.tagline = ["Tagline is required"];
    if (!heroDescription?.trim()) errors.heroDescription = ["Hero description is required"];

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, message: "Please fix the errors below.", errors }, { status: 400 });
    }

    let imageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
      const { url } = await uploadToImageKit(imageFile, "/portfolio/images");
      imageUrl = url;
    }

    let videoUrl: string | undefined;
    if (videoFile && videoFile.size > 0) {
      const { url } = await uploadToImageKit(videoFile, "/portfolio/videos");
      videoUrl = url;
    }

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

    await db.insert(heroTable).values({
      name: name.trim(),
      tagline: tagline.trim(),
      heroDescription: heroDescription.trim(),
      videoUrl: videoUrl ?? null,
      imageUrl: imageUrl ?? null,
    });

    return NextResponse.json({ success: true, message: "Hero section saved successfully! 🎉" });
  } catch (err) {
    console.error("POST /api/hero error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
