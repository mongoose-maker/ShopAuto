import type { Request, Response } from "express";
import { CartItemService } from "../../core/Service/CartItemService.js";
export declare class CartItemController {
    private readonly cartItemService;
    constructor(cartItemService: CartItemService);
    addItem(req: Request, res: Response): Promise<void>;
    updateItem(req: Request, res: Response): Promise<void>;
    getItemList(req: Request, res: Response): Promise<void>;
    removeItem(req: Request, res: Response): Promise<void>;
    clearCart(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=CartItemController.d.ts.map