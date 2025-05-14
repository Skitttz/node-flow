import { UniqueID } from "@@src/core/entities/unique-id";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import { buildAnswer } from "tests/factories/build-answer";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "../answer/edit";

describe("Edit Answer flow", () => {
	let answersRepository: InMemoryAnswersRepository;
	let sut: EditAnswerUseCase;

	const AUTHOR_ID = "example-author";
	const QUESTION_ID = "answer-example";
	const OTHER_AUTHOR_ID = "example-author-other";

	beforeEach(() => {
		answersRepository = new InMemoryAnswersRepository();
		sut = new EditAnswerUseCase(answersRepository);
	});

	it("should be able to edit a answer when the author is the same", async () => {
		const newAnswer = buildAnswer(
			{ authorId: new UniqueID(AUTHOR_ID) },
			new UniqueID(QUESTION_ID),
		);
		await answersRepository.create(newAnswer);

		const editAnswerData = {
			content: "Content example updated",
		};

		await sut.execute({
			answerId: newAnswer.id.toValue(),
			authorId: AUTHOR_ID,
			...editAnswerData,
		});

		expect(answersRepository.items[0]).toMatchObject({
			content: editAnswerData.content,
		});
	});

	it("should not allow editing a answer from another author", async () => {
		const newAnswer = buildAnswer(
			{ authorId: new UniqueID(AUTHOR_ID) },
			new UniqueID(QUESTION_ID),
		);
		await answersRepository.create(newAnswer);

		const editAnswerData = {
			content: "Content example updated",
		};

		const result = await sut.execute({
			answerId: newAnswer.id.toValue(),
			authorId: OTHER_AUTHOR_ID,
			...editAnswerData,
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(UnauthorizedError);
	});
});
