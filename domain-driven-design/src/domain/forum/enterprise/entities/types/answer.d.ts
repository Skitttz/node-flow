import type { UniqueID } from "@@core/entities/unique-id";
import type { AnswerAttachmentList } from "../attachment/answer-attachment-list";

interface AnswerProps {
	authorId: UniqueID;
	questionId: UniqueID;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
	attachments: AnswerAttachmentList;
}

export type { AnswerProps };
