import type { Category } from "../../../models/Category/Category.js";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  Max,
  IsBoolean,
  IsOptional,
  MaxLength,
} from "class-validator";
import type { Manufacturer } from "../../../models/Manufacturer/Manufacturer.js";

export class AddProductDto {
  constructor(
    readonly id: undefined | string,
    readonly idProduct: undefined | string,
    readonly name: string,
    readonly manufacturerId: Manufacturer,
    readonly categoryId: Category,
    readonly description: string,
    readonly price: number,
    readonly availability: boolean,
    readonly reviews: string,
    readonly rating: number
  ) {}
}
