import { Product } from "../../models/Product/Product";
import { AddProductDto } from "./dto/addProductDto";
import { UpdateProductDto } from "./dto/updateProductDto";

export interface ProductRepository {
  addProduct(dto: AddProductDto): Product;
  getAllProduct(): Product;
  GetByArticle(idProduct: string): Product;
  GetByName(name: string): Product;
  updateProduct(dto: UpdateProductDto): Product;
  statusAvailability(dto: UpdateProductDto): Product;
  deleteProduct(idProduct: string): Product;
}
