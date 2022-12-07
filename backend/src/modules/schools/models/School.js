import { BaseModel } from "../../../shared/BaseModel.js";

export class School extends BaseModel {
  constructor(props) {
    super(props.id);
    this.name = props.name;
    this.CNPJ = props.CNPJ;
    this.logo = props.logo;
    this.address = props.address;
  }
}
