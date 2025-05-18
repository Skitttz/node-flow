import { WatchedList } from "../entities/watched-list";

class NumberWatchedList extends WatchedList<number> {
	compareItems(a: number, b: number): boolean {
		return a === b;
	}
}

describe("watched list core flow", () => {
	it("shoud be allow to make a watched list with initial items", () => {
		const list = new NumberWatchedList([1, 2, 3, 4, 5]);

		expect(list.currentItems).toHaveLength(5);
	});

	it("shoud be allow to add items from the list", () => {
		const list = new NumberWatchedList([1, 2, 3, 4, 5]);

		list.add(10);

		expect(list.currentItems).toHaveLength(6);
		expect(list.getNewItems()).toEqual([10]);
	});

	it("shoud be allow to remove items from the list", () => {
		const list = new NumberWatchedList([1, 2, 3, 4, 5]);

		list.remove(3);

		expect(list.currentItems).toHaveLength(4);
		expect(list.getRemovedItems()).toEqual([3]);
	});

	it("shoud be allow to add item even if it was removed before", () => {
		const list = new NumberWatchedList([1, 2, 3, 4, 5]);

		list.remove(3);
		list.add(3);

		expect(list.currentItems).toHaveLength(5);
		expect(list.getRemovedItems()).toEqual([]);
		expect(list.getNewItems()).toEqual([]);
	});

	it("shoud be allow to remove item even if it was ADD before", () => {
		const list = new NumberWatchedList([1, 2, 3, 4, 5]);

		list.remove(2);
		list.add(2);

		expect(list.currentItems).toHaveLength(5);
		expect(list.getRemovedItems()).toEqual([]);
		expect(list.getNewItems()).toEqual([]);
	});

	it("shoud be allow to update watched list items", () => {
		const list = new NumberWatchedList([1, 2, 3, 4, 5]);

		list.update([1, 2, 5, 6]);
		expect(list.getRemovedItems()).toEqual([3, 4]);
		expect(list.getNewItems()).toEqual([6]);
	});
});
