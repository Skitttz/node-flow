import type { QuestionsCommentRepository } from "../../repositories/comments-repository";
import type {
	ListCommentsQuestionUseCaseRequest,
	ListCommentsQuestionUseCaseResponse,
} from "../../types/comment";

export class ListCommentsQuestionUseCase {
	constructor(private questionCommentsRepository: QuestionsCommentRepository) {}

	async execute({
		page,
		questionId,
	}: ListCommentsQuestionUseCaseRequest): Promise<ListCommentsQuestionUseCaseResponse> {
		const questionComments =
			await this.questionCommentsRepository.findManyByQuestionId(questionId, {
				page,
			});

		return {
			questionComments,
		};
	}
}
