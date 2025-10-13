import { UserRepository } from "../../../../core/repositories/UserRepository/UserRepository";
import SeqUser from "../SeqModel/SeqUserModel";
import { UserMapper } from "../../Mapper/MapperUser";
import { User } from "../../../../core/models/User/User";
import { UpdateUserDto } from "../../../../core/repositories/UserRepository/dto/updateUserDto";
export class SeqUserRepository {
    async createUser(user) {
        const userData = UserMapper.toPersistence(user);
        const createdUser = await SeqUser.create(userData);
        return UserMapper.toDOmain(createdUser.get({ plain: true }));
    }
    async getUserById(id) {
        const foundUser = await SeqUser.findByPk(id, {
            attributes: { exclude: ["password"] },
            raw: true,
        });
        if (!foundUser) {
            return null;
        }
        return UserMapper.toDOmain(foundUser.get({ plain: true }));
    }
    async updateDataUser(id, dto) {
        const userToUpdate = await SeqUser.findByPk(id);
        if (!userToUpdate) {
            return null;
        }
        const updatedUser = await userToUpdate.update(dto);
        return UserMapper.toDOmain(updatedUser.get({ plain: true }));
    }
    async deleteUser(id) {
        const result = await SeqUser.destroy({ where: { id } });
        return result > 0;
    }
}
//# sourceMappingURL=SeqUserRepository.js.map