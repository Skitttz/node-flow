import type { QuestionComment } from "../../enterprise/entities/comment/question";

export interface QuestionsCommentRepository {
	create(questionComment: QuestionComment): Promise<void>;
	findById(id: string): Promise<QuestionComment | null>;
	delete(questionComment: QuestionComment): Promise<void>;
}
