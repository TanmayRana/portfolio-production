import { AboutRepository } from "@/lib/repositories/aboutRepository";

export class AboutService {
  static async getAboutData() {
    const about = await AboutRepository.getAboutRecord();
    const imageUrl = await AboutRepository.getHeroImageOnly();
    const contact = await AboutRepository.getContactRecord();

    return {
      about,
      imageUrl,
      contact,
    };
  }
}
