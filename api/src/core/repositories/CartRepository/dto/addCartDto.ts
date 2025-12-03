import { IsUUID, IsNotEmpty } from 'class-validator';

export class AddCartDto {
  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  @IsNotEmpty({ message: 'User ID is required' })
  readonly userId!: string;
}
