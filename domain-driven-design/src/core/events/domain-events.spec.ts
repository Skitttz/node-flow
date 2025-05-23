import { AggregateRoot } from "../entities/aggregate-root";
import type { UniqueID } from "../entities/unique-id";
import type { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";

class CustomAggregateCreated implements DomainEvent {
	public ocurredAt: Date;
	private aggregate: CustomAggregate;

	constructor(aggregate: CustomAggregate) {
		this.aggregate = aggregate;
		this.ocurredAt = new Date();
	}

	public getAggregateId(): UniqueID {
		return this.aggregate.id;
	}
}

class CustomAggregate extends AggregateRoot<null> {
	static create() {
		const aggregate = new CustomAggregate(null);
		aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));
		return aggregate;
	}
}

describe("Domain Events flow", () => {
	it("should allow dispatching and listening to events", () => {
		const callbackSpy = vi.fn();

		// Register a subscriber (e.g., to listen for the CustomAggregateCreated event)
		DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

		// Create an aggregate without persisting it to the database
		const aggregate = CustomAggregate.create();

		// Ensure the event was created but not yet dispatched
		expect(aggregate.domainEvents).toHaveLength(1);

		// Persist the aggregate to the database, triggering the event dispatch
		DomainEvents.dispatchEventsForAggregate(aggregate.id);

		// Verify that the subscriber listened to the event and performed its action
		expect(callbackSpy).toHaveBeenCalled();
		expect(aggregate.domainEvents).toHaveLength(0);
	});
});
