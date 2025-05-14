import { UniqueID } from "@@src/core/entities/unique-id";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import { buildQuestion } from "tests/factories/build-question";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "../question/edit";

describe("Edit Question flow", () => {
	let questionsRepository: InMemoryQuestionsRepository;
	let sut: EditQuestionUseCase;

	const AUTHOR_ID = "example-author";
	const QUESTION_ID = "question-example";
	const OTHER_AUTHOR_ID = "example-author-other";

	beforeEach(() => {
		questionsRepository = new InMemoryQuestionsRepository();
		sut = new EditQuestionUseCase(questionsRepository);
	});

	it("should be able to edit a question when the author is the same", async () => {
		const newQuestion = buildQuestion(
			{ authorId: new UniqueID(AUTHOR_ID) },
			new UniqueID(QUESTION_ID),
		);
		await questionsRepository.create(newQuestion);

		const editQuestionData = {
			title: "Question Title Edited",
			content: "Content example updated",
		};

		await sut.execute({
			questionId: newQuestion.id.toValue(),
			authorId: AUTHOR_ID,
			...editQuestionData,
		});

		expect(questionsRepository.items[0]).toMatchObject({
			title: editQuestionData.title,
			content: editQuestionData.content,
		});
	});

	it("should not allow editing a question from another author", async () => {
		const newQuestion = buildQuestion(
			{ authorId: new UniqueID(AUTHOR_ID) },
			new UniqueID(QUESTION_ID),
		);

		await questionsRepository.create(newQuestion);

		const editQuestionData = {
			title: "Question Title Edited",
			content: "Content example updated",
		};

		const result = await sut.execute({
			questionId: newQuestion.id.toValue(),
			authorId: OTHER_AUTHOR_ID,
			...editQuestionData,
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(UnauthorizedError);
	});

	it("should throw when trying to edit a non-existent question", async () => {
		await expect(() =>
			sut.execute({
				questionId: "non-existent-question",
				authorId: AUTHOR_ID,
				title: "New Title",
				content: "New Content",
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
