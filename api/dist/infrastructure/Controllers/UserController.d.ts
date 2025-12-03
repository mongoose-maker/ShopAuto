import type { Request, Response } from 'express';
import { UserService } from '../../core/Service/UserService.js';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(req: Request, res: Response): Promise<void>;
    getUserById(req: Request, res: Response): Promise<void>;
    updateDataUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=UserController.d.ts.map