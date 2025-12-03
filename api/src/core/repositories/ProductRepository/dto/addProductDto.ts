import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsBoolean,
  IsOptional,
  Min,
  Max,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddProductDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name cannot exceed 100 characters' })
  readonly name!: string;

  @IsUUID('4', { message: 'Manufacturer ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Manufacturer ID is required' })
  readonly manufacturerId!: string;

  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Category ID is required' })
  readonly categoryId!: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(1000, { message: 'Description cannot exceed 1000 characters' })
  readonly description!: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be positive' })
  @Min(0.01, { message: 'Price must be at least 0.01' })
  @Max(1000000, { message: 'Price cannot exceed 1,000,000' })
  readonly price!: number;

  @IsBoolean({ message: 'Availability must be a boolean' })
  readonly availability!: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(0, { message: 'Rating cannot be less than 0' })
  @Max(5, { message: 'Rating cannot exceed 5' })
  readonly rating?: number;
}
