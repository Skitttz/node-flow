import { buildManyItems } from "tests/factories/build-many";
import { InMemoryQuestionAttachmentsRepository } from "tests/repositories/in-memory-attachments-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { ListRecentQuestionUseCase } from "../question/list-recent";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: ListRecentQuestionUseCase;

describe("List Recent Questions flow", () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		sut = new ListRecentQuestionUseCase(inMemoryQuestionsRepository);
	});
	it("should be able to show list recent questions", async () => {
		await buildManyItems({
			repository: inMemoryQuestionsRepository,
			numberofItems: 4,
			options: { createdAtStart: new Date(2022, 0, 1) },
		});

		const result = await sut.execute({
			page: 1,
		});

		expect(result.value?.questions).toEqual([
			expect.objectContaining({ createdAt: new Date(2022, 0, 4) }),
			expect.objectContaining({ createdAt: new Date(2022, 0, 3) }),
			expect.objectContaining({ createdAt: new Date(2022, 0, 2) }),
			expect.objectContaining({ createdAt: new Date(2022, 0, 1) }),
		]);
	});
	it("should be able to show paginated recent questions", async () => {
		await buildManyItems({
			repository: inMemoryQuestionsRepository,
			numberofItems: 24,
			options: { createdAtStart: new Date(2022, 0, 1) },
		});

		const result = await sut.execute({
			page: 2,
		});

		expect(result.value?.questions).toHaveLength(4);
	});
});
