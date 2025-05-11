import { buildQuestion } from "tests/factories/build-question";
import { InMemoryQuestionCommentsRepository } from "tests/repositories/in-memory-comments-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { CommentQuestionUseCase } from "../comment/question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentQuestionUseCase;

describe("Comment Question flow", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		inMemoryQuestionCommentsRepository =
			new InMemoryQuestionCommentsRepository();
		sut = new CommentQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionCommentsRepository,
		);
	});
	it("should be able to create comment on question", async () => {
		const newQuestion = buildQuestion();

		inMemoryQuestionsRepository.create(newQuestion);

		await sut.execute({
			questionId: newQuestion.id.toString(),
			authorId: newQuestion.authorId.toString(),
			content: "Comment Test",
		});

		expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
			"Comment Test",
		);
	});
});
