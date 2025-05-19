import { DomainEvents } from "@@src/core/events/domain-events";
import type { PaginationParams } from "@@src/core/repositories/pagination-params";
import type { AnswersRepository } from "@@src/domain/forum/application/repositories/answers-repository";
import type { Answer } from "@@src/domain/forum/enterprise/entities/answer";
import type { InMemoryAnswerAttachmentsRepository } from "./in-memory-attachments-repository";

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = [];

	constructor(private answerAttachments: InMemoryAnswerAttachmentsRepository) {}

	async create(answer: Answer) {
		this.items.push(answer);

		DomainEvents.dispatchEventsForAggregate(answer.id);
	}

	async findById(id: string) {
		const answer = this.items.find((item) => item.id.toString() === id);

		if (!answer) {
			throw new Error("Answer not found");
		}

		return answer;
	}

	async delete(answer: Answer) {
		const anwserIndex = this.items.findIndex((item) => item.id !== answer.id);

		this.items.splice(anwserIndex, 1);
		this.answerAttachments.deleteManyByAnswer(answer.id.toString());
	}

	async edit(answer: Answer) {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);
		this.items[itemIndex] = answer;

		DomainEvents.dispatchEventsForAggregate(answer.id);
	}

	async findManyByQuestion(questionId: string, { page }: PaginationParams) {
		const questions = this.items
			.filter((item) => item.questionId.toString() === questionId)
			.slice((page - 1) * 20, page * 20);
		return questions;
	}
}
