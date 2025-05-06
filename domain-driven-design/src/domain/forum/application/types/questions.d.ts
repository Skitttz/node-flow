import type { Question } from "../../enterprise/entities/question";

interface CreateQuestionUseCaseRequest {
	authorId: string;
	title: string;
	content: string;
}

interface CreateQuestionUseCaseResponse {
	question: Question;
}

interface GetQuestionBySlugUseCaseRequest {
	slug: string;
}
interface GetQuestionBySlugUseCaseResponse {
	question: Question;
}

interface DeleteQuestionUseCaseRequest {
	questionId: string;
	authorId: string;
}

export type {
	CreateQuestionUseCaseRequest,
	CreateQuestionUseCaseResponse, DeleteQuestionUseCaseRequest, GetQuestionBySlugUseCaseRequest,
	GetQuestionBySlugUseCaseResponse
};

