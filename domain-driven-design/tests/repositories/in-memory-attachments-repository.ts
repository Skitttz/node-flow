import type {
	AnswerAttachmentRepository,
	QuestionAttachmentRepository,
} from "@@src/domain/forum/application/repositories/attachments-repository";
import type { AnswerAttachment } from "@@src/domain/forum/enterprise/entities/attachment/answer-attachment";
import type { QuestionAttachment } from "@@src/domain/forum/enterprise/entities/attachment/question-attachment";

export class InMemoryQuestionAttachmentsRepository
	implements QuestionAttachmentRepository
{
	public items: QuestionAttachment[] = [];

	async findManyByQuestion(questionId: string) {
		const QuestionAttachmentss = this.items.filter(
			(item) => item.questionId.toString() === questionId,
		);

		return QuestionAttachmentss;
	}

	async deleteManyByQuestion(questionId: string) {
		const questionAttachments = this.items.filter(
			(item) => item.questionId.toString() !== questionId,
		);

		this.items = questionAttachments;
	}
}

export class InMemoryAnswerAttachmentsRepository
	implements AnswerAttachmentRepository
{
	public items: AnswerAttachment[] = [];

	async findManyByAnswer(answerId: string) {
		const answerAttachmentss = this.items.filter(
			(item) => item.answerId.toString() === answerId,
		);

		return answerAttachmentss;
	}

	async deleteManyByAnswer(answerId: string) {
		const answerAttachments = this.items.filter(
			(item) => item.answerId.toString() !== answerId,
		);

		this.items = answerAttachments;
	}
}
