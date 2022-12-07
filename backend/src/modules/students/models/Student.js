import { BaseModel } from "../../../shared/BaseModel.js";

export class Student extends BaseModel {
  constructor(id, name, CPF, registrationNumber, room) {
    super(id);
    this.name = name;
    this.CPF = CPF;
    this.registrationNumber = registrationNumber;
    this.room = room;
  }
}
