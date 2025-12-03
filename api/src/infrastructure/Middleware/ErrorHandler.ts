import ApiError from "../Error/ApiError.js";
import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;

  // Базовое тело ответа
  const body: Record<string, unknown> = {
    status: "error",
    message: isApiError ? err.message : "Unexpected server error",
  };

  if (isApiError) {
    if (err.code) {
      body.code = err.code;
    }
    if (err.details !== undefined) {
      body.details = err.details;
    }
  }

  // В не‑продакшене отдаем больше диагностической информации
  if (process.env.NODE_ENV !== "production") {
    body.path = req.path;
    body.method = req.method;
    body.timestamp = new Date().toISOString();
    body.stack = err.stack;
  }

  // Логируем всегда чуть подробнее, чем отдаем наружу
  console.error("ErrorHandler:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ...(isApiError
      ? {
          statusCode,
          code: (err as ApiError).code,
          details: (err as ApiError).details,
        }
      : {}),
  });

  return res.status(statusCode).json(body);
}
