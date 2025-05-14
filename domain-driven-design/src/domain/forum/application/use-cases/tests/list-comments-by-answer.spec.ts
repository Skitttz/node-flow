import { UniqueID } from "@@src/core/entities/unique-id";
import { buildManyItems } from "tests/factories/build-many";
import { InMemoryAnswerCommentsRepository } from "tests/repositories/in-memory-comments-repository";
import { ListCommentsAnswerUseCase } from "../comment/list-comments-answer";

let inMemoryCommentsAnswerRepository: InMemoryAnswerCommentsRepository;
let sut: ListCommentsAnswerUseCase;

describe("List Comments by Answer flow", () => {
	beforeEach(() => {
		inMemoryCommentsAnswerRepository = new InMemoryAnswerCommentsRepository();
		sut = new ListCommentsAnswerUseCase(inMemoryCommentsAnswerRepository);
	});
	it("should be able to show list comments by answer", async () => {
		const newUniqueIDCommentsAnswer = new UniqueID(
			"answer-id-example",
		).toString();
		await buildManyItems({
			repository: inMemoryCommentsAnswerRepository,
			numberofItems: 3,
			answerId: newUniqueIDCommentsAnswer,
		});

		const result = await sut.execute({
			page: 1,
			answerId: newUniqueIDCommentsAnswer,
		});

		expect(result.value?.answerComments).toHaveLength(3);
	});
	it("should be able to show paginated comments by answer", async () => {
		const newUniqueIDCommentsAnswer = new UniqueID(
			"answer-id-2-example",
		).toString();

		await buildManyItems({
			repository: inMemoryCommentsAnswerRepository,
			numberofItems: 24,
			answerId: newUniqueIDCommentsAnswer,
		});

		const result = await sut.execute({
			page: 2,
			answerId: newUniqueIDCommentsAnswer,
		});

		expect(result.value?.answerComments).toHaveLength(4);
	});
});
