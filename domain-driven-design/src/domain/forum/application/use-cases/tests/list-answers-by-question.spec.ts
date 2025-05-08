import { createManyItems } from "tests/factories/build-many";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { ListRecentQuestionUseCase } from "../question/list-recent";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ListRecentQuestionUseCase;

describe("List Recent Questions flow", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new ListRecentQuestionUseCase(inMemoryQuestionsRepository);
	});
	it("should be able to show list recent questions", async () => {
		await createManyItems({
			repository: inMemoryQuestionsRepository,
			numberofItems: 4,
			options: { createdAtStart: new Date(2022, 0, 1) },
		});

		const { questions } = await sut.execute({
			page: 1,
		});

		expect(questions).toEqual([
			expect.objectContaining({ createdAt: new Date(2022, 0, 4) }),
			expect.objectContaining({ createdAt: new Date(2022, 0, 3) }),
			expect.objectContaining({ createdAt: new Date(2022, 0, 2) }),
			expect.objectContaining({ createdAt: new Date(2022, 0, 1) }),
		]);
	});
	it("should be able to show paginated recent questions", async () => {
		await createManyItems({
			repository: inMemoryQuestionsRepository,
			numberofItems: 24,
			options: { createdAtStart: new Date(2022, 0, 1) },
		});

		const { questions } = await sut.execute({
			page: 2,
		});

		expect(questions).toHaveLength(4);
	});
});
