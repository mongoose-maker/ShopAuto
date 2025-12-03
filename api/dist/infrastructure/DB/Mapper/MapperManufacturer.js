import { Manufacturer } from "../../../core/models/Manufacturer/Manufacturer.js";
import { ProductMapper, } from "./MapperProduct.js";
export class ManufacturerMapper {
    static toDomain(raw) {
        const products = raw.products
            ? raw.products.map(ProductMapper.toDomain)
            : [];
        return new Manufacturer(raw.id?.toString(), raw.name, raw.descriptionManufacturer);
    }
    static toPersistence(manufacturer) {
        return {
            id: manufacturer.id,
            name: manufacturer.name,
            descriptionManufacturer: manufacturer.descriptionManufacturer,
        };
    }
}
//# sourceMappingURL=MapperManufacturer.js.map