export class Response<T> {
  data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  get getResponse() {
    return {
      data: this.data,
      length: this.data.length,
    };
  }
}
