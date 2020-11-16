
export interface StorageInterface {

  save(key: string, data: any): void;

  load(key:string): any | null;

}

export class LocalStorage implements StorageInterface {
  load(key:string): any | null {
    const data = window.localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  save(key: string, data: any): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

}


