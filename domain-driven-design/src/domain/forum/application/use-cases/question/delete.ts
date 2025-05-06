import type { QuestionsRepository } from "../../repositories/questions-repository";
import type {
  DeleteQuestionUseCaseRequest,
} from "../../types/questions";

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({questionId, authorId}: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionsRepository.findById(questionId);

    if(!question){
      throw new Error("Question not found");
    }

    if(authorId !== question.authorId.toString()){
      throw new Error("Unauthorized")
    }

    await this.questionsRepository.delete(question);
  }
}
