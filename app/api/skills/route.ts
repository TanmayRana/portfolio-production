import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { SkillsService } from "@/lib/services/skillsService";

export async function GET() {
  try {
    const data = await SkillsService.getSkillsData();

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("GET /api/skills error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch skills data." }, { status: 500 });
  }
}
