import { Model, type HasManyAddAssociationMixin, type HasManyGetAssociationsMixin, type HasManySetAssociationsMixin } from 'sequelize';
import SeqProduct from './SeqProductModel.js';
export interface SeqCategoryAttributes {
    id?: string | undefined;
    name: string;
}
declare class SeqCategory extends Model<SeqCategoryAttributes> implements SeqCategoryAttributes {
    id?: string | undefined;
    name: string;
    readonly products?: InstanceType<typeof SeqProduct>;
    getProducts: HasManyGetAssociationsMixin<SeqProduct>;
    setProducts: HasManySetAssociationsMixin<SeqProduct, string>;
    addProducts: HasManyAddAssociationMixin<SeqProduct, string>;
}
export default SeqCategory;
//# sourceMappingURL=SeqCategoryModel.d.ts.map