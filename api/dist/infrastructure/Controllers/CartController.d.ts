import type { Request, Response } from "express";
import { CartService } from "../../core/Service/CartService.js";
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCartByUserId(req: Request, res: Response): Promise<void>;
    addItemToCart(req: Request, res: Response): Promise<void>;
    updateItemInCart(req: Request, res: Response): Promise<void>;
    removeItemFromCart(req: Request, res: Response): Promise<void>;
    clearCart(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=CartController.d.ts.map