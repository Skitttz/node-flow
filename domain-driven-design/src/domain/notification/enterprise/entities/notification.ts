import { Entity } from "@@src/core/entities/entity";
import type { UniqueID } from "@@src/core/entities/unique-id";
import type { Optional } from "@@src/core/types/optional";
import type { NotificationProps } from "../../application/types/notification";

export class Notification extends Entity<NotificationProps> {
	get recipientId() {
		return this.props.recipientId;
	}
	get title() {
		return this.props.title;
	}
	get content() {
		return this.props.content;
	}
	get readAt() {
		return this.props.readAt;
	}
	get createdAt() {
		return this.props.createdAt;
	}

	read() {
		this.props.readAt = new Date();
	}

	static create(
		props: Optional<NotificationProps, "createdAt">,
		id?: UniqueID,
	) {
		const notification = new Notification(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return notification;
	}
}
