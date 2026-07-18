import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { myExperienceTable } from "@/lib/schema";

export async function GET() {
  try {
    const data = await db.select().from(myExperienceTable).orderBy(myExperienceTable.order);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET /api/my-expertise error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch my expertise data" }, { status: 500 });
  }
}
