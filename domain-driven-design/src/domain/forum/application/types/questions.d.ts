import type { Either } from "@@src/core/either";
import type { NotFoundError } from "@@src/core/errors/not-found";
import type { UnauthorizedError } from "@@src/core/errors/unauthorized";
import type { Question } from "../../enterprise/entities/question";

interface CreateQuestionUseCaseRequest {
	authorId: string;
	title: string;
	content: string;
	attachmentsIds: string[];
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;

interface GetQuestionBySlugUseCaseRequest {
	slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<
	NotFoundError,
	{ question: Question }
>;

interface DeleteQuestionUseCaseRequest {
	questionId: string;
	authorId: string;
}

type DeleteQuestionUseCaseResponse = Either<
	NotFoundError | UnauthorizedError,
	{}
>;

interface EditQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
	attachmentsIds: string[];
}

type EditQuestionUseCaseResponse = Either<
	NotFoundError | UnauthorizedError,
	{ question: Question }
>;

interface ListRecentQuestionsUseCaseRequest {
	page: number;
}

type ListRecentQuestionsUseCaseResponse = Either<
	null,
	{
		questions: Question[];
	}
>;

export type {
	CreateQuestionUseCaseRequest,
	CreateQuestionUseCaseResponse,
	DeleteQuestionUseCaseRequest,
	DeleteQuestionUseCaseResponse,
	EditQuestionUseCaseRequest,
	EditQuestionUseCaseResponse,
	GetQuestionBySlugUseCaseRequest,
	GetQuestionBySlugUseCaseResponse,
	ListRecentQuestionsUseCaseRequest,
	ListRecentQuestionsUseCaseResponse,
};
