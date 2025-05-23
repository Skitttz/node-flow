import { buildManyItems } from "tests/factories/build-many";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "tests/repositories/in-memory-attachments-repository";
import { ListAnswerUseCase } from "../answer/list";

let answerMemoryAnswersRepositorys: InMemoryAnswersRepository;
let answerAttachmentsMemoryRepositorys: InMemoryAnswerAttachmentsRepository;
let sut: ListAnswerUseCase;

describe("List Answers by Question Flow", () => {
	beforeEach(() => {
		answerAttachmentsMemoryRepositorys =
			new InMemoryAnswerAttachmentsRepository();
		answerMemoryAnswersRepositorys = new InMemoryAnswersRepository(
			answerAttachmentsMemoryRepositorys,
		);
		sut = new ListAnswerUseCase(answerMemoryAnswersRepositorys);
	});
	it("should be able to show list answers", async () => {
		await buildManyItems({
			repository: answerMemoryAnswersRepositorys,
			numberofItems: 8,
			questionId: "example-question",
		});

		const result = await sut.execute({
			page: 1,
			questionId: "example-question",
		});

		expect(result.value?.answers).toHaveLength(8);
	});
	it("should be able to show paginated answers", async () => {
		await buildManyItems({
			repository: answerMemoryAnswersRepositorys,
			numberofItems: 24,
			questionId: "example-question",
		});

		const result = await sut.execute({
			page: 2,
			questionId: "example-question",
		});

		expect(result.value?.answers).toHaveLength(4);
	});
});
