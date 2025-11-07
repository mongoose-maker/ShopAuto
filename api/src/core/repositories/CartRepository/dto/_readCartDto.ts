import { Product } from "../../../models/Product/Product.js";

export class ReadCartDto {
  constructor(readonly itemList: Product[] = []) {}
}

// Нужно ли нам вообще это дто?
