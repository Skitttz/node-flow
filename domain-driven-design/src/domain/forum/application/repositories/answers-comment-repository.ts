import type { AnswerComment } from "../../enterprise/entities/comment/answer";

export interface AnswerCommentRepository {
	create(answerComment: AnswerComment): Promise<void>;
	findById(id: string): Promise<AnswerComment | null>;
	delete(answerComment: AnswerComment): Promise<void>;
}
