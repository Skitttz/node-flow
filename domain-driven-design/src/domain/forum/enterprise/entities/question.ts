import type { UniqueID } from "@@core/entities/unique-id";
import type { Optional } from "@@core/types/optional";
import { AggregateRoot } from "@@src/core/entities/aggregate-root";
import dayjs from "dayjs";
import { QuestionAttachmentList } from "./attachment/question-attachment-list";
import type { QuestionProps } from "./types/question";
import { Slug } from "./valueObject/Slug";

export class Question extends AggregateRoot<QuestionProps> {
	get authorId() {
		return this.props.authorId;
	}

	get bestAnswerId() {
		return this.props.bestAnswerId;
	}

	get title() {
		return this.props.title;
	}

	get content() {
		return this.props.content;
	}

	get slug() {
		return this.props.slug;
	}

	get attachments() {
		return this.props.attachments;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get isNew(): boolean {
		return dayjs().diff(this.createdAt, "days") <= 3;
	}

	get excerpt() {
		return this.content.substring(0, 120).trimEnd().concat("...");
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	set title(title: string) {
		this.props.title = title;
		this.props.slug = Slug.createFromText(title);

		this.touch();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	set bestAnswerId(bestAnswerId: UniqueID | undefined) {
		this.props.bestAnswerId = bestAnswerId;
		this.touch();
	}

	set attachments(attachments: QuestionAttachmentList) {
		this.props.attachments = attachments;
		this.touch();
	}

	static create(
		props: Optional<QuestionProps, "createdAt" | "slug" | "attachments">,
		id?: UniqueID,
	) {
		const question = new Question(
			{
				...props,
				slug: props.slug ?? Slug.createFromText(props.title),
				createdAt: props.createdAt ?? new Date(),
				attachments: props.attachments ?? new QuestionAttachmentList(),
			},
			id,
		);

		return question;
	}
}
