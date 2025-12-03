import type { UserRepository } from "../../../../core/repositories/UserRepository/UserRepository.js";
import { User } from "../../../../core/models/User/User.js";
import { UpdateUserDto } from "../../../../core/repositories/UserRepository/dto/updateUserDto.js";
export declare class SeqUserRepository implements UserRepository {
    createUser(user: User): Promise<User | null>;
    getUserById(id: string): Promise<User | null>;
    updateDataUser(id: string, dto: UpdateUserDto): Promise<User | null>;
    deleteUser(id: string): Promise<boolean>;
}
//# sourceMappingURL=SeqUserRepository.d.ts.map