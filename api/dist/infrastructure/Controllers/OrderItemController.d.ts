import type { Request, Response } from "express";
import { OrderItemService } from "../../core/Service/OrderItemService.js";
export declare class OrderItemController {
    private readonly orderItemService;
    constructor(orderItemService: OrderItemService);
    createOrderItem(req: Request, res: Response): Promise<void>;
    getOrderItemById(req: Request, res: Response): Promise<void>;
    getOrderItemByOrderId(req: Request, res: Response): Promise<void>;
    updateOrderItemQuantity(req: Request, res: Response): Promise<void>;
    updateOrderItem(req: Request, res: Response): Promise<void>;
    deleteOrderItem(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=OrderItemController.d.ts.map