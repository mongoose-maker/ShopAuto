import { OrderItem } from "../models/Order/OrderItem.js";
import { Order } from "../models/Order/Order.js";
import type { OrderItemRepository } from "../repositories/OrderItem/OrderItemRepository.js";
import type { AddOrderItemDto } from "../repositories/OrderItem/dto/addOrderItemDto.js";
import type { UpdateOrderItemDto } from "../repositories/OrderItem/dto/updateOrderItemDto.js";
import type { ProductRepository } from "../repositories/ProductRepository/ProductRepository.js";
import type { OrderRepository } from "../repositories/OrderRepository/OrderRepository.js";

export class OrderItemService {
  constructor(
    private readonly orderItemRepository: OrderItemRepository,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository
  ) {}

  async createOrderItem(
    orderId: string,
    dto: AddOrderItemDto
  ): Promise<OrderItem> {
    // Проверить существование заказа
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    // Проверить, что заказ еще не завершен
    if (order.status === "delivered") {
      throw new Error("Cannot add items to a delivered order");
    }

    // Проверить существование продукта
    const product = await this.productRepository.getProductById(dto.productId);
    if (!product) {
      throw new Error(`Product with id ${dto.productId} not found`);
    }

    // Использовать цену из DTO или из продукта
    const unitPrice = dto.unitPrice ?? product.price;
    const totalPrice = unitPrice * dto.quantity;

    // Создать элемент заказа
    const orderItem = new OrderItem(
      undefined,
      orderId,
      dto.productId,
      dto.quantity,
      unitPrice,
      totalPrice
    );

    return await this.orderItemRepository.createOrderItem(orderItem);
  }

  async getOrderItemById(id: string): Promise<OrderItem | null> {
    return await this.orderItemRepository.findById(id);
  }

  async getOrderItemByOrderId(orderId: string): Promise<OrderItem | null> {
    return await this.orderItemRepository.findByOrderId(orderId);
  }

  async updateOrderItemQuantity(
    orderId: string,
    productId: string,
    newQuantity: number
  ): Promise<OrderItem | null> {
    // Проверить существование заказа
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    // Проверить, что заказ еще не завершен
    if (order.status === "delivered") {
      throw new Error("Cannot update items in a delivered order");
    }

    // Проверить количество
    if (newQuantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    return await this.orderItemRepository.updateOrderItemQuantity(
      orderId,
      productId,
      newQuantity
    );
  }

  async updateOrderItem(
    orderId: string,
    productId: string,
    dto: UpdateOrderItemDto
  ): Promise<OrderItem | null> {
    // Получить заказ и найти элемент
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    const existingItem = order.items.find(
      (item) => item.productId === productId
    );

    if (!existingItem) {
      // Если элемент не найден, попробуем обновить количество (создаст новый элемент)
      if (dto.quantity !== undefined) {
        return await this.updateOrderItemQuantity(
          orderId,
          productId,
          dto.quantity
        );
      }

      throw new Error(
        `OrderItem with orderId ${orderId} and productId ${productId} not found`
      );
    }

    // Обновить количество, если указано
    if (dto.quantity !== undefined) {
      return await this.updateOrderItemQuantity(
        orderId,
        productId,
        dto.quantity
      );
    }

    // Обновить цену, если указано (это требует обновления всего заказа)
    if (dto.unitPrice !== undefined) {
      const newTotalPrice = dto.unitPrice * existingItem.quantity;

      const updatedItem = new OrderItem(
        existingItem.id,
        existingItem.orderId,
        existingItem.productId,
        existingItem.quantity,
        dto.unitPrice,
        newTotalPrice
      );

      // Обновить заказ с новым элементом
      const order = await this.orderRepository.findById(orderId);
      if (!order) {
        throw new Error(`Order with id ${orderId} not found`);
      }

      // Найти и заменить элемент в заказе
      const updatedItems = order.items.map((item) =>
        item.productId === productId ? updatedItem : item
      );

      // Пересчитать общую сумму заказа
      const newTotalAmount = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      const updatedOrder = new Order(
        order.id,
        order.userId,
        updatedItems,
        order.status,
        newTotalAmount,
        order.shippingAddressId,
        order.cartId
      );

      await this.orderRepository.update(updatedOrder);

      return updatedItem;
    }

    return existingItem;
  }

  async deleteOrderItem(orderId: string): Promise<boolean> {
    // Проверить существование заказа
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    // Проверить, что заказ еще не завершен
    if (order.status === "delivered") {
      throw new Error("Cannot delete items from a delivered order");
    }

    return await this.orderItemRepository.deleteOrderItem(orderId);
  }
}
