import { UniqueID } from "@@src/core/entities/unique-id";
import { AnswerComment } from "@@src/domain/forum/enterprise/entities/comment/answer";
import { QuestionComment } from "@@src/domain/forum/enterprise/entities/comment/question";
import type {
	AnswerCommentProps,
	QuestionCommentProps,
} from "@@src/domain/forum/enterprise/entities/types/comment";
import { faker } from "@faker-js/faker";

export function buildComment(
	type: "Question" | "Answer",
	overide: Partial<QuestionCommentProps | AnswerCommentProps> = {},
	id?: UniqueID,
) {
	if (type === "Question") {
		const questionComment = QuestionComment.create(
			{
				authorId: new UniqueID(),
				questionId: new UniqueID(),
				content: faker.lorem.text(),
				...overide,
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
			...overide,
		},
		id,
	);

	return answerComment;
}
