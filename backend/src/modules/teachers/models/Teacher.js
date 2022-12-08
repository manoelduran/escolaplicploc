import { BaseModel } from "../../../shared/BaseModel.js";

export class Teacher extends BaseModel {
  constructor(props) {
    super(props.id);
    this.name = props.name;
    this.CPF = props.CPF;
    this.academicTitle = props.academicTitle;
    this.discipline = props.discipline;
  }
}
