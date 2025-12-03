import type { Request, Response } from "express";
import { OrderService } from "../../core/Service/OrderService.js";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(req: Request, res: Response): Promise<void>;
    getOrderById(req: Request, res: Response): Promise<void>;
    getOrdersByUserId(req: Request, res: Response): Promise<void>;
    updateOrderStatus(req: Request, res: Response): Promise<void>;
    updateOrder(req: Request, res: Response): Promise<void>;
    deleteOrder(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=OrderController.d.ts.map