import type { AnswerCommentRepository } from "../../repositories/answers-comment-repository";
import type { DeleteCommentAnswerUseCaseRequest } from "../../types/comment";

export class DeleteAnswerCommentUseCase {
	constructor(private answersCommentRepository: AnswerCommentRepository) {}

	async execute({
		authorId,
		answerCommentId,
	}: DeleteCommentAnswerUseCaseRequest) {
		const answerComment =
			await this.answersCommentRepository.findById(answerCommentId);

		if (!answerComment) {
			throw new Error("Answer Comment not found");
		}

		if (answerComment.authorId.toString() !== authorId) {
			throw new Error("Unauthorized");
		}

		await this.answersCommentRepository.delete(answerComment);

		return {};
	}
}
