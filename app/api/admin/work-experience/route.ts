import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { workExperienceTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const experiences = await db.select().from(workExperienceTable).orderBy(workExperienceTable.order);
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch work experiences" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await db.insert(workExperienceTable).values(data).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add work experience" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;
    const result = await db.update(workExperienceTable).set(updateData).where(eq(workExperienceTable.id, id)).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update work experience" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await db.delete(workExperienceTable).where(eq(workExperienceTable.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete work experience" }, { status: 500 });
  }
}
