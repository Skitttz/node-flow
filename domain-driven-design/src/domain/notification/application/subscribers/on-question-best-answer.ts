import { DomainEvents } from "@@src/core/events/domain-events";
import type { EventHandler } from "@@src/core/events/event-handler";

import type { AnswersRepository } from "@@src/domain/forum/application/repositories/answers-repository";
import { QuestionBestAnswerEvent } from "@@src/domain/forum/enterprise/events/question-best-answer-event";
import type { SendNotificationUseCase } from "../use-cases/notification/send";

export class OnQuestionBestAnswer implements EventHandler {
	constructor(
		private answerRepository: AnswersRepository,
		private sendNotification: SendNotificationUseCase,
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendQuestionBestAnswserNotification.bind(this),
			QuestionBestAnswerEvent.name,
		);
	}

	private async sendQuestionBestAnswserNotification({
		question,
		bestAnswerId,
	}: QuestionBestAnswerEvent) {
		const answer = await this.answerRepository.findById(
			bestAnswerId.toString(),
		);

		if (answer) {
			await this.sendNotification.execute({
				recipientId: answer.authorId.toString(),
				title: "Your answer was selected as the best!",
				content: `Question "${question?.title.substring(0, 40).concat("...")}" was chosen by the author.`,
			});
		}
	}
}
