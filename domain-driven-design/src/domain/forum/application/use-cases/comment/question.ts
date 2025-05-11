import { UniqueID } from "@@src/core/entities/unique-id";
import { QuestionComment } from "@@src/domain/forum/enterprise/entities/comment/question";
import type { QuestionsCommentRepository } from "../../repositories/questions-comment-repository";
import type { QuestionsRepository } from "../../repositories/questions-repository";
import type {
	CommentQuestionUseCaseRequest,
	CommentQuestionUseCaseResponse,
} from "../../types/comment";

export class CommentQuestionUseCase {
	constructor(
		private questionsRepository: QuestionsRepository,
		private questionsCommentRepository: QuestionsCommentRepository,
	) {}

	async execute({
		authorId,
		content,
		questionId,
	}: CommentQuestionUseCaseRequest): Promise<CommentQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);
		if (!question) {
			throw new Error("Question not found");
		}

		const questionComment = QuestionComment.create({
			authorId: new UniqueID(authorId),
			questionId: new UniqueID(questionId),
			content,
		});

		await this.questionsCommentRepository.create(questionComment);

		return {
			questionComment,
		};
	}
}
