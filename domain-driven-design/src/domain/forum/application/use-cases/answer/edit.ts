import { left, right } from "@@src/core/either";
import { NotFoundError } from "@@src/core/errors/not-found";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import type { AnswersRepository } from "../../repositories/answers-repository";
import type {
	EditAnswerUseCaseRequest,
	EditAnswerUseCaseResponse,
} from "../../types/answers";

export class EditAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		authorId,
		answerId,
		content,
	}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new NotFoundError());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new UnauthorizedError());
		}
		answer.content = content;

		await this.answersRepository.edit(answer);

		return right({ answer });
	}
}
