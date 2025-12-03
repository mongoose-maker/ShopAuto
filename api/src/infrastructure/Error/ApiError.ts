interface ApiErrorOptions {
  code?: string;
  // Например, объект валидации, массив ошибок, произвольные данные
  details?: unknown;
}

export default class ApiError extends Error {
  statusCode: number;
  code?: string | undefined;
  details?: unknown;

  constructor(statusCode: number, message: string, options?: ApiErrorOptions) {
    super(message);
    this.statusCode = statusCode;
    this.code = options?.code;
    this.details = options?.details;

    Object.setPrototypeOf(this, ApiError.prototype);
    // Чтобы стек корректно формировался в Node.js
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static BadRequest(message = "BadRequest", options?: ApiErrorOptions) {
    return new ApiError(400, message, options);
  }

  static Unauthorized(message = "Unauthorized", options?: ApiErrorOptions) {
    return new ApiError(401, message, options);
  }

  static Forbidden(message = "Forbidden", options?: ApiErrorOptions) {
    return new ApiError(403, message, options);
  }

  static NotFound(message = "Not Found", options?: ApiErrorOptions) {
    return new ApiError(404, message, options);
  }

  static Internal(message = "Internal", options?: ApiErrorOptions) {
    return new ApiError(500, message, options);
  }
}
