import { UniqueID } from "@@src/core/entities/unique-id";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "tests/repositories/in-memory-attachments-repository";
import { AnswerQuestionUseCase } from "../answer/create";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer Question Flow", () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});
	it("should be create answer question", async () => {
		const { isRight, value } = await sut.execute({
			instructorId: "1",
			questionId: "2",
			content: "content answer",
			attachmentsIds: ["file-name-1", "file-name-2"],
		});

		expect(isRight()).toBe(true);
		expect(inMemoryAnswersRepository.items[0]).toEqual(value?.answer);
		expect(
			inMemoryAnswersRepository.items[0].attachments.currentItems,
		).toHaveLength(2);
		expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
			[
				expect.objectContaining({ attachmentId: new UniqueID("file-name-1") }),
				expect.objectContaining({ attachmentId: new UniqueID("file-name-2") }),
			],
		);
	});
});
