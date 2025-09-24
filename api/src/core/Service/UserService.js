import { User } from "../models/User/User";
import { AddUserDto } from "../repositories/UserRepository/dto/addUserDto";
import { UpdateUserDto } from "../repositories/UserRepository/dto/updateUserDto";
import { UserRepository } from "../repositories/UserRepository/UserRepository";
export class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(dto) {
        const userToCreate = new User(undefined, dto.name, dto.email, dto.password);
        const createdUser = await this.userRepository.createUser(userToCreate);
        return createdUser;
    }
    async getUserById(id) {
        const foundUser = await this.userRepository.getUserById(id);
        return foundUser;
    }
    async updateDataUser(id, dto) {
        const updatedUser = await this.userRepository.updateDataUser(id, dto);
        return updatedUser;
    }
    async deleteUser(id) {
        return this.userRepository.deleteUser(id);
    }
}
//# sourceMappingURL=UserService.js.map