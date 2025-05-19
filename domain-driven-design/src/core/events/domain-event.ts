import type { UniqueID } from "../entities/unique-id";

export interface DomainEvent {
	ocurredAt: Date;
	getAggregateId(): UniqueID;
}
