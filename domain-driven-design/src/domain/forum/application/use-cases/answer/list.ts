import type { AnswersRepository } from "../../repositories/answers-repository";
import type {
	ListAnswersUseCaseRequest,
	ListAnswersUseCaseResponse,
} from "../../types/answers";

export class ListAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		page,
		questionId,
	}: ListAnswersUseCaseRequest): Promise<ListAnswersUseCaseResponse> {
		const answers = await this.answersRepository.findManyByQuestion(
			questionId,
			{ page },
		);

		return {
			answers,
		};
	}
}
