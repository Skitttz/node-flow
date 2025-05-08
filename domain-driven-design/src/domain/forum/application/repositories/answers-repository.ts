import type { PaginationParams } from "@@src/core/repositories/pagination-params";
import type { Answer } from "../../enterprise/entities/answer";

export interface AnswersRepository {
	create(answer: Answer): Promise<void>;
	delete(answer: Answer): Promise<void>;
	edit(answer: Answer): Promise<void>;
	findById(id: string): Promise<Answer | null>;
	findManyByQuestion(
		questionId: string,
		params: PaginationParams,
	): Promise<Answer[]>;
}
