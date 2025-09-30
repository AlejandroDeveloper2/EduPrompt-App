import { ErrorMessages } from "./ErrorMessages";

type ErrorCodeType = keyof typeof ErrorMessages;

export class ServerError extends Error {
  public code: number;
  constructor(message: ErrorCodeType, code: number) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
