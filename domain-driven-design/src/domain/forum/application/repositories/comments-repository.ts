import type { PaginationParams } from "@@src/core/repositories/pagination-params";
import type { AnswerComment } from "../../enterprise/entities/comment/answer";
import type { QuestionComment } from "../../enterprise/entities/comment/question";

export interface QuestionsCommentRepository {
	create(questionComment: QuestionComment): Promise<void>;
	findById(id: string): Promise<QuestionComment | null>;
	findManyByQuestionId(
		questionId: string,
		params: PaginationParams,
	): Promise<QuestionComment[]>;
	delete(questionComment: QuestionComment): Promise<void>;
}

export interface AnswerCommentRepository {
	create(answerComment: AnswerComment): Promise<void>;
	findById(id: string): Promise<AnswerComment | null>;
	findManyByAnswerId(
		answerId: string,
		params: PaginationParams,
	): Promise<AnswerComment[]>;
	delete(answerComment: AnswerComment): Promise<void>;
}
