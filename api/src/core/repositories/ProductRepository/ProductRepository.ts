import { Product } from "../../models/Product/Product.js";
import { UpdateProductDto } from "./dto/updateProductDto.js";

export interface ProductRepository {
  addProduct(product: Product): Promise<Product>;
  getAllProduct(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductByArticle(idProduct: string): Promise<Product | null>;
  updateProduct(id: string, dto: UpdateProductDto): Promise<Product | null>;
  statusAvailability(id: string, isAvailable: boolean): Promise<Product | null>; // ?
  deleteProduct(id: string): Promise<boolean>;
}
