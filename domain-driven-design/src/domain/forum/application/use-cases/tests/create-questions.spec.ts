import type { Question } from "@@domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "../../repositories/questions-repository";
import { CreateQuestionUseCase } from "../questions/create";

const fakeQuestionsRepository: QuestionsRepository = {
	create: async (question: Question) => {},
};

test("create new question", async () => {
	const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);
	const { question } = await createQuestion.execute({
		authorId: "5",
		title: "New Question",
		content: "Random Content",
	});

	expect(question.id).toBeTruthy();
});
