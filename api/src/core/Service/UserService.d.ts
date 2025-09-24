import { User } from "../models/User/User";
import { AddUserDto } from "../repositories/UserRepository/dto/addUserDto";
import { UpdateUserDto } from "../repositories/UserRepository/dto/updateUserDto";
import { UserRepository } from "../repositories/UserRepository/UserRepository";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createUser(dto: AddUserDto): Promise<User | null>;
    getUserById(id: string): Promise<User | null>;
    updateDataUser(id: string, dto: UpdateUserDto): Promise<User | null>;
    deleteUser(id: string): Promise<boolean>;
}
//# sourceMappingURL=UserService.d.ts.map