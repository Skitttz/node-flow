import { left, right } from "@@src/core/either";
import { NotFoundError } from "@@src/core/errors/not-found";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import type { NotificationsRepository } from "../../repositories/notification-repository";
import type {
	ReadNotificationUseCaseRequest,
	ReadNotificationUseCaseResponse,
} from "../../types/notification";

export class ReadNotificationUseCase {
	constructor(private notificationsRepository: NotificationsRepository) {}

	async execute({
		recipientId,
		notificationId,
	}: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
		const notification =
			await this.notificationsRepository.findById(notificationId);

		if (!notification) {
			return left(new NotFoundError());
		}

		if (recipientId !== notification.recipientId.toString()) {
			return left(new UnauthorizedError());
		}

		notification.read();

		await this.notificationsRepository.create(notification);

		return right({ notification });
	}
}
