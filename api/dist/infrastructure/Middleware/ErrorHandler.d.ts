import ApiError from "../Error/ApiError.js";
import type { Request, Response, NextFunction } from "express";
export declare function errorHandler(err: Error | ApiError, req: Request, res: Response, _next: NextFunction): Response;
//# sourceMappingURL=ErrorHandler.d.ts.map