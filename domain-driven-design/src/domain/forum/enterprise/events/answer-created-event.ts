import type { UniqueID } from "@@src/core/entities/unique-id";
import type { DomainEvent } from "@@src/core/events/domain-event";
import type { Answer } from "../entities/answer";

export class AnswerCreatedEvent implements DomainEvent {
	public ocurredAt: Date;
	public answer: Answer;

	constructor(answer: Answer) {
		this.answer = answer;
		this.ocurredAt = new Date();
	}

	getAggregateId(): UniqueID {
		return this.answer.id;
	}
}
