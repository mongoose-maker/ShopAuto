import { Product } from "../../models/Product/Product.js";
import { AddProductDto } from "./dto/addProductDto.js";
import { UpdateProductDto } from "./dto/updateProductDto.js";

export interface ProductRepository {
  addProduct(dto: AddProductDto): Product;
  getAllProduct(): Product;
  GetByArticle(idProduct: string): Product;
  GetByName(name: string): Product;
  updateProduct(dto: UpdateProductDto): Product;
  statusAvailability(dto: UpdateProductDto): Product;
  deleteProduct(idProduct: string): Product;
}
