import { Product } from "../../../models/Product/Product";
export class AddManufacturerDto {
    id;
    name;
    descriptionManufacturer;
    productByManufacturer;
    constructor(id, name, descriptionManufacturer, // ?
    productByManufacturer) {
        this.id = id;
        this.name = name;
        this.descriptionManufacturer = descriptionManufacturer;
        this.productByManufacturer = productByManufacturer;
    }
}
//# sourceMappingURL=addManufacturerDto.js.map