import type { UniqueID } from "@@core/entities/unique-id";
import type { Slug } from "@@domain/forum/enterprise/entities/valueObject/Slug";
import type { QuestionAttachmentList } from "../attachment/question-attachment-list";

interface QuestionProps {
	authorId: UniqueID;
	bestAnswerId?: UniqueID;
	title: string;
	content: string;
	slug: Slug;
	createdAt: Date;
	attachments: QuestionAttachmentList;
	updatedAt?: Date;
}

export type { QuestionProps };
