import type { Question } from "@@domain/forum/enterprise/entities/question";
import type { PaginationParams } from "@@src/core/repositories/pagination-params";

export interface QuestionsRepository {
	create(question: Question): Promise<void>;
	delete(question: Question): Promise<void>;
	edit(question: Question): Promise<void>;
	findById(id: string): Promise<Question | null>;
	findBySlug(slug: string): Promise<Question | null>;
	findManyRecent(params: PaginationParams): Promise<Question[]>;
}
