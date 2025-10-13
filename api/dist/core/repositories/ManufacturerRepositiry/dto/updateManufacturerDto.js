import { Product } from "../../../models/Product/Product";
export class updateManufacturerDto {
    name;
    descriptionManufacturer;
    productByManufacturer;
    constructor(name, descriptionManufacturer, productByManufacturer = []) {
        this.name = name;
        this.descriptionManufacturer = descriptionManufacturer;
        this.productByManufacturer = productByManufacturer;
    }
}
//# sourceMappingURL=updateManufacturerDto.js.map