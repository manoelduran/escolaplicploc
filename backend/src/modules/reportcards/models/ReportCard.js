import { BaseModel } from "../../../shared/BaseModel.js";

export class ReportCard extends BaseModel {
  constructor(props) {
    super(props.id);
    this.student = props.student;
    this.classroom = props.classroom;
    this.finalGrade = props.finalGrade;
    this.approval = props.finalGrade >= 6 ? true : false;
  }
}
