import { Entity } from "@@src/core/entities/entity";
import type { UniqueID } from "@@src/core/entities/unique-id";
import type { InstructorProps } from "./types/instructor";

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueID) {
    const instructor = new Instructor(props, id);

    return instructor;
  }
}
