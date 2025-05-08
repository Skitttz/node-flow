import type { AnswersRepository } from "../../repositories/answers-repository";
import type { DeleteAnswerUseCaseRequest } from "../../types/answers";

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Unauthorized");
    }

    await this.answersRepository.delete(answer);
  }
}
