import type { Either } from "@@src/core/either";
import type { UniqueID } from "@@src/core/entities/unique-id";
import type { NotFoundError } from "@@src/core/errors/not-found";
import type { UnauthorizedError } from "@@src/core/errors/unauthorized";
import type { Notification } from "../../enterprise/entities/notification";

interface NotificationProps {
	recipientId: UniqueID;
	title: string;
	content: string;
	createdAt: Date;
	readAt?: Date;
}

interface SendNotificationUseCaseRequest {
	recipientId: string;
	title: string;
	content: string;
}

type SendNotificationUseCaseResponse = Either<
	null,
	{
		notification: Notification;
	}
>;

interface ReadNotificationUseCaseRequest {
	recipientId: string;
	notificationId: string;
}

type ReadNotificationUseCaseResponse = Either<
	NotFoundError | UnauthorizedError,
	{ notification: Notification }
>;

export type {
	NotificationProps,
	ReadNotificationUseCaseRequest,
	ReadNotificationUseCaseResponse,
	SendNotificationUseCaseRequest,
	SendNotificationUseCaseResponse,
};
