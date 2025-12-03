import { Model, type Optional } from "sequelize";
export interface SeqCartAttributes {
    id: string;
    userId: string;
}
type SeqCartCreationAttributes = Optional<SeqCartAttributes, "id">;
declare class SeqCart extends Model<SeqCartAttributes, SeqCartCreationAttributes> implements SeqCartAttributes {
    id: string;
    userId: string;
}
export default SeqCart;
//# sourceMappingURL=SeqCartModel.d.ts.map