import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { skillCategoryTable, skillTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const categories = await db.select().from(skillCategoryTable).orderBy(skillCategoryTable.order);
    const skills = await db.select().from(skillTable).orderBy(skillTable.order);

    const data = categories.map(cat => ({
      ...cat,
      skills: skills.filter(skill => skill.categoryId === cat.id)
    }));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await db.insert(skillTable).values(data).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add skill" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await db.delete(skillTable).where(eq(skillTable.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const result = await db.update(skillTable).set(updateData).where(eq(skillTable.id, id)).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

