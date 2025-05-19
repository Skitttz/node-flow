import { AggregateRoot } from "@@src/core/entities/aggregate-root";
import type { UniqueID } from "@@src/core/entities/unique-id";
import type { Optional } from "@@src/core/types/optional";
import { AnswerCreatedEvent } from "../events/answer-created-event";
import { AnswerAttachmentList } from "./attachment/answer-attachment-list";
import type { AnswerProps } from "./types/answer";

export class Answer extends AggregateRoot<AnswerProps> {
	get authorId() {
		return this.props.authorId;
	}

	get questionId() {
		return this.props.questionId;
	}

	get content() {
		return this.props.content;
	}

	get attachments() {
		return this.props.attachments;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get excerpt() {
		return this.content.substring(0, 120).trimEnd().concat("...");
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	set attachments(attachments: AnswerAttachmentList) {
		this.props.attachments = attachments;
		this.touch();
	}

	static create(
		props: Optional<AnswerProps, "createdAt" | "attachments">,
		id?: UniqueID,
	) {
		const answer = new Answer(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				attachments: props.attachments ?? new AnswerAttachmentList(),
			},
			id,
		);

		const isNewAnswer = !id;

		if (isNewAnswer) {
			answer.addDomainEvent(new AnswerCreatedEvent(answer));
		}

		return answer;
	}
}
