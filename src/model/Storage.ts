import {Invoice} from "../data/types";

export interface StorageInterface {

  save(key: string, data: Invoice): void;

  load(key:string): Invoice | null;

}

export class LocalStorage implements StorageInterface {
  load(key:string): Invoice | null {
    const data = window.localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  save(key: string, data: Invoice): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

}


