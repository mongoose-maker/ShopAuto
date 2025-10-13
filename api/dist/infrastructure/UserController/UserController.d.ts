import { Request, Response, NextFunction } from "express";
import { UserService } from "../../core/Service/UserService.ts";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateDataUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=UserController.d.ts.map