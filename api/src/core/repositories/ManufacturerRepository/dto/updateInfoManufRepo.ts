import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateInfoManufacturerDto {
  @IsOptional()
  @IsString({ message: "name must be a string" })
  @IsNotEmpty({ message: "The name it shouldn`t be is empty" })
  @MinLength(2, { message: " Min length must be more 2 symbols" })
  readonly name?: string | undefined;

  @IsOptional()
  @IsString({ message: "description must be a string" })
  readonly descriptionManufacturer?: string | undefined;
}
