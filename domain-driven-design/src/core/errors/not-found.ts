import type { UseCaseError } from "./use-case-error";

export class NotFoundError extends Error implements UseCaseError {
	constructor() {
		super("Resource not found");
	}
}
