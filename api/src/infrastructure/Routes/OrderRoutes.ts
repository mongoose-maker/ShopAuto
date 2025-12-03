import { Router } from "express";
import { OrderController } from "../Controllers/OrderController.js";
import { validateDto } from "../Middleware/ValidateDto.js";
import { AddOrderDto } from "../../core/repositories/OrderRepository/dto/addOrderDto.js";
import { UpdateOrderDto } from "../../core/repositories/OrderRepository/dto/updateOrderDto.js";

export function createOrderRouter(controller: OrderController): Router {
  const router = Router();

  router.post(
    "/orders",
    validateDto(AddOrderDto),
    controller.createOrder.bind(controller)
  );

  router.get("/orders/:id", controller.getOrderById.bind(controller));

  router.get(
    "/users/:userId/orders",
    controller.getOrdersByUserId.bind(controller)
  );

  router.put(
    "/orders/:id",
    validateDto(UpdateOrderDto),
    controller.updateOrder.bind(controller)
  );

  router.patch(
    "/orders/:id/status",
    controller.updateOrderStatus.bind(controller)
  );

  router.delete("/orders/:id", controller.deleteOrder.bind(controller));

  return router;
}
