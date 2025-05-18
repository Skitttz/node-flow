import { right } from "@@src/core/either";
import { UniqueID } from "@@src/core/entities/unique-id";
import { Notification } from "../../../enterprise/entities/notification";
import type { NotificationsRepository } from "../../repositories/notification-repository";
import type {
	SendNotificationUseCaseRequest,
	SendNotificationUseCaseResponse,
} from "../../types/notification";

export class SendNotificationUseCase {
	constructor(private notificationsRepository: NotificationsRepository) {}

	async execute({
		recipientId,
		content,
		title,
	}: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
		const notification = Notification.create({
			recipientId: new UniqueID(recipientId),
			content,
			title,
		});

		await this.notificationsRepository.create(notification);

		return right({ notification });
	}
}
