import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const existing = await db.select().from(contactTable).limit(1);

    let result;
    if (existing.length > 0) {
      result = await db.update(contactTable)
        .set(data)
        .where(eq(contactTable.id, existing[0].id))
        .returning();
    } else {
      result = await db.insert(contactTable)
        .values(data)
        .returning();
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save contact info" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const existing = await db.select().from(contactTable).limit(1);
    return NextResponse.json(existing[0] || null);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contact info" }, { status: 500 });
  }
}
