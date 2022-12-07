import { BaseModel } from "../../../shared/BaseModel";

export class Teacher extends BaseModel {
  constructor(id, name, CPF, academicTitle, subject) {
    super(id);
    this.name = name;
    this.CPF = CPF;
    this.academicTitle = academicTitle;
    this.subject = subject;
  }
}
