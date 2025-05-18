import { Entity } from "@@src/core/entities/entity";
import type { UniqueID } from "@@src/core/entities/unique-id";
import type { AttachmentProps } from "../types/attachment";

export class Attachment extends Entity<AttachmentProps> {
	get title() {
		return this.props.title;
	}

	get link() {
		return this.props.link;
	}

	static create(props: AttachmentProps, id?: UniqueID) {
		const attachment = new Attachment(props, id);
		return attachment;
	}
}
