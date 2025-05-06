import type { AnswersRepository } from "@@src/domain/forum/application/repositories/answer-questions-repository";
import type { Answer } from "@@src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = [];

	async create(answer: Answer) {
		this.items.push(answer);
	}
}
