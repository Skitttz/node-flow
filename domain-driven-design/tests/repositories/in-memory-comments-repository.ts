import type { AnswerCommentRepository } from "@@src/domain/forum/application/repositories/answers-comment-repository";
import type { QuestionsCommentRepository } from "@@src/domain/forum/application/repositories/questions-comment-repository";
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
}
