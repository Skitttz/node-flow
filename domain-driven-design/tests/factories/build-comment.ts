import { UniqueID } from "@@src/core/entities/unique-id";
import { AnswerComment } from "@@src/domain/forum/enterprise/entities/comment/answer";
import { QuestionComment } from "@@src/domain/forum/enterprise/entities/comment/question";
import type {
	AnswerCommentProps,
	QuestionCommentProps,
} from "@@src/domain/forum/enterprise/entities/types/comment";
import { faker } from "@faker-js/faker";

type CommentTypeMap = {
	Question: {
		props: QuestionCommentProps;
		instance: QuestionComment;
	};
	Answer: {
		props: AnswerCommentProps;
		instance: AnswerComment;
	};
};

export function buildComment<T extends keyof CommentTypeMap>(params: {
	type: T;
	overide?: Partial<CommentTypeMap[T]["props"]>;
	id?: UniqueID;
}): CommentTypeMap[T]["instance"];

export function buildComment<T extends keyof CommentTypeMap>(params: {
	type: T;
	overide?: Partial<CommentTypeMap[T]["props"]>;
	id?: UniqueID;
}): QuestionComment | AnswerComment {
	const { type, overide = {}, id } = params;

	if (type === "Question") {
		const questionComment = QuestionComment.create(
			{
				authorId: new UniqueID(),
				questionId: new UniqueID(),
				content: faker.lorem.text(),
				...(overide as Partial<QuestionCommentProps>),
			},
			id,
		);
		return questionComment;
	}

	const answerComment = AnswerComment.create(
		{
			authorId: new UniqueID(),
			answerId: new UniqueID(),
			content: faker.lorem.text(),
			...(overide as Partial<AnswerCommentProps>),
		},
		id,
	);
	return answerComment;
}
