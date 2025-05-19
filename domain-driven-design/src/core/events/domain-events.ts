import type { AggregateRoot } from "../entities/aggregate-root";
import type { UniqueID } from "../entities/unique-id";
import type { DomainEvent } from "./domain-event";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type DomainEventCallback = (event: any) => void;

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DomainEvents {
	private static handlersMap: Record<string, DomainEventCallback[]> = {};
	private static markedAggregates: AggregateRoot<unknown>[] = [];

	public static markAggregateForDispatch<T>(aggregate: AggregateRoot<T>): void {
		const aggregateFound = !!DomainEvents.findMarkedAggregateByID(aggregate.id);

		if (!aggregateFound) {
			DomainEvents.markedAggregates.push(aggregate);
		}
	}

	private static dispatchAggregateEvents<T>(aggregate: AggregateRoot<T>): void {
		for (const event of aggregate.domainEvents) {
			DomainEvents.dispatch(event);
		}
	}

	private static removeAggregateFromMarkedDispatchList<T>(
		aggregate: AggregateRoot<T>,
	): void {
		const index = DomainEvents.markedAggregates.findIndex((a) =>
			a.equals(aggregate),
		);
		DomainEvents.markedAggregates.splice(index, 1);
	}

	private static findMarkedAggregateByID(
		id: UniqueID,
	): AggregateRoot<unknown> | undefined {
		return DomainEvents.markedAggregates.find((aggregate) =>
			aggregate.id.equals(id),
		);
	}

	public static dispatchEventsForAggregate(id: UniqueID): void {
		const aggregate = DomainEvents.findMarkedAggregateByID(id);

		if (aggregate) {
			DomainEvents.dispatchAggregateEvents(aggregate);
			aggregate.clearEvents();
			DomainEvents.removeAggregateFromMarkedDispatchList(aggregate);
		}
	}

	public static register(
		callback: DomainEventCallback,
		eventClassName: string,
	): void {
		const wasEventRegisteredBefore = eventClassName in DomainEvents.handlersMap;

		if (!wasEventRegisteredBefore) {
			DomainEvents.handlersMap[eventClassName] = [];
		}

		DomainEvents.handlersMap[eventClassName].push(callback);
	}

	public static clearHandlers(): void {
		DomainEvents.handlersMap = {};
	}

	public static clearMarkedAggregates(): void {
		DomainEvents.markedAggregates = [];
	}

	private static dispatch(event: DomainEvent): void {
		const eventClassName: string = event.constructor.name;
		const isEventRegistered = eventClassName in DomainEvents.handlersMap;

		if (isEventRegistered) {
			const handlers = DomainEvents.handlersMap[eventClassName];
			for (const handler of handlers) {
				handler(event);
			}
		}
	}
}
