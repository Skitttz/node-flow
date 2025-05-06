import type { Question } from "@@src/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repository";

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public items: Question[] = [];

	async create(question: Question) {
		this.items.push(question);
	}

	async findBySlug(slug: string): Promise<Question | null> {
		const question = this.items.find((question) => question.slug.value === slug)

		if(!question) throw new Error("Question not found");

		return question;
	}

	async findById(id: string){
		const question = this.items.find((question) => question.id.toString() === id);
		if(!question) throw new Error("Question not found");
		return question;
 	}

	async delete(question: Question) {
		const questionIndex = this.items.findIndex((item) => item.id !== question.id);

		this.items.splice(questionIndex,1)
	}
}
