import { Entry } from "./entry.model";

export class ApiResponse<T extends Entry> {
  private _data: T[];
  private _initialData: T[];

  constructor(data: T[]) {
    this._initialData = data;
    this.data = this._initialData;
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
    this._initialData = [...this._initialData, item];
  }

  replace(id: string, item: T) {
    const idx = this.findIdx(id as keyof T, "id");
    this._data.splice(idx, 0, item);
  }

  find<K extends keyof T>(key: K, value: string): T | undefined {
    return [...this._initialData].find((item) => item[key] === value);
  }

  findIdx<K extends keyof T>(key: K, value: string): number {
    return [...this._initialData].findIndex((item) => item[key] === value);
  }

  filter<K extends keyof T>(key: K, value: string): void {
    this.data = [...this._initialData].filter((item) => item[key] === value);
  }

  filterByFn(cb: (item: T) => boolean | undefined): void {
    this.data = [...this._initialData].filter(cb);
  }

  reset() {
    this.data = this._initialData;
  }
}
