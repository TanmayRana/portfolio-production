import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { ExpertiseService } from "@/lib/services/expertiseService";

export async function GET() {
  try {
    const data = await ExpertiseService.getExpertiseData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET /api/my-expertise error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch my expertise data" }, { status: 500 });
  }
}
