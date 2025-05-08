import type { QuestionsRepository } from "../../repositories/questions-repository";
import type { EditQuestionUseCaseRequest, EditQuestionUseCaseResponse } from "../../types/questions";

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Unauthorized");
    }
    question.title = title;
    question.content = content;

    await this.questionsRepository.edit(question);

    return {
      question
    }
  }
}
