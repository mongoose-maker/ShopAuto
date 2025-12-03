import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class AddManufacturerDto {
  @IsString({ message: 'The name must be type of string' })
  @IsNotEmpty({ message: 'The name it shouldn`t be is empty' })
  @MinLength(2, { message: 'Min length must be more 2 symbols' })
  readonly name!: string;

  @IsOptional()
  @IsString({ message: 'Discription  must be type of string' })
  readonly descriptionManufacturer?: string | undefined; // ?
}
