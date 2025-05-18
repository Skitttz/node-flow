import { UniqueID } from "@@src/core/entities/unique-id";
import { UnauthorizedError } from "@@src/core/errors/unauthorized";
import { buildNotification } from "tests/factories/build-notification";
import { InMemoryNotificationsRepository } from "tests/repositories/in-memory-notifications-repository";
import { ReadNotificationUseCase } from "./read";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe("Read Notification Flow", () => {
	beforeEach(() => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
	});

	it("should be allow to read a notification", async () => {
		const newNotification = buildNotification();

		await inMemoryNotificationsRepository.create(newNotification);

		const result = await sut.execute({
			recipientId: newNotification.recipientId.toString(),
			notificationId: newNotification.id.toString(),
		});

		expect(result.isRight()).toBe(true);

		expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
			expect.any(Date),
		);
	});

	it("should not allowed to read notification from other user", async () => {
		const newNotification = buildNotification(
			{
				recipientId: new UniqueID("target-user-1"),
			},
			new UniqueID("notification-id-1"),
		);

		await inMemoryNotificationsRepository.create(newNotification);

		const result = await sut.execute({
			recipientId: "target-user-2",
			notificationId: newNotification.id.toString(),
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).instanceOf(UnauthorizedError);
	});
});
