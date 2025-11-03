import { IsString, IsArray } from "class-validator";

export class UpdateManufacturerDto {
  @IsArray()
  @IsString({ each: true, message: "Каждый ID продукта должен быть строкой" })
  readonly productsIds?: string[] | undefined;
}
