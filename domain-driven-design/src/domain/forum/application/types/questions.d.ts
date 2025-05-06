import type { Question } from "../../enterprise/entities/question";

interface CreateQuestionUseCaseRequest {
	authorId: string;
	title: string;
	content: string;
}

interface CreateQuestionUseCaseResponse {
	question: Question;
}

export type { CreateQuestionUseCaseRequest, CreateQuestionUseCaseResponse };
