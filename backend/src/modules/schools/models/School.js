import { BaseModel } from "../../../shared/BaseModel.js";

export class School extends BaseModel {
  constructor(name, CNPJ, logo, address, id) {
    super(id);
    this.name = name;
    this.CNPJ = CNPJ;
    this.logo = logo;
    this.address = address;
  }
}
