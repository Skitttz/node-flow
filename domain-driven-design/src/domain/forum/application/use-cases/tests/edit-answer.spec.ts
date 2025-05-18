import { UniqueID } from "@@src/core/entities/unique-id";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import { buildAnswer } from "tests/factories/build-answer";
import { buildAttachment } from "tests/factories/build-attachment";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "tests/repositories/in-memory-attachments-repository";
import { EditAnswerUseCase } from "../answer/edit";

describe("Edit Answer flow", () => {
	let answersRepository: InMemoryAnswersRepository;
	let answersAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
	let sut: EditAnswerUseCase;

	const AUTHOR_ID = "example-author";
	const QUESTION_ID = "answer-example";
	const OTHER_AUTHOR_ID = "example-author-other";

	beforeEach(() => {
		answersAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
		answersRepository = new InMemoryAnswersRepository(
			answersAttachmentsRepository,
		);
		sut = new EditAnswerUseCase(
			answersRepository,
			answersAttachmentsRepository,
		);
	});

	it("should be able to edit a answer when the author is the same", async () => {
		const newAnswer = buildAnswer(
			{ authorId: new UniqueID(AUTHOR_ID) },
			new UniqueID(QUESTION_ID),
		);
		await answersRepository.create(newAnswer);

		const editAnswerData = {
			content: "Content example updated",
		};

		answersAttachmentsRepository.items.push(
			buildAttachment({
				type: "Answer",
				overide: {
					answerId: newAnswer.id,
					attachmentId: new UniqueID("answer-attachment-1"),
				},
			}),
			buildAttachment({
				type: "Answer",
				overide: {
					answerId: newAnswer.id,
					attachmentId: new UniqueID("answer-attachment-2"),
				},
			}),
		);

		await sut.execute({
			answerId: newAnswer.id.toValue(),
			authorId: AUTHOR_ID,
			attachemntsIds: ["answer-attachment-1", "answer-attachment-3"],
			...editAnswerData,
		});

		expect(answersRepository.items[0]).toMatchObject({
			content: editAnswerData.content,
		});

		expect(answersRepository.items[0].attachments.currentItems).toHaveLength(2);
		expect(answersRepository.items[0].attachments.currentItems).toEqual([
			expect.objectContaining({
				attachmentId: new UniqueID("answer-attachment-1"),
			}),
			expect.objectContaining({
				attachmentId: new UniqueID("answer-attachment-3"),
			}),
		]);
	});

	it("should not allow editing a answer from another author", async () => {
		const newAnswer = buildAnswer(
			{ authorId: new UniqueID(AUTHOR_ID) },
			new UniqueID(QUESTION_ID),
		);
		await answersRepository.create(newAnswer);

		const editAnswerData = {
			content: "Content example updated",
		};

		const result = await sut.execute({
			answerId: newAnswer.id.toValue(),
			authorId: OTHER_AUTHOR_ID,
			attachemntsIds: [],
			...editAnswerData,
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(UnauthorizedError);
	});
});
