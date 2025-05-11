import type { PaginationParams } from "@@src/core/repositories/pagination-params";
import type {
	AnswerCommentRepository,
	QuestionsCommentRepository,
} from "@@src/domain/forum/application/repositories/comments-repository";
import type { AnswerComment } from "@@src/domain/forum/enterprise/entities/comment/answer";
import type { QuestionComment } from "@@src/domain/forum/enterprise/entities/comment/question";

export class InMemoryQuestionCommentsRepository
	implements QuestionsCommentRepository
{
	public items: QuestionComment[] = [];

	async create(questionComment: QuestionComment) {
		this.items.push(questionComment);
	}

	async findById(id: string) {
		const questionComment = this.items.find(
			(item) => item.id.toString() === id,
		);

		if (!questionComment) {
			return null;
		}

		return questionComment;
	}

	async delete(questionComment: QuestionComment) {
		const itemIndex = this.items.findIndex(
			(item) => item.id === questionComment.id,
		);

		this.items.splice(itemIndex, 1);
	}

	async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
		const questionComments = this.items
			.filter((item) => item.questionId.toString() === questionId)
			.slice((page - 1) * 20, page * 20);
		return questionComments;
	}
}

export class InMemoryAnswerCommentsRepository
	implements AnswerCommentRepository
{
	public items: AnswerComment[] = [];

	async create(answerComment: AnswerComment) {
		this.items.push(answerComment);
	}

	async findById(id: string) {
		const answerComment = this.items.find((item) => item.id.toString() === id);

		if (!answerComment) {
			return null;
		}

		return answerComment;
	}

	async delete(answerComment: AnswerComment) {
		const itemIndex = this.items.findIndex(
			(item) => item.id === answerComment.id,
		);

		this.items.splice(itemIndex, 1);
	}

	async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
		const answerComments = this.items
			.filter((item) => item.answerId.toString() === answerId)
			.slice((page - 1) * 20, page * 20);
		return answerComments;
	}
}
