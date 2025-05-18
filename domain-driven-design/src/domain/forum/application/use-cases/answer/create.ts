import { UniqueID } from "@@core/entities/unique-id";
import { right } from "@@src/core/either";
import { Answer } from "@@src/domain/forum/enterprise/entities/answer";

import { AnswerAttachment } from "@@src/domain/forum/enterprise/entities/attachment/answer-attachment";
import { AnswerAttachmentList } from "@@src/domain/forum/enterprise/entities/attachment/answer-attachment-list";
import type { AnswersRepository } from "../../repositories/answers-repository";
import type {
	AnswerQuestionUseCaseRequest,
	AnswerQuestionUseCaseResponse,
} from "../../types/answers";

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
		attachmentsIds,
	}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			authorId: new UniqueID(instructorId),
			questionId: new UniqueID(questionId),
			content,
		});

		await this.answersRepository.create(answer);

		const newAnswerAttachments = attachmentsIds.map((attachmentId) => {
			return AnswerAttachment.create({
				attachmentId: new UniqueID(attachmentId),
				answerId: answer.id,
			});
		});

		answer.attachments = new AnswerAttachmentList(newAnswerAttachments);

		return right({ answer });
	}
}
