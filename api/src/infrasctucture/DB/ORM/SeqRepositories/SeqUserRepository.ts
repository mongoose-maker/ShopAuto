import { UserRepository } from "../../../../core/repositories/UserRepository/UserRepository";
import SeqUser from "../SeqModel/SeqUserModel";
import { UserMapper } from "../../Mapper/MapperUser";
import { User } from "../../../../core/models/User/User";
import { UpdateUserDto } from "../../../../core/repositories/UserRepository/dto/updateUserDto";

export class SeqUserRepository implements UserRepository {
  async createUser(user: User): Promise<User | null> {
    const userData = UserMapper.toPersistence(user);
    const createdUser = await SeqUser.create(userData);
    return UserMapper.toDOmain(createdUser.get({ plain: true }));
  }
  async getUserById(id: string): Promise<User | null> {
    const foundUser = await SeqUser.findByPk(id, {
      attributes: { exclude: ["password"] },
      raw: true,
    });
    if (!foundUser) {
      return null;
    }
    return UserMapper.toDOmain(foundUser.get({ plain: true }));
  }
  async updateDataUser(id: string, dto: UpdateUserDto): Promise<User | null> {
    const userToUpdate = await SeqUser.findByPk(id);
    if (!userToUpdate) {
      return null;
    }
    const updatedUser = await userToUpdate.update(dto);
    return UserMapper.toDOmain(updatedUser.get({ plain: true }));
  }
  async deleteUser(id: string): Promise<boolean> {
    const result = await SeqUser.destroy({ where: { id } });
    return result > 0;
  }
}
