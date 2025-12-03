import { User } from '../models/User/User.js';

import { AddUserDto } from '../repositories/UserRepository/dto/addUserDto.js';
import { UpdateUserDto } from '../repositories/UserRepository/dto/updateUserDto.js';
import type { UserRepository } from '../repositories/UserRepository/UserRepository.js';
import bcrypt from 'bcrypt';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: AddUserDto): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const userToCreate = new User(undefined, dto.name, dto.email, hashedPassword);
    const createdUser = await this.userRepository.createUser(userToCreate);
    return createdUser;
  }
  async getUserById(id: string): Promise<User | null> {
    const foundUser = await this.userRepository.getUserById(id);
    return foundUser;
  }
  async updateDataUser(id: string, dto: UpdateUserDto): Promise<User | null> {
    const dataToUpdate: Partial<UpdateUserDto> = {};

    if (dto.name !== undefined) {
      dataToUpdate.name = dto.name;
    }
    if (dto.email !== undefined) {
      dataToUpdate.email = dto.email;
    }
    if (dto.password !== undefined) {
      dataToUpdate.password = await bcrypt.hash(dto.password, 10);
    }
    if (Object.keys(dataToUpdate).length === 0) {
      return this.userRepository.getUserById(id);
    }
    return this.userRepository.updateDataUser(id, dataToUpdate);
  }
  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.deleteUser(id);
  }
}
