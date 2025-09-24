import { Product } from "../../../models/Product/Product";

export class ReadCartDto {
  constructor(readonly itemList: Product[] = []) {}
}
