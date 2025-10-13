import { Category } from "../Category/Category";
export class Product {
    id;
    idProduct;
    name;
    manufacturer;
    category;
    description;
    price;
    availability;
    reviews;
    rating;
    constructor(id, idProduct, name, manufacturer, category, description, // Text ?
    price, availability, reviews, rating) {
        this.id = id;
        this.idProduct = idProduct;
        this.name = name;
        this.manufacturer = manufacturer;
        this.category = category;
        this.description = description;
        this.price = price;
        this.availability = availability;
        this.reviews = reviews;
        this.rating = rating;
    }
}
//# sourceMappingURL=Product.js.map