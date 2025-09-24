import { User } from "../../models/User/User";
import { UpdateUserDto } from "./dto/updateUserDto";

export interface UserRepository {
  createUser(user: User): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  updateDataUser(id: string, dto: UpdateUserDto): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
