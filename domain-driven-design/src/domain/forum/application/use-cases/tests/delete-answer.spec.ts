import { UniqueID } from "@@src/core/entities/unique-id";
import { buildAnswer } from "tests/factories/build-answer";
import { buildAttachment } from "tests/factories/build-attachment";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "tests/repositories/in-memory-attachments-repository";
import { DeleteAnswerUseCase } from "../answer/delete";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;

let sut: DeleteAnswerUseCase;

describe("Delete Question flow", () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);
		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
	});
	it("should be able to delete Answer", async () => {
		const newAnswer = buildAnswer(
			{
				authorId: new UniqueID("example-author"),
				questionId: new UniqueID("example-question"),
			},
			new UniqueID("example-answer"),
		);

		inMemoryAnswersRepository.create(newAnswer);

		inMemoryAnswerAttachmentsRepository.items.push(
			buildAttachment({
				type: "Answer",
				overide: {
					answerId: newAnswer.id,
					attachmentId: new UniqueID("question-attachment-1"),
				},
			}),
			buildAttachment({
				type: "Answer",
				overide: {
					answerId: newAnswer.id,
					attachmentId: new UniqueID("question-attachment-2"),
				},
			}),
		);

		await sut.execute({
			answerId: "example-answer",
			authorId: "example-author",
		});

		expect(inMemoryAnswersRepository.items).toHaveLength(0);
	});

	it("should not allowed to delete question from other author", async () => {
		const newAnswer = buildAnswer(
			{ authorId: new UniqueID("example-author") },
			new UniqueID("example-answer"),
		);

		await inMemoryAnswersRepository.create(newAnswer);

		const result = await sut.execute({
			answerId: "example-answer",
			authorId: "example-author-diff",
		});

		expect(result.isLeft()).toBe(true);
	});
});
