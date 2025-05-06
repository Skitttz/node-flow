import { UniqueID } from "@@src/core/entities/unique-id";
import { Question } from "@@src/domain/forum/enterprise/entities/question";
import type { QuestionProps } from "@@src/domain/forum/enterprise/entities/types/question";
import { faker } from "@faker-js/faker";

export function buildQuestion(overide: Partial<QuestionProps> = {}, id?: UniqueID) {
	const question = Question.create({
		authorId: new UniqueID(),
		title: faker.lorem.sentence(),
		content: faker.lorem.text(),
    ...overide
	}, id);

	return question;
}
