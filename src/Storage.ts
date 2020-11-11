import {Invoice} from "./data/types";

export interface StorageInterface {

  save(data: Invoice): void;

  load(): Invoice | null;

}

function isInvoice(arg: any): arg is Invoice {
  return arg && arg.prop && typeof(arg.prop) == 'number';
}

export class LocalStorage implements StorageInterface {
  load(): Invoice | null {
    const data = window.localStorage.getItem('data');
    if (!data) return null;
    const parsed = JSON.parse(data);
    if(isInvoice(parsed)){
      return <Invoice>JSON.parse(data);
    }
    return null;
  }

  save(data: Invoice): void {
    window.localStorage.setItem('data', JSON.stringify(data));
  }

}


