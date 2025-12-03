import { OrderItem } from '../models/Order/OrderItem.js';
import { Order } from '../models/Order/Order.js';
import type { OrderItemRepository } from '../repositories/OrderItem/OrderItemRepository.js';
import type { AddOrderItemDto } from '../repositories/OrderItem/dto/addOrderItemDto.js';
import type { UpdateOrderItemDto } from '../repositories/OrderItem/dto/updateOrderItemDto.js';
import type { ProductRepository } from '../repositories/ProductRepository/ProductRepository.js';
import type { OrderRepository } from '../repositories/OrderRepository/OrderRepository.js';

export class OrderItemService {
  constructor(
    private readonly orderItemRepository: OrderItemRepository,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrderItem(orderId: string, dto: AddOrderItemDto): Promise<OrderItem> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    if (order.status === 'delivered') {
      throw new Error('Cannot add items to a delivered order');
    }
    const product = await this.productRepository.getProductById(dto.productId);
    if (!product) {
      throw new Error(`Product with id ${dto.productId} not found`);
    }

    const unitPrice = dto.unitPrice ?? product.price;
    const totalPrice = unitPrice * dto.quantity;

    const orderItem = new OrderItem(
      undefined,
      orderId,
      dto.productId,
      dto.quantity,
      unitPrice,
      totalPrice,
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
    newQuantity: number,
  ): Promise<OrderItem | null> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    if (order.status === 'delivered') {
      throw new Error('Cannot update items in a delivered order');
    }

    if (newQuantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    return await this.orderItemRepository.updateOrderItemQuantity(orderId, productId, newQuantity);
  }

  async updateOrderItem(
    orderId: string,
    productId: string,
    dto: UpdateOrderItemDto,
  ): Promise<OrderItem | null> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    const existingItem = order.items.find(item => item.productId === productId);

    if (!existingItem) {
      if (dto.quantity !== undefined) {
        return await this.updateOrderItemQuantity(orderId, productId, dto.quantity);
      }

      throw new Error(`OrderItem with orderId ${orderId} and productId ${productId} not found`);
    }

    if (dto.quantity !== undefined) {
      return await this.updateOrderItemQuantity(orderId, productId, dto.quantity);
    }
    if (dto.unitPrice !== undefined) {
      const newTotalPrice = dto.unitPrice * existingItem.quantity;

      const updatedItem = new OrderItem(
        existingItem.id,
        existingItem.orderId,
        existingItem.productId,
        existingItem.quantity,
        dto.unitPrice,
        newTotalPrice,
      );

      const order = await this.orderRepository.findById(orderId);
      if (!order) {
        throw new Error(`Order with id ${orderId} not found`);
      }

      const updatedItems = order.items.map(item =>
        item.productId === productId ? updatedItem : item,
      );

      const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

      const updatedOrder = new Order(
        order.id,
        order.userId,
        updatedItems,
        order.status,
        newTotalAmount,
        order.shippingAddressId,
        order.cartId,
      );

      await this.orderRepository.update(updatedOrder);

      return updatedItem;
    }

    return existingItem;
  }

  async deleteOrderItem(orderId: string): Promise<boolean> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    if (order.status === 'delivered') {
      throw new Error('Cannot delete items from a delivered order');
    }

    return await this.orderItemRepository.deleteOrderItem(orderId);
  }
}
