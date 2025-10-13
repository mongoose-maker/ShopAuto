import { Product } from "../../../models/Product/Product.js";

export class ReadCartDto {
  constructor(readonly itemList: Product[] = []) {}
}
