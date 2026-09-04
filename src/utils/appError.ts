export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    statusCode: number,
    message: string,
    options?: {
      isOperational?: boolean;
      cause?: unknown;
      details?: unknown;
    }
  ) {
    
    super(message, { cause: options?.cause });

    this.statusCode = statusCode;
    this.isOperational = options?.isOperational ?? true;
    this.details = options?.details;

   
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;

   
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message = 'Bad Request', details?: unknown) {
    return new AppError(400, message, { details });
  }

  static unauthorized(message = 'Unauthorized') {
    return new AppError(401, message);
  }

  static forbidden(message = 'Forbidden') {
    return new AppError(403, message);
  }

  static notFound(message = 'Resource not found') {
    return new AppError(404, message);
  }

  static internal(message = 'Internal Server Error', cause?: unknown) {
    return new AppError(500, message, { isOperational: false, cause });
  }
}