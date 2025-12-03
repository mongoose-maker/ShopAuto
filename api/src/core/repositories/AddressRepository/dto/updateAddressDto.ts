import { IsString, IsNotEmpty, Length, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString({ message: 'Country must be a string' })
  @IsNotEmpty({ message: 'Country cannot be empty' })
  @Length(2, 50, { message: 'Country must be between 2 and 50 characters' })
  readonly country?: string;

  @IsOptional()
  @IsString({ message: 'City must be a string' })
  @IsNotEmpty({ message: 'City cannot be empty' })
  @Length(2, 50, { message: 'City must be between 2 and 50 characters' })
  readonly city?: string;

  @IsOptional()
  @IsString({ message: 'Street must be a string' })
  @IsNotEmpty({ message: 'Street cannot be empty' })
  @Length(2, 100, { message: 'Street must be between 2 and 100 characters' })
  readonly street?: string;

  @IsOptional()
  @IsNumber({}, { message: 'House number must be a number' })
  @Min(1, { message: 'House number must be at least 1' })
  @Max(9999, { message: 'House number cannot exceed 9999' })
  readonly houseNumber?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Apartment number must be a number' })
  @Min(1, { message: 'Apartment number must be at least 1' })
  @Max(9999, { message: 'Apartment number cannot exceed 9999' })
  readonly numberOfApartment?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Postcode must be a number' })
  @Min(2, { message: 'Postcode must be at least 5 digits' })
  @Max(6, { message: 'Postcode cannot exceed 6 digits' })
  readonly postcode?: number;
}
