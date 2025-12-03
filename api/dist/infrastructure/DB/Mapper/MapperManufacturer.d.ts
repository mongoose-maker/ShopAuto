import { Manufacturer } from '../../../core/models/Manufacturer/Manufacturer.js';
import type { SeqManufacturerAttributes } from '../ORM/SeqModel/SeqManufacturerModel.js';
import { type SeqProductWithRelations } from './MapperProduct.js';
export type SeqManufacturerWithProducts = SeqManufacturerAttributes & {
    products?: SeqProductWithRelations[];
};
export declare class ManufacturerMapper {
    static toDomain(raw: SeqManufacturerWithProducts): Manufacturer;
    static toPersistence(manufacturer: Manufacturer): any;
}
//# sourceMappingURL=MapperManufacturer.d.ts.map