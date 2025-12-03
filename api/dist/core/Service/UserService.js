import { User } from "../models/User/User.js";
import { AddUserDto } from "../repositories/UserRepository/dto/addUserDto.js";
import { UpdateUserDto } from "../repositories/UserRepository/dto/updateUserDto.js";
import bcrypt from "bcrypt";
export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const userToCreate = new User(undefined, dto.name, dto.email, hashedPassword); // а как сделать так чтобы при создании аккаунта пользовать мог указывать либо name либо email?
        const createdUser = await this.userRepository.createUser(userToCreate);
        return createdUser;
    }
    async getUserById(id) {
        const foundUser = await this.userRepository.getUserById(id);
        return foundUser;
    }
    async updateDataUser(id, dto) {
        const dataToUpdate = {};
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
    async deleteUser(id) {
        return this.userRepository.deleteUser(id);
    }
}
//# sourceMappingURL=UserService.js.map