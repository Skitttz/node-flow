import { UniqueID } from "@@src/core/entities/unique-id";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import { buildAnswer } from "tests/factories/build-answer";
import { buildQuestion } from "tests/factories/build-question";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { ChooseBestAnswerUseCase } from "../answer/choose-best";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseBestAnswerUseCase;

describe("Choose Question Best Answer flow", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new ChooseBestAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryQuestionsRepository,
		);
	});
	it("should be able to choose question best answer", async () => {
		const newQuestion = buildQuestion();

		const newAnswer = buildAnswer({
			questionId: newQuestion.id,
		});

		inMemoryQuestionsRepository.create(newQuestion);
		inMemoryAnswersRepository.create(newAnswer);

		await sut.execute({
			answerId: newAnswer.id.toString(),
			authorId: newQuestion.authorId.toString(),
		});

		expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
			newAnswer.id,
		);
	});

	it("should be able to choose question best answer", async () => {
		const newQuestion = buildQuestion({
			authorId: new UniqueID("example-author"),
		});

		const newAnswer = buildAnswer({
			questionId: newQuestion.id,
		});

		inMemoryQuestionsRepository.create(newQuestion);
		inMemoryAnswersRepository.create(newAnswer);
		const result = await sut.execute({
			answerId: newAnswer.id.toString(),
			authorId: "example-other-author",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(UnauthorizedError);
	});
});
