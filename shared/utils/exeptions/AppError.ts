import { ErrorMessages } from "../enums/ErrorMessages";

export type ErrorCodeType = keyof typeof ErrorMessages;

/** Clase personalizada para la captura y manejo de errores de API */
export class AppError extends Error {
  public readonly name: ErrorCodeType;
  public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor(
    name: ErrorCodeType,
    httpCode: number,
    description: string,
    isOperational: boolean = true
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
