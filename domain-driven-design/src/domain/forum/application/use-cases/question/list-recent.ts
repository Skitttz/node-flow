import type { QuestionsRepository } from "../../repositories/questions-repository";
import type {
  ListRecentQuestionsUseCaseRequest,
  ListRecentQuestionsUseCaseResponse,
} from "../../types/questions";

export class ListRecentQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({page});

    return {
      questions,
    };
  }
}
