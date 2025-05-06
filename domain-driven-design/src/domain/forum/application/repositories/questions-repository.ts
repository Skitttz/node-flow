import type { Question } from "@@domain/forum/enterprise/entities/question";

export interface QuestionsRepository {
	create(questions: Question): Promise<void>;
	delete(question: Question): Promise<void>
	findById(id:string): Promise<Question | null>
	findBySlug(slug:string): Promise<Question | null>
}
