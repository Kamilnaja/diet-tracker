import { IError } from "./error.interface";

export class Error {
  static getError(message: string): IError {
    return {
      message,
    };
  }
}
