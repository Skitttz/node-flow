import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "../question/create";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question Flow", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});
	it("should create new question", async () => {
		const { isRight, value } = await sut.execute({
			authorId: "5",
			title: "New Question",
			content: "Random Content",
		});

		expect(isRight()).toBe(true);
		expect(inMemoryQuestionsRepository.items[0]).toEqual(value?.question);
	});
});
