import { IError } from "./error.model";

export class Error {
  static getError(message: string): IError {
    return {
      message,
    };
  }
}
