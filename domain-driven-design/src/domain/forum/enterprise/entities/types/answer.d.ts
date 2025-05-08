import type { UniqueID } from "@@core/entities/unique-id";

interface AnswerProps {
  authorId: UniqueID;
  questionId: UniqueID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type { AnswerProps };
