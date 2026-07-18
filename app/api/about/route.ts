import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { AboutService } from "@/lib/services/aboutService";

export async function GET() {
  try {
    const data = await AboutService.getAboutData();

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err) {
    console.error("GET /api/about error:", err);
    return NextResponse.json({ success: false, message: "Failed to fetch about data." }, { status: 500 });
  }
}
