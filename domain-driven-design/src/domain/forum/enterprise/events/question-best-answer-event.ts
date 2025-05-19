import type { UniqueID } from "@@src/core/entities/unique-id";
import type { DomainEvent } from "@@src/core/events/domain-event";
import type { Question } from "../entities/question";

export class QuestionBestAnswerEvent implements DomainEvent {
	public ocurredAt: Date;
	public question: Question;
	public bestAnswerId: UniqueID;

	constructor(question: Question, bestAnswerId: UniqueID) {
		this.question = question;
		this.bestAnswerId = bestAnswerId;
		this.ocurredAt = new Date();
	}

	getAggregateId(): UniqueID {
		return this.question.id;
	}
}
