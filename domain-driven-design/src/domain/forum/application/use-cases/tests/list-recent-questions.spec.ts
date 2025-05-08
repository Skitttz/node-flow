import { createManyItems } from "tests/factories/build-many";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { ListAnswerUseCase } from "../answer/list";

let answeinMemoryAnswersRepositorys: InMemoryAnswersRepository;
let sut: ListAnswerUseCase;

describe("List Answers by Question Flow", () => {
	beforeEach(() => {
		answeinMemoryAnswersRepositorys = new InMemoryAnswersRepository();
		sut = new ListAnswerUseCase(answeinMemoryAnswersRepositorys);
	});
	it("should be able to show list answers", async () => {
		await createManyItems({
			repository: answeinMemoryAnswersRepositorys,
			numberofItems: 8,
			questionId: "example-question",
		});

		const { answers } = await sut.execute({
			page: 1,
			questionId: "example-question",
		});

		expect(answers).toHaveLength(8);
	});
	it("should be able to show paginated answers", async () => {
		await createManyItems({
			repository: answeinMemoryAnswersRepositorys,
			numberofItems: 24,
			questionId: "example-question",
		});

		const { answers } = await sut.execute({
			page: 2,
			questionId: "example-question",
		});

		expect(answers).toHaveLength(4);
	});
});
