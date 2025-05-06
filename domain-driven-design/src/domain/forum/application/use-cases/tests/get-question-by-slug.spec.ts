import { Slug } from "@@src/domain/forum/enterprise/entities/valueObject/Slug";
import { buildQuestion } from "tests/factories/build-question";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "../question/get-by-slug";

let inMemoryQuestionsRepository : InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Question by Slug flow', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	})
	it("should be able to find question by slug", async () => {

    const newQuestion = buildQuestion({slug: Slug.create("example-question")});

    inMemoryQuestionsRepository.create(newQuestion)

		const { question } = await sut.execute({
			slug: "example-question"
		});
	
    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title);
	});

})

