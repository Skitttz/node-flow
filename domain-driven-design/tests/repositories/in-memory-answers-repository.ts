import type { PaginationParams } from "@@src/core/repositories/pagination-params";
import type { AnswersRepository } from "@@src/domain/forum/application/repositories/answers-repository";
import type { Answer } from "@@src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = [];

	async create(answer: Answer) {
		this.items.push(answer);
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
	}

	async edit(answer: Answer) {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);
		this.items[itemIndex] = answer;
	}

	async findManyByQuestion(questionId: string, { page }: PaginationParams) {
		const questions = this.items
			.filter((item) => item.questionId.toString() === questionId)
			.slice((page - 1) * 20, page * 20);
		return questions;
	}
}
