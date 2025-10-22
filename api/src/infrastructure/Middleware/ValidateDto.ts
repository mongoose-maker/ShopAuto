import type { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { ClassConstructor } from "class-transformer";

export function validateDto(dtoClass: ClassConstructor<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json({
        message: "Error validation",
        errors: errors,
      });
    }
    req.body = dto;
    next();
  };
}
