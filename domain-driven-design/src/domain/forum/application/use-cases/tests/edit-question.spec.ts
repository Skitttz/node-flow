import { UniqueID } from "@@src/core/entities/unique-id";
import { NotFoundError } from "@@src/core/errors/not-found";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import { buildAttachment } from "tests/factories/build-attachment";
import { buildQuestion } from "tests/factories/build-question";
import { InMemoryQuestionAttachmentsRepository } from "tests/repositories/in-memory-attachments-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "../question/edit";

describe("Edit Question flow", () => {
	let questionsRepository: InMemoryQuestionsRepository;
	let questionAttachments: InMemoryQuestionAttachmentsRepository;
	let sut: EditQuestionUseCase;

	const AUTHOR_ID = "example-author";
	const QUESTION_ID = "question-example";
	const OTHER_AUTHOR_ID = "example-author-other";

	beforeEach(() => {
		questionAttachments = new InMemoryQuestionAttachmentsRepository();
		questionsRepository = new InMemoryQuestionsRepository(questionAttachments);
		sut = new EditQuestionUseCase(questionsRepository, questionAttachments);
	});

	it("should be able to edit a question when the author is the same", async () => {
		const newQuestion = buildQuestion(
			{ authorId: new UniqueID(AUTHOR_ID) },
			new UniqueID(QUESTION_ID),
		);
		await questionsRepository.create(newQuestion);

		const editQuestionData = {
			title: "Question Title Edited",
			content: "Content example updated",
		};

		questionAttachments.items.push(
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
			questionId: newQuestion.id.toValue(),
			authorId: AUTHOR_ID,
			attachmentsIds: ["question-attachment-1", "question-attachment-3"],
			...editQuestionData,
		});

		expect(questionsRepository.items[0]).toMatchObject({
			title: editQuestionData.title,
			content: editQuestionData.content,
		});

		expect(questionsRepository.items[0].attachments.currentItems).toHaveLength(
			2,
		);
		expect(questionsRepository.items[0].attachments.currentItems).toEqual([
			expect.objectContaining({
				attachmentId: new UniqueID("question-attachment-1"),
			}),
			expect.objectContaining({
				attachmentId: new UniqueID("question-attachment-3"),
			}),
		]);
	});

	it("should not allow editing a question from another author", async () => {
		const newQuestion = buildQuestion(
			{ authorId: new UniqueID(AUTHOR_ID) },
			new UniqueID(QUESTION_ID),
		);

		await questionsRepository.create(newQuestion);

		const editQuestionData = {
			title: "Question Title Edited",
			content: "Content example updated",
		};

		const result = await sut.execute({
			questionId: newQuestion.id.toValue(),
			authorId: OTHER_AUTHOR_ID,
			attachmentsIds: [],
			...editQuestionData,
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(UnauthorizedError);
	});

	it("should throw when trying to edit a non-existent question", async () => {
		const result = await sut.execute({
			questionId: "non-existent-question",
			authorId: AUTHOR_ID,
			title: "New Title",
			content: "New Content",
			attachmentsIds: [],
		});
		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotFoundError);
	});
});
