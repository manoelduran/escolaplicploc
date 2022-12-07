import { BaseModel } from "../../../shared/BaseModel.js";

export class Student extends BaseModel {
  constructor(props) {
    super(props.id);
    this.name = props.name;
    this.CPF = props.CPF;
    this.registrationNumber = props.registrationNumber;
    this.classroom = props.classroom;
  }
}
