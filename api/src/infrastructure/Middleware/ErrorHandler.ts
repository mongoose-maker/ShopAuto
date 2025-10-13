import ApiError from "../Error/ApiError.js";
import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  console.error("Error: ", err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    status: "error",
    message: "Unexpected server error",
  });
}
