import { Product } from "../../models/Product/Product.js";
import { AddProductDto } from "./dto/addProductDto.js";
import { UpdateProductDto } from "./dto/updateProductDto.js";

export interface ProductRepository {
  addProduct(product: Product): Promise<Product>;
  getAllProduct(): Promise<Product>;
  GetByArticle(idProduct: string): Promise<Product>;
  GetByName(name: string): Promise<Product>;
  updateProduct(dto: UpdateProductDto): Promise<Product>;
  statusAvailability(dto: UpdateProductDto): Promise<Product>;
  deleteProduct(idProduct: string): Promise<Product>;
}
