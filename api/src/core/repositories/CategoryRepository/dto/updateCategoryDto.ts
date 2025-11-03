import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class UpdateCategoryDto {
  @IsOptional()
  @IsString({ message: "Название должно быть строкой" })
  @IsNotEmpty({ message: "строка не должна быть псутой" })
  @MinLength(2, { message: "Минимальное кол-во смволов в строке: 2" })
  readonly name?: string | undefined;

  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: "Каждый ID продукта должен быть строкой" })
  readonly productsIds?: string[] | undefined;
}
