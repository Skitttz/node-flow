import type { QuestionsRepository } from "../../repositories/questions-repository";
import type {
  GetQuestionBySlugUseCaseRequest,
  GetQuestionBySlugUseCaseResponse,
} from "../../types/questions";

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({slug}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if(!question){
      throw new Error("Question Not Found")
    }
    
    return {
      question
    }
  }
}
