import { left, right } from "@@src/core/either";
import { UniqueID } from "@@src/core/entities/unique-id";
import { NotFoundError } from "@@src/core/errors/not-found";
import { AnswerComment } from "@@src/domain/forum/enterprise/entities/comment/answer";
import type { AnswersRepository } from "../../repositories/answers-repository";
import type { AnswerCommentRepository } from "../../repositories/comments-repository";
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
			return left(new NotFoundError());
		}

		const answerComment = AnswerComment.create({
			authorId: new UniqueID(authorId),
			answerId: new UniqueID(answerId),
			content,
		});

		await this.answerCommentRepository.create(answerComment);

		return right({ answerComment });
	}
}
