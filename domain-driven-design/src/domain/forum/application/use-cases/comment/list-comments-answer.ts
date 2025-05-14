import { right } from "@@src/core/either";
import type { AnswerCommentRepository } from "../../repositories/comments-repository";
import type {
	ListCommentsAnswerUseCaseRequest,
	ListCommentsAnswerUseCaseResponse,
} from "../../types/comment";

export class ListCommentsAnswerUseCase {
	constructor(private answerCommentsRepository: AnswerCommentRepository) {}

	async execute({
		page,
		answerId,
	}: ListCommentsAnswerUseCaseRequest): Promise<ListCommentsAnswerUseCaseResponse> {
		const answerComments =
			await this.answerCommentsRepository.findManyByAnswerId(answerId, {
				page,
			});

		return right({ answerComments });
	}
}
