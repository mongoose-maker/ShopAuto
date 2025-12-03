import { OrderItemService } from '../../core/Service/OrderItemService.js';
import { AddOrderItemDto } from '../../core/repositories/OrderItem/dto/addOrderItemDto.js';
import { UpdateOrderItemDto } from '../../core/repositories/OrderItem/dto/updateOrderItemDto.js';
export class OrderItemController {
    constructor(orderItemService) {
        this.orderItemService = orderItemService;
    }
    async createOrderItem(req, res) {
        try {
            const { orderId } = req.params;
            if (!orderId) {
                res.status(400).json({ message: 'Order ID is required' });
                return;
            }
            const dto = req.body;
            const newItem = await this.orderItemService.createOrderItem(orderId, dto);
            res.status(201).json(newItem);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getOrderItemById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'Order Item ID is required' });
                return;
            }
            const item = await this.orderItemService.getOrderItemById(id);
            if (!item) {
                res.status(404).json({ message: 'Order item not found' });
                return;
            }
            res.status(200).json(item);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getOrderItemByOrderId(req, res) {
        try {
            const { orderId } = req.params;
            if (!orderId) {
                res.status(400).json({ message: 'Order ID is required' });
                return;
            }
            const item = await this.orderItemService.getOrderItemByOrderId(orderId);
            if (!item) {
                res.status(404).json({ message: 'Order item not found' });
                return;
            }
            res.status(200).json(item);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateOrderItemQuantity(req, res) {
        try {
            const { orderId, productId } = req.params;
            if (!orderId || !productId) {
                res.status(400).json({
                    message: 'Order ID and Product ID are required',
                });
                return;
            }
            const { quantity } = req.body;
            if (!quantity) {
                res.status(400).json({ message: 'Quantity is required' });
                return;
            }
            const updatedItem = await this.orderItemService.updateOrderItemQuantity(orderId, productId, quantity);
            if (!updatedItem) {
                res.status(404).json({ message: 'Order item not found' });
                return;
            }
            res.status(200).json(updatedItem);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateOrderItem(req, res) {
        try {
            const { orderId, productId } = req.params;
            if (!orderId || !productId) {
                res.status(400).json({
                    message: 'Order ID and Product ID are required',
                });
                return;
            }
            const dto = req.body;
            const updatedItem = await this.orderItemService.updateOrderItem(orderId, productId, dto);
            if (!updatedItem) {
                res.status(404).json({ message: 'Order item not found' });
                return;
            }
            res.status(200).json(updatedItem);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async deleteOrderItem(req, res) {
        try {
            const { orderId } = req.params;
            if (!orderId) {
                res.status(400).json({ message: 'Order ID is required' });
                return;
            }
            const success = await this.orderItemService.deleteOrderItem(orderId);
            if (!success) {
                res.status(404).json({ message: 'Order item not found' });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
//# sourceMappingURL=OrderItemController.js.map