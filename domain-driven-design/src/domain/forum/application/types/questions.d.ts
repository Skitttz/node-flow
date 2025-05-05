interface CreateQuestionUseCaseRequest {
  authorId:string
  title:string
  content: string
}

interface CreateQuestionUseCaseResponse{
  question: Question;
}



export type { CreateQuestionUseCaseRequest, CreateQuestionUseCaseResponse };

