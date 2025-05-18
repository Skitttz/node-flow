import type { AnswerAttachment } from "../../enterprise/entities/attachment/answer-attachment";
import type { QuestionAttachment } from "../../enterprise/entities/attachment/question-attachment";

export interface QuestionAttachmentRepository {
	findManyByQuestion(questionId: string): Promise<QuestionAttachment[]>;
	deleteManyByQuestion(questionId: string): Promise<void>;
}

export interface AnswerAttachmentRepository {
	findManyByAnswer(answerId: string): Promise<AnswerAttachment[]>;
	deleteManyByAnswer(answerId: string): Promise<void>;
}
