import { left, right } from "@@src/core/either";
import { NotFoundError } from "@@src/core/errors/not-found";
import type { QuestionsRepository } from "../../repositories/questions-repository";
import type {
	GetQuestionBySlugUseCaseRequest,
	GetQuestionBySlugUseCaseResponse,
} from "../../types/questions";

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug);

		if (!question) {
			return left(new NotFoundError());
		}

		return right({ question });
	}
}
