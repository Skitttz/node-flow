import { buildAnswer } from "tests/factories/build-answer";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "tests/repositories/in-memory-attachments-repository";
import { InMemoryAnswerCommentsRepository } from "tests/repositories/in-memory-comments-repository";
import { CommentAnswerUseCase } from "../comment/answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: CommentAnswerUseCase;

describe("Comment Answer flow", () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new CommentAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswerCommentsRepository,
		);
	});
	it("should be able to create comment on answer", async () => {
		const newAnswer = buildAnswer();

		inMemoryAnswersRepository.create(newAnswer);

		await sut.execute({
			answerId: newAnswer.id.toString(),
			authorId: newAnswer.authorId.toString(),
			content: "Comment Answer Test",
		});

		expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
			"Comment Answer Test",
		);
	});
});
