import { Model } from "sequelize";
export interface SeqItemAttributes {
    id: string | undefined;
    cartId: string;
    productId: string;
    quantity: number;
    price: number;
}
declare class SeqItem extends Model implements SeqItemAttributes {
    id: string | undefined;
    cartId: string;
    productId: string;
    quantity: number;
    price: number;
}
export default SeqItem;
//# sourceMappingURL=SeqItemRepository.d.ts.map