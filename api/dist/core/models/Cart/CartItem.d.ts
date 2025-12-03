import { Product } from '../Product/Product.js';
export declare class CartItem {
    readonly id: string | undefined;
    readonly cartId: string;
    readonly productId: string;
    readonly quantity: number;
    readonly product?: Product | undefined;
    constructor(id: string | undefined, cartId: string, productId: string, quantity: number, product?: Product | undefined);
}
//# sourceMappingURL=CartItem.d.ts.map