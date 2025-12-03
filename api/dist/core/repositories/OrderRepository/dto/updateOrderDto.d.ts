import { ORDER_STATUSES } from '../../../models/Order/Order.js';
export declare class UpdateOrderDto {
    readonly orderId: string;
    readonly status: (typeof ORDER_STATUSES)[number];
    readonly addressId?: string;
}
//# sourceMappingURL=updateOrderDto.d.ts.map