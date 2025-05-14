import { UniqueID } from "@@src/core/entities/unique-id";
import { buildManyItems } from "tests/factories/build-many";
import { InMemoryQuestionCommentsRepository } from "tests/repositories/in-memory-comments-repository";
import { ListCommentsQuestionUseCase } from "../comment/list-comments-question";

let inMemoryCommentsQuestionRepository: InMemoryQuestionCommentsRepository;
let sut: ListCommentsQuestionUseCase;

describe("List Comments by Question flow", () => {
	beforeEach(() => {
		inMemoryCommentsQuestionRepository =
			new InMemoryQuestionCommentsRepository();
		sut = new ListCommentsQuestionUseCase(inMemoryCommentsQuestionRepository);
	});
	it("should be able to show list comments by question", async () => {
		const newUniqueIDCommentsQuestion = new UniqueID(
			"question-id-example",
		).toString();
		await buildManyItems({
			repository: inMemoryCommentsQuestionRepository,
			numberofItems: 3,
			questionId: newUniqueIDCommentsQuestion,
		});

		const result = await sut.execute({
			page: 1,
			questionId: newUniqueIDCommentsQuestion,
		});

		expect(result.value?.questionComments).toHaveLength(3);
	});
	it("should be able to show paginated comments by question", async () => {
		const newUniqueIDCommentsQuestion = new UniqueID(
			"question-id-2-example",
		).toString();

		await buildManyItems({
			repository: inMemoryCommentsQuestionRepository,
			numberofItems: 24,
			questionId: newUniqueIDCommentsQuestion,
		});

		const result = await sut.execute({
			page: 2,
			questionId: newUniqueIDCommentsQuestion,
		});

		expect(result.value?.questionComments).toHaveLength(4);
	});
});
