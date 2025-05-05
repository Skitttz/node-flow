import type { UniqueID } from "@@core/entities/unique-id";
import type { Slug } from "@@domain/forum/enterprise/entities/valueObject/Slug";

interface QuestionProps {
	authorId: UniqueID;
	bestAnswerId?: UniqueID;
	title: string;
	content: string;
	slug: Slug;
	createdAt: Date;
	updatedAt?: Date;
}

export type { QuestionProps };
