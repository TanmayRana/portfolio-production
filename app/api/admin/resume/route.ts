import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resumeTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const existing = await db.select().from(resumeTable).limit(1);

    let result;
    if (existing.length > 0) {
      result = await db.update(resumeTable)
        .set(data)
        .where(eq(resumeTable.id, existing[0].id))
        .returning();
    } else {
      result = await db.insert(resumeTable)
        .values(data)
        .returning();
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save resume" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const existing = await db.select().from(resumeTable).limit(1);
    return NextResponse.json(existing[0] || null);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await db.delete(resumeTable).where(eq(resumeTable.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
  }
}
