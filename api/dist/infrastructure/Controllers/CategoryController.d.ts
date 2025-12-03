import type { Request, Response } from "express";
import { CategoryService } from "../../core/Service/CategoryService.js";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    addCategory(req: Request, res: Response): Promise<void>;
    getAllCategory(req: Request, res: Response): Promise<void>;
    getCategoryById(req: Request, res: Response): Promise<void>;
    updateCategory(req: Request, res: Response): Promise<void>;
    deleteCategory(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=CategoryController.d.ts.map