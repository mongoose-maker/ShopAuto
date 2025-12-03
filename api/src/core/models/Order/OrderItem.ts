export class OrderItem {
  constructor(
    readonly id: string | undefined,
    readonly orderId: string | undefined,
    readonly productId: string,
    readonly quantity: number,
    readonly unitPrice: number,
    readonly totalPrice: number,
  ) {}
}
