import type { Question } from "@@domain/forum/enterprise/entities/question";

export interface QuestionsRepository {
	create(questions: Question): Promise<void>;
}
