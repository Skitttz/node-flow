import { left, right } from "@@src/core/either";
import { NotFoundError } from "@@src/core/errors/not-found";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import type { QuestionsRepository } from "../../repositories/questions-repository";
import type {
	EditQuestionUseCaseRequest,
	EditQuestionUseCaseResponse,
} from "../../types/questions";

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
			return left(new NotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new UnauthorizedError());
		}

		question.title = title;
		question.content = content;

		await this.questionsRepository.edit(question);

		return right({ question });
	}
}
