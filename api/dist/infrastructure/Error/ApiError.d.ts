interface ApiErrorOptions {
    code?: string;
    details?: unknown;
}
export default class ApiError extends Error {
    statusCode: number;
    code?: string | undefined;
    details?: unknown;
    constructor(statusCode: number, message: string, options?: ApiErrorOptions);
    static BadRequest(message?: string, options?: ApiErrorOptions): ApiError;
    static Unauthorized(message?: string, options?: ApiErrorOptions): ApiError;
    static Forbidden(message?: string, options?: ApiErrorOptions): ApiError;
    static NotFound(message?: string, options?: ApiErrorOptions): ApiError;
    static Internal(message?: string, options?: ApiErrorOptions): ApiError;
}
export {};
//# sourceMappingURL=ApiError.d.ts.map