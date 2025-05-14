import type { Either } from "@@src/core/either";
import type { NotFoundError } from "@@src/core/errors/not-found";
import type { UnauthorizedError } from "@@src/core/errors/unauthorized";
import type { Answer } from "../../enterprise/entities/answer";
import type { Question } from "../../enterprise/entities/question";

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;

interface DeleteAnswerUseCaseRequest {
	answerId: string;
	authorId: string;
}

type DeleteAnswerUseCaseResponse = Either<
	UnauthorizedError | NotFoundError,
	{}
>;

interface EditAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

type EditAnswerUseCaseResponse = Either<
	NotFoundError | UnauthorizedError,
	{ answer: Answer }
>;

interface ChooseBestAnswerUseCaseRequest {
	answerId: string;
	authorId: string;
}

type ChooseBestAnswerUseCaseResponse = Either<
	NotFoundError | UnauthorizedError,
	{ question: Question }
>;

interface ListAnswersUseCaseRequest {
	page: number;
	questionId: string;
}

type ListAnswersUseCaseResponse = Either<
	null,
	{
		answers: Answer[];
	}
>;

export type {
	AnswerQuestionUseCaseRequest,
	AnswerQuestionUseCaseResponse,
	ChooseBestAnswerUseCaseRequest,
	ChooseBestAnswerUseCaseResponse,
	DeleteAnswerUseCaseRequest,
	DeleteAnswerUseCaseResponse,
	EditAnswerUseCaseRequest,
	EditAnswerUseCaseResponse,
	ListAnswersUseCaseRequest,
	ListAnswersUseCaseResponse,
};
