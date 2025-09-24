import { User } from "../../../models/User/User";

export class UpdateUserDto {
  constructor(
    readonly name?: string,
    readonly email?: string,
    readonly password?: string
  ) {}
}
