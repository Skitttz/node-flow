import { UniqueID } from "@@src/core/entities/unique-id";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import { buildComment } from "tests/factories/build-comment";
import { InMemoryAnswerCommentsRepository } from "tests/repositories/in-memory-comments-repository";
import { DeleteAnswerCommentUseCase } from "../comment/delete-comment-answer";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Comment Answer flow", () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
	});
	it("should be able to delete comment on answer", async () => {
		const newAnswerComment = buildComment({
			type: "Answer",
		});

		await inMemoryAnswerCommentsRepository.create(newAnswerComment);

		await sut.execute({
			answerCommentId: newAnswerComment.id.toString(),
			authorId: newAnswerComment.authorId.toString(),
		});

		expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
	});

	it("should not allowed to delete another user comment on answer", async () => {
		const newAnswerComment = buildComment({
			type: "Answer",
			overide: {
				authorId: new UniqueID("another-author-id"),
			},
		});

		await inMemoryAnswerCommentsRepository.create(newAnswerComment);

		const result = await sut.execute({
			answerCommentId: newAnswerComment.id.toString(),
			authorId: "author-id",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(UnauthorizedError);
	});
});
