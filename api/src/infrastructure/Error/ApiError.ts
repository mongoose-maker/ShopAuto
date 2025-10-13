export default class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
  static BadRequest(message = "BadRequest") {
    return new ApiError(400, message);
  }
  static Unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }
  static Forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }
  static NotFound(message = "Not Found") {
    return new ApiError(404, message);
  }
  static Internal(message = "Internal") {
    return new ApiError(500, message);
  }
}
