import { Entry } from "./entry.interface";

export class ApiResponse<T extends Entry> {
  private _data: T[];

  constructor(data: T[]) {
    this.data = data || [];
  }

  get getResponse() {
    return {
      data: this._data,
      length: this._data.length,
    };
  }

  private set data(value: T[]) {
    this._data = value;
  }

  add(item: T) {
    this._data.push(item);
  }

  replace(id: string, item: T) {
    const idx = this.findIdx(id as keyof T, "id");
    this._data.splice(idx, 0, item);
  }

  find<K extends keyof T>(key: K, value: string): T | undefined {
    return this._data.find((item) => item[key] === value);
  }

  findIdx<K extends keyof T>(key: K, value: string): number {
    return this._data.findIndex((item) => item[key] === value);
  }

  filter<K extends keyof T>(key: K, value: string): void {
    this.data = this._data.filter((item) => item[key] === value);
  }
}
