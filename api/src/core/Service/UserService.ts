import { User } from "../models/User/User";
import { AddUserDto } from "../repositories/UserRepository/dto/addUserDto";
import { UpdateUserDto } from "../repositories/UserRepository/dto/updateUserDto";
import { UserRepository } from "../repositories/UserRepository/UserRepository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: AddUserDto): Promise<User | null> {
    const userToCreate = new User(undefined, dto.name, dto.email, dto.password);
    const createdUser = await this.userRepository.createUser(userToCreate);
    return createdUser;
  }
  async getUserById(id: string): Promise<User | null> {
    const foundUser = await this.userRepository.getUserById(id);
    return foundUser;
  }
  async updateDataUser(id: string, dto: UpdateUserDto): Promise<User | null> {
    const updatedUser = await this.userRepository.updateDataUser(id, dto);
    return updatedUser;
  }
  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.deleteUser(id);
  }
}
