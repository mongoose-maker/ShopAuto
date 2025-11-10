import type { UserRepository } from "../../../../core/repositories/UserRepository/UserRepository.js";
import SeqUser from "../SeqModel/SeqUserModel.js";
import type { SeqUserAttributes } from "../SeqModel/SeqUserModel.js";
import { UserMapper } from "../../Mapper/MapperUser.js";
import { User } from "../../../../core/models/User/User.js";
import { UpdateUserDto } from "../../../../core/repositories/UserRepository/dto/updateUserDto.js"; //

export class SeqUserRepository implements UserRepository {
  async createUser(user: User): Promise<User | null> {
    const userData = UserMapper.toPersistence(user);
    const createdUser = await SeqUser.create(userData);
    return UserMapper.toDomain(createdUser.get({ plain: true }));
  }
  async getUserById(id: string): Promise<User | null> {
    const foundUser = await SeqUser.findByPk(id, {
      attributes: { exclude: ["password"] },
      raw: true,
    });
    if (!foundUser) {
      return null;
    }
    // При raw: true результат уже plain object, не нужно вызывать .get()
    return UserMapper.toDomain(foundUser as SeqUserAttributes);
  }
  async updateDataUser(id: string, dto: UpdateUserDto): Promise<User | null> {
    const userToUpdate = await SeqUser.findByPk(id);
    if (!userToUpdate) {
      return null;
    }
    const updatedUser = await userToUpdate.update(dto);
    return UserMapper.toDomain(updatedUser.get({ plain: true }));
  }
  async deleteUser(id: string): Promise<boolean> {
    const result = await SeqUser.destroy({ where: { id } });
    return result > 0;
  }
}
