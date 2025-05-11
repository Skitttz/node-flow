import type { AnswerComment } from "../../enterprise/entities/comment/answer";
import type { QuestionComment } from "../../enterprise/entities/comment/question";

interface CommentQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
	content: string;
}

interface CommentQuestionUseCaseResponse {
	questionComment: QuestionComment;
}

interface CommentAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

interface CommentAnswerUseCaseResponse {
	answerComment: AnswerComment;
}

interface DeleteCommentQuestionUseCaseRequest {
	authorId: string;
	questionCommentId: string;
}

interface DeleteCommentAnswerUseCaseRequest {
	authorId: string;
	answerCommentId: string;
}

interface ListCommentsAnswerUseCaseRequest {
	page: number;
	answerId: string;
}

interface ListCommentsAnswerUseCaseResponse {
	answerComments: AnswerComment[];
}

interface ListCommentsQuestionUseCaseRequest {
	page: number;
	questionId: string;
}

interface ListCommentsQuestionUseCaseResponse {
	questionComments: QuestionComment[];
}

export type {
	CommentAnswerUseCaseRequest,
	CommentAnswerUseCaseResponse,
	CommentQuestionUseCaseRequest,
	CommentQuestionUseCaseResponse,
	DeleteCommentAnswerUseCaseRequest,
	DeleteCommentQuestionUseCaseRequest,
	ListCommentsAnswerUseCaseRequest,
	ListCommentsAnswerUseCaseResponse,
	ListCommentsQuestionUseCaseRequest,
	ListCommentsQuestionUseCaseResponse,
};
