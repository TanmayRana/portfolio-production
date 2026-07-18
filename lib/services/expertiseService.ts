import { ExpertiseRepository } from "@/lib/repositories/expertiseRepository";

export class ExpertiseService {
  static async getExpertiseData() {
    return await ExpertiseRepository.getExpertiseRecords();
  }
}
