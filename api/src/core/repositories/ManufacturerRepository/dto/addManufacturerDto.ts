import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Product } from "../../../models/Product/Product.js";

export class AddManufacturerDto {
  @IsString({ message: "The name is must be type of string" })
  @IsNotEmpty({ message: "The name it shouldnt be is empty" })
  @MinLength(2, { message: " Min length must be more 2 symbols" })
  readonly name!: string;

  @IsString({ message: "The discription is must be type of string" })
  @IsOptional()
  readonly descriptionManufacturer?: string; // ?
}
