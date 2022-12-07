import { BaseModel } from "../../../shared/BaseModel";

export class Classroom extends BaseModel {
  constructor(id, teacher, students, subject, room) {
    super(id);
    this.teacher = teacher;
    this.students = students;
    this.subject = subject;
    this.room = room;
  }
}
