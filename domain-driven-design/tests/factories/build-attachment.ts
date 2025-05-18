import { UniqueID } from "@@src/core/entities/unique-id";
import { AnswerAttachment } from "@@src/domain/forum/enterprise/entities/attachment/answer-attachment";
import { QuestionAttachment } from "@@src/domain/forum/enterprise/entities/attachment/question-attachment";
import type {
	AnswerAttachmentProps,
	QuestionAttachmentProps,
} from "@@src/domain/forum/enterprise/entities/types/attachment";

type AttachmentTypeMap = {
	Question: {
		props: QuestionAttachmentProps;
		instance: QuestionAttachment;
	};
	Answer: {
		props: AnswerAttachmentProps;
		instance: AnswerAttachment;
	};
};

export function buildAttachment<T extends keyof AttachmentTypeMap>(params: {
	type: T;
	overide?: Partial<AttachmentTypeMap[T]["props"]>;
	id?: UniqueID;
}): AttachmentTypeMap[T]["instance"];

export function buildAttachment<T extends keyof AttachmentTypeMap>(params: {
	type: T;
	overide?: Partial<AttachmentTypeMap[T]["props"]>;
	id?: UniqueID;
}): QuestionAttachment | AnswerAttachment {
	const { type, overide = {}, id } = params;

	if (type === "Question") {
		const questionAttachment = QuestionAttachment.create(
			{
				questionId: new UniqueID(),
				attachmentId: new UniqueID(),
				...(overide as Partial<QuestionAttachmentProps>),
			},
			id,
		);
		return questionAttachment;
	}

	const answerAttachment = AnswerAttachment.create(
		{
			answerId: new UniqueID(),
			attachmentId: new UniqueID(),
			...(overide as Partial<AnswerAttachmentProps>),
		},
		id,
	);
	return answerAttachment;
}
