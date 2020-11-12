import {Invoice} from "./data/types";

export interface StorageInterface {

  save(data: Invoice): void;

  load(): Invoice | null;

}

export class LocalStorage implements StorageInterface {
  load(): Invoice | null {
    const data = window.localStorage.getItem('data');
    if (!data) return null;
    return JSON.parse(data);
  }

  save(data: Invoice): void {
    window.localStorage.setItem('data', JSON.stringify(data));
  }

}


