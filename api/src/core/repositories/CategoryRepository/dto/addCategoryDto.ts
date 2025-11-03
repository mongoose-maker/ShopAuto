import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Product } from "../../../models/Product/Product.js";

export class AddCategoryDto {
  @IsString({ message: "название должно быть строкой" })
  @IsNotEmpty({ message: "название не должно быть пустой строкой" })
  @MinLength(2, { message: "Минимальное кол-во символов: 2 " })
  readonly name!: string;
}
