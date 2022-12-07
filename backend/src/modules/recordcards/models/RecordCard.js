import { BaseModel } from "../../../shared/BaseModel";

export class ReportCard extends BaseModel {
  constructor(id, student, classroom, finalGrade) {
    super(id);
    this.student = student;
    this.classroom = classroom;
    this.finalGrade = finalGrade;
    this.approval = finalGrade >= 6 ? true : false;
  }
}
