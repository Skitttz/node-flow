import type { Answer } from "../../enterprise/entities/answer";

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

interface AnswerQuestionUseCaseResponse {
	answer: Answer;
}

export type { AnswerQuestionUseCaseRequest, AnswerQuestionUseCaseResponse };
