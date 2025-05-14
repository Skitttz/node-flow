import { UniqueID } from "@@core/entities/unique-id";
import { Question } from "@@domain/forum/enterprise/entities/question";
import { right } from "@@src/core/either";
import type { QuestionsRepository } from "../../repositories/questions-repository";
import type {
	CreateQuestionUseCaseRequest,
	CreateQuestionUseCaseResponse,
} from "../../types/questions";

export class CreateQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		authorId,
		content,
		title,
	}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueID(authorId),
			content,
			title,
		});
		await this.questionsRepository.create(question);
		return right({ question });
	}
}
