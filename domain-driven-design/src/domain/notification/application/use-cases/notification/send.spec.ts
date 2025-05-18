import { InMemoryNotificationsRepository } from "tests/repositories/in-memory-notifications-repository";
import { SendNotificationUseCase } from "./send";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe("Send Notification Flow", () => {
	beforeEach(() => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
	});

	it("should be able to send a notification", async () => {
		const result = await sut.execute({
			recipientId: "2",
			title: "New Transform",
			content: "Example COntent",
		});

		expect(result.isRight()).toBe(true);

		expect(inMemoryNotificationsRepository.items[0]).toEqual(
			result.value?.notification,
		);
	});
});
