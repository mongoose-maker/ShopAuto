import { Order } from "../../models/Order/Order.js";
import { AddOrderDto } from "./dto/addOrderDto.js";

export interface OrderRepository {
  addOrder(id: string): Order;
  toCheckout(dto: AddOrderDto): Order;
}
