import { left, right } from "@@src/core/either";
import { NotFoundError } from "@@src/core/errors/not-found";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import type { AnswersRepository } from "../../repositories/answers-repository";
import type { QuestionsRepository } from "../../repositories/questions-repository";
import type {
	ChooseBestAnswerUseCaseRequest,
	ChooseBestAnswerUseCaseResponse,
} from "../../types/answers";

export class ChooseBestAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private questionsRepository: QuestionsRepository,
	) {}

	async execute({
		answerId,
		authorId,
	}: ChooseBestAnswerUseCaseRequest): Promise<ChooseBestAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);
		if (!answer) {
			return left(new NotFoundError());
		}

		const question = await this.questionsRepository.findById(
			answer?.questionId.toString(),
		);

		if (!question) {
			return left(new NotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new UnauthorizedError());
		}

		question.bestAnswerId = answer.id;

		await this.questionsRepository.edit(question);

		return right({ question });
	}
}
