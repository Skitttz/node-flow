import { UniqueID } from "@@core/entities/unique-id";
import { Question } from "@@domain/forum/enterprise/entities/question";
import { right } from "@@src/core/either";
import { QuestionAttachment } from "@@src/domain/forum/enterprise/entities/attachment/question-attachment";
import { QuestionAttachmentList } from "@@src/domain/forum/enterprise/entities/attachment/question-attachment-list";
import type { QuestionsRepository } from "../../repositories/questions-repository";
import type {
	CreateQuestionUseCaseRequest,
	CreateQuestionUseCaseResponse,
} from "../../types/questions";

export class CreateQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		authorId,
		content,
		title,
		attachmentsIds,
	}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueID(authorId),
			content,
			title,
		});
		await this.questionsRepository.create(question);

		const questionAttachments = attachmentsIds.map((attachmentId) => {
			return QuestionAttachment.create({
				questionId: question.id,
				attachmentId: new UniqueID(attachmentId),
			});
		});

		question.attachments = new QuestionAttachmentList(questionAttachments);
		return right({ question });
	}
}
