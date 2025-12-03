import { OrderService } from '../../core/Service/OrderService.js';
import { AddOrderDto } from '../../core/repositories/OrderRepository/dto/addOrderDto.js';
import { UpdateOrderDto } from '../../core/repositories/OrderRepository/dto/updateOrderDto.js';
export class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(req, res) {
        try {
            const dto = req.body;
            const newOrder = await this.orderService.createOrder(dto);
            res.status(201).json(newOrder);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'Order ID is required' });
                return;
            }
            const order = await this.orderService.getOrderById(id);
            if (!order) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            res.status(200).json(order);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getOrdersByUserId(req, res) {
        try {
            const { userId } = req.params;
            if (!userId) {
                res.status(400).json({ message: 'User ID is required' });
                return;
            }
            const orders = await this.orderService.getOrdersByUserId(userId);
            res.status(200).json(orders);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'Order ID is required' });
                return;
            }
            const { status } = req.body;
            if (!status) {
                res.status(400).json({ message: 'Status is required' });
                return;
            }
            const order = await this.orderService.updateOrderStatus(id, status);
            res.status(200).json(order);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateOrder(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'Order ID is required' });
                return;
            }
            const dto = { ...req.body, orderId: id };
            const updatedOrder = await this.orderService.updateOrder(dto);
            if (!updatedOrder) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            res.status(200).json(updatedOrder);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'Order ID is required' });
                return;
            }
            await this.orderService.deleteOrder(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
//# sourceMappingURL=OrderController.js.map