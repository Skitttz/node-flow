import { UniqueID } from "@@src/core/entities/unique-id";
import { Answer } from "@@src/domain/forum/enterprise/entities/answer";
import type { AnswerProps } from "@@src/domain/forum/enterprise/entities/types/answer";
import { faker } from "@faker-js/faker";

export function buildAnswer(overide: Partial<AnswerProps> = {}, id?: UniqueID) {
	const answer = Answer.create(
		{
			authorId: new UniqueID(),
			questionId: new UniqueID(),
			content: faker.lorem.text(),
			...overide,
		},
		id,
	);

	return answer;
}
