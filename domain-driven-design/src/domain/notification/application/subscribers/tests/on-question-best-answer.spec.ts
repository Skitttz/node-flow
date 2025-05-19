import { buildAnswer } from "tests/factories/build-answer";
import { buildQuestion } from "tests/factories/build-question";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import {
	InMemoryAnswerAttachmentsRepository,
	InMemoryQuestionAttachmentsRepository,
} from "tests/repositories/in-memory-attachments-repository";
import { InMemoryNotificationsRepository } from "tests/repositories/in-memory-notifications-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { waitFor } from "tests/utils/wait-for";
import type { SpyInstance } from "vitest";
import type {
	SendNotificationUseCaseRequest,
	SendNotificationUseCaseResponse,
} from "../../types/notification";
import { SendNotificationUseCase } from "../../use-cases/notification/send";
import { OnAnswerCreated } from "../on-answer-created";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionRepository: InMemoryQuestionsRepository;

let inMemoryNotificationRepository: InMemoryNotificationsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: SpyInstance<
	[SendNotificationUseCaseRequest],
	Promise<SendNotificationUseCaseResponse>
>;

describe("On Answer Cretead flow", () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);

		inMemoryAnswerAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);

		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();

		sendNotificationUseCase = new SendNotificationUseCase(
			inMemoryNotificationsRepository,
		);

		sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");

		new OnAnswerCreated(inMemoryQuestionRepository, sendNotificationUseCase);
	});
	it("should allow send a notification when question has new best answer chosen", async () => {
		const newQuestion = buildQuestion();
		const newAnswer = buildAnswer({ questionId: newQuestion.id });

		inMemoryQuestionRepository.create(newQuestion);
		inMemoryAnswersRepository.create(newAnswer);

		await waitFor(() => expect(sendNotificationExecuteSpy).toHaveBeenCalled());
	});
});
