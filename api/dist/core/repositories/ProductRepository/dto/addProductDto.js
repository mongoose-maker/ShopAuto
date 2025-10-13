export class AddProductDto {
    id;
    name;
    manufacturer;
    category;
    subCategory;
    compatibility;
    description;
    availability;
    price;
    constructor(id, name, manufacturer, category, subCategory, compatibility, description, availability, price) {
        this.id = id;
        this.name = name;
        this.manufacturer = manufacturer;
        this.category = category;
        this.subCategory = subCategory;
        this.compatibility = compatibility;
        this.description = description;
        this.availability = availability;
        this.price = price;
    }
}
//# sourceMappingURL=addProductDto.js.map