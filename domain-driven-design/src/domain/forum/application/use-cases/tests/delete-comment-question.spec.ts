import { UniqueID } from "@@src/core/entities/unique-id";
import { buildComment } from "tests/factories/build-comment";
import { InMemoryQuestionCommentsRepository } from "tests/repositories/in-memory-comments-repository";
import { DeleteQuestionCommentUseCase } from "../comment/delete-comment-question";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete Comment Question flow", () => {
	beforeEach(() => {
		inMemoryQuestionCommentsRepository =
			new InMemoryQuestionCommentsRepository();
		sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
	});
	it("should be able to delete comment on question", async () => {
		const newQuestionComment = buildComment({
			type: "Question",
		});

		await inMemoryQuestionCommentsRepository.create(newQuestionComment);

		await sut.execute({
			questionCommentId: newQuestionComment.id.toString(),
			authorId: newQuestionComment.authorId.toString(),
		});

		expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
	});

	it("should not allowed to delete another user comment on question", async () => {
		const newQuestionComment = buildComment({
			type: "Question",
			overide: {
				authorId: new UniqueID("another-author-id"),
			},
		});

		await inMemoryQuestionCommentsRepository.create(newQuestionComment);

		await expect(() => {
			return sut.execute({
				questionCommentId: newQuestionComment.id.toString(),
				authorId: "author-id",
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
