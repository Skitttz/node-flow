import type { AnswersRepository } from "../../repositories/answers-repository";
import type { QuestionsRepository } from "../../repositories/questions-repository";
import type { ChooseBestAnswerUseCaseRequest } from "../../types/answers";

export class ChooseBestAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private questionsRepository: QuestionsRepository,
	) {}

	async execute({ answerId, authorId }: ChooseBestAnswerUseCaseRequest) {
    const answer = await this.answersRepository.findById(answerId);
    if (!answer) {
      throw new Error("Answer not found");
    }
    
		const question = await this.questionsRepository.findById(answer?.questionId.toString());

    if (!question) {
			throw new Error("Question not found");
		}

		if(authorId !== question.authorId.toString()){
      throw new Error ("Unauthorized");
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.edit(question);

    return {
      question
    }
	}
}
