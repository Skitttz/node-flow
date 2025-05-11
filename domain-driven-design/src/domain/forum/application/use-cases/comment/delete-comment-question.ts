import type { QuestionsCommentRepository } from "../../repositories/comments-repository";
import type { DeleteCommentQuestionUseCaseRequest } from "../../types/comment";

export class DeleteQuestionCommentUseCase {
	constructor(private questionsCommentRepository: QuestionsCommentRepository) {}

	async execute({
		authorId,
		questionCommentId,
	}: DeleteCommentQuestionUseCaseRequest) {
		const questionComment =
			await this.questionsCommentRepository.findById(questionCommentId);

		if (!questionComment) {
			throw new Error("Question Comment not found");
		}

		if (questionComment.authorId.toString() !== authorId) {
			throw new Error("Unauthorized");
		}

		await this.questionsCommentRepository.delete(questionComment);

		return {};
	}
}
