import { IsNumber, Min } from 'class-validator';

export class UpdateItemDto {
  @IsNumber({}, { message: 'количество должно быть числом' })
  @Min(1, { message: 'Минимальное количество: 1' })
  readonly quantity?: number;
}
