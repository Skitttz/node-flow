import { UniqueID } from "@@src/core/entities/unique-id";
import { buildAnswer } from "tests/factories/build-answer";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "../answer/delete";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Question flow", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
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

		await sut.execute({
			answerId: "example-answer",
			authorId: "example-author",
		});

		expect(InMemoryAnswersRepository).toHaveLength(0);
	});

	it("should not allowed to delete question from other author", async () => {
		const newQuestion = buildAnswer(
			{ authorId: new UniqueID("example-author") },
			new UniqueID("example-answer"),
		);

		await inMemoryAnswersRepository.create(newQuestion);

		const result = await sut.execute({
			answerId: "example-answer",
			authorId: "example-author-diff",
		});

		expect(result.isLeft()).toBe(true);
	});
});
