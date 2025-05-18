import type { UniqueID } from "@@src/core/entities/unique-id";

interface AttachmentProps {
	title: string;
	link: string;
}

interface QuestionAttachmentProps {
	questionId: UniqueID;
	attachmentId: UniqueID;
}

interface AnswerAttachmentProps {
	answerId: UniqueID;
	attachmentId: UniqueID;
}

export type { AnswerAttachmentProps, AttachmentProps, QuestionAttachmentProps };
