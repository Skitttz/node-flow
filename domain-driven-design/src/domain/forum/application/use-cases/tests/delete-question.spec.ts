import { UniqueID } from "@@src/core/entities/unique-id";
import { buildQuestion } from "tests/factories/build-question";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "../question/delete";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question flow", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });
  it("should be able to delete question", async () => {
    const newQuestion = buildQuestion(
      { authorId: new UniqueID("example-author") },
      new UniqueID("example-question"),
    );

    inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: "example-question",
      authorId: "example-author",
    });
    
    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it("should not allowed to delete question from other author", async () => {
    const newQuestion = buildQuestion(
      { authorId: new UniqueID("example-author") },
      new UniqueID("example-question"),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    expect(() => {
      return sut.execute({
        questionId: "example-question",
        authorId: "example-author-diff",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
