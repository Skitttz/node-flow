import type { Either } from "@@src/core/either";
import type { NotFoundError } from "@@src/core/errors/not-found";
import type { UnauthorizedError } from "@@src/core/errors/unauthorized";
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

type CommentAnswerUseCaseResponse = Either<
	NotFoundError | UnauthorizedError,
	{ answerComment: AnswerComment }
>;

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

type ListCommentsAnswerUseCaseResponse = Either<
	null,
	{ answerComments: AnswerComment[] }
>;

interface ListCommentsQuestionUseCaseRequest {
	page: number;
	questionId: string;
}

type ListCommentsQuestionUseCaseResponse = Either<
	null,
	{ questionComments: QuestionComment[] }
>;

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
