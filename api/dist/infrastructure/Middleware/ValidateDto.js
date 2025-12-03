import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
export function validateDto(dtoClass) {
    return async (req, res, next) => {
        const dto = plainToInstance(dtoClass, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.map((err) => ({
                    property: err.property,
                    constraints: err.constraints,
                })),
            });
        }
        req.body = dto;
        next();
    };
}
//# sourceMappingURL=ValidateDto.js.map