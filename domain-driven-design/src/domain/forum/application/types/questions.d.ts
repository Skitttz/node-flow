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

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseResponse {
  question: Question;
}

interface ListRecentQuestionsUseCaseRequest{
  page:number
}

interface ListRecentQuestionsUseCaseResponse{
  questions: Question[];
}

export type {
  CreateQuestionUseCaseRequest, CreateQuestionUseCaseResponse,
  DeleteQuestionUseCaseRequest,
  EditQuestionUseCaseRequest, EditQuestionUseCaseResponse,
  GetQuestionBySlugUseCaseRequest, GetQuestionBySlugUseCaseResponse,
  ListRecentQuestionsUseCaseRequest, ListRecentQuestionsUseCaseResponse
};

