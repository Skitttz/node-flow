import { left, right } from "@@src/core/either";
import { UniqueID } from "@@src/core/entities/unique-id";
import { NotFoundError } from "@@src/core/errors/not-found";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import { QuestionAttachment } from "@@src/domain/forum/enterprise/entities/attachment/question-attachment";
import { QuestionAttachmentList } from "@@src/domain/forum/enterprise/entities/attachment/question-attachment-list";
import type { QuestionAttachmentRepository } from "../../repositories/attachments-repository";
import type { QuestionsRepository } from "../../repositories/questions-repository";
import type {
	EditQuestionUseCaseRequest,
	EditQuestionUseCaseResponse,
} from "../../types/questions";

export class EditQuestionUseCase {
	constructor(
		private questionsRepository: QuestionsRepository,
		private questionAttachmentsRepository: QuestionAttachmentRepository,
	) {}

	async execute({
		authorId,
		questionId,
		content,
		title,
		attachmentsIds,
	}: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			return left(new NotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new UnauthorizedError());
		}

		const currentQuestionAttachments =
			await this.questionAttachmentsRepository.findManyByQuestion(questionId);

		const questionAttachmentList = new QuestionAttachmentList(
			currentQuestionAttachments,
		);

		const newQuestionAttachmentList = attachmentsIds.map((attachmentIds) => {
			return QuestionAttachment.create({
				questionId: question.id,
				attachmentId: new UniqueID(attachmentIds),
			});
		});

		questionAttachmentList.update(newQuestionAttachmentList);

		question.title = title;
		question.content = content;
		question.attachments = questionAttachmentList;

		await this.questionsRepository.edit(question);

		return right({ question });
	}
}
