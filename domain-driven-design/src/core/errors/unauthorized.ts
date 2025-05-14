import type { UseCaseError } from "./use-case-error";

export class UnauthorizedError extends Error implements UseCaseError {
	constructor() {
		super("Not allowed");
	}
}
