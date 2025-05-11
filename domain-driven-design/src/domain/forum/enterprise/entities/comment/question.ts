import type { UniqueID } from "@@src/core/entities/unique-id";
import type { Optional } from "@@src/core/types/optional";
import type { QuestionCommentProps } from "../types/comment";
import { Comment } from "./default";

export class QuestionComment extends Comment<QuestionCommentProps> {
	get questionId() {
		return this.props.questionId;
	}

	static create(
		props: Optional<QuestionCommentProps, "createdAt">,
		id?: UniqueID,
	) {
		const questioncomment = new QuestionComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return questioncomment;
	}
}
