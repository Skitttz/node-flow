import type { NotificationsRepository } from "@@src/domain/notification/application/repositories/notification-repository";
import type { Notification } from "@@src/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationsRepository
	implements NotificationsRepository
{
	public items: Notification[] = [];

	async create(notification: Notification) {
		this.items.push(notification);
	}

	async findById(id: string) {
		const notification = this.items.find(
			(notification) => notification.id.toString() === id,
		);
		if (!notification) return null;
		return notification;
	}

	async edit(notification: Notification) {
		const itemIndex = this.items.findIndex(
			(item) => item.id === notification.id,
		);
		this.items[itemIndex] = notification;
	}
}
