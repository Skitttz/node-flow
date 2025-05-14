import { left, right } from "@@src/core/either";
import { NotFoundError } from "@@src/core/errors/not-found";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import type { QuestionsRepository } from "../../repositories/questions-repository";
import type {
	DeleteQuestionUseCaseRequest,
	DeleteQuestionUseCaseResponse,
} from "../../types/questions";

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		questionId,
		authorId,
	}: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			return left(new NotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new UnauthorizedError());
		}

		await this.questionsRepository.delete(question);

		return right({});
	}
}
