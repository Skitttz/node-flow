import { DomainEvents } from "@@src/core/events/domain-events";
import type { PaginationParams } from "@@src/core/repositories/pagination-params";
import type { QuestionAttachmentRepository } from "@@src/domain/forum/application/repositories/attachments-repository";
import type { Question } from "@@src/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repository";

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public items: Question[] = [];
	constructor(
		private questionAttachmentsRepository: QuestionAttachmentRepository,
	) {}
	async create(question: Question) {
		this.items.push(question);
		DomainEvents.dispatchEventsForAggregate(question.id);
	}

	async findBySlug(slug: string): Promise<Question | null> {
		const question = this.items.find(
			(question) => question.slug.value === slug,
		);

		if (!question) return null;

		return question;
	}

	async findById(id: string) {
		const question = this.items.find(
			(question) => question.id.toString() === id,
		);
		if (!question) return null;
		return question;
	}

	async delete(question: Question) {
		const questionIndex = this.items.findIndex(
			(item) => item.id !== question.id,
		);

		this.items.splice(questionIndex, 1);
		this.questionAttachmentsRepository.deleteManyByQuestion(
			question.id.toString(),
		);
	}

	async edit(question: Question) {
		const itemIndex = this.items.findIndex((item) => item.id === question.id);
		this.items[itemIndex] = question;

		DomainEvents.dispatchEventsForAggregate(question.id);
	}

	async findManyRecent({ page }: PaginationParams) {
		const questions = this.items
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			.slice((page - 1) * 20, page * 20);
		return questions;
	}
}
