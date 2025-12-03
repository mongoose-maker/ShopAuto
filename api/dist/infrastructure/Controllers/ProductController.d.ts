import type { Request, Response } from 'express';
import { ProductService } from '../../core/Service/ProductService.js';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    addProduct(req: Request, res: Response): Promise<void>;
    getProductById(req: Request, res: Response): Promise<void>;
    getProductByArticle(req: Request, res: Response): Promise<void>;
    updateProduct(req: Request, res: Response): Promise<void>;
    deleteProduct(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=ProductController.d.ts.map