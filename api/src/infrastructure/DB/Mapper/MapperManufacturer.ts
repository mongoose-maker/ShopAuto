import { Manufacturer } from "../../../core/models/Manufacturer/Manufacturer.js";
import type { SeqManufacturerAttributes } from "../ORM/SeqModel/SeqManufacturerModel.js";
import {
  ProductMapper,
  type SeqProductWithRelations,
} from "./MapperProduct.js";

export type SeqManufacturerWithProducts = SeqManufacturerAttributes & {
  products?: SeqProductWithRelations[];
};

export class ManufacturerMapper {
  static toDomain(raw: SeqManufacturerWithProducts): Manufacturer {
    const products = raw.products
      ? raw.products.map(ProductMapper.toDomain)
      : [];
    return new Manufacturer(
      raw.id,
      raw.name,
      raw.descriptionManufacturer,
      products
    );
  }
  static toPersistence(manufacturer: Manufacturer): any {
    return {
      id: manufacturer.id,
      name: manufacturer.name,
      descriptionManufacturer: manufacturer.descriptionManufacturer,
    };
  }
}
