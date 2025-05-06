import { UniqueID } from "@@core/entities/unique-id";
import { Answer } from "@@src/domain/forum/enterprise/entities/answer";
import type { AnswersRepository } from "../../repositories/answer-questions-repository";
import type { AnswerQuestionUseCaseRequest, AnswerQuestionUseCaseResponse } from "../../types/answers";

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
	}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			authorId: new UniqueID(instructorId),
			questionId: new UniqueID(questionId),
			content,
		});

		await this.answersRepository.create(answer);

		return { answer };
	}
}
