import { type ClassConstructor } from "class-transformer";
import type { NextFunction, Request, Response } from "express";
export declare function validateDto(dtoClass: ClassConstructor<any>): (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=ValidateDto.d.ts.map