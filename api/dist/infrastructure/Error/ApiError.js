export default class ApiError extends Error {
    constructor(statusCode, message, options) {
        super(message);
        this.statusCode = statusCode;
        this.code = options?.code;
        this.details = options?.details;
        Object.setPrototypeOf(this, ApiError.prototype);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    static BadRequest(message = 'BadRequest', options) {
        return new ApiError(400, message, options);
    }
    static Unauthorized(message = 'Unauthorized', options) {
        return new ApiError(401, message, options);
    }
    static Forbidden(message = 'Forbidden', options) {
        return new ApiError(403, message, options);
    }
    static NotFound(message = 'Not Found', options) {
        return new ApiError(404, message, options);
    }
    static Internal(message = 'Internal', options) {
        return new ApiError(500, message, options);
    }
}
//# sourceMappingURL=ApiError.js.map