import { HeroRepository } from "@/lib/repositories/heroRepository";
import { uploadToImageKit } from "@/lib/imagekit";

export class HeroService {
  static async getLatestHero() {
    return await HeroRepository.getLatestHero();
  }

  static async saveHero(formData: FormData) {
    const name = formData.get("name") as string;
    const tagline = formData.get("tagline") as string;
    const heroDescription = formData.get("heroDescription") as string;
    const videoFile = formData.get("video") as File | null;
    const imageFile = formData.get("image") as File | null;

    const errors: Record<string, string[]> = {};
    if (!name?.trim()) errors.name = ["Name is required"];
    if (!tagline?.trim()) errors.tagline = ["Tagline is required"];
    if (!heroDescription?.trim()) errors.heroDescription = ["Hero description is required"];

    if (Object.keys(errors).length > 0) {
      return { success: false, errors, message: "Please fix the errors below." };
    }

    let imageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
      const { url } = await uploadToImageKit(imageFile, "/portfolio/images");
      imageUrl = url;
    }

    let videoUrl: string | undefined;
    if (videoFile && videoFile.size > 0) {
      const { url } = await uploadToImageKit(videoFile, "/portfolio/videos");
      videoUrl = url;
    }

    await HeroRepository.ensureHeroTableExists();

    await HeroRepository.insertHero({
      name: name.trim(),
      tagline: tagline.trim(),
      heroDescription: heroDescription.trim(),
      videoUrl: videoUrl ?? null,
      imageUrl: imageUrl ?? null,
    });

    return { success: true, message: "Hero section saved successfully! 🎉" };
  }
}
