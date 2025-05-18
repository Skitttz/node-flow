import { UniqueID } from "@@src/core/entities/unique-id";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import { buildQuestion } from "tests/factories/build-question";

import { buildAttachment } from "tests/factories/build-attachment";
import { InMemoryQuestionAttachmentsRepository } from "tests/repositories/in-memory-attachments-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "../question/delete";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question flow", () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
	});
	it("should be able to delete question", async () => {
		const newQuestion = buildQuestion(
			{ authorId: new UniqueID("example-author") },
			new UniqueID("example-question"),
		);

		inMemoryQuestionsRepository.create(newQuestion);

		inMemoryQuestionAttachmentsRepository.items.push(
			buildAttachment({
				type: "Question",
				overide: {
					questionId: newQuestion.id,
					attachmentId: new UniqueID("question-attachment-1"),
				},
			}),
			buildAttachment({
				type: "Question",
				overide: {
					questionId: newQuestion.id,
					attachmentId: new UniqueID("question-attachment-2"),
				},
			}),
		);

		await sut.execute({
			questionId: "example-question",
			authorId: "example-author",
		});

		expect(inMemoryQuestionsRepository.items).toHaveLength(0);
		expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0);
	});

	it("should not allowed to delete question from other author", async () => {
		const newQuestion = buildQuestion(
			{ authorId: new UniqueID("example-author") },
			new UniqueID("example-question"),
		);

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			questionId: "example-question",
			authorId: "example-author-diff",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(UnauthorizedError);
	});
});
