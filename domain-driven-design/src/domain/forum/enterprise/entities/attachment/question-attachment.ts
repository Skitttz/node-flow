import { Entity } from "@@src/core/entities/entity";
import type { UniqueID } from "@@src/core/entities/unique-id";
import type { QuestionAttachmentProps } from "../types/attachment";

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
	get questionId() {
		return this.props.questionId;
	}

	get attachmentId() {
		return this.props.attachmentId;
	}

	static create(props: QuestionAttachmentProps, id?: UniqueID) {
		const questionAttachment = new QuestionAttachment(props, id);

		return questionAttachment;
	}
}
