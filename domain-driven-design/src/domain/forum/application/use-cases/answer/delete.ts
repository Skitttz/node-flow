import { left, right } from "@@src/core/either";
import { NotFoundError } from "@@src/core/errors/not-found";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import type { AnswersRepository } from "../../repositories/answers-repository";
import type {
	DeleteAnswerUseCaseRequest,
	DeleteAnswerUseCaseResponse,
} from "../../types/answers";

export class DeleteAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		answerId,
		authorId,
	}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new NotFoundError());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new UnauthorizedError());
		}

		await this.answersRepository.delete(answer);

		return right({});
	}
}
