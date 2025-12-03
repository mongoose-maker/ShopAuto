import { Router } from 'express';
import { OrderItemController } from '../Controllers/OrderItemController.js';
import { validateDto } from '../Middleware/ValidateDto.js';
import { AddOrderItemDto } from '../../core//repositories/OrderItem/dto/addOrderItemDto.js';
import { UpdateOrderItemDto } from '../../core/repositories/OrderItem/dto/updateOrderItemDto.js';

export function createOrderItemRouter(controller: OrderItemController): Router {
  const router = Router();

  router.post(
    '/order-items',
    validateDto(AddOrderItemDto),
    controller.createOrderItem.bind(controller),
  );

  router.get('/order-items/:id', controller.getOrderItemById.bind(controller));

  router.get('/orders/:orderId/order-items', controller.getOrderItemByOrderId.bind(controller));

  router.put(
    '/order-items/:id',
    validateDto(UpdateOrderItemDto),
    controller.updateOrderItem.bind(controller),
  );

  router.patch('/order-items/:id/quantity', controller.updateOrderItemQuantity.bind(controller));

  router.delete('/order-items/:id', controller.deleteOrderItem.bind(controller));

  return router;
}
