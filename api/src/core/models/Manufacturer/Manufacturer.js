import { Product } from "../Product/Product";
export class Manufacturer {
    id;
    name;
    productByManufacturer;
    constructor(id, name, productByManufacturer = [] // надо ли ?
    ) {
        this.id = id;
        this.name = name;
        this.productByManufacturer = productByManufacturer;
    } // ?
}
//# sourceMappingURL=Manufacturer.js.map