import { left, right, type Either } from "@@src/core/either";
import { NotFoundError } from "@@src/core/errors/not-found";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import type { QuestionsCommentRepository } from "../../repositories/comments-repository";
import type { DeleteCommentQuestionUseCaseRequest } from "../../types/comment";

type DeleteCommentQuestionUseCaseResponse = Either<
	NotFoundError | UnauthorizedError,
	{}
>;
export class DeleteQuestionCommentUseCase {
	constructor(private questionsCommentRepository: QuestionsCommentRepository) {}

	async execute({
		authorId,
		questionCommentId,
	}: DeleteCommentQuestionUseCaseRequest): Promise<DeleteCommentQuestionUseCaseResponse> {
		const questionComment =
			await this.questionsCommentRepository.findById(questionCommentId);

		if (!questionComment) {
			return left(new NotFoundError());
		}

		if (questionComment.authorId.toString() !== authorId) {
			return left(new UnauthorizedError());
		}

		await this.questionsCommentRepository.delete(questionComment);

		return right({});
	}
}
