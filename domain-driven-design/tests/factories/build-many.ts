import { UniqueID } from "@@src/core/entities/unique-id";
import type { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { buildAnswer } from "./build-answer";
import { buildQuestion } from "./build-question";

export async function buildManyItems({
	repository,
	numberofItems,
	options,
	questionId,
	authorId,
}: {
	repository: InMemoryQuestionsRepository | InMemoryAnswersRepository;
	numberofItems: number;
	options?: { createdAtStart?: Date };
	questionId?: string;
	authorId?: string;
}) {
	const hasCustomOptions = !!options?.createdAtStart;
	const hasQuestionId = !!questionId;
	const hasAuthorId = !!authorId;

	const start = options?.createdAtStart ?? new Date("2022-01-01");

	for (let i = 0; i < numberofItems; i++) {
		const createdAt = new Date(start);
		createdAt.setDate(createdAt.getDate() + i);

		if (repository instanceof InMemoryQuestionsRepository) {
			await repository.create(
				hasCustomOptions
					? buildQuestion({
							...(hasCustomOptions && { createdAt }),
							...(hasAuthorId && { hasAuthorId }),
						})
					: buildQuestion(),
			);
		} else {
			await repository.create(
				hasCustomOptions || hasQuestionId
					? buildAnswer({
							...(hasQuestionId && { questionId: new UniqueID(questionId) }),
							...(hasCustomOptions && { createdAt }),
							...(hasAuthorId && { hasAuthorId }),
						})
					: buildAnswer(),
			);
		}
	}
}
