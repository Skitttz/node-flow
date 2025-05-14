import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "../answer/create";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer Question Flow", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});
	it("should be create answer question", async () => {
		const { isRight, value } = await sut.execute({
			instructorId: "1",
			questionId: "2",
			content: "content answer",
		});
		expect(isRight()).toBe(true);
		expect(inMemoryAnswersRepository.items[0]).toEqual(value?.answer);
	});
});
