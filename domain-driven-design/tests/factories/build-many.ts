import { UniqueID } from "@@src/core/entities/unique-id";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import {
	InMemoryAnswerCommentsRepository,
	InMemoryQuestionCommentsRepository,
} from "tests/repositories/in-memory-comments-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { buildAnswer } from "./build-answer";
import { buildComment } from "./build-comment";
import { buildQuestion } from "./build-question";

type RepositoryBuildType =
	| InMemoryQuestionsRepository
	| InMemoryAnswersRepository
	| InMemoryAnswerCommentsRepository
	| InMemoryQuestionCommentsRepository;

interface buildManyItemsProps {
	repository: RepositoryBuildType;
	numberofItems: number;
	options?: { createdAtStart?: Date };
	questionId?: string;
	answerId?: string;
	authorId?: string;
}

type BuildOptions = {
	createdAt?: Date;
	questionId?: string;
	answerId?: string;
	authorId?: string;
};

function createQuestion(options: BuildOptions) {
	const { createdAt, authorId } = options;
	const hasCustomOptions = !!createdAt;
	const hasAuthorId = !!authorId;

	if (hasCustomOptions || hasAuthorId) {
		return buildQuestion({
			...(hasCustomOptions && { createdAt }),
			...(hasAuthorId && { authorId: new UniqueID(authorId) }),
		});
	}

	return buildQuestion();
}

function createAnswer(options: BuildOptions) {
	const { createdAt, questionId, authorId } = options;
	const hasCustomOptions = !!createdAt;
	const hasQuestionId = !!questionId;
	const hasAuthorId = !!authorId;

	if (hasCustomOptions || hasQuestionId || hasAuthorId) {
		return buildAnswer({
			...(hasQuestionId && { questionId: new UniqueID(questionId) }),
			...(hasCustomOptions && { createdAt }),
			...(hasAuthorId && { authorId: new UniqueID(authorId) }),
		});
	}

	return buildAnswer();
}

function createQuestionComment(options: BuildOptions) {
	const { createdAt, questionId, authorId } = options;

	return buildComment({
		type: "Question",
		overide: {
			...(questionId && { questionId: new UniqueID(questionId) }),
			...(createdAt && { createdAt }),
			...(authorId && { authorId: new UniqueID(authorId) }),
		},
	});
}

function createAnswerComment(options: BuildOptions) {
	const { createdAt, answerId, authorId } = options;

	return buildComment({
		type: "Answer",
		overide: {
			...(answerId && { answerId: new UniqueID(answerId) }),
			...(createdAt && { createdAt }),
			...(authorId && { authorId: new UniqueID(authorId) }),
		},
	});
}

export async function buildManyItems({
	repository,
	numberofItems,
	options,
	questionId,
	answerId,
	authorId,
}: buildManyItemsProps) {
	const start = options?.createdAtStart ?? new Date("2022-01-01");

	for (let i = 0; i < numberofItems; i++) {
		const createdAt = new Date(start);
		createdAt.setDate(createdAt.getDate() + i);

		const buildOptions: BuildOptions = {
			createdAt,
			questionId,
			answerId,
			authorId,
		};

		if (repository instanceof InMemoryQuestionsRepository) {
			await repository.create(createQuestion(buildOptions));
		} else if (repository instanceof InMemoryAnswersRepository) {
			await repository.create(createAnswer(buildOptions));
		} else if (repository instanceof InMemoryQuestionCommentsRepository) {
			await repository.create(createQuestionComment(buildOptions));
		} else if (repository instanceof InMemoryAnswerCommentsRepository) {
			await repository.create(createAnswerComment(buildOptions));
		}
	}
}
