import { Model, type HasManyAddAssociationMixin, type HasManyGetAssociationsMixin, type HasManySetAssociationsMixin } from 'sequelize';
import SeqProduct from './SeqProductModel.js';
export interface SeqManufacturerAttributes {
    id: undefined | string;
    name: string;
    descriptionManufacturer: string;
}
declare class SeqManufacturer extends Model<SeqManufacturerAttributes> implements SeqManufacturerAttributes {
    id: undefined | string;
    name: string;
    descriptionManufacturer: string;
    readonly products?: InstanceType<typeof SeqProduct>;
    getProducts: HasManyGetAssociationsMixin<SeqProduct>;
    setProducts: HasManySetAssociationsMixin<SeqProduct, string>;
    addProduct: HasManyAddAssociationMixin<SeqProduct, string>;
}
export default SeqManufacturer;
//# sourceMappingURL=SeqManufacturerModel.d.ts.map