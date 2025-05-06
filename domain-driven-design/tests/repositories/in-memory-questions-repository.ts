import type { Question } from "@@src/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repository";

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public items: Question[] = [];

	async create(question: Question) {
		this.items.push(question);
	}
}
