import { UniqueID } from "@@src/core/entities/unique-id";
import { AnswerComment } from "@@src/domain/forum/enterprise/entities/comment/answer";
import type { AnswerCommentRepository } from "../../repositories/answers-comment-repository";
import type { AnswersRepository } from "../../repositories/answers-repository";
import type {
	CommentAnswerUseCaseRequest,
	CommentAnswerUseCaseResponse,
} from "../../types/comment";

export class CommentAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private answerCommentRepository: AnswerCommentRepository,
	) {}

	async execute({
		authorId,
		content,
		answerId,
	}: CommentAnswerUseCaseRequest): Promise<CommentAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);
		if (!answer) {
			throw new Error("Answer not found");
		}

		const answerComment = AnswerComment.create({
			authorId: new UniqueID(authorId),
			answerId: new UniqueID(answerId),
			content,
		});

		await this.answerCommentRepository.create(answerComment);

		return {
			answerComment,
		};
	}
}
