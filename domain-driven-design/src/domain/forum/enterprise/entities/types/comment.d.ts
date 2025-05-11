import type { UniqueID } from "@@src/core/entities/unique-id";

interface CommentProps {
	authorId: UniqueID;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
}

interface AnswerCommentProps extends CommentProps {
	answerId: UniqueID;
}

interface QuestionCommentProps extends CommentProps {
	questionId: UniqueID;
}

export type { AnswerCommentProps, CommentProps, QuestionCommentProps };
