import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { skillCategoryTable, skillTable } from "@/lib/schema";

export async function GET() {
  try {
    const categories = await db.select().from(skillCategoryTable).orderBy(skillCategoryTable.order);
    const skills = await db.select().from(skillTable).orderBy(skillTable.order);

    const data = categories.map(cat => ({
      ...cat,
      skills: skills.filter(skill => skill.categoryId === cat.id)
    }));

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("GET /api/skills error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch skills data." }, { status: 500 });
  }
}
