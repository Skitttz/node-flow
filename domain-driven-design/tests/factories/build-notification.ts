import { UniqueID } from "@@src/core/entities/unique-id";
import type { NotificationProps } from "@@src/domain/notification/application/types/notification";
import { Notification } from "@@src/domain/notification/enterprise/entities/notification";
import { faker } from "@faker-js/faker";

export function buildNotification(
	overide: Partial<NotificationProps> = {},
	id?: UniqueID,
) {
	const notification = Notification.create(
		{
			recipientId: new UniqueID(),
			title: faker.lorem.sentence(4),
			content: faker.lorem.sentence(10),
			...overide,
		},
		id,
	);

	return notification;
}
