export declare class AddOrderItemDto {
    readonly productId: string;
    readonly quantity: number;
    readonly unitPrice: number;
}
export declare class AddOrderDto {
    readonly userId: string;
    readonly items: AddOrderItemDto[];
    readonly totalAmount: number;
    readonly addressId?: string;
    readonly cartId?: string;
}
//# sourceMappingURL=addOrderDto.d.ts.map