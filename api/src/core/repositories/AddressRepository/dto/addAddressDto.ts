import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
  Matches,
} from "class-validator";

export class AddAddressDto {
  @IsUUID("4", { message: "User ID must be a valid UUID" })
  @IsNotEmpty({
    message: "ID пользователя не может быть пуст/User Id can not be is empty",
  })
  readonly userId!: string;

  @IsString({ message: "Country must be a string" })
  @IsNotEmpty({ message: "Country can not be is empty" })
  readonly country!: string;

  @IsString({ message: "city must be a string" })
  @IsNotEmpty({ message: "city can not be is empty" })
  readonly city!: string;

  @IsString({ message: "street must be a string" })
  @IsNotEmpty({ message: "street can not be is empty" })
  readonly street!: string;

  @IsNumber({}, { message: "houseNumber must be a number" })
  @IsNotEmpty({ message: "houseNumber can not be is empty" })
  readonly houseNumber!: number;

  @IsNumber({}, { message: "numberOfApartment must be a number" })
  @IsNotEmpty({ message: "numberOfApartment can not be is empty" })
  readonly numberOfApartment!: number | null;

  @IsNumber({}, { message: "postcode must be a number" })
  @IsNotEmpty({ message: "postcode can not be is empty" })
  @Min(2)
  @Max(9)
  @Matches(/^\d{5,10}$/, { message: "Postal code must be 5-10 digits" })
  readonly postcode!: number;
}
