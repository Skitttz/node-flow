import type { AnswersRepository } from "../../repositories/answers-repository";
import type {
  EditAnswerUseCaseRequest,
  EditAnswerUseCaseResponse,
} from "../../types/answers";

export class EditAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({authorId,answerId,content}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if(!answer){
      throw new Error("Answer not found");
    }

    if(authorId !== answer.authorId.toString()){
      throw new Error("Unauthorized")
    }
    answer.content = content;
    
    await this.answersRepository.edit(answer);
    
    return {
      answer
    }
  }
}
