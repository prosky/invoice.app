import {CompanyInterface} from "../data/types";


export default class Company implements CompanyInterface {

  name = '';
  address = '';
  address2 = '';
  country = '';
  cin = '';
  tin = '';

  constructor(country: string) {
    this.country = country;
  }

}
