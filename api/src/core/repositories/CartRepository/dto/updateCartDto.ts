import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateItemDto } from '../../CartItem/dto/updateItemDto.js';

export class UpdateCartDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateItemDto)
  readonly items?: UpdateItemDto[];
}
