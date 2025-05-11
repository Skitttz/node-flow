import type { UniqueID } from "@@src/core/entities/unique-id";
import type { Optional } from "@@src/core/types/optional";
import type { AnswerCommentProps } from "../types/comment";
import { Comment } from "./default";

export class AnswerComment extends Comment<AnswerCommentProps> {
	get answerId() {
		return this.props.answerId;
	}

	static create(
		props: Optional<AnswerCommentProps, "createdAt">,
		id?: UniqueID,
	) {
		const answerComment = new AnswerComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return answerComment;
	}
}
