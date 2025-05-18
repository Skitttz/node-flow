import { left, right } from "@@src/core/either";
import { UniqueID } from "@@src/core/entities/unique-id";
import { NotFoundError } from "@@src/core/errors/not-found";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import { AnswerAttachment } from "@@src/domain/forum/enterprise/entities/attachment/answer-attachment";
import { AnswerAttachmentList } from "@@src/domain/forum/enterprise/entities/attachment/answer-attachment-list";
import type { AnswersRepository } from "../../repositories/answers-repository";
import type { AnswerAttachmentRepository } from "../../repositories/attachments-repository";
import type {
	EditAnswerUseCaseRequest,
	EditAnswerUseCaseResponse,
} from "../../types/answers";

export class EditAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private answerAttachmentsRepository: AnswerAttachmentRepository,
	) {}

	async execute({
		authorId,
		answerId,
		content,
		attachemntsIds,
	}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new NotFoundError());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new UnauthorizedError());
		}

		const currentAnswerAttachments =
			await this.answerAttachmentsRepository.findManyByAnswer(answerId);

		const answerAttachmentList = new AnswerAttachmentList(
			currentAnswerAttachments,
		);

		const newAnswerAttachmentList = attachemntsIds.map((attachmentIds) => {
			return AnswerAttachment.create({
				answerId: answer.id,
				attachmentId: new UniqueID(attachmentIds),
			});
		});

		answerAttachmentList.update(newAnswerAttachmentList);

		answer.content = content;
		answer.attachments = answerAttachmentList;

		await this.answersRepository.edit(answer);

		return right({ answer });
	}
}
