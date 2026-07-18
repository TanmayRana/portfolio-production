import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { myExperienceTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const experiences = await db.select().from(myExperienceTable).orderBy(myExperienceTable.order);
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, body, showIdeaMessage, order } = await req.json();
    const result = await db.insert(myExperienceTable).values({ title, body, showIdeaMessage, order: order || 0 }).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add experience" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, body, showIdeaMessage, order } = await req.json();
    const result = await db.update(myExperienceTable).set({ title, body, showIdeaMessage, order: order || 0 }).where(eq(myExperienceTable.id, id)).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await db.delete(myExperienceTable).where(eq(myExperienceTable.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
