import { BaseModel } from "../../../shared/BaseModel.js";

export class ClassRoom extends BaseModel {
  constructor(props) {
    super(props.id);
    this.teacher = props.teacher;
    this.students = props.students;
    this.subject = props.subject;
  }
}
