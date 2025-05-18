import { buildQuestion } from "tests/factories/build-question";
import { InMemoryQuestionAttachmentsRepository } from "tests/repositories/in-memory-attachments-repository";
import { InMemoryQuestionCommentsRepository } from "tests/repositories/in-memory-comments-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { CommentQuestionUseCase } from "../comment/question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CommentQuestionUseCase;

describe("Comment Question flow", () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
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
