import { Entity } from "@@src/core/entities/entity";
import type { UniqueID } from "@@src/core/entities/unique-id";
import type { AnswerAttachmentProps } from "../types/attachment";

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
	get answerId() {
		return this.props.answerId;
	}

	get attachmentId() {
		return this.props.attachmentId;
	}

	static create(props: AnswerAttachmentProps, id?: UniqueID) {
		const answerAttachment = new AnswerAttachment(props, id);
		return answerAttachment;
	}
}
