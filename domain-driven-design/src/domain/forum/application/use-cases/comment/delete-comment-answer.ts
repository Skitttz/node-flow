import { left, right, type Either } from "@@src/core/either";
import { NotFoundError } from "@@src/core/errors/not-found";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import type { AnswerCommentRepository } from "../../repositories/comments-repository";
import type { DeleteCommentAnswerUseCaseRequest } from "../../types/comment";

type DeleteCommentAnswerUseCaseResponse = Either<
	NotFoundError | UnauthorizedError,
	{}
>;

export class DeleteAnswerCommentUseCase {
	constructor(private answersCommentRepository: AnswerCommentRepository) {}

	async execute({
		authorId,
		answerCommentId,
	}: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
		const answerComment =
			await this.answersCommentRepository.findById(answerCommentId);

		if (!answerComment) {
			return left(new NotFoundError());
		}

		if (answerComment.authorId.toString() !== authorId) {
			return left(new UnauthorizedError());
		}

		await this.answersCommentRepository.delete(answerComment);

		return right({});
	}
}
