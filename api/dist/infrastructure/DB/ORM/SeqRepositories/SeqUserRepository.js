import SeqUser from "../SeqModel/SeqUserModel.js";
import { UserMapper } from "../../Mapper/MapperUser.js";
import { User } from "../../../../core/models/User/User.js";
import { UpdateUserDto } from "../../../../core/repositories/UserRepository/dto/updateUserDto.js"; //
export class SeqUserRepository {
    async createUser(user) {
        const userData = UserMapper.toPersistence(user);
        const createdUser = await SeqUser.create(userData);
        return UserMapper.toDomain(createdUser.get({ plain: true }));
    }
    async getUserById(id) {
        const foundUser = await SeqUser.findByPk(id, {
            attributes: { exclude: ["password"] },
            raw: true,
        });
        if (!foundUser) {
            return null;
        }
        // При raw: true результат уже plain object, не нужно вызывать .get()
        return UserMapper.toDomain(foundUser);
    }
    async updateDataUser(id, dto) {
        const userToUpdate = await SeqUser.findByPk(id);
        if (!userToUpdate) {
            return null;
        }
        const updatedUser = await userToUpdate.update(dto);
        return UserMapper.toDomain(updatedUser.get({ plain: true }));
    }
    async deleteUser(id) {
        const result = await SeqUser.destroy({ where: { id } });
        return result > 0;
    }
}
//# sourceMappingURL=SeqUserRepository.js.map