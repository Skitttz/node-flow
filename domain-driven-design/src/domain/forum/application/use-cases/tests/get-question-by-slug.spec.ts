import { Slug } from "@@src/domain/forum/enterprise/entities/valueObject/Slug";
import { buildQuestion } from "tests/factories/build-question";
import { InMemoryQuestionAttachmentsRepository } from "tests/repositories/in-memory-attachments-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "../question/get-by-slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Question by Slug flow", () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	});
	it("should be able to find question by slug", async () => {
		const newQuestion = buildQuestion({
			slug: Slug.create("example-question"),
		});

		inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			slug: "example-question",
		});

		expect(result.value).toMatchObject({
			question: expect.objectContaining({
				title: newQuestion.title,
			}),
		});
	});
});
