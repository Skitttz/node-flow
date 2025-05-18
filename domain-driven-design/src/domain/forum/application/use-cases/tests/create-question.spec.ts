import { UniqueID } from "@@src/core/entities/unique-id";
import { InMemoryQuestionAttachmentsRepository } from "tests/repositories/in-memory-attachments-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "../question/create";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question Flow", () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});
	it("should create new question", async () => {
		const { isRight, value } = await sut.execute({
			authorId: "5",
			title: "New Question",
			content: "Random Content",
			attachmentsIds: ["file-name-1", "file-name-2"],
		});

		expect(isRight()).toBe(true);
		expect(inMemoryQuestionsRepository.items[0]).toEqual(value?.question);
		expect(
			inMemoryQuestionsRepository.items[0].attachments.currentItems,
		).toHaveLength(2);
		expect(
			inMemoryQuestionsRepository.items[0].attachments.currentItems,
		).toEqual([
			expect.objectContaining({ attachmentId: new UniqueID("file-name-1") }),
			expect.objectContaining({ attachmentId: new UniqueID("file-name-2") }),
		]);
	});
});
