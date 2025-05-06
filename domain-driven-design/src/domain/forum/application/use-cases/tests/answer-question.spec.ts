import { InMemoryAnswersRepository } from "tests/repositories/in-memory-questions-answer";
import { AnswerQuestionUseCase } from "../questions/answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer Question Flow", () => {
	beforeEach(() => {  
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});
	it("should be create answer question", async () => {
		const { answer } = await sut.execute({
      instructorId: "1",
      questionId: "2",
			content: "content answer",
		});

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
	});
});
