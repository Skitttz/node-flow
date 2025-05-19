import { Entity } from "@@src/core/entities/entity";
import type { UniqueID } from "@@src/core/entities/unique-id";

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueID) {
    const student = new Student(props, id);

    return student;
  }
}
