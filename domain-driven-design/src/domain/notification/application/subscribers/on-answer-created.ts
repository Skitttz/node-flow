import { DomainEvents } from "@@src/core/events/domain-events";
import type { EventHandler } from "@@src/core/events/event-handler";
import type { QuestionsRepository } from "@@src/domain/forum/application/repositories/questions-repository";
import { AnswerCreatedEvent } from "@@src/domain/forum/enterprise/events/answer-created-event";
import type { SendNotificationUseCase } from "../use-cases/notification/send";

export class OnAnswerCreated implements EventHandler {
	constructor(
		private questionsRepository: QuestionsRepository,
		private sendNotification: SendNotificationUseCase,
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendNewAnswerNotification.bind(this),
			AnswerCreatedEvent.name,
		);
	}

	private async sendNewAnswerNotification(event: AnswerCreatedEvent) {
		const question = await this.questionsRepository.findById(
			event.answer.questionId.toString(),
		);

		if (question) {
			await this.sendNotification.execute({
				recipientId: question.authorId.toString(),
				title: `New Answer in ${question?.title.substring(0, 40).concat("...")}`,
				content: event.answer.excerpt,
			});
		}
	}
}
