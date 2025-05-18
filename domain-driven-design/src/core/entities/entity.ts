import { UniqueID } from "./unique-id";

export abstract class Entity<Props> {
	private _id: UniqueID;
	protected props: Props;

	get id() {
		return this._id;
	}

	protected constructor(props: Props, id?: UniqueID) {
		this.props = props;
		this._id = id ?? new UniqueID();
	}

	public equals(entity: Entity<unknown>) {
		if (entity === this || entity.id === this._id) {
			return true;
		}
		return false;
	}
}
