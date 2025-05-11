import { Entity } from "@@src/core/entities/entity";
import type { CommentProps } from "../types/comment";

export abstract class Comment<
	Props extends CommentProps,
> extends Entity<Props> {
	get authorId() {
		return this.props.authorId;
	}

	get content() {
		return this.props.content;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get excerpt() {
		return this.content.substring(0, 120).trimEnd().concat("...");
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}
}
