import type { Answer } from "../../enterprise/entities/answer";

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

interface AnswerQuestionUseCaseResponse {
	answer: Answer;
}

interface DeleteAnswerUseCaseRequest {
	answerId: string;
	authorId: string;
}

interface EditAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

interface EditAnswerUseCaseResponse {
	answer: Answer;
}

interface ChooseBestAnswerUseCaseRequest {
	answerId: string;
	authorId: string;
}

interface ChooseBestAnswerUseCaseResponse {
	answer: Answer;
}

interface ListAnswersUseCaseRequest {
	page: number;
	questionId: string;
}

interface ListAnswersUseCaseResponse {
	answers: Answer[];
}

export type {
	AnswerQuestionUseCaseRequest,
	AnswerQuestionUseCaseResponse,
	ChooseBestAnswerUseCaseRequest,
	ChooseBestAnswerUseCaseResponse,
	DeleteAnswerUseCaseRequest,
	EditAnswerUseCaseRequest,
	EditAnswerUseCaseResponse,
	ListAnswersUseCaseRequest,
	ListAnswersUseCaseResponse,
};
