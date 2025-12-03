import { Model, type Optional } from "sequelize";
import SeqManufacturer from "./SeqManufacturerModel.js";
import SeqCategory from "./SeqCategoryModel.js";
export interface SeqProductAttributes {
    id?: string;
    idProduct: string;
    name: string;
    manufacturerId?: string;
    categoryId?: string;
    description: string;
    price: number;
    availability: boolean;
    rating: number;
}
interface SeqProductCreationAttributes extends Optional<SeqProductAttributes, "id"> {
}
declare class SeqProduct extends Model<SeqProductAttributes, SeqProductCreationAttributes> implements SeqProductAttributes {
    id: string;
    idProduct: string;
    name: string;
    manufacturerId: string;
    categoryId: string;
    description: string;
    price: number;
    availability: boolean;
    rating: number;
    readonly manufacturer?: SeqManufacturer;
    readonly category?: SeqCategory;
}
export default SeqProduct;
//# sourceMappingURL=SeqProductModel.d.ts.map