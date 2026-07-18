import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { HeroService } from "@/lib/services/heroService";

export async function GET() {
  try {
    const heroData = await HeroService.getLatestHero();
    return NextResponse.json({ success: true, data: heroData });
  } catch (err) {
    console.error("GET /api/hero error:", err);
    return NextResponse.json({ success: false, message: "Failed to fetch hero data." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const result = await HeroService.saveHero(formData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: result.message });
  } catch (err) {
    console.error("POST /api/hero error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
